import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClubesMarquee from "@/components/ClubesMarquee";
import Areas from "@/components/Areas";
import Metodologia from "@/components/Metodologia";
import ExperienciaPraticaHome from "@/components/ExperienciaPraticaHome";
import NossaFormacao from "@/components/NossaFormacao";
import Depoimentos from "@/components/Depoimentos";
import NossaMissao from "@/components/NossaMissao";
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
        <ExperienciaPraticaHome />
        <NossaFormacao />
        <Depoimentos />
        <NossaMissao />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}