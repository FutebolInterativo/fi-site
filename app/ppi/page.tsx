import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PraticaInternacional from "@/components/PraticaInternacional";

/*
  O PPI (Programa de Prática Internacional, Braga/Girona) saiu da home e da
  página de Experiência Prática — onde ficava misturado com o conteúdo de
  prática doméstica — e ganhou página própria, referenciada pelo item "PPI"
  na navbar (ver Header.tsx).
*/
export default function PPIPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 72 }}>
        <PraticaInternacional />
      </main>
      <Footer />
    </>
  );
}
