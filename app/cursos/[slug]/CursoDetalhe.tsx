"use client";
import { useState, useEffect, useRef } from "react";
import type { Curso } from "@/lib/cursos";
import CursoCTA from "./CursoCTA";
import MapaClubes from "@/components/MapaClubes";
import ConsultorFloatingButton from "@/components/ConsultorFloatingButton";
import { AREA_BY_CURSO_AREA } from "@/components/HubspotContactForm";

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
  "tecnica-e-tatica":"Técnico e Tático","comunicacao-marketing":"Comunicação e Marketing",
  "saude":"Saúde e Performance","gestao-e-operacao":"Gestão e Jurídico",
};
function ytId(u:string){ return u.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)?.[1]??""; }

/* ─── FadeIn — nunca fica permanentemente invisível ────────────────
   comportamento (não visual), por isso continua controlado via JS:
   Tailwind não tem "anime quando entrar na viewport" sem JS por trás.
   Aceita `style` além de `className` porque alguns usos precisam de
   valores runtime (cor dinâmica) que o Tailwind JIT não gera em build. */
function FI({children,d=0,y=18,className="",style}:{children:React.ReactNode;d?:number;y?:number;className?:string;style?:React.CSSProperties}){
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
  return <div ref={r} className={className} style={style}>{children}</div>;
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

/* ─── VideoCard — usa a capa real do YouTube; clicar avisa a página
   pra abrir o modal grande (mesmo padrão da página /experiencia-pratica),
   em vez de trocar pra um iframe embutido no próprio card ────────────── */
function VideoCard({id,nome,papel,cor,onPlay}:{id:string;nome:string;papel?:string;cor:string;onPlay:()=>void}){
  const thumb=`https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  return(
    <div className="h-full flex flex-col group relative rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-1">
      <div className="relative aspect-[4/5] cursor-pointer bg-black" onClick={onPlay}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt={nome} loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/35"/>
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
      </div>
      <div className="p-5">
        <div className="h-[3px] w-8 rounded-full mb-3" style={{ background:cor }}/>
        <p className={`${FD} text-lg text-white leading-tight`}>{nome}</p>
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
  const [tab,setTab]=useState<number|null>(null);
  const [sticky,setSticky]=useState(false);
  const [modalVideo,setModalVideo]=useState<{id:string;nome:string}|null>(null);
  const url=curso.checkoutUrl??curso.externalUrl;

  useEffect(()=>{
    const fn=()=>setSticky(window.scrollY>600);
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  // fecha o modal de vídeo com Esc e trava o scroll da página enquanto aberto
  useEffect(()=>{
    if(!modalVideo) return;
    const onKey=(e:KeyboardEvent)=>{ if(e.key==="Escape") setModalVideo(null); };
    window.addEventListener("keydown",onKey);
    const prevOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return ()=>{
      window.removeEventListener("keydown",onKey);
      document.body.style.overflow=prevOverflow;
    };
  },[modalVideo]);

  return(
    <div className="bg-[#030712] overflow-x-clip">

      {/* ══════════════════════════════════════════════════════
          §1 HERO — mesh gradient dinâmico + bento cover
         ══════════════════════════════════════════════════════ */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        {/* mesh gradients — cor é runtime, exige style */}
        <div className="absolute -top-40 right-0 w-[640px] h-[640px] rounded-full blur-[130px] opacity-40 pointer-events-none" style={{ background:cor }}/>
        <div className="absolute top-1/3 -left-40 w-[460px] h-[460px] rounded-full blur-[130px] opacity-[0.14] pointer-events-none bg-white"/>
        <div className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{ backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)", backgroundSize:"28px 28px" }}/>

        <div className={`relative max-w-6xl mx-auto px-6 lg:px-10 grid ${(curso.heroImage||curso.capa)?"lg:grid-cols-[1.1fr_0.9fr]":"grid-cols-1"} gap-12 lg:gap-14 items-start`}>
          <div className="flex flex-col justify-center">
            <FI>
              {/* breadcrumb */}
              <nav className={`${FB} flex items-center gap-2 mb-7 text-[11.5px]`}>
                <a href="/cursos" className="text-white/35 hover:text-white/60 transition-colors font-medium">Formações</a>
                <span className="text-white/15">›</span>
                <Tag cor={cor}>{label} · {curso.type}</Tag>
              </nav>

              {/* título — tipografia agressiva, tracking apertado */}
              <h1 className={`${FD} text-[40px] sm:text-6xl lg:text-[68px] leading-[0.98] tracking-tight text-white mb-6`}>
                {curso.heroTitle ?? curso.title}
              </h1>

              {curso.subheadline&&(
                <p className={`${FB} text-[16px] lg:text-[18px] font-normal leading-relaxed text-white/50 max-w-lg mb-10`}>
                  {curso.subheadline}
                </p>
              )}

              {/* imagem dos mentores — versão mobile/tablet, aparece aqui logo depois
                  do subtítulo (pedido explícito). Acima de lg, essa cópia fica oculta
                  e a versão "de verdade" reaparece na coluna bento à direita. */}
              {(curso.heroImage||curso.capa)&&(
                <div className="lg:hidden relative mb-10">
                  <div className={`relative rounded-[28px] overflow-hidden border shadow-2xl ${curso.heroImage?"aspect-[1091/885]":"aspect-[4/3]"}`} style={{ borderColor:`${cor}35`, boxShadow:`0 30px 70px -24px rgba(0,0,0,0.7), 0 0 0 1px ${cor}20` }}>
                    {curso.heroImage ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={curso.heroImage} alt={curso.title} className="absolute inset-0 w-full h-full object-contain object-bottom"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/50 via-transparent to-transparent"/>
                      </>
                    ):(
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={curso.capa} alt={curso.title} className="absolute inset-0 w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/15 to-transparent"/>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#030712]/40"/>
                      </>
                    )}
                    <div className="absolute inset-0 rounded-[28px]" style={{ boxShadow:`inset 0 0 0 1.5px ${cor}45` }}/>
                    {!curso.heroImage&&(
                      <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border backdrop-blur-md px-4 py-3.5" style={{ borderColor:`${cor}40`, background:"rgba(3,7,18,0.55)" }}>
                        <div className="flex -space-x-2.5 flex-shrink-0">
                          {(curso.mentores??[]).slice(0,3).map((m,i)=>(
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={i} src={m.foto} alt="" className="w-8 h-8 rounded-full object-cover object-top border-2" style={{ borderColor:"#030712" }} onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
                          ))}
                        </div>
                        <p className={`${FB} text-[11.5px] font-semibold text-white/80 leading-snug`}>
                          Mentores atuando em <span className="text-white font-bold">clubes profissionais</span> agora
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <a href="#oferta" className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-9 py-4.5 shadow-[0_0_50px_rgba(16,185,129,0.4)] transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
                  <span className={`${FB} text-[15.5px] font-bold text-white`}>Garantir minha vaga</span>
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="#ementa" className={`${FB} inline-flex items-center py-2.5 px-1 text-[13.5px] font-semibold text-white/40 hover:text-white/70 transition-colors`}>
                  Ver o conteúdo ↓
                </a>
              </div>
            </FI>
          </div>

          {/* capa — cartão bento com selo flutuante, borda em glow e moldura mais presente.
              Quando existe heroImage (ex: foto real dos mentores, fundo transparente),
              usa object-contain pra não cortar nada e pula o selo flutuante — a própria
              foto já mostra quem são os mentores e os clubes, o selo ficaria redundante.
              Só aparece a partir de lg — no mobile/tablet, a cópia acima (logo após o
              subtítulo) já assume esse papel. */}
          {(curso.heroImage||curso.capa)&&(
            <FI d={100} className="hidden lg:block relative">
              {/* imagem 100% visível (sem cortar nada) — container um pouco mais "alto"
                  que a proporção exata do arquivo (1091x849), só pra sobrar um respiro
                  pequeno no topo. object-bottom empurra a imagem pra base, deixando
                  esse respiro em cima em vez de espalhado nos 4 lados */}
              <div className={`relative rounded-[32px] overflow-hidden border shadow-2xl ${curso.heroImage?"aspect-[1091/885]":"aspect-[4/3] lg:aspect-auto lg:min-h-[540px]"}`} style={{ borderColor:`${cor}35`, boxShadow:`0 40px 90px -30px rgba(0,0,0,0.7), 0 0 0 1px ${cor}20` }}>
                {curso.heroImage ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={curso.heroImage} alt={curso.title} className="absolute inset-0 w-full h-full object-contain object-bottom"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/50 via-transparent to-transparent"/>
                  </>
                ):(
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={curso.capa} alt={curso.title} className="absolute inset-0 w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/15 to-transparent"/>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#030712]/40"/>
                  </>
                )}
                <div className="absolute inset-0 rounded-[32px]" style={{ boxShadow:`inset 0 0 0 1.5px ${cor}45` }}/>

                {/* selo flutuante — só quando não há foto real dos mentores */}
                {!curso.heroImage&&(
                  <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border backdrop-blur-md px-4 py-3.5" style={{ borderColor:`${cor}40`, background:"rgba(3,7,18,0.55)" }}>
                    <div className="flex -space-x-2.5 flex-shrink-0">
                      {(curso.mentores??[]).slice(0,3).map((m,i)=>(
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={i} src={m.foto} alt="" className="w-8 h-8 rounded-full object-cover object-top border-2" style={{ borderColor:"#030712" }} onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
                      ))}
                    </div>
                    <p className={`${FB} text-[11.5px] font-semibold text-white/80 leading-snug`}>
                      Mentores atuando em <span className="text-white font-bold">clubes profissionais</span> agora
                    </p>
                  </div>
                )}
              </div>

              {/* glow decorativo atrás do cartão */}
              <div className="absolute -inset-4 -z-10 rounded-[40px] blur-2xl opacity-40 pointer-events-none" style={{ background:cor }}/>
            </FI>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §2A DIFERENCIAIS — grid numerado, full-width, própria seção
         ══════════════════════════════════════════════════════ */}
      {curso.diferenciais&&curso.diferenciais.length>0&&(
        <section className="relative py-14 md:py-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.12] pointer-events-none" style={{ background:cor }}/>
          <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
            <FI className="mb-10 lg:mb-14 max-w-2xl">
              <Tag cor={cor}>O que só existe aqui</Tag>
              <h2 className={`${FD} text-3xl sm:text-5xl lg:text-[52px] leading-[1.02] tracking-tight text-white mt-6`}>
                POR QUE ESTA FORMAÇÃO NÃO EXISTE EM NENHUM OUTRO LUGAR
              </h2>
            </FI>

            {/* grid simétrico 2x2 — mesmo peso visual pra todo mundo, sem numeral gigante
                sobreposto. O primeiro card ganha destaque de cor + o marquee de clubes
                embaixo, mas ocupa o mesmo espaço que os outros três. */}
            <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
              {curso.diferenciais.map((d,i)=>{
                const [lead,restoTxt]=d.split("|");
                const destaque=i===0;
                return(
                  <FI key={i} d={i*60} className="h-full min-w-0">
                    {/* hover fica no wrapper INTERNO, não no elemento controlado pelo FI —
                        o FI seta transform/transition inline pra animar a entrada, e isso
                        sobrescrevia qualquer classe hover:-translate-y aplicada no mesmo nó,
                        travando o efeito. Separando os dois, o hover volta a funcionar.
                        min-w-0 é essencial aqui: sem ele, o item do grid usa o min-content
                        do card (que inclui o marquee de clubes, w-max — larguíssimo) pra
                        decidir a largura da própria coluna, forçando TODOS os cards dessa
                        coluna (não só o 01) a ficarem mais largos que a tela no mobile,
                        cortando o texto em vez de quebrar a linha. */}
                    <div
                      className={`group h-full min-w-0 rounded-[28px] border p-7 lg:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${destaque?"":"border-white/[0.07] bg-white/[0.02] hover:border-white/[0.16] hover:bg-white/[0.04]"}`}
                      style={destaque?{ borderColor:`${cor}45`, background:`linear-gradient(155deg,${cor}22,rgba(255,255,255,0.02))` }:undefined}
                    >
                      {/* o mesmo ícone de escudo repetido nos 4 cards não agregava nada —
                          só a numeração, maior e mais evidente, já comunica a ordem */}
                      <div className="flex items-center gap-3 mb-5">
                        <span
                          className={`${FD} flex items-center justify-center w-10 h-10 rounded-xl border-2 text-[15px] flex-shrink-0`}
                          style={{ borderColor:`${cor}55`, background:"#030712", color:cor }}
                        >
                          {String(i+1).padStart(2,"0")}
                        </span>
                      </div>
                      <p className={`${FB} text-[15px] lg:text-[16px] leading-relaxed flex-1`}>
                        <strong className="text-white font-bold">{lead}</strong>{restoTxt?<><br/><span className="text-white/60 inline-block mt-1.5">{restoTxt}</span></>:null}
                      </p>

                      {/* clubes parceiros passando em destaque — só no card 01, prova visual */}
                      {destaque&&(
                        <div className="mt-7 pt-6 border-t border-white/10 overflow-hidden w-full [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] -mx-1">
                          <ul className="flex items-center animate-marquee gap-7 w-max">
                            {[...Array.from({length:16},(_,i)=>i+1),...Array.from({length:16},(_,i)=>i+1)].map((n,idx)=>(
                              <li key={idx} className="flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`/images/clubes/clube-${n}.webp`} alt="" loading="lazy" className="h-7 w-auto opacity-60"/>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </FI>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §2B PARA QUEM — layout assimétrico texto + checklist
         ══════════════════════════════════════════════════════ */}
      {curso.paraQuem&&curso.paraQuem.length>0&&(
        <section className="relative py-14 md:py-20 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <FI className="mb-10 lg:mb-12 max-w-2xl">
              <Tag cor={cor}>Pra quem é</Tag>
              <h2 className={`${FD} text-3xl sm:text-5xl lg:text-[50px] leading-[1.02] tracking-tight text-white mt-6`}>
                ESTA FORMAÇÃO É PRA VOCÊ SE...
              </h2>
            </FI>

            <div className="relative grid lg:grid-cols-2 gap-5 lg:gap-0">
              {/* lado esquerdo — é pra você se */}
              <div className="relative rounded-[28px] lg:rounded-r-none border border-white/[0.08] lg:border-r-0 p-8 lg:p-11" style={{ background:`linear-gradient(155deg,${cor}14,rgba(255,255,255,0.02))` }}>
                <p className={`${FB} text-[11px] font-bold tracking-[0.2em] uppercase mb-6`} style={{ color:cor }}>É pra você se</p>
                <div className="flex flex-col gap-4">
                  {curso.paraQuem.map((t,i)=>(
                    <FI key={i} d={i*50} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background:`${cor}22` }}>
                        <svg width={10} height={10} viewBox="0 0 20 20" fill="none">
                          <path d="M4 10l4 4 8-8" stroke={cor} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className={`${FB} text-[14px] font-medium text-white/80 leading-relaxed`}>{t}</span>
                    </FI>
                  ))}
                </div>
              </div>

              {/* divisor central com selo — só no desktop */}
              <div className="hidden lg:flex absolute left-1/2 top-0 bottom-0 w-px bg-white/10 items-center justify-center">
                <span className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 bg-[#030712] text-white/40 flex-shrink-0">
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </span>
              </div>

              {/* lado direito — não é pra você se */}
              {curso.naoEPara&&curso.naoEPara.length>0&&(
                <div className="relative rounded-[28px] lg:rounded-l-none border border-red-500/[0.15] lg:border-l-0 bg-red-500/[0.03] p-8 lg:p-11">
                  <p className={`${FB} text-[11px] font-bold tracking-[0.2em] uppercase text-red-300/70 mb-6`}>Não é pra você se</p>
                  <div className="flex flex-col gap-4">
                    {curso.naoEPara.map((t,i)=>(
                      <FI key={i} d={i*50} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 bg-red-500/15">
                          <svg width={10} height={10} viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#f87171" strokeOpacity="0.8" strokeWidth="2.4" strokeLinecap="round"/></svg>
                        </span>
                        <span className={`${FB} text-[14px] font-medium text-white/65 leading-relaxed`}>{t}</span>
                      </FI>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §2C EXPERIÊNCIA PRÁTICA — banner de destaque + marquee
         ══════════════════════════════════════════════════════ */}
      {curso.experienciaPratica&&curso.experienciaPratica.length>0&&(
        <section className="relative py-14 md:py-20 overflow-hidden" style={{ background:`radial-gradient(ellipse 70% 60% at 75% 20%,${cor}18,transparent 65%)` }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background:`linear-gradient(90deg,transparent,${cor}80,transparent)` }}/>
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-start mb-10">
              <FI>
                <Tag cor={cor}>Exclusivo Futebol Interativo</Tag>
                <h2 className={`${FD} text-3xl sm:text-4xl lg:text-[48px] leading-[1.02] tracking-tight text-white mt-6 mb-6`}>
                  SUA ÚLTIMA AULA É DENTRO<br/>DE UM CLUBE PROFISSIONAL
                </h2>
                <p className={`${FB} text-[15.5px] text-white/50 leading-relaxed max-w-md mb-2`}>
                  Não termina o curso em casa: são até 2 semanas de imersão no dia a dia do departamento, dentro de um dos nossos{" "}
                  <strong className="text-white/85 font-bold">+130 clubes parceiros</strong> espalhados pelo Brasil.
                </p>
                {/* nota discreta — a lista ao lado é o leque de possibilidades da imersão,
                    não uma checklist obrigatória; não precisa de um bloco de destaque próprio */}
                <p className={`${FB} text-[12px] text-white/30 leading-relaxed mb-8`}>
                  Atividades possíveis, o dia a dia varia por clube.
                </p>
                <a href="#oferta" className="inline-flex items-center gap-2.5 rounded-2xl px-7 py-4 text-white transition-transform hover:-translate-y-0.5" style={{ background:cor, boxShadow:`0 12px 36px ${cor}55` }}>
                  <span className={`${FB} text-[14.5px] font-bold`}>Quero essa experiência</span>
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </FI>
              <FI d={100} className="relative">
                <div className="absolute left-[13px] top-2 bottom-2 w-px" style={{ background:`linear-gradient(to bottom, ${cor}60, transparent)` }}/>
                <div className="flex flex-col gap-5">
                  {curso.experienciaPratica.map((t,i)=>(
                    <div key={i} className="relative flex items-start gap-4 pl-0">
                      <span className={`${FD} relative z-10 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10.5px] border-2`} style={{ borderColor:cor, background:"#030712", color:cor }}>
                        {i+1}
                      </span>
                      <span className={`${FB} text-[14px] font-medium text-white/70 leading-relaxed pt-0.5`}>{t}</span>
                    </div>
                  ))}
                </div>
              </FI>
            </div>
          </div>
        </section>
      )}

      {/* mapa interativo — mostra os clubes parceiros por estado, reforça "você pratica perto de você".
          A transição fade evita o corte seco entre o fundo escuro desta seção e o navy do mapa. */}
      {curso.experienciaPratica&&curso.experienciaPratica.length>0&&(
        <>
          <div className="h-16 md:h-20 -mb-16 md:-mb-20 relative pointer-events-none" style={{ background:"linear-gradient(to bottom, transparent, #03263F)" }}/>
          <MapaClubes/>
        </>
      )}

      {/* ══════════════════════════════════════════════════════
          §3 EMENTA — timeline interativa
         ══════════════════════════════════════════════════════ */}
      {curso.ementa&&curso.ementa.length>0&&(
        <section id="ementa" className="relative py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            <FI className="flex items-end justify-between flex-wrap gap-3 mb-10">
              <div>
                <p className={`${FB} text-[11px] font-bold tracking-[0.24em] uppercase text-white/35 mb-4`}>Conteúdo</p>
                <h2 className={`${FD} text-3xl sm:text-5xl lg:text-[50px] leading-[1.02] tracking-tight text-white`}>O QUE VOCÊ VAI APRENDER</h2>
              </div>
              <span className={`${FD} text-lg`} style={{ color:`${cor}88` }}>{curso.ementa.length} módulos</span>
            </FI>

            {(() => {
              const GRUPOS: { key: "desempenho"|"mercado"|"entrada"; label: string }[] = [
                { key: "desempenho", label: "Análise de Desempenho" },
                { key: "mercado",    label: "Análise de Mercado" },
                { key: "entrada",    label: "Sua Entrada no Mercado" },
              ];
              const AMARELO = "#F5C542";
              let contador = 0;
              return GRUPOS.map((g) => {
                const itens = curso.ementa!.filter(it => (it.grupo ?? "desempenho") === g.key);
                if (itens.length === 0) return null;
                const destaque = g.key === "entrada";
                return (
                  <div key={g.key} className="mb-10 last:mb-0">
                    <FI className="mb-5 flex items-center gap-3">
                      <span className="h-[3px] w-7 rounded-full" style={{ background: destaque ? AMARELO : cor }} />
                      <p className={`${FB} text-[12px] font-bold tracking-[0.14em] uppercase`} style={{ color: destaque ? AMARELO : "rgba(255,255,255,0.5)" }}>{g.label}</p>
                    </FI>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {itens.map((item) => {
                        const i = contador++;
                        const op = tab === i;
                        return (
                          <FI key={i} d={i * 30} className="h-full">
                            <button
                              onClick={() => setTab(op ? null : i)}
                              className={`w-full h-full text-left rounded-2xl border p-5 backdrop-blur-md transition-all duration-300 ${op ? "bg-white/[0.05]" : "bg-white/[0.02] hover:bg-white/[0.035]"}`}
                              style={{ borderColor: op ? (destaque ? `${AMARELO}80` : "rgba(255,255,255,0.16)") : destaque ? `${AMARELO}30` : "rgba(255,255,255,0.06)" }}
                            >
                              <div className="flex items-center gap-4">
                                <span
                                  className="flex-shrink-0 w-2.5 h-2.5 rounded-full transition-colors duration-300"
                                  style={{ background: op ? (destaque ? AMARELO : cor) : "rgba(255,255,255,0.25)" }}
                                />
                                <span className={`${FB} flex-1 text-[14px] font-bold text-white leading-snug`}>{item.titulo}</span>
                                <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-300 ${op ? "rotate-45" : ""}`} style={{ background: op ? (destaque ? AMARELO : cor) : "rgba(255,255,255,0.06)" }}>
                                  <svg width={11} height={11} viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke={op ? "#03263F" : "rgba(255,255,255,0.5)"} strokeWidth="2.5" strokeLinecap="round"/></svg>
                                </span>
                              </div>
                              <div className={`grid transition-[grid-template-rows] duration-300 ${op ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                <div className="overflow-hidden">
                                  {item.descricao && <p className={`${FB} text-[13px] text-white/45 leading-relaxed pt-4 pl-[26px]`}>{item.descricao}</p>}
                                </div>
                              </div>
                            </button>
                          </FI>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §4 MENTORES — grid assíncrono estilo elite
         ══════════════════════════════════════════════════════ */}
      {curso.mentores&&curso.mentores.length>0&&(() => {
        // o card de "mentor âncora" foi removido — todo mentor (inclusive quem tinha
        // ancora:true) entra na mesma grade, sem tratamento especial
        const restoComFoto = curso.mentores.filter(m => m.foto);
        const restoSemFoto = curso.mentores.filter(m => !m.foto);
        return(
        <section className="relative pt-14 md:pt-20 pb-10 md:pb-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-[460px] h-[460px] rounded-full blur-[130px] opacity-[0.1] pointer-events-none" style={{ background:cor }}/>
          <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
            <FI className="mb-8 lg:mb-10">
              <p className={`${FB} text-[11px] font-bold tracking-[0.24em] uppercase text-white/35 mb-3`}>Quem vai te ensinar</p>
              <h2 className={`${FD} text-3xl sm:text-5xl lg:text-[50px] leading-[1.02] tracking-tight text-white mb-4`}>MENTORES QUE ESTÃO NOS CLUBES AGORA</h2>
              {curso.mentores.length>0&&(
                <p className={`${FB} text-[15px] text-white/45`}>quem te dá aula na segunda, analisa jogo na quarta.</p>
              )}
            </FI>

            {restoComFoto.length>0&&(
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5 mb-4">
                {restoComFoto.map((m,i)=>(
                  <FI key={i} d={i*55}>
                    {/* hover no wrapper INTERNO — o FI seta transform inline pra animar a
                        entrada e sobrescreveria qualquer classe hover:-translate-y aplicada
                        no mesmo nó (mesmo caso já visto nos cards de diferenciais) */}
                    <div className="group rounded-[22px] overflow-hidden border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.22] hover:-translate-y-1.5 transition-all duration-300 shadow-[0_16px_36px_-18px_rgba(0,0,0,0.7)]">
                      {/* object-contain: mostra 100% da foto, sem cortar nada (escudo,
                          uniforme, etc.) — o preço disso é que fotos com proporções
                          diferentes aparecem em tamanhos distintos dentro do card */}
                      <div className="relative aspect-[4/4.3] overflow-hidden" style={{ background:`linear-gradient(155deg,#0A1E35,${cor}28)` }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.foto} alt={m.nome} loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.opacity="0";}}
                          className="absolute inset-0 w-full h-full object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.06]"/>
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#030712]/70 to-transparent pointer-events-none"/>
                      </div>
                      <div className="p-4 pt-3.5">
                        <div className="h-[3px] w-7 rounded-full mb-2.5" style={{ background:cor }}/>
                        <p className={`${FD} text-[15.5px] text-white leading-tight mb-1`}>{m.nome}</p>
                        <p className={`${FB} text-[10.5px] font-semibold leading-snug`} style={{ color:cor }}>
                          {m.bio}
                        </p>
                      </div>
                    </div>
                  </FI>
                ))}
              </div>
            )}
            {restoSemFoto.length>0&&(
              <div className="grid sm:grid-cols-2 gap-3.5">
                {restoSemFoto.map((m,i)=>(
                  <div key={i} className="flex items-center gap-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2" style={{ background:`${cor}20`, borderColor:`${cor}45` }}>
                      <span className={`${FD} text-base`} style={{ color:cor }}>{m.nome.charAt(0)}</span>
                    </div>
                    <div>
                      <p className={`${FD} text-[14px] text-white leading-none`}>{m.nome}</p>
                      <p className={`${FB} text-[11.5px] text-white/45 mt-1.5`}>{m.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* fechamento — contagem + CTA, reforça "só ensina quem faz" */}
            <FI className="mt-8 pt-6 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-4">
              <p className={`${FB} text-[13.5px] font-semibold text-white/50`}>{curso.mentores.length} mentores · todos atuando em clubes profissionais hoje</p>
              <a href="#ementa" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-white transition-transform hover:-translate-y-0.5" style={{ background:cor }}>
                <span className={`${FB} text-[13px] font-bold`}>Aprenda com eles</span>
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </FI>
          </div>
        </section>
        );
      })()}

      {/* ══════════════════════════════════════════════════════
          §5 DEPOIMENTOS — masonry
         ══════════════════════════════════════════════════════ */}
      {curso.depoimentos&&curso.depoimentos.length>0&&(
        <section className="relative pt-6 md:pt-8 pb-12 md:pb-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <FI className="mb-8 lg:mb-10">
              <p className={`${FB} text-[11px] font-bold tracking-[0.24em] uppercase text-white/35 mb-3`}>Resultados reais</p>
              <h2 className={`${FD} text-3xl sm:text-5xl lg:text-[50px] leading-[1.02] tracking-tight text-white`}>QUEM JÁ CURSOU E FOI CONTRATADO</h2>
            </FI>
            {/* nº de colunas acompanha a contagem real de depoimentos — evita sobrar
                uma coluna vazia quando o curso tem menos de 3 vídeos. Classes estáticas
                (não geradas dinamicamente) pra garantir que o Tailwind as compile. */}
            <div className={`grid items-stretch gap-16 lg:gap-20 ${
              curso.depoimentos.length===1 ? "grid-cols-1 max-w-sm mx-auto" :
              curso.depoimentos.length===2 ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto" :
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {curso.depoimentos.map((d,i)=>(
                <FI key={i} d={i*70} className="h-full">
                  <VideoCard id={d.videoUrl?ytId(d.videoUrl):""} nome={d.nome} papel={d.papel} cor={cor} onPlay={()=>setModalVideo({id:d.videoUrl?ytId(d.videoUrl):"",nome:d.nome})}/>
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
        <section className="relative py-12 md:py-16 overflow-hidden" style={{ background:cor }}>
          {/* removi a textura diagonal de fundo — ela só deixava a faixa poluída;
              agora o número grande é o próprio elemento decorativo */}
          <div className="relative max-w-6xl mx-auto px-6 lg:px-10 grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-4 text-center">
            {curso.stats.map((s,i)=>(
              <FI key={i} d={i*70} className="px-2 min-w-0">
                <div className={`${FD} text-4xl sm:text-6xl lg:text-7xl tracking-tight`} style={{ color:"#03151F" }}><Cnt v={s.valor}/></div>
                <div className={`${FB} text-[9.5px] font-bold tracking-[0.18em] uppercase mt-4`} style={{ color:"rgba(3,21,31,0.65)" }}>{s.label}</div>
              </FI>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §7 OFERTA — painel VIP
         ══════════════════════════════════════════════════════ */}
      {(curso.preco||url||curso.hubspotFormId)&&(
        <section id="oferta" className="relative py-16 md:py-20 overflow-hidden">
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.1] pointer-events-none" style={{ background:cor }}/>
          <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
            <FI className="mb-10">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:cor }}/>
                <p className={`${FB} text-[11px] font-bold tracking-[0.24em] uppercase text-white/35`}>Última etapa · vagas limitadas</p>
              </div>
              <h2 className={`${FD} text-3xl sm:text-5xl lg:text-[50px] leading-[1.02] tracking-tight text-white mb-4`}>GARANTA SUA VAGA NA PRÓXIMA TURMA</h2>
              <p className={`${FB} text-[16px] text-white/50 max-w-lg`}>Matricule-se agora ou tire suas dúvidas com um consultor antes de decidir.</p>
            </FI>

            <div className="grid gap-6 items-stretch max-w-xl mx-auto">
              <CursoCTA curso={curso}/>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §8 GARANTIA
         ══════════════════════════════════════════════════════ */}
      {curso.garantiaTexto&&(
        <section className="px-6 lg:px-10 pb-14 md:pb-20">
          {/* largura reduzida (4xl em vez de 6xl) — o card ficava largo demais pro
              conteúdo, deixando um vão vazio entre o texto e o botão */}
          <div className="max-w-4xl mx-auto">
            <FI>
              <div className="relative overflow-hidden rounded-[28px] border p-8 sm:p-10" style={{ borderColor:`${cor}35`, background:"linear-gradient(145deg,#030712,#021629)" }}>
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[70px] opacity-25 pointer-events-none" style={{ background:cor }}/>
                {/* texto e CTA na mesma faixa — antes o botão ficava jogado sozinho embaixo,
                    desalinhado do resto do card; agora ele acompanha o bloco de texto,
                    lado a lado no desktop e abaixo no mobile */}
                <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
                  <div className="flex flex-col sm:flex-row items-start gap-6 flex-1">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border-2" style={{ background:`${cor}22`, borderColor:`${cor}55` }}>
                      <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={cor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 12l2 2 4-4" stroke={cor} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className={`${FB} text-[10px] font-bold tracking-[0.22em] uppercase mb-2.5`} style={{ color:cor }}>Garantia Futebol Interativo</p>
                      <h3 className={`${FD} text-2xl sm:text-4xl text-white leading-tight mb-3`}>SE NÃO FUNCIONAR,<br/>DEVOLVEMOS TUDO</h3>
                      <p className={`${FB} text-[14px] text-white/50 leading-relaxed`}>{curso.garantiaTexto}</p>
                    </div>
                  </div>
                  <a href="#oferta" className="flex-shrink-0 inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3.5 transition-transform hover:-translate-y-0.5 w-full lg:w-auto">
                    <span className={`${FB} text-sm font-bold text-white whitespace-nowrap`}>Garantir minha vaga</span>
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            </FI>
          </div>
        </section>
      )}

      {/* sticky mobile — padding extra de safe-area pro home indicator do iPhone
          (sem isso, o botão fica meio colado na borda física em modelos com notch) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-between gap-3 px-5 pt-3 border-t border-white/[0.08] bg-black/90 backdrop-blur-xl shadow-[0_-8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 ${sticky?"translate-y-0":"translate-y-full"}`}
        style={{ paddingBottom:"max(12px, env(safe-area-inset-bottom))" }}
      >
        <div>
          <p className={`${FD} text-[13px] text-white leading-none`}>
            {curso.preco?.match(/R\$\s*[\d.,]+/)?.[0]}
            <span className={`${FB} text-[10px] text-white/35 ml-1`}>/mês</span>
          </p>
          <p className={`${FB} text-[10px] text-white/30 mt-0.5`}>
            ou R$ {curso.precoAvista?.replace(/^R\$\s*/,"")} à vista
          </p>
        </div>
        <a href="#oferta" className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3.5">
          <span className={`${FB} text-[13.5px] font-bold text-white`}>Garantir vaga</span>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>

      {/* rodapé */}
      <div className="border-t border-white/[0.05] py-5 text-center">
        <a href="/cursos" className={`${FB} text-[11.5px] font-semibold text-white/20 hover:text-white/40 transition-colors tracking-wide`}>← Ver todas as formações</a>
      </div>

      {/* ══════════════════════════════════════════════════════
          MODAL DE VÍDEO — mesmo padrão da página /experiencia-pratica
         ══════════════════════════════════════════════════════ */}
      {modalVideo&&(
        <div
          onClick={()=>setModalVideo(null)}
          className="fixed inset-0 z-[300] flex items-center justify-center p-5 bg-black/85 backdrop-blur-md"
        >
          <div onClick={e=>e.stopPropagation()} className="relative w-full" style={{ maxWidth:880 }}>
            <button
              onClick={()=>setModalVideo(null)}
              aria-label="Fechar"
              className="absolute -top-11 right-0 w-9 h-9 rounded-[10px] flex items-center justify-center text-white text-lg bg-white/[0.08] border border-white/20"
            >×</button>
            <div className="rounded-2xl overflow-hidden bg-black shadow-2xl" style={{ aspectRatio:"16/9" }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${modalVideo.id}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&playsinline=1`}
                title={modalVideo.nome}
                className="w-full h-full border-0 block"
                allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className={`${FB} text-[13px] font-semibold text-white/70 text-center mt-3.5`}>{modalVideo.nome}</p>
          </div>
        </div>
      )}

      <ConsultorFloatingButton utmCampaign={curso.id} presetArea={AREA_BY_CURSO_AREA[curso.area]} visible={sticky} />
    </div>
  );
}