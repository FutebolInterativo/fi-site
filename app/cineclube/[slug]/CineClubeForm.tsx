"use client";
import { useRouter } from "next/navigation";
import type { CineClubeSessao } from "@/lib/cineclube";
import { getFiCampanha } from "@/lib/cineclube";
import HubspotContactForm from "@/components/HubspotContactForm";

export default function CineClubeForm({ sessao }: { sessao: CineClubeSessao }) {
  const router = useRouter();

  return (
    <HubspotContactForm
      color="#0C98FC"
      pageName={`Cine Clube Sessão ${sessao.numero}`}
      // Sem defaultUtm de propósito: as UTMs vêm só do link real de quem
      // clicou (getUtmParams, já embutido no componente), nada fixo aqui.
      extraProperties={{ fi_campanha: getFiCampanha(sessao) }}
      formId="formulario-padrao-eventos"
      onSuccess={() => router.push(`/cineclube/${sessao.slug}/obrigado`)}
    />
  );
}