// app/cineclube/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getSessaoBySlug, getAllSessaoSlugs } from "@/lib/cineclube";
import CineClubeDetalhe from "./CineClubeDetalhe";

export const runtime = "nodejs";

export async function generateStaticParams() {
  return getAllSessaoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSessaoBySlug(slug);
  if (!s) return {};
  return {
    title: `Cine Clube FI · Sessão ${s.numero} — ${s.tema.replace(/\*\*/g, "")} — Futebol Interativo`,
    description: s.descricaoCurta,
  };
}

export default async function CineClubePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sessao = getSessaoBySlug(slug);
  if (!sessao) return notFound();

  return <CineClubeDetalhe sessao={sessao} />;
}