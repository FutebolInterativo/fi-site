// app/cursos/[slug]/page.tsx
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCursoBySlug, getAllSlugs } from "@/lib/cursos";
import CursoDetalhe from "./CursoDetalhe";

export const runtime = "nodejs";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCursoBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.title} — Futebol Interativo`,
    description: c.shortDescription || c.subheadline,
  };
}

export default async function CursoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const curso = getCursoBySlug(slug);
  if (!curso) return notFound();

  return (
    <>
      <Header />
      <main>
        <CursoDetalhe curso={curso} />
      </main>
      <Footer />
    </>
  );
}