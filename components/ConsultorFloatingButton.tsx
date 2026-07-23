"use client";
import HubspotFormModal from "./HubspotFormModal";

const M = "var(--font-montserrat), Montserrat, sans-serif";

// Ícone de balão de chat — de propósito NÃO é o logo do WhatsApp: o botão
// abre o formulário de qualificação (6 perguntas), não uma conversa
// instantânea. Usar o ícone oficial do WhatsApp aqui prometeria uma coisa
// que a experiência não entrega na hora, e quebraria confiança bem no
// momento em que o lead mais precisa dela.
function ChatIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ConsultorFloatingButton({ utmCampaign = "botao-flutuante", presetArea, visible = true }: { utmCampaign?: string; presetArea?: string; visible?: boolean }) {
  return (
    <HubspotFormModal
      pageName="Botão flutuante"
      color="#0C98FC"
      title="Fale com um consultor"
      subtitle="Responda algumas perguntas rápidas e alguém da equipe te chama."
      defaultUtm={{ utm_source: "trafego", utm_medium: "site", utm_campaign: utmCampaign, utm_content: "fale-com-consultor", utm_term: "geral" }}
      presetArea={presetArea}
      trigger={
        <button
          aria-label="Fale com um consultor"
          className={`group flex fixed bottom-24 md:bottom-6 right-5 md:right-6 z-40 items-center rounded-full shadow-[0_12px_32px_-8px_rgba(12,152,252,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_rgba(12,152,252,0.7)] overflow-hidden ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
          style={{ background: "linear-gradient(135deg,#0C98FC,#0A6FBF)", padding: "14px", border: "1.5px solid rgba(12,152,252,0.6)", transitionDuration: "300ms" }}
        >
          <ChatIcon />
          <span
            className="max-w-0 opacity-0 group-hover:max-w-[220px] group-hover:opacity-100 group-hover:pl-2.5 group-hover:pr-1 transition-all duration-300 overflow-hidden"
            style={{ fontFamily: M, fontWeight: 700, fontSize: 14.5, color: "#fff", whiteSpace: "nowrap" }}
          >
            Fale com um consultor
          </span>
        </button>
      }
    />
  );
}