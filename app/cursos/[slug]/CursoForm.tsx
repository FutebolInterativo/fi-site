"use client";
import type { Curso } from "@/lib/cursos";
import HubspotFormModal from "@/components/HubspotFormModal";
import { AREA_BY_CURSO_AREA } from "@/components/HubspotContactForm";

const M = "var(--font-montserrat), Montserrat, sans-serif";

export default function CursoForm({ curso, variant = "primary" }: { curso: Curso; variant?: "primary" | "secondary" }) {
  const isSecondary = variant === "secondary";
  return (
    <HubspotFormModal
      pageName={curso.title}
      color="#08C27A"
      title="Fale com um consultor"
      subtitle="Responda 6 perguntas rápidas e alguém da equipe te chama."
      defaultUtm={{ utm_source: "trafego", utm_medium: "site", utm_campaign: curso.id, utm_content: "falar-com-um-consultor", utm_term: "geral" }}
      presetArea={AREA_BY_CURSO_AREA[curso.area]}
      trigger={
        isSecondary ? (
          <span
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              width: "100%", padding: "13px 18px", borderRadius: 14,
              border: "1.5px solid rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.06)",
              color: "#F4F4F4", fontFamily: M, fontWeight: 700, fontSize: 13.5,
            }}
          >
            Tenho dúvidas! Quero falar com o consultor
          </span>
        ) : (
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
        )
      }
    />
  );
}