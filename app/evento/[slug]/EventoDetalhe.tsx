"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Evento } from "@/lib/eventos";
import EventoForm from "./EventoForm";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";
const DARK = "#010E1B";
const NAVY = "#03263F";
const AZUL = "#0C98FC";

/* ─── FadeIn — mesmo padrão usado no resto do site ─────────────────── */
function FI({ children, d = 0, y = 18, className = "" }: { children: React.ReactNode; d?: number; y?: number; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = r.current; if (!el) return;
    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity .65s ${d}ms cubic-bezier(.22,.61,.36,1), transform .65s ${d}ms cubic-bezier(.22,.61,.36,1)`;
    let done = false;
    const reveal = () => { if (done) return; done = true; el.style.opacity = "1"; el.style.transform = "translateY(0)"; setTimeout(() => { el.style.transform = ""; }, 700); };
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) reveal(); }, { threshold: 0, rootMargin: "600px 0px -5% 0px" });
    obs.observe(el);
    const fb = setTimeout(reveal, 900);
    return () => { obs.disconnect(); clearTimeout(fb); };
  }, [d, y]);
  return <div ref={r} className={className}>{children}</div>;
}

/* ─── título com trecho em destaque (**assim**) ────────────────────── */
function TituloComDestaque({ title }: { title: string }) {
  const partes = title.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {partes.map((parte, i) =>
        i % 2 === 1 ? <span key={i} style={{ color: AZUL }}>{parte}</span> : <span key={i}>{parte}</span>
      )}
    </>
  );
}

/* ─── contador — números grandes, sem moldura chamativa; segundos
   entram de propósito pra ficar visivelmente vivo, não só decorativo ── */
function calcularRestante(alvo: number) {
  const diff = alvo - Date.now();
  if (diff <= 0) return null;
  return {
    dias: Math.floor(diff / 86400000),
    horas: Math.floor((diff % 86400000) / 3600000),
    min: Math.floor((diff % 3600000) / 60000),
    seg: Math.floor((diff % 60000) / 1000),
  };
}

function Contador({ iso }: { iso: string }) {
  const alvo = new Date(iso).getTime();
  const valido = !isNaN(alvo);
  // Começa sempre "não montado" — servidor e o primeiro render do cliente
  // ficam idênticos (o placeholder abaixo), sem depender de Date.now().
  // O valor real só é calculado dentro do useEffect, ou seja, só depois que
  // o React já casou o HTML do servidor com o do cliente — a partir daí é
  // só uma atualização normal, que não faz mais parte da hidratação.
  const [mounted, setMounted] = useState(false);
  const [restante, setRestante] = useState<ReturnType<typeof calcularRestante>>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (!valido) return;
    setRestante(calcularRestante(alvo));
    const id = setInterval(() => setRestante(calcularRestante(alvo)), 1000);
    return () => clearInterval(id);
  }, [alvo, valido]);

  if (!valido) return null;

  const unidades = mounted && restante
    ? [{ v: restante.dias, l: "dias" }, { v: restante.horas, l: "horas" }, { v: restante.min, l: "min" }, { v: restante.seg, l: "seg" }]
    : [{ v: null, l: "dias" }, { v: null, l: "horas" }, { v: null, l: "min" }, { v: null, l: "seg" }];

  if (mounted && restante === null) {
    return (
      <div className="inline-flex items-center gap-3 rounded-2xl border px-6 py-3.5" style={{ borderColor: `${AZUL}40`, background: `${AZUL}12` }}>
        <span className="w-2.5 h-2.5 rounded-full animate-blink" style={{ background: AZUL }} />
        <span style={{ fontFamily: F, fontSize: 16, color: "#fff" }}>No ar agora</span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col sm:flex-row items-stretch rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-0 border-b sm:border-b-0 sm:border-r border-white/10" style={{ background: `${AZUL}0D` }}>
        <span className="w-2 h-2 rounded-full animate-blink flex-shrink-0" style={{ background: AZUL }} />
        <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(169,216,245,0.7)" }}>
          Começa em
        </span>
      </div>
      <div className="flex items-stretch justify-center" style={{ fontVariantNumeric: "tabular-nums" }}>
        {unidades.map((u, i) => (
          <div key={u.l} className={`flex flex-col items-center justify-center px-4 sm:px-5 py-3.5 ${i > 0 ? "border-l border-white/10" : ""}`}>
            <span style={{ fontFamily: F, fontSize: 28, color: "#fff", lineHeight: 1 }}>{u.v === null ? "--" : String(u.v).padStart(2, "0")}</span>
            <span style={{ fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(244,244,244,0.35)", marginTop: 5 }}>{u.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── card de palestrante — foto grande e retangular, como um card real
   de palestrante de conferência. Cai pra inicial se a foto não carregar ── */
function PalestranteFoto({ nome, foto }: { nome: string; foto?: string }) {
  const [erro, setErro] = useState(false);
  const mostrarFoto = foto && !erro;
  return (
    <div className="p-[3px] rounded-[24px] flex-shrink-0" style={{ background: `linear-gradient(155deg,${AZUL},${NAVY})` }}>
      <div className="w-[220px] sm:w-[240px] h-[260px] sm:h-[280px] rounded-[21px] overflow-hidden bg-white/[0.03] flex items-center justify-center">
        {mostrarFoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={foto} alt={nome} className="w-full h-full object-cover object-top" onError={() => setErro(true)} />
        ) : (
          <span style={{ fontFamily: F, fontSize: 64, color: `${AZUL}70` }}>{nome.charAt(0)}</span>
        )}
      </div>
    </div>
  );
}

export default function EventoDetalhe({ evento }: { evento: Evento }) {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const fn = () => setSticky(window.scrollY > 480);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* header mínimo */}
      <header style={{ background: DARK }} className="flex items-center justify-center py-6">
        <Link href="/" aria-label="Futebol Interativo">
          <Image src="/images/logo.png" alt="Futebol Interativo" width={110} height={30} style={{ height: 28, width: "auto" }} />
        </Link>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section style={{ background: `linear-gradient(150deg,${DARK} 0%,#021629 50%,${AZUL}14 100%)`, position: "relative", overflow: "hidden" }} className="pt-10 md:pt-12 pb-14 md:pb-16">
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${AZUL}50,transparent)` }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 65% 55% at 50% 20%,${AZUL}22 0%,transparent 65%)`, pointerEvents: "none" }} />

        <div className="max-w-[860px] mx-auto px-6 text-center relative">
          <FI className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-2" style={{ borderColor: `${AZUL}45`, background: `${AZUL}14` }}>
              <span className="w-2 h-2 rounded-full animate-blink" style={{ background: AZUL }} />
              <span style={{ fontFamily: M, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: AZUL }}>{evento.tipo}</span>
            </span>
            <span className="inline-flex items-center rounded-full border border-white/15 px-4 py-2" style={{ fontFamily: M, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(244,244,244,0.6)" }}>
              {evento.dataHoraLabel}
            </span>
            {evento.gratuito && (
              <span className="inline-flex items-center rounded-full border px-4 py-2" style={{ borderColor: "rgba(8,194,122,0.4)", background: "rgba(8,194,122,0.12)", fontFamily: M, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#08C27A" }}>
                Gratuita
              </span>
            )}
          </FI>

          <FI d={70} className="mb-7">
            <h1 style={{ fontFamily: F, fontSize: "clamp(34px,6vw,64px)", lineHeight: 1.06, letterSpacing: "0.005em", color: "#F4F4F4", textTransform: "uppercase" }}>
              <TituloComDestaque title={evento.title} />
            </h1>
          </FI>

          <FI d={130} className="mb-10">
            <p style={{ fontFamily: M, fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.7, color: "rgba(244,244,244,0.55)", maxWidth: 640, margin: "0 auto" }}>
              {evento.subheadline}
            </p>
          </FI>

          <FI d={180} className="mb-12">
            <a
              href="#formulario-padrao-eventos"
              className="inline-flex items-center gap-3 rounded-2xl px-9 py-4.5 transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#08C27A,#059669)", boxShadow: "0 0 44px rgba(8,194,122,0.4)" }}
            >
              <span style={{ fontFamily: M, fontWeight: 700, fontSize: 16, color: "#fff" }}>{evento.ctaText ?? "Garantir minha vaga gratuita"}</span>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </FI>

          <FI d={230}>
            <Contador iso={evento.dataHoraISO} />
          </FI>
        </div>
      </section>

      {/* ══════════ PALESTRANTE(S) ══════════ */}
      {evento.palestrantes.length > 0 && (
        <section style={{ background: NAVY, position: "relative" }} className="py-14 md:py-20">
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(140,200,245,0.18),transparent)" }} />
          <div className="max-w-[860px] mx-auto px-6">
            <FI className="text-center mb-12">
              <p style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(169,216,245,0.5)", marginBottom: 12 }}>Quem vai te ensinar</p>
              <h2 style={{ fontFamily: F, fontSize: "clamp(26px,4vw,40px)", lineHeight: 1.05, color: "#F4F4F4" }}>
                {evento.palestrantes.length > 1 ? "Os professores desta aula" : "O professor desta aula"}
              </h2>
            </FI>

            <div className="flex flex-col gap-6">
              {evento.palestrantes.map((p, i) => (
                <FI key={i} d={i * 80}>
                  <div
                    className="flex flex-col sm:flex-row items-center gap-8 rounded-[28px] border p-8 sm:p-10"
                    style={{ borderColor: `${AZUL}30`, background: `linear-gradient(155deg,${AZUL}14,rgba(255,255,255,0.02))` }}
                  >
                    <PalestranteFoto nome={p.nome} foto={p.foto} />
                    <div className="text-center sm:text-left">
                      <p style={{ fontFamily: M, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: `${AZUL}99`, marginBottom: 10 }}>Palestrante</p>
                      <p style={{ fontFamily: F, fontSize: "clamp(24px,3vw,32px)", color: "#F4F4F4", lineHeight: 1.1, marginBottom: 10 }}>{p.nome}</p>
                      <p style={{ fontFamily: M, fontSize: 15.5, fontWeight: 600, color: AZUL, lineHeight: 1.4 }}>{p.cargo}</p>
                    </div>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════ O QUE VOCÊ VAI APRENDER ══════════ */}
      <section style={{ background: DARK, position: "relative" }} className="py-14 md:py-20">
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(140,200,245,0.18),transparent)" }} />
        <div className="max-w-[720px] mx-auto px-6">
          <FI className="text-center mb-12">
            <p style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(169,216,245,0.5)", marginBottom: 12 }}>Conteúdo da aula</p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(26px,4vw,40px)", lineHeight: 1.05, color: "#F4F4F4" }}>O que você vai aprender</h2>
          </FI>

          <div className="flex flex-col gap-3">
            {evento.bullets.map((b, i) => (
              <FI key={i} d={i * 60}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-5">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5" style={{ background: `${AZUL}1E`, border: `1.5px solid ${AZUL}50` }}>
                    <svg width={13} height={13} viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke={AZUL} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <p style={{ fontFamily: M, fontSize: 16, fontWeight: 500, color: "rgba(244,244,244,0.85)", lineHeight: 1.6 }}>{b}</p>
                </div>
              </FI>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ INSCRIÇÃO ══════════ */}
      <section id="oferta" style={{ background: NAVY }} className="py-14 md:py-20">
        <div className="max-w-[560px] mx-auto px-6">
          <FI className="text-center mb-10">
            <p style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(169,216,245,0.5)", marginBottom: 12 }}>Inscrição gratuita</p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(26px,4vw,40px)", lineHeight: 1.05, color: "#F4F4F4", marginBottom: 14 }}>Garanta sua vaga</h2>
            <p style={{ fontFamily: M, fontSize: 15.5, color: "rgba(244,244,244,0.5)", lineHeight: 1.6 }}>Vagas limitadas. Preencha seus dados e receba o link de acesso por e-mail e WhatsApp.</p>
          </FI>

          <FI d={80}>
            <div
              className="rounded-[28px] border p-7 sm:p-9"
              style={{ borderColor: "rgba(64,150,242,0.2)", background: "linear-gradient(160deg,#0F2744 0%,#0A1E35 100%)", boxShadow: "0 32px 64px -24px rgba(0,10,30,0.6)" }}
            >
              <EventoForm evento={evento} />
            </div>
          </FI>
        </div>
      </section>

      {/* rodapé mínimo */}
      <footer style={{ background: DARK }} className="border-t border-white/[0.06] py-7 text-center">
        <p style={{ fontFamily: M, fontSize: 11.5, color: "rgba(244,244,244,0.3)" }}>© 2026 Futebol Interativo</p>
      </footer>

      {/* sticky CTA mobile */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 sm:hidden px-5 pt-3 border-t border-white/[0.08] bg-black/90 backdrop-blur-xl shadow-[0_-8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 ${sticky ? "translate-y-0" : "translate-y-full"}`}
        style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      >
        <a
          href="#formulario-padrao-eventos"
          className="flex items-center justify-center gap-2.5 rounded-xl px-5 py-3.5"
          style={{ background: "linear-gradient(135deg,#08C27A,#059669)", fontFamily: M, fontWeight: 700, fontSize: 14, color: "#fff" }}
        >
          {evento.ctaText ?? "Garantir minha vaga gratuita"}
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </>
  );
}