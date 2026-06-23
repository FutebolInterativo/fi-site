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
const areaLabels: Record<string, string> = {
  "tecnica-e-tatica": "Técnica e Tática",
  "comunicacao-marketing": "Comunicação",
  "saude": "Saúde",
  "gestao-e-operacao": "Gestão e Operação",
};

function ytEmbed(url: string) {
  const m = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : "";
}

export default function CursoDetalhe({ curso }: { curso: Curso }) {
  const cor = areaColors[curso.area] || "#0C98FC";
  const areaLabel = areaLabels[curso.area] || curso.area;

  const diferenciais = (curso.diferenciais || []).map((item, i) =>
    React.createElement("div", {
      key: i,
      style: { display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(12,90,150,0.1)", fontFamily: M, fontSize: 13.5, fontWeight: 600, color: "#F4F4F4", lineHeight: 1.3 },
    },
      React.createElement("span", { style: { width: 26, height: 26, flexShrink: 0, borderRadius: 8, background: `${cor}22`, border: `1px solid ${cor}44`, display: "flex", alignItems: "center", justifyContent: "center", color: cor, fontWeight: 700, fontSize: 13 } }, "✓"),
      item
    )
  );

  const paraQuem = (curso.paraQuem || []).map((item, i) =>
    React.createElement("li", {
      key: i,
      style: { display: "flex", alignItems: "flex-start", gap: 12, fontFamily: M, fontSize: 15, lineHeight: 1.55, color: "rgba(244,244,244,0.85)", marginBottom: 14 },
    },
      React.createElement("span", { style: { flexShrink: 0, width: 24, height: 24, borderRadius: 8, background: `${cor}22`, border: `1px solid ${cor}44`, display: "flex", alignItems: "center", justifyContent: "center", color: cor, fontSize: 13, fontWeight: 700, marginTop: 1 } }, "→"),
      item
    )
  );

  const ementa = (curso.ementa || []).map((it, i) =>
    React.createElement("div", {
      key: i,
      style: { display: "flex", gap: 14, padding: "16px 0", borderTop: i === 0 ? "none" : "1px solid rgba(140,200,245,0.1)" },
    },
      React.createElement("div", { style: { fontFamily: F, fontSize: 18, color: cor, flexShrink: 0, width: 34, lineHeight: 1.2 } }, String(i + 1).padStart(2, "0")),
      React.createElement("div", null,
        React.createElement("div", { style: { fontFamily: M, fontWeight: 700, fontSize: 15, color: "#F4F4F4", marginBottom: it.descricao ? 5 : 0 } }, it.titulo),
        it.descricao ? React.createElement("div", { style: { fontFamily: M, fontSize: 13.5, lineHeight: 1.55, color: "rgba(244,244,244,0.6)" } }, it.descricao) : null
      )
    )
  );

  const mentores = (curso.mentores || []).map((m, i) =>
    React.createElement("div", {
      key: i,
      style: { display: "flex", flexDirection: "column" as const, alignItems: "center", textAlign: "center" as const, padding: 18, borderRadius: 16, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(12,90,150,0.12)" },
    },
      React.createElement("img", { src: m.foto, alt: m.nome, loading: "lazy", style: { width: 88, height: 88, borderRadius: "50%", objectFit: "cover" as const, marginBottom: 12, border: `2px solid ${cor}55` } }),
      React.createElement("div", { style: { fontFamily: F, fontSize: 16, color: "#F4F4F4", marginBottom: 4 } }, m.nome),
      React.createElement("div", { style: { fontFamily: M, fontSize: 12, lineHeight: 1.4, color: "rgba(244,244,244,0.6)" } }, m.bio)
    )
  );

  const expPratica = (curso.experienciaPratica || []).map((item, i) =>
    React.createElement("div", {
      key: i,
      style: { display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(12,90,150,0.1)", fontFamily: M, fontSize: 14, lineHeight: 1.45, color: "rgba(244,244,244,0.85)" },
    },
      React.createElement("span", { style: { color: cor, flexShrink: 0, fontWeight: 700, marginTop: 1 } }, "▸"),
      item
    )
  );

  const depoimentos = (curso.depoimentos || []).map((d, i) =>
    React.createElement("div", {
      key: i,
      style: { borderRadius: 16, overflow: "hidden", border: "1px solid rgba(140,200,245,0.14)", background: "rgba(12,90,150,0.12)" },
    },
      d.videoUrl
        ? React.createElement("div", { style: { position: "relative" as const, paddingBottom: "56.25%", height: 0 } },
            React.createElement("iframe", { src: ytEmbed(d.videoUrl), title: d.nome, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, style: { position: "absolute" as const, top: 0, left: 0, width: "100%", height: "100%", border: 0 } })
          )
        : null,
      React.createElement("div", { style: { padding: "14px 16px 18px" } },
        React.createElement("div", { style: { fontFamily: F, fontSize: 16, color: "#F4F4F4", marginBottom: 4 } }, d.nome),
        d.papel ? React.createElement("div", { style: { fontFamily: M, fontSize: 12.5, lineHeight: 1.4, color: cor } }, d.papel) : null
      )
    )
  );

  const stats = (curso.stats || []).map((s, i) =>
    React.createElement("div", {
      key: i,
      style: { textAlign: "center" as const, padding: "22px 14px", borderRadius: 16, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(12,90,150,0.12)" },
    },
      React.createElement("div", { style: { fontFamily: F, fontSize: "clamp(28px,5vw,40px)", color: cor, lineHeight: 1 } }, s.valor),
      React.createElement("div", { style: { fontFamily: M, fontSize: 12.5, fontWeight: 600, color: "rgba(244,244,244,0.7)", marginTop: 8 } }, s.label)
    )
  );

  return (
    <div>
      {/* HERO */}
      <div style={{ background: "radial-gradient(900px 500px at 80% -10%, rgba(12,152,252,0.12), transparent 60%), linear-gradient(180deg,#021829 0%,#03263F 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-14">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-start">
            {/* texto */}
            <div className="flex-1">
              <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
                <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: cor, background: `${cor}1A`, padding: "5px 12px", borderRadius: 20 }}>{areaLabel}</span>
                <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(244,244,244,0.55)", background: "rgba(255,255,255,0.06)", padding: "5px 12px", borderRadius: 20 }}>{curso.type}</span>
              </div>
              <h1 style={{ fontFamily: F, fontSize: "clamp(30px,5.5vw,56px)", lineHeight: 0.98, color: "#F4F4F4", marginBottom: 18, letterSpacing: "0.01em" }}>{curso.headline || curso.title}</h1>
              {curso.subheadline ? <p style={{ fontFamily: M, fontSize: 16, fontWeight: 500, lineHeight: 1.65, color: "rgba(244,244,244,0.7)", marginBottom: 28, maxWidth: 560 }}>{curso.subheadline}</p> : null}
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                {curso.cargaHoraria ? <Meta label="Certificado" value={curso.cargaHoraria} cor={cor} /> : null}
                {curso.numAulas ? <Meta label="Conteúdo" value={curso.numAulas} cor={cor} /> : null}
                {curso.formato ? <Meta label="Formato" value={curso.formato} cor={cor} /> : null}
              </div>
            </div>
            {/* oferta */}
            <div className="w-full lg:w-[360px] lg:flex-shrink-0">
              <CursoCTA curso={curso} />
            </div>
          </div>
        </div>
      </div>

      {/* CORPO */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {diferenciais.length > 0 ? (
          <Section eyebrow="O que está incluído" titulo="Neste curso você terá" cor={cor}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{diferenciais}</div>
          </Section>
        ) : null}

        {paraQuem.length > 0 ? (
          <Section eyebrow="Público" titulo="Para quem é este curso" cor={cor}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>{paraQuem}</ul>
          </Section>
        ) : null}

        {ementa.length > 0 ? (
          <Section eyebrow="Conteúdo programático" titulo="Tudo que você vai aprender" cor={cor}>
            <div style={{ borderRadius: 18, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(12,90,150,0.08)", padding: "8px 22px" }}>{ementa}</div>
          </Section>
        ) : null}

        {mentores.length > 0 ? (
          <Section eyebrow="Mentores" titulo="Com quem você vai aprender" cor={cor}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">{mentores}</div>
          </Section>
        ) : null}

        {expPratica.length > 0 ? (
          <Section eyebrow="Diferencial FI" titulo="Experiência prática em grandes clubes" cor={cor}>
            <p style={{ fontFamily: M, fontSize: 15, lineHeight: 1.6, color: "rgba(244,244,244,0.75)", marginBottom: 20 }}>Após as aulas, você é inserido em um clube parceiro para atuar como um verdadeiro analista. Na prática, você vai:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{expPratica}</div>
          </Section>
        ) : null}

        {depoimentos.length > 0 ? (
          <Section eyebrow="Depoimentos" titulo="Quem viveu, recomenda" cor={cor}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{depoimentos}</div>
          </Section>
        ) : null}

        {stats.length > 0 ? (
          <Section eyebrow="Números" titulo="O melhor do Futebol Interativo" cor={cor}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{stats}</div>
          </Section>
        ) : null}

        {/* CTA final + formulário */}
        <div style={{ marginTop: 8, borderRadius: 22, border: `1px solid ${cor}33`, background: "linear-gradient(180deg, rgba(12,90,150,0.16), rgba(3,38,63,0.3))", padding: "32px 28px" }}>
          <h2 style={{ fontFamily: F, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1.02, color: "#F4F4F4", marginBottom: 10, textAlign: "center" }}>Garanta sua vaga</h2>
          <p style={{ fontFamily: M, fontSize: 14.5, lineHeight: 1.6, color: "rgba(244,244,244,0.7)", textAlign: "center", maxWidth: 460, margin: "0 auto 24px" }}>Inscreva-se agora ou preencha o formulário para tirar dúvidas com nossa equipe.</p>
          <div className="max-w-sm mx-auto">
            <CursoCTA curso={curso} />
          </div>
          {curso.hubspotFormId ? (
            <div style={{ marginTop: 28, borderTop: "1px solid rgba(140,200,245,0.14)", paddingTop: 26 }}>
              <div style={{ fontFamily: M, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9D8F5", marginBottom: 16, textAlign: "center" }}>Ainda com dúvidas? Fale com a gente</div>
              <CursoForm curso={curso} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value, cor }: { label: string; value: string; cor: string }) {
  return (
    <div>
      <div style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: cor, marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: M, fontSize: 15, fontWeight: 600, color: "#F4F4F4" }}>{value}</div>
    </div>
  );
}

function Section({ eyebrow, titulo, cor, children }: { eyebrow?: string; titulo: string; cor: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 52 }}>
      {eyebrow ? <div style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: cor, marginBottom: 8 }}>{eyebrow}</div> : null}
      <h2 style={{ fontFamily: F, fontSize: "clamp(22px,3.5vw,32px)", lineHeight: 1.05, color: "#F4F4F4", marginBottom: 22 }}>{titulo}</h2>
      {children}
    </section>
  );
}
