"use client";
import React from "react";
import type { Curso } from "@/lib/cursos";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

type Props = { curso: Curso };

export default function CursoCTA({ curso }: Props) {
  const url = curso.checkoutUrl || curso.externalUrl;

  // Botão verde com shine — idêntico ao .pfi-cta da Passaporte
  function GreenBtn({ href, label }: { href: string; label: string }) {
    return React.createElement(
      "a",
      {
        href,
        target: "_blank",
        rel: "noreferrer",
        style: {
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          width: "100%",
          padding: "14px 14px 14px 22px",
          borderRadius: 16,
          border: "1.4px solid rgba(8,194,122,0.9)",
          background: "linear-gradient(135deg,#08C27A 0%,#05A567 100%)",
          boxShadow: "0 0 28px rgba(8,194,122,0.5), 0 8px 22px rgba(3,38,63,0.18)",
          textDecoration: "none",
          overflow: "hidden",
          cursor: "pointer",
        },
      },
      // shine layer
      React.createElement("span", {
        "aria-hidden": true,
        style: {
          position: "absolute",
          top: "-50%", left: "-75%",
          width: "50%", height: "200%",
          background: "linear-gradient(120deg,transparent 0%,rgba(255,255,255,0.28) 50%,transparent 100%)",
          transform: "skewX(-18deg)",
          pointerEvents: "none",
        },
      }),
      // label
      React.createElement(
        "span",
        {
          style: {
            position: "relative", zIndex: 2,
            fontFamily: M, fontWeight: 700, fontSize: 15, color: "#F4F4F4",
            whiteSpace: "nowrap",
          },
        },
        label
      ),
      // icon
      React.createElement(
        "span",
        {
          style: {
            position: "relative", zIndex: 2,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 36, height: 36, borderRadius: 11,
            background: "rgba(3,38,63,0.55)", color: "#F4F4F4", flexShrink: 0,
          },
        },
        React.createElement(
          "svg",
          { width: 17, height: 17, viewBox: "0 0 24 24", fill: "none" },
          React.createElement("path", { d: "M7 17L17 7M17 7H8M17 7V16", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" })
        )
      )
    );
  }

  // Preço partido em parcelas / à vista
  function PrecoDisplay() {
    if (!curso.preco) return null;

    // Detecta padrão "12x R$ 533,99" ou usa como número inteiro
    const match = curso.preco.match(/(\d+)[xX]\s*R\$\s*([\d.,]+)/);
    if (match) {
      const [, parcelas, valor] = match;
      const partes = valor.split(",");
      return React.createElement(
        "div",
        { style: { marginBottom: 10 } },
        React.createElement("p", { style: { fontFamily: M, fontWeight: 600, fontSize: 14, color: "#cfe2f3", marginBottom: 4 } }, "Por apenas:"),
        React.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "#fff" } },
          React.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column" as const, alignItems: "flex-start", lineHeight: 1.05 } },
            React.createElement("span", { style: { fontFamily: F, fontSize: 22 } }, `${parcelas}X`),
            React.createElement("span", { style: { fontFamily: F, fontSize: 22 } }, "R$")
          ),
          React.createElement("span", { style: { fontFamily: F, fontSize: "clamp(54px,8vw,72px)", lineHeight: 0.85 } }, partes[0]),
          partes[1] && React.createElement("span", { style: { fontFamily: F, fontSize: 26, alignSelf: "flex-start", marginTop: 6 } }, `,${partes[1]}`)
        ),
        curso.precoAvista && React.createElement(
          "p",
          { style: { fontFamily: M, fontWeight: 500, fontSize: 13, color: "#aecbe4", marginTop: 6, textAlign: "center" as const } },
          `ou `,
          React.createElement("strong", null, `R$ ${curso.precoAvista}`),
          " à vista"
        )
      );
    }

    // fallback — preço simples
    return React.createElement(
      "div",
      { style: { marginBottom: 10 } },
      React.createElement("p", { style: { fontFamily: M, fontWeight: 600, fontSize: 14, color: "#cfe2f3", marginBottom: 4 } }, "Investimento:"),
      React.createElement("p", { style: { fontFamily: F, fontSize: "clamp(28px,4vw,42px)", color: "#fff", lineHeight: 1 } }, curso.preco)
    );
  }

  // O que está incluído (checklist light)
  const checkItems = [
    "Acesso completo ao conteúdo do curso",
    "Certificado de conclusão",
    "Suporte com os mentores",
    "Comunidade de alunos FI",
  ];

  return React.createElement(
    "div",
    {
      style: {
        background: "#16365C",
        borderRadius: 26,
        padding: "clamp(24px,3.4vw,32px) clamp(22px,3vw,30px) clamp(26px,3.4vw,34px)",
        textAlign: "center" as const,
      },
    },

    // Header
    React.createElement(
      "div",
      {
        style: {
          background: "rgba(255,255,255,0.07)",
          borderRadius: 16, padding: "12px 20px",
          fontFamily: M, fontWeight: 700, fontSize: "clamp(11px,1.8vw,13px)",
          letterSpacing: "0.04em", textTransform: "uppercase" as const,
          color: "#fff", lineHeight: 1.35, marginBottom: 20,
        },
      },
      "O QUE ESTÁ INCLUSO:"
    ),

    // Checklist
    React.createElement(
      "ul",
      {
        style: {
          listStyle: "none", display: "flex", flexDirection: "column" as const,
          gap: 9, marginBottom: 20, textAlign: "left" as const,
        },
      },
      ...checkItems.map((item, i) =>
        React.createElement(
          "li",
          {
            key: i,
            style: {
              display: "flex", alignItems: "flex-start", gap: 9,
              fontFamily: M, fontWeight: 500,
              fontSize: "clamp(12px,1.5vw,13.5px)", lineHeight: 1.38,
              color: "rgba(255,255,255,0.9)",
            },
          },
          React.createElement(
            "svg",
            { viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, style: { flexShrink: 0, width: 18, height: 18, marginTop: 1, color: "#4ADBF8" } },
            React.createElement("path", { d: "M5 12.5l4.2 4.2L19 7", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" })
          ),
          React.createElement("span", null, item)
        )
      )
    ),

    // Divisor
    React.createElement("hr", { style: { border: "none", height: 2, background: "rgba(140,200,245,0.3)", margin: "16px 0" } }),

    // Preço
    React.createElement(PrecoDisplay, null),

    // Botão CTA
    React.createElement("div", { style: { marginTop: 18 } },
      React.createElement(GreenBtn, {
        href: url,
        label: "Garantir minha vaga",
      })
    )
  );
}