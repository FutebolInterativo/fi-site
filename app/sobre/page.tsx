import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SobreClient from "./SobreClient";

export const metadata = {
  title: "Sobre — Futebol Interativo",
  description: "Conheça a história do Futebol Interativo, escola de formação profissional para o futebol fundada em 2018 e incubada pela UFRN.",
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <SobreClient />
      <Footer />
    </>
  );
}