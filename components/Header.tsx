"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

type NavLink = { href: string; label: string; external?: boolean };

const LINKS: NavLink[] = [
  { href: "/cursos",              label: "Formações" },
  { href: "/experiencia-pratica", label: "Experiência Prática" },
  { href: "/sobre",               label: "Sobre" },
  { href: "/ebooks",              label: "E-books" },
  { href: "https://futebolinterativo.com/blog", label: "Blog", external: true },
];

const LOGO_SRC = "https://futebolinterativo.com/novo-site/img/logo.png";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  /* ── Indicador deslizante — acompanha o item ativo/hover, tipo uma "posse de bola" ── */
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [bar, setBar] = useState({ left: 0, width: 0, ready: false });

  const activeHref = LINKS.find((l) => !l.external && isActive(l.href))?.href ?? null;
  const targetHref = hoveredHref ?? activeHref;

  const measure = useCallback((href: string | null) => {
    const nav = navRef.current;
    const el = href ? itemRefs.current[href] : null;
    if (!nav || !el) { setBar((b) => ({ ...b, ready: false })); return; }
    const navBox = nav.getBoundingClientRect();
    const elBox = el.getBoundingClientRect();
    setBar({ left: elBox.left - navBox.left, width: elBox.width, ready: true });
  }, []);

  useEffect(() => { measure(targetHref); }, [targetHref, measure]);

  useEffect(() => {
    const fn = () => measure(targetHref);
    window.addEventListener("resize", fn);
    window.addEventListener("load", fn);
    return () => { window.removeEventListener("resize", fn); window.removeEventListener("load", fn); };
  }, [targetHref, measure]);

  const css = `
    .fi-header a:focus-visible, .fi-header button:focus-visible {
      outline: 2px solid #0C98FC; outline-offset: 3px; border-radius: 8px;
    }
    .fi-cta-arrow { transition: transform .18s ease; }
    .fi-cta:hover .fi-cta-arrow { transform: translate(2px,-2px); }
    .fi-ghost:hover { background: rgba(255,255,255,0.06) !important; border-color: rgba(169,216,245,0.4) !important; }
    .fi-burger-line { transition: transform .28s ease, opacity .2s ease; transform-origin: center; }
    .fi-drawer-link { transition: color .18s ease, transform .18s ease; }
    .fi-drawer-link:hover { color: #F4F4F4 !important; transform: translateX(4px); }
    @media (prefers-reduced-motion: reduce) {
      .fi-cta-arrow, .fi-burger-line, .fi-drawer-link { transition: none !important; }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header
        className="fi-header"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          background: scrolled ? "rgba(3,38,63,0.86)" : "rgba(3,38,63,0.4)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(140,200,245,0.14)" : "1px solid transparent",
          boxShadow: scrolled ? "0 12px 32px -16px rgba(0,10,25,0.55)" : "none",
          transition: "background .25s ease, border-color .25s ease, box-shadow .25s ease",
        }}
      >
        <div style={{
          maxWidth: 1360, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)",
          height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_SRC} alt="Futebol Interativo" style={{ height: 30, width: "auto", display: "block" }} />
          </Link>

          {/* Nav desktop */}
          <nav
            ref={navRef}
            className="hidden lg:flex"
            style={{ position: "relative", alignItems: "center", gap: "clamp(20px,2.6vw,34px)" }}
            onMouseLeave={() => setHoveredHref(null)}
          >
            {LINKS.map((l) => {
              const active = !l.external && !!isActive(l.href);
              const hovered = hoveredHref === l.href;
              const style: React.CSSProperties = {
                fontFamily: M, fontSize: 13.5, fontWeight: 600,
                letterSpacing: "0.01em",
                color: active ? "#F4F4F4" : hovered ? "rgba(244,244,244,0.85)" : "rgba(244,244,244,0.58)",
                textDecoration: "none", padding: "8px 2px", display: "block",
                transition: "color .18s ease", whiteSpace: "nowrap" as const,
              };
              const refCb = (el: HTMLElement | null) => { itemRefs.current[l.href] = el; };
              return l.external ? (
                <a key={l.href} ref={refCb} href={l.href} target="_blank" rel="noreferrer"
                  onMouseEnter={() => setHoveredHref(l.href)} style={style}>{l.label}</a>
              ) : (
                <Link key={l.href} ref={refCb} href={l.href}
                  onMouseEnter={() => setHoveredHref(l.href)} style={style}>{l.label}</Link>
              );
            })}
            {/* barra deslizante */}
            <span aria-hidden style={{
              position: "absolute", bottom: -8, height: 2, borderRadius: 2,
              background: "linear-gradient(90deg,#0C98FC,#5AC8FF)",
              boxShadow: bar.ready ? "0 0 10px rgba(12,152,252,0.55)" : "none",
              left: bar.left, width: bar.width, opacity: bar.ready ? 1 : 0,
              transition: "left .35s cubic-bezier(.65,0,.35,1), width .35s cubic-bezier(.65,0,.35,1), opacity .2s ease",
              pointerEvents: "none",
            }} />
          </nav>

          {/* CTAs desktop */}
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: 10, flexShrink: 0 }}>
            <a
              href="https://alunos.futebolinterativo.com/" target="_blank" rel="noreferrer"
              className="fi-ghost"
              style={{
                fontFamily: M, fontWeight: 600, fontSize: 13, color: "rgba(244,244,244,0.75)",
                padding: "10px 18px", borderRadius: 99,
                border: "1.5px solid rgba(169,216,245,0.22)",
                textDecoration: "none", transition: "background .18s ease, border-color .18s ease",
              }}
            >
              Área do aluno
            </a>
            <Link
              href="/cursos" className="fi-cta"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: M, fontWeight: 700, fontSize: 13.5, color: "#fff",
                padding: "10px 8px 10px 18px", borderRadius: 99,
                background: "linear-gradient(135deg,#08C27A,#05A567)",
                border: "1.4px solid rgba(8,194,122,0.9)",
                boxShadow: "0 0 22px rgba(8,194,122,0.4)",
                textDecoration: "none",
              }}
            >
              Ver formações
              <span className="fi-cta-arrow" style={{
                width: 24, height: 24, borderRadius: 8, background: "rgba(3,38,63,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Botão hamburger — só existe abaixo do breakpoint lg (classe controla 100% da exibição) */}
          <button
            className="flex lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(169,216,245,0.2)",
              alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width={18} height={14} viewBox="0 0 18 14" fill="none">
              <line className="fi-burger-line" x1="0" y1="1" x2="18" y2="1" stroke="#F4F4F4" strokeWidth="1.8" strokeLinecap="round"
                style={{ transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
              <line className="fi-burger-line" x1="0" y1="7" x2="18" y2="7" stroke="#F4F4F4" strokeWidth="1.8" strokeLinecap="round"
                style={{ opacity: open ? 0 : 1 }} />
              <line className="fi-burger-line" x1="0" y1="13" x2="18" y2="13" stroke="#F4F4F4" strokeWidth="1.8" strokeLinecap="round"
                style={{ transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
            </svg>
          </button>
        </div>
      </header>

      {/* Drawer mobile */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 190,
          background: "#03263F",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transform: open ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity .25s ease, transform .25s ease, visibility .25s",
          display: "flex", flexDirection: "column" as const,
          paddingTop: 72,
        }}
      >
        <div style={{ flex: 1, overflowY: "auto" as const, padding: "36px clamp(24px,6vw,56px) 24px", display: "flex", flexDirection: "column" as const, gap: 26 }}>
          {LINKS.map((l, i) => {
            const active = !l.external && !!isActive(l.href);
            const linkStyle: React.CSSProperties = {
              fontFamily: F, fontSize: "clamp(26px,7vw,34px)", lineHeight: 1,
              color: active ? "#0C98FC" : "rgba(244,244,244,0.72)",
              textDecoration: "none", display: "flex", alignItems: "center", gap: 12,
            };
            return (
              <div key={l.href} style={{
                opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(10px)",
                transition: `opacity .3s ease ${i * 40}ms, transform .3s ease ${i * 40}ms`,
              }}>
                {l.external ? (
                  <a href={l.href} target="_blank" rel="noreferrer" className="fi-drawer-link" style={linkStyle}>{l.label}</a>
                ) : (
                  <Link href={l.href} className="fi-drawer-link" style={linkStyle}>{l.label}</Link>
                )}
              </div>
            );
          })}
        </div>

        <div style={{
          padding: "20px clamp(24px,6vw,56px) clamp(28px,6vh,44px)",
          borderTop: "1px solid rgba(140,200,245,0.14)",
          display: "flex", flexDirection: "column" as const, gap: 12,
        }}>
          <a
            href="https://alunos.futebolinterativo.com/" target="_blank" rel="noreferrer"
            style={{
              fontFamily: M, fontWeight: 600, fontSize: 14.5, color: "rgba(244,244,244,0.8)",
              padding: "14px 20px", borderRadius: 14, textAlign: "center" as const,
              border: "1.5px solid rgba(169,216,245,0.25)", textDecoration: "none",
            }}
          >
            Área do aluno
          </a>
          <Link
            href="/cursos"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              fontFamily: M, fontWeight: 700, fontSize: 15, color: "#fff",
              padding: "15px 20px", borderRadius: 14,
              background: "linear-gradient(135deg,#08C27A,#05A567)",
              boxShadow: "0 0 24px rgba(8,194,122,0.45)", textDecoration: "none",
            }}
          >
            Ver formações
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}