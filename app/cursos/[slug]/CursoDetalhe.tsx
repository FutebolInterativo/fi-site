"use client";
import { useState, useEffect, useRef } from "react";
import type { Curso } from "@/lib/cursos";
import CursoCTA from "./CursoCTA";
import CursoForm from "./CursoForm";

/* ─── tokens de marca (Anton + Montserrat são a identidade visual do
   projeto — usados via arbitrary property do Tailwind, não via `style`,
   pra respeitar "só Tailwind" sem abandonar a marca) ─────────────────── */
const FD = "[font-family:var(--font-anton)]";   // display
const FB = "[font-family:var(--font-montserrat)]"; // body

const COR: Record<string,string> = {
  "tecnica-e-tatica":"#4096F2","comunicacao-marketing":"#818CF8",
  "saude":"#2DD4BF","gestao-e-operacao":"#F59E0B",
};
const LBL: Record<string,string> = {
  "tecnica-e-tatica":"Técnica e Tática","comunicacao-marketing":"Comunicação",
  "saude":"Saúde","gestao-e-operacao":"Gestão e Operação",
};
function ytId(u:string){ return u.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)?.[1]??""; }

/* ─── FadeIn — nunca fica permanentemente invisível ────────────────
   comportamento (não visual), por isso continua controlado via JS:
   Tailwind não tem "anime quando entrar na viewport" sem JS por trás. */
function FI({children,d=0,y=18,className=""}:{children:React.ReactNode;d?:number;y?:number;className?:string}){
  const r=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=r.current; if(!el) return;
    el.style.opacity="0";
    el.style.transform=`translateY(${y}px)`;
    el.style.transition=`opacity .6s ${d}ms cubic-bezier(.22,.61,.36,1), transform .6s ${d}ms cubic-bezier(.22,.61,.36,1)`;
    let done=false;
    const reveal=()=>{ if(done) return; done=true; el.style.opacity="1"; el.style.transform="translateY(0)"; };
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting) reveal(); },{threshold:0,rootMargin:"600px 0px -5% 0px"});
    obs.observe(el);
    const fb=setTimeout(reveal,900);
    return ()=>{obs.disconnect();clearTimeout(fb);};
  },[d,y]);
  return <div ref={r} className={className}>{children}</div>;
}

/* ─── Counter ────────────────────────────────────────────────────── */
function Cnt({v}:{v:string}){
  const r=useRef<HTMLSpanElement>(null);
  const ok=useRef(false);
  useEffect(()=>{
    const el=r.current; if(!el||ok.current) return;
    const raw=v.replace(/\./g,"").replace(",",".");
    const num=parseFloat(raw.replace(/[^0-9.]/g,""));
    if(isNaN(num)) return;
    const pre=v.match(/^[^0-9]*/)?.[0]??"";
    const suf=v.match(/[^0-9.,]+$/)?.[0]??"";
    const obs=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting||ok.current) return;
      ok.current=true;
      const t0=performance.now();
      const run=(now:number)=>{
        const t=Math.min((now-t0)/1100,1);
        const ev=1-Math.pow(1-t,3);
        const cur=Math.round(ev*num);
        el.textContent=pre+cur.toLocaleString("pt-BR")+suf;
        if(t<1) requestAnimationFrame(run); else el.textContent=v;
      };
      requestAnimationFrame(run);
    },{threshold:0.5});
    obs.observe(el); return ()=>obs.disconnect();
  },[v]);
  return <span ref={r}>{v}</span>;
}

