"use client";
import { useState, useEffect, useRef } from "react";
import type { Curso } from "@/lib/cursos";
import CursoCTA from "./CursoCTA";
import CursoForm from "./CursoForm";

/* ─── tokens ─────────────────────────────────────────────────────── */
const F = "var(--font-anton), Anton, sans-serif";
const M = "var(--font-montserrat), Montserrat, sans-serif";
const NAVY = "#03263F";
const DARK = "#010E1B";
const LIGHT = "#EEF5FF";

const COR: Record<string,string> = {
  "tecnica-e-tatica":"#4096F2","comunicacao-marketing":"#818CF8",
  "saude":"#2DD4BF","gestao-e-operacao":"#F59E0B",
};
const LBL: Record<string,string> = {
  "tecnica-e-tatica":"Técnica e Tática","comunicacao-marketing":"Comunicação",
  "saude":"Saúde","gestao-e-operacao":"Gestão e Operação",
};
function ytId(u:string){ return u.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)?.[1]??""; }

/* ─── FadeIn ─────────────────────────────────────────────────────── */
function FI({children,d=0,y=22}:{children:React.ReactNode;d?:number;y?:number}){
  const r=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=r.current; if(!el) return;
    Object.assign(el.style,{opacity:"0",transform:`translateY(${y}px)`,
      transition:`opacity .65s ${d}ms cubic-bezier(.22,.61,.36,1), transform .65s ${d}ms cubic-bezier(.22,.61,.36,1)`});
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){el.style.opacity="1";el.style.transform="translateY(0)";obs.disconnect();}
    },{threshold:0.1});
    obs.observe(el); return ()=>obs.disconnect();
  },[d,y]);
  return <div ref={r}>{children}</div>;
}

/* ─── Counter ────────────────────────────────────────────────────── */
function Cnt({v}:{v:string}){
  const r=useRef<HTMLSpanElement>(null);
  const ok=useRef(false);
  useEffect(()=>{
    const el=r.current; if(!el||ok.current) return;
    // extrai número limpo — suporte a "4.500" com ponto como separador de milhar
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
        const t=Math.min((now-t0)/1200,1);
        const ev=1-Math.pow(1-t,3);
        const cur=Math.round(ev*num);
        // formata com separador de milhar pt-BR
        el.textContent=pre+cur.toLocaleString("pt-BR")+suf;
        if(t<1) requestAnimationFrame(run); else el.textContent=v;
      };
      requestAnimationFrame(run);
    },{threshold:0.5});
    obs.observe(el); return ()=>obs.disconnect();
  },[v]);
  return <span ref={r}>{v}</span>;
}

