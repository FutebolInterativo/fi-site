// app/experiencia-pratica/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapaClubes from "@/components/MapaClubes";
import Link from "next/link";
import Image from "next/image";
import HubspotFormModal from "@/components/HubspotFormModal";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

/* ── dados ────────────────────────────────────────────────────────── */
const depoimentos = [
  { area: "Análise e Dados",     nome: "Rafael Mantovani",   texto: "A experiência prática no Ituano foi o que abriu as portas. Entrei no clube, mostrei meu trabalho e fui contratado.",                  ytId: "KEZ8JXbGvl4" },
  { area: "Análise e Dados",     nome: "Rhostann de Almeida",texto: "Fiz minha Experiência Prática no Atlético-GO. Logo depois, fui contratado pelo clube.",                                              ytId: "NAe8BMn3E0g" },
  { area: "Análise e Dados",     nome: "Giulia Zanchett",    texto: "Realizei minha Experiência Prática no Avaí. Depois, fui contratada pelo clube.",                                                      ytId: "_foOBOYAWTM" },
  { area: "Técnico e Tático",    nome: "Rafael Belini",      texto: "Fiz experiência prática no departamento técnico da Portuguesa/RJ.",                                                                   ytId: "UkmLfPMX8_s" },
  { area: "Técnico e Tático",    nome: "Alan Ramos",         texto: "Fiz experiência prática no departamento técnico do Grêmio Osasco Audax.",                                                            ytId: "yy4-EH5rfEE" },
  { area: "Saúde e Performance", nome: "Roque Alencar",      texto: "Realizei minha Experiência Prática no Atlético-GO. Depois, fui contratado pelo clube.",                                              ytId: "a49fOzPuZE4" },
  { area: "Saúde e Performance", nome: "Caique Neves",       texto: "Fiz minha experiência prática no departamento de preparação física do São Caetano/SP.",                                             ytId: "TKrFekb3yMc" },
  { area: "Gestão e Jurídico",   nome: "Diego Carneiro",     texto: "Realizei minha Experiência Prática no departamento de gestão do Bahia.",                                                             ytId: "2fENX6EJN0E" },
  { area: "Gestão e Jurídico",   nome: "Thamires Hermida",   texto: "Formada em direito, fiz experiência prática no jurídico do Figueirense e fui contratada pelo clube.",                               ytId: "WpaGKFy-Ls0" },
  { area: "Comunicação e Marketing", nome: "Victória Souza", texto: "Fiz experiência prática no departamento de comunicação do Bahia e fui contratada pelo Botafogo.",                                   ytId: "XX5ml4f0zeM" },
  { area: "Comunicação e Marketing", nome: "Pedro Tanure",   texto: "Fiz experiência prática no departamento de comunicação do América-MG.",                                                             ytId: "Saz4bGb-YEM" },
];

const AREAS = ["Análise e Dados","Técnico e Tático","Saúde e Performance","Gestão e Jurídico","Comunicação e Marketing"] as const;

const AREA_COR: Record<string, string> = {
  "Análise e Dados":     "#4096F2",
  "Técnico e Tático":    "#818CF8",
  "Saúde e Performance": "#2DD4BF",
  "Gestão e Jurídico":   "#F59E0B",
  "Comunicação e Marketing": "#F472B6",
};

// Mesmos números da home (Hero.tsx) — mantidos idênticos para não gerar
// inconsistência de dados entre páginas.
const STATS = [
  { raw: "100%",   label: "Prática garantida" },
  { raw: "+130",   label: "Clubes parceiros" },
  { raw: "+4.500", label: "Alunos contratados" },
  { raw: "34",     label: "Formações" },
];

const passos = [
  { num: "01", titulo: "Conclua a parte teórica",   desc: "Termine as aulas online da sua especialização no seu ritmo, com profissionais que atuam no mercado." },
  { num: "02", titulo: "Indique suas opções de clube", desc: "Escolha até 3 opções entre os +130 clubes parceiros espalhados pelo Brasil. A prática é garantida em um deles, conforme a disponibilidade." },
  { num: "03", titulo: "Viva dentro de um clube",   desc: "Durante até 15 dias, você atua dentro do departamento da sua área, ao lado de profissionais reais." },
  { num: "04", titulo: "Construa sua rede no mercado", desc: "Você coloca em prática o que aprendeu lado a lado com quem já atua no futebol profissional, criando conexões reais que facilitam futuras oportunidades." },
];

