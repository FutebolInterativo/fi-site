"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const STATS = [
  { v: "+25 mil", l: "Alunos formados" },
  { v: "+130",    l: "Clubes parceiros" },
  { v: "34",      l: "Formações ativas" },
  { v: "2018",    l: "Fundação" },
];

const TIMELINE = [
  { year: "2018", title: "Fundação", desc: "O Futebol Interativo nasce dentro da UFRN com o objetivo de formar profissionais para o mercado do futebol brasileiro.", color: "#3B82F6" },
  { year: "2019", title: "Primeiras turmas", desc: "Lançamento das primeiras especializações presenciais. Mais de 300 alunos formados no primeiro ano.", color: "#818CF8" },
  { year: "2020", title: "Expansão digital", desc: "Transição para o modelo 100% online, ampliando o acesso a alunos de todo o Brasil.", color: "#F59E0B" },
  { year: "2021", title: "Rede de parceiros", desc: "Mais de 50 clubes parceiros integrados. O programa de experiências práticas se consolida como diferencial único.", color: "#4096F2" },
  { year: "2023", title: "+130 clubes", desc: "A rede de parceiros ultrapassa 130 clubes em todo o Brasil. Mais de 15.000 alunos formados.", color: "#3B82F6" },
  {
    year: "2026", title: "Alcance internacional", color: "#08C27A", featured: true,
    desc: "Mais de 25.000 alunos formados e 34 formações ativas na maior rede de clubes parceiros do Brasil. E a Experiência Prática já cruza fronteiras: alunos vivem imersões em clubes europeus parceiros, como o SC Braga (Portugal) e o Girona FC (Espanha).",
    images: [
      { src: "/images/ppi/braga-bastidores.jpg", alt: "Bastidores do SC Braga, clube parceiro em Portugal" },
      { src: "/images/ppi/girona-torcida.webp",   alt: "Torcida do Girona FC, clube parceiro na Espanha" },
    ],
  },
];

const VALUES = [
  {
    title: "Educação de verdade",
    desc: "Conteúdo criado por profissionais que estão no mercado, não em salas de aula. Prático, direto e aplicável.",
    color: "#3B82F6",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    title: "Prática garantida",
    desc: "Todo aluno das especializações tem uma experiência prática dentro de um clube profissional. Isso é diferencial.",
    color: "#4096F2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4096F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
      </svg>
    ),
  },
  {
    title: "Comunidade",
    desc: "Uma rede de mais de 25 mil profissionais que compartilham a mesma paixão e os mesmos objetivos.",
    color: "#818CF8",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Crescimento contínuo",
    desc: "Atualizamos nossos conteúdos constantemente para acompanhar a velocidade do mercado do futebol.",
    color: "#F59E0B",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

/* ── FadeIn — revelação suave ao rolar a página ─────────────────── */
function FadeIn({ children, delay = 0, y = 18 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    Object.assign(el.style, { opacity: "0", transform: `translateY(${y}px)`, transition: `opacity .6s ${delay}ms ease, transform .6s ${delay}ms ease` });
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, y]);
  return <div ref={ref}>{children}</div>;
}

