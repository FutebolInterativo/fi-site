"use client";
import React from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const areaColors: Record<string, string> = {
  "tecnica-e-tatica": "#4096F2",
  "comunicacao-marketing": "#818CF8",
  "saude": "#2DD4BF",
  "gestao-e-operacao": "#F59E0B",
};

const areaBg: Record<string, string> = {
  "tecnica-e-tatica": "rgba(64,150,242,0.08)",
  "comunicacao-marketing": "rgba(129,140,248,0.08)",
  "saude": "rgba(45,212,191,0.08)",
  "gestao-e-operacao": "rgba(245,158,11,0.08)",
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
  const cor = areaColors[props.area] || "#0C98FC";
  const bg = areaBg[props.area] || "rgba(12,152,252,0.08)";

  return React.createElement(
    "a",
    {
      href: props.externalUrl,
      target: "_blank",
      rel: "noreferrer",
      style: {
        textDecoration: "none",
        display: "flex",
        flexDirection: "column" as const,
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(140,200,245,0.14)",
        background: "#04395f",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          width: "100%",
          aspectRatio: "16/9",
          background: `linear-gradient(135deg,${bg},rgba(4,57,95,0.8))`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 16px",
          borderBottom: "1px solid rgba(140,200,245,0.08)",
        },
      },
      React.createElement(
        "span",
        {
          style: {
            fontFamily: F,
            fontSize: 11,
            color: `${cor}88`,
            textAlign: "center" as const,
            textTransform: "uppercase" as const,
          },
        },
        props.title
      )
    ),
    React.createElement(
      "div",
      {
        style: {
          padding: "16px 18px 20px",
          display: "flex",
          flexDirection: "column" as const,
          flex: 1,
        },
      },
      React.createElement(
        "div",
        { style: { display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" as const } },
        React.createElement(
          "span",
          {
            style: {
              fontFamily: M,
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase" as const,
              color: cor,
              background: `${cor}18`,
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
              fontFamily: M,
              fontSize: 10,
              fontWeight: 700,
              color: "rgba(244,244,244,0.45)",
              background: "rgba(255,255,255,0.06)",
              padding: "3px 8px",
              borderRadius: 20,
            },
          },
          props.type
        )
      ),
      React.createElement(
        "div",
        {
          style: {
            fontFamily: F,
            fontSize: 17,
            lineHeight: 1.05,
            color: "#F4F4F4",
            marginBottom: 16,
            flex: 1,
          },
        },
        props.title
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
        },
        React.createElement(
          "span",
          { style: { fontFamily: M, fontSize: 13, fontWeight: 700, color: cor } },
          "Ver detalhes"
        ),
        React.createElement(
          "span",
          {
            style: {
              width: 30,
              height: 30,
              borderRadius: 9,
              background: `${cor}18`,
              border: `1px solid ${cor}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: cor,
              fontSize: 16,
            },
          },
          "→"
        )
      )
    )
  );
}