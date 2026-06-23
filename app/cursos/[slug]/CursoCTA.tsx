import React from "react";
import type { Curso } from "@/lib/cursos";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

export default function CursoCTA({ curso }: { curso: Curso; cor?: string }) {
  const checkout = curso.checkoutUrl || curso.externalUrl;

  const preco = curso.preco
    ? React.createElement(
        "div",
        { style: { marginBottom: 20 } },
        React.createElement(
          "div",
          { style: { fontFamily: M, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#A9D8F5", marginBottom: 8 } },
          "Investimento"
        ),
        React.createElement("div", { style: { fontFamily: F, fontSize: 38, color: "#F4F4F4", lineHeight: 1 } }, curso.preco),
        curso.precoAvista
          ? React.createElement("div", { style: { fontFamily: M, fontSize: 13, color: "rgba(244,244,244,0.6)", marginTop: 6 } }, curso.precoAvista)
          : null
      )
    : React.createElement("div", { style: { marginBottom: 20, fontFamily: F, fontSize: 26, color: "#F4F4F4" } }, "Consulte as condições");

  const botao = React.createElement(
    "a",
    {
      href: checkout,
      target: "_blank",
      rel: "noreferrer",
      className: "block text-center transition-transform hover:-translate-y-0.5",
      style: {
        textDecoration: "none",
        fontFamily: M,
        fontWeight: 700,
        fontSize: 16,
        color: "#fff",
        padding: "16px 20px",
        borderRadius: 14,
        background: "linear-gradient(135deg,#08C27A,#05A567)",
        boxShadow: "0 0 28px rgba(8,194,122,0.45)",
      },
    },
    "Quero me inscrever"
  );

  const garantia = curso.garantiaTexto
    ? React.createElement(
        "div",
        { style: { fontFamily: M, fontSize: 12.5, color: "rgba(244,244,244,0.6)", textAlign: "center" as const, marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 } },
        React.createElement("span", { style: { color: "#08C27A" } }, "✓"),
        " ",
        curso.garantiaTexto
      )
    : null;

  return React.createElement(
    "div",
    {
      style: {
        borderRadius: 20,
        border: "1px solid rgba(140,200,245,0.18)",
        background: "linear-gradient(180deg, rgba(12,90,150,0.18), rgba(3,38,63,0.4))",
        padding: 26,
        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
      },
    },
    preco,
    botao,
    garantia
  );
}
