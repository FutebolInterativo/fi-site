// app/experiencia-pratica/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapaClubes from "@/components/MapaClubes";
import PraticaInternacional from "@/components/PraticaInternacional";
import Link from "next/link";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

/* ── dados ────────────────────────────────────────────────────────── */
const depoimentos = [
  { area: "Análise e Dados",     nome: "Rafael Mantovani",   texto: "A experiência prática no Ituano foi o que abriu as portas. Entrei no clube, mostrei meu trabalho e fui contratado.",                  ytId: "KEZ8JXbGvl4" },
  { area: "Análise e Dados",     nome: "Rhostann de Almeida",texto: "Fiz minha Experiência Prática no Atlético-GO. Logo depois, fui contratado pelo clube.",                                              ytId: "NAe8BMn3E0g" },
  { area: "Análise e Dados",     nome: "Giulia Zanchett",    texto: "Realizei minha Experiência Prática no Avaí. Depois, fui contratada pelo clube.",                                                      ytId: "_foOBOYAWTM" },
  { area: "Técnica e Tática",    nome: "Rafael Belini",      texto: "Fiz experiência prática no departamento técnico da Portuguesa/RJ.",                                                                   ytId: "UkmLfPMX8_s" },
  { area: "Técnica e Tática",    nome: "Alan Ramos",         texto: "Fiz experiência prática no departamento técnico do Grêmio Osasco Audax.",                                                            ytId: "yy4-EH5rfEE" },
  { area: "Saúde e Performance", nome: "Roque Alencar",      texto: "Realizei minha Experiência Prática no Atlético-GO. Depois, fui contratado pelo clube.",                                              ytId: "a49fOzPuZE4" },
  { area: "Saúde e Performance", nome: "Caique Neves",       texto: "Fiz minha experiência prática no departamento de preparação física do São Caetano/SP.",                                             ytId: "TKrFekb3yMc" },
  { area: "Gestão e Operação",   nome: "Diego Carneiro",     texto: "Realizei minha Experiência Prática no departamento de gestão do Bahia.",                                                             ytId: "2fENX6EJN0E" },
  { area: "Gestão e Operação",   nome: "Thamires Hermida",   texto: "Formada em direito, fiz experiência prática no jurídico do Figueirense e fui contratada pelo clube.",                               ytId: "WpaGKFy-Ls0" },
  { area: "Comunicação",         nome: "Victória Souza",     texto: "Fiz experiência prática no departamento de comunicação do Bahia e fui contratada pelo Botafogo.",                                   ytId: "XX5ml4f0zeM" },
  { area: "Comunicação",         nome: "Pedro Tanure",       texto: "Fiz experiência prática no departamento de comunicação do América-MG.",                                                             ytId: "Saz4bGb-YEM" },
];

const AREAS = ["Análise e Dados","Técnica e Tática","Saúde e Performance","Gestão e Operação","Comunicação"] as const;

const AREA_COR: Record<string, string> = {
  "Análise e Dados":     "#4096F2",
  "Técnica e Tática":    "#818CF8",
  "Saúde e Performance": "#2DD4BF",
  "Gestão e Operação":   "#F59E0B",
  "Comunicação":         "#F472B6",
};

