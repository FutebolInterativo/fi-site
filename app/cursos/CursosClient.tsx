"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { cursos, areas } from "@/lib/cursos";
import CursoCard from "./CursoCard";

const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";

export default function CursosClient() {
  const searchParams = useSearchParams();
  const [areaAtiva, setAreaAtiva] = useState("todas");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const area = searchParams.get("area");
    if (area) setAreaAtiva(area);
  }, [searchParams]);

  const filtrados = cursos.filter((c) => {
    const matchArea  = areaAtiva === "todas" || c.area === areaAtiva;
    const matchBusca = (c.title ?? "").toLowerCase().includes(busca.toLowerCase()); // FIX: ?? ""
    return matchArea && matchBusca;
  });

  return (
    <div>

      {/* Hero */}
      <div style={{ background: "linear-gradient(180deg,#021829 0%,#03263F 100%)", paddingTop: 120, paddingBottom: 60, textAlign: "center" }}>
        <div className="max-w-6xl mx-auto px-6">
          <span style={{ fontFamily: M, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A9D8F5", display: "block", marginBottom: 12 }}>
            {filtrados.length} formações disponíveis
          </span>
          <h1 style={{ fontFamily: F, fontSize: "clamp(36px,5vw,64px)", lineHeight: 0.95, color: "#F4F4F4", marginBottom: 32 }}>
            TODAS AS FORMAÇÕES
          </h1>
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <input
              type="text"
              placeholder="Buscar formação..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(140,200,245,0.2)", background: "rgba(12,152,252,0.06)", color: "#F4F4F4", fontFamily: M, fontSize: 14, outline: "none" }}
            />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ borderBottom: "1px solid rgba(140,200,245,0.1)", background: "rgba(3,38,63,0.95)", position: "sticky", top: 64, zIndex: 40, backdropFilter: "blur(16px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 8, overflowX: "auto", padding: "12px 24px" }}>
          {areas.map((a) => {
            const ativo = areaAtiva === a.id;
            return (
              <button
                key={a.id}
                onClick={() => setAreaAtiva(a.id)}
                style={{ fontFamily: M, fontSize: 13, fontWeight: 700, padding: "8px 18px", borderRadius: 40, border: `1px solid ${ativo ? a.color : "rgba(140,200,245,0.2)"}`, whiteSpace: "nowrap", cursor: "pointer", flexShrink: 0, background: ativo ? `${a.color}22` : "transparent", color: ativo ? a.color : "rgba(244,244,244,0.65)", transition: "all 0.2s" }}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        {filtrados.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(244,244,244,0.4)", fontFamily: M, fontSize: 16 }}>
            Nenhuma formação encontrada.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtrados.map((c) => {
              // Extrai só primitivos — nunca passa o objeto rico para o CursoCard
              const id        = c.id    ?? "";
              const title     = c.title ?? "";
              const type      = c.type  ?? "";
              const area      = c.area  ?? "";
              const areaLabel = areas.find((a) => a.id === area)?.label ?? area;
              // Cursos com ementa têm página interna — não redireciona para externo
              const externalUrl = c.ementa && c.ementa.length > 0 ? "" : (c.externalUrl ?? "");
              const capa      = c.capa ?? "";
              return (
                <CursoCard
                  key={id}
                  id={id}
                  title={title}
                  type={type}
                  area={area}
                  areaLabel={areaLabel}
                  externalUrl={externalUrl}
                  capa={capa}
                />
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}