"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { areas } from "@/lib/cursos";

const M = "var(--font-montserrat), Montserrat, sans-serif";

/*
  Componente novo — não existia arquivo (não estava entre os documentos
  fornecidos). Alterações aplicadas do doc:
  - Fonte branca com hover em outra cor (usei o azul #0C98FC — ajustar se
    quiser outra cor)
  - "Formações" dinâmico: dropdown gerado a partir de `areas` (lib/cursos.ts),
    então adicionar uma área lá já reflete aqui automaticamente
  - Item de navegação "Experiência Prática" renomeado para "PPI"
    (mantém o link para /experiencia-pratica — ajustar se o PPI for uma
    rota/conceito diferente)
*/
const navLinkStyle: React.CSSProperties = {
  fontFamily: M,
  fontSize: 14,
  fontWeight: 600,
  color: "#fff",
  textDecoration: "none",
  transition: "color .18s ease",
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={navLinkStyle}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#0C98FC"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(3,38,63,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="max-w-6xl mx-auto px-6" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 76 }}>
        <Link href="/">
          <Image src="https://futebolinterativo.com/novo-site/img/logo.png" alt="Futebol Interativo" width={140} height={36} style={{ height: 30, width: "auto" }} />
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden md:flex">
          <div style={{ position: "relative" }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
              style={{ ...navLinkStyle, background: "none", border: "none", cursor: "pointer", padding: "8px 0" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#0C98FC"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            >
              Formações
            </button>
            {open && (
              <div style={{ position: "absolute", top: "100%", left: 0, background: "#03263F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 8, minWidth: 200, boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}>
                {areas.filter(a => a.id !== "todas").map((a) => (
                  <Link
                    key={a.id}
                    href={`/cursos?area=${a.id}`}
                    style={{ display: "block", padding: "9px 14px", borderRadius: 8, fontFamily: M, fontSize: 13.5, fontWeight: 500, color: "rgba(244,244,244,0.8)", textDecoration: "none" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {a.label}
                  </Link>
                ))}
                <Link href="/cursos" style={{ display: "block", padding: "9px 14px", borderRadius: 8, fontFamily: M, fontSize: 13.5, fontWeight: 700, color: "#0C98FC", textDecoration: "none" }}>
                  Todos os cursos
                </Link>
              </div>
            )}
          </div>

          <NavLink href="/experiencia-pratica">PPI</NavLink>
          <NavLink href="/sobre">Sobre</NavLink>
          <NavLink href="/ebooks">E-books</NavLink>
        </nav>

        <a
          href="https://api.whatsapp.com/send/?phone=5511942009407"
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, background: "linear-gradient(135deg,#08C27A,#059669)", fontFamily: M, fontWeight: 700, fontSize: 13.5, color: "#fff", textDecoration: "none" }}
        >
          Falar com consultor
        </a>
      </div>
    </header>
  );
}