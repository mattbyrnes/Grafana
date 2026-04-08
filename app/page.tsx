import { Header } from "@/components/header";
import { ClinicDirectory } from "@/components/clinic-directory";
import { ServicesSection } from "@/components/services-section";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ClinicDirectory />
        <ServicesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
