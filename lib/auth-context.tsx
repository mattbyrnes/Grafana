"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User, UserClinic } from "./auth-types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  userClinics: UserClinic[];
  addClinic: (clinic: Omit<UserClinic, "id" | "userId" | "status" | "createdAt">) => Promise<{ id: number }>;
  deleteClinic: (clinicId: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = "ga_iv_current_user";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userClinics, setUserClinics] = useState<UserClinic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load current user from localStorage and validate against database
    const validateAndLoadUser = async () => {
      const storedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as User;
        
        // Validate user exists in database by trying to fetch their clinics
        try {
          const response = await fetch(`/api/clinics/user?userId=${parsedUser.id}`);
          if (response.ok) {
            setUser(parsedUser);
            const clinics = await response.json();
            const formattedClinics = clinics.map((c: any) => ({
              id: c.id,
              userId: c.user_id,
              name: c.name,
              city: c.city,
              region: c.region,
              address: c.address,
              phone: c.phone,
              website: c.website,
              description: c.description,
              priceRange: c.price_range,
              hours: c.hours,
              services: typeof c.services === "string" ? JSON.parse(c.services) : c.services,
              slug: generateSlug(c.name),
              status: c.status,
              createdAt: c.created_at,
            }));
            setUserClinics(formattedClinics);
          } else {
            // User doesn't exist in database anymore, clear localStorage
            localStorage.removeItem(CURRENT_USER_KEY);
          }
        } catch {
          // If validation fails, clear the stale user data
          localStorage.removeItem(CURRENT_USER_KEY);
        }
      }
      setIsLoading(false);
    };
    
    validateAndLoadUser();
  }, []);

  const loadUserClinics = async (userId: number) => {
    try {
      const response = await fetch(`/api/clinics/user?userId=${userId}`);
      if (response.ok) {
        const clinics = await response.json();
        // Convert database format to UserClinic format
        const formattedClinics = clinics.map((c: any) => ({
          id: c.id,
          userId: c.user_id,
          name: c.name,
          city: c.city,
          region: c.region,
          address: c.address,
          phone: c.phone,
          website: c.website,
          description: c.description,
          priceRange: c.price_range,
          hours: c.hours,
          services: typeof c.services === "string" ? JSON.parse(c.services) : c.services,
          slug: generateSlug(c.name),
          status: c.status,
          createdAt: c.created_at,
        }));
        setUserClinics(formattedClinics);
      }
    } catch (error) {
      console.error("Failed to load user clinics:", error);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error || "Login failed" };
      }

      const userData = await response.json();
      const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        createdAt: new Date().toISOString(),
        isAdmin: userData.is_admin || false,
      };

      setUser(user);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      await loadUserClinics(user.id);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Login failed" };
    }
  };

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error || "Registration failed" };
      }

      const userData = await response.json();
      const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        createdAt: new Date().toISOString(),
        isAdmin: userData.is_admin || false,
      };

      setUser(user);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      setUserClinics([]);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Registration failed" };
    }
  };

  const logout = () => {
    setUser(null);
    setUserClinics([]);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const addClinic = async (clinicData: Omit<UserClinic, "id" | "userId" | "status" | "createdAt">) => {
    if (!user) throw new Error("User not logged in");

    try {
      const response = await fetch("/api/clinics/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          name: clinicData.name,
          city: clinicData.city,
          region: clinicData.region,
          address: clinicData.address,
          phone: clinicData.phone,
          website: clinicData.website,
          description: clinicData.description,
          priceRange: clinicData.priceRange,
          hours: clinicData.hours,
          services: clinicData.services,
          image: clinicData.image,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create clinic");
      }

      const newClinicData = await response.json();
      const newClinic: UserClinic = {
        id: newClinicData.id,
        userId: newClinicData.user_id,
        name: newClinicData.name,
        city: newClinicData.city,
        region: newClinicData.region,
        address: newClinicData.address,
        phone: newClinicData.phone,
        website: newClinicData.website,
        description: newClinicData.description,
        priceRange: newClinicData.price_range,
        hours: newClinicData.hours,
        services: typeof newClinicData.services === "string" ? JSON.parse(newClinicData.services) : newClinicData.services,
        slug: generateSlug(newClinicData.name),
        status: newClinicData.status,
        createdAt: newClinicData.created_at,
      };

      setUserClinics((prev) => [newClinic, ...prev]);
      return { id: newClinic.id };
    } catch (error) {
      throw error;
    }
  };

  const deleteClinic = async (clinicId: number) => {
    try {
      const response = await fetch(`/api/clinics/user/${clinicId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete clinic");
      }

      setUserClinics((prev) => prev.filter((c) => Number(c.id) !== clinicId));
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        userClinics,
        addClinic,
        deleteClinic,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
