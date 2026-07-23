"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import HubspotContactForm from "./HubspotContactForm";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

type Props = {
  pageName?: string;
  color?: string;
  title?: string;
  subtitle?: string;
  defaultUtm?: Partial<Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content", string>>;
  presetArea?: string;
  onSuccess?: () => void;
  successTitle?: string;
  successSubtitle?: string;
  /** o próprio botão/elemento que abre o modal — qualquer JSX, ex: um <a> já estilizado */
  trigger: React.ReactNode;
};

export default function HubspotFormModal({
  pageName, color = "#08C27A", title = "Fale com a gente", subtitle,
  defaultUtm, presetArea, onSuccess, successTitle, successSubtitle, trigger,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const modal = open && (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 300,
        background: "rgba(1,10,20,0.78)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(440px, 100%)", maxHeight: "88vh", overflowY: "auto",
          borderRadius: 22, border: `1px solid ${color}35`,
          background: "linear-gradient(155deg,#0F2744,#0A1E35)",
          boxShadow: "0 40px 100px -20px rgba(0,0,0,0.7)",
          padding: "28px clamp(20px,4vw,32px)", position: "relative",
          margin: "auto",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          style={{
            position: "absolute", top: 16, right: 16,
            width: 30, height: 30, borderRadius: 9,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(140,200,245,0.18)",
            color: "rgba(169,216,245,0.6)", cursor: "pointer", fontSize: 16, lineHeight: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >×</button>

        <p style={{ fontFamily: F, fontSize: "clamp(19px,2.4vw,24px)", color: "#F4F4F4", marginBottom: subtitle ? 6 : 18, paddingRight: 30 }}>
          {title}
        </p>
        {subtitle && (
          <p style={{ fontFamily: M, fontSize: 14.5, color: "rgba(169,216,245,0.65)", marginBottom: 18 }}>
            {subtitle}
          </p>
        )}

        <HubspotContactForm
          pageName={pageName}
          color={color}
          defaultUtm={defaultUtm}
          presetArea={presetArea}
          onSuccess={onSuccess}
          successTitle={successTitle}
          successSubtitle={successSubtitle}
        />
      </div>
    </div>
  );

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ display: "block", cursor: "pointer" }}>
        {trigger}
      </span>
      {mounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}