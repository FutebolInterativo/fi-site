"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const close = () => setDrawerOpen(false);

  const navLinks = [
    { href: "/cursos",    label: "Formações" },
    { href: "/sobre",     label: "Como funciona" },
    { href: "/sobre",     label: "Sobre" },
    { href: "/ebooks",    label: "E-books" },
    { href: "https://futebolinterativo.com/blog", label: "Blog", external: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
        style={{ background: "rgba(3,38,63,0.96)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(140,200,245,0.1)" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0">
            <Image src="https://futebolinterativo.com/novo-site/img/logo.png" alt="Futebol Interativo" width={140} height={36} className="h-10 w-auto" priority />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) =>
              l.external ? (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-white/75 px-3 py-2 rounded-full hover:text-white hover:bg-white/10 transition-colors">{l.label}</a>
              ) : (
                <Link key={l.href} href={l.href} className="text-[13px] font-semibold text-white/75 px-3 py-2 rounded-full hover:text-white hover:bg-white/10 transition-colors">{l.label}</Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <a href="https://alunos.futebolinterativo.com/" target="_blank" rel="noreferrer" className="hidden lg:block text-[13px] font-bold text-fi-lightblue px-4 py-2 rounded-full border border-fi-lightblue/30 hover:border-fi-blue transition-colors">
              Área do aluno
            </a>
            <Link href="#areas" className="hidden sm:flex items-center gap-2 text-[13px] font-bold text-white px-4 py-2 rounded-xl" style={{ background: "linear-gradient(135deg,#08C27A,#05A567)", border: "1.4px solid rgba(8,194,122,0.9)", boxShadow: "0 0 20px rgba(8,194,122,0.4)" }}>
              Ver formações
              <span className="w-6 h-6 rounded-lg bg-fi-navy/50 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
            <button className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-fi-lightblue/20 text-white" onClick={() => setDrawerOpen(true)} aria-label="Abrir menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          <div className="absolute inset-0 bg-fi-navy/80 backdrop-blur-sm" onClick={close} />
          <div className="absolute top-0 right-0 bottom-0 w-[min(88vw,320px)] bg-[#021829] border-l border-fi-lightblue/10 flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-fi-lightblue/10 flex-shrink-0">
              <Image src="https://futebolinterativo.com/novo-site/img/logo.png" alt="Futebol Interativo" width={120} height={30} className="h-7 w-auto" />
              <button onClick={close} className="w-9 h-9 rounded-lg border border-fi-lightblue/20 text-white flex items-center justify-center" aria-label="Fechar menu">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
              {navLinks.map((l) =>
                l.external ? (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" onClick={close} className="px-4 py-3.5 rounded-xl text-[15px] font-bold text-white/80 hover:text-white hover:bg-fi-blue/10 transition-colors">{l.label}</a>
                ) : (
                  <Link key={l.href} href={l.href} onClick={close} className="px-4 py-3.5 rounded-xl text-[15px] font-bold text-white/80 hover:text-white hover:bg-fi-blue/10 transition-colors">{l.label}</Link>
                )
              )}
            </nav>
            <div className="p-5 border-t border-fi-lightblue/10 flex flex-col gap-3 flex-shrink-0">
              <a href="https://alunos.futebolinterativo.com/" target="_blank" rel="noreferrer" onClick={close} className="block text-center py-3 rounded-xl border border-fi-lightblue/20 text-[14px] font-bold text-fi-lightblue">
                Área do aluno
              </a>
              <Link href="#areas" onClick={close} className="flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-bold text-white" style={{ background: "linear-gradient(135deg,#08C27A,#05A567)", border: "1.4px solid rgba(8,194,122,0.9)" }}>
                Ver formações
                <span className="w-6 h-6 rounded-lg bg-fi-navy/50 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