/* ── FadeIn ──────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, y = 18 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    Object.assign(el.style, { opacity: "0", transform: `translateY(${y}px)`, transition: `opacity .6s ${delay}ms ease, transform .6s ${delay}ms ease` });
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, y]);
  return <div ref={ref}>{children}</div>;
}

/* ── Counter ─────────────────────────────────────────────────────── */
function Counter({ raw }: { raw: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el || done.current) return;
    const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return;
    const pre = raw.match(/^[^0-9]*/)?.[0] ?? "";
    const suf = raw.match(/[^0-9.,]+$/)?.[0] ?? "";
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      const t0 = performance.now();
      const run = (now: number) => {
        const t = Math.min((now - t0) / 1200, 1);
        const v = 1 - Math.pow(1 - t, 3);
        const rounded = Math.round(v * num);
        el.textContent = pre + rounded.toLocaleString("pt-BR") + suf;
        if (t < 1) requestAnimationFrame(run);
        else el.textContent = raw;
      };
      requestAnimationFrame(run);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [raw]);
  return <span ref={ref}>{raw}</span>;
}

/* ── VideoCard — thumbnail clicável, avisa a página pra abrir o modal ───── */
function VideoCard({ ytId, nome, texto, cor, onPlay }: { ytId: string; nome: string; texto: string; cor: string; onPlay: () => void }) {
  const thumb = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" as const, borderRadius: 20, overflow: "hidden", border: `1px solid ${cor}35`, background: "#031525", transition: "transform .22s ease, box-shadow .22s ease" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 48px rgba(0,0,0,.35)`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      {/* thumbnail — clicar abre o modal com o vídeo grande */}
      <div style={{ position: "relative" as const, aspectRatio: "16/9", flexShrink: 0, background: "#021829", cursor: "pointer" }} onClick={onPlay}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt={nome} style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", display: "block" }} />
        {/* overlay escuro */}
        <div style={{ position: "absolute" as const, inset: 0, background: "rgba(0,0,0,0.38)" }} />
        {/* botão play */}
        <div style={{ position: "absolute" as const, inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: cor, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 32px ${cor}80`, transition: "transform .2s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.12)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; }}
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none"><polygon points="9,7 19,12 9,17" fill="#fff"/></svg>
          </div>
        </div>
      </div>
      {/* rodapé do card — cresce pra preencher o espaço, mantendo o texto sempre no topo */}
      <div style={{ padding: "14px 18px 18px", flex: 1, display: "flex", flexDirection: "column" as const }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ width: 4, height: 20, borderRadius: 2, background: cor, flexShrink: 0 }} />
          <p style={{ fontFamily: F, fontSize: "clamp(14px,1.6vw,17px)", color: "#F4F4F4", lineHeight: 1.1 }}>{nome}</p>
        </div>
        <p style={{
          fontFamily: M, fontSize: 12.5, fontWeight: 500, color: "rgba(244,244,244,0.5)", lineHeight: 1.55,
          display: "-webkit-box", WebkitBoxOrient: "vertical" as const, WebkitLineClamp: 3, overflow: "hidden",
        }}>{texto}</p>
      </div>
    </div>
  );
}

/* ── página ──────────────────────────────────────────────────────── */
export default function ExperienciaPraticaPage() {
  const [areaAtiva, setAreaAtiva] = useState<string>("Análise e Dados");
  const [modalVideo, setModalVideo] = useState<{ id: string; nome: string } | null>(null);

  // fecha o modal de vídeo com Esc e trava o scroll da página enquanto aberto
  useEffect(() => {
    if (!modalVideo) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setModalVideo(null);
    }
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalVideo]);

  const css = `
    .ep-tab { transition: background .18s ease, color .18s ease, border-color .18s ease; }
    .ep-passo { transition: transform .2s ease, box-shadow .2s ease; }
    .ep-passo:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,.25); }
    .ep-vive-card:hover { transform: translateY(-3px); border-color: rgba(12,152,252,0.4) !important; }
    @keyframes breathe { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.5)} }
  `;

  const depsFiltrados = depoimentos.filter(d => d.area === areaAtiva);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Header />
      <main style={{ background: "#03263F" }}>

        {/* ════════════  HERO  ════════════ */}
        <section style={{ background: "linear-gradient(150deg,#010E1B 0%,#021C30 50%,#031F3A 100%)", paddingTop: "clamp(100px,14vh,140px)", paddingBottom: "clamp(64px,9vh,96px)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 70% 40%, rgba(8,194,122,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(140,200,245,0.3),transparent)" }} />

          <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)", position: "relative" }}>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

              {/* ── Coluna de texto ── */}
              <FadeIn>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px 6px 9px", borderRadius: 99, background: "rgba(12,152,252,0.12)", border: "1px solid rgba(12,152,252,0.35)", marginBottom: 28 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#A9D8F5", animation: "breathe 2s ease infinite" }} />
                    <span style={{ fontFamily: M, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#A9D8F5" }}>Diferencial exclusivo do Futebol Interativo</span>
                  </div>

                  <h1 style={{ fontFamily: F, fontSize: "clamp(38px,6vw,72px)", lineHeight: 1.0, color: "#F4F4F4", letterSpacing: "0.01em", marginBottom: 22 }}>
                    EXPERIÊNCIA <span style={{ color: "#0C98FC" }}>PRÁTICA</span><br />
                    DENTRO DE UM CLUBE
                  </h1>

                  <p style={{ fontFamily: M, fontSize: "clamp(15px,1.6vw,18px)", fontWeight: 400, lineHeight: 1.7, color: "rgba(244,244,244,0.58)", maxWidth: 480, marginBottom: 36 }}>
                    Ao concluir a parte teórica de uma especialização do FI, você tem direito a até{" "}
                    <strong style={{ color: "#F4F4F4", fontWeight: 700 }}>15 dias de experiência prática dentro de um clube parceiro</strong>,
                    atuando no departamento da sua área.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12 }}>
                    <a href="#como-funciona" style={{ fontFamily: M, fontWeight: 700, fontSize: 14, color: "#fff", display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#059669)", border: "1.5px solid rgba(8,194,122,0.8)", boxShadow: "0 0 36px rgba(8,194,122,0.45)", textDecoration: "none" }}>
                      Como funciona
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                    <Link href="/cursos" style={{ fontFamily: M, fontWeight: 600, fontSize: 14, color: "rgba(244,244,244,0.65)", display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.2)", textDecoration: "none" }}>
                      Ver formações
                    </Link>
                  </div>
                </div>
              </FadeIn>

              {/* ── Coluna de imagem — colagem de alunos que já viveram a experiência ── */}
              <FadeIn delay={120}>
                <div style={{ position: "relative", maxWidth: 380, margin: "0 auto" }}>
                  <Image
                    src="/images/cursos/experiencia-pratica-alunos-collage.png"
                    alt="Alunos do Futebol Interativo que já viveram a experiência prática dentro de clubes parceiros"
                    width={602}
                    height={684}
                    priority
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* ════════════  STATS — mesmos números e layout com divisórias da home  ════════════ */}
        <section style={{ background: "#03263F", padding: "clamp(40px,6vh,60px) 0", borderTop: "1px solid rgba(140,200,245,0.1)" }}>
          <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)" }}>
            {/* mobile: 2 colunas, divisórias como na home */}
            <div className="grid md:hidden" style={{ gridTemplateColumns: "1fr 1fr", gap: "24px 0" }}>
              {STATS.map((s, i) => (
                <div key={s.label} style={{
                  textAlign: "center" as const,
                  paddingRight: i % 2 === 0 ? 16 : 0,
                  paddingLeft: i % 2 === 1 ? 16 : 0,
                  borderRight: i % 2 === 0 ? "1px solid rgba(169,216,245,0.2)" : "none",
                  borderTop: i >= 2 ? "1px solid rgba(169,216,245,0.2)" : "none",
                  paddingTop: i >= 2 ? 16 : 0,
                }}>
                  <div style={{ fontFamily: F, fontSize: "clamp(32px,8vw,44px)", lineHeight: 0.9, color: "#F4F4F4", letterSpacing: "-0.02em" }}>
                    <Counter raw={s.raw} />
                  </div>
                  <div style={{ fontFamily: M, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#A9D8F5", marginTop: 8 }}>{s.label}</div>
                </div>
              ))}
            </div>
            {/* desktop: 4 colunas, divisórias verticais como na home */}
            <div className="hidden md:grid" style={{ gridTemplateColumns: "repeat(4,1fr)", gap: 0, textAlign: "center" as const }}>
              {STATS.map((s, i) => (
                <div key={s.label} style={{ paddingRight: 20, borderRight: i < 3 ? "1px solid rgba(169,216,245,0.2)" : "none", paddingLeft: i > 0 ? 20 : 0 }}>
                  <div style={{ fontFamily: F, fontSize: "clamp(34px,5vw,54px)", lineHeight: 0.88, color: "#F4F4F4", letterSpacing: "-0.02em" }}>
                    <Counter raw={s.raw} />
                  </div>
                  <div style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#A9D8F5", marginTop: 10 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════  COMO FUNCIONA  ════════════ */}
        <section id="como-funciona" style={{ background: "#03263F", padding: "clamp(72px,10vh,104px) 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 45% at 85% 10%,rgba(12,152,252,0.08),transparent 60%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)", position: "relative" }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "#A9D8F5", marginBottom: 12 }}>Passo a passo</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,52px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 44 }}>COMO FUNCIONA A<br />EXPERIÊNCIA PRÁTICA?</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {passos.map((p, i) => (
                <FadeIn key={p.num} delay={i * 80}>
                  <div className="ep-passo" style={{ padding: "32px 28px", borderRadius: 20, border: "1px solid rgba(140,200,245,0.12)", background: "linear-gradient(155deg,#0A1E35,rgba(12,152,252,0.08))", height: "100%" }}>
                    <div style={{ fontFamily: F, fontSize: 56, lineHeight: 1, color: "rgba(12,152,252,0.22)", marginBottom: 14 }}>{p.num}</div>
                    <div style={{ fontFamily: F, fontSize: "clamp(18px,2vw,22px)", lineHeight: 1.1, color: "#F4F4F4", marginBottom: 10 }}>{p.titulo}</div>
                    <p style={{ fontFamily: M, fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.58)", lineHeight: 1.65 }}>{p.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════  O QUE VOCÊ VIVE LÁ DENTRO  ════════════ */}
        <section style={{ background: "#020C18", padding: "clamp(72px,10vh,104px) 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 45% at 15% 15%,rgba(12,152,252,0.08),transparent 60%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)", position: "relative" }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "#A9D8F5", marginBottom: 12 }}>O que você vive lá dentro</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,52px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 16 }}>COMO É UM DIA DENTRO<br />DO CLUBE</h2>
              <p style={{ fontFamily: M, fontSize: 15, fontWeight: 400, color: "rgba(244,244,244,0.55)", lineHeight: 1.75, maxWidth: 620, marginBottom: 48 }}>
                A rotina exata varia de acordo com a sua área e o clube parceiro — quem faz a prática em Saúde não vive o mesmo dia a dia de quem faz em Comunicação ou Gestão, por exemplo. Alguns pontos, porém, são comuns a todas as experiências:
              </p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { titulo: "Rotina real do departamento", desc: "Acompanha de perto a estrutura e os bastidores do departamento da sua área dentro do clube, do jeito que ele funciona de verdade.", icone: <path d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1ZM6 6h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" /> },
                { titulo: "Lado a lado com profissionais", desc: "Trabalha próximo de quem já atua no mercado, aprendendo com a experiência de quem está no dia a dia do futebol.", icone: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /> },
                { titulo: "Prática do que aprendeu na teoria", desc: "Aplica no contexto real do clube o conteúdo estudado durante o curso, cada um dentro da sua especialização.", icone: <path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" /> },
                { titulo: "Rede de contatos real", desc: "Constrói uma rede de contatos lado a lado com quem já atua no mercado da bola, o que facilita futuras oportunidades.", icone: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM9 12l2 2 4-4" /> },
              ].map((m, i) => (
                <FadeIn key={m.titulo} delay={i * 70}>
                  <div className="ep-vive-card" style={{
                    height: "100%", padding: "26px 24px", borderRadius: 18,
                    border: "1px solid rgba(140,200,245,0.12)",
                    background: "linear-gradient(155deg,#0A1E35,rgba(12,152,252,0.07))",
                    transition: "transform .2s ease, border-color .2s ease",
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: "#03263F", border: "2px solid #0C98FC",
                      display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
                    }}>
                      <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="#0C98FC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {m.icone}
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: F, fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.1, color: "#F4F4F4", marginBottom: 8 }}>{m.titulo}</h3>
                    <p style={{ fontFamily: M, fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.55)", lineHeight: 1.6 }}>{m.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════  MAPA DE CLUBES  ════════════ */}
        <MapaClubes />

        {/* ════════════  DEPOIMENTOS  ════════════ */}
        <section style={{ background: "#020C18", padding: "clamp(72px,10vh,104px) 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 90% 5%,rgba(8,194,122,0.06),transparent 60%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)", position: "relative" }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "#A9D8F5", marginBottom: 12 }}>Casos de sucesso</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,52px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 36 }}>ALUNOS QUE FIZERAM E<br />FORAM CONTRATADOS</h2>
            </FadeIn>

            {/* Tabs de área */}
            <FadeIn delay={100}>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginBottom: 36, justifyContent: "center" }}>
                {AREAS.map((area) => {
                  const ativa = areaAtiva === area;
                  const c = AREA_COR[area];
                  return (
                    <button
                      key={area}
                      className="ep-tab"
                      onClick={() => setAreaAtiva(area)}
                      style={{
                        fontFamily: M, fontSize: 12, fontWeight: 700,
                        padding: "8px 18px", borderRadius: 99, cursor: "pointer",
                        border: `1.5px solid ${ativa ? c : "rgba(140,200,245,0.18)"}`,
                        background: ativa ? `${c}22` : "transparent",
                        color: ativa ? c : "rgba(169,216,245,0.55)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {area}
                    </button>
                  );
                })}
              </div>
            </FadeIn>

            {/* Grid de vídeos */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "clamp(14px,2vw,20px)" }}>
              {depsFiltrados.map((d, i) => (
                <FadeIn key={d.nome} delay={i * 80}>
                  <VideoCard ytId={d.ytId} nome={d.nome} texto={d.texto} cor={AREA_COR[d.area]} onPlay={() => setModalVideo({ id: d.ytId, nome: d.nome })} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════  CTA FINAL  ════════════ */}
        <section style={{ background: "#03263F", padding: "clamp(72px,10vh,104px) 0" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)", textAlign: "center" as const }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "#A9D8F5", marginBottom: 12 }}>Dê o próximo passo</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,52px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 16 }}>QUERO PARTICIPAR DA<br />EXPERIÊNCIA PRÁTICA</h2>
              <p style={{ fontFamily: M, fontSize: 15, fontWeight: 400, color: "rgba(244,244,244,0.55)", lineHeight: 1.75, marginBottom: 36 }}>
                Fale com um consultor do FI e descubra qual especialização é a certa para você começar.
              </p>
              <HubspotFormModal
                title="Fale com um consultor"
                subtitle="Responda 6 perguntas rápidas e descubra qual especialização é a certa pra você."
                defaultUtm={{
                  utm_source: "trafego",
                  utm_medium: "site",
                  utm_campaign: "geral",
                  utm_content: "experiencia-pratica-cta-final-falar-com-um-consultor",
                  utm_term: "geral",
                }}
                trigger={
                  <span style={{ fontFamily: M, fontWeight: 700, fontSize: 15, color: "#fff", display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 32px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#059669)", boxShadow: "0 8px 28px rgba(8,194,122,0.4)" }}>
                    Falar com um consultor
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                }
              />
              <div style={{ marginTop: 16 }}>
                <Link href="/cursos" style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: "rgba(169,216,245,0.55)", textDecoration: "none" }}>
                  Ver todas as especializações →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>

      {/* ════════════  MODAL DE VÍDEO  ════════════ */}
      {modalVideo && (
        <div
          onClick={() => setModalVideo(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            background: "rgba(1,10,20,0.85)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "min(880px, 100%)", position: "relative" }}
          >
            <button
              onClick={() => setModalVideo(null)}
              aria-label="Fechar"
              style={{
                position: "absolute", top: -44, right: 0,
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)",
                color: "#fff", cursor: "pointer", fontSize: 18, lineHeight: 1,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >×</button>
            <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "16/9", background: "#000", boxShadow: "0 40px 100px -20px rgba(0,0,0,0.7)" }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${modalVideo.id}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&playsinline=1`}
                title={modalVideo.nome}
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", textAlign: "center" as const, marginTop: 14 }}>
              {modalVideo.nome}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}