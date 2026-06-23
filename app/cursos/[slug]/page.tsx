import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCursoBySlug, getAllSlugs } from "@/lib/cursos";
import { notFound } from "next/navigation";
import CursoDetalhe from "./CursoDetalhe";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const curso = getCursoBySlug(slug);
  if (!curso) return { title: "Curso não encontrado — Futebol Interativo" };
  return {
    title: `${curso.title} — Futebol Interativo`,
    description: curso.shortDescription || curso.subheadline || curso.title,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const curso = getCursoBySlug(slug);
  if (!curso) notFound();

  return (
    <>
      <Header />
      <main style={{ background: "#03263F", minHeight: "100vh" }}>
        <CursoDetalhe curso={curso} />
      </main>
      <Footer />
    </>
  );
}