/* ─── Marquee ────────────────────────────────────────────────────── */
function Marquee(){
  const ids=Array.from({length:24},(_,i)=>i+1);
  return(
    <div style={{overflow:"hidden",WebkitMaskImage:"linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",maskImage:"linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)"}}>
      <ul className="flex items-center animate-marquee" style={{gap:44,width:"max-content"}}>
        {[...ids,...ids].map((n,i)=>(
          <li key={i} style={{flexShrink:0}}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/clubes/clube-${n}.webp`} alt="" loading="lazy" style={{height:38,width:"auto",opacity:.75}}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── VideoCard — sem thumbnail externa (CSP issues) ─────────────── */
function VideoCard({id,nome,papel,cor}:{id:string;nome:string;papel?:string;cor:string}){
  const [on,setOn]=useState(false);
  return(
    <div style={{borderRadius:18,overflow:"hidden",border:`1.5px solid ${cor}40`,background:DARK,
      transition:"transform .22s ease,box-shadow .22s ease",cursor:"pointer"}}
      onMouseEnter={e=>{const d=e.currentTarget as HTMLDivElement;d.style.transform="translateY(-4px)";d.style.boxShadow=`0 20px 48px rgba(0,0,0,.4)`;}}
      onMouseLeave={e=>{const d=e.currentTarget as HTMLDivElement;d.style.transform="translateY(0)";d.style.boxShadow="none";}}>
      <div style={{position:"relative" as const,aspectRatio:"16/9"}} onClick={()=>setOn(true)}>
        {on?(
          <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={nome} allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
            allowFullScreen style={{width:"100%",height:"100%",border:"none",display:"block"}}/>
        ):(
          <>
            {/* fundo estilizado em vez de thumbnail externa */}
            <div style={{position:"absolute" as const,inset:0,background:`linear-gradient(135deg,${NAVY},${cor}30)`}}/>
            {/* logo YT centralizado */}
            <div style={{position:"absolute" as const,inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column" as const,gap:12}}>
              <div style={{width:64,height:64,borderRadius:"50%",background:cor,display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:`0 0 40px ${cor}80`,transition:"transform .2s ease"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform="scale(1.12)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform="scale(1)";}}>
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none"><polygon points="9,7 19,12 9,17" fill="#fff"/></svg>
              </div>
              <p style={{fontFamily:M,fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.5)",letterSpacing:"0.08em"}}>ASSISTIR DEPOIMENTO</p>
            </div>
          </>
        )}
      </div>
      <div style={{padding:"14px 18px 18px"}}>
        <div style={{width:32,height:3,borderRadius:2,background:cor,marginBottom:10}}/>
        <p style={{fontFamily:F,fontSize:"clamp(14px,1.5vw,17px)",color:"#F4F4F4",lineHeight:1.1,marginBottom:papel?5:0}}>{nome}</p>
        {papel&&<p style={{fontFamily:M,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase" as const,color:cor}}>{papel}</p>}
      </div>
    </div>
  );
}

/* ─── Seção wrapper ──────────────────────────────────────────────── */
function Sec({children,bg,id,style={}}:{children:React.ReactNode;bg:string;id?:string;style?:React.CSSProperties}){
  return(
    <section id={id} style={{background:bg,padding:"clamp(72px,10vh,108px) 0",...style}}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:"0 clamp(22px,5vw,64px)"}}>{children}</div>
    </section>
  );
}

/* ─── Eyebrow + H2 ───────────────────────────────────────────────── */
function SH({eye,h2,light=false,cor}:{eye:string;h2:string;light?:boolean;cor:string}){
  return(
    <FI>
      <p style={{fontFamily:M,fontSize:10,fontWeight:700,letterSpacing:"0.24em",textTransform:"uppercase" as const,color:light?"rgba(3,38,63,0.45)":"rgba(169,216,245,0.45)",marginBottom:12}}>{eye}</p>
      <h2 style={{fontFamily:F,fontSize:"clamp(28px,4.8vw,52px)",lineHeight:1.0,color:light?NAVY:"#F4F4F4",marginBottom:44}}>{h2}</h2>
    </FI>
  );
}

/* ─── Check item ─────────────────────────────────────────────────── */
function ChkItem({text,cor,light=false}:{text:string;cor:string;light?:boolean}){
  return(
    <div style={{display:"flex",alignItems:"flex-start",gap:12,padding:"15px 18px",
      background:light?"#fff":"rgba(255,255,255,0.04)",
      border:`1px solid ${light?"rgba(3,38,63,0.07)":"rgba(255,255,255,0.07)"}`,
      borderRadius:14,transition:"transform .18s ease"}}
      onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateX(4px)";}}
      onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateX(0)";}}>
      <div style={{flexShrink:0,width:24,height:24,borderRadius:"50%",background:`${cor}1E`,border:`1.5px solid ${cor}55`,
        display:"flex",alignItems:"center",justifyContent:"center",marginTop:1}}>
        <svg width={11} height={11} viewBox="0 0 20 20" fill="none">
          <path d="M4 10l4 4 8-8" stroke={cor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p style={{fontFamily:M,fontSize:13.5,fontWeight:500,color:light?"#1B3A52":"rgba(244,244,244,0.82)",lineHeight:1.55}}>{text}</p>
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
  const url=curso.checkoutUrl??curso.externalUrl;
  const comFoto=curso.mentores?.filter(m=>m.foto)??[];
  const semFoto=curso.mentores?.filter(m=>!m.foto)??[];

  useEffect(()=>{
    const fn=()=>setSticky(window.scrollY>600);
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  const css=`
    .fi-link{text-decoration:none;}
    .fi-btn{transition:box-shadow .2s ease,transform .15s ease;}
    .fi-btn:hover{transform:translateY(-2px);box-shadow:0 0 56px rgba(8,194,122,.55)!important;}
    .fi-tab{transition:all .18s ease;}
    .fi-mentor{position:relative;overflow:hidden;border-radius:20px;aspect-ratio:3/4;}
    .fi-mentor img{transition:transform .4s ease;display:block;width:100%;height:100%;object-fit:cover;object-position:top center;}
    .fi-mentor:hover img{transform:scale(1.07);}
    .fi-mentor .mbio{opacity:0;transform:translateY(8px);transition:opacity .3s ease,transform .3s ease;}
    .fi-mentor:hover .mbio{opacity:1!important;transform:translateY(0)!important;}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.6)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  `;

  return(
    <>
      <style dangerouslySetInnerHTML={{__html:css}}/>

      {/* ══════════════════════════════════════════════════════
          §1 HERO — título em 1 linha larga, sem quebra estranha
         ══════════════════════════════════════════════════════ */}
      <section style={{
        background:`linear-gradient(150deg,${DARK} 0%,#021629 50%,${cor}18 100%)`,
        paddingTop:"clamp(100px,14vh,136px)",paddingBottom:"clamp(64px,9vh,88px)",
        position:"relative",overflow:"hidden",
      }}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 70% 60% at 80% 30%,${cor}25 0%,transparent 60%)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${cor},transparent)`,opacity:.5}}/>

        <div style={{maxWidth:1000,margin:"0 auto",padding:`0 clamp(22px,5vw,64px)`,position:"relative"}}>

          {/* breadcrumb */}
          <nav style={{display:"flex",alignItems:"center",gap:8,marginBottom:24,fontSize:11.5,fontFamily:M}}>
            <a href="/cursos" style={{color:"rgba(169,216,245,0.35)",textDecoration:"none",fontWeight:500}}>Formações</a>
            <span style={{color:"rgba(169,216,245,0.2)"}}>›</span>
            <div style={{display:"inline-flex",alignItems:"center",gap:7,padding:"4px 12px 4px 8px",borderRadius:99,background:`${cor}1A`,border:`1px solid ${cor}45`}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:cor,animation:"pulse 2.2s ease infinite"}}/>
              <span style={{fontSize:10.5,fontWeight:700,color:cor,letterSpacing:"0.13em",textTransform:"uppercase" as const,fontFamily:M}}>{label} · {curso.type}</span>
            </div>
          </nav>

          {/* título — sem coloração interna no título para evitar quebra feia */}
          <h1 style={{fontFamily:F,fontSize:"clamp(34px,5.5vw,72px)",lineHeight:1.02,color:"#F4F4F4",marginBottom:20,letterSpacing:"0.01em",maxWidth:820}}>
            {curso.title}
          </h1>

          {/* subtítulo com destaque na cor da área */}
          {curso.subheadline&&(
            <p style={{fontFamily:M,fontSize:"clamp(14px,1.5vw,17px)",fontWeight:400,lineHeight:1.75,color:"rgba(244,244,244,0.52)",maxWidth:560,marginBottom:44}}>
              {curso.subheadline}
            </p>
          )}

          {/* CTAs */}
          <div style={{display:"flex",flexWrap:"wrap" as const,gap:14,alignItems:"center",marginBottom:56}}>
            <a href="#oferta" className="fi-link fi-btn" style={{display:"inline-flex",alignItems:"center",gap:12,padding:"16px 32px",borderRadius:16,
              background:"linear-gradient(135deg,#08C27A,#059669)",boxShadow:"0 0 44px rgba(8,194,122,.42)",
              border:"1.5px solid rgba(8,194,122,.75)",fontFamily:M,fontSize:15,fontWeight:700,color:"#fff"}}>
              Garantir minha vaga
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#ementa" className="fi-link" style={{fontFamily:M,fontSize:13,fontWeight:600,color:"rgba(169,216,245,0.42)"}}>
              Ver o conteúdo ↓
            </a>
          </div>

          {/* stats — somente dados reais */}
          {(curso.cargaHoraria||curso.numAulas||curso.formato)&&(
            <div style={{display:"flex",flexWrap:"wrap" as const,gap:0,borderTop:"1px solid rgba(255,255,255,0.09)",paddingTop:28}}>
              {[
                curso.cargaHoraria&&{v:curso.cargaHoraria,l:"Carga horária"},
                curso.numAulas&&{v:`${curso.numAulas} aulas`,l:"Ao vivo"},
                curso.formato&&{v:curso.formato,l:"Formato"},
              ].filter(Boolean).map((s:any,i,arr)=>(
                <div key={i} style={{
                  paddingRight:i<arr.length-1?"clamp(20px,3.5vw,44px)":0,
                  paddingLeft:i>0?"clamp(20px,3.5vw,44px)":0,
                  borderLeft:i>0?"1px solid rgba(255,255,255,0.1)":"none",
                }}>
                  <div style={{fontFamily:F,fontSize:"clamp(20px,2.6vw,30px)",lineHeight:1,color:"#fff"}}>{s.v}</div>
                  <div style={{fontFamily:M,fontSize:9.5,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase" as const,color:"rgba(169,216,245,0.32)",marginTop:7}}>{s.l}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §2 PARA QUEM
         ══════════════════════════════════════════════════════ */}
      {curso.paraQuem&&curso.paraQuem.length>0&&(
        <Sec bg={LIGHT} id="para-quem">
          <SH eye="Para quem é" h2="ESTA FORMAÇÃO É PRA VOCÊ SE..." light cor={cor}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:10}}>
            {curso.paraQuem.map((t,i)=>(
              <FI key={i} d={i*55} y={14}><ChkItem text={t} cor={cor} light/></FI>
            ))}
          </div>
        </Sec>
      )}

      {/* ══════════════════════════════════════════════════════
          §3 DIFERENCIAIS — navy, números decorativos
         ══════════════════════════════════════════════════════ */}
      {curso.diferenciais&&curso.diferenciais.length>0&&(
        <Sec bg={NAVY}>
          <SH eye="O que muda" h2="POR QUE ESTA FORMAÇÃO É DIFERENTE" cor={cor}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:10}}>
            {curso.diferenciais.map((d,i)=>(
              <FI key={i} d={i*50} y={14}>
                <div style={{display:"flex",gap:14,padding:"20px 20px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,
                  transition:"transform .18s ease"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateX(4px)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform="translateX(0)";}}>
                  <span style={{fontFamily:F,fontSize:32,color:`${cor}35`,flexShrink:0,lineHeight:1,marginTop:-2}}>{String(i+1).padStart(2,"0")}</span>
                  <p style={{fontFamily:M,fontSize:13.5,fontWeight:500,color:"rgba(244,244,244,0.8)",lineHeight:1.6}}>{d}</p>
                </div>
              </FI>
            ))}
          </div>
        </Sec>
      )}

      {/* ══════════════════════════════════════════════════════
          §4 EMENTA — light, acordeão clean
         ══════════════════════════════════════════════════════ */}
      {curso.ementa&&curso.ementa.length>0&&(
        <Sec bg={LIGHT} id="ementa">
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap" as const,gap:10,marginBottom:44}}>
            <FI>
              <p style={{fontFamily:M,fontSize:10,fontWeight:700,letterSpacing:"0.24em",textTransform:"uppercase" as const,color:"rgba(3,38,63,0.45)",marginBottom:12}}>Conteúdo</p>
              <h2 style={{fontFamily:F,fontSize:"clamp(28px,4.8vw,52px)",lineHeight:1.0,color:NAVY}}>O QUE VOCÊ VAI APRENDER</h2>
            </FI>
            <span style={{fontFamily:F,fontSize:18,color:`${cor}77`,paddingBottom:4}}>{curso.ementa.length} módulos</span>
          </div>
          {curso.ementa.map((item,i)=>{
            const op=tab===i;
            return(
              <div key={i} style={{borderBottom:"1px solid rgba(3,38,63,0.09)"}}>
                <button onClick={()=>setTab(op?null:i)} style={{width:"100%",display:"flex",alignItems:"center",gap:16,
                  padding:"17px 8px",background:"none",border:"none",cursor:"pointer",textAlign:"left" as const,borderRadius:8}}>
                  <span style={{fontFamily:F,fontSize:"clamp(16px,2vw,22px)",color:op?cor:`${cor}44`,flexShrink:0,minWidth:36}}>{String(i+1).padStart(2,"0")}</span>
                  <span style={{flex:1,fontFamily:M,fontSize:14,fontWeight:700,color:NAVY,lineHeight:1.45}}>{item.titulo}</span>
                  <span style={{flexShrink:0,width:28,height:28,borderRadius:9,background:op?cor:"rgba(3,38,63,0.08)",
                    display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s"}}>
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none"
                      style={{transform:op?"rotate(45deg)":"none",transition:"transform .2s"}}>
                      <path d="M12 5v14M5 12h14" stroke={op?"#fff":NAVY} strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                <div style={{maxHeight:op?200:0,overflow:"hidden",transition:"max-height .32s cubic-bezier(.4,0,.2,1)"}}>
                  {item.descricao&&<p style={{fontFamily:M,fontSize:13.5,color:"#4A6A80",lineHeight:1.7,paddingLeft:52,paddingBottom:20,paddingRight:36}}>{item.descricao}</p>}
                </div>
              </div>
            );
          })}
        </Sec>
      )}

      {/* ══════════════════════════════════════════════════════
          §5 EXPERIÊNCIA PRÁTICA + MARQUEE
         ══════════════════════════════════════════════════════ */}
      {curso.experienciaPratica&&curso.experienciaPratica.length>0&&(
        <section style={{background:DARK,overflow:"hidden",position:"relative" as const}}>
          <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 65% 55% at 75% 35%,${cor}1E,transparent 65%)`,pointerEvents:"none"}}/>
          <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${cor}80,transparent)`}}/>
          <div style={{maxWidth:1000,margin:"0 auto",padding:`clamp(72px,10vh,108px) clamp(22px,5vw,64px) 44px`,position:"relative" as const}}>
            <FI>
              <p style={{fontFamily:M,fontSize:10,fontWeight:700,letterSpacing:"0.24em",textTransform:"uppercase" as const,color:"rgba(169,216,245,0.45)",marginBottom:12}}>Exclusivo Futebol Interativo</p>
              <h2 style={{fontFamily:F,fontSize:"clamp(28px,4.8vw,52px)",lineHeight:1.0,color:"#F4F4F4",marginBottom:14}}>VOCÊ TERMINA DENTRO<br/>DE UM CLUBE PROFISSIONAL</h2>
              <p style={{fontFamily:M,fontSize:15,color:"rgba(244,244,244,0.44)",lineHeight:1.75,maxWidth:540,marginBottom:36}}>
                Não termina o curso em casa. Você vive o dia a dia do departamento dentro de um dos nossos{" "}
                <strong style={{color:"rgba(244,244,244,0.88)",fontWeight:700}}>+130 clubes parceiros</strong> espalhados pelo Brasil.
              </p>
            </FI>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(256px,1fr))",gap:8,marginBottom:36}}>
              {curso.experienciaPratica.map((t,i)=>(
                <FI key={i} d={i*45} y={12}><ChkItem text={t} cor={cor}/></FI>
              ))}
            </div>
            <a href="#oferta" className="fi-link fi-btn" style={{display:"inline-flex",alignItems:"center",gap:10,padding:"13px 26px",borderRadius:13,
              background:cor,fontFamily:M,fontSize:14,fontWeight:700,color:"#fff",boxShadow:`0 8px 30px ${cor}50`}}>
              Quero essa experiência
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",padding:"20px 0 28px"}}>
            <p style={{textAlign:"center" as const,fontFamily:M,fontSize:9.5,fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase" as const,color:"rgba(169,216,245,0.22)",marginBottom:14}}>+130 clubes parceiros</p>
            <Marquee/>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §6 MENTORES — navy, grid uniforme
         ══════════════════════════════════════════════════════ */}
      {curso.mentores&&curso.mentores.length>0&&(
        <Sec bg={NAVY}>
          <SH eye="Quem vai te ensinar" h2="OS MENTORES" cor={cor}/>
          {comFoto.length>0&&(
            /* minmax largo o suficiente para que 6 cards nunca fiquem 1 sozinho */
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:"clamp(10px,1.8vw,16px)",marginBottom:semFoto.length>0?14:0}}>
              {comFoto.map((m,i)=>(
                <FI key={i} d={i*60} y={16}>
                  <div className="fi-mentor" style={{background:`linear-gradient(155deg,#0A1E35,${cor}28)`}}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.foto} alt={m.nome} loading="lazy" onError={e=>{(e.target as HTMLImageElement).style.opacity="0";}}/>
                    <div style={{position:"absolute" as const,bottom:0,left:0,right:0,height:"55%",background:"linear-gradient(to top,rgba(1,14,27,.96),transparent)"}}/>
                    <p style={{position:"absolute" as const,bottom:9,left:10,right:10,fontFamily:F,fontSize:"clamp(10px,1.1vw,12.5px)",color:"#fff",lineHeight:1.1}}>{m.nome}</p>
                    <div className="mbio" style={{position:"absolute" as const,inset:0,background:`linear-gradient(to top,${cor}F2 0%,${cor}CC 50%,transparent 100%)`,display:"flex",flexDirection:"column" as const,justifyContent:"flex-end",padding:12}}>
                      <p style={{fontFamily:F,fontSize:"clamp(10px,1.1vw,12px)",color:"#fff",lineHeight:1.05,marginBottom:4}}>{m.nome}</p>
                      <p style={{fontFamily:M,fontSize:10.5,color:"rgba(255,255,255,0.9)",lineHeight:1.35}}>{m.bio}</p>
                    </div>
                  </div>
                  <p style={{fontFamily:M,fontSize:10.5,fontWeight:500,color:"rgba(169,216,245,0.42)",lineHeight:1.4,marginTop:9}}>{m.bio}</p>
                </FI>
              ))}
            </div>
          )}
          {semFoto.map((m,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"13px 17px",background:"rgba(255,255,255,0.05)",border:`1px solid ${cor}28`,borderRadius:13,marginBottom:8}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:`${cor}22`,border:`1.5px solid ${cor}50`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:F,fontSize:14,color:cor}}>{m.nome.charAt(0)}</div>
              <div>
                <p style={{fontFamily:F,fontSize:13,color:"#F4F4F4",lineHeight:1.1}}>{m.nome}</p>
                <p style={{fontFamily:M,fontSize:11,color:"rgba(169,216,245,0.42)",marginTop:2}}>{m.bio}</p>
              </div>
            </div>
          ))}
        </Sec>
      )}

      {/* ══════════════════════════════════════════════════════
          §7 DEPOIMENTOS — light, VideoCards
         ══════════════════════════════════════════════════════ */}
      {curso.depoimentos&&curso.depoimentos.length>0&&(
        <Sec bg={LIGHT}>
          <SH eye="Resultados reais" h2="QUEM JÁ CURSOU E FOI CONTRATADO" light cor={cor}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"clamp(14px,2.2vw,20px)"}}>
            {curso.depoimentos.map((d,i)=>(
              <FI key={i} d={i*80} y={16}>
                <VideoCard id={d.videoUrl?ytId(d.videoUrl):""} nome={d.nome} papel={d.papel} cor={cor}/>
              </FI>
            ))}
          </div>
        </Sec>
      )}

      {/* ══════════════════════════════════════════════════════
          §8 STATS — faixa na cor da área, números grandes
         ══════════════════════════════════════════════════════ */}
      {curso.stats&&curso.stats.length>0&&(
        <section style={{background:cor,padding:"clamp(56px,8vh,88px) 0"}}>
          <div style={{maxWidth:1000,margin:"0 auto",padding:"0 clamp(22px,5vw,64px)",
            display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",
            gap:"clamp(20px,5vw,56px)",textAlign:"center" as const}}>
            {curso.stats.map((s,i)=>(
              <FI key={i} d={i*80} y={10}>
                <div style={{fontFamily:F,fontSize:"clamp(36px,6.5vw,64px)",lineHeight:.88,color:"#fff",letterSpacing:"-0.02em"}}>
                  <Cnt v={s.valor}/>
                </div>
                <div style={{fontFamily:M,fontSize:9.5,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase" as const,color:"rgba(255,255,255,0.55)",marginTop:13}}>{s.label}</div>
              </FI>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          §9 OFERTA — dark, CTA + Form
         ══════════════════════════════════════════════════════ */}
      {(curso.preco||url||curso.hubspotFormId)&&(
        <Sec bg={DARK} id="oferta">
          <FI>
            <p style={{fontFamily:M,fontSize:10,fontWeight:700,letterSpacing:"0.24em",textTransform:"uppercase" as const,color:"rgba(169,216,245,0.45)",marginBottom:12}}>Última etapa</p>
            <h2 style={{fontFamily:F,fontSize:"clamp(28px,4.8vw,52px)",lineHeight:1.0,color:"#F4F4F4",marginBottom:16}}>GARANTA SUA VAGA AGORA</h2>
            <div style={{display:"flex",flexWrap:"wrap" as const,gap:"8px 24px",marginBottom:40}}>
              {["Garantia de 12 meses","Compra 100% segura","+4.500 alunos formados","Acesso vitalício"].map(t=>(
                <div key={t} style={{display:"flex",alignItems:"center",gap:7}}>
                  <svg width={13} height={13} viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="#08C27A" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{fontFamily:M,fontSize:12.5,fontWeight:600,color:"rgba(244,244,244,0.46)"}}>{t}</span>
                </div>
              ))}
            </div>
          </FI>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:"clamp(14px,2.5vw,22px)",alignItems:"start"}}>
            <CursoCTA curso={curso}/>
            {curso.hubspotPortalId&&curso.hubspotFormId&&(
              <FI d={100} y={14}>
                <div style={{background:"linear-gradient(160deg,#0F2744,#0A1E35)",border:"1px solid rgba(64,150,242,0.2)",borderRadius:24,padding:"clamp(24px,3vw,38px)",boxShadow:"0 32px 64px -24px rgba(0,10,30,0.6)"}}>
                  <p style={{fontFamily:F,fontSize:"clamp(17px,2vw,22px)",color:"#F4F4F4",marginBottom:7,lineHeight:1.05}}>FALE COM UM CONSULTOR</p>
                  <p style={{fontFamily:M,fontSize:13,color:"rgba(169,216,245,0.38)",marginBottom:22,lineHeight:1.65}}>Tire suas dúvidas antes de se inscrever.</p>
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
                  <CursoForm curso={curso}/>
                </div>
              </FI>
            )}
          </div>
        </Sec>
      )}

      {/* ══════════════════════════════════════════════════════
          §10 GARANTIA — navy, card escuro
         ══════════════════════════════════════════════════════ */}
      {curso.garantiaTexto&&(
        <section style={{background:NAVY,padding:`0 clamp(22px,5vw,64px) clamp(72px,10vh,108px)`}}>
          <div style={{maxWidth:1000,margin:"0 auto"}}>
            <FI>
              <div style={{position:"relative" as const,overflow:"hidden",background:`linear-gradient(145deg,${DARK},#021629)`,
                border:`1px solid ${cor}35`,borderRadius:24,padding:"clamp(28px,4.5vw,52px)"}}>
                <div style={{position:"absolute" as const,top:-80,right:-80,width:280,height:280,borderRadius:"50%",background:`${cor}1C`,filter:"blur(60px)",pointerEvents:"none"}}/>
                <div style={{position:"absolute" as const,bottom:-60,left:-60,width:200,height:200,borderRadius:"50%",background:"rgba(8,194,122,0.08)",filter:"blur(48px)",pointerEvents:"none"}}/>
                {/* linha 1: ícone + texto */}
                <div style={{display:"flex",alignItems:"flex-start",gap:20,marginBottom:28,position:"relative" as const}}>
                  <div style={{flexShrink:0,width:64,height:64,borderRadius:20,background:`${cor}22`,border:`2px solid ${cor}55`,
                    display:"flex",alignItems:"center",justifyContent:"center",animation:"float 3s ease infinite"}}>
                    <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={cor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 12l2 2 4-4" stroke={cor} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{flex:1}}>
                    <p style={{fontFamily:M,fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase" as const,color:cor,marginBottom:10}}>Garantia Futebol Interativo</p>
                    <h3 style={{fontFamily:F,fontSize:"clamp(20px,2.8vw,32px)",color:"#fff",lineHeight:1.05,marginBottom:12}}>SE NÃO FUNCIONAR,<br/>DEVOLVEMOS TUDO</h3>
                    <p style={{fontFamily:M,fontSize:14,color:"rgba(169,216,245,0.44)",lineHeight:1.75,maxWidth:520}}>{curso.garantiaTexto}</p>
                  </div>
                </div>
                {/* linha 2: CTA à direita */}
                <div style={{display:"flex",justifyContent:"flex-end",position:"relative" as const}}>
                  <a href="#oferta" className="fi-link fi-btn" style={{display:"inline-flex",alignItems:"center",gap:10,padding:"14px 28px",borderRadius:14,
                    background:"linear-gradient(135deg,#08C27A,#059669)",boxShadow:"0 8px 28px rgba(8,194,122,.38)",
                    fontFamily:M,fontSize:14,fontWeight:700,color:"#fff"}}>
                    Garantir minha vaga
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            </FI>
          </div>
        </section>
      )}

      {/* sticky mobile */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,
        transform:sticky?"translateY(0)":"translateY(100%)",transition:"transform .3s ease",
        background:"rgba(1,14,27,0.97)",backdropFilter:"blur(16px)",
        borderTop:"1px solid rgba(255,255,255,0.08)",padding:"12px 20px",
        display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}} className="md:hidden">
        <div>
          <p style={{fontFamily:F,fontSize:13,color:"#F4F4F4",lineHeight:1}}>
            {curso.preco?.match(/R\$\s*[\d.,]+/)?.[0]}
            <span style={{fontFamily:M,fontSize:10,color:"rgba(244,244,244,0.38)",marginLeft:4}}>/mês</span>
          </p>
          <p style={{fontFamily:M,fontSize:10,color:"rgba(244,244,244,0.32)",marginTop:2}}>
            ou R$ {curso.precoAvista?.replace(/^R\$\s*/,"")} à vista
          </p>
        </div>
        <a href="#oferta" className="fi-link" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"11px 20px",borderRadius:12,
          background:"linear-gradient(135deg,#08C27A,#059669)",fontFamily:M,fontSize:13.5,fontWeight:700,color:"#fff",flexShrink:0}}>
          Garantir vaga
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>

      {/* rodapé */}
      <div style={{background:"#010812",borderTop:"1px solid rgba(255,255,255,0.05)",padding:"20px",textAlign:"center" as const}}>
        <a href="/cursos" className="fi-link" style={{fontFamily:M,fontSize:11.5,fontWeight:600,color:"rgba(169,216,245,0.2)",letterSpacing:"0.08em"}}>← Ver todas as formações</a>
      </div>
    </>
  );
}