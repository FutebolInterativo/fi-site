"use client";
import type { Curso } from "@/lib/cursos";
import CursoForm from "./CursoForm";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

/*
  Checkout "estilo G4": 2 cartões — "Sua matrícula inclui" (checklist +
  garantia) e "Investimento" (preço + CTA de checkout + trust line).
  Não tem mais grid próprio aqui — retorna um Fragment, e quem decide o
  layout (2 ou 3 colunas, junto com o card "Fale com um consultor") é o
  CursoDetalhe.tsx, num grid único. Isso evita o bug de grid aninhado que
  fazia "Investimento" ficar espremido embaixo de "Sua matrícula inclui".
  A CTA de "falar com consultor" também não vive mais aqui — tinha duas
  (essa + o card do formulário), e ficava redundante.
*/

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

  return (
    <>
      {/* ── Sua matrícula inclui ─────────────────────── */}
      <div style={{ borderRadius: 28, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "32px 28px", display: "flex", flexDirection: "column" as const, gap: 20, height: "100%" }}>
        <p style={{ fontFamily: F, fontSize: 20, color: "#F4F4F4", letterSpacing: "0.01em" }}>SUA MATRÍCULA INCLUI</p>

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

      {/* ── Investimento ──────────────────────────────── */}
      <div style={{ borderRadius: 28, border: "1px solid rgba(64,150,242,0.35)", background: "linear-gradient(160deg, #123863 0%, #0C2A48 100%)", boxShadow: "0 32px 64px -24px rgba(0,10,30,0.6)", padding: "32px 28px", display: "flex", flexDirection: "column" as const, gap: 20, height: "100%" }}>
        <p style={{ fontFamily: M, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#A9D8F5", textAlign: "center" as const }}>
          Investimento
        </p>

        <div style={{ textAlign: "center" as const }}>
          {match ? (
            <>
              <p style={{ fontFamily: M, fontSize: 14, fontWeight: 700, color: "rgba(169,216,245,0.9)", marginBottom: 10 }}>{parcelas}x no cartão de crédito</p>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 5, lineHeight: 1 }}>
                <span style={{ fontFamily: F, fontSize: 24, color: "rgba(255,255,255,0.9)", paddingBottom: 16 }}>R$</span>
                <span style={{ fontFamily: F, fontSize: 92, color: "#fff", lineHeight: 0.85, letterSpacing: "-0.02em" }}>{inteiro}</span>
                <span style={{ fontFamily: F, fontSize: 34, color: "rgba(255,255,255,0.9)", paddingBottom: 12 }}>,{cents}</span>
              </div>
              {avista && (
                <p style={{ marginTop: 14 }}>
                  <span style={{ display: "inline-block", fontFamily: M, fontSize: 13.5, fontWeight: 700, color: "#A9D8F5", padding: "6px 16px", borderRadius: 99, border: "1px solid rgba(169,216,245,0.4)", background: "rgba(169,216,245,0.08)" }}>
                    ou R$ {avista} à vista
                  </span>
                </p>
              )}
            </>
          ) : curso.preco ? (
            <p style={{ fontFamily: F, fontSize: 36, color: "#fff" }}>{curso.preco}</p>
          ) : null}
        </div>

        {/* resumo rápido — preenche o vão que sobrava entre o preço e o botão,
            em vez de deixar o espaço vazio por causa do marginTop:auto do CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, padding: "14px 10px", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
          {[
            { label: "Acesso imediato" },
            { label: "Certificado incluso" },
          ].map((f, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: M, fontSize: 11.5, fontWeight: 700, color: "rgba(244,244,244,0.9)" }}>
              {/* ícone decorativo — cor da área, não verde (verde é só de botão) */}
              <svg width={13} height={13} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <path d="M4 10l4 4 8-8" stroke={cor} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {f.label}
            </span>
          ))}
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

          <CursoForm curso={curso} variant="secondary" />

          <p style={{ textAlign: "center" as const, fontFamily: M, fontSize: 11, fontWeight: 700, color: "rgba(169,216,245,0.75)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap" as const }}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none"><path d="M6 10V7a6 6 0 1112 0v3M5 10h14v10H5V10z" stroke="rgba(169,216,245,0.85)" strokeWidth="1.8" strokeLinejoin="round"/></svg>
            Compra 100% segura · Garantia de 7 dias · +4.500 alunos
          </p>
        </div>
      </div>
    </>
  );
}