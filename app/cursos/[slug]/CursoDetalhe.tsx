"use client";
import { useState } from "react";
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

const Check = ({ cor, size = 12 }: { cor: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M4 10l4 4 8-8" stroke={cor} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Arrow = ({ color = "#fff" }: { color?: string }) => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <path d="M7 17L17 7M17 7H8M17 7V16" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function CursoDetalhe({ curso }: { curso: Curso }) {
  const cor = AREA_COR[curso.area] ?? "#4096F2";
  const label = AREA_LABEL[curso.area] ?? curso.area;
  const url = curso.checkoutUrl ?? curso.externalUrl;
  const [openTab, setOpenTab] = useState<number | null>(0);

  // Filtra mentores sem foto fora — evita buraco quebrado no grid
  const mentoresComFoto = curso.mentores?.filter(m => m.foto) ?? [];
  const mentoresSemFoto = curso.mentores?.filter(m => !m.foto) ?? [];

  return (
    <div style={{ background: "#020C18", fontFamily: M }}>

      {/* ════════════════════════════════════════════════════════════════
          1. HERO — sem overlap. Conteúdo sempre acima de qualquer elemento de fundo
         ════════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative", overflow: "hidden",
        background: `linear-gradient(160deg, #020C18 0%, #031830 55%, #041E3A 100%)`,
        paddingTop: "clamp(96px,14vh,140px)",
        paddingBottom: "clamp(48px,8vh,80px)",
      }}>
        {/* Glow decorativo — z-index 0, nunca interfere no conteúdo */}
        <div style={{ position: "absolute", top: 0, left: "-5%", width: "55%", height: "75%", background: `radial-gradient(ellipse 55% 60% at 10% 15%, ${cor}1c 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1 }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, fontSize: 12, color: "rgba(169,216,245,0.4)" }}>
            <a href="/cursos" style={{ color: "inherit", textDecoration: "none" }}>Formações</a>
            <span>/</span>
            <span style={{ color: cor, fontWeight: 600 }}>{label}</span>
          </div>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px 6px 9px", borderRadius: 99, background: `${cor}1c`, border: `1px solid ${cor}45`, marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: cor, boxShadow: `0 0 10px ${cor}`, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: cor, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label} · {curso.type}</span>
          </div>

          {/* Título */}
          <h1 style={{ fontFamily: F, fontSize: "clamp(32px,6vw,64px)", lineHeight: 0.96, color: "#F4F4F4", marginBottom: 22, letterSpacing: "0.01em" }}>
            {curso.title}
          </h1>

          {/* Subheadline */}
          {curso.subheadline && (
            <p style={{ fontSize: "clamp(14px,1.6vw,17px)", fontWeight: 400, lineHeight: 1.65, color: "rgba(244,244,244,0.6)", marginBottom: 36, maxWidth: 540 }}>
              {curso.subheadline}
            </p>
          )}

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12, alignItems: "center" }}>
            <a href="#oferta" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 26px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#05A567)", boxShadow: "0 0 36px rgba(8,194,122,0.35), 0 8px 22px rgba(0,0,0,0.35)", border: "1.5px solid rgba(8,194,122,0.85)", fontSize: 14.5, fontWeight: 700, color: "#fff", textDecoration: "none", whiteSpace: "nowrap" as const }}>
              Garantir minha vaga
              <span style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Arrow />
              </span>
            </a>
            <a href="#para-quem" style={{ fontSize: 13.5, fontWeight: 600, color: "rgba(244,244,244,0.5)", textDecoration: "none", whiteSpace: "nowrap" as const }}>
              Ver se é pra mim ↓
            </a>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${cor}, transparent)`, opacity: 0.5, zIndex: 1 }} />
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2. STATS BAR
         ════════════════════════════════════════════════════════════════ */}
      {(curso.cargaHoraria || curso.numAulas || curso.formato) && (
        <div style={{ background: "rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "clamp(22px,4vh,28px) 0" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", display: "flex", flexWrap: "wrap" as const, gap: "clamp(24px,6vw,56px)" }}>
            {[
              curso.cargaHoraria && { v: curso.cargaHoraria, l: "Carga horária" },
              curso.numAulas && { v: String(curso.numAulas), l: "Aulas ao vivo" },
              curso.formato && { v: curso.formato, l: "Formato" },
            ].filter(Boolean).map((s: any, i) => (
              <div key={i} style={{ minWidth: 90 }}>
                <div style={{ fontFamily: F, fontSize: "clamp(24px,4vw,34px)", lineHeight: 1, color: "#fff" }}>{s.v}</div>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.4)", marginTop: 6 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          3. PARA QUEM
         ════════════════════════════════════════════════════════════════ */}
      {curso.paraQuem && curso.paraQuem.length > 0 && (
        <section id="para-quem" style={{ background: "#F0F6FF", padding: "clamp(52px,8vh,96px) 0" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Para quem é</p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(26px,4.6vw,42px)", lineHeight: 1.02, color: "#0A1E35", marginBottom: 32, maxWidth: 480 }}>
              ESTA FORMAÇÃO É PRA VOCÊ SE...
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 10 }}>
              {curso.paraQuem.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 13, padding: "16px 18px", background: "#fff", borderRadius: 14, boxShadow: "0 2px 12px rgba(10,30,53,0.05)" }}>
                  <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: `${cor}18`, border: `1px solid ${cor}40`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                    <Check cor={cor} />
                  </div>
                  <p style={{ fontSize: 13.5, fontWeight: 500, color: "#1B3A52", lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════
          4. DIFERENCIAIS
         ════════════════════════════════════════════════════════════════ */}
      {curso.diferenciais && curso.diferenciais.length > 0 && (
        <section style={{ background: "#020C18", padding: "clamp(52px,8vh,96px) 0" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>O que muda</p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(26px,4.6vw,42px)", lineHeight: 1.02, color: "#F4F4F4", marginBottom: 32, maxWidth: 520 }}>
              POR QUE ESTA FORMAÇÃO É DIFERENTE
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 10 }}>
              {curso.diferenciais.map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "18px 20px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16 }}>
                  <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 10, background: `${cor}16`, border: `1.5px solid ${cor}35`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check cor={cor} />
                  </div>
                  <p style={{ fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.78)", lineHeight: 1.5, marginTop: 7 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════
          5. EMENTA
         ════════════════════════════════════════════════════════════════ */}
      {curso.ementa && curso.ementa.length > 0 && (
        <section id="ementa" style={{ background: "#F0F6FF", padding: "clamp(52px,8vh,96px) 0" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 32, flexWrap: "wrap" as const }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Como funciona</p>
                <h2 style={{ fontFamily: F, fontSize: "clamp(26px,4.6vw,42px)", lineHeight: 1.02, color: "#0A1E35" }}>O QUE VOCÊ VAI APRENDER</h2>
              </div>
              <span style={{ fontFamily: F, fontSize: "clamp(14px,2vw,20px)", color: cor, whiteSpace: "nowrap" as const }}>{curso.ementa.length} módulos</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" as const }}>
              {curso.ementa.map((item, i) => {
                const open = openTab === i;
                return (
                  <div key={i} style={{ borderBottom: "1px solid rgba(10,30,53,0.08)" }}>
                    <button
                      onClick={() => setOpenTab(open ? null : i)}
                      style={{ width: "100%", display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 2px", background: "none", border: "none", cursor: "pointer", textAlign: "left" as const }}
                    >
                      <span style={{ fontFamily: F, fontSize: "clamp(16px,2.2vw,22px)", color: open ? cor : `${cor}55`, flexShrink: 0, width: "2.2ch", paddingTop: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: "#0A1E35", lineHeight: 1.4, paddingTop: 2 }}>{item.titulo}</span>
                      <span style={{ flexShrink: 0, color: open ? cor : "rgba(10,30,53,0.3)", fontSize: 20, fontWeight: 300, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none", lineHeight: 1 }}>+</span>
                    </button>
                    {open && item.descricao && (
                      <p style={{ fontSize: 13, color: "#3F5F7C", lineHeight: 1.65, paddingLeft: "calc(2.2ch + 14px)", paddingBottom: 18, paddingRight: 24 }}>{item.descricao}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════
          6. EXPERIÊNCIA PRÁTICA
         ════════════════════════════════════════════════════════════════ */}
      {curso.experienciaPratica && curso.experienciaPratica.length > 0 && (
        <section style={{ background: `linear-gradient(135deg, ${cor}16 0%, #031525 60%)`, borderTop: `1px solid ${cor}25`, borderBottom: `1px solid ${cor}15`, padding: "clamp(52px,8vh,96px) 0", position: "relative" as const, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "55%", height: "100%", background: `radial-gradient(ellipse, ${cor}10, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative" as const }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Exclusivo Futebol Interativo</p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(26px,4.6vw,42px)", lineHeight: 1.02, color: "#F4F4F4", marginBottom: 16, maxWidth: 520 }}>VOCÊ TERMINA DENTRO DE UM CLUBE PROFISSIONAL</h2>
            <p style={{ fontSize: 14, color: "rgba(244,244,244,0.45)", lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
              Não termina o curso em casa. Você vive o dia a dia do departamento da sua área, dentro de um clube parceiro de verdade.
            </p>
            <a href="#oferta" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 24px", borderRadius: 12, background: cor, fontSize: 13.5, fontWeight: 700, color: "#fff", textDecoration: "none", marginBottom: 32 }}>
              Quero essa experiência
              <Arrow />
            </a>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 10 }}>
              {curso.experienciaPratica.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 11, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 13, padding: "13px 16px" }}>
                  <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 6, background: `${cor}25`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                    <Check cor={cor} size={10} />
                  </span>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(244,244,244,0.82)", lineHeight: 1.45 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════
          7. MENTORES — mentores sem foto vão para uma faixa de texto simples
         ════════════════════════════════════════════════════════════════ */}
      {curso.mentores && curso.mentores.length > 0 && (
        <section style={{ background: "#020C18", padding: "clamp(52px,8vh,96px) 0" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Quem vai te ensinar</p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(26px,4.6vw,42px)", lineHeight: 1.02, color: "#F4F4F4", marginBottom: 32 }}>OS MENTORES</h2>

            {mentoresComFoto.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "clamp(12px,2vw,18px)", marginBottom: mentoresSemFoto.length > 0 ? 20 : 0 }}>
                {mentoresComFoto.map((m, i) => (
                  <div key={i}>
                    <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "3/4", marginBottom: 10, background: "#0d2238", position: "relative" as const }}>
                      <img src={m.foto} alt={m.nome} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
                      <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0, height: "45%", background: `linear-gradient(to top, rgba(2,12,24,0.92), transparent)` }} />
                      <div style={{ position: "absolute" as const, bottom: 9, left: 9, right: 9 }}>
                        <p style={{ fontFamily: F, fontSize: "clamp(12px,1.4vw,14.5px)", color: "#fff", lineHeight: 1.05 }}>{m.nome}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: 10.5, fontWeight: 500, color: "rgba(169,216,245,0.5)", lineHeight: 1.4 }}>{m.bio}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Mentores sem foto — lista compacta, sem buraco no grid */}
            {mentoresSemFoto.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                {mentoresSemFoto.map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: `${cor}18`, border: `1px solid ${cor}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: F, fontSize: 13, color: cor }}>
                      {m.nome.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontFamily: F, fontSize: 13.5, color: "#fff", lineHeight: 1.1 }}>{m.nome}</p>
                      <p style={{ fontSize: 10.5, color: "rgba(169,216,245,0.5)", marginTop: 2 }}>{m.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════
          8. DEPOIMENTOS
         ════════════════════════════════════════════════════════════════ */}
      {curso.depoimentos && curso.depoimentos.length > 0 && (
        <section style={{ background: "#F0F6FF", padding: "clamp(52px,8vh,96px) 0" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Resultados reais</p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(26px,4.6vw,42px)", lineHeight: 1.02, color: "#0A1E35", marginBottom: 32 }}>QUEM JÁ CURSOU E FOI CONTRATADO</h2>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`, gap: "clamp(16px,2.5vw,22px)" }}>
              {curso.depoimentos.map((d, i) => {
                const vid = d.videoUrl ? ytId(d.videoUrl) : "";
                return (
                  <div key={i}>
                    {vid && (
                      <div style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "16/9", background: "#0A1E35", marginBottom: 14, boxShadow: "0 6px 22px rgba(10,30,53,0.1)" }}>
                        <iframe src={`https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1`} title={d.nome} style={{ width: "100%", height: "100%", border: "none", display: "block" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                      </div>
                    )}
                    <p style={{ fontFamily: F, fontSize: "clamp(15px,1.8vw,19px)", lineHeight: 1.1, color: "#0A1E35", marginBottom: 4 }}>{d.nome}</p>
                    {d.papel && <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: cor }}>{d.papel}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════
          9. STATS
         ════════════════════════════════════════════════════════════════ */}
      {curso.stats && curso.stats.length > 0 && (
        <section style={{ background: "#020C18", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "clamp(44px,7vh,72px) 0" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "clamp(20px,4vw,48px)", textAlign: "center" as const }}>
            {curso.stats.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F, fontSize: "clamp(32px,6vw,56px)", lineHeight: 0.85, color: cor, letterSpacing: "-0.02em" }}>{s.valor}</div>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.35)", marginTop: 12 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════
          10. OFERTA
         ════════════════════════════════════════════════════════════════ */}
      {(curso.preco || curso.checkoutUrl || curso.hubspotFormId) && (
        <section id="oferta" style={{ background: "#F0F6FF", padding: "clamp(52px,8vh,96px) 0" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 20, marginBottom: 36, paddingBottom: 28, borderBottom: "1px solid rgba(10,30,53,0.1)" }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: cor, marginBottom: 10 }}>Última etapa</p>
                <h2 style={{ fontFamily: F, fontSize: "clamp(26px,4.2vw,40px)", lineHeight: 1.02, color: "#0A1E35" }}>GARANTA SUA VAGA AGORA</h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "10px 22px" }}>
                {["Garantia de 12 meses", "Compra 100% segura", "+4.500 alunos formados"].map((txt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, color: "#2E6CA8" }}>
                    <Check cor="#2E6CA8" />
                    <span style={{ fontSize: 11.5, fontWeight: 600 }}>{txt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(14px,2.5vw,20px)", alignItems: "start" }}>
              <CursoCTA curso={curso} />
              {curso.hubspotPortalId && curso.hubspotFormId && (
                <div style={{ background: "#fff", borderRadius: 22, padding: "clamp(22px,3vw,32px)", boxShadow: "0 4px 28px rgba(0,40,100,0.08)" }}>
                  <p style={{ fontFamily: F, fontSize: "clamp(16px,2vw,21px)", color: "#0A1E35", marginBottom: 8, lineHeight: 1.05 }}>FALE COM UM CONSULTOR</p>
                  <p style={{ fontSize: 12.5, color: "#3F5F7C", marginBottom: 18, lineHeight: 1.5 }}>Tire suas dúvidas antes de se inscrever.</p>
                  <CursoForm curso={curso} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════
          11. GARANTIA
         ════════════════════════════════════════════════════════════════ */}
      {curso.garantiaTexto && (
        <section style={{ background: "#F0F6FF", padding: "0 clamp(20px,5vw,60px) clamp(52px,8vh,88px)" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ background: "#0A1E35", borderRadius: 20, padding: "clamp(26px,4vw,40px)", display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: "clamp(18px,3vw,32px)", position: "relative" as const, overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: `${cor}12`, filter: "blur(40px)", pointerEvents: "none" }} />
              <div style={{ flexShrink: 0, width: "clamp(52px,9vw,68px)", height: "clamp(52px,9vw,68px)", borderRadius: "50%", background: `${cor}20`, border: `2px solid ${cor}45`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" as const }}>
                <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={cor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" stroke={cor} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 200, position: "relative" as const }}>
                <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: cor, marginBottom: 8 }}>Garantia Futebol Interativo</p>
                <h3 style={{ fontFamily: F, fontSize: "clamp(17px,2.4vw,26px)", color: "#fff", lineHeight: 1.1, marginBottom: 10 }}>SE NÃO FUNCIONAR, DEVOLVEMOS TUDO</h3>
                <p style={{ fontSize: 13, color: "rgba(169,216,245,0.5)", lineHeight: 1.65 }}>{curso.garantiaTexto}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Rodapé interno */}
      <div style={{ background: "#010912", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "22px", textAlign: "center" as const }}>
        <a href="/cursos" style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(169,216,245,0.25)", textDecoration: "none", letterSpacing: "0.06em" }}>← Ver todas as formações</a>
      </div>
    </div>
  );
}