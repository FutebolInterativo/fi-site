"use client";
import { useEffect, useRef } from "react";
import type { Curso } from "@/lib/cursos";

declare global {
  interface Window { hbspt?: { forms: { create: (opts: Record<string, string>) => void } }; }
}

export default function CursoForm({ curso }: { curso: Curso }) {
  const ref = useRef<HTMLDivElement>(null);
  const targetId = `hs-form-${curso.id}`;

  useEffect(() => {
    if (!curso.hubspotPortalId || !curso.hubspotFormId) return;
    const render = () => {
      if (window.hbspt && ref.current) {
        ref.current.innerHTML = "";
        window.hbspt.forms.create({
          portalId: curso.hubspotPortalId!,
          formId: curso.hubspotFormId!,
          target: `#${targetId}`,
        });
      }
    };
    if (window.hbspt) { render(); return; }
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://js.hsforms.net/forms/embed/v2.js"]');
    if (existing) { existing.addEventListener("load", render); return () => existing.removeEventListener("load", render); }
    const s = document.createElement("script");
    s.src = "https://js.hsforms.net/forms/embed/v2.js";
    s.async = true;
    s.onload = render;
    document.body.appendChild(s);
  }, [curso.hubspotPortalId, curso.hubspotFormId, targetId]);

  if (!curso.hubspotFormId) return null;
  return <div className="fi-hs-form" id={targetId} ref={ref} />;
}
