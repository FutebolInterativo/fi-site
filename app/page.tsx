import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClubesMarquee from "@/components/ClubesMarquee";
import Areas from "@/components/Areas";
import Metodologia from "@/components/Metodologia";
import NossaFormacao from "@/components/NossaFormacao";
import Depoimentos from "@/components/Depoimentos";
import NossaMissao from "@/components/NossaMissao";
import PraticaInternacional from "@/components/PraticaInternacional";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ClubesMarquee />
        <Areas />
        <Metodologia />
        <NossaFormacao />
        <Depoimentos />
        <NossaMissao />
        <PraticaInternacional />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}