"use client";
import { useState, useEffect, useRef } from "react";
import type { Curso } from "@/lib/cursos";
import CursoCTA from "./CursoCTA";
import CursoForm from "./CursoForm";

const F  = "var(--font-anton), Anton, sans-serif";
const M  = "var(--font-montserrat), Montserrat, sans-serif";
const NAVY  = "#03263F";
const DARK  = "#010E1B";
const LIGHT = "#F0F6FF";

const AREA_COR: Record<string, string> = {
  "tecnica-e-tatica": "#4096F2", "comunicacao-marketing": "#818CF8",
  "saude": "#2DD4BF", "gestao-e-operacao": "#F59E0B",
};
const AREA_LABEL: Record<string, string> = {
  "tecnica-e-tatica": "Técnica e Tática", "comunicacao-marketing": "Comunicação",
  "saude": "Saúde", "gestao-e-operacao": "Gestão e Operação",
};
function ytId(u: string) { return u.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)?.[1] ?? ""; }

/* ── Counter ──────────────────────────────────────────────────── */
function Counter({ raw }: { raw: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el || done.current) return;
    const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return;
    const prefix = raw.match(/^[^0-9]*/)?.[0] ?? "";
    const suffix = raw.match(/[^0-9]+$/)?.[0] ?? "";
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      const t0 = performance.now();
      const run = (now: number) => {
        const t = Math.min((now - t0) / 1200, 1);
        const v = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + Math.round(v * num).toLocaleString("pt-BR") + suffix;
        if (t < 1) requestAnimationFrame(run);
      };
      requestAnimationFrame(run);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [raw]);
  return <span ref={ref}>{raw}</span>;
}

