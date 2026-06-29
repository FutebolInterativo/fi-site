"use client";
import React, { useState } from "react";
import type { Curso } from "@/lib/cursos";
import CursoCTA from "./CursoCTA";
import CursoForm from "./CursoForm";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const AREA_COR: Record<string, string> = {
  "tecnica-e-tatica":      "#4096F2",
  "comunicacao-marketing": "#818CF8",
  "saude":                 "#2DD4BF",
  "gestao-e-operacao":     "#F59E0B",
};
const AREA_LABEL: Record<string, string> = {
  "tecnica-e-tatica":      "Técnica e Tática",
  "comunicacao-marketing": "Comunicação",
  "saude":                 "Saúde",
  "gestao-e-operacao":     "Gestão e Operação",
};

function ytId(url: string) {
  return url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)?.[1] ?? "";
}

export default function CursoDetalhe({ curso }: { curso: Curso }) {
  const cor = AREA_COR[curso.area] ?? "#4096F2";
  const label = AREA_LABEL[curso.area] ?? curso.area;
  const url = curso.checkoutUrl ?? curso.externalUrl;
  const [openTab, setOpenTab] = useState<number | null>(null);

  // ══════════════════════════════════════════════════════════════════════
  // HERO — Logo + título + mockup de tela
  // ══════════════════════════════════════════════════════════════════════
  return (
    <div style={{ background: "#020C18", fontFamily: M }}>

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(160deg, #020C18 0%, #031830 55%, #041E3A 100%)`,
        minHeight: "100svh", display: "flex", alignItems: "center",
        paddingTop: 80, paddingBottom: 0,
        position: "relative", overflow: "hidden",
      }}>
        {/* Glows */}
        <div style={{ position: "absolute", top: 0, left: "-5%", width: "50%", height: "80%", background: `radial-gradient(ellipse 55% 60% at 10% 20%, ${cor}22 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "45%", height: "60%", background: "radial-gradient(ellipse at bottom right, rgba(12,100,200,0.08), transparent 65%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}>

            {/* ESQUERDA */}
            <div style={{ paddingBottom: "clamp(48px,7vh,80px)", paddingTop: "clamp(24px,4vh,48px)" }}>

              {/* Badge área */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px 5px 8px", borderRadius: 99, background: `${cor}18`, border: `1px solid ${cor}40`, marginBottom: 24 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: cor, display: "inline-block", boxShadow: `0 0 10px ${cor}` }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: cor, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{label} · {curso.type}</span>
              </div>

              {/* Título principal */}
              <h1 style={{ fontFamily: F, fontSize: "clamp(36px,5.5vw,72px)", lineHeight: 0.9, color: "#F4F4F4", marginBottom: 20, letterSpacing: "0.01em" }}>
                {curso.title}
              </h1>

              {/* Sub */}
              {curso.subheadline && (
                <p style={{ fontSize: "clamp(14px,1.4vw,16px)", fontWeight: 400, lineHeight: 1.7, color: "rgba(244,244,244,0.5)", marginBottom: 32, borderLeft: `3px solid ${cor}`, paddingLeft: 14, maxWidth: 460 }}>
                  {curso.subheadline}
                </p>
              )}

              {/* Stats em linha */}
              {(curso.cargaHoraria || curso.numAulas || curso.formato) && (
                <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "clamp(20px,3vw,36px)", marginBottom: 36, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {[
                    curso.cargaHoraria && { icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>, v: curso.cargaHoraria, l: "Carga horária" },
                    curso.numAulas && { icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M10 8l6 4-6 4V8z" fill="currentColor"/></svg>, v: String(curso.numAulas), l: "Aulas ao vivo" },
                    curso.formato && { icon: <svg width={18} height={18} viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 20h8M12 18v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>, v: curso.formato, l: "Formato" },
                  ].filter(Boolean).map((s: any, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${cor}16`, border: `1px solid ${cor}30`, display: "flex", alignItems: "center", justifyContent: "center", color: cor }}>{s.icon}</div>
                      <div>
                        <div style={{ fontFamily: F, fontSize: "clamp(20px,2.5vw,28px)", lineHeight: 1, color: "#fff" }}>{s.v}</div>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.4)", marginTop: 3 }}>{s.l}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12 }}>
                <a href="#oferta" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#05A567)", boxShadow: "0 0 40px rgba(8,194,122,0.4), 0 8px 24px rgba(0,0,0,0.4)", border: "1.5px solid rgba(8,194,122,0.8)", fontSize: 15, fontWeight: 700, color: "#fff", textDecoration: "none" }}>
                  Garantir minha vaga
                  <span style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </a>
                <a href="#ementa" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 22px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", fontSize: 14, fontWeight: 600, color: "rgba(244,244,244,0.5)", textDecoration: "none" }}>
                  Ver conteúdo ↓
                </a>
              </div>
            </div>

            {/* DIREITA — Card visual */}
            <div style={{ position: "relative" as const, paddingBottom: "clamp(24px,4vh,48px)", paddingTop: "clamp(24px,4vh,48px)" }}>
              <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/3", position: "relative" as const, background: `linear-gradient(135deg, ${cor}15, #041E3A)`, border: `1px solid ${cor}25`, boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${cor}20` }}>
                {curso.capa
                  ? <img src={curso.capa} alt={curso.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                  : (
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: 16 }}>
                      <div style={{ width: 80, height: 80, borderRadius: 24, background: `${cor}20`, border: `2px solid ${cor}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width={36} height={36} viewBox="0 0 24 24" fill="none"><path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke={cor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5" stroke={cor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <span style={{ fontFamily: F, fontSize: 18, color: "rgba(255,255,255,0.3)" }}>{label}</span>
                    </div>
                  )
                }
                {/* Overlay */}
                <div style={{ position: "absolute", inset: 0, background: curso.capa ? "linear-gradient(to top, rgba(2,12,24,0.85) 25%, transparent 70%)" : "none" }} />
                {/* Badge no canto */}
                <div style={{ position: "absolute", top: 16, right: 16, padding: "6px 12px", borderRadius: 99, background: "rgba(8,194,122,0.15)", border: "1px solid rgba(8,194,122,0.4)", backdropFilter: "blur(8px)" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#08C27A", letterSpacing: "0.1em" }}>● MATRÍCULAS ABERTAS</span>
                </div>
              </div>

              {/* Card de preço flutuante */}
              {curso.preco && (
                <div style={{ position: "absolute", bottom: 10, left: -20, background: "rgba(3,24,48,0.95)", backdropFilter: "blur(16px)", border: `1px solid ${cor}35`, borderRadius: 18, padding: "16px 22px", boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.4)", marginBottom: 4 }}>A partir de</div>
                  <div style={{ fontFamily: F, fontSize: "clamp(22px,3vw,34px)", color: "#fff", lineHeight: 1 }}>
                    {curso.preco.match(/R\$\s*[\d.,]+/)?.[0] ?? curso.preco}
                  </div>
                  <div style={{ fontSize: 11, color: cor, fontWeight: 700, marginTop: 4 }}>
                    {curso.preco.match(/(\d+)[xX]/)?.[1] ?? ""} {curso.preco.match(/(\d+)[xX]/)?.[1] ? "parcelas sem juros" : ""}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Linha cor na base */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent 0%, ${cor} 30%, ${cor} 70%, transparent 100%)`, opacity: 0.4 }} />
      </section>

      {/* ── 2. BARRA DE CREDENCIAIS ─────────────────────────────────────── */}
      <div style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", display: "flex", alignItems: "center", gap: "clamp(20px,4vw,48px)", flexWrap: "wrap" as const }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.3)", flexShrink: 0 }}>Mentores de</span>
          {(curso.mentores?.map(m => m.bio.split(" ").slice(-3).join(" ")) ?? ["Atlético/MG", "Bahia", "Santos FC", "Bayer Leverkusen"]).slice(0, 5).map((c, i) => (
            <span key={i} style={{ fontFamily: F, fontSize: "clamp(12px,1.4vw,15px)", color: "rgba(255,255,255,0.18)", whiteSpace: "nowrap" as const }}>{c}</span>
          ))}
        </div>
      </div>

      {/* ── 3. PARA QUEM ────────────────────────────────────────────────── */}
      {curso.paraQuem && curso.paraQuem.length > 0 && (
        <section style={{ background: "#031525", padding: "clamp(64px,9vh,104px) 0" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
            {/* Título + subtítulo */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,80px)", alignItems: "start", marginBottom: "clamp(40px,6vh,64px)" }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Para quem é</p>
                <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,56px)", lineHeight: 0.91, color: "#F4F4F4" }}>ESTE CURSO É PARA VOCÊ SE...</h2>
                <div style={{ width: 48, height: 3, background: cor, borderRadius: 99, marginTop: 20 }} />
              </div>
              <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "rgba(244,244,244,0.45)", lineHeight: 1.75, paddingTop: 12 }}>
                Se você quer entrar no mercado do futebol e trabalhar com o que ama, esta formação foi feita para o seu momento.
              </p>
            </div>

            {/* Cards em grid 2 colunas */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
              {curso.paraQuem.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "20px 22px", background: "rgba(255,255,255,0.03)", borderLeft: `3px solid ${cor}`, borderRadius: "0 16px 16px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderRight: "1px solid rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <div style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: `${cor}20`, border: `1px solid ${cor}40`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                    <svg width={12} height={12} viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke={cor} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <p style={{ fontSize: "clamp(13px,1.3vw,15px)", fontWeight: 500, color: "rgba(244,244,244,0.78)", lineHeight: 1.55 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. PROFESSORES — foto grande + vídeo ao lado ─────────────────── */}
      {curso.mentores && curso.mentores.length > 0 && (
        <section style={{ background: "#F0F6FF", padding: "clamp(64px,9vh,104px) 0" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Nosso time de professores</p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,60px)", lineHeight: 0.91, color: "#0A1E35", marginBottom: "clamp(40px,6vh,56px)" }}>OS MENTORES</h2>

            {/* Grid de mentores — foto 3/4 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: "clamp(12px,2vw,20px)" }}>
              {curso.mentores.map((m, i) => (
                <div key={i}>
                  {m.foto && (
                    <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "3/4", marginBottom: 12, background: "#C8D8EC", position: "relative" as const, boxShadow: "0 8px 28px rgba(0,40,100,0.13)" }}>
                      <img src={m.foto} alt={m.nome} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
                      <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0, height: "50%", background: `linear-gradient(to top, rgba(10,30,53,0.9), transparent)` }} />
                      <div style={{ position: "absolute" as const, bottom: 12, left: 12, right: 12 }}>
                        <p style={{ fontFamily: F, fontSize: "clamp(13px,1.5vw,16px)", color: "#fff", lineHeight: 1.05, marginBottom: 2 }}>{m.nome}</p>
                        <p style={{ fontSize: 10, color: cor, fontWeight: 700, letterSpacing: "0.06em" }}>{m.bio.split(" ").slice(0, 4).join(" ")}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. EMENTA — acordeão em 2 colunas ──────────────────────────── */}
      {curso.ementa && curso.ementa.length > 0 && (
        <section id="ementa" style={{ background: "#020C18", padding: "clamp(64px,9vh,104px) 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Conteúdo do curso</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: "clamp(36px,5vh,56px)", flexWrap: "wrap" as const }}>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,60px)", lineHeight: 0.91, color: "#F4F4F4" }}>O QUE VOCÊ VAI APRENDER</h2>
              <span style={{ fontFamily: F, fontSize: "clamp(16px,2.5vw,26px)", color: `${cor}55` }}>{curso.ementa.length} módulos</span>
            </div>

            {/* Acordeão em 2 colunas */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "0 clamp(32px,4vw,64px)" }}>
              {curso.ementa.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setOpenTab(openTab === i ? null : i)}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", cursor: "pointer", padding: "0" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 0", borderLeft: openTab === i ? `3px solid ${cor}` : "3px solid transparent", paddingLeft: openTab === i ? 14 : 0, transition: "all 0.2s" }}>
                    <span style={{ fontFamily: F, fontSize: "clamp(18px,2.5vw,28px)", color: openTab === i ? cor : `${cor}30`, flexShrink: 0, width: "2ch", transition: "color 0.2s" }}>{String(i + 1).padStart(2, "0")}</span>
                    <p style={{ flex: 1, fontSize: "clamp(13px,1.3vw,14.5px)", fontWeight: 600, color: openTab === i ? "#fff" : "rgba(244,244,244,0.65)", lineHeight: 1.35, transition: "color 0.2s" }}>{item.titulo}</p>
                    <span style={{ color: openTab === i ? cor : "rgba(255,255,255,0.2)", fontSize: 20, flexShrink: 0, fontWeight: 300, transition: "all 0.2s" }}>{openTab === i ? "−" : "+"}</span>
                  </div>
                  {openTab === i && item.descricao && (
                    <div style={{ paddingLeft: 3 + 16 + 28, paddingBottom: 16, paddingRight: 8 }}>
                      <p style={{ fontSize: 13, color: "rgba(169,216,245,0.4)", lineHeight: 1.7 }}>{item.descricao}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. CTA CENTRAL — "GARANTA HOJE" azul vibrante ────────────────── */}
      <section style={{ background: `linear-gradient(145deg, #0A2547 0%, #0C3060 50%, #082040 100%)`, padding: "clamp(72px,10vh,120px) 0", position: "relative" as const, overflow: "hidden", textAlign: "center" as const }}>
        {/* Efeitos de luz */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "70%", height: "140%", background: `radial-gradient(ellipse, ${cor}18 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", border: `1px solid ${cor}15`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", border: `1px solid ${cor}20`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 250, height: 250, borderRadius: "50%", border: `1px solid rgba(255,255,255,0.05)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative" as const }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: cor, marginBottom: 20 }}>Garante hoje a sua vaga</p>

          <h2 style={{ fontFamily: F, fontSize: "clamp(36px,7vw,88px)", lineHeight: 0.88, color: "#fff", marginBottom: 20 }}>
            INVISTA NA SUA CARREIRA
          </h2>

          <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "rgba(255,255,255,0.45)", marginBottom: "clamp(36px,5vh,52px)", maxWidth: 480, margin: "0 auto clamp(36px,5vh,52px)" }}>
            Mais de 4.500 profissionais já transformaram suas carreiras no futebol com o FI.
          </p>

          {/* Preço enorme centralizado */}
          {curso.preco && (() => {
            const m = curso.preco.match(/(\d+)[xX]\s*R\$\s*([\d.]+),(\d+)/);
            return m ? (
              <div style={{ marginBottom: 36 }}>
                <div style={{ display: "inline-flex", alignItems: "flex-start", gap: 8, color: "#fff" }}>
                  <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", paddingTop: "clamp(10px,2vw,20px)" }}>
                    <span style={{ fontFamily: F, fontSize: "clamp(16px,2.5vw,26px)" }}>{m[1]}x</span>
                    <span style={{ fontFamily: F, fontSize: "clamp(16px,2.5vw,26px)" }}>R$</span>
                  </div>
                  <span style={{ fontFamily: F, fontSize: "clamp(64px,12vw,140px)", lineHeight: 0.85, letterSpacing: "-0.03em" }}>{m[2]}</span>
                  <span style={{ fontFamily: F, fontSize: "clamp(24px,4vw,48px)", paddingTop: "clamp(8px,1.5vw,16px)" }}>,{m[3]}</span>
                </div>
                {curso.precoAvista && (
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 8 }}>ou <strong style={{ color: "rgba(255,255,255,0.5)" }}>{curso.precoAvista}</strong> à vista</p>
                )}
              </div>
            ) : (
              <div style={{ fontFamily: F, fontSize: "clamp(48px,8vw,100px)", color: "#fff", lineHeight: 0.88, marginBottom: 36 }}>{curso.preco}</div>
            );
          })()}

          {/* Botão CTA principal */}
          <div>
            <a href="#oferta" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "18px 40px", borderRadius: 16, background: "linear-gradient(135deg,#08C27A,#05A567)", boxShadow: "0 0 56px rgba(8,194,122,0.5), 0 12px 36px rgba(0,0,0,0.5)", border: "2px solid rgba(10,220,140,0.7)", fontSize: 16, fontWeight: 700, color: "#fff", textDecoration: "none" }}>
              Garantir minha vaga agora
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>

          {/* Formas de pagamento */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 32, flexWrap: "wrap" as const }}>
            {[
              { icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M2 10h20" stroke="currentColor" strokeWidth="1.8"/></svg>, label: "Cartão de crédito" },
              { icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>, label: "Boleto bancário" },
              { icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, label: "Pix" },
            ].map((p: any, i: number) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.35)" }}>
                {p.icon}
                <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.35)" }}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. DIFERENCIAIS ─────────────────────────────────────────────── */}
      {curso.diferenciais && curso.diferenciais.length > 0 && (
        <section style={{ background: "#020C18", padding: "clamp(64px,9vh,104px) 0" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Por que escolher</p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,60px)", lineHeight: 0.91, color: "#F4F4F4", marginBottom: "clamp(40px,6vh,56px)" }}>DIFERENCIAIS DO CURSO</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
              {curso.diferenciais.map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 16, padding: "22px 24px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18 }}>
                  <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 12, background: `${cor}16`, border: `1.5px solid ${cor}35`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width={18} height={18} viewBox="0 0 20 20" fill="none"><path d="M4 10.5l4 4 8-8" stroke={cor} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <p style={{ fontSize: "clamp(13px,1.3vw,14px)", fontWeight: 500, color: "rgba(244,244,244,0.78)", lineHeight: 1.55, marginTop: 10 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. EXPERIÊNCIA PRÁTICA ───────────────────────────────────────── */}
      {curso.experienciaPratica && curso.experienciaPratica.length > 0 && (
        <section style={{ background: `linear-gradient(135deg, ${cor}14 0%, #031525 60%)`, borderTop: `1px solid ${cor}25`, borderBottom: `1px solid ${cor}15`, padding: "clamp(64px,9vh,104px) 0", position: "relative" as const, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "50%", height: "100%", background: `radial-gradient(ellipse, ${cor}08, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative" as const }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,80px)", alignItems: "start" }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Exclusivo Futebol Interativo</p>
                <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,56px)", lineHeight: 0.91, color: "#F4F4F4", marginBottom: 16 }}>VOCÊ ENTRA DENTRO DE UM CLUBE PROFISSIONAL</h2>
                <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "rgba(244,244,244,0.4)", lineHeight: 1.75, marginBottom: 28 }}>
                  Não termina o curso em casa. Você termina dentro de um clube de futebol profissional, vivendo o dia a dia do departamento da sua área.
                </p>
                <a href="#oferta" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 24px", borderRadius: 12, background: cor, fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none" }}>
                  Quero essa experiência
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                {curso.experienciaPratica.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "14px 18px" }}>
                    <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: 7, background: `${cor}25`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                      <svg width={12} height={12} viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke={cor} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <p style={{ fontSize: "clamp(13px,1.2vw,14px)", fontWeight: 500, color: "rgba(244,244,244,0.82)", lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 9. DEPOIMENTOS ───────────────────────────────────────────────── */}
      {curso.depoimentos && curso.depoimentos.length > 0 && (
        <section style={{ background: "#010912", padding: "clamp(64px,9vh,104px) 0" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Resultados reais</p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,60px)", lineHeight: 0.91, color: "#F4F4F4", marginBottom: "clamp(40px,6vh,56px)" }}>QUEM JÁ CURSOU</h2>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(curso.depoimentos.length, 3)}, 1fr)`, gap: "clamp(14px,2vw,22px)" }}>
              {curso.depoimentos.map((d, i) => {
                const vid = d.videoUrl ? ytId(d.videoUrl) : "";
                return (
                  <div key={i}>
                    {vid && (
                      <div style={{ borderRadius: 18, overflow: "hidden", background: "#040f1c", aspectRatio: "16/9", marginBottom: 18, outline: "1px solid rgba(255,255,255,0.06)" }}>
                        <iframe src={`https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1`} title={d.nome} style={{ width: "100%", height: "100%", border: "none", display: "block" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                      </div>
                    )}
                    <p style={{ fontFamily: F, fontSize: "clamp(18px,2.2vw,26px)", lineHeight: 1.05, color: "#F4F4F4", marginBottom: 6 }}>{d.nome}</p>
                    {d.papel && <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: cor, marginBottom: 10 }}>{d.papel}</p>}
                    {d.texto && <p style={{ fontSize: "clamp(13px,1.2vw,14px)", color: "rgba(169,216,245,0.38)", lineHeight: 1.7 }}>&ldquo;{d.texto}&rdquo;</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 10. STATS ────────────────────────────────────────────────────── */}
      {curso.stats && curso.stats.length > 0 && (
        <section style={{ background: "#020C18", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "clamp(52px,8vh,80px) 0" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "clamp(24px,4vw,56px)", textAlign: "center" as const }}>
            {curso.stats.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F, fontSize: "clamp(48px,8vw,88px)", lineHeight: 0.85, color: cor, letterSpacing: "-0.02em" }}>{s.valor}</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.35)", marginTop: 14 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 11. OFERTA FINAL ─────────────────────────────────────────────── */}
      {(curso.preco || curso.checkoutUrl || curso.hubspotFormId) && (
        <section id="oferta" style={{ background: "#F0F6FF", padding: "clamp(64px,9vh,104px) 0" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
            {/* Header com layout diferenciado — título + trust signals */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 32, marginBottom: "clamp(40px,6vh,56px)", paddingBottom: "clamp(28px,4vh,44px)", borderBottom: "1px solid rgba(0,40,100,0.1)" }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Última etapa</p>
                <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.5vw,52px)", lineHeight: 0.91, color: "#0A1E35", marginBottom: 10 }}>GARANTA SUA VAGA AGORA</h2>
                <p style={{ fontSize: 14, color: "#3F5F7C", lineHeight: 1.65, maxWidth: 400 }}>Escolha a melhor forma de começar sua carreira no futebol.</p>
              </div>
              {/* Trust badges */}
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 10, flexShrink: 0 }}>
                {[
                  { icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>, txt: "Garantia de 12 meses" },
                  { icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>, txt: "Compra 100% segura" },
                  { icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>, txt: "+4.500 alunos formados" },
                ].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "#2E6CA8" }}>
                    {b.icon}
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#2E6CA8" }}>{b.txt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(16px,2.5vw,24px)", alignItems: "start" }}>
              <CursoCTA curso={curso} />
              {curso.hubspotPortalId && curso.hubspotFormId && (
                <div style={{ background: "#fff", borderRadius: 24, padding: "clamp(24px,3vw,36px)", boxShadow: "0 4px 32px rgba(0,40,100,0.08)", border: "1px solid rgba(0,40,100,0.06)" }}>
                  <p style={{ fontFamily: F, fontSize: "clamp(18px,2vw,24px)", color: "#0A1E35", marginBottom: 8, lineHeight: 1.05 }}>FALE COM UM CONSULTOR</p>
                  <p style={{ fontSize: 13, color: "#3F5F7C", marginBottom: 20, lineHeight: 1.55 }}>Tire suas dúvidas antes de se inscrever.</p>
                  <CursoForm curso={curso} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── 12. GARANTIA ─────────────────────────────────────────────────── */}
      {curso.garantiaTexto && (
        <section style={{ background: "#F0F6FF", padding: "0 clamp(20px,5vw,60px) clamp(64px,9vh,96px)" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", background: "#0A1E35", borderRadius: 24, padding: "clamp(32px,4vw,52px)", display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: "clamp(24px,3vw,40px)", position: "relative" as const, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: `${cor}12`, filter: "blur(40px)", pointerEvents: "none" }} />
            <div style={{ flexShrink: 0, width: "clamp(60px,10vw,80px)", height: "clamp(60px,10vw,80px)", borderRadius: "50%", background: `${cor}20`, border: `2px solid ${cor}45`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" as const }}>
              <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={cor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke={cor} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 200, position: "relative" as const }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: cor, marginBottom: 8 }}>Garantia Futebol Interativo</p>
              <h3 style={{ fontFamily: F, fontSize: "clamp(20px,2.5vw,32px)", color: "#fff", lineHeight: 1.05, marginBottom: 12 }}>SE NÃO FUNCIONAR,{"\n"}DEVOLVEMOS TUDO</h3>
              <p style={{ fontSize: "clamp(13px,1.3vw,15px)", color: "rgba(169,216,245,0.5)", lineHeight: 1.75 }}>{curso.garantiaTexto}</p>
            </div>
          </div>
        </section>
      )}

      {/* Rodapé */}
      <div style={{ background: "#010912", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px", textAlign: "center" as const }}>
        <a href="/cursos" style={{ fontSize: 12, fontWeight: 600, color: "rgba(169,216,245,0.25)", textDecoration: "none", letterSpacing: "0.08em" }}>← Ver todas as formações</a>
      </div>
    </div>
  );
}