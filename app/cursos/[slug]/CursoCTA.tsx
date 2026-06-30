"use client";
import type { Curso } from "@/lib/cursos";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

type Props = { curso: Curso };

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, width: 17, height: 17, marginTop: 1 }}>
      <circle cx="12" cy="12" r="11" fill="rgba(8,194,122,0.18)" />
      <path d="M7.5 12.3l2.8 2.8L16.5 9" stroke="#08C27A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CursoCTA({ curso }: Props) {
  const url = curso.checkoutUrl || curso.externalUrl;

  const checkItems = [
    "Acesso completo ao conteúdo do curso",
    "Certificado de conclusão",
    "Suporte com os mentores",
    "Comunidade de alunos FI",
  ];

  // Tenta extrair "12x R$ 533,99"
  const match = curso.preco?.match(/(\d+)[xX]\s*R\$\s*([\d.,]+)/);
  const parcelas = match?.[1];
  const valor = match?.[2]?.split(",");

  return (
    <div style={{
      background: "linear-gradient(165deg, #16365C 0%, #0F2A47 100%)",
      borderRadius: 24,
      border: "1px solid rgba(140,200,245,0.12)",
      boxShadow: "0 24px 60px -20px rgba(0,20,50,0.5)",
      overflow: "hidden",
    }}>

      {/* ── Cabeçalho: faixa sutil acima do conteúdo, sem pílula flutuante ── */}
      <div style={{ padding: "22px 26px 18px", borderBottom: "1px solid rgba(140,200,245,0.1)" }}>
        <p style={{ fontFamily: M, fontWeight: 700, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "#7FC4F5" }}>
          O que está incluso
        </p>
      </div>

      {/* ── Checklist ── */}
      <div style={{ padding: "20px 26px 4px" }}>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 13 }}>
          {checkItems.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 11, fontFamily: M, fontWeight: 500, fontSize: 13.5, lineHeight: 1.4, color: "rgba(255,255,255,0.88)" }}>
              <Check />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Preço — hierarquia clara: label esquerda, número grande centralizado ── */}
      <div style={{ margin: "22px 26px 0", paddingTop: 22, borderTop: "1px solid rgba(140,200,245,0.1)", textAlign: "center" as const }}>
        {match ? (
          <>
            <p style={{ fontFamily: M, fontWeight: 600, fontSize: 12.5, color: "rgba(207,226,243,0.7)", marginBottom: 6 }}>Por apenas</p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 4 }}>
              <span style={{ fontFamily: F, fontSize: 18, color: "#fff", paddingBottom: 8 }}>{parcelas}x</span>
              <span style={{ fontFamily: F, fontSize: 22, color: "#fff", paddingBottom: 8 }}>R$</span>
              <span style={{ fontFamily: F, fontSize: "clamp(48px,7vw,62px)", color: "#fff", lineHeight: 0.85 }}>{valor?.[0]}</span>
              {valor?.[1] && <span style={{ fontFamily: F, fontSize: 22, color: "#fff", paddingBottom: 8 }}>,{valor[1]}</span>}
            </div>
            {curso.precoAvista && (
              <p style={{ fontFamily: M, fontWeight: 500, fontSize: 12.5, color: "rgba(207,226,243,0.55)", marginTop: 8 }}>
                ou <strong style={{ color: "rgba(255,255,255,0.85)" }}>R$ {curso.precoAvista}</strong> à vista
              </p>
            )}
          </>
        ) : curso.preco ? (
          <>
            <p style={{ fontFamily: M, fontWeight: 600, fontSize: 12.5, color: "rgba(207,226,243,0.7)", marginBottom: 6 }}>Investimento</p>
            <p style={{ fontFamily: F, fontSize: "clamp(28px,4vw,40px)", color: "#fff", lineHeight: 1 }}>{curso.preco}</p>
          </>
        ) : null}
      </div>

      {/* ── Botão CTA ── */}
      <div style={{ padding: "22px 26px 26px" }}>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            width: "100%",
            padding: "15px 16px 15px 22px",
            borderRadius: 14,
            border: "1px solid rgba(8,194,122,0.6)",
            background: "linear-gradient(135deg, #08C27A 0%, #059669 100%)",
            boxShadow: "0 12px 28px -8px rgba(8,194,122,0.5)",
            textDecoration: "none",
            overflow: "hidden",
          }}
        >
          <span style={{ fontFamily: M, fontWeight: 700, fontSize: 14.5, color: "#fff" }}>Garantir minha vaga</span>
          <span style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(0,0,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Arrow />
          </span>
        </a>
      </div>
    </div>
  );
}