// app/evento/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getEventoBySlug, getAllEventoSlugs } from "@/lib/eventos";
import EventoDetalhe from "./EventoDetalhe";

export const runtime = "nodejs";

export async function generateStaticParams() {
  return getAllEventoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEventoBySlug(slug);
  if (!e) return {};
  return {
    title: `${e.title.replace(/\*\*/g, "")} — Futebol Interativo`,
    description: e.subheadline,
  };
}

export default async function EventoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const evento = getEventoBySlug(slug);
  if (!evento) return notFound();

  return <EventoDetalhe evento={evento} />;
}