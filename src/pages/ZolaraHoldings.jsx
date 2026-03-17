import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#080809",
  bg2: "#0F0F12",
  bg3: "#141418",
  gold: "#C6A15B",
  goldLight: "#D4B472",
  goldDim: "#8A6E3A",
  ivory: "#F0EDE6",
  platinum: "#909090",
  dim: "#3A3A42",
  border: "#1C1C22",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@200;300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:#080809;color:#F0EDE6;font-family:'Inter',sans-serif;overflow-x:hidden;}
*{cursor:none!important;}
::-webkit-scrollbar{width:2px;}
::-webkit-scrollbar-track{background:#080809;}
::-webkit-scrollbar-thumb{background:#C6A15B30;}

.cdot{position:fixed;width:5px;height:5px;background:#C6A15B;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:transform 0.15s;}
.cring{position:fixed;width:28px;height:28px;border:1px solid #C6A15B44;border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);transition:left 0.1s ease,top 0.1s ease;}

.noise{position:fixed;inset:0;pointer-events:none;z-index:9000;opacity:0.025;
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
background-size:160px;}

/* Nav */
.nlink{font-family:'Inter',sans-serif;font-size:10px;font-weight:400;letter-spacing:0.18em;text-transform:uppercase;color:#606068;text-decoration:none;position:relative;padding-bottom:4px;transition:color 0.3s;}
.nlink::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:#C6A15B;transition:width 0.45s cubic-bezier(0.25,0.46,0.45,0.94);}
.nlink:hover{color:#C6A15B;}
.nlink:hover::after{width:100%;}

/* Ticker */
@keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
.ticker-inner{display:flex;animation:ticker 24s linear infinite;white-space:nowrap;}
.ticker-inner:hover{animation-play-state:paused;}

/* Buttons */
.bg{display:inline-flex;align-items:center;gap:12px;padding:16px 44px;background:#C6A15B;color:#080809;border:none;font-family:'Inter',sans-serif;font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;transition:background 0.35s,box-shadow 0.35s;position:relative;overflow:hidden;}
.bg::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transition:left 0.5s;}
.bg:hover{background:#D4B472;box-shadow:0 8px 40px #C6A15B2A;}
.bg:hover::after{left:100%;}
.bo{display:inline-flex;align-items:center;gap:12px;padding:15px 42px;background:transparent;color:#C6A15B;border:1px solid #C6A15B44;font-family:'Inter',sans-serif;font-size:10px;font-weight:400;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;transition:border-color 0.3s,box-shadow 0.3s,background 0.3s;}
.bo:hover{border-color:#C6A15B88;background:#C6A15B08;box-shadow:0 0 24px #C6A15B12;}

/* Scroll reveal */
.r{opacity:0;transform:translateY(24px);transition:opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94),transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94);}
.r.v{opacity:1;transform:translateY(0);}
.r.d1{transition-delay:0.08s;}.r.d2{transition-delay:0.16s;}.r.d3{transition-delay:0.24s;}.r.d4{transition-delay:0.34s;}.r.d5{transition-delay:0.44s;}.r.d6{transition-delay:0.56s;}
.rf{opacity:0;transition:opacity 1.1s ease;}.rf.v{opacity:1;}
.rl{width:0!important;transition:width 1.3s cubic-bezier(0.25,0.46,0.45,0.94)!important;}.rl.v{width:48px!important;}

/* Cards */
.pcard{background:#0F0F12;border:1px solid #1C1C22;padding:0;position:relative;overflow:hidden;transition:border-color 0.4s,box-shadow 0.4s,transform 0.4s;}
.pcard:hover{border-color:#C6A15B28;box-shadow:0 24px 80px rgba(0,0,0,0.6),0 0 60px #C6A15B08;transform:translateY(-3px);}
.pcard-inner{padding:40px 36px 36px;}
.pcard-top-line{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#C6A15B,transparent);transform:scaleX(0);transition:transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);}
.pcard:hover .pcard-top-line{transform:scaleX(1);}

/* Form */
.ff{width:100%;background:#0F0F12;border:1px solid #1C1C22;color:#F0EDE6;font-family:'Inter',sans-serif;font-size:13px;font-weight:300;letter-spacing:0.03em;padding:16px 20px;outline:none;transition:border-color 0.3s;}
.ff::placeholder{color:#2C2C34;}
.ff:focus{border-color:#C6A15B44;}

/* Divider */
.ghr{height:1px;background:linear-gradient(to right,transparent,#C6A15B18,transparent);}

/* Count up */
.cnum{font-family:'Playfair Display',serif;font-size:clamp(32px,4vw,52px);font-weight:400;color:#C6A15B;letter-spacing:0.04em;}

@keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
@keyframes lineIn{from{width:0;}to{width:100%;}}
@keyframes breathe{0%,100%{opacity:0.4;transform:scaleX(1);}50%{opacity:0.9;transform:scaleX(1.04);}}
@keyframes glow{0%,100%{box-shadow:0 0 0 0 #C6A15B20;}50%{box-shadow:0 0 20px 4px #C6A15B20;}}
@keyframes spin{from{transform:translate(-50%,-50%) rotate(0deg);}to{transform:translate(-50%,-50%) rotate(360deg);}}
@keyframes spinr{from{transform:translate(-50%,-50%) rotate(0deg);}to{transform:translate(-50%,-50%) rotate(-360deg);}}

@media(max-width:1024px){.g2{grid-template-columns:1fr!important;}.hmd{display:none!important;}}
@media(max-width:768px){.g3{grid-template-columns:1fr!important;}.g4{grid-template-columns:1fr 1fr!important;}.hnav{display:none!important;}.sp{padding:80px 24px!important;}}
`;

function Label({ t, center }) {
  return (
    <p style={{ fontFamily:"'Inter',sans-serif", fontSize:9, fontWeight:500, letterSpacing:"0.45em", textTransform:"uppercase", color:C.gold, marginBottom:18, textAlign: center?"center":"left" }}>{t}</p>
  );
}

function useCounter(target, duration=2000, start=false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s = null, startTime = null;
    const num = parseInt(target.replace(/\D/g,""));
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setVal(Math.floor(p * num));
      if (p < 1) s = requestAnimationFrame(step);
    };
    s = requestAnimationFrame(step);
    return () => cancelAnimationFrame(s);
  }, [start, target, duration]);
  return val;
}

function StatItem({ num, label, suffix="" }) {
  const ref = useRef(null);
  const [go, setGo] = useState(false);
  const count = useCounter(num, 1800, go);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ textAlign:"center" }}>
      <div className="cnum">{count}{suffix}</div>
      <div style={{ fontFamily:"'Inter',sans-serif", fontSize:9, color:C.dim, letterSpacing:"0.28em", textTransform:"uppercase", marginTop:8 }}>{label}</div>
    </div>
  );
}

export default function ZolaraHoldings() {
  const [loaded, setLoaded] = useState(false);
  const [heroIn, setHeroIn] = useState(false);
  const [dot, setDot] = useState({x:-100,y:-100});
  const [ring, setRing] = useState({x:-100,y:-100});
  const [form, setForm] = useState({name:"",email:"",message:""});
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 60);
    setTimeout(() => setHeroIn(true), 240);
    const mv = (e) => { setDot({x:e.clientX,y:e.clientY}); setTimeout(()=>setRing({x:e.clientX,y:e.clientY}),90); };
    window.addEventListener("mousemove", mv);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("v"); obs.unobserve(e.target); } });
    }, { threshold:0.08, rootMargin:"0px 0px -30px 0px" });
    setTimeout(() => { document.querySelectorAll(".r,.rf,.rl").forEach(el => obs.observe(el)); }, 300);
    return () => window.removeEventListener("mousemove", mv);
  }, []);

  const ap = (d=0) => ({ opacity: loaded?1:0, transform: loaded?"translateY(0)":"translateY(18px)", transition:`opacity 1s ease ${d}s,transform 1s ease ${d}s` });
  const wd = (d) => ({ display:"inline-block", opacity:heroIn?1:0, transform:heroIn?"translateY(0) skewY(0deg)":"translateY(100%) skewY(4deg)", transition:`opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${d}s,transform 1.1s cubic-bezier(0.16,1,0.3,1) ${d}s` });

  const subsidiaries = ["Zolara Beauty Studio","Zolara Properties","Zolara Logistics","Zolara Pharma & Wellness","Zolara Hospitality"];

  return (
    <div style={{background:C.bg,color:C.ivory,fontFamily:"'Inter',sans-serif",overflowX:"hidden"}}>
      <style>{css}</style>
      <div className="noise"/>
      <div className="cdot" style={{left:dot.x,top:dot.y}}/>
      <div className="cring" style={{left:ring.x,top:ring.y}}/>

      {/* ══ HEADER ══ */}
      <header style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,height:72,background:"#080809E8",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderBottom:"1px solid #14141A",...ap(0.1)}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 52px",height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <a href="#" style={{display:"flex",alignItems:"center",gap:14,textDecoration:"none"}}>
            <img src="/zh-logo.jpeg" alt="ZH" style={{width:44,height:44,objectFit:"contain"}}/>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:500,color:C.ivory,letterSpacing:"0.22em"}}>ZOLARA</div>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:7,color:C.platinum,letterSpacing:"0.45em",textTransform:"uppercase",marginTop:1}}>Holdings Ltd</div>
            </div>
          </a>
          <nav className="hnav" style={{display:"flex",gap:40}}>
            {[["#about","About"],["#portfolio","Portfolio"],["#leadership","Leadership"],["#contact","Contact"]].map(([h,l])=>(
              <a key={h} href={h} className="nlink">{l}</a>
            ))}
          </nav>
          <a href="#contact" className="bo hmd" style={{padding:"10px 22px",fontSize:9}}>Inquire</a>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:72}}>

        {/* Grid */}
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${C.border}22 1px,transparent 1px),linear-gradient(90deg,${C.border}22 1px,transparent 1px)`,backgroundSize:"72px 72px",maskImage:"radial-gradient(ellipse 90% 80% at 50% 50%,black 20%,transparent 100%)",WebkitMaskImage:"radial-gradient(ellipse 90% 80% at 50% 50%,black 20%,transparent 100%)",pointerEvents:"none"}}/>

        {/* Ambient */}
        <div style={{position:"absolute",top:"38%",left:"50%",transform:"translateX(-50%)",width:900,height:600,background:`radial-gradient(ellipse,${C.gold}05 0%,transparent 60%)`,pointerEvents:"none"}}/>

        {/* Orbiting decoration */}
        <div className="hmd" style={{position:"absolute",top:"50%",left:"50%",width:720,height:720,animation:"spin 50s linear infinite",pointerEvents:"none",opacity:0.04}}>
          <svg width="720" height="720" viewBox="0 0 720 720" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
            <circle cx="360" cy="360" r="320" stroke="#C6A15B" strokeWidth="0.6" fill="none" strokeDasharray="3 18"/>
          </svg>
        </div>
        <div className="hmd" style={{position:"absolute",top:"50%",left:"50%",width:520,height:520,animation:"spinr 32s linear infinite",pointerEvents:"none",opacity:0.05}}>
          <svg width="520" height="520" viewBox="0 0 520 520" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
            <circle cx="260" cy="260" r="230" stroke="#C6A15B" strokeWidth="0.5" fill="none" strokeDasharray="1 12"/>
          </svg>
        </div>

        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 52px",width:"100%",position:"relative",zIndex:2}}>

          {/* Top eyebrow */}
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:60,...ap(0.3)}}>
            <span style={{width:24,height:1,background:C.gold,opacity:0.5}}/>
            <span style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:C.gold,letterSpacing:"0.5em",textTransform:"uppercase"}}>Strategic Investment Group · Tamale, Ghana</span>
          </div>

          {/* Giant headline */}
          <div style={{marginBottom:0}}>
            <div style={{overflow:"hidden",lineHeight:0.92,marginBottom:4}}>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(64px,9.5vw,130px)",fontWeight:400,color:C.ivory,lineHeight:0.92,letterSpacing:"-0.01em"}}>
                <span style={wd(0.3)}>Building</span>
              </h1>
            </div>
            <div style={{overflow:"hidden",lineHeight:0.92,marginBottom:4}}>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(64px,9.5vw,130px)",fontWeight:400,lineHeight:0.92,letterSpacing:"-0.01em"}}>
                <span style={wd(0.48)}>Businesses</span>
              </h1>
            </div>
            <div style={{overflow:"hidden",lineHeight:0.92}}>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(64px,9.5vw,130px)",fontWeight:400,lineHeight:0.92,letterSpacing:"-0.01em",fontStyle:"italic",color:C.gold}}>
                <span style={wd(0.65)}>That Last.</span>
              </h1>
            </div>
          </div>

          {/* Underline rule */}
          <div style={{height:1,background:`linear-gradient(90deg,${C.gold}80,${C.gold}20,transparent)`,width:heroIn?320:0,transition:"width 1.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.9s",marginTop:52,marginBottom:44}}/>

          {/* Sub + CTA in a flex row */}
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:40,...ap(1.1)}}>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:15,fontWeight:300,color:C.platinum,maxWidth:480,lineHeight:1.9,letterSpacing:"0.02em"}}>
              A Ghanaian holding company investing, building, and scaling premium businesses across beauty, real estate, logistics, and wellness — with a long-term vision for Africa.
            </p>
            <div style={{display:"flex",gap:14,flexShrink:0}}>
              <a href="#portfolio" className="bg">
                View Portfolio
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M0 4H14M10 1l4 3-4 3" stroke="#080809" strokeWidth="1.2"/></svg>
              </a>
              <a href="#contact" className="bo">Inquire</a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{position:"absolute",bottom:44,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,...ap(2)}}>
          <div style={{width:1,height:48,background:`linear-gradient(to bottom,${C.gold}70,transparent)`,animation:"breathe 2.5s ease-in-out infinite"}}/>
          <span style={{fontFamily:"'Inter',sans-serif",fontSize:8,color:C.dim,letterSpacing:"0.4em",textTransform:"uppercase"}}>Scroll</span>
        </div>
      </section>

      {/* ══ TICKER ══ */}
      <div style={{background:C.bg2,borderTop:"1px solid #1C1C22",borderBottom:"1px solid #1C1C22",padding:"18px 0",overflow:"hidden"}}>
        <div className="ticker-inner">
          {[...subsidiaries,...subsidiaries,...subsidiaries,...subsidiaries].map((s,i)=>(
            <span key={i} style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:C.dim,letterSpacing:"0.35em",textTransform:"uppercase",padding:"0 40px"}}>
              {s} <span style={{color:C.gold,marginLeft:8}}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ STATS ══ */}
      <div style={{background:C.bg,borderBottom:"1px solid #1C1C22",padding:"64px 52px"}}>
        <div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:40}} className="g4">
          <StatItem num="5" label="Portfolio Companies" suffix=""/>
          <StatItem num="700" label="Capital Deployed (GHS K)" suffix="K+"/>
          <StatItem num="2025" label="Year Founded" suffix=""/>
          <StatItem num="7" label="Staff Employed" suffix=""/>
        </div>
      </div>

      <div className="ghr"/>

      {/* ══ ABOUT ══ */}
      <section id="about" className="sp" style={{padding:"140px 52px",background:C.bg,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-40,top:"50%",transform:"translateY(-50%)",fontFamily:"'Playfair Display',serif",fontSize:320,fontWeight:700,color:"#FFFFFF018",lineHeight:1,pointerEvents:"none",userSelect:"none",letterSpacing:"0.05em"}}>ZH</div>

        <div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:112,alignItems:"start"}} className="g2">
          <div style={{position:"sticky",top:100}}>
            <div className="r"><Label t="Who We Are"/></div>
            <div className="rl r" style={{width:48,height:1,background:C.gold,marginBottom:36,opacity:0.7}}/>
            <h2 className="r d1" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,3.8vw,56px)",fontWeight:400,lineHeight:1.08,color:C.ivory,marginBottom:40,letterSpacing:"0.005em"}}>
              About<br/><em style={{color:C.gold}}>Zolara Holdings</em>
            </h2>
            <p className="r d2" style={{fontSize:15,fontWeight:300,color:C.platinum,lineHeight:1.95,marginBottom:20,letterSpacing:"0.02em"}}>
              We are a Ghanaian holding company focused on developing, owning, and managing businesses across beauty, wellness, real estate, logistics, and hospitality sectors.
            </p>
            <p className="r d3" style={{fontSize:15,fontWeight:300,color:C.platinum,lineHeight:1.95,marginBottom:52,letterSpacing:"0.02em"}}>
              Our role is to provide leadership, capital, and strategy — helping each business grow with strength and stability for the long term.
            </p>
            <div className="r d4">
              <a href="#portfolio" className="bo">Explore Portfolio</a>
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:2}}>
            {[
              {label:"Mission",title:"Strategic Growth",body:"To grow high-value businesses through disciplined investment and hands-on operational leadership across Ghana and Africa."},
              {label:"Vision",title:"African Leadership",body:"To become one of Africa's premier holding companies — known for strong brands, excellence, and generational wealth creation."},
              {label:"Philosophy",title:"Structure First",body:"We centralise finance, branding, and operations across subsidiaries — reducing risk, enabling scale, protecting long-term value."},
            ].map((item,i)=>(
              <div key={item.label} className={`r d${i+1}`} style={{background:C.bg2,border:"1px solid #1C1C22",padding:"36px 40px",position:"relative",overflow:"hidden",transition:"border-color 0.4s,background 0.4s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#C6A15B22";e.currentTarget.style.background="#0F0F14";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#1C1C22";e.currentTarget.style.background=C.bg2;}}
              >
                <div style={{position:"absolute",left:0,top:0,bottom:0,width:2,background:`linear-gradient(to bottom,${C.gold}90,${C.gold}10)`}}/>
                <p style={{fontFamily:"'Inter',sans-serif",fontSize:8,color:C.gold,letterSpacing:"0.5em",textTransform:"uppercase",marginBottom:12}}>{item.label}</p>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:500,color:C.ivory,marginBottom:14}}>{item.title}</h3>
                <p style={{fontSize:13,fontWeight:300,color:"#666670",lineHeight:1.85}}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ghr"/>

      {/* ══ CEO QUOTE ══ */}
      <section style={{padding:"120px 52px",background:C.bg2,position:"relative",overflow:"hidden",textAlign:"center"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:800,height:400,background:`radial-gradient(ellipse,${C.gold}05 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div style={{maxWidth:860,margin:"0 auto",position:"relative",zIndex:2}}>
          <div className="rf" style={{fontFamily:"'Playfair Display',serif",fontSize:100,color:`${C.gold}1A`,lineHeight:0.7,fontStyle:"italic",marginBottom:4}}>"</div>
          <blockquote className="r d1" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(20px,2.4vw,30px)",fontWeight:300,color:C.ivory,lineHeight:1.75,fontStyle:"italic",letterSpacing:"0.01em",marginBottom:16}}>
            I built Zolara Holdings with one purpose — to create businesses that last. Not just to open companies, but to build strong, disciplined brands that will serve communities and stand the test of time.
          </blockquote>
          <div className="r d2" style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:`${C.gold}1A`,fontStyle:"italic",marginBottom:40}}>"</div>
          <div className="rl r d3" style={{width:48,height:1,background:C.gold,margin:"0 auto 28px",opacity:0.5}}/>
          <p className="r d4" style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:C.gold,letterSpacing:"0.1em",marginBottom:6}}>Haruna Salifu</p>
          <p className="r d5" style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:C.dim,letterSpacing:"0.35em",textTransform:"uppercase"}}>Founder & Executive Director</p>
        </div>
      </section>

      <div className="ghr"/>

      {/* ══ PORTFOLIO ══ */}
      <section id="portfolio" className="sp" style={{padding:"140px 52px",background:C.bg}}>
        <div style={{maxWidth:1320,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:32,marginBottom:80}}>
            <div>
              <div className="r"><Label t="Our Portfolio"/></div>
              <div className="rl r" style={{width:48,height:1,background:C.gold,marginBottom:32,opacity:0.7}}/>
              <h2 className="r d1" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,4vw,56px)",fontWeight:400,color:C.ivory,lineHeight:1.1}}>
                Subsidiaries &<br/><em style={{color:C.gold}}>Divisions</em>
              </h2>
            </div>
            <p className="r d2" style={{fontSize:14,fontWeight:300,color:"#505058",maxWidth:360,lineHeight:1.9,paddingBottom:8}}>
              Five divisions. One holding structure. Every business backed by shared capital, brand governance, and operational oversight.
            </p>
          </div>

          {/* Featured card */}
          <div className="r d1" style={{background:C.bg2,border:"1px solid #1C1C22",marginBottom:2,position:"relative",overflow:"hidden",display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:260}} >
            <div style={{padding:"52px 52px",borderRight:"1px solid #1C1C22"}}>
              <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
                <span style={{fontFamily:"'Inter',sans-serif",fontSize:8,color:C.gold,letterSpacing:"0.4em",textTransform:"uppercase",border:`1px solid ${C.gold}40`,padding:"5px 14px"}}>Live · Operational</span>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:11,color:C.dim,letterSpacing:"0.1em"}}>01</span>
              </div>
              <a href="https://zolarasalon.com" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}} >
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,2.5vw,36px)",fontWeight:500,color:C.ivory,marginBottom:16,lineHeight:1.2,transition:"color 0.3s"}}
                  onMouseEnter={e=>e.target.style.color=C.gold}
                  onMouseLeave={e=>e.target.style.color=C.ivory}
                >Zolara Beauty Studio</h3>
              </a>
              <p style={{fontSize:14,fontWeight:300,color:"#505058",lineHeight:1.9,marginBottom:32}}>Premium salon, beauty, and personal care services. First operational subsidiary — Sakasaka, Tamale.</p>
              <a href="https://zolarasalon.com" target="_blank" rel="noopener noreferrer" className="bo" style={{padding:"10px 24px",fontSize:9}}>
                Visit Site →
              </a>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",background:"#0A0A0C",position:"relative",overflow:"hidden"}}>
              <img src="/zh-logo.jpeg" alt="ZH" style={{width:120,height:120,objectFit:"contain",opacity:0.15}}/>
              <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at center,${C.gold}06,transparent 70%)`}}/>
            </div>
          </div>

          {/* Grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:2}} className="g4">
            {[
              {n:"02",name:"Zolara Properties",desc:"Real estate investment and property development across Northern Ghana.",tag:"Upcoming"},
              {n:"03",name:"Zolara Logistics",desc:"Supply chain coordination and last-mile delivery infrastructure.",tag:"Upcoming"},
              {n:"04",name:"Zolara Pharma",desc:"Pharmaceutical retail and community wellness services.",tag:"Upcoming"},
              {n:"05",name:"Zolara Hospitality",desc:"Premium accommodation and guest experience development.",tag:"Future"},
            ].map((s,i)=>(
              <div key={s.name} className={`pcard r d${i+1}`}>
                <div className="pcard-top-line"/>
                <div className="pcard-inner">
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:28}}>
                    <span style={{fontFamily:"'Playfair Display',serif",fontSize:13,color:C.dim,letterSpacing:"0.1em"}}>{s.n}</span>
                    <span style={{fontFamily:"'Inter',sans-serif",fontSize:7.5,letterSpacing:"0.2em",textTransform:"uppercase",padding:"3px 10px",background:"#1C1C22",color:C.dim}}>{s.tag}</span>
                  </div>
                  <h4 style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:500,color:C.ivory,marginBottom:12,lineHeight:1.3}}>{s.name}</h4>
                  <p style={{fontSize:12,fontWeight:300,color:"#4A4A52",lineHeight:1.85}}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ghr"/>

      {/* ══ VALUES ══ */}
      <section className="sp" style={{padding:"140px 52px",background:C.bg2}}>
        <div style={{maxWidth:1320,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:80}}>
            <div className="r"><Label t="What Guides Us" center/></div>
            <div className="rl r" style={{width:48,height:1,background:C.gold,margin:"0 auto 32px",opacity:0.7}}/>
            <h2 className="r d1" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,4vw,52px)",fontWeight:400,color:C.ivory}}>
              Core <em style={{color:C.gold}}>Values</em>
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderTop:"1px solid #1C1C22",borderLeft:"1px solid #1C1C22"}} className="g4">
            {[
              {n:"I",t:"Integrity",d:"Honesty and transparency in every decision and relationship."},
              {n:"II",t:"Focus",d:"Disciplined execution over distraction. Fewer things, greater depth."},
              {n:"III",t:"Leadership",d:"We lead with clarity, vision, and deep responsibility to build."},
              {n:"IV",t:"Excellence",d:"The highest standard in every business we operate and brand we build."},
            ].map((v,i)=>(
              <div key={v.t} className={`r d${i+1}`} style={{borderRight:"1px solid #1C1C22",borderBottom:"1px solid #1C1C22",padding:"52px 36px",transition:"background 0.3s"}}
                onMouseEnter={e=>e.currentTarget.style.background="#0B0B0E"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:52,fontWeight:400,color:"#1C1C22",lineHeight:1,marginBottom:32}}>{v.n}</div>
                <div style={{width:20,height:1,background:C.gold,marginBottom:20,opacity:0.5}}/>
                <h4 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:500,color:C.ivory,marginBottom:14}}>{v.t}</h4>
                <p style={{fontSize:13,fontWeight:300,color:"#505058",lineHeight:1.85}}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ghr"/>

      {/* ══ LEADERSHIP ══ */}
      <section id="leadership" className="sp" style={{padding:"140px 52px",background:C.bg,position:"relative",overflow:"hidden"}}>
        <div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:112,alignItems:"center"}} className="g2">

          {/* Photo frame */}
          <div className="rf" style={{position:"relative"}}>
            <div style={{background:"#0A0A0C",border:"1px solid #1C1C22",aspectRatio:"3/4",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",maxWidth:440}}>
              <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 40%,${C.gold}06,transparent 65%)`}}/>
              <div style={{textAlign:"center",position:"relative",zIndex:2}}>
                <img src="/zh-logo.jpeg" alt="ZH" style={{width:100,height:100,objectFit:"contain",opacity:0.12,marginBottom:20}}/>
                <p style={{fontFamily:"'Inter',sans-serif",fontSize:8,color:"#2A2A32",letterSpacing:"0.4em",textTransform:"uppercase"}}>Portrait</p>
              </div>
              {/* Corner marks */}
              {[[{top:16,left:16},"M0,20 L0,0 L20,0"],[{top:16,right:16},"M0,0 L20,0 L20,20"],[{bottom:16,left:16},"M0,0 L0,20 L20,20"],[{bottom:16,right:16},"M20,0 L20,20 L0,20"]].map(([pos,d],idx)=>(
                <svg key={idx} width="20" height="20" viewBox="0 0 20 20" style={{position:"absolute",...pos,opacity:0.5}}>
                  <path d={d} fill="none" stroke="#C6A15B" strokeWidth="1"/>
                </svg>
              ))}
            </div>
            {/* Gold accent line */}
            <div style={{position:"absolute",bottom:-2,left:0,width:"60%",height:1,background:`linear-gradient(90deg,${C.gold},transparent)`}}/>
          </div>

          {/* Bio */}
          <div>
            <div className="r"><Label t="Founder & Leadership"/></div>
            <div className="rl r" style={{width:48,height:1,background:C.gold,marginBottom:32,opacity:0.7}}/>
            <h2 className="r d1" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(40px,4.5vw,64px)",fontWeight:400,color:C.ivory,lineHeight:1.05,marginBottom:12,letterSpacing:"0.005em"}}>
              Haruna<br/><em style={{color:C.gold}}>Salifu</em>
            </h2>
            <p className="r d2" style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:C.platinum,letterSpacing:"0.3em",textTransform:"uppercase",marginBottom:40}}>Executive Director</p>
            <p className="r d3" style={{fontSize:15,fontWeight:300,color:"#707078",lineHeight:1.95,marginBottom:20,letterSpacing:"0.02em"}}>
              Haruna Salifu is the founder and Executive Director of Zolara Holdings Ltd. His strategic leadership and vision drive Zolara's mission to build high-value companies across beauty, real estate, wellness, and logistics in Ghana.
            </p>
            <p className="r d4" style={{fontSize:15,fontWeight:300,color:"#707078",lineHeight:1.95,marginBottom:48,letterSpacing:"0.02em"}}>
              With a focus on discipline and structured investment, he leads the company with long-term planning, operational excellence, and a deep commitment to building businesses that endure.
            </p>
            <div className="r d5" style={{borderLeft:`2px solid ${C.gold}`,paddingLeft:24,marginBottom:48}}>
              <p style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontStyle:"italic",color:"#404048",lineHeight:1.75}}>
                "The goal is not to open companies.<br/>It is to build institutions."
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="ghr"/>

      {/* ══ TIMELINE ══ */}
      <section className="sp" style={{padding:"120px 52px",background:C.bg2}}>
        <div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:100,alignItems:"start"}} className="g2">
          <div>
            <div className="r"><Label t="Our Journey"/></div>
            <div className="rl r" style={{width:48,height:1,background:C.gold,marginBottom:32,opacity:0.7}}/>
            <h2 className="r d1" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(34px,3.8vw,52px)",fontWeight:400,color:C.ivory,lineHeight:1.12}}>
              Strategic<br/><em style={{color:C.gold}}>Timeline</em>
            </h2>
          </div>
          <div>
            {[
              {year:"2025",t:"Group Formation",d:"Establishment of Zolara Holdings Ltd. Successful launch of Zolara Beauty Studio in Tamale. Total investment exceeds GHS 700,000.",active:true},
              {year:"2026",t:"Real Estate",d:"Launch of Zolara Properties — real estate development and property management across Northern Ghana and key urban markets."},
              {year:"2027",t:"Pharma & Wellness",d:"Entry into pharmaceutical retail and wellness — expanding Zolara's health and community footprint across Ghana."},
            ].map((item,i)=>(
              <div key={item.year} className={`r d${i+1}`} style={{display:"flex",gap:28,marginBottom:i<2?48:0,paddingBottom:i<2?48:0,borderBottom:i<2?"1px solid #1C1C22":"none"}}>
                <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>
                  <div style={{width:12,height:12,borderRadius:"50%",background:item.active?C.gold:"transparent",border:`1px solid ${item.active?C.gold:C.dim}`,boxShadow:item.active?`0 0 20px ${C.gold}50`:"none",marginTop:6,animation:item.active?"glow 2.5s ease-in-out infinite":"none"}}/>
                  {i<2&&<div style={{width:1,flex:1,background:"linear-gradient(to bottom,#2A2A32,transparent)",marginTop:8}}/>}
                </div>
                <div>
                  <p style={{fontFamily:"'Inter',sans-serif",fontSize:8,color:C.gold,letterSpacing:"0.45em",marginBottom:10,textTransform:"uppercase"}}>{item.year}</p>
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:500,color:C.ivory,marginBottom:12}}>{item.t}</h3>
                  <p style={{fontSize:13,fontWeight:300,color:"#505058",lineHeight:1.85}}>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ghr"/>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="sp" style={{padding:"140px 52px",background:C.bg,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"30%",right:-120,width:700,height:700,background:`radial-gradient(ellipse,${C.gold}04 0%,transparent 60%)`,pointerEvents:"none"}}/>

        <div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:112,alignItems:"start"}} className="g2">
          <div>
            <div className="r"><Label t="Get In Touch"/></div>
            <div className="rl r" style={{width:48,height:1,background:C.gold,marginBottom:32,opacity:0.7}}/>
            <h2 className="r d1" style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,4vw,56px)",fontWeight:400,color:C.ivory,lineHeight:1.1,marginBottom:28}}>
              Investment<br/><em style={{color:C.gold}}>Inquiries</em>
            </h2>
            <p className="r d2" style={{fontSize:15,fontWeight:300,color:"#505058",lineHeight:1.95,marginBottom:56,letterSpacing:"0.02em"}}>
              Whether you're an investor, a business partner, or an individual who shares our vision for building lasting enterprises across Africa — we'd like to hear from you.
            </p>
            <div className="r d3" style={{display:"flex",flexDirection:"column",gap:28}}>
              {[
                {icon:"✉",label:"Email",val:"info@zolaraholdings.com",href:"mailto:info@zolaraholdings.com"},
                {icon:"✆",label:"Phone",val:"+233 594 922 679",href:"tel:+233594922679"},
                {icon:"✆",label:"Phone",val:"+233 249 978 750",href:"tel:+233249978750"},
                {icon:"◎",label:"Location",val:"Tamale, Northern Region, Ghana",href:null},
              ].map(c=>(
                <div key={c.val} style={{display:"flex",gap:20,alignItems:"flex-start"}}>
                  <span style={{color:C.gold,fontSize:13,width:20,marginTop:2,flexShrink:0}}>{c.icon}</span>
                  <div>
                    <p style={{fontFamily:"'Inter',sans-serif",fontSize:8,color:"#383840",letterSpacing:"0.38em",textTransform:"uppercase",marginBottom:5}}>{c.label}</p>
                    {c.href?(
                      <a href={c.href} style={{fontSize:14,fontWeight:300,color:C.platinum,textDecoration:"none",letterSpacing:"0.02em",transition:"color 0.3s"}}
                        onMouseEnter={e=>e.target.style.color=C.gold}
                        onMouseLeave={e=>e.target.style.color=C.platinum}
                      >{c.val}</a>
                    ):(
                      <p style={{fontSize:14,fontWeight:300,color:C.platinum,letterSpacing:"0.02em"}}>{c.val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="r d2">
            {sent ? (
              <div style={{background:C.bg2,border:`1px solid ${C.gold}30`,padding:"64px 48px",textAlign:"center"}}>
                <div style={{fontSize:32,color:C.gold,marginBottom:20}}>✓</div>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:C.ivory,marginBottom:12}}>Message Received</p>
                <p style={{fontSize:13,color:"#505058",fontWeight:300}}>We'll be in touch shortly.</p>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:2}}>
                <input className="ff" placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                <input className="ff" placeholder="Email Address" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                <select className="ff" style={{appearance:"none"}} value={form.type||""} onChange={e=>setForm({...form,type:e.target.value})}>
                  <option value="" disabled>Inquiry Type</option>
                  <option>Investment Partnership</option>
                  <option>Business Proposal</option>
                  <option>General Inquiry</option>
                  <option>Media & Press</option>
                </select>
                <textarea className="ff" placeholder="Your Message" rows={6} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{resize:"none"}}/>
                <button className="bg" style={{width:"100%",justifyContent:"center",marginTop:2}} onClick={()=>{if(form.name&&form.email)setSent(true);}}>
                  Send Message
                  <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M0 4H14M10 1l4 3-4 3" stroke="#080809" strokeWidth="1.2"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="ghr"/>

      {/* ══ FOOTER ══ */}
      <footer style={{background:"#060607",padding:"48px 52px"}}>
        <div style={{maxWidth:1320,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24,marginBottom:40,paddingBottom:40,borderBottom:"1px solid #111116"}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <img src="/zh-logo.jpeg" alt="ZH" style={{width:36,height:36,objectFit:"contain",opacity:0.45}}/>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:12,color:"#2A2A32",letterSpacing:"0.28em"}}>ZOLARA HOLDINGS LTD</div>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:7.5,color:"#1E1E26",letterSpacing:"0.3em",textTransform:"uppercase",marginTop:2}}>Tamale, Ghana · Est. 2025</div>
              </div>
            </div>
            <nav style={{display:"flex",gap:36}}>
              {[["#about","About"],["#portfolio","Portfolio"],["#leadership","Leadership"],["#contact","Contact"]].map(([h,l])=>(
                <a key={h} href={h} style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:"#2A2A34",letterSpacing:"0.22em",textTransform:"uppercase",textDecoration:"none",transition:"color 0.3s"}}
                  onMouseEnter={e=>e.target.style.color=C.gold}
                  onMouseLeave={e=>e.target.style.color="#2A2A34"}
                >{l}</a>
              ))}
            </nav>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:9.5,color:"#1E1E26",letterSpacing:"0.12em"}}>© 2026 Zolara Holdings Ltd. All Rights Reserved.</p>
            <a href="/privacy-policy" style={{fontFamily:"'Inter',sans-serif",fontSize:9.5,color:"#1E1E26",letterSpacing:"0.12em",textDecoration:"none",transition:"color 0.3s"}}
              onMouseEnter={e=>e.target.style.color=C.gold}
              onMouseLeave={e=>e.target.style.color="#1E1E26"}
            >Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
