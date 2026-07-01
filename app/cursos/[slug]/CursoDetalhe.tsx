"use client";
import { useState } from "react";
import type { Curso } from "@/lib/cursos";
import CursoCTA from "./CursoCTA";
import CursoForm from "./CursoForm";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const COR: Record<string, string> = {
  "tecnica-e-tatica":      "#4096F2",
  "comunicacao-marketing": "#818CF8",
  "saude":                 "#2DD4BF",
  "gestao-e-operacao":     "#F59E0B",
};
const LABEL: Record<string, string> = {
  "tecnica-e-tatica":      "Técnica e Tática",
  "comunicacao-marketing": "Comunicação",
  "saude":                 "Saúde",
  "gestao-e-operacao":     "Gestão e Operação",
};
function ytId(u: string) { return u.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)?.[1] ?? ""; }

/* ── inline marquee de clubes ─────────────────────────────────────────── */
function ClubesStrip() {
  const ids = Array.from({ length: 24 }, (_, i) => i + 1);
  return (
    <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}>
      <ul className="flex items-center animate-marquee" style={{ gap: 40, width: "max-content" }}>
        {[...ids,...ids].map((n,i) => (
          <li key={i} style={{ flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/clubes/clube-${n}.webp`} alt="" loading="lazy" style={{ height: 40, width: "auto", opacity: 0.8 }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── ícone de check ───────────────────────────────────────────────────── */
function Chk({ c }: { c: string }) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="9" cy="9" r="8.25" fill={`${c}22`} stroke={`${c}50`} strokeWidth="1"/>
      <path d="M5 9l2.5 2.5L13 7" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── wrapper de seção ─────────────────────────────────────────────────── */
const W = ({ children, dark = false, style = {}, id }: { children: React.ReactNode; dark?: boolean; style?: React.CSSProperties; id?: string }) => (
  <section id={id} style={{ background: dark ? "#020C18" : "#EEF4FF", padding: "clamp(64px,9vh,100px) 0", ...style }}>
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)" }}>{children}</div>
  </section>
);

/* ── eyebrow + h2 ─────────────────────────────────────────────────────── */
const SH = ({ eye, title, dark = false, cor }: { eye: string; title: string; dark?: boolean; cor: string }) => (
  <div style={{ marginBottom: 40 }}>
    <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: cor, marginBottom: 10 }}>{eye}</p>
    <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.8vw,52px)", lineHeight: 1.0, color: dark ? "#F4F4F4" : "#03263F" }}>{title}</h2>
  </div>
);

export default function CursoDetalhe({ curso }: { curso: Curso }) {
  const cor = COR[curso.area] ?? "#4096F2";
  const label = LABEL[curso.area] ?? curso.area;
  const [open, setOpen] = useState<number | null>(null);
  const url = curso.checkoutUrl ?? curso.externalUrl;
  const comFoto = curso.mentores?.filter(m => m.foto) ?? [];
  const semFoto = curso.mentores?.filter(m => !m.foto) ?? [];

  return (
    <div style={{ fontFamily: M }}>

      {/* ──────────────────────────────────────────────────────
          §1  HERO
         ────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(150deg, #010E1B 0%, #021C30 50%, ${cor}16 100%)`,
        paddingTop: "clamp(100px,14vh,140px)",
        paddingBottom: "clamp(56px,7vh,80px)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 65% 55% at 85% 35%, ${cor}20 0%, transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${cor},transparent)`, opacity: 0.6 }} />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)", position: "relative" }}>

          {/* breadcrumb */}
          <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22, fontSize: 11.5, fontWeight: 500 }}>
            <a href="/cursos" style={{ color: "rgba(169,216,245,0.38)", textDecoration: "none" }}>Formações</a>
            <span style={{ color: "rgba(169,216,245,0.2)" }}>/</span>
            <span style={{ color: cor, fontWeight: 700 }}>{label}</span>
          </nav>

          {/* badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px 5px 9px", borderRadius: 99, background: `${cor}18`, border: `1px solid ${cor}45`, marginBottom: 22 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: cor, boxShadow: `0 0 10px ${cor}` }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: cor, letterSpacing: "0.13em", textTransform: "uppercase" as const }}>{label} · {curso.type}</span>
          </div>

          {/* título */}
          <h1 style={{ fontFamily: F, fontSize: "clamp(34px,6vw,72px)", lineHeight: 1.01, color: "#F4F4F4", marginBottom: 18, letterSpacing: "0.01em" }}>
            {curso.title}
          </h1>

          {/* subheadline */}
          {curso.subheadline && (
            <p style={{ fontSize: "clamp(14px,1.5vw,17px)", fontWeight: 400, lineHeight: 1.75, color: "rgba(244,244,244,0.5)", marginBottom: 40, maxWidth: 560 }}>
              {curso.subheadline}
            </p>
          )}

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12, alignItems: "center", marginBottom: 56 }}>
            <a href="#oferta" style={{ display: "inline-flex", alignItems: "center", gap: 11, padding: "15px 30px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#059669)", boxShadow: "0 0 44px rgba(8,194,122,0.4)", border: "1.5px solid rgba(8,194,122,0.75)", fontSize: 15, fontWeight: 700, color: "#fff", textDecoration: "none" }}>
              Garantir minha vaga
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#ementa" style={{ fontSize: 13.5, fontWeight: 600, color: "rgba(169,216,245,0.45)", textDecoration: "none" }}>Ver o conteúdo ↓</a>
          </div>

          {/* stats — sempre em linha, sem colapso */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "22px 0", borderTop: "1px solid rgba(169,216,245,0.1)", paddingTop: 28 }}>
            {[
              curso.cargaHoraria && { v: curso.cargaHoraria, l: "Carga horária" },
              curso.numAulas     && { v: `${curso.numAulas} aulas`, l: "Ao vivo" },
              curso.formato      && { v: curso.formato, l: "Formato" },
              { v: "12 meses", l: "Garantia" },
            ].filter(Boolean).map((s: any, i, arr) => (
              <div key={i} style={{
                paddingRight: i < arr.length - 1 ? "clamp(20px,3.5vw,44px)" : 0,
                paddingLeft:  i > 0               ? "clamp(20px,3.5vw,44px)" : 0,
                borderLeft:   i > 0               ? "1px solid rgba(169,216,245,0.15)" : "none",
              }}>
                <div style={{ fontFamily: F, fontSize: "clamp(20px,2.6vw,30px)", lineHeight: 1, color: "#fff" }}>{s.v}</div>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.32)", marginTop: 7 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
          §2  PARA QUEM
         ────────────────────────────────────────────────────── */}
      {curso.paraQuem && curso.paraQuem.length > 0 && (
        <W id="para-quem">
          <SH eye="Para quem é" title="ESTA FORMAÇÃO É PRA VOCÊ SE..." cor={cor} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 10 }}>
            {curso.paraQuem.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 18px", background: "#fff", borderRadius: 14, boxShadow: "0 2px 12px rgba(3,38,63,0.06)", border: "1px solid rgba(3,38,63,0.05)" }}>
                <Chk c={cor} />
                <p style={{ fontSize: 13.5, fontWeight: 500, color: "#1B3A52", lineHeight: 1.55 }}>{t}</p>
              </div>
            ))}
          </div>
        </W>
      )}

      {/* ──────────────────────────────────────────────────────
          §3  DIFERENCIAIS — coluna única, lista limpa
         ────────────────────────────────────────────────────── */}
      {curso.diferenciais && curso.diferenciais.length > 0 && (
        <W dark>
          <SH eye="O que muda" title="POR QUE ESTA FORMAÇÃO É DIFERENTE" dark cor={cor} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 10 }}>
            {curso.diferenciais.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                <Chk c={cor} />
                <p style={{ fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.78)", lineHeight: 1.55 }}>{d}</p>
              </div>
            ))}
          </div>
        </W>
      )}

      {/* ──────────────────────────────────────────────────────
          §4  EMENTA — coluna única, acordeão
         ────────────────────────────────────────────────────── */}
      {curso.ementa && curso.ementa.length > 0 && (
        <W id="ementa">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 10, marginBottom: 40 }}>
            <SH eye="Conteúdo" title="O QUE VOCÊ VAI APRENDER" cor={cor} />
            <span style={{ fontFamily: F, fontSize: 18, color: `${cor}88`, marginBottom: 40 }}>{curso.ementa.length} módulos</span>
          </div>
          {curso.ementa.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderBottom: "1px solid rgba(3,38,63,0.09)" }}>
                <button onClick={() => setOpen(isOpen ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "17px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" as const }}>
                  <span style={{ fontFamily: F, fontSize: "clamp(18px,2.2vw,24px)", color: isOpen ? cor : `${cor}45`, flexShrink: 0, minWidth: 36 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: "#03263F", lineHeight: 1.45 }}>{item.titulo}</span>
                  <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 8, background: isOpen ? cor : "rgba(3,38,63,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" style={{ transform: isOpen ? "rotate(45deg)" : "none", transition: "transform .18s" }}>
                      <path d="M12 5v14M5 12h14" stroke={isOpen ? "#fff" : "#03263F"} strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                {isOpen && item.descricao && (
                  <p style={{ fontSize: 13.5, color: "#4A6A80", lineHeight: 1.7, paddingLeft: 52, paddingBottom: 20, paddingRight: 42 }}>{item.descricao}</p>
                )}
              </div>
            );
          })}
        </W>
      )}

      {/* ──────────────────────────────────────────────────────
          §5  EXPERIÊNCIA PRÁTICA + MARQUEE
         ────────────────────────────────────────────────────── */}
      {curso.experienciaPratica && curso.experienciaPratica.length > 0 && (
        <section style={{ background: "#020C18", position: "relative" as const, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 80% 40%, ${cor}1A, transparent 65%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${cor}70,transparent)` }} />

          <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(64px,9vh,100px) clamp(22px,5vw,64px) 48px", position: "relative" as const }}>
            <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Exclusivo Futebol Interativo</p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.8vw,52px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 14 }}>VOCÊ TERMINA DENTRO<br />DE UM CLUBE PROFISSIONAL</h2>
            <p style={{ fontSize: 15, color: "rgba(244,244,244,0.45)", lineHeight: 1.75, marginBottom: 36, maxWidth: 560 }}>
              Não termina o curso em casa. Você vive o dia a dia do departamento dentro de um dos nossos{" "}
              <strong style={{ color: "rgba(244,244,244,0.82)", fontWeight: 700 }}>+130 clubes parceiros</strong> espalhados pelo Brasil.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 8, marginBottom: 36 }}>
              {curso.experienciaPratica.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "13px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${cor}28`, borderRadius: 13 }}>
                  <Chk c={cor} />
                  <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(244,244,244,0.8)", lineHeight: 1.45 }}>{t}</p>
                </div>
              ))}
            </div>
            <a href="#oferta" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 26px", borderRadius: 13, background: cor, fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none", boxShadow: `0 8px 28px ${cor}45` }}>
              Quero essa experiência
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "22px 0 30px" }}>
            <p style={{ textAlign: "center" as const, fontFamily: M, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.26)", marginBottom: 14 }}>+130 clubes parceiros</p>
            <ClubesStrip />
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────
          §6  MENTORES — claro, grid com minmax estreito
         ────────────────────────────────────────────────────── */}
      {curso.mentores && curso.mentores.length > 0 && (
        <W>
          <SH eye="Quem vai te ensinar" title="OS MENTORES" cor={cor} />
          {comFoto.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: "clamp(10px,1.8vw,16px)", marginBottom: semFoto.length > 0 ? 12 : 0 }}>
              {comFoto.map((m, i) => (
                <div key={i}>
                  <div style={{ position: "relative" as const, borderRadius: 16, overflow: "hidden", aspectRatio: "3/4", marginBottom: 10, background: `linear-gradient(155deg,#0A1E35,${cor}28)` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.foto} alt={m.nome} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} onError={e => { (e.target as HTMLImageElement).style.opacity = "0"; }} />
                    <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0, height: "56%", background: "linear-gradient(to top, rgba(3,38,63,0.97) 0%, rgba(3,38,63,0.55) 50%, transparent 100%)" }} />
                    <p style={{ position: "absolute" as const, bottom: 9, left: 9, right: 9, fontFamily: F, fontSize: "clamp(10px,1.2vw,12.5px)", color: "#fff", lineHeight: 1.1 }}>{m.nome}</p>
                  </div>
                  <p style={{ fontSize: 10.5, fontWeight: 500, color: "rgba(3,38,63,0.48)", lineHeight: 1.4 }}>{m.bio}</p>
                </div>
              ))}
            </div>
          )}
          {semFoto.map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#fff", border: `1px solid ${cor}28`, borderRadius: 12, marginBottom: 8, boxShadow: "0 1px 8px rgba(3,38,63,0.05)" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${cor}1A`, border: `1.5px solid ${cor}45`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: F, fontSize: 14, color: cor }}>{m.nome.charAt(0)}</div>
              <div>
                <p style={{ fontFamily: F, fontSize: 13, color: "#03263F", lineHeight: 1.1 }}>{m.nome}</p>
                <p style={{ fontSize: 11, color: "rgba(3,38,63,0.45)", marginTop: 2 }}>{m.bio}</p>
              </div>
            </div>
          ))}
        </W>
      )}

      {/* ──────────────────────────────────────────────────────
          §7  DEPOIMENTOS — escuro, cards com borda colorida
         ────────────────────────────────────────────────────── */}
      {curso.depoimentos && curso.depoimentos.length > 0 && (
        <W dark>
          <SH eye="Resultados reais" title={"QUEM JÁ CURSOU E FOI CONTRATADO"} dark cor={cor} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(14px,2vw,20px)" }}>
            {curso.depoimentos.map((d, i) => {
              const vid = d.videoUrl ? ytId(d.videoUrl) : "";
              return (
                <div key={i} style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${cor}35`, background: "#031830" }}>
                  {vid ? (
                    <div style={{ aspectRatio: "16/9" }}>
                      <iframe src={`https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1`} title={d.nome} style={{ width: "100%", height: "100%", border: "none", display: "block" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                  ) : (
                    <div style={{ aspectRatio: "16/9", background: `linear-gradient(135deg,#0d2238,${cor}18)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width={38} height={38} viewBox="0 0 24 24" fill="none"><circle cx={12} cy={12} r={10} stroke={cor} strokeWidth={1.5} opacity={.4}/><polygon points="10,8 17,12 10,16" fill={cor} opacity={.5}/></svg>
                    </div>
                  )}
                  <div style={{ padding: "15px 18px 18px" }}>
                    <p style={{ fontFamily: F, fontSize: "clamp(14px,1.6vw,17px)", color: "#F4F4F4", lineHeight: 1.1, marginBottom: 4 }}>{d.nome}</p>
                    {d.papel && <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: cor }}>{d.papel}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </W>
      )}

      {/* ──────────────────────────────────────────────────────
          §8  STATS — claro, 4 números grandes
         ────────────────────────────────────────────────────── */}
      {curso.stats && curso.stats.length > 0 && (
        <section style={{ background: "#EEF4FF", padding: "clamp(56px,8vh,88px) 0" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))", gap: "clamp(24px,5vw,56px)", textAlign: "center" as const }}>
            {curso.stats.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F, fontSize: "clamp(36px,6.5vw,66px)", lineHeight: 0.88, color: cor, letterSpacing: "-0.02em" }}>{s.valor}</div>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(3,38,63,0.32)", marginTop: 13 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────
          §9  OFERTA — escuro, CTA + Form
         ────────────────────────────────────────────────────── */}
      {(curso.preco || url || curso.hubspotFormId) && (
        <W dark id="oferta">
          <div style={{ marginBottom: 36, paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: cor, marginBottom: 10 }}>Última etapa</p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.8vw,52px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 16 }}>GARANTA SUA VAGA AGORA</h2>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "8px 24px" }}>
              {["Garantia de 12 meses", "Compra 100% segura", "+4.500 alunos formados", "Acesso vitalício"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <svg width={13} height={13} viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="#08C27A" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(244,244,244,0.5)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(14px,2.5vw,22px)", alignItems: "start" }}>
            <CursoCTA curso={curso} />
            {curso.hubspotPortalId && curso.hubspotFormId && (
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 22, padding: "clamp(24px,3vw,36px)" }}>
                <p style={{ fontFamily: F, fontSize: "clamp(18px,2.2vw,24px)", color: "#F4F4F4", marginBottom: 6, lineHeight: 1.05 }}>FALE COM UM CONSULTOR</p>
                <p style={{ fontSize: 13, color: "rgba(244,244,244,0.38)", marginBottom: 22, lineHeight: 1.65 }}>Tire suas dúvidas antes de se inscrever. Sem compromisso.</p>
                <CursoForm curso={curso} />
              </div>
            )}
          </div>
        </W>
      )}

      {/* ──────────────────────────────────────────────────────
          §10  GARANTIA — fundo EEF4FF, card navy
         ────────────────────────────────────────────────────── */}
      {curso.garantiaTexto && (
        <section style={{ background: "#EEF4FF", padding: "0 clamp(22px,5vw,64px) clamp(64px,9vh,100px)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ position: "relative" as const, overflow: "hidden", background: "linear-gradient(145deg,#03263F,#021629)", borderRadius: 24, padding: "clamp(30px,4vw,52px)", display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: "clamp(22px,3.5vw,40px)" }}>
              <div style={{ position: "absolute", top: -70, right: -70, width: 260, height: 260, borderRadius: "50%", background: `${cor}18`, filter: "blur(56px)", pointerEvents: "none" }} />
              {/* ícone escudo */}
              <div style={{ flexShrink: 0, width: 68, height: 68, borderRadius: 20, background: `${cor}22`, border: `2px solid ${cor}55`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" as const }}>
                <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={cor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12l2 2 4-4" stroke={cor} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 200, position: "relative" as const }}>
                <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: cor, marginBottom: 10 }}>Garantia Futebol Interativo</p>
                <h3 style={{ fontFamily: F, fontSize: "clamp(20px,2.6vw,30px)", color: "#fff", lineHeight: 1.05, marginBottom: 12 }}>SE NÃO FUNCIONAR,<br />DEVOLVEMOS TUDO</h3>
                <p style={{ fontSize: 13.5, color: "rgba(169,216,245,0.45)", lineHeight: 1.75 }}>{curso.garantiaTexto}</p>
              </div>
              <a href="#oferta" style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 26px", borderRadius: 13, background: "linear-gradient(135deg,#08C27A,#059669)", boxShadow: "0 8px 28px rgba(8,194,122,0.35)", fontSize: 14, fontWeight: 700, color: "#fff", textDecoration: "none", position: "relative" as const }}>
                Garantir minha vaga
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* rodapé */}
      <div style={{ background: "#010A15", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "22px", textAlign: "center" as const }}>
        <a href="/cursos" style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(169,216,245,0.2)", textDecoration: "none", letterSpacing: "0.08em" }}>← Ver todas as formações</a>
      </div>
    </div>
  );
}