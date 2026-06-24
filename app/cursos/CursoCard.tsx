"use client";
import React from "react";

const AREA_COLOR: Record<string, string> = {
  "tecnica-e-tatica":      "#4096F2",
  "comunicacao-marketing": "#818CF8",
  "gestao-e-operacao":     "#F59E0B",
  "saude":                 "#2DD4BF",
};

// SVG paths para ícone de cada área
const ICON: Record<string, string> = {
  "tecnica-e-tatica":      "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  "comunicacao-marketing": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  "gestao-e-operacao":     "M22 12h-4l-3 9L9 3l-3 9H2",
  "saude":                 "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v8M8 12h8",
};

type Props = {
  id: string;
  title: string;
  type: string;
  area: string;
  areaLabel: string;
  externalUrl: string;
};

export default function CursoCard(props: Props) {
  const cor = AREA_COLOR[props.area] ?? "#4096F2";
  const iconPath = ICON[props.area] ?? ICON["tecnica-e-tatica"];
  const href = `/cursos/${props.id}`;

  const card = React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column" as const,
        height: "100%",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(64,150,242,0.12)",
        background: "#0F1D47",
        cursor: "pointer",
      },
    },

    // Thumbnail topo
    React.createElement(
      "div",
      {
        style: {
          width: "100%",
          aspectRatio: "16/9",
          background: `linear-gradient(135deg, ${cor}15 0%, rgba(15,29,71,0.8) 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: `1px solid ${cor}18`,
        },
      },
      React.createElement(
        "div",
        {
          style: {
            width: 48,
            height: 48,
            borderRadius: 14,
            background: `${cor}18`,
            border: `1px solid ${cor}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        },
        React.createElement(
          "svg",
          { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none" },
          React.createElement("path", {
            d: iconPath,
            stroke: cor,
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          })
        )
      )
    ),

    // Corpo
    React.createElement(
      "div",
      {
        style: {
          padding: "16px 18px 18px",
          display: "flex",
          flexDirection: "column" as const,
          flex: 1,
        },
      },

      // Badges área + tipo
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6,
            marginBottom: 10,
          },
        },
        React.createElement(
          "span",
          {
            style: {
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase" as const,
              color: cor,
              background: `${cor}14`,
              border: `1px solid ${cor}25`,
              padding: "3px 8px",
              borderRadius: 20,
            },
          },
          props.areaLabel
        ),
        React.createElement(
          "span",
          {
            style: {
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase" as const,
              color: "rgba(105,158,218,0.7)",
            },
          },
          props.type
        )
      ),

      // Título
      React.createElement(
        "p",
        {
          style: {
            fontFamily: "var(--font-syne, Syne, sans-serif)",
            fontWeight: 700,
            fontSize: 15,
            lineHeight: 1.35,
            color: "#E9F2FF",
            letterSpacing: "-0.01em",
            flex: 1,
            marginBottom: 16,
            margin: "0 0 16px 0",
          },
        },
        props.title
      ),

      // Rodapé
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 12,
            borderTop: "1px solid rgba(64,150,242,0.1)",
          },
        },
        React.createElement(
          "span",
          { style: { fontSize: 13, fontWeight: 600, color: cor } },
          "Ver detalhes"
        ),
        React.createElement(
          "span",
          {
            style: {
              width: 28,
              height: 28,
              borderRadius: 8,
              background: `${cor}14`,
              border: `1px solid ${cor}28`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          React.createElement(
            "svg",
            { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none" },
            React.createElement("path", {
              d: "M7 17L17 7M17 7H8M17 7V16",
              stroke: cor,
              strokeWidth: "2.2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            })
          )
        )
      )
    )
  );

  // Wrapper <a> puro — sem next/link para evitar conflito com React.createElement
  return React.createElement(
    "a",
    {
      href,
      style: {
        textDecoration: "none",
        display: "block",
        height: "100%",
      },
    },
    card
  );
}