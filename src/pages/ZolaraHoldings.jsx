import { useState, useEffect, useRef } from "react";

const C = {
  bg:       "#080F0B",
  bg2:      "#0C1810",
  bg3:      "#102016",
  green:    "#1A3A24",
  greenMid: "#14301C",
  greenDim: "#0E2214",
  gold:     "#B8923A",
  goldLight:"#CCA84E",
  goldDim:  "#8A6C28",
  goldGlow: "#B8923A18",
  ivory:    "#F2EEE4",
  warm:     "#C8C0A8",
  muted:    "#6A7060",
  dim:      "#2A3828",
  border:   "#162212",
  borderMid:"#1E3020",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:#080F0B;color:#F2EEE4;font-family:'Jost',sans-serif;overflow-x:hidden;}
*{cursor:none!important;}
::-webkit-scrollbar{width:2px;}
::-webkit-scrollbar-track{background:#080F0B;}
::-webkit-scrollbar-thumb{background:#B8923A35;}

.cdot{position:fixed;width:5px;height:5px;background:#B8923A;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);}
.cring{position:fixed;width:30px;height:30px;border:1px solid #B8923A40;border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);transition:left 0.1s ease,top 0.1s ease,width 0.3s,height 0.3s;}

.noise{position:fixed;inset:0;pointer-events:none;z-index:9000;opacity:0.04;
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
background-size:160px;}

.nlink{font-family:'Jost',sans-serif;font-size:10px;font-weight:300;letter-spacing:0.2em;text-transform:uppercase;color:#5A6850;text-decoration:none;position:relative;padding-bottom:4px;transition:color 0.35s;}
.nlink::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:#B8923A;transition:width 0.45s cubic-bezier(0.25,0.46,0.45,0.94);}
.nlink:hover{color:#B8923A;}
.nlink:hover::after{width:100%;}

.bg{display:inline-flex;align-items:center;gap:12px;padding:16px 44px;background:#B8923A;color:#080F0B;border:none;font-family:'Jost',sans-serif;font-size:10px;font-weight:500;letter-spacing:0.25em;text-transform:uppercase;text-decoration:none;position:relative;overflow:hidden;transition:background 0.35s,box-shadow 0.4s;}
.bg::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent);transition:left 0.55s;}
.bg:hover{background:#CCA84E;box-shadow:0 8px 48px #B8923A28;}
.bg:hover::after{left:100%;}
.bo{display:inline-flex;align-items:center;gap:12px;padding:15px 42px;background:transparent;color:#B8923A;border:1px solid #B8923A40;font-family:'Jost',sans-serif;font-size:10px;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;text-decoration:none;transition:border-color 0.35s,box-shadow 0.35s,background 0.35s;}
.bo:hover{border-color:#B8923A80;background:#B8923A08;box-shadow:0 0 28px #B8923A10;}

.r{opacity:0;transform:translateY(26px);transition:opacity 0.95s cubic-bezier(0.25,0.46,0.45,0.94),transform 0.95s cubic-bezier(0.25,0.46,0.45,0.94);}
.r.v{opacity:1;transform:translateY(0);}
.r.d1{transition-delay:0.08s;}.r.d2{transition-delay:0.17s;}.r.d3{transition-delay:0.26s;}.r.d4{transition-delay:0.37s;}.r.d5{transition-delay:0.48s;}.r.d6{transition-delay:0.62s;}
.rf{opacity:0;transition:opacity 1.1s ease;}.rf.v{opacity:1;}
.rl{width:0!important;transition:width 1.4s cubic-bezier(0.25,0.46,0.45,0.94)!important;}.rl.v{width:52px!important;}

@keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.tick{display:flex;animation:ticker 28s linear infinite;white-space:nowrap;}
.tick:hover{animation-play-state:paused;}

.pcard{background:#0C1810;border:1px solid #162212;position:relative;overflow:hidden;transition:border-color 0.45s,box-shadow 0.45s,transform 0.45s;}
.pcard:hover{border-color:#B8923A22;box-shadow:0 28px 80px rgba(0,0,0,0.5),0 0 60px #B8923A06;transform:translateY(-4px);}
.pcard-bar{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#B8923A,transparent);transform:scaleX(0);transition:transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94);}
.pcard:hover .pcard-bar{transform:scaleX(1);}

.ff{width:100%;background:#0C1810;border:1px solid #162212;color:#F2EEE4;font-family:'Jost',sans-serif;font-size:13px;font-weight:300;letter-spacing:0.04em;padding:16px 20px;outline:none;transition:border-color 0.3s;}
.ff::placeholder{color:#243020;}
.ff:focus{border-color:#B8923A44;}

.ghr{height:1px;background:linear-gradient(to right,transparent,#1A2E1A,transparent);}

@keyframes breathe{0%,100%{opacity:0.5;transform:scaleX(1);}50%{opacity:1;transform:scaleX(1.06);}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 #B8923A28;}50%{box-shadow:0 0 24px 6px #B8923A00;}}
@keyframes floatup{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
@keyframes spin{from{transform:translate(-50%,-50%) rotate(0deg);}to{transform:translate(-50%,-50%) rotate(360deg);}}
@keyframes spinr{from{transform:translate(-50%,-50%) rotate(0deg);}to{transform:translate(-50%,-50%) rotate(-360deg);}}

@media(max-width:1024px){.g2{grid-template-columns:1fr!important;}.hmd{display:none!important;}}
@media(max-width:768px){.g3{grid-template-columns:1fr!important;}.g4{grid-template-columns:1fr 1fr!important;}.hnav{display:none!important;}.sp{padding:80px 24px!important;}}
`;

function Lbl({t, center}) {
  return <p style={{fontFamily:"'Jost',sans-serif",fontSize:9,fontWeight:400,letterSpacing:"0.5em",textTransform:"uppercase",color:C.gold,marginBottom:16,textAlign:center?"center":"left"}}>{t}</p>;
}

function useCounter(target, dur=2000, go=false) {
  const [v,setV] = useState(0);
  useEffect(()=>{
    if(!go) return;
    let raf, start=null;
    const n = parseInt(target.replace(/\D/g,""));
    const step = (ts)=>{
      if(!start) start=ts;
      const p = Math.min((ts-start)/dur,1);
      setV(Math.floor(p*n));
      if(p<1) raf=requestAnimationFrame(step);
    };
    raf=requestAnimationFrame(step);
    return ()=>cancelAnimationFrame(raf);
  },[go,target,dur]);
  return v;
}

function Stat({num,suf,label}){
  const ref=useRef();
  const [go,setGo]=useState(false);
  const v=useCounter(num,1800,go);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setGo(true);obs.disconnect();}},{threshold:0.5});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  return(
    <div ref={ref} style={{textAlign:"center"}}>
      <div style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(32px,4vw,52px)",fontWeight:400,color:C.gold,letterSpacing:"0.04em"}}>{v}{suf}</div>
      <div style={{fontFamily:"'Jost',sans-serif",fontSize:9,color:C.muted,letterSpacing:"0.3em",textTransform:"uppercase",marginTop:8}}>{label}</div>
    </div>
  );
}

export default function ZolaraHoldings(){
  const [loaded,setLoaded]=useState(false);
  const [heroIn,setHeroIn]=useState(false);
  const [dot,setDot]=useState({x:-100,y:-100});
  const [ring,setRing]=useState({x:-100,y:-100});
  const [form,setForm]=useState({name:"",email:"",type:"",message:""});
  const [sent,setSent]=useState(false);

  useEffect(()=>{
    setTimeout(()=>setLoaded(true),60);
    setTimeout(()=>setHeroIn(true),220);
    const mv=(e)=>{setDot({x:e.clientX,y:e.clientY});setTimeout(()=>setRing({x:e.clientX,y:e.clientY}),90);};
    window.addEventListener("mousemove",mv);
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("v");obs.unobserve(e.target);}});
    },{threshold:0.07,rootMargin:"0px 0px -30px 0px"});
    setTimeout(()=>{document.querySelectorAll(".r,.rf,.rl").forEach(el=>obs.observe(el));},300);
    return()=>window.removeEventListener("mousemove",mv);
  },[]);

  const ap=(d=0)=>({opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(16px)",transition:`opacity 0.9s ease ${d}s,transform 0.9s ease ${d}s`});
  const wd=(d)=>({display:"inline-block",opacity:heroIn?1:0,transform:heroIn?"translateY(0) skewY(0deg)":"translateY(105%) skewY(3deg)",transition:`opacity 1.15s cubic-bezier(0.16,1,0.3,1) ${d}s,transform 1.15s cubic-bezier(0.16,1,0.3,1) ${d}s`});

  const subs=["Zolara Beauty Studio","Zolara Properties","Zolara Logistics","Zolara Pharma & Wellness","Zolara Hospitality"];

  return(
    <div style={{background:C.bg,color:C.ivory,fontFamily:"'Jost',sans-serif",overflowX:"hidden"}}>
      <style>{css}</style>
      <div className="noise"/>
      <div className="cdot" style={{left:dot.x,top:dot.y}}/>
      <div className="cring" style={{left:ring.x,top:ring.y}}/>

      {/* ══ HEADER ══ */}
      <header style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,height:72,background:"#080F0BF0",backdropFilter:"blur(28px)",WebkitBackdropFilter:"blur(28px)",borderBottom:"1px solid #111A12",...ap(0.1)}}>
        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 52px",height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <a href="#" style={{display:"flex",alignItems:"center",gap:14,textDecoration:"none"}}>
            <img src="/zh-logo.jpeg" alt="ZH" style={{width:44,height:44,objectFit:"contain"}}/>
            <div>
              <div style={{fontFamily:"'Cormorant',serif",fontSize:16,fontWeight:400,color:C.ivory,letterSpacing:"0.28em"}}>ZOLARA</div>
              <div style={{fontFamily:"'Jost',sans-serif",fontSize:7,color:C.muted,letterSpacing:"0.5em",textTransform:"uppercase",marginTop:1}}>Holdings Ltd</div>
            </div>
          </a>
          <nav className="hnav" style={{display:"flex",gap:44}}>
            {[["#about","About"],["#portfolio","Portfolio"],["#leadership","Leadership"],["#contact","Contact"]].map(([h,l])=>(
              <a key={h} href={h} className="nlink">{l}</a>
            ))}
          </nav>
          <a href="#contact" className="bo hmd" style={{padding:"10px 24px",fontSize:9}}>Inquire</a>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:72}}>

        {/* Lush green radial bg */}
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 80% 70% at 60% 40%, ${C.green}60 0%, transparent 65%)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 50% 60% at 20% 80%, ${C.greenDim}80 0%, transparent 60%)`,pointerEvents:"none"}}/>

        {/* Subtle grid */}
        <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${C.borderMid}28 1px,transparent 1px),linear-gradient(90deg,${C.borderMid}28 1px,transparent 1px)`,backgroundSize:"88px 88px",maskImage:"radial-gradient(ellipse 100% 100% at 50% 50%,black 10%,transparent 90%)",WebkitMaskImage:"radial-gradient(ellipse 100% 100% at 50% 50%,black 10%,transparent 90%)",pointerEvents:"none",opacity:0.5}}/>

        {/* Orbiting rings */}
        <div className="hmd" style={{position:"absolute",top:"50%",left:"55%",width:700,height:700,animation:"spin 60s linear infinite",pointerEvents:"none"}}>
          <svg width="700" height="700" viewBox="0 0 700 700" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
            <circle cx="350" cy="350" r="310" stroke="#B8923A" strokeWidth="0.5" fill="none" strokeDasharray="2 20" opacity="0.12"/>
          </svg>
        </div>
        <div className="hmd" style={{position:"absolute",top:"50%",left:"55%",width:480,height:480,animation:"spinr 38s linear infinite",pointerEvents:"none"}}>
          <svg width="480" height="480" viewBox="0 0 480 480" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
            <circle cx="240" cy="240" r="210" stroke="#B8923A" strokeWidth="0.4" fill="none" strokeDasharray="1 14" opacity="0.1"/>
          </svg>
        </div>

        {/* Gold ambient */}
        <div style={{position:"absolute",top:"35%",left:"50%",transform:"translateX(-50%)",width:1000,height:600,background:`radial-gradient(ellipse,${C.gold}05 0%,transparent 60%)`,pointerEvents:"none"}}/>

        {/* Side label */}
        <div className="hmd" style={{position:"absolute",left:36,top:"50%",transform:"translateY(-50%) rotate(-90deg)",...ap(2)}}>
          <span style={{fontFamily:"'Jost',sans-serif",fontSize:8,color:C.dim,letterSpacing:"0.45em",textTransform:"uppercase"}}>Tamale · Ghana · Est. 2025</span>
        </div>

        <div style={{maxWidth:1320,margin:"0 auto",padding:"0 52px",width:"100%",position:"relative",zIndex:2}}>
          {/* Eyebrow */}
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:56,...ap(0.3)}}>
            <span style={{width:22,height:1,background:C.gold,opacity:0.6}}/>
            <span style={{fontFamily:"'Jost',sans-serif",fontSize:9,color:C.gold,letterSpacing:"0.5em",textTransform:"uppercase"}}>Strategic Investment Group</span>
          </div>

          {/* Headline */}
          <div style={{marginBottom:0}}>
            {["Building","Businesses"].map((w,i)=>(
              <div key={w} style={{overflow:"hidden",lineHeight:0.9,marginBottom:6}}>
                <span style={{...wd(0.3+i*0.16),fontFamily:"'Cormorant',serif",fontSize:"clamp(70px,10vw,136px)",fontWeight:300,color:C.ivory,lineHeight:0.9,letterSpacing:"-0.01em",display:"inline-block"}}>{w}</span>
              </div>
            ))}
            <div style={{overflow:"hidden",lineHeight:0.9}}>
              <span style={{...wd(0.62),fontFamily:"'Cormorant',serif",fontSize:"clamp(70px,10vw,136px)",fontWeight:300,lineHeight:0.9,letterSpacing:"-0.01em",fontStyle:"italic",color:C.gold,display:"inline-block"}}>That Last.</span>
            </div>
          </div>

          {/* Ruled line */}
          <div style={{height:1,background:`linear-gradient(90deg,${C.gold}80,${C.gold}20,transparent)`,width:heroIn?300:0,transition:"width 1.8s cubic-bezier(0.25,0.46,0.45,0.94) 1s",marginTop:56,marginBottom:48}}/>

          {/* Sub + CTA */}
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:40,...ap(1.1)}}>
            <p style={{fontFamily:"'Jost',sans-serif",fontSize:15,fontWeight:300,color:C.warm,maxWidth:500,lineHeight:1.95,letterSpacing:"0.025em",opacity:0.8}}>
              A Ghanaian holding company investing, building, and scaling premium businesses across beauty, real estate, logistics, and wellness — with a long-term vision for Africa.
            </p>
            <div style={{display:"flex",gap:14,flexShrink:0}}>
              <a href="#portfolio" className="bg">
                Our Portfolio
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M0 4H14M10 1l4 3-4 3" stroke="#080F0B" strokeWidth="1.2"/></svg>
              </a>
              <a href="#contact" className="bo">Inquire</a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{position:"absolute",bottom:48,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:10,...ap(2.2)}}>
          <div style={{width:1,height:52,background:`linear-gradient(to bottom,${C.gold}70,transparent)`,animation:"breathe 2.6s ease-in-out infinite"}}/>
          <span style={{fontFamily:"'Jost',sans-serif",fontSize:8,color:C.dim,letterSpacing:"0.4em",textTransform:"uppercase"}}>Scroll</span>
        </div>
      </section>

      {/* ══ TICKER ══ */}
      <div style={{background:C.bg2,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:"16px 0",overflow:"hidden"}}>
        <div className="tick">
          {[...subs,...subs,...subs,...subs].map((s,i)=>(
            <span key={i} style={{fontFamily:"'Jost',sans-serif",fontSize:9,color:C.muted,letterSpacing:"0.35em",textTransform:"uppercase",padding:"0 44px"}}>
              {s} <span style={{color:C.goldDim,marginLeft:8}}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ STATS ══ */}
      <div style={{background:C.bg,padding:"72px 52px",borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:40}} className="g4">
          <Stat num="5" suf="" label="Portfolio Companies"/>
          <Stat num="700" suf="K+" label="Capital Deployed GHS"/>
          <Stat num="2025" suf="" label="Year Founded"/>
          <Stat num="7" suf="" label="Staff Employed"/>
        </div>
      </div>

      <div className="ghr"/>

      {/* ══ ABOUT ══ */}
      <section id="about" className="sp" style={{padding:"140px 52px",background:C.bg,position:"relative",overflow:"hidden"}}>
        {/* Bg watermark */}
        <div style={{position:"absolute",right:-60,top:"50%",transform:"translateY(-50%)",fontFamily:"'Cormorant',serif",fontSize:340,fontWeight:600,color:"#0E1E1208",lineHeight:1,pointerEvents:"none",userSelect:"none",letterSpacing:"0.04em"}}>ZH</div>

        <div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1.15fr",gap:112,alignItems:"start"}} className="g2">
          <div style={{position:"sticky",top:100}}>
            <div className="r"><Lbl t="Who We Are"/></div>
            <div className="rl r" style={{width:52,height:1,background:C.gold,marginBottom:36,opacity:0.6}}/>
            <h2 className="r d1" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(38px,4vw,58px)",fontWeight:400,lineHeight:1.08,color:C.ivory,marginBottom:40,letterSpacing:"0.005em"}}>
              About<br/><em style={{color:C.gold}}>Zolara Holdings</em>
            </h2>
            <p className="r d2" style={{fontSize:15,fontWeight:300,color:C.warm,lineHeight:1.95,marginBottom:20,letterSpacing:"0.02em",opacity:0.85}}>
              We are a Ghanaian holding company focused on developing, owning, and managing businesses across beauty, wellness, real estate, logistics, and hospitality sectors.
            </p>
            <p className="r d3" style={{fontSize:15,fontWeight:300,color:C.warm,lineHeight:1.95,marginBottom:52,letterSpacing:"0.02em",opacity:0.85}}>
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
              <div key={item.label} className={`r d${i+1}`}
                style={{background:C.bg2,border:`1px solid ${C.border}`,padding:"36px 40px",position:"relative",overflow:"hidden",transition:"border-color 0.4s,background 0.4s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#B8923A22";e.currentTarget.style.background=C.bg3;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.bg2;}}
              >
                <div style={{position:"absolute",left:0,top:0,bottom:0,width:2,background:`linear-gradient(to bottom,${C.gold}90,${C.gold}10)`}}/>
                <p style={{fontFamily:"'Jost',sans-serif",fontSize:8,color:C.gold,letterSpacing:"0.5em",textTransform:"uppercase",marginBottom:12}}>{item.label}</p>
                <h3 style={{fontFamily:"'Cormorant',serif",fontSize:26,fontWeight:500,color:C.ivory,marginBottom:14}}>{item.title}</h3>
                <p style={{fontSize:13,fontWeight:300,color:C.muted,lineHeight:1.88}}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ghr"/>

      {/* ══ CEO QUOTE ══ */}
      <section style={{padding:"130px 52px",background:C.bg2,position:"relative",overflow:"hidden",textAlign:"center"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:900,height:500,background:`radial-gradient(ellipse,${C.green}80 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:400,background:`radial-gradient(ellipse,${C.gold}06 0%,transparent 60%)`,pointerEvents:"none"}}/>
        <div style={{maxWidth:820,margin:"0 auto",position:"relative",zIndex:2}}>
          <div className="rf" style={{fontFamily:"'Cormorant',serif",fontSize:110,color:`${C.gold}15`,lineHeight:0.65,fontStyle:"italic",marginBottom:8}}>"</div>
          <blockquote className="r d1" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(22px,2.6vw,32px)",fontWeight:300,color:C.ivory,lineHeight:1.72,fontStyle:"italic",letterSpacing:"0.01em",marginBottom:16}}>
            I built Zolara Holdings with one purpose — to create businesses that last. Not just to open companies, but to build strong, disciplined brands that will serve communities and stand the test of time.
          </blockquote>
          <div className="r d2" style={{fontFamily:"'Cormorant',serif",fontSize:26,color:`${C.gold}18`,fontStyle:"italic",marginBottom:44}}>"</div>
          <div className="rl r d3" style={{width:52,height:1,background:C.gold,margin:"0 auto 28px",opacity:0.5}}/>
          <p className="r d4" style={{fontFamily:"'Cormorant',serif",fontSize:22,color:C.gold,letterSpacing:"0.12em",marginBottom:8}}>Haruna Salifu</p>
          <p className="r d5" style={{fontFamily:"'Jost',sans-serif",fontSize:9,color:C.muted,letterSpacing:"0.4em",textTransform:"uppercase"}}>Founder & Executive Director</p>
        </div>
      </section>

      <div className="ghr"/>

      {/* ══ PORTFOLIO ══ */}
      <section id="portfolio" className="sp" style={{padding:"140px 52px",background:C.bg}}>
        <div style={{maxWidth:1320,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:32,marginBottom:80}}>
            <div>
              <div className="r"><Lbl t="Our Portfolio"/></div>
              <div className="rl r" style={{width:52,height:1,background:C.gold,marginBottom:32,opacity:0.6}}/>
              <h2 className="r d1" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(38px,4.2vw,58px)",fontWeight:400,color:C.ivory,lineHeight:1.1}}>
                Subsidiaries &<br/><em style={{color:C.gold}}>Divisions</em>
              </h2>
            </div>
            <p className="r d2" style={{fontSize:14,fontWeight:300,color:C.muted,maxWidth:360,lineHeight:1.9,paddingBottom:8,letterSpacing:"0.02em"}}>
              Five divisions under one structure. Each backed by shared capital, brand governance, and direct operational oversight.
            </p>
          </div>

          {/* Featured */}
          <div className="r d1" style={{background:C.bg2,border:`1px solid ${C.border}`,marginBottom:2,display:"grid",gridTemplateColumns:"1.2fr 1fr",minHeight:280,overflow:"hidden",transition:"border-color 0.4s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor="#B8923A20"}
            onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}
          >
            <div style={{padding:"52px 56px",borderRight:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:28}}>
                <span style={{fontFamily:"'Jost',sans-serif",fontSize:8,color:C.gold,letterSpacing:"0.4em",textTransform:"uppercase",border:`1px solid ${C.gold}40`,padding:"5px 14px"}}>Live · Operational</span>
                <span style={{fontFamily:"'Cormorant',serif",fontSize:13,color:C.dim,letterSpacing:"0.15em",fontStyle:"italic"}}>01 of 05</span>
              </div>
              <a href="https://zolarasalon.com" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                <h3 style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(26px,2.8vw,40px)",fontWeight:500,color:C.ivory,marginBottom:16,lineHeight:1.15,transition:"color 0.3s"}}
                  onMouseEnter={e=>e.target.style.color=C.gold}
                  onMouseLeave={e=>e.target.style.color=C.ivory}
                >Zolara Beauty Studio</h3>
              </a>
              <p style={{fontSize:14,fontWeight:300,color:C.muted,lineHeight:1.9,marginBottom:36,letterSpacing:"0.02em"}}>Premium salon and beauty services. Flagship operational subsidiary. Located in Sakasaka, Tamale — serving Northern Ghana.</p>
              <a href="https://zolarasalon.com" target="_blank" rel="noopener noreferrer" className="bo" style={{padding:"11px 28px",fontSize:9}}>
                Visit Site →
              </a>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",background:C.greenDim,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at center,${C.green}90,${C.bg2})`}}/>
              <img src="/zh-logo.jpeg" alt="ZH" style={{width:120,height:120,objectFit:"contain",opacity:0.15,position:"relative",zIndex:1}}/>
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
                <div className="pcard-bar"/>
                <div style={{padding:"38px 32px 34px"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:26}}>
                    <span style={{fontFamily:"'Cormorant',serif",fontSize:14,color:C.dim,letterSpacing:"0.1em",fontStyle:"italic"}}>{s.n}</span>
                    <span style={{fontFamily:"'Jost',sans-serif",fontSize:7.5,letterSpacing:"0.2em",textTransform:"uppercase",padding:"3px 10px",background:`${C.border}`,color:C.muted}}>{s.tag}</span>
                  </div>
                  <h4 style={{fontFamily:"'Cormorant',serif",fontSize:22,fontWeight:500,color:C.ivory,marginBottom:12,lineHeight:1.3}}>{s.name}</h4>
                  <p style={{fontSize:12,fontWeight:300,color:C.muted,lineHeight:1.88,letterSpacing:"0.02em"}}>{s.desc}</p>
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
            <div className="r"><Lbl t="What Guides Us" center/></div>
            <div className="rl r" style={{width:52,height:1,background:C.gold,margin:"0 auto 32px",opacity:0.6}}/>
            <h2 className="r d1" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(38px,4vw,54px)",fontWeight:400,color:C.ivory}}>
              Core <em style={{color:C.gold}}>Values</em>
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderTop:`1px solid ${C.border}`,borderLeft:`1px solid ${C.border}`}} className="g4">
            {[
              {n:"I",t:"Integrity",d:"Honesty and transparency in every decision, relationship, and transaction we make."},
              {n:"II",t:"Focus",d:"Disciplined execution over distraction. Fewer pursuits, greater depth and commitment."},
              {n:"III",t:"Leadership",d:"We lead with clarity, long-term vision, and deep responsibility to build and uplift."},
              {n:"IV",t:"Excellence",d:"The highest standard in every business we operate, brand we build, and team we develop."},
            ].map((v,i)=>(
              <div key={v.t} className={`r d${i+1}`}
                style={{borderRight:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:"52px 36px",transition:"background 0.3s"}}
                onMouseEnter={e=>e.currentTarget.style.background=C.bg3}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <div style={{fontFamily:"'Cormorant',serif",fontSize:56,fontWeight:300,color:C.dim,lineHeight:1,marginBottom:30,fontStyle:"italic"}}>{v.n}</div>
                <div style={{width:20,height:1,background:C.gold,marginBottom:20,opacity:0.5}}/>
                <h4 style={{fontFamily:"'Cormorant',serif",fontSize:26,fontWeight:500,color:C.ivory,marginBottom:14}}>{v.t}</h4>
                <p style={{fontSize:13,fontWeight:300,color:C.muted,lineHeight:1.88,letterSpacing:"0.02em"}}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ghr"/>

      {/* ══ LEADERSHIP ══ */}
      <section id="leadership" className="sp" style={{padding:"140px 52px",background:C.bg,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",left:0,top:0,bottom:0,width:"45%",background:`linear-gradient(to right,${C.greenDim}40,transparent)`,pointerEvents:"none"}}/>

        <div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:112,alignItems:"center"}} className="g2">
          <div className="rf" style={{position:"relative"}}>
            <div style={{background:C.greenDim,border:`1px solid ${C.border}`,aspectRatio:"3/4",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",maxWidth:440}}>
              <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 35%,${C.green}90,${C.bg})`}}/>
              <div style={{textAlign:"center",position:"relative",zIndex:2}}>
                <img src="/zh-logo.jpeg" alt="ZH" style={{width:110,height:110,objectFit:"contain",opacity:0.1,marginBottom:20}}/>
                <p style={{fontFamily:"'Jost',sans-serif",fontSize:8,color:C.dim,letterSpacing:"0.4em",textTransform:"uppercase"}}>Portrait</p>
              </div>
              {[[{top:16,left:16},"M0,22 L0,0 L22,0"],[{top:16,right:16},"M0,0 L22,0 L22,22"],[{bottom:16,left:16},"M0,0 L0,22 L22,22"],[{bottom:16,right:16},"M22,0 L22,22 L0,22"]].map(([pos,d],idx)=>(
                <svg key={idx} width="22" height="22" viewBox="0 0 22 22" style={{position:"absolute",...pos,opacity:0.45}}>
                  <path d={d} fill="none" stroke="#B8923A" strokeWidth="1"/>
                </svg>
              ))}
            </div>
            <div style={{position:"absolute",bottom:-2,left:0,width:"65%",height:1,background:`linear-gradient(90deg,${C.gold},transparent)`}}/>
          </div>

          <div>
            <div className="r"><Lbl t="Founder & Leadership"/></div>
            <div className="rl r" style={{width:52,height:1,background:C.gold,marginBottom:32,opacity:0.6}}/>
            <h2 className="r d1" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(42px,4.8vw,68px)",fontWeight:300,color:C.ivory,lineHeight:1.02,marginBottom:12,letterSpacing:"0.005em"}}>
              Haruna<br/><em style={{color:C.gold}}>Salifu</em>
            </h2>
            <p className="r d2" style={{fontFamily:"'Jost',sans-serif",fontSize:10,color:C.muted,letterSpacing:"0.35em",textTransform:"uppercase",marginBottom:40}}>Executive Director</p>
            <p className="r d3" style={{fontSize:15,fontWeight:300,color:C.warm,lineHeight:1.95,marginBottom:20,letterSpacing:"0.02em",opacity:0.8}}>
              Haruna Salifu is the founder and Executive Director of Zolara Holdings Ltd. His strategic leadership and vision drive Zolara's mission to build high-value companies across beauty, real estate, wellness, and logistics in Ghana.
            </p>
            <p className="r d4" style={{fontSize:15,fontWeight:300,color:C.warm,lineHeight:1.95,marginBottom:48,letterSpacing:"0.02em",opacity:0.8}}>
              With a focus on discipline and structured investment, he leads the company with long-term planning and a deep commitment to building businesses that endure.
            </p>
            <div className="r d5" style={{borderLeft:`2px solid ${C.gold}`,paddingLeft:24}}>
              <p style={{fontFamily:"'Cormorant',serif",fontSize:19,fontStyle:"italic",color:C.muted,lineHeight:1.78}}>
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
            <div className="r"><Lbl t="Our Journey"/></div>
            <div className="rl r" style={{width:52,height:1,background:C.gold,marginBottom:32,opacity:0.6}}/>
            <h2 className="r d1" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(36px,4vw,54px)",fontWeight:400,color:C.ivory,lineHeight:1.12}}>
              Strategic<br/><em style={{color:C.gold}}>Timeline</em>
            </h2>
          </div>
          <div>
            {[
              {year:"2025",t:"Group Formation",d:"Establishment of Zolara Holdings Ltd. Successful launch of Zolara Beauty Studio in Tamale. Total investment exceeds GHS 700,000.",active:true},
              {year:"2026",t:"Real Estate Expansion",d:"Launch of Zolara Properties — real estate development and property management across Northern Ghana and key urban markets."},
              {year:"2027",t:"Pharma & Wellness",d:"Entry into pharmaceutical retail and community wellness — expanding Zolara's health footprint across Ghana."},
            ].map((item,i)=>(
              <div key={item.year} className={`r d${i+1}`} style={{display:"flex",gap:28,marginBottom:i<2?48:0,paddingBottom:i<2?48:0,borderBottom:i<2?`1px solid ${C.border}`:"none"}}>
                <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div style={{width:12,height:12,borderRadius:"50%",background:item.active?C.gold:"transparent",border:`1px solid ${item.active?C.gold:C.dim}`,boxShadow:item.active?`0 0 20px ${C.gold}60`:"none",marginTop:5,animation:item.active?"pulse 2.8s ease-in-out infinite":"none"}}/>
                  {i<2&&<div style={{width:1,flex:1,background:`linear-gradient(to bottom,${C.borderMid},transparent)`,marginTop:8}}/>}
                </div>
                <div>
                  <p style={{fontFamily:"'Jost',sans-serif",fontSize:8,color:C.gold,letterSpacing:"0.5em",marginBottom:10,textTransform:"uppercase"}}>{item.year}</p>
                  <h3 style={{fontFamily:"'Cormorant',serif",fontSize:24,fontWeight:500,color:C.ivory,marginBottom:12}}>{item.t}</h3>
                  <p style={{fontSize:13,fontWeight:300,color:C.muted,lineHeight:1.88}}>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ghr"/>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="sp" style={{padding:"140px 52px",background:C.bg,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"20%",right:-80,width:700,height:700,background:`radial-gradient(ellipse,${C.green}50 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"20%",right:-80,width:500,height:500,background:`radial-gradient(ellipse,${C.gold}05 0%,transparent 60%)`,pointerEvents:"none"}}/>

        <div style={{maxWidth:1320,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:112,alignItems:"start"}} className="g2">
          <div>
            <div className="r"><Lbl t="Get In Touch"/></div>
            <div className="rl r" style={{width:52,height:1,background:C.gold,marginBottom:32,opacity:0.6}}/>
            <h2 className="r d1" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(38px,4.2vw,58px)",fontWeight:400,color:C.ivory,lineHeight:1.1,marginBottom:28}}>
              Investment<br/><em style={{color:C.gold}}>Inquiries</em>
            </h2>
            <p className="r d2" style={{fontSize:15,fontWeight:300,color:C.muted,lineHeight:1.95,marginBottom:56,letterSpacing:"0.02em"}}>
              Whether you're an investor, a business partner, or an individual who shares our vision for building lasting enterprises across Africa — we'd like to hear from you.
            </p>
            <div className="r d3" style={{display:"flex",flexDirection:"column",gap:28}}>
              {[
                {icon:"✉",label:"Email",val:"info@zolaraholdings.com",href:"mailto:info@zolaraholdings.com"},
                {icon:"✆",label:"Phone",val:"+233 594 922 679",href:"tel:+233594922679"},
                {icon:"✆",label:"Alt Phone",val:"+233 249 978 750",href:"tel:+233249978750"},
                {icon:"◎",label:"Location",val:"Tamale, Northern Region, Ghana",href:null},
              ].map(c=>(
                <div key={c.val} style={{display:"flex",gap:20,alignItems:"flex-start"}}>
                  <span style={{color:C.gold,fontSize:13,width:20,marginTop:2,flexShrink:0}}>{c.icon}</span>
                  <div>
                    <p style={{fontFamily:"'Jost',sans-serif",fontSize:8,color:C.dim,letterSpacing:"0.4em",textTransform:"uppercase",marginBottom:5}}>{c.label}</p>
                    {c.href?(
                      <a href={c.href} style={{fontSize:14,fontWeight:300,color:C.warm,textDecoration:"none",transition:"color 0.3s",letterSpacing:"0.02em"}}
                        onMouseEnter={e=>e.target.style.color=C.gold}
                        onMouseLeave={e=>e.target.style.color=C.warm}
                      >{c.val}</a>
                    ):(
                      <p style={{fontSize:14,fontWeight:300,color:C.warm,letterSpacing:"0.02em"}}>{c.val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="r d2">
            {sent?(
              <div style={{background:C.bg2,border:`1px solid ${C.gold}30`,padding:"64px 48px",textAlign:"center"}}>
                <div style={{fontSize:28,color:C.gold,marginBottom:20}}>✓</div>
                <p style={{fontFamily:"'Cormorant',serif",fontSize:28,color:C.ivory,marginBottom:12}}>Message Received</p>
                <p style={{fontSize:13,color:C.muted,fontWeight:300,letterSpacing:"0.04em"}}>We'll be in touch shortly.</p>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:2}}>
                <input className="ff" placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                <input className="ff" placeholder="Email Address" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                <select className="ff" style={{appearance:"none"}} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                  <option value="" disabled>Inquiry Type</option>
                  <option>Investment Partnership</option>
                  <option>Business Proposal</option>
                  <option>General Inquiry</option>
                  <option>Media & Press</option>
                </select>
                <textarea className="ff" placeholder="Your Message" rows={6} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{resize:"none"}}/>
                <button className="bg" style={{width:"100%",justifyContent:"center",marginTop:2}} onClick={()=>{if(form.name&&form.email)setSent(true);}}>
                  Send Message
                  <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M0 4H14M10 1l4 3-4 3" stroke="#080F0B" strokeWidth="1.2"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="ghr"/>

      {/* ══ FOOTER ══ */}
      <footer style={{background:"#060D08",padding:"48px 52px"}}>
        <div style={{maxWidth:1320,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24,marginBottom:36,paddingBottom:36,borderBottom:`1px solid ${C.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <img src="/zh-logo.jpeg" alt="ZH" style={{width:36,height:36,objectFit:"contain",opacity:0.4}}/>
              <div>
                <div style={{fontFamily:"'Cormorant',serif",fontSize:12,color:C.dim,letterSpacing:"0.32em"}}>ZOLARA HOLDINGS LTD</div>
                <div style={{fontFamily:"'Jost',sans-serif",fontSize:7.5,color:"#1E2A1E",letterSpacing:"0.35em",textTransform:"uppercase",marginTop:2}}>Tamale, Ghana · Est. 2025</div>
              </div>
            </div>
            <nav style={{display:"flex",gap:36}}>
              {[["#about","About"],["#portfolio","Portfolio"],["#leadership","Leadership"],["#contact","Contact"]].map(([h,l])=>(
                <a key={h} href={h} style={{fontFamily:"'Jost',sans-serif",fontSize:9,color:"#243020",letterSpacing:"0.25em",textTransform:"uppercase",textDecoration:"none",transition:"color 0.3s"}}
                  onMouseEnter={e=>e.target.style.color=C.gold}
                  onMouseLeave={e=>e.target.style.color="#243020"}
                >{l}</a>
              ))}
            </nav>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <p style={{fontFamily:"'Jost',sans-serif",fontSize:9.5,color:"#1A2418",letterSpacing:"0.14em"}}>© 2026 Zolara Holdings Ltd. All Rights Reserved.</p>
            <a href="/privacy-policy" style={{fontFamily:"'Jost',sans-serif",fontSize:9.5,color:"#1A2418",letterSpacing:"0.14em",textDecoration:"none",transition:"color 0.3s"}}
              onMouseEnter={e=>e.target.style.color=C.gold}
              onMouseLeave={e=>e.target.style.color="#1A2418"}
            >Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
