import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Faster nutrient absorption than oral supplements",
  "Immediate hydration and energy boost",
  "Customizable formulas for your specific needs",
  "Administered by licensed healthcare professionals",
  "Safe and FDA-approved ingredients",
  "Results you can feel within hours",
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Why Choose IV Therapy?
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              The Science Behind IV Wellness Treatments
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              IV therapy delivers vitamins, minerals, and hydration directly into your 
              bloodstream, bypassing the digestive system for 100% absorption. This method 
              is ideal for those seeking rapid results, whether for wellness maintenance, 
              recovery, or addressing specific health concerns.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Georgia's wellness clinics offer a variety of IV treatments tailored to 
              your individual needs, administered in comfortable, spa-like environments 
              by trained medical professionals.
            </p>

            <ul className="mt-8 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                  <div className="h-8 w-8 rounded-full bg-primary" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  12+
                </h3>
                <p className="text-muted-foreground">
                  Clinics in our directory
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="font-serif text-xl font-bold text-foreground">2,000+</p>
                    <p className="text-sm text-muted-foreground">Happy patients</p>
                  </div>
                  <div>
                    <p className="font-serif text-xl font-bold text-foreground">4.7</p>
                    <p className="text-sm text-muted-foreground">Average rating</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-primary/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
