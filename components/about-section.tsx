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
    <section id="about" className="border-t border-border bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              About the Guide
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl text-balance leading-tight">
              The Science Behind IV Wellness Treatments
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              IV therapy delivers vitamins, minerals, and hydration directly into your 
              bloodstream, bypassing the digestive system for 100% absorption. This method 
              is ideal for those seeking rapid results, whether for wellness maintenance, 
              recovery, or addressing specific health concerns.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Georgia&apos;s wellness clinics offer a variety of IV treatments tailored to 
              your individual needs, administered in comfortable, spa-like environments 
              by trained medical professionals.
            </p>

            <ul className="mt-10 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-8">
            <div className="border border-border bg-background p-10">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                  <span className="font-serif text-2xl font-bold text-primary-foreground">B</span>
                </div>
                <h3 className="mt-6 font-serif text-4xl font-medium text-foreground">
                  12+
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Clinics in our directory
                </p>
                
                <div className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-10">
                  <div>
                    <p className="font-serif text-3xl font-medium text-foreground">2,000+</p>
                    <p className="mt-1 text-sm text-muted-foreground">Happy patients</p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl font-medium text-foreground">4.7</p>
                    <p className="mt-1 text-sm text-muted-foreground">Average rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
