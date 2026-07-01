"use client";
import type { Curso } from "@/lib/cursos";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

export default function CursoCTA({ curso }: { curso: Curso }) {
  const url = curso.checkoutUrl || curso.externalUrl;

  // "12x R$ 533,99" → parcelas=12, inteiro=533, centavos=99
  const match    = curso.preco?.match(/(\d+)[xX]\s*R\$\s*(\d[\d.]*),(\d{2})/);
  const parcelas = match?.[1];
  const inteiro  = match?.[2];
  const cents    = match?.[3];

  // precoAvista pode vir com ou sem "R$" — limpa e exibe consistente
  const avista   = curso.precoAvista?.replace(/^R\$\s*/, "").trim();

  const items = [
    "Acesso completo ao conteúdo do curso",
    "Certificado de conclusão",
    "Suporte direto com os mentores",
    "Comunidade exclusiva de alunos FI",
    "Experiência prática em clube parceiro",
  ];

  return (
    <div style={{
      background: "linear-gradient(160deg, #0F2744 0%, #0A1E35 100%)",
      borderRadius: 24,
      border: "1px solid rgba(64,150,242,0.2)",
      boxShadow: "0 32px 64px -24px rgba(0,10,30,0.6)",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ padding: "20px 26px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.5)" }}>
          O que está incluso
        </p>
      </div>

      {/* Checklist */}
      <div style={{ padding: "18px 26px 0" }}>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 12 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: M, fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.85)", lineHeight: 1.4 }}>
              <svg width={18} height={18} viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="9" cy="9" r="8.5" fill="rgba(8,194,122,0.16)" stroke="rgba(8,194,122,0.4)" strokeWidth="1"/>
                <path d="M5 9l2.5 2.5L13 6.5" stroke="#08C27A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Preço */}
      <div style={{ margin: "20px 26px 0", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)", textAlign: "center" as const }}>
        <p style={{ fontFamily: M, fontSize: 11.5, fontWeight: 600, color: "rgba(169,216,245,0.5)", marginBottom: 8, letterSpacing: "0.04em" }}>por apenas</p>
        {match ? (
          <>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 3, lineHeight: 1 }}>
              <span style={{ fontFamily: F, fontSize: 16, color: "rgba(255,255,255,0.7)", paddingBottom: 10 }}>{parcelas}x R$</span>
              <span style={{ fontFamily: F, fontSize: 60, color: "#fff", lineHeight: 0.88, letterSpacing: "-0.02em" }}>{inteiro}</span>
              <span style={{ fontFamily: F, fontSize: 22, color: "rgba(255,255,255,0.7)", paddingBottom: 8 }}>,{cents}</span>
            </div>
            {avista && (
              <p style={{ fontFamily: M, fontSize: 12.5, color: "rgba(169,216,245,0.45)", marginTop: 10 }}>
                ou <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>R$ {avista}</strong> à vista
              </p>
            )}
          </>
        ) : curso.preco ? (
          <p style={{ fontFamily: F, fontSize: 36, color: "#fff" }}>{curso.preco}</p>
        ) : null}
      </div>

      {/* Botão */}
      <div style={{ padding: "22px 26px 26px" }}>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 12, width: "100%",
            padding: "15px 18px 15px 24px",
            borderRadius: 14,
            background: "linear-gradient(135deg, #08C27A, #059669)",
            border: "1.5px solid rgba(8,194,122,0.6)",
            boxShadow: "0 12px 32px -8px rgba(8,194,122,0.55)",
            textDecoration: "none",
          }}
        >
          <span style={{ fontFamily: M, fontWeight: 700, fontSize: 15, color: "#fff" }}>Garantir minha vaga</span>
          <span style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </a>
      </div>
    </div>
  );
}