"use client";
import type { Curso } from "@/lib/cursos";
import HubspotFormModal from "@/components/HubspotFormModal";

const M = "var(--font-montserrat), Montserrat, sans-serif";

export default function CursoForm({ curso }: { curso: Curso }) {
  return (
    <HubspotFormModal
      pageName={curso.title}
      color="#08C27A"
      title="Fale com um consultor"
      subtitle="Responda 7 perguntas rápidas e alguém da equipe te chama."
      defaultUtm={{ utm_source: "trafego", utm_medium: "site", utm_campaign: curso.id }}
      trigger={
        <span
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
            width: "100%", padding: "14px 20px", borderRadius: 12,
            background: "linear-gradient(135deg,#08C27A,#059669)",
            color: "#fff", fontFamily: M, fontWeight: 700, fontSize: 14,
            boxShadow: "0 8px 24px rgba(8,194,122,0.35)",
          }}
        >
          Falar com um consultor
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      }
    />
  );
}