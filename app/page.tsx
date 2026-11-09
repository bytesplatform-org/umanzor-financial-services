import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import FinancialClarityStory from "@/components/FinancialClarityStory";
import WhyUmanzor from "@/components/WhyUmanzor";
import CaseStudies from "@/components/CaseStudies";
import ProcessSection from "@/components/ProcessSection";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ProblemSection />
        <ServicesSection />
        <FinancialClarityStory />
        <WhyUmanzor />
        <CaseStudies />
        <ProcessSection />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
