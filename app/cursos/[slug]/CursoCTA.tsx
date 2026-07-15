"use client";
import type { Curso } from "@/lib/cursos";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

/*
  Checkout reescrito no formato "estilo G4" (referência do doc de alterações):
  - Duas colunas: "Sua matrícula inclui" (checklist + garantia) à esquerda,
    "Investimento" (preço + CTAs + trust line) à direita.
  - 100% inline style, sem classes Tailwind arbitrárias — conforme o padrão
    do projeto (projeto-fi-instructions.md).
  - Garantia trocada de 12 meses (resultado) para 7 dias (satisfação),
    conforme decisão confirmada.
  - CTA secundário abre WhatsApp direto, sem formulário no meio.
*/

const WHATSAPP_NUM = "5511942009407";

const items = [
  { text: "Prática garantida em um dos +130 clubes parceiros — até 2 semanas de imersão no departamento", destaque: true },
  { text: "15 aulas ao vivo com analistas de Atlético-MG, Santos e Leverkusen", destaque: false },
  { text: "Mentoria individual e suporte direto durante toda a formação", destaque: false },
  { text: "Comunidade FI com vagas do mercado publicadas todos os dias", destaque: false },
  { text: "Certificação oficial + gravações disponíveis por 1 ano", destaque: false },
];

export default function CursoCTA({ curso, cor = "#4096F2" }: { curso: Curso; cor?: string }) {
  const url = curso.checkoutUrl || curso.externalUrl;
  const match = curso.preco?.match(/(\d+)[xX]\s*R\$\s*(\d[\d.]*),(\d{2})/);
  const parcelas = match?.[1];
  const inteiro = match?.[2];
  const cents = match?.[3];
  const avista = curso.precoAvista?.replace(/^R\$\s*/, "").trim();
  const waHref = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUM}&text=${encodeURIComponent(
    `Tenho dúvidas sobre o curso "${curso.title}" antes de decidir.`
  )}`;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, alignItems: "stretch" }}>

      {/* ── Coluna esquerda: Sua matrícula inclui ─────────────────────── */}
      <div style={{ borderRadius: 24, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "28px 26px", display: "flex", flexDirection: "column" as const, gap: 18 }}>
        <p style={{ fontFamily: F, fontSize: 18, color: "#F4F4F4", letterSpacing: "0.01em" }}>SUA MATRÍCULA INCLUI</p>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 10, margin: 0, padding: 0 }}>
          {items.map((item, i) => (
            <li
              key={i}
              style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: item.destaque ? "14px 16px" : "10px 2px",
                borderRadius: 14,
                background: item.destaque ? `${cor}1c` : "transparent",
                border: item.destaque ? `1px solid ${cor}45` : "none",
              }}
            >
              <svg width={16} height={16} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="10" cy="10" r="9.5" fill={item.destaque ? `${cor}30` : "rgba(8,194,122,0.14)"} stroke={item.destaque ? cor : "rgba(8,194,122,0.4)"} strokeWidth="1" />
                <path d="M6 10l2.5 2.5L14 7" stroke={item.destaque ? cor : "#08C27A"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: M, fontSize: 13.5, fontWeight: item.destaque ? 700 : 500, color: item.destaque ? "#F4F4F4" : "rgba(244,244,244,0.75)", lineHeight: 1.5 }}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>

        {/* garantia — 7 dias, satisfação */}
        <div style={{ marginTop: "auto", padding: "14px 16px", borderRadius: 14, border: "1.5px dashed rgba(245,197,66,0.5)", background: "rgba(245,197,66,0.06)" }}>
          <p style={{ fontFamily: M, fontSize: 13, fontWeight: 500, color: "rgba(244,244,244,0.75)", lineHeight: 1.55 }}>
            <strong style={{ color: "#F5C542", fontWeight: 700 }}>Garantia de 7 dias:</strong> {curso.garantiaTexto ?? "entre, assista às primeiras aulas e, se não for pra você, devolvemos 100% do valor. Sem letra miúda."}
          </p>
        </div>
      </div>

      {/* ── Coluna direita: Investimento ──────────────────────────────── */}
      <div style={{ borderRadius: 24, border: "1px solid rgba(64,150,242,0.2)", background: "linear-gradient(160deg, #0F2744 0%, #0A1E35 100%)", boxShadow: "0 32px 64px -24px rgba(0,10,30,0.6)", padding: "28px 26px", display: "flex", flexDirection: "column" as const, gap: 18 }}>
        <p style={{ fontFamily: M, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.5)", textAlign: "center" as const }}>
          Investimento
        </p>

        <div style={{ textAlign: "center" as const }}>
          {match ? (
            <>
              <p style={{ fontFamily: M, fontSize: 12.5, color: "rgba(169,216,245,0.45)", marginBottom: 6 }}>{parcelas}x no cartão de crédito</p>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 3, lineHeight: 1 }}>
                <span style={{ fontFamily: F, fontSize: 16, color: "rgba(255,255,255,0.7)", paddingBottom: 10 }}>R$</span>
                <span style={{ fontFamily: F, fontSize: 56, color: "#fff", lineHeight: 0.88, letterSpacing: "-0.02em" }}>{inteiro}</span>
                <span style={{ fontFamily: F, fontSize: 22, color: "rgba(255,255,255,0.7)", paddingBottom: 8 }}>,{cents}</span>
              </div>
              {avista && (
                <p style={{ marginTop: 10 }}>
                  <span style={{ display: "inline-block", fontFamily: M, fontSize: 12.5, fontWeight: 700, color: "rgba(169,216,245,0.75)", padding: "5px 14px", borderRadius: 99, border: "1px solid rgba(169,216,245,0.25)" }}>
                    ou R$ {avista} à vista
                  </span>
                </p>
              )}
            </>
          ) : curso.preco ? (
            <p style={{ fontFamily: F, fontSize: 36, color: "#fff" }}>{curso.preco}</p>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, marginTop: "auto" }}>
          <a
            href={url} target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "15px 18px 15px 22px", borderRadius: 14, background: "linear-gradient(135deg, #08C27A, #059669)", border: "1.5px solid rgba(8,194,122,0.6)", boxShadow: "0 12px 32px -8px rgba(8,194,122,0.55)", textDecoration: "none" }}
          >
            <span style={{ fontFamily: M, fontWeight: 700, fontSize: 14.5, color: "#fff" }}>Quero garantir minha vaga</span>
            <span style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </a>

          <a
            href={waHref} target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 18px", borderRadius: 14, border: "1.5px solid rgba(255,255,255,0.18)", textDecoration: "none" }}
          >
            <span style={{ fontFamily: M, fontWeight: 700, fontSize: 13.5, color: "rgba(244,244,244,0.85)" }}>Tenho dúvidas! Quero falar com o consultor</span>
          </a>

          <p style={{ textAlign: "center" as const, fontFamily: M, fontSize: 11, fontWeight: 600, color: "rgba(169,216,245,0.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap" as const }}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none"><path d="M6 10V7a6 6 0 1112 0v3M5 10h14v10H5V10z" stroke="rgba(169,216,245,0.5)" strokeWidth="1.8" strokeLinejoin="round"/></svg>
            Compra 100% segura · Garantia de 7 dias · +4.500 alunos
          </p>
        </div>
      </div>
    </div>
  );
}
