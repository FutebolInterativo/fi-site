import React from "react";
import type { Curso } from "@/lib/cursos";
import CursoCTA from "./CursoCTA";
import CursoForm from "./CursoForm";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const areaColors: Record<string, string> = {
  "tecnica-e-tatica": "#4096F2",
  "comunicacao-marketing": "#818CF8",
  "saude": "#2DD4BF",
  "gestao-e-operacao": "#F59E0B",
};

function CheckIcon({ color }: { color: string }) {
  return React.createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, style: { flexShrink: 0, width: 18, height: 18, marginTop: 2 } },
    React.createElement("path", { d: "M5 12.5l4.2 4.2L19 7", stroke: color, strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" })
  );
}

// ─── Seção claro (fundo branco/azul claro) ───
function SectionLight({ eyebrow, title, children }: { eyebrow?: string; title: string; children: React.ReactNode }) {
  return React.createElement(
    "section",
    { style: { background: "#E9F2FB", padding: "clamp(48px,8vh,96px) clamp(20px,5vw,64px)" } },
    React.createElement(
      "div",
      { style: { maxWidth: 1040, margin: "0 auto" } },
      eyebrow && React.createElement(
        "p",
        { style: { fontFamily: M, fontWeight: 700, fontSize: "clamp(11px,2.4vw,14px)", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#2E6CA8", marginBottom: 12 } },
        eyebrow
      ),
      React.createElement(
        "h2",
        { style: { fontFamily: F, fontWeight: 400, fontSize: "clamp(28px,6vw,52px)", lineHeight: 0.95, letterSpacing: "0.01em", color: "#103B66", marginBottom: "clamp(24px,4vh,44px)" } },
        title
      ),
      children
    )
  );
}

// ─── Seção azul médio ───
function SectionBlue({ eyebrow, title, children }: { eyebrow?: string; title: string; children: React.ReactNode }) {
  return React.createElement(
    "section",
    { style: { background: "#0C5896", padding: "clamp(48px,8vh,96px) clamp(20px,5vw,64px)" } },
    React.createElement(
      "div",
      { style: { maxWidth: 1040, margin: "0 auto" } },
      eyebrow && React.createElement(
        "p",
        { style: { fontFamily: M, fontWeight: 700, fontSize: "clamp(11px,2.4vw,14px)", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.9)", marginBottom: 12 } },
        eyebrow
      ),
      React.createElement(
        "h2",
        { style: { fontFamily: F, fontWeight: 400, fontSize: "clamp(28px,6vw,52px)", lineHeight: 0.95, letterSpacing: "0.01em", color: "#fff", marginBottom: "clamp(24px,4vh,44px)" } },
        title
      ),
      children
    )
  );
}

// ─── Seção escura (navy) ───
function SectionDark({ eyebrow, title, children }: { eyebrow?: string; title: string; children: React.ReactNode }) {
  return React.createElement(
    "section",
    { style: { background: "#03263F", padding: "clamp(48px,8vh,96px) clamp(20px,5vw,64px)" } },
    React.createElement(
      "div",
      { style: { maxWidth: 1040, margin: "0 auto" } },
      eyebrow && React.createElement(
        "p",
        { style: { fontFamily: M, fontWeight: 700, fontSize: "clamp(11px,2.4vw,14px)", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#A9D8F5", marginBottom: 12 } },
        eyebrow
      ),
      React.createElement(
        "h2",
        { style: { fontFamily: F, fontWeight: 400, fontSize: "clamp(28px,6vw,52px)", lineHeight: 0.95, letterSpacing: "0.01em", color: "#fff", marginBottom: "clamp(24px,4vh,44px)" } },
        title
      ),
      children
    )
  );
}

// ─── Linha do check ───
function CheckItem({ text, cor, light }: { text: string; cor: string; light?: boolean }) {
  return React.createElement(
    "li",
    {
      style: {
        display: "flex", alignItems: "flex-start", gap: 10,
        fontFamily: M, fontWeight: 500, fontSize: "clamp(13px,1.6vw,15px)", lineHeight: 1.45,
        color: light ? "rgba(255,255,255,0.9)" : "#1B3F63",
      }
    },
    React.createElement(CheckIcon, { color: light ? "#4ADBF8" : cor }),
    React.createElement("span", null, text)
  );
}

export default function CursoDetalhe({ curso }: { curso: Curso }) {
  const cor = areaColors[curso.area] || "#0C98FC";

  // ── HERO ──────────────────────────────────────────────────────────────────
  const hero = React.createElement(
    "section",
    {
      style: {
        background: "linear-gradient(160deg,#021829 0%,#03263F 55%,#052e4d 100%)",
        padding: "120px clamp(20px,5vw,64px) clamp(48px,8vh,80px)",
      }
    },
    React.createElement(
      "div",
      { style: { maxWidth: 1040, margin: "0 auto" } },

      // Eyebrow + badge de área
      React.createElement(
        "div",
        { style: { display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: 10, marginBottom: 20 } },
        React.createElement(
          "span",
          {
            style: {
              fontFamily: M, fontWeight: 700, fontSize: 11, letterSpacing: "0.12em",
              textTransform: "uppercase" as const, color: cor,
              background: `${cor}20`, padding: "5px 14px", borderRadius: 20,
              border: `1px solid ${cor}40`,
            }
          },
          curso.area === "tecnica-e-tatica" ? "Técnica e Tática"
            : curso.area === "comunicacao-marketing" ? "Comunicação"
            : curso.area === "saude" ? "Saúde"
            : "Gestão e Operação"
        ),
        React.createElement(
          "span",
          {
            style: {
              fontFamily: M, fontWeight: 700, fontSize: 11, letterSpacing: "0.08em",
              textTransform: "uppercase" as const, color: "rgba(244,244,244,0.45)",
              background: "rgba(255,255,255,0.06)", padding: "5px 14px", borderRadius: 20,
            }
          },
          curso.type
        )
      ),

      // Título
      React.createElement(
        "h1",
        {
          style: {
            fontFamily: F, fontWeight: 400,
            fontSize: "clamp(38px,5.5vw,72px)", lineHeight: 0.93, letterSpacing: "0.01em",
            color: "#F4F4F4", marginBottom: 20,
          }
        },
        curso.title
      ),

      // Subheadline
      curso.subheadline && React.createElement(
        "p",
        {
          style: {
            fontFamily: M, fontWeight: 500, fontSize: "clamp(15px,1.6vw,18px)",
            lineHeight: 1.6, color: "rgba(244,244,244,0.75)", maxWidth: 640, marginBottom: 28,
          }
        },
        curso.subheadline
      ),

      // Stats da linha
      (curso.cargaHoraria || curso.numAulas || curso.formato) && React.createElement(
        "div",
        { style: { display: "flex", flexWrap: "wrap" as const, gap: 0, marginBottom: 40 } },
        ...[
          curso.cargaHoraria && { num: curso.cargaHoraria, label: "Carga horária" },
          curso.numAulas && { num: String(curso.numAulas), label: "Aulas" },
          curso.formato && { num: curso.formato, label: "Formato" },
        ].filter(Boolean).map((s: any, i: number, arr: any[]) =>
          React.createElement(
            "div",
            {
              key: s.label,
              style: {
                paddingRight: 24, marginRight: 24,
                borderRight: i < arr.length - 1 ? "1px solid rgba(140,200,245,0.2)" : "none",
              }
            },
            React.createElement("div", { style: { fontFamily: F, fontSize: "clamp(24px,3vw,40px)", lineHeight: 1, color: "#F4F4F4" } }, s.num),
            React.createElement("div", { style: { fontFamily: M, fontWeight: 700, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#A9D8F5", marginTop: 5 } }, s.label)
          )
        )
      ),

      // Descrição curta / para quem é
      curso.headline && React.createElement(
        "p",
        { style: { fontFamily: M, fontWeight: 500, fontSize: 15, lineHeight: 1.7, color: "rgba(244,244,244,0.65)", maxWidth: 580 } },
        curso.headline
      )
    )
  );

  // ── PARA QUEM É ──────────────────────────────────────────────────────────
  const paraQuem = curso.paraQuem && curso.paraQuem.length > 0 && SectionLight(
    {
      eyebrow: "Para quem é este curso",
      title: "ESTE CURSO É PARA VOCÊ SE...",
      children: React.createElement(
        "ul",
        { style: { listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 12 } },
        ...curso.paraQuem.map((item, i) =>
          React.createElement(CheckItem, { key: i, text: item, cor })
        )
      )
    }
  );

  // ── EMENTA ───────────────────────────────────────────────────────────────
  const ementa = curso.ementa && curso.ementa.length > 0 && SectionBlue(
    {
      eyebrow: "Conteúdo do curso",
      title: "O QUE VOCÊ VAI APRENDER",
      children: React.createElement(
        "div",
        { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 } },
        ...curso.ementa.map((item, i) =>
          React.createElement(
            "div",
            {
              key: i,
              style: {
                display: "flex", alignItems: "flex-start", gap: 12,
                background: "rgba(255,255,255,0.07)", borderRadius: 14, padding: "14px 18px",
                border: "1px solid rgba(255,255,255,0.1)",
              }
            },
            React.createElement(
              "span",
              {
                style: {
                  fontFamily: F, fontSize: 13, color: "rgba(169,216,245,0.6)",
                  flexShrink: 0, width: 28, lineHeight: 1.2,
                }
              },
              String(i + 1).padStart(2, "0")
            ),
            React.createElement(
              "span",
              { style: { fontFamily: M, fontWeight: 500, fontSize: 14, lineHeight: 1.45, color: "rgba(255,255,255,0.9)" } },
              item
            )
          )
        )
      )
    }
  );

  // ── MENTORES ─────────────────────────────────────────────────────────────
  const mentores = curso.mentores && curso.mentores.length > 0 && SectionLight(
    {
      eyebrow: "Quem vai te ensinar",
      title: "OS MENTORES",
      children: React.createElement(
        "div",
        { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "clamp(16px,3vw,28px)" } },
        ...curso.mentores.map((m, i) =>
          React.createElement(
            "div",
            { key: i, style: { display: "flex", flexDirection: "column" as const, gap: 12 } },
            m.foto && React.createElement(
              "div",
              { style: { borderRadius: 18, overflow: "hidden", background: "#d8e8f4", aspectRatio: "3/4" } },
              React.createElement("img", {
                src: m.foto, alt: m.nome,
                style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }
              })
            ),
            React.createElement("div", { style: { fontFamily: F, fontSize: "clamp(18px,2.4vw,24px)", lineHeight: 1, color: "#103B66" } }, m.nome),
            m.cargo && React.createElement("div", { style: { fontFamily: M, fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: cor } }, m.cargo),
            m.bio && React.createElement("div", { style: { fontFamily: M, fontWeight: 500, fontSize: 13, lineHeight: 1.55, color: "#3F5F7C" } }, m.bio)
          )
        )
      )
    }
  );

  // ── DIFERENCIAIS ─────────────────────────────────────────────────────────
  const diferenciais = curso.diferenciais && curso.diferenciais.length > 0 && SectionDark(
    {
      eyebrow: "Por que escolher este curso",
      title: "DIFERENCIAIS DO CURSO",
      children: React.createElement(
        "ul",
        { style: { listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 } },
        ...curso.diferenciais.map((d, i) =>
          React.createElement(
            "li",
            {
              key: i,
              style: {
                display: "flex", alignItems: "flex-start", gap: 10,
                fontFamily: M, fontWeight: 500, fontSize: 14, lineHeight: 1.45,
                color: "rgba(255,255,255,0.88)",
                background: "rgba(12,152,252,0.08)", borderRadius: 14, padding: "14px 16px",
                border: "1px solid rgba(140,200,245,0.15)",
              }
            },
            React.createElement(CheckIcon, { color: "#4ADBF8" }),
            React.createElement("span", null, d)
          )
        )
      )
    }
  );

  // ── EXPERIÊNCIA PRÁTICA ───────────────────────────────────────────────────
  const expPratica = curso.experienciaPratica && curso.experienciaPratica.length > 0 && SectionBlue(
    {
      eyebrow: "Prática incluída",
      title: "EXPERIÊNCIA PRÁTICA",
      children: React.createElement(
        "ul",
        { style: { listStyle: "none", display: "flex", flexDirection: "column" as const, gap: 10 } },
        ...curso.experienciaPratica.map((item, i) =>
          React.createElement(CheckItem, { key: i, text: item, cor: "#4ADBF8", light: true })
        )
      )
    }
  );

  // ── DEPOIMENTOS ───────────────────────────────────────────────────────────
  const depoimentos = curso.depoimentos && curso.depoimentos.length > 0 && React.createElement(
    "section",
    { style: { background: "#fff", padding: "clamp(48px,8vh,96px) clamp(20px,5vw,64px)" } },
    React.createElement(
      "div",
      { style: { maxWidth: 1040, margin: "0 auto" } },
      React.createElement("p", { style: { fontFamily: M, fontWeight: 700, fontSize: "clamp(11px,2.4vw,14px)", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#2E6CA8", marginBottom: 12 } }, "Depoimentos"),
      React.createElement("h2", { style: { fontFamily: F, fontWeight: 400, fontSize: "clamp(28px,6vw,52px)", lineHeight: 0.95, color: "#103B66", marginBottom: "clamp(24px,4vh,44px)" } }, "QUEM JÁ CURSOU"),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(curso.depoimentos.length, 3)}, 1fr)`,
            gap: "clamp(20px,3vw,36px)",
          }
        },
        ...curso.depoimentos.map((d, i) =>
          React.createElement(
            "div",
            { key: i, style: { display: "flex", flexDirection: "column" as const } },
            React.createElement(
              "div",
              { style: { borderRadius: 18, overflow: "hidden", background: "#07101c", aspectRatio: "16/9", marginBottom: 18 } },
              React.createElement(
                "iframe",
                {
                  src: `https://www.youtube.com/embed/${d.youtubeId}`,
                  title: d.nome,
                  style: { width: "100%", height: "100%", border: "none", display: "block" },
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                  allowFullScreen: true,
                }
              )
            ),
            React.createElement("div", { style: { fontFamily: F, fontWeight: 400, fontSize: "clamp(22px,2.8vw,30px)", lineHeight: 1, color: "#103B66", marginBottom: 8 } }, d.nome),
            d.texto && React.createElement("div", { style: { fontFamily: M, fontWeight: 500, fontSize: 14, lineHeight: 1.5, color: "#3F5F7C" } }, d.texto)
          )
        )
      )
    )
  );

  // ── STATS ─────────────────────────────────────────────────────────────────
  const stats = curso.stats && curso.stats.length > 0 && React.createElement(
    "section",
    { style: { background: "#fff", padding: "clamp(40px,6vh,64px) clamp(20px,5vw,64px)" } },
    React.createElement(
      "div",
      { style: { maxWidth: 1040, margin: "0 auto", display: "flex", justifyContent: "center", flexWrap: "wrap" as const, gap: "clamp(28px,6vw,72px)" } },
      ...curso.stats.map((s, i) =>
        React.createElement(
          "div",
          { key: i, style: { textAlign: "center" as const } },
          React.createElement("div", { style: { fontFamily: F, fontSize: "clamp(40px,7vw,72px)", lineHeight: 0.9, color: "#8FCBEF", letterSpacing: "0.01em" } }, s.num),
          React.createElement("div", { style: { fontFamily: F, fontSize: "clamp(12px,2vw,16px)", letterSpacing: "0.02em", color: "#103B66", marginTop: 6 } }, s.label)
        )
      )
    )
  );

  // ── OFERTA / CTA ──────────────────────────────────────────────────────────
  const oferta = (curso.preco || curso.checkoutUrl || curso.hubspotFormId) && React.createElement(
    "section",
    { id: "oferta", style: { background: "#fff", padding: "clamp(48px,8vh,96px) clamp(20px,5vw,64px)" } },
    React.createElement(
      "div",
      { style: { maxWidth: 860, margin: "0 auto" } },
      React.createElement("p", { style: { fontFamily: M, fontWeight: 700, fontSize: "clamp(11px,2.4vw,14px)", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#2E6CA8", marginBottom: 10, textAlign: "center" as const } }, "Garanta sua vaga"),
      React.createElement("h2", { style: { fontFamily: F, fontWeight: 400, fontSize: "clamp(32px,6vw,60px)", lineHeight: 0.95, color: "#103B66", marginBottom: "clamp(28px,4vh,48px)", textAlign: "center" as const } }, "INVISTA NA SUA CARREIRA"),
      React.createElement(
        "div",
        { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(18px,3vw,24px)", alignItems: "start" } },
        // card de oferta navy
        React.createElement(CursoCTA, { curso }),
        // formulário HubSpot (quando disponível)
        curso.hubspotPortalId && curso.hubspotFormId && React.createElement(
          "div",
          { style: { background: "#E9F2FB", borderRadius: 24, padding: "clamp(22px,3vw,32px)" } },
          React.createElement("p", { style: { fontFamily: F, fontSize: "clamp(20px,2.4vw,28px)", lineHeight: 1, color: "#103B66", marginBottom: 16 } }, "FALE COM UM CONSULTOR"),
          React.createElement("p", { style: { fontFamily: M, fontWeight: 500, fontSize: 14, lineHeight: 1.55, color: "#3F5F7C", marginBottom: 20 } }, "Tire suas dúvidas sobre o curso antes de se inscrever."),
          React.createElement(CursoForm, null)
        )
      )
    )
  );

  // ── GARANTIA ─────────────────────────────────────────────────────────────
  const garantia = curso.garantiaTexto && React.createElement(
    "section",
    { style: { background: "#fff", padding: "0 clamp(20px,5vw,64px) clamp(48px,8vh,80px)" } },
    React.createElement(
      "div",
      {
        style: {
          maxWidth: 860, margin: "0 auto",
          background: "#E9F2FB", borderRadius: 28,
          padding: "clamp(28px,5vw,48px) clamp(24px,4vw,56px)",
          display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: "clamp(20px,3vw,36px)",
        }
      },
      React.createElement(
        "div",
        {
          style: {
            width: "clamp(80px,16vw,110px)", height: "clamp(80px,16vw,110px)", flexShrink: 0,
            borderRadius: "50%", background: "#BFE0F5",
            display: "flex", alignItems: "center", justifyContent: "center",
          }
        },
        React.createElement(
          "svg",
          { width: 40, height: 40, viewBox: "0 0 24 24", fill: "none" },
          React.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", stroke: "#15538F", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        )
      ),
      React.createElement(
        "div",
        { style: { flex: 1, minWidth: 200 } },
        React.createElement("h3", { style: { fontFamily: F, fontWeight: 400, fontSize: "clamp(22px,3.5vw,34px)", letterSpacing: "0.01em", color: "#15538F", marginBottom: 10 } }, "GARANTIA FI"),
        React.createElement("p", { style: { fontFamily: M, fontWeight: 500, fontSize: "clamp(13px,1.4vw,15px)", lineHeight: 1.6, color: "#3F5F7C" } }, curso.garantiaTexto)
      )
    )
  );

  return React.createElement(
    "div",
    null,
    hero,
    curso.paraQuem && paraQuem,
    curso.ementa && ementa,
    curso.mentores && mentores,
    curso.diferenciais && diferenciais,
    curso.experienciaPratica && expPratica,
    curso.depoimentos && depoimentos,
    curso.stats && stats,
    oferta,
    garantia
  );
}