import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { Services } from "@/components/marketing/Services";
import { VisionMission } from "@/components/marketing/VisionMission";
import { Stats } from "@/components/marketing/Stats";
import { Process } from "@/components/marketing/Process";
import { About } from "@/components/marketing/About";
import { Contact } from "@/components/marketing/Contact";
import { Footer } from "@/components/marketing/Footer";
import { TechShowcase } from "@/components/marketing/TechShowcase";
import { WhatsAppFAB } from "@/components/marketing/WhatsAppFAB";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <TechShowcase />
      <VisionMission />
      <Process />
      <About />
      <Contact />
      <Footer />
      <WhatsAppFAB />
    </main>
  );
}
