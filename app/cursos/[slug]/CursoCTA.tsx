"use client";
import type { Curso } from "@/lib/cursos";
import CursoForm from "./CursoForm";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

/*
  Checkout — só o cartão "Investimento" (preço + CTA de checkout + trust
  line). O card "Sua matrícula inclui" foi removido a pedido: a seção de
  oferta agora mostra só o valor, sem o resumo de benefícios ao lado.
*/

export default function CursoCTA({ curso }: { curso: Curso }) {
  const url = curso.checkoutUrl || curso.externalUrl;
  const match = curso.preco?.match(/(\d+)[xX]\s*R\$\s*(\d[\d.]*),(\d{2})/);
  const parcelas = match?.[1];
  const inteiro = match?.[2];
  const cents = match?.[3];
  const avista = curso.precoAvista?.replace(/^R\$\s*/, "").trim();

  return (
    <div style={{ borderRadius: 28, border: "1px solid rgba(64,150,242,0.35)", background: "linear-gradient(160deg, #123863 0%, #0C2A48 100%)", boxShadow: "0 32px 64px -24px rgba(0,10,30,0.6)", padding: "clamp(28px,7vw,40px) clamp(20px,5vw,32px)", display: "flex", flexDirection: "column" as const, gap: 24, overflow: "hidden" }}>
      <p style={{ fontFamily: M, fontSize: 13, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "#A9D8F5", textAlign: "center" as const }}>
        Investimento
      </p>

      <div style={{ textAlign: "center" as const }}>
        {match ? (
          <>
            <p style={{ fontFamily: M, fontSize: 17, fontWeight: 700, color: "rgba(169,216,245,0.9)", marginBottom: 18 }}>{parcelas}x no cartão de crédito</p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "clamp(4px,1.5vw,8px)", lineHeight: 1 }}>
              <span style={{ fontFamily: F, fontSize: "clamp(20px,5.5vw,36px)", color: "rgba(255,255,255,0.9)", paddingBottom: "clamp(14px,4vw,28px)" }}>R$</span>
              <span style={{ fontFamily: F, fontSize: "clamp(64px,20vw,172px)", color: "#fff", lineHeight: 0.85, letterSpacing: "-0.02em" }}>{inteiro}</span>
              <span style={{ fontFamily: F, fontSize: "clamp(28px,7.5vw,62px)", color: "rgba(255,255,255,0.9)", paddingBottom: "clamp(10px,3vw,20px)" }}>,{cents}</span>
            </div>
            {avista && (
              <p style={{ marginTop: 24 }}>
                <span style={{ display: "inline-block", fontFamily: M, fontSize: 16, fontWeight: 700, color: "#A9D8F5", padding: "9px 22px", borderRadius: 99, border: "1px solid rgba(169,216,245,0.4)", background: "rgba(169,216,245,0.08)" }}>
                  ou R$ {avista} à vista
                </span>
              </p>
            )}
          </>
        ) : curso.preco ? (
          <p style={{ fontFamily: F, fontSize: 44, color: "#fff" }}>{curso.preco}</p>
        ) : null}
      </div>

      <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginTop: 8 }}>
        <a
          href={url} target="_blank" rel="noreferrer"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "17px 20px 17px 24px", borderRadius: 14, background: "linear-gradient(135deg, #08C27A, #059669)", border: "1.5px solid rgba(8,194,122,0.6)", boxShadow: "0 12px 32px -8px rgba(8,194,122,0.55)", textDecoration: "none" }}
        >
          <span style={{ fontFamily: M, fontWeight: 700, fontSize: 16, color: "#fff" }}>Quero garantir minha vaga</span>
          <span style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </a>

        <CursoForm curso={curso} variant="secondary" />

        <p style={{ textAlign: "center" as const, fontFamily: M, fontSize: 12, fontWeight: 700, color: "rgba(169,216,245,0.75)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap" as const }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><path d="M6 10V7a6 6 0 1112 0v3M5 10h14v10H5V10z" stroke="rgba(169,216,245,0.85)" strokeWidth="1.8" strokeLinejoin="round"/></svg>
          Compra 100% segura · Garantia de 7 dias · +4.500 alunos
        </p>
      </div>
    </div>
  );
}