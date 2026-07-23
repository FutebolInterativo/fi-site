"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CineClubeSessao } from "@/lib/cineclube";
import { getMapsUrl, getMapsEmbedUrl } from "@/lib/cineclube";
import CineClubeForm from "./CineClubeForm";

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
    const reveal = () => { if (done) return; done = true; el.style.opacity = "1"; el.style.transform = "translateY(0)"; };
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) reveal(); }, { threshold: 0, rootMargin: "600px 0px -5% 0px" });
    obs.observe(el);
    const fb = setTimeout(reveal, 900);
    return () => { obs.disconnect(); clearTimeout(fb); };
  }, [d, y]);
  return <div ref={r} className={className}>{children}</div>;
}

/* ─── texto com trecho em destaque (**assim**) ─────────────────────── */
function TextoComDestaque({ texto }: { texto: string }) {
  const partes = texto.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {partes.map((parte, i) =>
        i % 2 === 1 ? <span key={i} style={{ color: AZUL }}>{parte}</span> : <span key={i}>{parte}</span>
      )}
    </>
  );
}

/* ─── contador — mesmo cuidado com hidratação do EventoDetalhe ──────── */
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

  if (mounted && restante === null) {
    return (
      <div className="w-full sm:w-auto inline-flex items-center gap-3 rounded-2xl border px-8 py-5" style={{ borderColor: `${AZUL}40`, background: `${AZUL}12` }}>
        <span className="w-2.5 h-2.5 rounded-full animate-blink" style={{ background: AZUL }} />
        <span style={{ fontFamily: F, fontSize: 17, color: "#fff" }}>NO AR AGORA</span>
      </div>
    );
  }

  const unidades = mounted && restante
    ? [{ v: restante.dias, l: "dias" }, { v: restante.horas, l: "horas" }, { v: restante.min, l: "min" }, { v: restante.seg, l: "seg" }]
    : [{ v: null, l: "dias" }, { v: null, l: "horas" }, { v: null, l: "min" }, { v: null, l: "seg" }];

  return (
    <div className="w-full sm:w-auto sm:inline-flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] px-8 sm:px-14 py-6 sm:py-8">
      <span style={{ fontFamily: M, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(169,216,245,0.65)", marginBottom: 18 }}>
        Começa em
      </span>
      <div className="flex items-stretch w-full sm:w-auto justify-between sm:justify-start" style={{ fontVariantNumeric: "tabular-nums" }}>
        {unidades.map((u, i) => (
          <div key={u.l} className={`flex flex-col items-center justify-center px-4 sm:px-8 transition-colors hover:bg-white/[0.04] rounded-lg ${i > 0 ? "border-l border-white/10" : ""}`}>
            <span style={{ fontFamily: F, fontSize: 44, color: "#fff", lineHeight: 1 }}>{u.v === null ? "--" : String(u.v).padStart(2, "0")}</span>
            <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(244,244,244,0.4)", marginTop: 8 }}>{u.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const IconCalendar = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2.5" stroke={AZUL} strokeWidth="1.8" /><path d="M8 3v4M16 3v4M3 10h18" stroke={AZUL} strokeWidth="1.8" strokeLinecap="round" /></svg>
);
const IconPin = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" stroke={AZUL} strokeWidth="1.8" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.5" stroke={AZUL} strokeWidth="1.8" /></svg>
);
const IconUsers = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.2" stroke={AZUL} strokeWidth="1.8" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" stroke={AZUL} strokeWidth="1.8" strokeLinecap="round" /><path d="M16 9a3 3 0 100-6M18 20c0-2.8-1.7-4.9-4-5.6" stroke={AZUL} strokeWidth="1.8" strokeLinecap="round" /></svg>
);

export default function CineClubeDetalhe({ sessao }: { sessao: CineClubeSessao }) {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const fn = () => setSticky(window.scrollY > 420);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* header mínimo */}
      <header style={{ background: DARK }} className="flex items-center justify-center py-8">
        <Link href="/" aria-label="Futebol Interativo">
          <Image src="/images/logo.png" alt="Futebol Interativo" width={110} height={30} style={{ height: 28, width: "auto" }} />
        </Link>
      </header>

      {/* ══════════ ABERTURA — identidade do Cine Clube (série, não a sessão) ══════════ */}
      <section style={{ background: `linear-gradient(150deg,${DARK} 0%,#021629 50%,${AZUL}14 100%)`, position: "relative", overflow: "hidden" }} className="pt-12 md:pt-16 pb-16 md:pb-20">
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 65% 55% at 50% 20%,${AZUL}22 0%,transparent 65%)`, pointerEvents: "none" }} />

        <div className="max-w-[1100px] mx-auto px-6 text-center relative">
          <FI className="mb-7">
            <span className="inline-flex items-center px-4 py-2 rounded-lg" style={{ background: AZUL, color: "#fff", fontFamily: F, fontSize: 14, letterSpacing: "0.04em" }}>
              CINECLUBE
            </span>
          </FI>

          <FI d={40} className="flex items-center justify-center gap-4 mb-6">
            <span style={{ width: 32, height: 2, background: `${AZUL}60` }} />
            <span style={{ fontFamily: M, fontSize: 13, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: AZUL }}>Futebol Interativo apresenta</span>
            <span style={{ width: 32, height: 2, background: `${AZUL}60` }} />
          </FI>

          <FI d={80} className="mb-3">
            <h1 style={{ fontFamily: F, fontSize: "clamp(46px,9vw,110px)", lineHeight: 0.95, color: "#F4F4F4", letterSpacing: "0.01em" }}>
              CINE CLUBE
            </h1>
          </FI>

          <FI d={110} className="mb-8">
            <p style={{ fontFamily: F, fontSize: "clamp(26px,5vw,52px)", lineHeight: 1, color: AZUL, letterSpacing: "0.01em" }}>
              FUTEBOL INTERATIVO
            </p>
          </FI>

          <FI d={150} className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {sessao.tipoSessao.includes("+") ? (
              sessao.tipoSessao.split("+").map((parte, i, arr) => (
                <span key={i} className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center px-4 py-2 rounded-lg"
                    style={i === 0
                      ? { background: AZUL, color: "#fff", fontFamily: M, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }
                      : { border: `1.5px solid ${AZUL}70`, color: AZUL, fontFamily: M, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}
                  >
                    {parte.trim()}
                  </span>
                  {i < arr.length - 1 && <span style={{ fontFamily: M, fontSize: 15, fontWeight: 700, color: "rgba(244,244,244,0.4)" }}>+</span>}
                </span>
              ))
            ) : (
              <span className="inline-flex items-center px-4 py-2 rounded-lg" style={{ background: AZUL, color: "#fff", fontFamily: M, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {sessao.tipoSessao}
              </span>
            )}
          </FI>

          <FI d={190} className="mb-10">
            <p style={{ fontFamily: M, fontSize: "clamp(16px,1.9vw,19px)", lineHeight: 1.75, color: "rgba(244,244,244,0.72)", maxWidth: 680, margin: "0 auto" }}>
              Um espaço novo e fixo do FI. Toda semana, uma sessão sobre o que realmente move o futebol por dentro: política, dinheiro e bastidor. O formato muda a cada edição. Às vezes é exibição seguida de roda de conversa, às vezes é uma live com convidado. Presencial ou online, dependendo da semana.
            </p>
          </FI>

          <FI d={230}>
            <a
              href="#inscricao"
              className="inline-flex items-center gap-3 rounded-2xl px-9 py-4.5 transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#08C27A,#059669)", boxShadow: "0 0 44px rgba(8,194,122,0.4)" }}
            >
              <span style={{ fontFamily: M, fontWeight: 700, fontSize: 16, color: "#fff" }}>Garantir minha vaga na Sessão {sessao.numero}</span>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </FI>
        </div>
      </section>

      {/* ══════════ SESSÃO — bloco específico dessa edição ══════════ */}
      <section id="sessao" style={{ background: NAVY }} className="py-14 md:py-20">
        <div className="max-w-[900px] mx-auto px-6">
          <FI className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full mb-3" style={{ background: AZUL, color: "#fff", fontFamily: M, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.08em" }}>
              SESSÃO {sessao.numero}
            </span>
            <p style={{ fontFamily: M, fontSize: 13.5, fontWeight: 600, color: "rgba(169,216,245,0.7)", letterSpacing: "0.02em" }}>
              {sessao.formato} · {sessao.tipoSessao}
            </p>
          </FI>

          <FI d={60} className="mb-6">
            <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4vw,42px)", lineHeight: 1.12, color: "#F4F4F4", textTransform: "uppercase" }}>
              <TextoComDestaque texto={sessao.tema} />
            </h2>
          </FI>

          <FI d={110} className="mb-10">
            <p style={{ fontFamily: M, fontSize: 17, lineHeight: 1.75, color: "rgba(244,244,244,0.72)" }}>
              {sessao.descricaoCurta}
            </p>
          </FI>

          <FI d={160}>
            <div className="flex flex-col gap-3 mb-10">
              <div className="flex items-start gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.16] hover:bg-white/[0.04]">
                <IconCalendar />
                <span style={{ fontFamily: M, fontSize: 16, color: "rgba(244,244,244,0.88)", fontWeight: 600 }}>{sessao.dataHoraLabel}</span>
              </div>

              {sessao.formato === "Presencial" && sessao.local ? (
                <>
                  <a
                    href={getMapsUrl(sessao.local)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-[#0C98FC]/40 hover:bg-white/[0.04]"
                  >
                    <IconPin />
                    <span style={{ fontFamily: M, fontSize: 16, color: "rgba(244,244,244,0.88)", lineHeight: 1.55 }}>
                      {sessao.local}{" "}
                      <span style={{ color: AZUL, fontWeight: 700, textDecoration: "underline" }}>Ver no mapa →</span>
                    </span>
                  </a>
                  <div className="rounded-xl overflow-hidden border border-white/[0.08]" style={{ aspectRatio: "16/9" }}>
                    <iframe
                      src={getMapsEmbedUrl(sessao.local)}
                      title={`Mapa: ${sessao.local}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "grayscale(0.3) invert(0.92) contrast(0.9)" }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-start gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <IconPin />
                  <span style={{ fontFamily: M, fontSize: 16, color: "rgba(244,244,244,0.88)" }}>Online. O link de acesso chega por email e WhatsApp antes da sessão.</span>
                </div>
              )}

              {sessao.vagas && (
                <div className="flex items-start gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.16] hover:bg-white/[0.04]">
                  <IconUsers />
                  <span style={{ fontFamily: M, fontSize: 16, color: "rgba(244,244,244,0.88)" }}>Capacidade do espaço: até {sessao.vagas} pessoas</span>
                </div>
              )}
            </div>
          </FI>

          {sessao.convidado && (
            <FI d={200} className="mb-10">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/20 hover:-translate-y-0.5">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white/5 flex items-center justify-center flex-shrink-0">
                  {sessao.convidado.foto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={sessao.convidado.foto} alt={sessao.convidado.nome} className="w-full h-full object-cover object-top" />
                  ) : (
                    <span style={{ fontFamily: F, fontSize: 22, color: AZUL }}>{sessao.convidado.nome.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <p style={{ fontFamily: M, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: `${AZUL}99`, marginBottom: 5 }}>Convidado</p>
                  <p style={{ fontFamily: F, fontSize: 18, color: "#F4F4F4", lineHeight: 1.1 }}>{sessao.convidado.nome}</p>
                  <p style={{ fontFamily: M, fontSize: 13.5, fontWeight: 600, color: AZUL }}>{sessao.convidado.cargo}</p>
                </div>
              </div>
            </FI>
          )}

          <FI d={230}>
            <Contador iso={sessao.dataHoraISO} />
          </FI>
        </div>
      </section>

      {/* ══════════ INSCRIÇÃO — seção própria, separada da sessão ══════════ */}
      <section id="inscricao" style={{ background: DARK }} className="py-14 md:py-20">
        <div className="max-w-[680px] mx-auto px-6">
          <FI className="text-center mb-8">
            <p style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#08C27A", marginBottom: 10 }}>Inscrição gratuita</p>
            <h2 style={{ fontFamily: F, fontSize: "clamp(26px,3.6vw,34px)", color: "#F4F4F4", textTransform: "uppercase" }}>Garanta seu lugar</h2>
          </FI>
          <FI d={80}>
            <div
              className="rounded-[28px] border p-8 sm:p-10"
              style={{ borderColor: "rgba(64,150,242,0.2)", background: "linear-gradient(160deg,#0F2744 0%,#0A1E35 100%)", boxShadow: "0 32px 64px -24px rgba(0,10,30,0.6)" }}
            >
              <CineClubeForm sessao={sessao} />
            </div>
          </FI>
        </div>
      </section>

      {/* rodapé — com a logo, igual ao cabeçalho */}
      <footer style={{ background: DARK }} className="border-t border-white/[0.06] py-10 text-center">
        <Link href="/" aria-label="Futebol Interativo" className="inline-block mb-4">
          <Image src="/images/logo.png" alt="Futebol Interativo" width={90} height={24} style={{ height: 22, width: "auto", opacity: 0.6, margin: "0 auto" }} />
        </Link>
        <p style={{ fontFamily: M, fontSize: 11.5, color: "rgba(244,244,244,0.3)" }}>© 2026 Futebol Interativo</p>
      </footer>

      {/* sticky CTA mobile */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden px-5 pt-3 border-t border-white/[0.08] bg-black/90 backdrop-blur-xl shadow-[0_-8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 ${sticky ? "translate-y-0" : "translate-y-full"}`}
        style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      >
        <a
          href="#inscricao"
          className="flex items-center justify-center gap-2.5 rounded-xl px-5 py-3.5"
          style={{ background: "linear-gradient(135deg,#08C27A,#059669)", fontFamily: M, fontWeight: 700, fontSize: 14, color: "#fff" }}
        >
          Garantir minha vaga
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </>
  );
}