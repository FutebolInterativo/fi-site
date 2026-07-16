"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const HS_PORTAL_ID = "46152446";
const HS_FORM_ID = "4c05c80e-1ca2-4440-bbae-8f7378bf5275";
const HS_SCRIPT_SRC = `https://js.hsforms.net/forms/embed/${HS_PORTAL_ID}.js`;

let hsScriptPromise: Promise<void> | null = null;

// Carrega o script do HubSpot uma única vez (compartilhado entre instâncias)
function loadHubspotScript(): Promise<void> {
  if (hsScriptPromise) return hsScriptPromise;
  hsScriptPromise = new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${HS_SCRIPT_SRC}"]`);
    if (existing) {
      if ((existing as any)._hsLoaded) resolve();
      else existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = HS_SCRIPT_SRC;
    script.defer = true;
    script.addEventListener("load", () => { (script as any)._hsLoaded = true; resolve(); });
    document.body.appendChild(script);
  });
  return hsScriptPromise;
}

// Preconecta cedo com os domínios do HubSpot para reduzir a latência do handshake
function preconnectHubspot() {
  const hosts = ["https://js.hsforms.net", "https://forms.hsforms.com", "https://forms.hubspot.com"];
  hosts.forEach((href) => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    link.crossOrigin = "";
    document.head.appendChild(link);
  });
}

// UTMs fixas deste CTA — atribuem o lead a este botão específico,
// independente de como o visitante chegou até a página.
const UTM_PARAMS: Record<string, string> = {
  utm_source: "site-fi",
  utm_medium: "institucional",
  utm_campaign: "site-institucional-falar-com-um-consultor",
  utm_content: "botao-wa-final-lp",
};

function urlWithUtms(href: string): string {
  const url = new URL(href);
  Object.entries(UTM_PARAMS).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}

/* ── Modal com formulário HubSpot ─────────────────────────────────── */
function FormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const formHostRef = useRef<HTMLDivElement>(null);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [formReady, setFormReady] = useState(false);

  // Preconecta e carrega o script do HubSpot assim que a página monta
  useEffect(() => {
    preconnectHubspot();
    loadHubspotScript();
  }, []);

  // A cada abertura: a URL já foi atualizada com as UTMs (ver openModal),
  // então remontamos o host do formulário para que o HubSpot capture o
  // contexto correto e pré-preencha os campos ocultos utm_*.
  useEffect(() => {
    if (!open) return;
    setHasOpenedOnce(true);
    setFormReady(false);
    loadHubspotScript();
  }, [open]);

  // Detecta quando o iframe do formulário foi injetado dentro do host
  useEffect(() => {
    if (!open) return;
    const host = formHostRef.current;
    if (!host) return;
    if (host.querySelector("iframe")) { setFormReady(true); return; }
    const obs = new MutationObserver(() => {
      if (host.querySelector("iframe")) { setFormReady(true); obs.disconnect(); }
    });
    obs.observe(host, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [open]);

  // Fecha com ESC + trava scroll do body enquanto o modal está aberto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(1,14,27,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity .2s ease",
        visibility: hasOpenedOnce ? "visible" : "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%", maxWidth: 480,
          maxHeight: "90vh", overflowY: "auto",
          background: "linear-gradient(160deg,#0F2744 0%,#0A1E35 100%)",
          border: "1px solid rgba(64,150,242,0.2)",
          borderRadius: 24,
          boxShadow: "0 32px 64px -24px rgba(0,10,30,0.7)",
          padding: "clamp(24px,4vw,40px)",
          transform: open ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)",
          transition: "transform .25s cubic-bezier(.22,.61,.36,1)",
        }}
      >
        {/* fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          style={{
            position: "absolute", top: 16, right: 16,
            width: 34, height: 34, borderRadius: 10,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="#F4F4F4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <p style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(169,216,245,0.5)", marginBottom: 10 }}>
          Sem compromisso
        </p>
        <h3 style={{ fontFamily: F, fontSize: "clamp(20px,3vw,28px)", color: "#F4F4F4", lineHeight: 1.05, marginBottom: 8 }}>
          FALE COM UM CONSULTOR
        </h3>
        <p style={{ fontFamily: M, fontSize: 13.5, color: "rgba(169,216,245,0.4)", lineHeight: 1.6, marginBottom: 24 }}>
          Preencha seus dados e retornaremos o quanto antes.
        </p>

        <div style={{ position: "relative", minHeight: formReady ? 0 : 220 }}>
          {/* spinner enquanto o iframe não chegou */}
          {!formReady && (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: 14 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                border: "3px solid rgba(169,216,245,0.18)",
                borderTopColor: "#0C98FC",
                animation: "hsSpin .8s linear infinite",
              }} />
              <span style={{ fontFamily: M, fontSize: 11.5, fontWeight: 600, color: "rgba(169,216,245,0.4)" }}>Carregando formulário…</span>
            </div>
          )}
          {/* montado só quando aberto: garante que o HubSpot leia a URL já com as UTMs */}
          {open && (
            <div ref={formHostRef} className="hs-form-frame" data-region="na1" data-form-id={HS_FORM_ID} data-portal-id={HS_PORTAL_ID} style={{ opacity: formReady ? 1 : 0, transition: "opacity .25s ease" }} />
          )}
        </div>
        <style dangerouslySetInnerHTML={{ __html: `@keyframes hsSpin{to{transform:rotate(360deg)}}` }} />
      </div>
    </div>
  );
}

