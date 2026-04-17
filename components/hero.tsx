import { Search } from "lucide-react";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <section className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            The Bridge IV Therapy Guide
          </p>
          <h1 className="mt-6 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance leading-tight">
            Discover and book IV therapy clinics selected by our experts
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Find Atlanta&apos;s premier wellness clinics offering hydration therapy, 
            vitamin infusions, NAD+ treatments, and more.
          </p>

          <div className="mx-auto mt-12 max-w-lg">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by clinic, city, or treatment..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-14 w-full border border-border bg-background pl-12 pr-6 text-foreground shadow-sm transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {["Atlanta", "NAD+ Therapy", "Hydration", "Vitamin C"].map((tag) => (
              <button
                key={tag}
                onClick={() => onSearchChange(tag)}
                className="border-b border-transparent px-2 py-1 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  );
}
