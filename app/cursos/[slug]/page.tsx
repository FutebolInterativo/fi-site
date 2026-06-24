// app/cursos/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCursoBySlug, getAllSlugs } from "@/lib/cursos";

// Container inline — evita dependência de path entre app/ e src/components/
function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 md:px-6">{children}</div>;
}

export const runtime = "nodejs";

function ytId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

const ACCENT: Record<string, string> = {
  "tecnica-e-tatica":      "#4096F2",
  "comunicacao-marketing": "#818CF8",
  "gestao-e-operacao":     "#F59E0B",
  "saude":                 "#2DD4BF",
};

const AREA_LABEL: Record<string, string> = {
  "tecnica-e-tatica":      "Técnica e Tática",
  "comunicacao-marketing": "Comunicação e Marketing",
  "gestao-e-operacao":     "Gestão e Operação",
  "saude":                 "Saúde",
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCursoBySlug(slug);
  if (!c) return {};
  return { title: c.title, description: c.shortDescription };
}

// ── Sub-componentes ────────────────────────────────────────────────────────

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-[11px] font-bold tracking-[0.2em] uppercase mb-3 ${light ? "text-[rgba(169,216,245,0.8)]" : "text-fi-accentL"}`}>
      {children}
    </p>
  );
}

function SectionH2({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.035em] leading-[1.06] mb-10 md:mb-14 ${light ? "text-white" : "text-fi-text"}`}>
      {children}
    </h2>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function CursoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCursoBySlug(slug);
  if (!c) return notFound();

  const cor   = ACCENT[c.area] ?? "#4096F2";
  const label = AREA_LABEL[c.area] ?? c.area;
  const url   = c.checkoutUrl ?? c.externalUrl;

  // Parse "12x R$ 533,99"
  let parcelas = "", inteiro = "", centavos = "";
  if (c.preco) {
    const m = c.preco.match(/(\d+)[xX]\s*R\$\s*([\d.]+),(\d+)/);
    if (m) { parcelas = m[1]; inteiro = m[2]; centavos = m[3]; }
  }

  return (
    <div className="bg-fi-bg min-h-screen">

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-20 md:pb-28 overflow-hidden">
        {/* grid + glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 20% 0%, ${cor}18 0%, transparent 55%)` }} />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-fi-bg" />

        <Container>
          <div className="relative max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[12px] text-fi-dim mb-8">
              <Link href="/" className="hover:text-fi-sub transition-colors">Início</Link>
              <span className="opacity-40">/</span>
              <Link href="/cursos/" className="hover:text-fi-sub transition-colors">Cursos</Link>
              <span className="opacity-40">/</span>
              <span className="text-fi-sub truncate max-w-[220px]">{c.title}</span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span
                className="inline-flex items-center text-[11px] font-bold tracking-[0.08em] uppercase text-white px-3 py-1.5 rounded-full"
                style={{ background: cor }}
              >{label}</span>
              <span className="inline-flex items-center text-[11px] font-semibold tracking-[0.06em] uppercase text-fi-dim px-3 py-1.5 rounded-full border border-fi-border bg-fi-surface">
                {c.type}
              </span>
            </div>

            {/* Título — usa h1 global Syne via CSS base do projeto */}
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-fi-text leading-[1.06] tracking-[-0.035em] mb-5">
              {c.title}
            </h1>

            {c.subheadline && (
              <p className="text-[17px] leading-relaxed text-fi-sub max-w-2xl mb-10">{c.subheadline}</p>
            )}

            {/* Stats */}
            {(c.cargaHoraria || c.numAulas || c.formato) && (
              <div className="flex flex-wrap items-stretch gap-0">
                {[
                  c.cargaHoraria ? { v: c.cargaHoraria,    l: "Carga Horária" } : null,
                  c.numAulas     ? { v: String(c.numAulas), l: "Aulas" } : null,
                  c.formato      ? { v: c.formato,          l: "Formato" } : null,
                ].filter(Boolean).map((s, i, arr) => (
                  <div key={i} className="pr-7 mr-7" style={{ borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                    <div className="font-display text-3xl md:text-4xl font-extrabold text-fi-text leading-none tracking-[-0.03em]">{s!.v}</div>
                    <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-fi-dim mt-1.5">{s!.l}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ══ PARA QUEM ════════════════════════════════════════════════════ */}
      {c.paraQuem && c.paraQuem.length > 0 && (
        <section className="py-20 md:py-28 border-t border-fi-border" style={{ background: "#EBF3FB" }}>
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>Para quem é este curso</Eyebrow>
              <SectionH2>ESTE CURSO É PARA VOCÊ SE...</SectionH2>
              <ul className="flex flex-col gap-4">
                {c.paraQuem.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center" style={{ background: cor + "18", border: `1px solid ${cor}45` }}>
                      <svg width={11} height={11} viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke={cor} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="text-[15px] leading-relaxed text-[#1B3F63]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {/* ══ EMENTA ═══════════════════════════════════════════════════════ */}
      {c.ementa && c.ementa.length > 0 && (
        <section className="py-20 md:py-28" style={{ background: "#0C5896" }}>
          <Container>
            <Eyebrow light>Conteúdo do curso</Eyebrow>
            <SectionH2 light>O QUE VOCÊ VAI APRENDER</SectionH2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {c.ementa.map((item, i) => (
                <div key={i} className="flex gap-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <span className="flex-shrink-0 font-display text-[13px] font-extrabold pt-0.5 w-6" style={{ color: "rgba(169,216,245,0.4)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold text-[14px] leading-snug text-white mb-1">{item.titulo}</p>
                    {item.descricao && <p className="text-[12.5px] leading-relaxed" style={{ color: "rgba(169,216,245,0.6)" }}>{item.descricao}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ══ MENTORES ═════════════════════════════════════════════════════ */}
      {c.mentores && c.mentores.length > 0 && (
        <section className="py-20 md:py-28 border-t border-fi-border" style={{ background: "#EBF3FB" }}>
          <Container>
            <Eyebrow>Quem vai te ensinar</Eyebrow>
            <SectionH2>OS MENTORES</SectionH2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-7">
              {c.mentores.map((m, i) => (
                <div key={i} className="flex flex-col">
                  {m.foto && (
                    <div className="rounded-2xl overflow-hidden mb-3 shadow-fi-soft" style={{ aspectRatio: "3/4", background: "#C8DCF0" }}>
                      <img src={m.foto} alt={m.nome} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
                    </div>
                  )}
                  <p className="font-display font-bold text-[14px] leading-snug text-[#103B66] mb-1">{m.nome}</p>
                  <p className="text-[12px] leading-snug text-[#4A6F8C]">{m.bio}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ══ DIFERENCIAIS ═════════════════════════════════════════════════ */}
      {c.diferenciais && c.diferenciais.length > 0 && (
        <section className="py-20 md:py-28" style={{ background: "#03263F" }}>
          <Container>
            <Eyebrow light>Por que escolher</Eyebrow>
            <SectionH2 light>DIFERENCIAIS DO CURSO</SectionH2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {c.diferenciais.map((d, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center" style={{ background: cor + "20", border: `1px solid ${cor}40` }}>
                    <svg width={11} height={11} viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke={cor} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="text-[13.5px] leading-relaxed text-white/80">{d}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ══ EXPERIÊNCIA PRÁTICA ══════════════════════════════════════════ */}
      {c.experienciaPratica && c.experienciaPratica.length > 0 && (
        <section className="py-20 md:py-28" style={{ background: "#0C5896" }}>
          <Container>
            <Eyebrow light>Prática incluída</Eyebrow>
            <SectionH2 light>EXPERIÊNCIA PRÁTICA</SectionH2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
              {c.experienciaPratica.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "rgba(74,219,248,0.15)", border: "1px solid rgba(74,219,248,0.35)" }}>
                    <svg width={11} height={11} viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="#4ADBF8" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="text-[13.5px] leading-relaxed text-white/85">{item}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ══ DEPOIMENTOS ══════════════════════════════════════════════════ */}
      {c.depoimentos && c.depoimentos.length > 0 && (
        <section className="py-20 md:py-28 border-t border-fi-border bg-fi-bg2">
          <Container>
            <Eyebrow>Depoimentos</Eyebrow>
            <SectionH2>QUEM JÁ CURSOU</SectionH2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {c.depoimentos.map((d, i) => {
                const vid = d.videoUrl ? ytId(d.videoUrl) : null;
                return (
                  <div key={i} className="flex flex-col">
                    {vid ? (
                      <div className="rounded-2xl overflow-hidden mb-4 shadow-fi-elev" style={{ aspectRatio: "16/9", background: "#07101C" }}>
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1`}
                          title={d.nome}
                          className="w-full h-full"
                          style={{ border: "none", display: "block" }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : null}
                    <p className="font-display font-bold text-xl text-fi-text mb-1">{d.nome}</p>
                    {d.papel && <p className="text-[11px] font-bold tracking-[0.08em] uppercase mb-2" style={{ color: cor }}>{d.papel}</p>}
                    <p className="text-[14px] leading-relaxed text-fi-sub">{d.texto}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ══ STATS ════════════════════════════════════════════════════════ */}
      {c.stats && c.stats.length > 0 && (
        <section className="py-16 border-t border-fi-border bg-fi-bg">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {c.stats.map((s, i) => (
                <div key={i}>
                  <div className="font-display text-5xl md:text-6xl font-extrabold leading-none tracking-[-0.04em] mb-2" style={{ color: cor }}>{s.valor}</div>
                  <div className="text-[11px] font-bold tracking-[0.1em] uppercase text-fi-dim">{s.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ══ OFERTA ═══════════════════════════════════════════════════════ */}
      <section id="oferta" className="py-20 md:py-28 border-t border-fi-border bg-fi-bg">
        <Container>
          <div className="text-center mb-12">
            <Eyebrow>Garanta sua vaga</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-fi-text tracking-[-0.035em] leading-[1.06]">
              INVISTA NA SUA CARREIRA
            </h2>
          </div>

          <div className="max-w-md mx-auto rounded-3xl p-8 md:p-10 shadow-fi-elev" style={{ background: "linear-gradient(145deg, #0F2D52, #163860)" }}>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "rgba(169,216,245,0.65)" }}>O que está incluso</p>
            <ul className="flex flex-col gap-3 mb-8">
              {["Acesso completo ao conteúdo do curso", "Certificado de conclusão", "Suporte com os mentores", "Comunidade exclusiva de alunos FI"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] text-white/80">
                  <span className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "rgba(74,219,248,0.12)", border: "1px solid rgba(74,219,248,0.28)" }}>
                    <svg width={11} height={11} viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="#4ADBF8" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="h-px mb-6" style={{ background: "rgba(140,200,245,0.12)" }} />

            {c.preco && inteiro ? (
              <div className="text-center mb-2">
                <p className="text-[13px] font-medium mb-3" style={{ color: "rgba(169,216,245,0.65)" }}>Por apenas:</p>
                <div className="flex items-start justify-center gap-1 text-white">
                  <div className="flex flex-col items-end pt-2 mr-1">
                    <span className="font-display font-extrabold text-lg leading-tight">{parcelas}x</span>
                    <span className="font-display font-extrabold text-lg leading-tight">R$</span>
                  </div>
                  <span className="font-display font-extrabold text-7xl leading-none tracking-[-0.04em]">{inteiro}</span>
                  <span className="font-display font-extrabold text-2xl pt-2">,{centavos}</span>
                </div>
                {c.precoAvista && (
                  <p className="text-[12px] mt-2" style={{ color: "rgba(169,216,245,0.55)" }}>
                    ou <strong className="text-white/70">{c.precoAvista}</strong> à vista
                  </p>
                )}
              </div>
            ) : c.preco ? (
              <p className="font-display font-extrabold text-4xl text-white text-center mb-4 tracking-[-0.03em]">{c.preco}</p>
            ) : null}

            <div className="mt-7">
              <a
                href={url} target="_blank" rel="noreferrer"
                className="relative flex items-center justify-between gap-3 w-full px-6 py-4 rounded-2xl overflow-hidden"
                style={{ background: "linear-gradient(135deg,#09D285 0%,#06B872 100%)", boxShadow: "0 0 36px rgba(8,194,122,0.4),0 12px 32px rgba(3,38,63,0.22)", border: "1.5px solid rgba(10,220,140,0.65)", textDecoration: "none" }}
              >
                <span aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg,transparent 38%,rgba(255,255,255,0.10) 50%,transparent 62%)" }} />
                <span className="relative font-semibold text-[16px] text-white tracking-[-0.01em]">Garantir minha vaga</span>
                <span className="relative flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(3,38,63,0.38)" }}>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ══ GARANTIA ═════════════════════════════════════════════════════ */}
      {c.garantiaTexto && (
        <section className="pb-20 md:pb-28 bg-fi-bg">
          <Container>
            <div className="rounded-3xl p-8 md:p-12 flex flex-wrap items-center gap-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(64,150,242,0.12)", border: "1px solid rgba(64,150,242,0.2)" }}>
                <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#4096F2" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" stroke="#4096F2" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-[200px]">
                <h3 className="font-display font-extrabold text-2xl text-fi-text tracking-[-0.03em] mb-2">GARANTIA FI</h3>
                <p className="text-[15px] leading-relaxed text-fi-sub">{c.garantiaTexto}</p>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ══ VOLTAR ═══════════════════════════════════════════════════════ */}
      <div className="border-t border-fi-border bg-fi-bg py-10 text-center">
        <Link href="/cursos/" className="fi-btn-ghost">← Ver todos os cursos</Link>
      </div>

    </div>
  );
}