/* ── CTA Final ─────────────────────────────────────────────────────── */
export default function CTAFinal() {
  const [modalOpen, setModalOpen] = useState(false);
  const originalUrlRef = useRef<string | null>(null);

  const openModal = useCallback(() => {
    if (typeof window !== "undefined") {
      originalUrlRef.current = window.location.href;
      window.history.replaceState(window.history.state, "", urlWithUtms(window.location.href));
    }
    loadHubspotScript();
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    if (typeof window !== "undefined" && originalUrlRef.current) {
      window.history.replaceState(window.history.state, "", originalUrlRef.current);
      originalUrlRef.current = null;
    }
  }, []);

  return (
    <section style={{ background: "#03263F", padding: "clamp(64px,9vh,96px) 0", position: "relative", overflow: "hidden" }}>
      {/* vinheta radial de fundo — profundidade sem quebrar a base navy */}
      <div style={{ position: "absolute", left: "12%", top: "-10%", width: "55%", height: "70%", background: "radial-gradient(ellipse at center,rgba(12,152,252,0.14) 0%,transparent 68%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "8%", bottom: "-15%", width: "40%", height: "60%", background: "radial-gradient(ellipse at center,rgba(8,194,122,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div className="max-w-6xl mx-auto px-6" style={{ position: "relative" }}>
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            padding: "clamp(36px,6vw,60px) clamp(28px,6vw,64px)",
            border: "1px solid rgba(64,150,242,0.28)",
            background: "linear-gradient(150deg,#123255 0%,#0C263F 55%,#081A2C 100%)",
            boxShadow: "0 40px 90px -32px rgba(0,10,30,0.7)",
          }}
        >
          <div className="absolute -right-20 -top-24 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(12,152,252,0.22),transparent 70%)" }} />
          <div className="absolute -left-16 -bottom-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(8,194,122,0.14),transparent 70%)" }} />
          <div style={{ position: "absolute", top: 0, left: "6%", right: "6%", height: 1, background: "linear-gradient(90deg,transparent,rgba(12,152,252,0.55),transparent)" }} />

          <div className="relative flex flex-col md:flex-row md:items-center gap-10 md:gap-14">
            <div style={{ maxWidth: 560, flex: "1 1 auto" }}>
              <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#A9D8F5", display: "block", marginBottom: 14 }}>Sem compromisso</span>
              <h2 style={{ fontFamily: F, fontSize: "clamp(28px,4.2vw,44px)", lineHeight: 1.04, color: "#F4F4F4", marginBottom: 16 }}>SEU LUGAR NO FUTEBOL<br />JÁ EXISTE. FALTA O<br />CAMINHO ATÉ ELE.</h2>
              <p style={{ fontFamily: M, fontSize: 15.5, fontWeight: 500, color: "rgba(244,244,244,0.65)", lineHeight: 1.65, maxWidth: 440 }}>
                Fale com um consultor no WhatsApp. Ele entende seu momento e indica a formação certa pro seu perfil, em 5 minutos você sai com um plano.
              </p>
            </div>

            <div style={{ flex: "0 0 auto", width: "100%", maxWidth: 340, display: "flex", flexDirection: "column" as const, gap: 22, paddingLeft: 0, borderLeft: "none" }} className="md:pl-12 md:border-l md:border-white/10">
              <div className="flex flex-col gap-3">
                <button
                  onClick={openModal}
                  onMouseEnter={(e) => { loadHubspotScript(); const b = e.currentTarget; b.style.transform = "translateY(-2px)"; b.style.boxShadow = "0 12px 30px rgba(37,211,102,0.5)"; }}
                  onMouseLeave={(e) => { const b = e.currentTarget; b.style.transform = "translateY(0)"; b.style.boxShadow = "0 8px 22px rgba(37,211,102,0.35)"; }}
                  onTouchStart={() => loadHubspotScript()}
                  style={{ fontFamily: M, fontWeight: 700, fontSize: 15, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 26px", borderRadius: 14, background: "linear-gradient(135deg,#2fe08a,#08C27A)", boxShadow: "0 8px 22px rgba(37,211,102,0.35)", border: "none", cursor: "pointer", transition: "transform .18s ease, box-shadow .18s ease", width: "100%" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Falar com um consultor
                </button>
                <Link href="/cursos" style={{ fontFamily: M, fontWeight: 700, fontSize: 14, color: "rgba(244,244,244,0.75)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" as const, padding: "14px 24px", borderRadius: 14, border: "1px solid rgba(140,200,245,0.24)", textDecoration: "none", transition: "border-color .18s ease, color .18s ease" }}
                  onMouseEnter={(e) => { const l = e.currentTarget; l.style.borderColor = "rgba(140,200,245,0.5)"; l.style.color = "#F4F4F4"; }}
                  onMouseLeave={(e) => { const l = e.currentTarget; l.style.borderColor = "rgba(140,200,245,0.24)"; l.style.color = "rgba(244,244,244,0.75)"; }}
                >
                  Prefiro explorar as formações
                </Link>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", flexShrink: 0 }}>
                  {["/images/site/mantovani.jpeg", "/images/site/Hoffmann.jpeg", "/images/site/Victoria.jpeg"].map((src, i) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img key={src} src={src} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "2px solid #0C263F", marginLeft: i > 0 ? -10 : 0, position: "relative", zIndex: 3 - i, boxShadow: "0 2px 8px rgba(0,0,0,0.35)" }} />
                  ))}
                </div>
                <p style={{ fontFamily: M, fontSize: 12.5, fontWeight: 600, color: "rgba(169,216,245,0.55)", lineHeight: 1.4 }}>
                  <strong style={{ color: "rgba(244,244,244,0.85)", fontWeight: 700 }}>+4.500 alunos</strong> começaram assim.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormModal open={modalOpen} onClose={closeModal} />
    </section>
  );
}