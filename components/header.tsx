"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <span className="font-serif text-lg font-bold text-primary-foreground">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
                Bridge
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                IV Therapy Guide
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#clinics"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Clinics
            </Link>
            <Link
              href="#services"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              About
            </Link>
            
            {!isLoading && (
              <>
                {user ? (
                  <div className="flex items-center gap-3 border-l border-border pl-6">
                    <Button variant="ghost" size="sm" asChild className="text-foreground hover:text-primary hover:bg-transparent">
                      <Link href="/dashboard" className="gap-2">
                        <User className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-primary hover:bg-transparent gap-2">
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 border-l border-border pl-6">
                    <Button variant="ghost" size="sm" asChild className="text-foreground hover:text-primary hover:bg-transparent">
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button size="sm" asChild className="rounded-sm bg-primary hover:bg-primary/90">
                      <Link href="/login">List Your Clinic</Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            <Link
              href="#clinics"
              className="px-3 py-3 text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Clinics
            </Link>
            <Link
              href="#services"
              className="px-3 py-3 text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#about"
              className="px-3 py-3 text-sm font-medium text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            {!isLoading && (
              <div className="mt-3 border-t border-border pt-4">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-3 text-sm font-medium text-foreground hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-3 py-3 text-sm font-medium text-muted-foreground hover:text-primary"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-3 text-sm font-medium text-foreground hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Button size="sm" className="mt-3 w-full rounded-sm" asChild>
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        List Your Clinic
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
