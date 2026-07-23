import { notFound } from "next/navigation";
import { getSessaoBySlug } from "@/lib/cineclube";
import ObrigadoCineClube from "./ObrigadoCineClube";

export const runtime = "nodejs";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSessaoBySlug(slug);
  if (!s) return {};
  return { title: `Inscrição confirmada — Cine Clube FI · Sessão ${s.numero} — Futebol Interativo` };
}

export default async function ObrigadoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sessao = getSessaoBySlug(slug);
  if (!sessao) return notFound();

  return <ObrigadoCineClube sessao={sessao} />;
}