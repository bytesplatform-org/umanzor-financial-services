import Nav from "@/components/home2/Nav";
import Hero from "@/components/home2/Hero";
import { FounderBanner, Intro, Trusted } from "@/components/home2/Intro";
import { Statement, Vision } from "@/components/home2/Story";
import { Familiar, Stories } from "@/components/home2/Stories";
import { Process, ServicesCarousel, Testimonial } from "@/components/home2/Services";
import { Banner, ContactCards } from "@/components/home2/Closing";
import Footer2 from "@/components/home2/Footer";

export default function Home() {
  return (
    <div className="bg-silver text-royal-deep">
      <Nav />
      <main id="main">
        <Hero />
        <Intro />
        <FounderBanner />
        <Trusted />
        <Statement />
        <Vision />
        <Familiar />
        <Stories />
        <ServicesCarousel />
        <Testimonial />
        <Process />
        <Banner />
        <ContactCards />
      </main>
      <Footer2 />
    </div>
  );
}