/* ── Marquee ──────────────────────────────────────────────────── */
function Marquee() {
  const ids = Array.from({ length: 24 }, (_, i) => i + 1);
  return (
    <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)" }}>
      <ul className="flex items-center animate-marquee" style={{ gap: 48, width: "max-content" }}>
        {[...ids, ...ids].map((n, i) => (
          <li key={i} style={{ flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/clubes/clube-${n}.webp`} alt="" loading="lazy" style={{ height: 38, width: "auto", opacity: 0.75 }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Reveal on scroll ─────────────────────────────────────────── */
function FadeIn({ children, delay = 0, y = 20 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    Object.assign(el.style, { opacity: "0", transform: `translateY(${y}px)`, transition: `opacity .6s ${delay}ms cubic-bezier(.25,.46,.45,.94), transform .6s ${delay}ms cubic-bezier(.25,.46,.45,.94)` });
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, y]);
  return <div ref={ref}>{children}</div>;
}

export default function CursoDetalhe({ curso }: { curso: Curso }) {
  const cor   = AREA_COR[curso.area]   ?? "#4096F2";
  const label = AREA_LABEL[curso.area] ?? curso.area;
  const [tab, setTab]     = useState<number | null>(null);
  const [sticky, setSticky] = useState(false);
  const url = curso.checkoutUrl ?? curso.externalUrl;
  const comFoto  = curso.mentores?.filter(m => m.foto) ?? [];
  const semFoto  = curso.mentores?.filter(m => !m.foto) ?? [];

  useEffect(() => {
    const fn = () => setSticky(window.scrollY > 520);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const css = `
    .fi-link { text-decoration:none; }
    .fi-tab:hover { background: rgba(255,255,255,0.06) !important; }
    .fi-card:hover { transform: translateY(-3px); box-shadow: 0 20px 48px rgba(0,0,0,.28) !important; }
    .fi-card { transition: transform .22s ease, box-shadow .22s ease; }
    .fi-mentor { position:relative; overflow:hidden; border-radius:20px; aspect-ratio:3/4; cursor:default; }
    .fi-mentor img { transition: transform .4s ease; display:block; width:100%; height:100%; object-fit:cover; object-position:top center; }
    .fi-mentor:hover img { transform:scale(1.07); }
    .fi-mentor .bio { opacity:0; transform:translateY(10px); transition: opacity .3s ease, transform .3s ease; }
    .fi-mentor:hover .bio { opacity:1 !important; transform:translateY(0) !important; }
    .fi-btn { transition: box-shadow .2s ease, transform .15s ease; }
    .fi-btn:hover { transform:translateY(-2px); box-shadow: 0 0 56px rgba(8,194,122,.55) !important; }
    .fi-caret { transition: transform .2s ease; }
    @keyframes breathe { 0%,100%{box-shadow:0 0 0 0 rgba(8,194,122,.4)} 50%{box-shadow:0 0 0 8px rgba(8,194,122,0)} }
  `;

  const PX = "clamp(22px,5vw,64px)";
  const MW = 900;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ██████████████████████████  HERO  ████████████████████████████
          Fundo navy puro, sem texturas/grids.
          Título dividido em 2 linhas de cor diferente.
          Stats em linha horizontal limpa.
      ██████████████████████████████████████████████████████████████ */}
      <section style={{ background: NAVY, paddingTop: "clamp(100px,14vh,136px)", paddingBottom: 0, position: "relative", overflow: "hidden" }}>
        {/* Glow – só radial, sem grid */}
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "55%", height: "90%", background: `radial-gradient(ellipse at 60% 30%, ${cor}26 0%, transparent 65%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: MW, margin: "0 auto", padding: `0 ${PX}`, position: "relative" }}>

          {/* Pill de área */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px 5px 9px", borderRadius: 99, background: `${cor}1E`, border: `1px solid ${cor}55`, marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: cor, animation: "breathe 2.2s ease infinite" }} />
            <span style={{ fontFamily: M, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: cor }}>{label} · {curso.type}</span>
          </div>

          {/* Título — palavra-chave em destaque separada */}
          <h1 style={{ fontFamily: F, fontSize: "clamp(38px,6.2vw,76px)", lineHeight: 1.0, letterSpacing: "0.01em", marginBottom: 20 }}>
            <span style={{ color: "#F4F4F4" }}>{curso.title.split(" ").slice(0, 3).join(" ")}{" "}</span>
            <span style={{ color: cor }}>{curso.title.split(" ").slice(3).join(" ")}</span>
          </h1>

          {/* Subheadline */}
          {curso.subheadline && (
            <p style={{ fontFamily: M, fontSize: "clamp(14px,1.5vw,17px)", fontWeight: 400, lineHeight: 1.75, color: "rgba(244,244,244,0.52)", maxWidth: 560, marginBottom: 40 }}>
              {curso.subheadline}
            </p>
          )}

          {/* CTA Principal */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 14, alignItems: "center", marginBottom: 56 }}>
            <a href="#oferta" className="fi-link fi-btn" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 32px", borderRadius: 16, background: "linear-gradient(135deg,#08C27A,#059669)", boxShadow: "0 0 44px rgba(8,194,122,.4)", border: "1.5px solid rgba(8,194,122,.75)", fontFamily: M, fontSize: 15, fontWeight: 700, color: "#fff" }}>
              Garantir minha vaga
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#ementa" className="fi-link" style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: "rgba(169,216,245,0.42)" }}>
              Ver o conteúdo ↓
            </a>
          </div>

          {/* Stats — sem "Garantia", apenas dados reais do curso */}
          {(curso.cargaHoraria || curso.numAulas || curso.formato) && (
            <div style={{ display: "flex", flexWrap: "wrap" as const, borderTop: "1px solid rgba(255,255,255,0.09)", paddingTop: 28, gap: 0 }}>
              {[
                curso.cargaHoraria && { v: curso.cargaHoraria, l: "Carga horária" },
                curso.numAulas     && { v: `${curso.numAulas} aulas`, l: "Ao vivo" },
                curso.formato      && { v: curso.formato, l: "Formato" },
              ].filter(Boolean).map((s: any, i, arr) => (
                <div key={i} style={{ paddingRight: i < arr.length - 1 ? "clamp(20px,3.5vw,44px)" : 0, paddingLeft: i > 0 ? "clamp(20px,3.5vw,44px)" : 0, borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                  <div style={{ fontFamily: F, fontSize: "clamp(22px,2.8vw,32px)", lineHeight: 1, color: "#fff" }}>{s.v}</div>
                  <div style={{ fontFamily: M, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.32)", marginTop: 7 }}>{s.l}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Faixa colorida na base do hero */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${cor}, #08C27A)`, marginTop: 56, opacity: 0.8 }} />
      </section>

      {/* ██████████████████  PARA QUEM  ████████████████████████████████
          Fundo: LIGHT (#F0F6FF)
          Layout: header à esq, grid de cards à dir em desktop
      ████████████████████████████████████████████████████████████████ */}
      {curso.paraQuem && curso.paraQuem.length > 0 && (
        <section id="para-quem" style={{ background: LIGHT, padding: "clamp(72px,10vh,104px) 0" }}>
          <div style={{ maxWidth: MW, margin: "0 auto", padding: `0 ${PX}` }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Para quem é</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.8vw,52px)", lineHeight: 1.0, color: NAVY, marginBottom: 40 }}>ESTA FORMAÇÃO<br />É PRA VOCÊ SE...</h2>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(262px,1fr))", gap: 10 }}>
              {curso.paraQuem.map((txt, i) => (
                <FadeIn key={i} delay={i * 55} y={14}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 13, padding: "17px 20px", background: "#fff", borderRadius: 16, border: "1px solid rgba(3,38,63,0.07)", boxShadow: "0 2px 14px rgba(3,38,63,0.05)" }}>
                    <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: `${cor}1E`, border: `1.5px solid ${cor}55`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                      <svg width={11} height={11} viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke={cor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <p style={{ fontFamily: M, fontSize: 14, fontWeight: 500, color: "#1B3A52", lineHeight: 1.55 }}>{txt}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ██████████████████  DIFERENCIAIS  ████████████████████████████
          Fundo: NAVY — identidade forte, não preto genérico
          Número grande decorativo à esquerda de cada item
      ████████████████████████████████████████████████████████████████ */}
      {curso.diferenciais && curso.diferenciais.length > 0 && (
        <section style={{ background: NAVY, padding: "clamp(72px,10vh,104px) 0" }}>
          <div style={{ maxWidth: MW, margin: "0 auto", padding: `0 ${PX}` }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>O que muda</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.8vw,52px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 44 }}>POR QUE ESTA FORMAÇÃO<br />É DIFERENTE</h2>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(262px,1fr))", gap: 10 }}>
              {curso.diferenciais.map((d, i) => (
                <FadeIn key={i} delay={i * 50} y={14}>
                  <div style={{ padding: "20px 22px", borderRadius: 16, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: F, fontSize: 28, color: `${cor}40`, lineHeight: 1, flexShrink: 0, marginTop: -2 }}>{String(i + 1).padStart(2, "0")}</span>
                    <p style={{ fontFamily: M, fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.8)", lineHeight: 1.6 }}>{d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ██████████████████  EMENTA  ███████████████████████████████████
          Fundo: LIGHT — acordeão limpo, número grande, descrição suave
      ████████████████████████████████████████████████████████████████ */}
      {curso.ementa && curso.ementa.length > 0 && (
        <section id="ementa" style={{ background: LIGHT, padding: "clamp(72px,10vh,104px) 0" }}>
          <div style={{ maxWidth: MW, margin: "0 auto", padding: `0 ${PX}` }}>
            <FadeIn>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 10, marginBottom: 44 }}>
                <div>
                  <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Conteúdo</p>
                  <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.8vw,52px)", lineHeight: 1.0, color: NAVY }}>O QUE VOCÊ VAI APRENDER</h2>
                </div>
                <span style={{ fontFamily: F, fontSize: 18, color: `${cor}66`, paddingBottom: 4 }}>{curso.ementa.length} módulos</span>
              </div>
            </FadeIn>
            {curso.ementa.map((item, i) => {
              const open = tab === i;
              return (
                <div key={i} style={{ borderBottom: "1px solid rgba(3,38,63,0.09)" }}>
                  <button onClick={() => setTab(open ? null : i)} className="fi-tab" style={{ width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "17px 8px", background: "none", border: "none", cursor: "pointer", textAlign: "left" as const, borderRadius: 8 }}>
                    <span style={{ fontFamily: F, fontSize: "clamp(16px,2vw,22px)", color: open ? cor : `${cor}44`, flexShrink: 0, minWidth: 36 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ flex: 1, fontFamily: M, fontSize: 14, fontWeight: 700, color: NAVY, lineHeight: 1.45 }}>{item.titulo}</span>
                    <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 9, background: open ? cor : "rgba(3,38,63,0.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s" }}>
                      <svg className="fi-caret" width={11} height={11} viewBox="0 0 24 24" fill="none" style={{ transform: open ? "rotate(45deg)" : "none" }}>
                        <path d="M12 5v14M5 12h14" stroke={open ? "#fff" : NAVY} strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </button>
                  <div style={{ maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height .32s cubic-bezier(.4,0,.2,1)" }}>
                    {item.descricao && <p style={{ fontFamily: M, fontSize: 13.5, color: "#4A6A80", lineHeight: 1.7, paddingLeft: 52, paddingBottom: 20, paddingRight: 36 }}>{item.descricao}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ██████████████████  EXPERIÊNCIA PRÁTICA  ██████████████████████
          Fundo: DARK (#010E1B) — o mais escuro, máximo contraste
          Lista compacta + marquee de clubes como prova
      ████████████████████████████████████████████████████████████████ */}
      {curso.experienciaPratica && curso.experienciaPratica.length > 0 && (
        <section style={{ background: DARK, overflow: "hidden", position: "relative" as const }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 65% 55% at 75% 35%, ${cor}20, transparent 60%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${cor}90,transparent)` }} />

          <div style={{ maxWidth: MW, margin: "0 auto", padding: `clamp(72px,10vh,104px) ${PX} 44px`, position: "relative" as const }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Exclusivo Futebol Interativo</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.8vw,52px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 14 }}>VOCÊ TERMINA DENTRO<br />DE UM CLUBE PROFISSIONAL</h2>
              <p style={{ fontFamily: M, fontSize: 15, color: "rgba(244,244,244,0.44)", lineHeight: 1.75, maxWidth: 540, marginBottom: 36 }}>
                Não termina o curso em casa. Você vive o dia a dia do departamento dentro de um dos nossos{" "}
                <strong style={{ color: "rgba(244,244,244,0.88)", fontWeight: 700 }}>+130 clubes parceiros</strong> espalhados pelo Brasil.
              </p>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(256px,1fr))", gap: 8, marginBottom: 36 }}>
              {curso.experienciaPratica.map((t, i) => (
                <FadeIn key={i} delay={i * 45} y={12}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "13px 16px", background: "rgba(255,255,255,0.04)", border: `1px solid ${cor}2E`, borderRadius: 13 }}>
                    <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 6, background: `${cor}28`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                      <svg width={9} height={9} viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke={cor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <p style={{ fontFamily: M, fontSize: 13, fontWeight: 500, color: "rgba(244,244,244,0.82)", lineHeight: 1.45 }}>{t}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <a href="#oferta" className="fi-link fi-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 26px", borderRadius: 13, background: cor, fontFamily: M, fontSize: 14, fontWeight: 700, color: "#fff", boxShadow: `0 8px 30px ${cor}50` }}>
              Quero essa experiência
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>

          {/* Clubes */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px 0 28px" }}>
            <p style={{ textAlign: "center" as const, fontFamily: M, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.22)", marginBottom: 14 }}>+130 clubes parceiros</p>
            <Marquee />
          </div>
        </section>
      )}

      {/* ██████████████████  MENTORES  █████████████████████████████████
          Fundo: NAVY — identidade FI
          Cards com foto 3:4, hover revela bio via overlay
      ████████████████████████████████████████████████████████████████ */}
      {curso.mentores && curso.mentores.length > 0 && (
        <section style={{ background: NAVY, padding: "clamp(72px,10vh,104px) 0" }}>
          <div style={{ maxWidth: MW, margin: "0 auto", padding: `0 ${PX}` }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Quem vai te ensinar</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.8vw,52px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 44 }}>OS MENTORES</h2>
            </FadeIn>
            {comFoto.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(132px,1fr))", gap: "clamp(10px,1.6vw,16px)", marginBottom: semFoto.length > 0 ? 14 : 0 }}>
                {comFoto.map((m, i) => (
                  <FadeIn key={i} delay={i * 65} y={16}>
                    <div className="fi-mentor" style={{ background: `linear-gradient(160deg,#0A1E35,${cor}28)` }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.foto} alt={m.nome} loading="lazy" onError={e => { (e.target as HTMLImageElement).style.opacity = "0"; }} />
                      {/* fade sempre visível */}
                      <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(to top,rgba(1,14,27,.96),transparent)" }} />
                      {/* nome */}
                      <p style={{ position: "absolute" as const, bottom: 9, left: 10, right: 10, fontFamily: F, fontSize: "clamp(10px,1.1vw,12.5px)", color: "#fff", lineHeight: 1.1 }}>{m.nome}</p>
                      {/* overlay de hover */}
                      <div className="bio" style={{ position: "absolute" as const, inset: 0, background: `linear-gradient(to top,${cor}F0 0%,${cor}BB 55%,transparent 100%)`, display: "flex", flexDirection: "column" as const, justifyContent: "flex-end", padding: 12 }}>
                        <p style={{ fontFamily: F, fontSize: "clamp(10px,1.1vw,12px)", color: "#fff", lineHeight: 1.05, marginBottom: 5 }}>{m.nome}</p>
                        <p style={{ fontFamily: M, fontSize: 10.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.35 }}>{m.bio}</p>
                      </div>
                    </div>
                    <p style={{ fontFamily: M, fontSize: 10.5, fontWeight: 500, color: "rgba(169,216,245,0.42)", lineHeight: 1.4, marginTop: 9 }}>{m.bio}</p>
                  </FadeIn>
                ))}
              </div>
            )}
            {semFoto.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 17px", background: "rgba(255,255,255,0.05)", border: `1px solid ${cor}28`, borderRadius: 13, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${cor}22`, border: `1.5px solid ${cor}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: F, fontSize: 14, color: cor }}>{m.nome.charAt(0)}</div>
                <div>
                  <p style={{ fontFamily: F, fontSize: 13, color: "#F4F4F4", lineHeight: 1.1 }}>{m.nome}</p>
                  <p style={{ fontFamily: M, fontSize: 11, color: "rgba(169,216,245,0.42)", marginTop: 2 }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ██████████████████  DEPOIMENTOS  ██████████████████████████████
          Fundo: LIGHT — contraste forte após NAVY
          Cards com borda colorida e rodapé com nome
      ████████████████████████████████████████████████████████████████ */}
      {curso.depoimentos && curso.depoimentos.length > 0 && (
        <section style={{ background: LIGHT, padding: "clamp(72px,10vh,104px) 0" }}>
          <div style={{ maxWidth: MW, margin: "0 auto", padding: `0 ${PX}` }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Resultados reais</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.8vw,52px)", lineHeight: 1.0, color: NAVY, marginBottom: 44 }}>QUEM JÁ CURSOU<br />E FOI CONTRATADO</h2>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "clamp(14px,2.2vw,20px)" }}>
              {curso.depoimentos.map((d, i) => {
                const vid = d.videoUrl ? ytId(d.videoUrl) : "";
                return (
                  <FadeIn key={i} delay={i * 80} y={16}>
                    <div className="fi-card" style={{ borderRadius: 18, overflow: "hidden", border: `2px solid ${cor}`, background: "#fff", boxShadow: "0 4px 20px rgba(3,38,63,0.08)" }}>
                      {vid ? (
                        <div style={{ aspectRatio: "16/9" }}>
                          <iframe src={`https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1`} title={d.nome} style={{ width: "100%", height: "100%", border: "none", display: "block" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </div>
                      ) : (
                        <div style={{ aspectRatio: "16/9", background: `linear-gradient(135deg,${NAVY},${cor}30)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width={40} height={40} viewBox="0 0 24 24" fill="none"><circle cx={12} cy={12} r={10} stroke={cor} strokeWidth={1.5} opacity={.5}/><polygon points="10,8 17,12 10,16" fill={cor} opacity={.6}/></svg>
                        </div>
                      )}
                      <div style={{ padding: "14px 18px 18px", borderTop: `3px solid ${cor}` }}>
                        <p style={{ fontFamily: F, fontSize: "clamp(14px,1.7vw,18px)", color: NAVY, lineHeight: 1.1, marginBottom: 4 }}>{d.nome}</p>
                        {d.papel && <p style={{ fontFamily: M, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: cor }}>{d.papel}</p>}
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ██████████████████  STATS  ████████████████████████████████████
          Fundo: faixa sólida na cor da área — único momento de cor pura
          Números brancos enormes, contraste máximo
      ████████████████████████████████████████████████████████████████ */}
      {curso.stats && curso.stats.length > 0 && (
        <section style={{ background: cor, padding: "clamp(56px,8vh,88px) 0" }}>
          <div style={{ maxWidth: MW, margin: "0 auto", padding: `0 ${PX}`, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))", gap: "clamp(20px,5vw,56px)", textAlign: "center" as const }}>
            {curso.stats.map((s, i) => (
              <FadeIn key={i} delay={i * 80} y={10}>
                <div style={{ fontFamily: F, fontSize: "clamp(36px,6.5vw,64px)", lineHeight: 0.88, color: "#fff", letterSpacing: "-0.02em" }}>
                  <Counter raw={s.valor} />
                </div>
                <div style={{ fontFamily: M, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.55)", marginTop: 13 }}>{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* ██████████████████  OFERTA  ███████████████████████████████████ */}
      {(curso.preco || url || curso.hubspotFormId) && (
        <section id="oferta" style={{ background: DARK, padding: "clamp(72px,10vh,104px) 0" }}>
          <div style={{ maxWidth: MW, margin: "0 auto", padding: `0 ${PX}` }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: cor, marginBottom: 12 }}>Última etapa</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.8vw,52px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 16 }}>GARANTA SUA VAGA AGORA</h2>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "8px 24px", marginBottom: 40 }}>
                {["Garantia de 12 meses", "Compra 100% segura", "+4.500 alunos formados", "Acesso vitalício"].map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <svg width={13} height={13} viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="#08C27A" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontFamily: M, fontSize: 12.5, fontWeight: 600, color: "rgba(244,244,244,0.46)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "clamp(14px,2.5vw,22px)", alignItems: "start" }}>
              <CursoCTA curso={curso} />
              {curso.hubspotPortalId && curso.hubspotFormId && (
                <FadeIn delay={100} y={14}>
                  {/* Card do formulário — mesmo estilo do CTA card */}
                  <div style={{ background: "linear-gradient(160deg,#0F2744,#0A1E35)", border: "1px solid rgba(64,150,242,0.2)", borderRadius: 24, padding: "clamp(24px,3vw,36px)", boxShadow: "0 32px 64px -24px rgba(0,10,30,0.6)" }}>
                    <p style={{ fontFamily: F, fontSize: "clamp(17px,2vw,22px)", color: "#F4F4F4", marginBottom: 6, lineHeight: 1.05 }}>FALE COM UM CONSULTOR</p>
                    <p style={{ fontFamily: M, fontSize: 12.5, color: "rgba(169,216,245,0.4)", marginBottom: 22, lineHeight: 1.65 }}>Tire suas dúvidas antes de se inscrever.</p>
                    {/* CSS que estiliza os inputs brancos do HubSpot para o tema dark */}
                    <style dangerouslySetInnerHTML={{ __html: `
                      .hs-form-private input[type=text],
                      .hs-form-private input[type=email],
                      .hs-form-private input[type=tel],
                      .hs-form-private select {
                        background: rgba(255,255,255,0.06) !important;
                        border: 1px solid rgba(255,255,255,0.12) !important;
                        border-radius: 10px !important;
                        color: #F4F4F4 !important;
                        padding: 11px 14px !important;
                        font-family: ${M} !important;
                        font-size: 13.5px !important;
                        width: 100% !important;
                        box-sizing: border-box !important;
                        outline: none !important;
                        transition: border-color .2s !important;
                      }
                      .hs-form-private input:focus,
                      .hs-form-private select:focus {
                        border-color: rgba(64,150,242,0.5) !important;
                      }
                      .hs-form-private input::placeholder { color: rgba(169,216,245,0.3) !important; }
                      .hs-form-private select option { background: #0A1E35; color: #F4F4F4; }
                      .hs-form-private label {
                        font-family: ${M} !important;
                        font-size: 11px !important;
                        font-weight: 700 !important;
                        letter-spacing: 0.08em !important;
                        text-transform: uppercase !important;
                        color: rgba(169,216,245,0.5) !important;
                        margin-bottom: 6px !important;
                        display: block !important;
                      }
                      .hs-form-private .hs-error-msgs { list-style: none !important; }
                      .hs-form-private .hs-error-msgs li { color: #ff6b6b !important; font-size: 11px !important; font-family: ${M} !important; margin-top: 4px !important; }
                      .hs-form-private .hs-form-field { margin-bottom: 14px !important; }
                      .hs-form-private .hs-input.error { border-color: rgba(255,107,107,0.5) !important; }
                      .hs-form-private .hs-button {
                        width: 100% !important;
                        padding: 14px !important;
                        background: linear-gradient(135deg,#08C27A,#059669) !important;
                        border: none !important;
                        border-radius: 12px !important;
                        color: #fff !important;
                        font-family: ${M} !important;
                        font-size: 14px !important;
                        font-weight: 700 !important;
                        cursor: pointer !important;
                        margin-top: 8px !important;
                        box-shadow: 0 8px 24px rgba(8,194,122,0.4) !important;
                        transition: box-shadow .2s, transform .15s !important;
                      }
                      .hs-form-private .hs-button:hover { transform: translateY(-2px) !important; box-shadow: 0 12px 32px rgba(8,194,122,0.55) !important; }
                      .hs-form-private .inputs-list { list-style: none !important; }
                      .hs-form-private .inputs-list li { margin-bottom: 6px !important; }
                      .hs-form-private .inputs-list li label { text-transform: none !important; font-size: 13px !important; color: rgba(244,244,244,0.7) !important; letter-spacing: 0 !important; display: flex !important; align-items: center !important; gap: 8px !important; }
                    ` }} />
                    <CursoForm curso={curso} />
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ██████████████████  GARANTIA  █████████████████████████████████ */}
      {curso.garantiaTexto && (
        <section style={{ background: NAVY, padding: `0 ${PX} clamp(72px,10vh,104px)` }}>
          <div style={{ maxWidth: MW, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ position: "relative" as const, overflow: "hidden", background: `linear-gradient(145deg,${DARK},#021629)`, border: `1px solid ${cor}35`, borderRadius: 24, padding: "clamp(28px,4.5vw,52px)" }}>
                {/* glows */}
                <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: `${cor}1C`, filter: "blur(60px)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(8,194,122,0.1)", filter: "blur(48px)", pointerEvents: "none" }} />

                <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: "clamp(20px,3.5vw,40px)", position: "relative" as const }}>
                  {/* Ícone */}
                  <div style={{ flexShrink: 0, width: 72, height: 72, borderRadius: 22, background: `${cor}22`, border: `2px solid ${cor}55`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={cor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 12l2 2 4-4" stroke={cor} strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {/* Texto */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: cor, marginBottom: 10 }}>Garantia Futebol Interativo</p>
                    <h3 style={{ fontFamily: F, fontSize: "clamp(20px,2.8vw,32px)", color: "#fff", lineHeight: 1.05, marginBottom: 12 }}>SE NÃO FUNCIONAR,<br />DEVOLVEMOS TUDO</h3>
                    <p style={{ fontFamily: M, fontSize: 14, color: "rgba(169,216,245,0.44)", lineHeight: 1.75, maxWidth: 500 }}>{curso.garantiaTexto}</p>
                  </div>
                  {/* CTA */}
                  <a href="#oferta" className="fi-link fi-btn" style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#059669)", boxShadow: "0 8px 28px rgba(8,194,122,.38)", fontFamily: M, fontSize: 14, fontWeight: 700, color: "#fff", position: "relative" as const }}>
                    Garantir minha vaga
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* sticky mobile */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, transform: sticky ? "translateY(0)" : "translateY(100%)", transition: "transform .3s ease", background: "rgba(1,14,27,0.97)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }} className="md:hidden">
        <div>
          <p style={{ fontFamily: F, fontSize: 13, color: "#F4F4F4", lineHeight: 1 }}>
            {curso.preco?.match(/R\$\s*[\d.,]+/)?.[0]}
            <span style={{ fontFamily: M, fontSize: 10, color: "rgba(244,244,244,0.38)", marginLeft: 4 }}>/mês</span>
          </p>
          <p style={{ fontFamily: M, fontSize: 10, color: "rgba(244,244,244,0.32)", marginTop: 2 }}>
            ou R$ {curso.precoAvista?.replace(/^R\$\s*/,"")} à vista
          </p>
        </div>
        <a href="#oferta" className="fi-link" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 20px", borderRadius: 12, background: "linear-gradient(135deg,#08C27A,#059669)", fontFamily: M, fontSize: 13.5, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
          Garantir vaga
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>

      {/* rodapé */}
      <div style={{ background: "#010812", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "20px", textAlign: "center" as const }}>
        <a href="/cursos" className="fi-link" style={{ fontFamily: M, fontSize: 11.5, fontWeight: 600, color: "rgba(169,216,245,0.2)", letterSpacing: "0.08em" }}>← Ver todas as formações</a>
      </div>
    </>
  );
}