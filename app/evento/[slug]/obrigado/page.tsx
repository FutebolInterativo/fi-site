// app/evento/[slug]/obrigado/page.tsx
import { notFound } from "next/navigation";
import { getEventoBySlug } from "@/lib/eventos";
import ObrigadoDetalhe from "./ObrigadoDetalhe";

export const runtime = "nodejs";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEventoBySlug(slug);
  if (!e) return {};
  return { title: `Inscrição confirmada — ${e.title.replace(/\*\*/g, "")} — Futebol Interativo` };
}

export default async function ObrigadoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const evento = getEventoBySlug(slug);
  if (!evento) return notFound();

  return <ObrigadoDetalhe evento={evento} />;
}