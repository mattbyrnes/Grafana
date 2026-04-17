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
    <section id="services" className="border-t border-border bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Treatment Options
          </p>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Popular IV Therapy Services
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Explore the range of IV therapy treatments available at clinics across Georgia.
          </p>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service) => (
            <div
              key={service.title}
              className="group text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-lg font-medium text-foreground">
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
