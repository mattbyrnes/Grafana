export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  isAdmin: boolean;
}

export interface UserClinic {
  id: number;
  userId: number;
  slug: string;
  name: string;
  city: string;
  region: string;
  address: string;
  phone: string;
  website: string;
  services: string[];
  priceRange: string;
  hours: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  image: string;
}