const passos = [
  { num: "01", titulo: "Conclua a parte teórica",   desc: "Termine as aulas online da sua especialização no seu ritmo, com profissionais que atuam no mercado." },
  { num: "02", titulo: "Escolha o clube parceiro",  desc: "Selecione um dos +130 clubes parceiros espalhados pelo Brasil para realizar sua experiência prática." },
  { num: "03", titulo: "Viva dentro de um clube",   desc: "Durante até 15 dias, você atua dentro do departamento da sua área, ao lado de profissionais reais." },
  { num: "04", titulo: "Seja contratado",            desc: "Com o currículo rodando e a experiência comprovada, as portas do mercado se abrem para você." },
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

/* ── VideoCard — thumbnail clicável, abre iframe só ao clicar ───── */
function VideoCard({ ytId, nome, texto, cor }: { ytId: string; nome: string; texto: string; cor: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;

  return (
    <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${cor}35`, background: "#031525", transition: "transform .22s ease, box-shadow .22s ease" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 48px rgba(0,0,0,.35)`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      {/* thumbnail / iframe */}
      <div style={{ position: "relative" as const, aspectRatio: "16/9", background: "#021829", cursor: "pointer" }} onClick={() => setPlaying(true)}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
            title={nome}
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb} alt={nome} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
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
          </>
        )}
      </div>
      {/* rodapé do card */}
      <div style={{ padding: "14px 18px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ width: 4, height: 20, borderRadius: 2, background: cor, flexShrink: 0 }} />
          <p style={{ fontFamily: F, fontSize: "clamp(14px,1.6vw,17px)", color: "#F4F4F4", lineHeight: 1.1 }}>{nome}</p>
        </div>
        <p style={{ fontFamily: M, fontSize: 12.5, fontWeight: 500, color: "rgba(244,244,244,0.5)", lineHeight: 1.55 }}>{texto}</p>
      </div>
    </div>
  );
}

/* ── página ──────────────────────────────────────────────────────── */
export default function ExperienciaPraticaPage() {
  const [areaAtiva, setAreaAtiva] = useState<string>("Análise e Dados");

  const css = `
    .ep-tab { transition: background .18s ease, color .18s ease, border-color .18s ease; }
    .ep-passo { transition: transform .2s ease, box-shadow .2s ease; }
    .ep-passo:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,.25); }
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

          <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)", position: "relative", textAlign: "center" }}>
            <FadeIn>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px 6px 9px", borderRadius: 99, background: "rgba(12,152,252,0.12)", border: "1px solid rgba(12,152,252,0.35)", marginBottom: 28 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#A9D8F5", animation: "breathe 2s ease infinite" }} />
                <span style={{ fontFamily: M, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#A9D8F5" }}>Diferencial exclusivo do Futebol Interativo</span>
              </div>

              <h1 style={{ fontFamily: F, fontSize: "clamp(40px,7vw,80px)", lineHeight: 1.0, color: "#F4F4F4", letterSpacing: "0.01em", marginBottom: 22 }}>
                EXPERIÊNCIA <span style={{ color: "#0C98FC" }}>PRÁTICA</span><br />
                DENTRO DE UM CLUBE
              </h1>

              <p style={{ fontFamily: M, fontSize: "clamp(15px,1.6vw,18px)", fontWeight: 400, lineHeight: 1.7, color: "rgba(244,244,244,0.58)", maxWidth: 580, margin: "0 auto 44px" }}>
                Ao concluir a parte teórica de uma especialização do FI, você tem direito a até{" "}
                <strong style={{ color: "#F4F4F4", fontWeight: 700 }}>15 dias de experiência prática dentro de um clube parceiro</strong>,
                atuando no departamento da sua área.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 12, justifyContent: "center" }}>
                <a href="#como-funciona" style={{ fontFamily: M, fontWeight: 700, fontSize: 14, color: "#fff", display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#059669)", border: "1.5px solid rgba(8,194,122,0.8)", boxShadow: "0 0 36px rgba(8,194,122,0.45)", textDecoration: "none" }}>
                  Como funciona
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <Link href="/cursos" style={{ fontFamily: M, fontWeight: 600, fontSize: 14, color: "rgba(244,244,244,0.65)", display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.2)", textDecoration: "none" }}>
                  Ver formações
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ════════════  STATS  ════════════ */}
        <section style={{ background: "#03263F", padding: "clamp(40px,6vh,60px) 0" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: "clamp(20px,4vw,48px)", textAlign: "center" as const }}>
            {[
              { raw: "+130",   label: "Clubes parceiros" },
              { raw: "+4.500", label: "Alunos enviados" },
              { raw: "15",     label: "Dias de imersão" },
              { raw: "100%",   label: "Garantida" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: F, fontSize: "clamp(32px,5vw,54px)", lineHeight: 0.88, color: "#F4F4F4", letterSpacing: "-0.02em" }}>
                  <Counter raw={s.raw} />
                </div>
                <div style={{ fontFamily: M, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.4)", marginTop: 10 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════  COMO FUNCIONA  ════════════ */}
        <section id="como-funciona" style={{ background: "#03263F", padding: "clamp(72px,10vh,104px) 0" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)" }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "#A9D8F5", marginBottom: 12 }}>Passo a passo</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,52px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 44 }}>COMO FUNCIONA A<br />EXPERIÊNCIA PRÁTICA?</h2>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
              {passos.map((p, i) => (
                <FadeIn key={p.num} delay={i * 80}>
                  <div className="ep-passo" style={{ padding: "28px 24px", borderRadius: 20, border: "1px solid rgba(140,200,245,0.12)", background: "linear-gradient(145deg,rgba(12,90,150,0.22),rgba(3,38,63,0.5))", height: "100%" }}>
                    <div style={{ fontFamily: F, fontSize: 56, lineHeight: 1, color: "rgba(8,194,122,0.2)", marginBottom: 14 }}>{p.num}</div>
                    <div style={{ fontFamily: F, fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.05, color: "#F4F4F4", marginBottom: 10 }}>{p.titulo}</div>
                    <p style={{ fontFamily: M, fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.58)", lineHeight: 1.65 }}>{p.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════  VÍDEO PRINCIPAL  ════════════ */}
        <section style={{ background: "#020C18", padding: "clamp(64px,9vh,96px) 0" }}>
          <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)" }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "#A9D8F5", marginBottom: 12, textAlign: "center" as const }}>Veja como é</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(26px,4.5vw,48px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 32, textAlign: "center" as const }}>A EXPERIÊNCIA NA PRÁTICA</h2>
              <div style={{ borderRadius: 22, overflow: "hidden", aspectRatio: "16/9", background: "#021829", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}>
                <iframe
                  src="https://www.youtube-nocookie.com/embed/892M4EUIp1w?rel=0&modestbranding=1"
                  title="Experiência Prática Futebol Interativo"
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ════════════  MAPA DE CLUBES  ════════════ */}
        <MapaClubes />

        {/* ════════════  DEPOIMENTOS  ════════════ */}
        <section style={{ background: "#020C18", padding: "clamp(72px,10vh,104px) 0" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)" }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "#A9D8F5", marginBottom: 12 }}>Casos de sucesso</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,52px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 36 }}>ALUNOS QUE FIZERAM E<br />FORAM CONTRATADOS</h2>
            </FadeIn>

            {/* Tabs de área */}
            <FadeIn delay={100}>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginBottom: 36 }}>
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
                  <VideoCard ytId={d.ytId} nome={d.nome} texto={d.texto} cor={AREA_COR[d.area]} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════  PRÁTICA INTERNACIONAL  ════════════ */}
        <PraticaInternacional />

        {/* ════════════  CTA FINAL  ════════════ */}
        <section style={{ background: "#03263F", padding: "clamp(72px,10vh,104px) 0" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 clamp(22px,5vw,64px)", textAlign: "center" as const }}>
            <FadeIn>
              <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase" as const, color: "#A9D8F5", marginBottom: 12 }}>Dê o próximo passo</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,5vw,52px)", lineHeight: 1.0, color: "#F4F4F4", marginBottom: 16 }}>QUERO PARTICIPAR DA<br />EXPERIÊNCIA PRÁTICA</h2>
              <p style={{ fontFamily: M, fontSize: 15, fontWeight: 400, color: "rgba(244,244,244,0.55)", lineHeight: 1.75, marginBottom: 36 }}>
                Fale com um consultor do FI e descubra qual especialização é a certa para você começar.
              </p>
              <a
                href="https://api.whatsapp.com/send/?phone=5511942009407&text=Quero+saber+mais+sobre+a+Experi%C3%AAncia+Pr%C3%A1tica+do+Futebol+Interativo"
                target="_blank" rel="noreferrer"
                style={{ fontFamily: M, fontWeight: 700, fontSize: 15, color: "#fff", display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 32px", borderRadius: 14, background: "#25d366", boxShadow: "0 8px 28px rgba(37,211,102,0.4)", textDecoration: "none" }}
              >
                <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Falar com um consultor
              </a>
              <div style={{ marginTop: 16 }}>
                <Link href="/cursos" style={{ fontFamily: M, fontSize: 13, fontWeight: 600, color: "rgba(169,216,245,0.55)", textDecoration: "none" }}>
                  Ver todas as especializações →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}