export default function SobreClient() {
  return (
    <main style={{ background: "#03263F", minHeight: "100vh" }}>

      {/* ════════════ HERO — com foto de fundo ════════════ */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: 120, paddingBottom: 80, borderBottom: "1px solid rgba(140,200,245,0.1)" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/images/site/hero-desktop.webp" alt="" fill priority style={{ objectFit: "cover", objectPosition: "center 35%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg, rgba(3,38,63,0.97) 0%, rgba(3,38,63,0.92) 40%, rgba(3,38,63,0.78) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 55% at 85% 15%, rgba(12,152,252,0.18) 0%, transparent 65%)" }} />
        </div>

        <div className="max-w-6xl mx-auto px-6" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A9D8F5", display: "inline-block", marginBottom: 20, padding: "6px 14px", borderRadius: 40, border: "1px solid rgba(140,200,245,0.2)", background: "rgba(140,200,245,0.06)" }}>
                Sobre o FI
              </span>
              <h1 style={{ fontFamily: F, fontSize: "clamp(36px,5vw,62px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 24 }}>
                A ESCOLA QUE TE LEVA PARA DENTRO DO CLUBE.
              </h1>
              <p style={{ fontFamily: M, fontSize: 16, fontWeight: 500, lineHeight: 1.75, color: "rgba(244,244,244,0.7)", marginBottom: 36, maxWidth: 500 }}>
                Fundada em 2018 e incubada pela UFRN, o Futebol Interativo nasceu com uma missão clara: formar profissionais completos para o mercado do futebol, com educação de qualidade e prática garantida.
              </p>
              <Link href="/cursos" style={{ fontFamily: M, fontWeight: 700, fontSize: 15, color: "#fff", display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 24px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#05A567)", border: "1.4px solid rgba(8,194,122,0.9)", boxShadow: "0 0 24px rgba(8,194,122,0.4)", textDecoration: "none" }}>
                Ver formações →
              </Link>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={120}>
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <div key={s.v} style={{ borderRadius: 16, border: "1px solid rgba(140,200,245,0.16)", background: "rgba(3,38,63,0.55)", backdropFilter: "blur(8px)", padding: "28px 24px" }}>
                    <div style={{ fontFamily: F, fontSize: 34, lineHeight: 1, color: "#F4F4F4", marginBottom: 8 }}>
                      {s.v}
                    </div>
                    <div style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A9D8F5" }}>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════ MISSÃO ════════════ */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid rgba(140,200,245,0.1)", background: "#04395f" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A9D8F5", display: "block", marginBottom: 12 }}>
                Nossa missão
              </span>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,48px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 20 }}>
                DEMOCRATIZAR O ACESSO À CARREIRA NO FUTEBOL.
              </h2>
              <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, lineHeight: 1.75, color: "rgba(244,244,244,0.7)", marginBottom: 16 }}>
                Sempre acreditamos que o futebol brasileiro precisa de mais profissionais qualificados em todas as suas áreas — não só em campo. Nosso trabalho é conectar apaixonados com o mercado, com método e com prática real.
              </p>
              <p style={{ fontFamily: M, fontSize: 15, fontWeight: 500, lineHeight: 1.75, color: "rgba(244,244,244,0.7)" }}>
                A experiência prática dentro de um clube não é bônus. É parte do currículo. É o que diferencia o nosso aluno no mercado.
              </p>
            </FadeIn>

            {/* O que a garantia inclui, na prática */}
            <FadeIn delay={100}>
              <div style={{ borderRadius: 20, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(3,38,63,0.6)", padding: "32px clamp(24px,3vw,36px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                  <span style={{ fontFamily: F, fontSize: 40, lineHeight: 1, color: "#08C27A" }}>100%</span>
                  <span style={{ fontFamily: M, fontSize: 12.5, fontWeight: 700, color: "rgba(244,244,244,0.6)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    Prática garantida
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    "Experiência prática dentro de um clube profissional parceiro",
                    "Você escolhe entre até 3 opções de clube na sua região ou área",
                    "Mentoria de quem já trabalha no dia a dia do mercado",
                    "Certificado de conclusão reconhecido pelo mercado do futebol",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(8,194,122,0.16)", border: "1.5px solid rgba(8,194,122,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <svg width={11} height={11} viewBox="0 0 20 20" fill="none">
                          <path d="M4 10l4 4 8-8" stroke="#08C27A" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p style={{ fontFamily: M, fontSize: 14, fontWeight: 500, color: "rgba(244,244,244,0.92)", lineHeight: 1.5 }}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════ TIMELINE ════════════ */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid rgba(140,200,245,0.1)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A9D8F5", display: "block", marginBottom: 12 }}>
                Nossa história
              </span>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,48px)", lineHeight: 0.95, color: "#F4F4F4" }}>
                DO CAMPUS UNIVERSITÁRIO AO MUNDO.
              </h2>
            </div>
          </FadeIn>

          <div style={{ position: "relative" }}>
            {/* Linha vertical */}
            <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 1, background: "rgba(140,200,245,0.15)" }} className="lg:hidden" />

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {TIMELINE.map((item, i) => (
                <FadeIn key={item.year} delay={i * 40}>
                  <div style={{ position: "relative", display: "flex", gap: 24, paddingBottom: 40, paddingLeft: 52 }} className="lg:pl-0">
                    {/* Dot mobile */}
                    <div style={{ position: "absolute", left: 13, top: 4, width: 14, height: 14, borderRadius: "50%", background: item.color, border: "2px solid #03263F", zIndex: 1 }} className="lg:hidden" />

                    {item.featured ? (
                      /* Card em destaque — 2026, com fotos dos clubes parceiros europeus */
                      <div style={{ borderRadius: 20, border: `1.5px solid ${item.color}55`, background: `linear-gradient(150deg, ${item.color}1C, rgba(3,38,63,0.5))`, overflow: "hidden", flex: 1 }}>
                        <div className="grid sm:grid-cols-2" style={{ gap: 3, padding: 12 }}>
                          {item.images!.map((img) => (
                            <div key={img.src} style={{ position: "relative", aspectRatio: "4/3", borderRadius: 14, overflow: "hidden" }}>
                              <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} />
                            </div>
                          ))}
                        </div>
                        <div style={{ padding: "8px 24px 26px" }}>
                          <span style={{ fontFamily: M, fontSize: 12, fontWeight: 700, color: item.color, background: `${item.color}18`, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 10 }}>
                            {item.year} · Exclusivo Futebol Interativo
                          </span>
                          <div style={{ fontFamily: F, fontSize: "clamp(20px,2.4vw,26px)", lineHeight: 1.05, color: "#F4F4F4", marginBottom: 10 }}>
                            {item.title}
                          </div>
                          <p style={{ fontFamily: M, fontSize: 14.5, fontWeight: 500, lineHeight: 1.7, color: "rgba(244,244,244,0.72)", maxWidth: 640 }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div style={{ borderRadius: 16, border: "1px solid rgba(140,200,245,0.12)", background: "rgba(12,90,150,0.15)", padding: "20px 24px", flex: 1 }}>
                        <span style={{ fontFamily: M, fontSize: 12, fontWeight: 700, color: item.color, background: `${item.color}18`, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 10 }}>
                          {item.year}
                        </span>
                        <div style={{ fontFamily: F, fontSize: 20, lineHeight: 1, color: "#F4F4F4", marginBottom: 8 }}>
                          {item.title}
                        </div>
                        <p style={{ fontFamily: M, fontSize: 14, fontWeight: 500, lineHeight: 1.7, color: "rgba(244,244,244,0.65)" }}>
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ VALORES ════════════ */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid rgba(140,200,245,0.1)", background: "#04395f" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A9D8F5", display: "block", marginBottom: 12 }}>
                O que nos guia
              </span>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,48px)", lineHeight: 0.95, color: "#F4F4F4" }}>
                PRINCÍPIOS QUE DEFINEM CADA DECISÃO.
              </h2>
            </div>
          </FadeIn>

          {/* Banner da equipe */}
          <FadeIn delay={80}>
            <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(140,200,245,0.14)", background: "linear-gradient(135deg,#0A1E35,#03263F)", marginBottom: 32 }}>
              <div className="grid lg:grid-cols-2" style={{ alignItems: "center" }}>
                <div style={{ padding: "36px clamp(24px,4vw,48px)" }}>
                  <span style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#A9D8F5", display: "block", marginBottom: 12 }}>
                    Quem faz acontecer
                  </span>
                  <h3 style={{ fontFamily: F, fontSize: "clamp(22px,3vw,32px)", lineHeight: 1.05, color: "#F4F4F4", marginBottom: 14 }}>
                    PESSOAS REAIS. RESULTADOS REAIS.
                  </h3>
                  <p style={{ fontFamily: M, fontSize: 14.5, fontWeight: 500, lineHeight: 1.7, color: "rgba(244,244,244,0.65)", maxWidth: 420 }}>
                    Um time que atuou e ainda atua dentro de clubes como Atlético-MG, Fluminense, Botafogo, Palmeiras e Santos — e leva essa vivência real pra sala de aula.
                  </p>
                </div>
                <div style={{ position: "relative", aspectRatio: "16/10", minHeight: 220 }}>
                  <Image src="/images/site/mentores-time.webp" alt="Time de mentores do Futebol Interativo" fill style={{ objectFit: "contain", objectPosition: "bottom center" }} />
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 60}>
                <div style={{ borderRadius: 16, border: "1px solid rgba(140,200,245,0.14)", background: "rgba(3,38,63,0.5)", padding: "28px" }}>
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{v.icon}</div>
                  <div style={{ fontFamily: F, fontSize: 22, lineHeight: 1, color: "#F4F4F4", marginBottom: 10 }}>
                    {v.title}
                  </div>
                  <p style={{ fontFamily: M, fontSize: 14, fontWeight: 500, lineHeight: 1.7, color: "rgba(244,244,244,0.65)" }}>
                    {v.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section style={{ padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div style={{ borderRadius: 24, border: "1px solid rgba(12,152,252,0.2)", background: "linear-gradient(135deg,rgba(0,75,156,0.2),rgba(0,123,255,0.06) 50%,transparent)", padding: "64px 48px", textAlign: "center" }}>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,48px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 16 }}>
                PRONTO PARA ENTRAR EM CAMPO?
              </h2>
              <p style={{ fontFamily: M, fontSize: 16, fontWeight: 500, lineHeight: 1.7, color: "rgba(244,244,244,0.65)", marginBottom: 36, maxWidth: 440, margin: "0 auto 36px" }}>
                Explore as formações e encontre a área certa para construir sua carreira no futebol.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                <Link href="/cursos" style={{ fontFamily: M, fontWeight: 700, fontSize: 15, color: "#fff", display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 28px", borderRadius: 14, background: "linear-gradient(135deg,#08C27A,#05A567)", border: "1.4px solid rgba(8,194,122,0.9)", textDecoration: "none" }}>
                  Ver todas as formações →
                </Link>
                <a href="https://api.whatsapp.com/send/?phone=5511942009407" target="_blank" rel="noreferrer" style={{ fontFamily: M, fontWeight: 700, fontSize: 15, color: "rgba(244,244,244,0.75)", display: "inline-flex", alignItems: "center", gap: 12, padding: "14px 28px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.2)", textDecoration: "none" }}>
                  Falar com consultor
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}