import {
  Droplets,
  Sparkles,
  Brain,
  Dumbbell,
  Shield,
  Heart,
} from "lucide-react";

const servicesList = [
  {
    icon: Droplets,
    title: "Hydration Therapy",
    description:
      "Replenish fluids and electrolytes quickly for optimal hydration and wellness.",
  },
  {
    icon: Sparkles,
    title: "Vitamin Infusions",
    description:
      "Boost your vitamin levels with customized blends of essential nutrients.",
  },
  {
    icon: Brain,
    title: "NAD+ Therapy",
    description:
      "Support cellular health, energy production, and cognitive function.",
  },
  {
    icon: Dumbbell,
    title: "Athletic Recovery",
    description:
      "Speed up recovery time and enhance performance with specialized formulas.",
  },
  {
    icon: Shield,
    title: "Immunity Boost",
    description:
      "Strengthen your immune system with high-dose vitamin C and zinc.",
  },
  {
    icon: Heart,
    title: "Beauty & Anti-Aging",
    description:
      "Promote healthy skin, hair, and nails with biotin and glutathione.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Treatment Options
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Popular IV Therapy Services
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Explore the range of IV therapy treatments available at clinics across Georgia.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
