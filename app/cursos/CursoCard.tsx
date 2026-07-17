"use client";
import { useState } from "react";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

const AREA_COLOR: Record<string, string> = {
  "tecnica-e-tatica":      "#4096F2",
  "comunicacao-marketing": "#818CF8",
  "gestao-e-operacao":     "#F59E0B",
  "saude":                 "#2DD4BF",
};

const ICON_PATH: Record<string, string> = {
  "tecnica-e-tatica":      "M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5",
  "comunicacao-marketing": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  "gestao-e-operacao":     "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  "saude":                 "M22 12h-4l-3 9L9 3l-3 9H2",
};

type Props = {
  id: string;
  title: string;
  type: string;
  area: string;
  areaLabel: string;
  externalUrl: string;
  capa?: string;
};

export default function CursoCard({ id, title, type, area, areaLabel, externalUrl, capa }: Props) {
  const [hover, setHover] = useState(false);
  const cor = AREA_COLOR[area] ?? "#4096F2";
  const iconPath = ICON_PATH[area] ?? ICON_PATH["tecnica-e-tatica"];
  const href = externalUrl || `/cursos/${id}`;
  const externo = !!externalUrl;

  return (
    <a
      href={href}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noreferrer" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <div style={{
        display: "flex", flexDirection: "column" as const, height: "100%",
        borderRadius: 20, overflow: "hidden",
        border: `1px solid ${hover ? `${cor}55` : "rgba(140,200,245,0.14)"}`,
        background: "#0A1E35",
        boxShadow: hover ? "0 20px 44px -16px rgba(0,0,0,0.5)" : "none",
        transform: hover ? "translateY(-5px)" : "translateY(0)",
        transition: "transform .2s ease, border-color .2s ease, box-shadow .2s ease",
      }}>

        {/* Thumbnail — proporção 1:1. A imagem "sem texto" é 1080x1080 (quadrada),
            então a caixa tem a mesma proporção pra mostrar ela completa, sem corte.
            O título do curso fica sobreposto por cima, com sombra pra ficar legível
            em qualquer imagem — sem repetir o texto embaixo do card. */}
        <div style={{ width: "100%", aspectRatio: "1/1", position: "relative" as const, flexShrink: 0, overflow: "hidden" }}>
          {capa ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={capa}
              alt=""
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          ) : (
            // Painel genérico (curso sem arte própria) — cor da área + ícone grande de fundo,
            // sem nenhum texto gravado na imagem, pra não duplicar com o título sobreposto.
            <div style={{
              position: "absolute" as const, inset: 0,
              background: `linear-gradient(150deg, ${cor}30 0%, #0A1E35 65%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="62%" height="62%" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.16 }}>
                <path d={iconPath} stroke={cor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* Gradiente inferior — garante legibilidade do título em qualquer imagem */}
          <div style={{
            position: "absolute" as const, inset: 0,
            background: "linear-gradient(to top, rgba(1,10,20,0.95) 0%, rgba(1,10,20,0.62) 38%, transparent 68%)",
          }} />

          {/* Tipo + área + título — tudo sobreposto na base, sobre a faixa escura
              (nunca solto sobre a imagem crua, pra não colidir com o que já tem nela) */}
          <div style={{ position: "absolute" as const, left: 14, right: 14, bottom: 12 }}>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 4, marginBottom: 8 }}>
              <span style={{ fontFamily: M, fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.55)" }}>
                {type}
              </span>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, minWidth: 0 }}>
                <span style={{ width: 14, height: 14, borderRadius: "50%", background: `${cor}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width={8} height={8} viewBox="0 0 24 24" fill="none">
                    <path d={iconPath} stroke={cor} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span style={{ fontFamily: M, fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" as const, color: cor, lineHeight: 1.3 }}>
                  {areaLabel}
                </span>
              </div>
            </div>
            <p style={{
              fontFamily: F, fontSize: 16, lineHeight: 1.18, color: "#fff", margin: 0,
              textShadow: "0 2px 10px rgba(0,0,0,0.75), 0 1px 3px rgba(0,0,0,0.6)",
              display: "-webkit-box", WebkitBoxOrient: "vertical" as const, WebkitLineClamp: 2, overflow: "hidden",
            }}>
              {title}
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <div style={{ padding: "12px 16px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: M, fontSize: 12.5, fontWeight: 700, color: cor }}>Ver detalhes</span>
          <span style={{
            width: 28, height: 28, borderRadius: 8, background: `${cor}16`, border: `1px solid ${cor}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: hover ? "translateX(2px)" : "translateX(0)",
            transition: "transform .18s ease",
          }}>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H8M17 7V16" stroke={cor} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}