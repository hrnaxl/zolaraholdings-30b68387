import { useState, useEffect, useRef } from "react";

const C = {
  bg:      "#040A05",
  panel:   "#071009",
  green:   "#0D2410",
  greenMid:"#142E18",
  greenHi: "#1E4424",
  sand:    "#E2D4B0",
  sandDim: "#B8A878",
  copper:  "#B06828",
  ivory:   "#F0EAD8",
  warm:    "#A89878",
  muted:   "#4A5848",
  dim:     "#1E2C1E",
  border:  "#0E1A0E",
  line:    "#182818",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=DM+Sans:ital,wght@0,200;0,300;0,400;0,500;1,300&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:#040A05;color:#F0EAD8;font-family:'DM Sans',sans-serif;overflow-x:hidden;}
*{cursor:none!important;}
::-webkit-scrollbar{width:1px;}
::-webkit-scrollbar-thumb{background:#E2D4B018;}

.cur{position:fixed;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);width:8px;height:8px;background:#E2D4B0;border-radius:50%;transition:width 0.2s,height 0.2s,background 0.2s;}
.cur2{position:fixed;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);width:32px;height:32px;border:1px solid #E2D4B028;border-radius:50%;transition:left 0.1s ease,top 0.1s ease;}

.noise{position:fixed;inset:0;pointer-events:none;z-index:9000;
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E");
background-size:140px;opacity:0.04;}

/* ── NAV ── */
.nl{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:300;letter-spacing:0.22em;text-transform:uppercase;color:#3A4838;text-decoration:none;transition:color 0.3s;position:relative;padding-bottom:2px;}
.nl::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:#E2D4B0;transition:width 0.38s ease;}
.nl:hover{color:#E2D4B0;}.nl:hover::after{width:100%;}

/* ── BUTTONS ── */
.bp{display:inline-flex;align-items:center;gap:10px;padding:15px 40px;background:#E2D4B0;color:#040A05;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:0.28em;text-transform:uppercase;text-decoration:none;border:none;position:relative;overflow:hidden;transition:box-shadow 0.4s;}
.bp span{position:relative;z-index:1;display:flex;align-items:center;gap:10px;}
.bp::before{content:'';position:absolute;inset:0;background:#B06828;transform:scaleX(0);transform-origin:left;transition:transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94);}
.bp:hover::before{transform:scaleX(1);}
.bp:hover{box-shadow:0 8px 40px #E2D4B018;}

.bs{display:inline-flex;align-items:center;gap:10px;padding:14px 38px;background:transparent;color:#E2D4B0;border:1px solid #E2D4B025;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:300;letter-spacing:0.28em;text-transform:uppercase;text-decoration:none;transition:border-color 0.3s,background 0.3s;}
.bs:hover{border-color:#E2D4B050;background:#E2D4B008;}

/* ── REVEAL ── */
.r{opacity:0;transform:translateY(20px);transition:opacity 0.85s cubic-bezier(0.25,0.46,0.45,0.94),transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94);}
.r.v{opacity:1;transform:none;}
.r.d1{transition-delay:0.06s;}.r.d2{transition-delay:0.13s;}.r.d3{transition-delay:0.21s;}.r.d4{transition-delay:0.3s;}.r.d5{transition-delay:0.4s;}
.rl{opacity:0;transform:translateX(-24px);transition:opacity 0.85s ease,transform 0.85s ease;}.rl.v{opacity:1;transform:none;}
.rr{opacity:0;transform:translateX(24px);transition:opacity 0.85s ease,transform 0.85s ease;}.rr.v{opacity:1;transform:none;}
.rf{opacity:0;transition:opacity 1.2s ease;}.rf.v{opacity:1;}
.rs{width:0!important;transition:width 1.4s cubic-bezier(0.25,0.46,0.45,0.94)!important;}.rs.v{width:100%!important;}

/* ── TICKER ── */
@keyframes tk{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.tkw{display:flex;animation:tk 32s linear infinite;white-space:nowrap;}

/* ── PORTFOLIO ── */
.pc{position:relative;overflow:hidden;border:1px solid #0E1A0E;transition:border-color 0.4s,transform 0.4s;}
.pc:hover{border-color:#E2D4B015;transform:translateY(-3px);}
.pc-line{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#E2D4B0,transparent);transform:scaleX(0);transform-origin:left;transition:transform 0.6s ease;}
.pc:hover .pc-line{transform:scaleX(1);}

/* ── FORM ── */
.ff{width:100%;background:#071009;border:1px solid #0E1A0E;color:#F0EAD8;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:300;letter-spacing:0.03em;padding:16px 20px;outline:none;transition:border-color 0.3s;}
.ff::placeholder{color:#182018;}.ff:focus{border-color:#E2D4B025;}

@keyframes breath{0%,100%{opacity:0.35;}50%{opacity:0.8;}}
@keyframes glow{0%,100%{box-shadow:0 0 0 0 #E2D4B020;}50%{box-shadow:0 0 18px 4px #E2D4B000;}}
@keyframes spin{from{transform:rotate(0);}to{transform:rotate(360deg);}}
@keyframes rspin{from{transform:rotate(0);}to{transform:rotate(-360deg);}}
@keyframes slideup{from{opacity:0;transform:translateY(100%) skewY(2deg);}to{opacity:1;transform:none;}}
@keyframes linein{from{width:0;}to{width:100%;}}

@media(max-width:1100px){.g2{grid-template-columns:1fr!important;gap:60px!important;}.hm{display:none!important;}}
@media(max-width:768px){.g3{grid-template-columns:1fr!important;}.g4{grid-template-columns:1fr 1fr!important;}.hn{display:none!important;}.pad{padding:80px 24px!important;}.hbig{font-size:clamp(56px,13vw,80px)!important;}}
`;

function useCount(n,dur=1800,go=false){
  const [v,setV]=useState(0);
  useEffect(()=>{
    if(!go)return;
    let r,t=null;const num=parseInt(n.replace(/\D/g,""));
    const f=(ts)=>{if(!t)t=ts;const p=Math.min((ts-t)/dur,1);setV(Math.floor(p*num));if(p<1)r=requestAnimationFrame(f);};
    r=requestAnimationFrame(f);return()=>cancelAnimationFrame(r);
  },[go,n,dur]);return v;
}

function Stat({n,s,label}){
  const ref=useRef();const[go,setGo]=useState(false);const v=useCount(n,1600,go);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setGo(true);o.disconnect();}},{threshold:0.5});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return <div ref={ref}><div style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(36px,4.5vw,60px)",fontWeight:300,color:C.sand,lineHeight:1}}>{v}{s}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.muted,letterSpacing:"0.38em",textTransform:"uppercase",marginTop:10}}>{label}</div></div>;
}

export default function App(){
  const [ld,setLd]=useState(false);
  const [hi,setHi]=useState(false);
  const [dot,setDot]=useState({x:-100,y:-100});
  const [ring,setRing]=useState({x:-100,y:-100});
  const [form,setForm]=useState({name:"",email:"",type:"",msg:""});
  const [sent,setSent]=useState(false);

  useEffect(()=>{
    setTimeout(()=>setLd(true),60);setTimeout(()=>setHi(true),180);
    const mv=e=>{setDot({x:e.clientX,y:e.clientY});setTimeout(()=>setRing({x:e.clientX,y:e.clientY}),88);};
    window.addEventListener("mousemove",mv);
    const obs=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){e.target.classList.add("v");obs.unobserve(e.target);}});},{threshold:0.06,rootMargin:"0px 0px -20px 0px"});
    setTimeout(()=>document.querySelectorAll(".r,.rl,.rr,.rf,.rs").forEach(el=>obs.observe(el)),280);
    return()=>window.removeEventListener("mousemove",mv);
  },[]);

  const ap=(d=0)=>({opacity:ld?1:0,transform:ld?"none":"translateY(12px)",transition:`opacity 0.9s ease ${d}s,transform 0.9s ease ${d}s`});
  const wi=(d)=>({display:"inline-block",opacity:hi?1:0,transform:hi?"none":"translateY(105%) skewY(2deg)",transition:`opacity 1.2s cubic-bezier(0.16,1,0.3,1) ${d}s,transform 1.2s cubic-bezier(0.16,1,0.3,1) ${d}s`});

  return(
    <div style={{background:C.bg,color:C.ivory,fontFamily:"'DM Sans',sans-serif",overflowX:"hidden"}}>
      <style>{css}</style>
      <div className="noise"/>
      <div className="cur" style={{left:dot.x,top:dot.y}}/>
      <div className="cur2" style={{left:ring.x,top:ring.y}}/>

      {/* ━━━━ NAV ━━━━ */}
      <header style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,height:68,...ap(0.1),background:"#040A05EE",backdropFilter:"blur(28px)",borderBottom:"1px solid #0A140A"}}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 52px",height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <a href="#" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:12}}>
            <img src="/zh-logo.jpeg" alt="ZH" style={{width:40,height:40,objectFit:"contain"}}/>
            <div style={{fontFamily:"'Cormorant',serif",fontSize:15,fontWeight:400,color:C.ivory,letterSpacing:"0.3em"}}>ZOLARA <span style={{fontSize:9,fontFamily:"'DM Sans',sans-serif",color:C.muted,letterSpacing:"0.5em",verticalAlign:"middle"}}>HOLDINGS</span></div>
          </a>
          <nav className="hn" style={{display:"flex",gap:44}}>
            {[["#about","About"],["#portfolio","Portfolio"],["#leadership","Leadership"],["#contact","Contact"]].map(([h,l])=><a key={h} href={h} className="nl">{l}</a>)}
          </nav>
          <a href="#contact" className="bs hm" style={{padding:"9px 20px",fontSize:9}}>Inquire</a>
        </div>
      </header>

      {/* ━━━━ HERO ━━━━ */}
      {/* Giant background word + centered content */}
      <section style={{minHeight:"100vh",position:"relative",overflow:"hidden",paddingTop:68,display:"flex",flexDirection:"column",justifyContent:"center"}}>

        {/* Deep forest atmosphere layers */}
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 90% 70% at 50% 50%,${C.green}80 0%,transparent 70%)`}}/>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 50% 60% at 15% 85%,${C.greenMid}90 0%,transparent 55%)`}}/>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 40% 40% at 85% 20%,${C.greenMid}50 0%,transparent 55%)`}}/>

        {/* Enormous background ZOLARA */}
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",overflow:"hidden"}}>
          <div className="rf" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(120px,22vw,320px)",fontWeight:600,color:"#0D240F",letterSpacing:"-0.04em",lineHeight:1,userSelect:"none",whiteSpace:"nowrap",textAlign:"center",marginTop:20}}>ZOLARA</div>
        </div>

        {/* Rings */}
        <div className="hm" style={{position:"absolute",top:"50%",left:"50%",width:640,height:640,animation:"spin 80s linear infinite",pointerEvents:"none"}}>
          <svg width="640" height="640" viewBox="0 0 640 640" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
            <circle cx="320" cy="320" r="295" stroke="#E2D4B0" strokeWidth="0.3" fill="none" strokeDasharray="1 22" opacity="0.07"/>
          </svg>
        </div>
        <div className="hm" style={{position:"absolute",top:"50%",left:"50%",width:420,height:420,animation:"rspin 50s linear infinite",pointerEvents:"none"}}>
          <svg width="420" height="420" viewBox="0 0 420 420" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
            <circle cx="210" cy="210" r="190" stroke="#B06828" strokeWidth="0.4" fill="none" strokeDasharray="2 16" opacity="0.1"/>
          </svg>
        </div>

        {/* Content */}
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 52px",width:"100%",position:"relative",zIndex:2}}>

          {/* Eyebrow */}
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:64,...ap(0.3)}}>
            <div style={{width:1,height:28,background:`linear-gradient(to bottom,transparent,${C.sand}50,transparent)`}}/>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.55em",textTransform:"uppercase"}}>Strategic Investment Group · Ghana</span>
          </div>

          {/* Headline — staggered left + right indent alternating */}
          <div style={{marginBottom:4}}>
            <div style={{overflow:"hidden",lineHeight:0.86,marginBottom:6}}>
              <span className="hbig" style={{...wi(0.22),fontFamily:"'Cormorant',serif",fontSize:"clamp(72px,11.5vw,158px)",fontWeight:300,color:C.ivory,lineHeight:0.86,letterSpacing:"-0.025em"}}>Building</span>
            </div>
            <div style={{overflow:"hidden",lineHeight:0.86,marginBottom:6,paddingLeft:"clamp(32px,5vw,80px)"}}>
              <span className="hbig" style={{...wi(0.38),fontFamily:"'Cormorant',serif",fontSize:"clamp(72px,11.5vw,158px)",fontWeight:300,color:C.ivory,lineHeight:0.86,letterSpacing:"-0.025em"}}>Businesses</span>
            </div>
            <div style={{overflow:"hidden",lineHeight:0.86,paddingLeft:"clamp(16px,2.5vw,40px)"}}>
              <span className="hbig" style={{...wi(0.54),fontFamily:"'Cormorant',serif",fontSize:"clamp(72px,11.5vw,158px)",fontWeight:300,lineHeight:0.86,fontStyle:"italic",color:C.sand,letterSpacing:"-0.025em"}}>That Last.</span>
            </div>
          </div>

          {/* Divider line + bottom row */}
          <div style={{height:1,background:`linear-gradient(90deg,${C.sand}60,${C.sand}15,transparent)`,width:hi?"55%":0,transition:"width 2s cubic-bezier(0.25,0.46,0.45,0.94) 0.9s",marginTop:56,marginBottom:52}}/>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:36,...ap(1.15)}}>
            <p style={{fontSize:15,fontWeight:300,color:C.warm,maxWidth:440,lineHeight:1.92,letterSpacing:"0.02em",opacity:0.82}}>A Ghanaian holding company investing, building, and scaling premium businesses across beauty, real estate, logistics, and wellness — with a long-term vision for Africa.</p>
            <div style={{display:"flex",gap:12,flexShrink:0}}>
              <a href="#portfolio" className="bp"><span>Our Portfolio <svg width="14" height="6" viewBox="0 0 14 6" fill="none"><path d="M0 3H12M8.5 1l3 2-3 2" stroke="currentColor" strokeWidth="1.1"/></svg></span></a>
              <a href="#contact" className="bs">Inquire</a>
            </div>
          </div>
        </div>

        {/* Bottom: rotated label + vertical line */}
        <div className="hm" style={{position:"absolute",bottom:40,right:52,display:"flex",flexDirection:"column",alignItems:"center",gap:8,...ap(2.2)}}>
          <div style={{width:1,height:44,background:`linear-gradient(to top,${C.sand}50,transparent)`,animation:"breath 2.8s ease-in-out infinite"}}/>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:C.dim,letterSpacing:"0.5em",textTransform:"uppercase",writingMode:"vertical-rl"}}>Scroll</span>
        </div>
      </section>

      {/* ━━━━ STATS — full dark green bar with huge numbers ━━━━ */}
      <div style={{background:C.greenMid,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 80% 100% at 50% 50%,${C.greenHi}60,transparent)`}}/>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"64px 52px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",position:"relative",zIndex:1}} className="g4">
          {[["5","","Portfolio Companies"],["2","M+","Capital Deployed GHS"],["2025","","Year Founded"],["7","","Staff Employed"]].map(([n,s,l],i)=>(
            <div key={l} style={{borderRight:i<3?`1px solid ${C.dim}`:undefined,paddingLeft:i>0?48:0}}>
              <Stat n={n} s={s} label={l}/>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━━ ABOUT ━━━━ */}
      {/* Full bleed layout — text punches through */}
      <section id="about" className="pad" style={{padding:"160px 52px",background:C.bg,position:"relative",overflow:"hidden"}}>

        {/* Enormous bg "01" */}
        <div style={{position:"absolute",top:-60,left:-20,fontFamily:"'Cormorant',serif",fontSize:"clamp(200px,30vw,420px)",fontWeight:600,color:"#0A140805",lineHeight:1,pointerEvents:"none",userSelect:"none",letterSpacing:"-0.05em"}}>01</div>

        <div style={{maxWidth:1400,margin:"0 auto",position:"relative",zIndex:2}}>

          {/* Section tag */}
          <div className="rl" style={{display:"flex",alignItems:"center",gap:16,marginBottom:80}}>
            <span style={{width:24,height:1,background:C.sand,opacity:0.35}}/>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.55em",textTransform:"uppercase"}}>About the Company</span>
          </div>

          {/* Hero text + side body */}
          <div style={{display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:80,alignItems:"end",marginBottom:80}} className="g2">
            <div>
              <h2 className="r" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(44px,6vw,86px)",fontWeight:300,lineHeight:1.0,color:C.ivory,letterSpacing:"0.005em"}}>
                We build<br/><em style={{color:C.sand}}>businesses</em><br/>that matter.
              </h2>
            </div>
            <div>
              <p className="r d1" style={{fontSize:16,fontWeight:300,color:C.warm,lineHeight:1.95,marginBottom:24,opacity:0.85}}>A Ghanaian holding company focused on developing, owning, and managing businesses across beauty, wellness, real estate, logistics, and hospitality.</p>
              <p className="r d2" style={{fontSize:16,fontWeight:300,color:C.warm,lineHeight:1.95,opacity:0.65,marginBottom:44}}>Our role is to provide leadership, capital, and strategy — helping each business grow with strength and stability for the long term.</p>
              <div className="r d3"><a href="#portfolio" className="bs">Explore Portfolio</a></div>
            </div>
          </div>

          {/* Three pillars — alternating dark/darker */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1}} className="g3">
            {[
              {n:"I",label:"Mission",title:"Strategic Growth",body:"To grow high-value businesses through disciplined investment and operational leadership across Africa."},
              {n:"II",label:"Vision",title:"African Leadership",body:"To become Africa's premier holding company — known for strong brands and generational wealth creation."},
              {n:"III",label:"Philosophy",title:"Structure First",body:"We centralise finance, branding, and operations — reducing risk, enabling scale, protecting long-term value."},
            ].map((p,i)=>(
              <div key={p.label} className={`r d${i+1}`}
                style={{background:i===1?C.panel:C.bg,border:`1px solid ${C.border}`,padding:"44px 38px",position:"relative",overflow:"hidden",transition:"background 0.4s,border-color 0.4s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=C.panel;e.currentTarget.style.borderColor="#E2D4B012";}}
                onMouseLeave={e=>{e.currentTarget.style.background=i===1?C.panel:C.bg;e.currentTarget.style.borderColor=C.border;}}
              >
                <span style={{position:"absolute",bottom:-16,right:8,fontFamily:"'Cormorant',serif",fontSize:88,fontWeight:600,color:C.border,userSelect:"none",lineHeight:1}}>{p.n}</span>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:C.sandDim,letterSpacing:"0.55em",textTransform:"uppercase",marginBottom:16}}>{p.label}</p>
                <h3 style={{fontFamily:"'Cormorant',serif",fontSize:28,fontWeight:500,color:C.ivory,marginBottom:16,lineHeight:1.2}}>{p.title}</h3>
                <p style={{fontSize:13,fontWeight:300,color:C.muted,lineHeight:1.9}}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━ FULL BLEED FOUNDER QUOTE ━━━━ */}
      {/* Dark forest, asymmetric, massive italic type */}
      <section style={{background:C.greenMid,position:"relative",overflow:"hidden",padding:"0"}}>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${C.bg}80 0%,transparent 50%,${C.bg}40 100%)`}}/>

        <div style={{maxWidth:1400,margin:"0 auto",padding:"120px 52px",display:"grid",gridTemplateColumns:"58px 1fr 1fr",gap:0,alignItems:"center",position:"relative",zIndex:2}} className="g2">
          {/* Vertical label */}
          <div style={{writingMode:"vertical-rl",transform:"rotate(180deg)"}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:C.dim,letterSpacing:"0.55em",textTransform:"uppercase"}}>Founder</span>
          </div>

          {/* Quote */}
          <div style={{paddingRight:80,borderRight:`1px solid ${C.dim}`}}>
            <div className="rf" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(60px,10vw,130px)",color:`${C.sand}12`,lineHeight:0.7,fontStyle:"italic",marginBottom:0,display:"block"}}>"</div>
            <blockquote className="r" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(22px,2.8vw,36px)",fontWeight:300,color:C.ivory,lineHeight:1.65,fontStyle:"italic",letterSpacing:"0.005em",marginTop:-16}}>
              I built Zolara Holdings with one purpose — to create businesses that last. Not just to open companies, but to build strong, disciplined brands that will serve communities and stand the test of time.
            </blockquote>
          </div>

          {/* Attribution */}
          <div style={{paddingLeft:80}}>
            <div className="rs r" style={{height:1,background:C.sand,width:"100%",maxWidth:52,marginBottom:28,opacity:0.45}}/>
            <p className="r d1" style={{fontFamily:"'Cormorant',serif",fontSize:28,color:C.sand,letterSpacing:"0.06em",marginBottom:8}}>Haruna Salifu</p>
            <p className="r d2" style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.muted,letterSpacing:"0.45em",textTransform:"uppercase",marginBottom:36}}>Founder & Executive Director</p>
            <a href="#leadership" className="r d3 bs" style={{fontSize:9,padding:"11px 24px"}}>Meet the Founder</a>
          </div>
        </div>
      </section>

      {/* ━━━━ TICKER ━━━━ */}
      <div style={{background:C.panel,borderBottom:`1px solid ${C.border}`,padding:"13px 0",overflow:"hidden"}}>
        <div className="tkw">
          {[...Array(8)].flatMap(()=>["Zolara Beauty Studio","Zolara Properties","Zolara Logistics","Zolara Pharma & Wellness","Zolara Hospitality"]).map((s,i)=>(
            <span key={i} style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.muted,letterSpacing:"0.38em",textTransform:"uppercase",padding:"0 32px"}}>
              {s}<span style={{color:C.dim,marginLeft:8}}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ━━━━ PORTFOLIO ━━━━ */}
      {/* Full-width alternating rows, not a grid */}
      <section id="portfolio" className="pad" style={{padding:"160px 52px",background:C.bg,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,right:-20,fontFamily:"'Cormorant',serif",fontSize:"clamp(200px,28vw,380px)",fontWeight:600,color:"#0A14080A",lineHeight:1,pointerEvents:"none",userSelect:"none"}}>02</div>

        <div style={{maxWidth:1400,margin:"0 auto",position:"relative",zIndex:2}}>
          <div className="rl" style={{display:"flex",alignItems:"center",gap:16,marginBottom:80}}>
            <span style={{width:24,height:1,background:C.sand,opacity:0.35}}/>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.55em",textTransform:"uppercase"}}>Portfolio</span>
          </div>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:72,flexWrap:"wrap",gap:32}}>
            <h2 className="r" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(40px,5.5vw,76px)",fontWeight:300,color:C.ivory,lineHeight:1.05,letterSpacing:"0.005em"}}>
              Subsidiaries<br/><em style={{color:C.sand}}>&amp; Divisions</em>
            </h2>
            <p className="rr" style={{fontSize:14,fontWeight:300,color:C.muted,maxWidth:340,lineHeight:1.88}}>Five divisions under one structure. Backed by shared capital, brand governance, and direct operational oversight.</p>
          </div>

          {/* Featured row — wide */}
          <div className="r d1 pc" style={{background:C.panel,display:"grid",gridTemplateColumns:"1fr 320px",marginBottom:1,minHeight:220}} >
            <div className="pc-line"/>
            <div style={{padding:"48px 52px",borderRight:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:22}}>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:C.sand,letterSpacing:"0.4em",textTransform:"uppercase",border:`1px solid ${C.sand}30`,padding:"4px 12px"}}>Live · Operational</span>
                <span style={{fontFamily:"'Cormorant',serif",fontSize:11,color:C.dim,fontStyle:"italic"}}>01 of 05</span>
              </div>
              <a href="https://zolarasalon.com" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                <h3 style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(28px,3vw,44px)",fontWeight:400,color:C.ivory,marginBottom:14,lineHeight:1.1,transition:"color 0.3s"}}
                  onMouseEnter={e=>e.target.style.color=C.sand} onMouseLeave={e=>e.target.style.color=C.ivory}>Zolara Beauty Studio</h3>
              </a>
              <p style={{fontSize:14,fontWeight:300,color:C.muted,lineHeight:1.88,marginBottom:28,maxWidth:520}}>Premium salon and beauty services. Flagship operational subsidiary. Sakasaka, Tamale — serving Northern Ghana.</p>
              <a href="https://zolarasalon.com" target="_blank" rel="noopener noreferrer" className="bs" style={{padding:"10px 24px",fontSize:9}}>Visit Site →</a>
            </div>
            <div className="hm" style={{display:"flex",alignItems:"center",justifyContent:"center",background:`radial-gradient(ellipse at center,${C.green},${C.bg})`}}>
              <img src="/zh-logo.jpeg" alt="ZH" style={{width:80,height:80,objectFit:"contain",opacity:0.08}}/>
            </div>
          </div>

          {/* 2×2 grid */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1}} >
            {[
              {n:"02",name:"Zolara Properties",desc:"Real estate investment and property development across Northern Ghana and key urban markets.",tag:"Upcoming"},
              {n:"03",name:"Zolara Logistics",desc:"Supply chain coordination and last-mile delivery infrastructure across the Northern region.",tag:"Upcoming"},
              {n:"04",name:"Zolara Pharma & Wellness",desc:"Pharmaceutical retail and community wellness services for underserved Ghanaian communities.",tag:"Upcoming"},
              {n:"05",name:"Zolara Hospitality",desc:"Premium accommodation and world-class guest experience development.",tag:"Future"},
            ].map((s,i)=>(
              <div key={s.name} className={`pc r d${i+1}`} style={{background:C.panel,padding:"40px 44px"}}>
                <div className="pc-line"/>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:22}}>
                  <span style={{fontFamily:"'Cormorant',serif",fontSize:13,color:C.dim,fontStyle:"italic"}}>{s.n}</span>
                  <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:C.dim,letterSpacing:"0.22em",textTransform:"uppercase",padding:"3px 10px",background:C.border}}>{s.tag}</span>
                </div>
                <h4 style={{fontFamily:"'Cormorant',serif",fontSize:26,fontWeight:500,color:C.ivory,marginBottom:12,lineHeight:1.2}}>{s.name}</h4>
                <p style={{fontSize:13,fontWeight:300,color:C.muted,lineHeight:1.88}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━ VALUES ━━━━ */}
      {/* Dark green bg, values punching through with large roman type */}
      <section style={{background:C.greenMid,padding:"140px 52px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 70% 80% at 30% 50%,${C.bg}60,transparent)`}}/>
        <div style={{position:"absolute",top:-80,right:-40,fontFamily:"'Cormorant',serif",fontSize:"clamp(180px,26vw,360px)",fontWeight:600,color:"#0D240F0A",lineHeight:1,pointerEvents:"none",userSelect:"none"}}>03</div>

        <div style={{maxWidth:1400,margin:"0 auto",position:"relative",zIndex:2}}>
          <div className="rl" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:80,flexWrap:"wrap",gap:32}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <span style={{width:24,height:1,background:C.sand,opacity:0.35}}/>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.55em",textTransform:"uppercase"}}>Core Values</span>
            </div>
            <h2 className="rr" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(34px,4vw,54px)",fontWeight:300,color:C.ivory}}>What <em style={{color:C.sand}}>Guides Us</em></h2>
          </div>

          {/* Horizontal, no card borders — pure type */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0,borderTop:`1px solid ${C.dim}`,paddingTop:52}} className="g4">
            {[{r:"Ⅰ",t:"Integrity",d:"Honesty and transparency in every decision, relationship, and transaction."},{r:"Ⅱ",t:"Focus",d:"Disciplined execution over distraction. Fewer things, far greater depth."},{r:"Ⅲ",t:"Leadership",d:"Leading with clarity, vision, and deep responsibility to build and uplift."},{r:"Ⅳ",t:"Excellence",d:"The highest standard in every business operated and every team we build."}].map((v,i)=>(
              <div key={v.t} className={`r d${i+1}`} style={{paddingRight:36,borderRight:i<3?`1px solid ${C.dim}`:undefined,paddingLeft:i>0?36:0,transition:"opacity 0.3s"}}
                onMouseEnter={e=>e.currentTarget.style.opacity="0.7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <div style={{fontFamily:"'Cormorant',serif",fontSize:72,fontWeight:300,color:`${C.sand}14`,lineHeight:1,marginBottom:24,fontStyle:"italic"}}>{v.r}</div>
                <h4 style={{fontFamily:"'Cormorant',serif",fontSize:28,fontWeight:500,color:C.ivory,marginBottom:14}}>{v.t}</h4>
                <div style={{width:16,height:1,background:C.sand,marginBottom:14,opacity:0.3}}/>
                <p style={{fontSize:13,fontWeight:300,color:"#6A7868",lineHeight:1.88}}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━ LEADERSHIP ━━━━ */}
      {/* Massive name, minimal everything else */}
      <section id="leadership" className="pad" style={{padding:"160px 52px",background:C.bg,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:-80,left:-40,fontFamily:"'Cormorant',serif",fontSize:"clamp(180px,28vw,400px)",fontWeight:600,color:"#0A14080A",lineHeight:1,pointerEvents:"none",userSelect:"none"}}>04</div>

        <div style={{maxWidth:1400,margin:"0 auto",position:"relative",zIndex:2}}>
          <div className="rl" style={{display:"flex",alignItems:"center",gap:16,marginBottom:80}}>
            <span style={{width:24,height:1,background:C.sand,opacity:0.35}}/>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.55em",textTransform:"uppercase"}}>Leadership</span>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}} className="g2">
            {/* Left: portrait */}
            <div className="rf" style={{position:"relative"}}>
              <div style={{background:C.greenMid,border:`1px solid ${C.line}`,aspectRatio:"3/4",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",maxWidth:480}}>
                <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 30%,${C.greenHi},${C.bg})`}}/>
                <div style={{position:"relative",zIndex:2,textAlign:"center"}}>
                  <img src="/zh-logo.jpeg" alt="ZH" style={{width:90,height:90,objectFit:"contain",opacity:0.07,marginBottom:12}}/>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:C.dim,letterSpacing:"0.5em",textTransform:"uppercase"}}>Portrait</p>
                </div>
                {[[{top:18,left:18},"M0,22 L0,0 L22,0"],[{top:18,right:18},"M0,0 L22,0 L22,22"],[{bottom:18,left:18},"M0,0 L0,22 L22,22"],[{bottom:18,right:18},"M22,0 L22,22 L0,22"]].map(([pos,d],idx)=>(
                  <svg key={idx} width="22" height="22" viewBox="0 0 22 22" style={{position:"absolute",...pos,opacity:0.35}}>
                    <path d={d} fill="none" stroke="#E2D4B0" strokeWidth="1"/>
                  </svg>
                ))}
              </div>
              <div style={{position:"absolute",bottom:-1,left:0,width:"60%",height:1,background:`linear-gradient(90deg,${C.sand},transparent)`}}/>
            </div>

            {/* Right: bio */}
            <div>
              <h2 className="r" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(52px,7vw,100px)",fontWeight:300,color:C.ivory,lineHeight:0.95,marginBottom:16,letterSpacing:"-0.01em"}}>
                Haruna<br/><em style={{color:C.sand}}>Salifu</em>
              </h2>
              <p className="r d1" style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,color:C.muted,letterSpacing:"0.38em",textTransform:"uppercase",marginBottom:40}}>Founder & Executive Director</p>
              <div className="r d1" style={{width:40,height:1,background:C.sand,marginBottom:36,opacity:0.4}}/>
              <p className="r d2" style={{fontSize:15,fontWeight:300,color:C.warm,lineHeight:1.95,marginBottom:20,opacity:0.85}}>Haruna Salifu is the founder and Executive Director of Zolara Holdings Ltd. His strategic leadership drives the mission to build high-value companies across beauty, real estate, wellness, and logistics in Ghana.</p>
              <p className="r d3" style={{fontSize:15,fontWeight:300,color:C.warm,lineHeight:1.95,marginBottom:48,opacity:0.65}}>With a focus on discipline and structured investment, he leads with long-term thinking and a deep commitment to building businesses that endure generations.</p>
              <div className="r d4" style={{borderLeft:`2px solid ${C.sand}40`,paddingLeft:22}}>
                <p style={{fontFamily:"'Cormorant',serif",fontSize:20,fontStyle:"italic",color:C.muted,lineHeight:1.75}}>"The goal is not to open companies.<br/>It is to build institutions."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━ TIMELINE ━━━━ */}
      <section style={{background:C.panel,padding:"120px 52px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:-60,left:-20,fontFamily:"'Cormorant',serif",fontSize:"clamp(180px,26vw,360px)",fontWeight:600,color:"#0A14080A",lineHeight:1,pointerEvents:"none",userSelect:"none"}}>05</div>
        <div style={{maxWidth:1400,margin:"0 auto",position:"relative",zIndex:2}}>
          <div className="rl" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:80,flexWrap:"wrap",gap:32}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <span style={{width:24,height:1,background:C.sand,opacity:0.35}}/>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.55em",textTransform:"uppercase"}}>Timeline</span>
            </div>
            <h2 className="rr" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(32px,4vw,52px)",fontWeight:300,color:C.ivory}}>Strategic <em style={{color:C.sand}}>Roadmap</em></h2>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1}} className="g3">
            {[
              {y:"2025",t:"Group Formation",d:"Establishment of Zolara Holdings Ltd and launch of Zolara Beauty Studio in Tamale. Total capital deployed exceeds GHS 2,000,000.",live:true},
              {y:"2026",t:"Real Estate",d:"Launch of Zolara Properties — real estate development and property management across Northern Ghana and key urban markets."},
              {y:"2027",t:"Pharma & Wellness",d:"Entry into pharmaceutical retail and community wellness — expanding Zolara's health footprint across Ghana."},
            ].map((item,i)=>(
              <div key={item.y} className={`r d${i+1}`} style={{background:item.live?C.greenMid:C.bg,border:`1px solid ${C.border}`,padding:"44px 38px",borderTop:item.live?`2px solid ${C.sand}`:`1px solid ${C.border}`,position:"relative",overflow:"hidden"}}>
                <span style={{position:"absolute",bottom:-14,right:10,fontFamily:"'Cormorant',serif",fontSize:90,fontWeight:600,color:item.live?`${C.sand}0E`:C.border,lineHeight:1,userSelect:"none"}}>{item.y}</span>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:item.live?C.sand:"transparent",border:`1px solid ${item.live?C.sand:C.dim}`,boxShadow:item.live?`0 0 14px ${C.sand}60`:undefined,animation:item.live?"glow 2.6s ease-in-out infinite":"none"}}/>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:item.live?C.sand:C.muted,letterSpacing:"0.5em",textTransform:"uppercase"}}>{item.y}</p>
                </div>
                <h3 style={{fontFamily:"'Cormorant',serif",fontSize:28,fontWeight:500,color:C.ivory,marginBottom:14}}>{item.t}</h3>
                <p style={{fontSize:13,fontWeight:300,color:C.muted,lineHeight:1.88}}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━ CONTACT ━━━━ */}
      <section id="contact" className="pad" style={{padding:"160px 52px",background:C.bg,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 60% 70% at 80% 60%,${C.greenMid}70,transparent)`}}/>
        <div style={{position:"absolute",top:-60,right:-20,fontFamily:"'Cormorant',serif",fontSize:"clamp(180px,28vw,380px)",fontWeight:600,color:"#0A14080A",lineHeight:1,pointerEvents:"none",userSelect:"none"}}>06</div>

        <div style={{maxWidth:1400,margin:"0 auto",position:"relative",zIndex:2}}>
          <div className="rl" style={{display:"flex",alignItems:"center",gap:16,marginBottom:80}}>
            <span style={{width:24,height:1,background:C.sand,opacity:0.35}}/>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.55em",textTransform:"uppercase"}}>Contact</span>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:100,alignItems:"start"}} className="g2">
            <div>
              <h2 className="r" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(40px,5.5vw,78px)",fontWeight:300,color:C.ivory,lineHeight:1.0,marginBottom:52,letterSpacing:"0.005em"}}>
                Investment<br/><em style={{color:C.sand}}>Inquiries</em>
              </h2>
              <div className="r d1" style={{display:"flex",flexDirection:"column",gap:32,marginBottom:56}}>
                {[{i:"✉",l:"Email",v:"info@zolaraholdings.com",h:"mailto:info@zolaraholdings.com"},{i:"✆",l:"Phone",v:"+233 594 922 679",h:"tel:+233594922679"},{i:"✆",l:"Alt",v:"+233 249 978 750",h:"tel:+233249978750"},{i:"◎",l:"Location",v:"Tamale, Northern Region, Ghana",h:null}].map(c=>(
                  <div key={c.v} style={{display:"flex",gap:20,alignItems:"flex-start"}}>
                    <span style={{color:C.sand,fontSize:12,width:20,marginTop:2,flexShrink:0,opacity:0.6}}>{c.i}</span>
                    <div>
                      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:C.dim,letterSpacing:"0.5em",textTransform:"uppercase",marginBottom:5}}>{c.l}</p>
                      {c.h?<a href={c.h} style={{fontSize:14,fontWeight:300,color:C.warm,textDecoration:"none",transition:"color 0.3s"}} onMouseEnter={e=>e.target.style.color=C.sand} onMouseLeave={e=>e.target.style.color=C.warm}>{c.v}</a>:<p style={{fontSize:14,fontWeight:300,color:C.warm}}>{c.v}</p>}
                    </div>
                  </div>
                ))}
              </div>
              <p className="r d2" style={{fontSize:14,fontWeight:300,color:C.muted,lineHeight:1.92,maxWidth:400}}>Whether you're an investor, a partner, or someone who shares our vision for building lasting enterprises across Africa — we'd like to hear from you.</p>
            </div>

            <div className="r d1">
              {sent?(
                <div style={{background:C.panel,border:`1px solid ${C.sand}22`,padding:"60px 48px",textAlign:"center"}}>
                  <div style={{fontSize:32,color:C.sand,marginBottom:20,opacity:0.7}}>✓</div>
                  <p style={{fontFamily:"'Cormorant',serif",fontSize:30,color:C.ivory,marginBottom:12}}>Message Received</p>
                  <p style={{fontSize:13,color:C.muted,fontWeight:300}}>We'll be in touch shortly.</p>
                </div>
              ):(
                <div style={{display:"flex",flexDirection:"column",gap:1}}>
                  <input className="ff" placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                  <input className="ff" type="email" placeholder="Email Address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                  <select className="ff" style={{appearance:"none"}} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                    <option value="" disabled>Inquiry Type</option>
                    <option>Investment Partnership</option>
                    <option>Business Proposal</option>
                    <option>General Inquiry</option>
                    <option>Media & Press</option>
                  </select>
                  <textarea className="ff" placeholder="Your Message" rows={6} value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} style={{resize:"none"}}/>
                  <button className="bp" style={{width:"100%",justifyContent:"center",marginTop:1}} onClick={()=>{if(form.name&&form.email)setSent(true);}}>
                    <span>Send Message <svg width="14" height="6" viewBox="0 0 14 6" fill="none"><path d="M0 3H12M8.5 1l3 2-3 2" stroke="currentColor" strokeWidth="1.1"/></svg></span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━ FOOTER ━━━━ */}
      <footer style={{background:"#020804",padding:"40px 52px",borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1400,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:20,marginBottom:28,paddingBottom:28,borderBottom:`1px solid ${C.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <img src="/zh-logo.jpeg" alt="ZH" style={{width:32,height:32,objectFit:"contain",opacity:0.3}}/>
              <div>
                <div style={{fontFamily:"'Cormorant',serif",fontSize:12,color:C.dim,letterSpacing:"0.35em"}}>ZOLARA HOLDINGS LTD</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:7.5,color:"#121C12",letterSpacing:"0.45em",textTransform:"uppercase",marginTop:2}}>Tamale · Ghana · 2025</div>
              </div>
            </div>
            <nav style={{display:"flex",gap:36}}>
              {[["#about","About"],["#portfolio","Portfolio"],["#leadership","Leadership"],["#contact","Contact"]].map(([h,l])=>
                <a key={h} href={h} style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#1A281A",letterSpacing:"0.28em",textTransform:"uppercase",textDecoration:"none",transition:"color 0.3s"}} onMouseEnter={e=>e.target.style.color=C.sand} onMouseLeave={e=>e.target.style.color="#1A281A"}>{l}</a>
              )}
            </nav>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,color:"#121C12",letterSpacing:"0.14em"}}>© 2026 Zolara Holdings Ltd. All Rights Reserved.</p>
            <a href="/privacy-policy" style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,color:"#121C12",letterSpacing:"0.14em",textDecoration:"none",transition:"color 0.3s"}} onMouseEnter={e=>e.target.style.color=C.sand} onMouseLeave={e=>e.target.style.color="#121C12"}>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
