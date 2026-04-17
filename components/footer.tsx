import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="font-serif text-lg font-bold text-primary-foreground">B</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-semibold text-background">
                  Bridge
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-background/60">
                  IV Therapy Guide
                </span>
              </div>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-background/70">
              Your trusted resource for finding quality IV therapy clinics across 
              Georgia. We connect you with licensed wellness centers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-background/50">
              Explore
            </h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="#clinics"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  Browse Clinics
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  About IV Therapy
                </Link>
              </li>
            </ul>
          </div>

          {/* For Clinics */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-background/50">
              For Clinics
            </h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  List Your Clinic
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  Update Your Listing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  Advertising Options
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-background/50">
              About Bridge
            </h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-background/80 hover:text-background transition-colors"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-background/10 pt-8 sm:flex-row">
          <p className="text-xs text-background/50">
            {new Date().getFullYear()} Bridge IV Therapy Guide. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="#"
              className="text-xs text-background/50 hover:text-background transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-background/50 hover:text-background transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