/* ─── Marquee de clubes ──────────────────────────────────────────── */
function Marquee(){
  const ids=Array.from({length:24},(_,i)=>i+1);
  return(
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul className="flex items-center animate-marquee gap-11 w-max">
        {[...ids,...ids].map((n,i)=>(
          <li key={i} className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/clubes/clube-${n}.webp`} alt="" loading="lazy" className="h-9 w-auto opacity-60 hover:opacity-90 transition-opacity"/>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Bandeira de status (badge pequeno com cor dinâmica) ───────────
   cor é runtime → Tailwind JIT não gera a classe, então isso É style
   inline por necessidade técnica, não por escolha estética. */
function Tag({children,cor}:{children:React.ReactNode;cor:string}){
  return(
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] border"
      style={{ color:cor, borderColor:`${cor}45`, background:`${cor}14` }}
    >
      {children}
    </span>
  );
}

/* ─── VideoCard — masonry, com insígnia do resultado (papel) ───────── */
function VideoCard({id,nome,papel,cor}:{id:string;nome:string;papel?:string;cor:string}){
  const [on,setOn]=useState(false);
  return(
    <div
      className="h-full flex flex-col group relative rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] cursor-pointer" onClick={()=>setOn(true)}>
        {on?(
          <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={nome} allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
            allowFullScreen className="absolute inset-0 w-full h-full border-0"/>
        ):(
          <>
            <div className="absolute inset-0" style={{ background:`linear-gradient(150deg,#03151F,${cor}35)` }}/>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background:cor, boxShadow:`0 0 40px ${cor}80` }}
              >
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none"><polygon points="9,7 19,12 9,17" fill="#fff"/></svg>
              </div>
              <p className={`${FB} text-[11px] font-bold tracking-widest text-white/50`}>ASSISTIR</p>
            </div>
            {papel&&(
              <div className="absolute bottom-3 left-3 right-3">
                <span className="inline-flex max-w-full items-center rounded-lg px-2.5 py-1.5 text-[10.5px] font-bold text-white backdrop-blur-md bg-black/50 border border-white/10 truncate">
                  {papel}
                </span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="p-4">
        <div className="h-[3px] w-8 rounded-full mb-2.5" style={{ background:cor }}/>
        <p className={`${FD} text-base text-white leading-tight`}>{nome}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════════════════════ */
export default function CursoDetalhe({curso}:{curso:Curso}){
  const cor=COR[curso.area]??"#4096F2";
  const label=LBL[curso.area]??curso.area;
  const [tab,setTab]=useState<number|null>(0);
  const [sticky,setSticky]=useState(false);
  const url=curso.checkoutUrl??curso.externalUrl;
  const comFoto=curso.mentores?.filter(m=>m.foto)??[];
  const semFoto=curso.mentores?.filter(m=>!m.foto)??[];

  useEffect(()=>{
    const fn=()=>setSticky(window.scrollY>600);
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  return(
    <div className="bg-[#030712] overflow-x-clip">

      {/* ══════════════════════════════════════════════════════
          §1 HERO — mesh gradient dinâmico + bento cover
         ══════════════════════════════════════════════════════ */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
        {/* mesh gradients — cor é runtime, exige style */}
        <div className="absolute -top-40 right-0 w-[560px] h-[560px] rounded-full blur-[120px] opacity-30 pointer-events-none" style={{ background:cor }}/>
        <div className="absolute top-1/3 -left-40 w-[420px] h-[420px] rounded-full blur-[120px] opacity-[0.12] pointer-events-none bg-white"/>

        <div className={`relative max-w-6xl mx-auto px-6 lg:px-10 grid ${curso.capa?"lg:grid-cols-[1.15fr_0.85fr]":"grid-cols-1"} gap-10 lg:gap-16 items-stretch`}>
          <div className="flex flex-col justify-center">
            <FI>
              {/* breadcrumb */}
              <nav className={`${FB} flex items-center gap-2 mb-6 text-[11.5px]`}>
                <a href="/cursos" className="text-white/35 hover:text-white/60 transition-colors font-medium">Formações</a>
                <span className="text-white/15">›</span>
                <Tag cor={cor}>{label} · {curso.type}</Tag>
              </nav>

              {/* título — tipografia agressiva, tracking apertado */}
              <h1 className={`${FD} text-[38px] sm:text-5xl lg:text-6xl leading-tight tracking-tight text-white mb-5`}>
                {curso.title}
              </h1>

              {curso.subheadline&&(
                <p className={`${FB} text-[15px] lg:text-[17px] font-normal leading-relaxed text-white/45 max-w-lg mb-10`}>
                  {curso.subheadline}
                </p>
              )}

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 mb-12">
                <a href="#oferta" className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 shadow-[0_0_44px_rgba(16,185,129,0.35)] transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
                  <span className={`${FB} text-[15px] font-bold text-white`}>Garantir minha vaga</span>
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="#ementa" className={`${FB} text-[13px] font-semibold text-white/40 hover:text-white/70 transition-colors`}>
                  Ver o conteúdo ↓
                </a>
              </div>

              {/* stats */}
              {(curso.cargaHoraria||curso.numAulas||curso.formato)&&(
                <div className="flex flex-wrap gap-x-9 gap-y-4 border-t border-white/10 pt-7">
                  {[
                    curso.cargaHoraria&&{v:curso.cargaHoraria,l:"Carga horária"},
                    curso.numAulas&&{v:`${curso.numAulas} aulas`,l:"Ao vivo"},
                    curso.formato&&{v:curso.formato,l:"Formato"},
                  ].filter(Boolean).map((s:any,i)=>(
                    <div key={i}>
                      <div className={`${FD} text-2xl lg:text-3xl text-white`}>{s.v}</div>
                      <div className={`${FB} text-[9.5px] font-bold tracking-[0.14em] uppercase text-white/30 mt-1.5`}>{s.l}</div>
                    </div>
                  ))}
                </div>
              )}
            </FI>
          </div>

          {/* capa — cartão bento estirado à altura do texto */}
          {curso.capa&&(
            <FI d={100} className="hidden lg:block relative rounded-[28px] overflow-hidden border border-white/[0.06] min-h-[380px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={curso.capa} alt={curso.title} className="absolute inset-0 w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/10 to-transparent"/>
              <div className="absolute inset-0 rounded-[28px]" style={{ boxShadow:`inset 0 0 0 1.5px ${cor}40` }}/>
            </FI>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §2A DIFERENCIAIS — grid numerado, full-width, própria seção
         ══════════════════════════════════════════════════════ */}
      {curso.diferenciais&&curso.diferenciais.length>0&&(
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-[460px] h-[460px] rounded-full blur-[120px] opacity-[0.09] pointer-events-none" style={{ background:cor }}/>
          <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
            <FI className="mb-12 lg:mb-16 max-w-xl">
              <Tag cor={cor}>O que muda</Tag>
              <h2 className={`${FD} text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight text-white mt-5`}>
                POR QUE ESTA FORMAÇÃO É DIFERENTE
              </h2>
            </FI>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {curso.diferenciais.map((d,i)=>(
                <FI key={i} d={i*45} className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md p-5 hover:border-white/[0.14] hover:bg-white/[0.04] transition-all duration-300">
                  <span className={`${FD} text-3xl leading-none block mb-4`} style={{ color:`${cor}60` }}>{String(i+1).padStart(2,"0")}</span>
                  <p className={`${FB} text-[13px] font-medium text-white/70 leading-relaxed`}>{d}</p>
                </FI>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §2B PARA QUEM — layout assimétrico texto + checklist
         ══════════════════════════════════════════════════════ */}
      {curso.paraQuem&&curso.paraQuem.length>0&&(
        <section className="relative py-16 md:py-20 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
            <FI>
              <Tag cor={cor}>Pra quem é</Tag>
              <h2 className={`${FD} text-3xl sm:text-4xl leading-tight tracking-tight text-white mt-5`}>
                ESTA FORMAÇÃO<br/>É PRA VOCÊ SE...
              </h2>
            </FI>
            <div className="grid sm:grid-cols-2 gap-3">
              {curso.paraQuem.map((t,i)=>(
                <FI key={i} d={i*50} className="h-full flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md p-4 hover:bg-white/[0.04] transition-colors duration-300">
                  <svg width={15} height={15} viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
                    <path d="M4 10l4 4 8-8" stroke={cor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={`${FB} text-[13px] font-medium text-white/70 leading-relaxed`}>{t}</span>
                </FI>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §2C EXPERIÊNCIA PRÁTICA — banner de destaque + marquee
         ══════════════════════════════════════════════════════ */}
      {curso.experienciaPratica&&curso.experienciaPratica.length>0&&(
        <section className="relative py-16 md:py-20 overflow-hidden" style={{ background:`radial-gradient(ellipse 70% 60% at 75% 20%,${cor}14,transparent 65%)` }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background:`linear-gradient(90deg,transparent,${cor}80,transparent)` }}/>
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start mb-16">
              <FI>
                <Tag cor={cor}>Exclusivo Futebol Interativo</Tag>
                <h2 className={`${FD} text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight text-white mt-5 mb-5`}>
                  VOCÊ TERMINA DENTRO<br/>DE UM CLUBE PROFISSIONAL
                </h2>
                <p className={`${FB} text-[15px] text-white/45 leading-relaxed max-w-md mb-7`}>
                  Não termina o curso em casa. Você vive o dia a dia do departamento dentro de um dos nossos{" "}
                  <strong className="text-white/80 font-bold">+130 clubes parceiros</strong> espalhados pelo Brasil.
                </p>
                <a href="#oferta" className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-white transition-transform hover:-translate-y-0.5" style={{ background:cor, boxShadow:`0 8px 30px ${cor}50` }}>
                  <span className={`${FB} text-[14px] font-bold`}>Quero essa experiência</span>
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </FI>
              <FI d={100} className="grid sm:grid-cols-2 gap-2.5">
                {curso.experienciaPratica.map((t,i)=>(
                  <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md p-4">
                    <svg width={14} height={14} viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
                      <path d="M4 10l4 4 8-8" stroke={cor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={`${FB} text-[13px] font-medium text-white/65 leading-snug`}>{t}</span>
                  </div>
                ))}
              </FI>
            </div>

            {/* marquee de clubes */}
            <div className="border-t border-white/[0.06] pt-8">
              <p className={`${FB} text-center text-[9.5px] font-bold tracking-[0.3em] uppercase text-white/20 mb-4`}>+130 clubes parceiros</p>
              <Marquee/>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §3 EMENTA — timeline interativa
         ══════════════════════════════════════════════════════ */}
      {curso.ementa&&curso.ementa.length>0&&(
        <section id="ementa" className="relative py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <FI className="flex items-end justify-between flex-wrap gap-3 mb-14">
              <div>
                <p className={`${FB} text-[11px] font-bold tracking-[0.24em] uppercase text-white/35 mb-4`}>Conteúdo</p>
                <h2 className={`${FD} text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight text-white`}>O QUE VOCÊ VAI APRENDER</h2>
              </div>
              <span className={`${FD} text-lg`} style={{ color:`${cor}88` }}>{curso.ementa.length} módulos</span>
            </FI>

            <div className="grid sm:grid-cols-2 gap-4">
              {curso.ementa.map((item,i)=>{
                const op=tab===i;
                return(
                  <FI key={i} d={i*30} className="h-full">
                    <button
                      onClick={()=>setTab(op?null:i)}
                      className={`w-full h-full text-left rounded-2xl border p-5 backdrop-blur-md transition-all duration-300 ${op?"border-white/[0.16] bg-white/[0.05]":"border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.035]"}`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-2 ${FD} text-[12.5px] transition-colors duration-300`}
                          style={{ borderColor:op?cor:"rgba(255,255,255,0.12)", background:op?cor:"transparent", color:op?"#fff":"rgba(255,255,255,0.4)" }}
                        >
                          {String(i+1).padStart(2,"0")}
                        </span>
                        <span className={`${FB} flex-1 text-[14px] font-bold text-white leading-snug`}>{item.titulo}</span>
                        <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-300 ${op?"rotate-45":""}`} style={{ background:op?cor:"rgba(255,255,255,0.06)" }}>
                          <svg width={11} height={11} viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke={op?"#fff":"rgba(255,255,255,0.5)"} strokeWidth="2.5" strokeLinecap="round"/></svg>
                        </span>
                      </div>
                      <div className={`grid transition-[grid-template-rows] duration-300 ${op?"grid-rows-[1fr]":"grid-rows-[0fr]"}`}>
                        <div className="overflow-hidden">
                          {item.descricao&&<p className={`${FB} text-[13px] text-white/45 leading-relaxed pt-4 pl-[52px]`}>{item.descricao}</p>}
                        </div>
                      </div>
                    </button>
                  </FI>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §4 MENTORES — grid assíncrono estilo elite
         ══════════════════════════════════════════════════════ */}
      {curso.mentores&&curso.mentores.length>0&&(
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full blur-[120px] opacity-[0.08] pointer-events-none" style={{ background:cor }}/>
          <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
            <FI className="mb-10 lg:mb-14">
              <p className={`${FB} text-[11px] font-bold tracking-[0.24em] uppercase text-white/35 mb-3`}>Quem vai te ensinar</p>
              <h2 className={`${FD} text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight text-white`}>OS MENTORES</h2>
            </FI>

            {comFoto.length>0&&(
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-3">
                {comFoto.map((m,i)=>(
                  <FI key={i} d={i*55} className="group relative rounded-2xl overflow-hidden border border-white/[0.06] aspect-[3/4]">
                    <div className="absolute inset-0" style={{ background:`linear-gradient(155deg,#0A1E35,${cor}28)` }}/>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.foto} alt={m.nome} loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.opacity="0";}}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"/>
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <p className={`${FD} text-[13px] text-white leading-tight mb-1`}>{m.nome}</p>
                      <p className={`${FB} text-[10.5px] font-semibold leading-snug opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-300 overflow-hidden`} style={{ color:cor }}>
                        {m.bio}
                      </p>
                    </div>
                  </FI>
                ))}
              </div>
            )}
            {semFoto.length>0&&(
              <div className="grid sm:grid-cols-2 gap-3">
                {semFoto.map((m,i)=>(
                  <div key={i} className="flex items-center gap-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border" style={{ background:`${cor}20`, borderColor:`${cor}45` }}>
                      <span className={`${FD} text-sm`} style={{ color:cor }}>{m.nome.charAt(0)}</span>
                    </div>
                    <div>
                      <p className={`${FD} text-[13px] text-white leading-none`}>{m.nome}</p>
                      <p className={`${FB} text-[11px] text-white/40 mt-1`}>{m.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §5 DEPOIMENTOS — masonry
         ══════════════════════════════════════════════════════ */}
      {curso.depoimentos&&curso.depoimentos.length>0&&(
        <section className="relative py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <FI className="mb-10 lg:mb-14">
              <p className={`${FB} text-[11px] font-bold tracking-[0.24em] uppercase text-white/35 mb-3`}>Resultados reais</p>
              <h2 className={`${FD} text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight text-white`}>QUEM JÁ CURSOU E FOI CONTRATADO</h2>
            </FI>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-4 lg:gap-5">
              {curso.depoimentos.map((d,i)=>(
                <FI key={i} d={i*70} className="h-full">
                  <VideoCard id={d.videoUrl?ytId(d.videoUrl):""} nome={d.nome} papel={d.papel} cor={cor}/>
                </FI>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §6 STATS
         ══════════════════════════════════════════════════════ */}
      {curso.stats&&curso.stats.length>0&&(
        <section className="relative py-16 md:py-20 border-y border-white/[0.06]">
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ background:cor }}/>
          <div className="relative max-w-6xl mx-auto px-6 lg:px-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {curso.stats.map((s,i)=>(
              <FI key={i} d={i*70}>
                <div className={`${FD} text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white`}><Cnt v={s.valor}/></div>
                <div className={`${FB} text-[9.5px] font-bold tracking-[0.18em] uppercase text-white/35 mt-3`}>{s.label}</div>
              </FI>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §7 OFERTA — painel VIP
         ══════════════════════════════════════════════════════ */}
      {(curso.preco||url||curso.hubspotFormId)&&(
        <section id="oferta" className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.1] pointer-events-none" style={{ background:cor }}/>
          <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
            <FI className="mb-10">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:cor }}/>
                <p className={`${FB} text-[11px] font-bold tracking-[0.24em] uppercase text-white/35`}>Última etapa · vagas limitadas</p>
              </div>
              <h2 className={`${FD} text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight text-white mb-8`}>GARANTA SUA VAGA AGORA</h2>
              <div className="flex flex-wrap gap-x-7 gap-y-3">
                {["Garantia de 12 meses","Compra 100% segura","+4.500 alunos formados","Acesso vitalício"].map(t=>(
                  <div key={t} className="flex items-center gap-2">
                    <svg width={13} height={13} viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke={cor} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className={`${FB} text-[12.5px] font-semibold text-white/45`}>{t}</span>
                  </div>
                ))}
              </div>
            </FI>

            <div className="grid lg:grid-cols-2 gap-6 items-start">
              <CursoCTA curso={curso} cor={cor}/>
              {curso.hubspotPortalId&&curso.hubspotFormId&&(
                <FI d={100}>
                  <div className="flex flex-col rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md p-7 lg:p-9">
                    <p className={`${FD} text-lg lg:text-xl text-white mb-2 leading-tight`}>FALE COM UM CONSULTOR</p>
                    <p className={`${FB} text-[13px] text-white/35 mb-6 leading-relaxed`}>Tire suas dúvidas antes de se inscrever.</p>
                    <style dangerouslySetInnerHTML={{__html:`
                      .hs-form-private input[type=text],.hs-form-private input[type=email],.hs-form-private input[type=tel],.hs-form-private select{background:rgba(255,255,255,0.06)!important;border:1px solid rgba(255,255,255,0.12)!important;border-radius:10px!important;color:#F4F4F4!important;padding:11px 14px!important;font-size:13.5px!important;width:100%!important;box-sizing:border-box!important;outline:none!important;}
                      .hs-form-private input::placeholder{color:rgba(169,216,245,0.3)!important;}
                      .hs-form-private select option{background:#0A1E35;color:#F4F4F4;}
                      .hs-form-private label{font-size:10px!important;font-weight:700!important;letter-spacing:0.1em!important;text-transform:uppercase!important;color:rgba(169,216,245,0.45)!important;margin-bottom:6px!important;display:block!important;}
                      .hs-form-private .hs-form-field{margin-bottom:14px!important;}
                      .hs-form-private .hs-error-msgs{list-style:none!important;}
                      .hs-form-private .hs-error-msgs li{color:#ff6b6b!important;font-size:11px!important;margin-top:4px!important;}
                      .hs-form-private .hs-button{width:100%!important;padding:14px!important;background:linear-gradient(135deg,#08C27A,#059669)!important;border:none!important;border-radius:12px!important;color:#fff!important;font-size:14px!important;font-weight:700!important;cursor:pointer!important;margin-top:8px!important;box-shadow:0 8px 24px rgba(8,194,122,0.4)!important;}
                      .hs-form-private .hs-button:hover{transform:translateY(-2px)!important;}
                      .hs-form-private .inputs-list{list-style:none!important;}
                      .hs-form-private .inputs-list li label{text-transform:none!important;font-size:13px!important;color:rgba(244,244,244,0.7)!important;letter-spacing:0!important;display:flex!important;align-items:center!important;gap:8px!important;}
                    `}}/>
                    <div className="flex-1">
                      <CursoForm curso={curso}/>
                    </div>
                  </div>
                </FI>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §8 GARANTIA
         ══════════════════════════════════════════════════════ */}
      {curso.garantiaTexto&&(
        <section className="px-6 lg:px-10 pb-20 md:pb-28">
          <div className="max-w-6xl mx-auto">
            <FI>
              <div className="relative overflow-hidden rounded-[28px] border p-8 sm:p-12" style={{ borderColor:`${cor}35`, background:"linear-gradient(145deg,#030712,#021629)" }}>
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[70px] opacity-25 pointer-events-none" style={{ background:cor }}/>
                <div className="relative flex flex-col sm:flex-row items-start gap-6 mb-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border-2" style={{ background:`${cor}22`, borderColor:`${cor}55` }}>
                    <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={cor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 12l2 2 4-4" stroke={cor} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className={`${FB} text-[10px] font-bold tracking-[0.22em] uppercase mb-2.5`} style={{ color:cor }}>Garantia Futebol Interativo</p>
                    <h3 className={`${FD} text-2xl sm:text-3xl text-white leading-tight mb-3`}>SE NÃO FUNCIONAR,<br/>DEVOLVEMOS TUDO</h3>
                    <p className={`${FB} text-sm text-white/40 leading-relaxed max-w-lg`}>{curso.garantiaTexto}</p>
                  </div>
                </div>
                <div className="relative flex justify-end">
                  <a href="#oferta" className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3.5 transition-transform hover:-translate-y-0.5">
                    <span className={`${FB} text-sm font-bold text-white`}>Garantir minha vaga</span>
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            </FI>
          </div>
        </section>
      )}

      {/* sticky mobile */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-between gap-3 px-5 py-3 border-t border-white/[0.08] bg-black/90 backdrop-blur-xl transition-transform duration-300 ${sticky?"translate-y-0":"translate-y-full"}`}>
        <div>
          <p className={`${FD} text-[13px] text-white leading-none`}>
            {curso.preco?.match(/R\$\s*[\d.,]+/)?.[0]}
            <span className={`${FB} text-[10px] text-white/35 ml-1`}>/mês</span>
          </p>
          <p className={`${FB} text-[10px] text-white/30 mt-0.5`}>
            ou R$ {curso.precoAvista?.replace(/^R\$\s*/,"")} à vista
          </p>
        </div>
        <a href="#oferta" className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5">
          <span className={`${FB} text-[13.5px] font-bold text-white`}>Garantir vaga</span>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>

      {/* rodapé */}
      <div className="border-t border-white/[0.05] py-5 text-center">
        <a href="/cursos" className={`${FB} text-[11.5px] font-semibold text-white/20 hover:text-white/40 transition-colors tracking-wide`}>← Ver todas as formações</a>
      </div>
    </div>
  );
}