export default function ClubesMarquee() {
  const doubled = [...Array.from({length:24},(_,i)=>i+1), ...Array.from({length:24},(_,i)=>i+1)];
  return (
    <div style={{ background:"rgba(10,46,78,0.42)", backdropFilter:"blur(16px)", borderTop:"1px solid rgba(140,200,245,0.18)", borderBottom:"1px solid rgba(140,200,245,0.18)", padding:"14px 0 16px" }}>
      <p className="text-center text-[10px] font-bold tracking-[0.3em] uppercase text-white/55 mb-3">Clubes parceiros</p>
      <div className="overflow-hidden w-full" style={{ WebkitMaskImage:"linear-gradient(90deg,transparent 0%,#000 7%,#000 93%,transparent 100%)", maskImage:"linear-gradient(90deg,transparent 0%,#000 7%,#000 93%,transparent 100%)" }} aria-hidden="true">
        <ul className="flex items-center animate-marquee" style={{ gap:"clamp(28px,4vw,46px)", width:"max-content" }}>
          {doubled.map((n,i) => (
            <li key={i} className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/clubes/clube-${n}.webp`} alt="" loading="lazy" decoding="async" style={{ height:"clamp(38px,5.5vw,52px)", width:"auto", opacity:0.9 }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}