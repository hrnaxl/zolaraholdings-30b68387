import { useState, useEffect, useRef } from "react";

// Forest green base. New accent: warm sand + deep copper. No gold.
const C = {
  bg:       "#050D07",
  bg2:      "#081209",
  bg3:      "#0C1A0E",
  bg4:      "#101E12",
  forest:   "#1A3520",
  forestMid:"#142C18",
  sand:     "#D8C8A0",
  sandDim:  "#A89870",
  sandFaint:"#D8C8A014",
  copper:   "#A0622A",
  copperLight:"#C07838",
  ivory:    "#EDE8DC",
  warm:     "#B8B0A0",
  muted:    "#526050",
  dim:      "#243024",
  border:   "#0E1C10",
  borderMid:"#182818",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=DM+Sans:wght@200;300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:#050D07;color:#EDE8DC;font-family:'DM Sans',sans-serif;overflow-x:hidden;}
*{cursor:none!important;}
::-webkit-scrollbar{width:2px;}
::-webkit-scrollbar-track{background:#050D07;}
::-webkit-scrollbar-thumb{background:#D8C8A025;}

.cdot{position:fixed;width:5px;height:5px;background:#D8C8A0;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);}
.cring{position:fixed;width:28px;height:28px;border:1px solid #D8C8A035;border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);transition:left 0.1s ease,top 0.1s ease;}

.noise{position:fixed;inset:0;pointer-events:none;z-index:9000;opacity:0.035;
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
background-size:160px;}

/* NAV */
.nlink{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:300;letter-spacing:0.22em;text-transform:uppercase;color:#4A5A48;text-decoration:none;position:relative;padding-bottom:3px;transition:color 0.3s;}
.nlink::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:#D8C8A0;transition:width 0.42s cubic-bezier(0.25,0.46,0.45,0.94);}
.nlink:hover{color:#D8C8A0;}
.nlink:hover::after{width:100%;}

/* BUTTONS */
.bprimary{display:inline-flex;align-items:center;gap:12px;padding:17px 46px;background:#D8C8A0;color:#050D07;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:0.26em;text-transform:uppercase;text-decoration:none;position:relative;overflow:hidden;transition:background 0.35s,box-shadow 0.4s;border:none;}
.bprimary::before{content:'';position:absolute;inset:0;background:#C07838;transform:translateX(-100%);transition:transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94);}
.bprimary span{position:relative;z-index:1;display:flex;align-items:center;gap:12px;}
.bprimary:hover{box-shadow:0 12px 48px #D8C8A022;}
.bprimary:hover::before{transform:translateX(0);}

.bsec{display:inline-flex;align-items:center;gap:12px;padding:16px 44px;background:transparent;color:#D8C8A0;border:1px solid #D8C8A030;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:300;letter-spacing:0.26em;text-transform:uppercase;text-decoration:none;transition:border-color 0.35s,background 0.35s,color 0.35s;}
.bsec:hover{border-color:#D8C8A060;background:#D8C8A008;}

/* SCROLL REVEAL */
.r{opacity:0;transform:translateY(22px);transition:opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94),transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94);}
.r.v{opacity:1;transform:none;}
.r.d1{transition-delay:0.07s;}.r.d2{transition-delay:0.15s;}.r.d3{transition-delay:0.24s;}.r.d4{transition-delay:0.34s;}.r.d5{transition-delay:0.45s;}.r.d6{transition-delay:0.58s;}
.rf{opacity:0;transition:opacity 1.2s ease;}.rf.v{opacity:1;}
.rslide{opacity:0;transform:translateX(-32px);transition:opacity 1s cubic-bezier(0.25,0.46,0.45,0.94),transform 1s cubic-bezier(0.25,0.46,0.45,0.94);}.rslide.v{opacity:1;transform:none;}
.rright{opacity:0;transform:translateX(32px);transition:opacity 1s cubic-bezier(0.25,0.46,0.45,0.94),transform 1s cubic-bezier(0.25,0.46,0.45,0.94);}.rright.v{opacity:1;transform:none;}
.rline{width:0!important;transition:width 1.4s cubic-bezier(0.25,0.46,0.45,0.94)!important;}.rline.v{width:var(--tw,52px)!important;}

/* TICKER */
@keyframes tick{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.tickwrap{display:flex;animation:tick 30s linear infinite;white-space:nowrap;}
.tickwrap:hover{animation-play-state:paused;}

/* CARDS */
.scard{background:#081209;border:1px solid #0E1C10;position:relative;overflow:hidden;transition:border-color 0.4s,transform 0.4s,box-shadow 0.4s;}
.scard::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:linear-gradient(90deg,#D8C8A0,#C07838);transition:width 0.5s cubic-bezier(0.25,0.46,0.45,0.94);}
.scard:hover{border-color:#D8C8A015;transform:translateY(-3px);box-shadow:0 24px 64px rgba(0,0,0,0.45);}
.scard:hover::after{width:100%;}

.ff{width:100%;background:#081209;border:1px solid #0E1C10;color:#EDE8DC;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:300;letter-spacing:0.03em;padding:17px 22px;outline:none;transition:border-color 0.3s;}
.ff::placeholder{color:#1E2C1E;}
.ff:focus{border-color:#D8C8A030;}

/* SECTION NUMBER */
.secnum{font-family:'Cormorant',serif;font-size:120px;font-weight:300;color:#0E1C1008;line-height:1;position:absolute;top:-20px;right:-10px;pointer-events:none;user-select:none;letter-spacing:-0.02em;}

@keyframes breathe{0%,100%{opacity:0.4;transform:scaleY(1);}50%{opacity:0.9;transform:scaleY(1.1);}}
@keyframes glow{0%,100%{box-shadow:0 0 0 0 #D8C8A028;}50%{box-shadow:0 0 20px 4px #D8C8A000;}}
@keyframes rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
@keyframes rotateback{from{transform:rotate(0deg);}to{transform:rotate(-360deg);}}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}

@media(max-width:1100px){.col2{grid-template-columns:1fr!important;gap:60px!important;}.hidem{display:none!important;}}
@media(max-width:768px){.col3{grid-template-columns:1fr!important;}.col4{grid-template-columns:1fr 1fr!important;}.hnav{display:none!important;}.padbig{padding:80px 24px!important;}.herosize{font-size:clamp(58px,14vw,100px)!important;}}
`;

function useCounter(n,dur=1800,go=false){
  const [v,setV]=useState(0);
  useEffect(()=>{
    if(!go)return;
    let raf,t0=null;
    const num=parseInt(n.replace(/\D/g,""));
    const fn=(ts)=>{if(!t0)t0=ts;const p=Math.min((ts-t0)/dur,1);setV(Math.floor(p*num));if(p<1)raf=requestAnimationFrame(fn);};
    raf=requestAnimationFrame(fn);
    return()=>cancelAnimationFrame(raf);
  },[go,n,dur]);
  return v;
}

function Ctr({n,suf,label}){
  const ref=useRef();const[go,setGo]=useState(false);
  const v=useCounter(n,1800,go);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setGo(true);obs.disconnect();}},{threshold:0.5});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);
  return(
    <div ref={ref}>
      <div style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(44px,5vw,72px)",fontWeight:300,color:C.sand,lineHeight:1,letterSpacing:"-0.01em"}}>{v}{suf}</div>
      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.muted,letterSpacing:"0.35em",textTransform:"uppercase",marginTop:10}}>{label}</div>
    </div>
  );
}

export default function App(){
  const [loaded,setLoaded]=useState(false);
  const [heroIn,setHeroIn]=useState(false);
  const [dot,setDot]=useState({x:-100,y:-100});
  const [ring,setRing]=useState({x:-100,y:-100});
  const [form,setForm]=useState({name:"",email:"",type:"",msg:""});
  const [sent,setSent]=useState(false);

  useEffect(()=>{
    setTimeout(()=>setLoaded(true),60);
    setTimeout(()=>setHeroIn(true),200);
    const mv=(e)=>{setDot({x:e.clientX,y:e.clientY});setTimeout(()=>setRing({x:e.clientX,y:e.clientY}),90);};
    window.addEventListener("mousemove",mv);
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("v");obs.unobserve(e.target);}});},{threshold:0.07,rootMargin:"0px 0px -20px 0px"});
    setTimeout(()=>document.querySelectorAll(".r,.rf,.rslide,.rright,.rline").forEach(el=>obs.observe(el)),300);
    return()=>window.removeEventListener("mousemove",mv);
  },[]);

  const ap=(d=0)=>({opacity:loaded?1:0,transform:loaded?"none":"translateY(14px)",transition:`opacity 0.9s ease ${d}s,transform 0.9s ease ${d}s`});
  const wIn=(d)=>({display:"inline-block",opacity:heroIn?1:0,transform:heroIn?"none":"translateY(108%) skewY(2.5deg)",transition:`opacity 1.2s cubic-bezier(0.16,1,0.3,1) ${d}s,transform 1.2s cubic-bezier(0.16,1,0.3,1) ${d}s`});

  return(
    <div style={{background:C.bg,color:C.ivory,fontFamily:"'DM Sans',sans-serif",overflowX:"hidden"}}>
      <style>{css}</style>
      <div className="noise"/>
      <div className="cdot" style={{left:dot.x,top:dot.y}}/>
      <div className="cring" style={{left:ring.x,top:ring.y}}/>

      {/* ━━━ HEADER ━━━ */}
      <header style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,height:70,background:"#050D07F2",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",borderBottom:"1px solid #0C180E",...ap(0.1)}}>
        <div style={{maxWidth:1360,margin:"0 auto",padding:"0 56px",height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <a href="#" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:14}}>
            <img src="/zh-logo.jpeg" alt="ZH" style={{width:42,height:42,objectFit:"contain"}}/>
            <div>
              <div style={{fontFamily:"'Cormorant',serif",fontSize:16,fontWeight:400,color:C.ivory,letterSpacing:"0.3em"}}>ZOLARA</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:7,color:C.muted,letterSpacing:"0.55em",textTransform:"uppercase",marginTop:1}}>Holdings Ltd</div>
            </div>
          </a>
          <nav className="hnav" style={{display:"flex",gap:44}}>{[["#about","About"],["#portfolio","Portfolio"],["#leadership","Leadership"],["#contact","Contact"]].map(([h,l])=><a key={h} href={h} className="nlink">{l}</a>)}</nav>
          <a href="#contact" className="bsec hidem" style={{padding:"9px 22px",fontSize:9}}>Inquire</a>
        </div>
      </header>

      {/* ━━━ HERO ━━━ */}
      {/* Asymmetric: number left, massive type right-aligned */}
      <section style={{minHeight:"100vh",background:C.bg,position:"relative",overflow:"hidden",paddingTop:70,display:"flex",alignItems:"stretch"}}>

        {/* Deep forest atmosphere */}
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 75% 80% at 75% 45%,${C.forest}70 0%,transparent 65%)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 40% 50% at 10% 90%,${C.forestMid}90 0%,transparent 55%)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 60% 50% at 50% 50%,${C.sand}03 0%,transparent 60%)`,pointerEvents:"none"}}/>

        {/* Orbiting rings right side */}
        <div className="hidem" style={{position:"absolute",top:"50%",right:"18%",width:560,height:560,animation:"rotate 70s linear infinite",pointerEvents:"none"}}>
          <svg width="560" height="560" viewBox="0 0 560 560" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
            <circle cx="280" cy="280" r="250" stroke="#D8C8A0" strokeWidth="0.4" fill="none" strokeDasharray="1 18" opacity="0.1"/>
          </svg>
        </div>
        <div className="hidem" style={{position:"absolute",top:"50%",right:"18%",width:380,height:380,animation:"rotateback 44s linear infinite",pointerEvents:"none"}}>
          <svg width="380" height="380" viewBox="0 0 380 380" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
            <circle cx="190" cy="190" r="168" stroke="#A0622A" strokeWidth="0.6" fill="none" strokeDasharray="2 14" opacity="0.12"/>
          </svg>
        </div>

        <div style={{maxWidth:1360,margin:"0 auto",padding:"0 56px",width:"100%",display:"flex",alignItems:"center",position:"relative",zIndex:2}}>
          <div style={{width:"100%"}}>

            {/* Top row: label + year */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:72,...ap(0.25)}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{width:20,height:1,background:C.sand,opacity:0.4}}/>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.5em",textTransform:"uppercase"}}>Strategic Investment Group</span>
              </div>
              <span className="hidem" style={{fontFamily:"'Cormorant',serif",fontSize:13,color:C.dim,letterSpacing:"0.2em",fontStyle:"italic"}}>Tamale, Ghana — Est. 2025</span>
            </div>

            {/* MASSIVE right-aligned headline */}
            <div style={{textAlign:"right",marginBottom:0}}>
              {["Building","Businesses"].map((w,i)=>(
                <div key={w} style={{overflow:"hidden",lineHeight:0.88,marginBottom:8}}>
                  <span className="herosize" style={{...wIn(0.25+i*0.14),fontFamily:"'Cormorant',serif",fontSize:"clamp(80px,12.5vw,172px)",fontWeight:300,color:C.ivory,lineHeight:0.88,letterSpacing:"-0.02em",display:"inline-block"}}>{w}</span>
                </div>
              ))}
              {/* "That Last." — sand colored, italic, offset left */}
              <div style={{display:"flex",alignItems:"baseline",justifyContent:"flex-end",gap:0,overflow:"hidden",lineHeight:0.88}}>
                <span style={{...wIn(0.54),fontFamily:"'Cormorant',serif",fontSize:"clamp(80px,12.5vw,172px)",fontWeight:300,lineHeight:0.88,fontStyle:"italic",color:C.sand,display:"inline-block",letterSpacing:"-0.02em"}}>That Last.</span>
              </div>
            </div>

            {/* Horizontal divider */}
            <div style={{height:1,background:`linear-gradient(to left,${C.sand}70,${C.sand}15,transparent)`,width:heroIn?"65%":0,marginLeft:"auto",transition:"width 1.9s cubic-bezier(0.25,0.46,0.45,0.94) 0.95s",marginTop:52,marginBottom:52}}/>

            {/* Sub + CTA two column */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:36,...ap(1.1)}}>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:300,color:C.warm,maxWidth:460,lineHeight:1.9,letterSpacing:"0.02em",opacity:0.8}}>
                A Ghanaian holding company investing, building, and scaling premium businesses across beauty, real estate, logistics, and wellness — with a long-term vision for Africa.
              </p>
              <div style={{display:"flex",gap:14,flexShrink:0}}>
                <a href="#portfolio" className="bprimary"><span>Our Portfolio <svg width="15" height="7" viewBox="0 0 15 7" fill="none"><path d="M0 3.5H13M9 1l4 2.5-4 2.5" stroke="#050D07" strokeWidth="1.1"/></svg></span></a>
                <a href="#contact" className="bsec">Inquire</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom left: rotated vertical text */}
        <div className="hidem" style={{position:"absolute",bottom:56,left:40,display:"flex",alignItems:"center",gap:12,...ap(2)}}>
          <div style={{width:1,height:40,background:`linear-gradient(to bottom,${C.sand}60,transparent)`,animation:"breathe 2.8s ease-in-out infinite"}}/>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:C.dim,letterSpacing:"0.45em",textTransform:"uppercase",transform:"rotate(90deg) translateX(8px)",transformOrigin:"left center",whiteSpace:"nowrap"}}>Scroll</span>
        </div>
      </section>

      {/* ━━━ STATS BAND — full dark green strip ━━━ */}
      <div style={{background:C.forest,padding:"56px 56px"}}>
        <div style={{maxWidth:1360,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0}} className="col4">
          {[["5","","Portfolio Companies"],["700","K+","Capital Deployed GHS"],["2025","","Year Founded"],["7","","Staff Employed"]].map(([n,s,l],i)=>(
            <div key={l} style={{padding:"0 0",borderRight:i<3?"1px solid #243024":"none",paddingLeft:i>0?40:0}}>
              <Ctr n={n} suf={s} label={l}/>
            </div>
          ))}
        </div>
      </div>

      {/* ━━━ ABOUT ━━━ */}
      {/* New layout: full width, stacked, large number in bg */}
      <section id="about" className="padbig" style={{padding:"160px 56px",background:C.bg,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,bottom:0,width:"38%",background:`linear-gradient(to right,${C.forestMid}60,transparent)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",fontFamily:"'Cormorant',serif",fontSize:"28vw",fontWeight:600,color:"#0A160A05",lineHeight:1,bottom:-40,right:-20,pointerEvents:"none",userSelect:"none",letterSpacing:"-0.04em"}}>ZH</div>

        <div style={{maxWidth:1360,margin:"0 auto",position:"relative",zIndex:2}}>
          {/* Top label row */}
          <div className="rslide" style={{display:"flex",alignItems:"center",gap:16,marginBottom:64}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.5em",textTransform:"uppercase"}}>01 / About</span>
            <span style={{flex:1,height:1,background:`linear-gradient(to right,${C.borderMid},transparent)`}}/>
          </div>

          {/* Two col: big quote + body text */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:100,alignItems:"start"}} className="col2">
            <div>
              <h2 className="r" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(40px,5vw,72px)",fontWeight:300,lineHeight:1.05,color:C.ivory,letterSpacing:"0.005em",marginBottom:0}}>
                About <em style={{color:C.sand}}>Zolara</em><br/>
                <em style={{color:C.sand}}>Holdings</em>
              </h2>
              <div className="rline r d1" style={{"--tw":"56px",width:56,height:1,background:C.sand,marginTop:40,marginBottom:0,opacity:0.5}}/>
            </div>
            <div style={{paddingTop:8}}>
              <p className="r d1" style={{fontSize:16,fontWeight:300,color:C.warm,lineHeight:1.95,marginBottom:24,letterSpacing:"0.02em",opacity:0.85}}>
                We are a Ghanaian holding company focused on developing, owning, and managing businesses across beauty, wellness, real estate, logistics, and hospitality.
              </p>
              <p className="r d2" style={{fontSize:16,fontWeight:300,color:C.warm,lineHeight:1.95,marginBottom:52,letterSpacing:"0.02em",opacity:0.7}}>
                Our role is to provide leadership, capital, and strategy — helping each business grow with strength and stability for the long term. We centralize finance, branding, and operations to reduce risk and enable scale.
              </p>
              <div className="r d3"><a href="#portfolio" className="bsec">Explore Portfolio</a></div>
            </div>
          </div>

          {/* Three pillars row */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2,marginTop:80}} className="col3">
            {[
              {num:"—01",label:"Mission",title:"Strategic Growth",body:"To grow high-value businesses through disciplined investment and hands-on operational leadership."},
              {num:"—02",label:"Vision",title:"African Leadership",body:"To become one of Africa's premier holding companies, known for strong brands and generational wealth."},
              {num:"—03",label:"Philosophy",title:"Structure First",body:"We centralise finance, branding, and operations — reducing risk, enabling scale, protecting long-term value."},
            ].map((item,i)=>(
              <div key={item.label} className={`r d${i+1}`}
                style={{background:C.bg2,border:`1px solid ${C.border}`,padding:"40px 36px",position:"relative",overflow:"hidden",transition:"background 0.4s,border-color 0.4s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=C.bg3;e.currentTarget.style.borderColor="#D8C8A015";}}
                onMouseLeave={e=>{e.currentTarget.style.background=C.bg2;e.currentTarget.style.borderColor=C.border;}}
              >
                <div style={{position:"absolute",top:-8,right:16,fontFamily:"'Cormorant',serif",fontSize:56,color:C.border,fontWeight:300,lineHeight:1,userSelect:"none"}}>{item.num}</div>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:C.sandDim,letterSpacing:"0.5em",textTransform:"uppercase",marginBottom:14}}>{item.label}</p>
                <h3 style={{fontFamily:"'Cormorant',serif",fontSize:26,fontWeight:500,color:C.ivory,marginBottom:16}}>{item.title}</h3>
                <p style={{fontSize:13,fontWeight:300,color:C.muted,lineHeight:1.9}}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FULL BLEED QUOTE ━━━ */}
      {/* Dark forest panel, massive left-aligned quote */}
      <section style={{background:C.forest,padding:"120px 56px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 60% 80% at 80% 50%,${C.bg}60,transparent)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"50%",left:56,transform:"translateY(-50%)",fontFamily:"'Cormorant',serif",fontSize:"22vw",fontWeight:600,color:"#1A3520",lineHeight:1,pointerEvents:"none",userSelect:"none",letterSpacing:"-0.04em",zIndex:0}}>"</div>

        <div style={{maxWidth:1360,margin:"0 auto",position:"relative",zIndex:2,display:"grid",gridTemplateColumns:"1fr 1fr",gap:100,alignItems:"center"}} className="col2">
          <div>
            <blockquote className="r" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(24px,3vw,38px)",fontWeight:300,color:C.ivory,lineHeight:1.65,fontStyle:"italic",letterSpacing:"0.005em"}}>
              I built Zolara Holdings with one purpose — to create businesses that last. Not just to open companies, but to build strong, disciplined brands that will serve communities and stand the test of time.
            </blockquote>
          </div>
          <div style={{paddingLeft:40,borderLeft:`1px solid #243024`}}>
            <div className="rline r" style={{"--tw":"40px",width:40,height:1,background:C.sand,marginBottom:28,opacity:0.5}}/>
            <p className="r d1" style={{fontFamily:"'Cormorant',serif",fontSize:26,color:C.sand,letterSpacing:"0.08em",marginBottom:8}}>Haruna Salifu</p>
            <p className="r d2" style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.muted,letterSpacing:"0.4em",textTransform:"uppercase",marginBottom:40}}>Founder & Executive Director</p>
            <a href="#leadership" className="r d3 bsec" style={{fontSize:9,padding:"12px 28px"}}>Meet the Founder</a>
          </div>
        </div>
      </section>

      {/* ━━━ TICKER ━━━ */}
      <div style={{background:C.bg2,borderBottom:`1px solid ${C.border}`,padding:"14px 0",overflow:"hidden"}}>
        <div className="tickwrap">
          {[...Array(6)].map((_,i)=>["Zolara Beauty Studio","Zolara Properties","Zolara Logistics","Zolara Pharma & Wellness","Zolara Hospitality"].map((s,j)=>(
            <span key={`${i}-${j}`} style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.muted,letterSpacing:"0.35em",textTransform:"uppercase",padding:"0 36px"}}>
              {s} <span style={{color:C.dim,marginLeft:6}}>◆</span>
            </span>
          )))}
        </div>
      </div>

      {/* ━━━ PORTFOLIO ━━━ */}
      {/* New: left side sticky label, right side scrolling cards */}
      <section id="portfolio" className="padbig" style={{padding:"160px 56px",background:C.bg,position:"relative",overflow:"hidden"}}>
        <div style={{maxWidth:1360,margin:"0 auto"}}>

          {/* Header row */}
          <div className="rslide" style={{display:"flex",alignItems:"center",gap:16,marginBottom:72}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.5em",textTransform:"uppercase"}}>02 / Portfolio</span>
            <span style={{flex:1,height:1,background:`linear-gradient(to right,${C.borderMid},transparent)`}}/>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:80,alignItems:"start"}} className="col2">
            {/* Sticky left */}
            <div style={{position:"sticky",top:110}}>
              <h2 className="r" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(38px,4vw,52px)",fontWeight:300,color:C.ivory,lineHeight:1.1,letterSpacing:"0.005em",marginBottom:28}}>
                Our<br/><em style={{color:C.sand}}>Subsidiaries</em><br/>&amp; Divisions
              </h2>
              <div className="rline r d1" style={{"--tw":"48px",width:48,height:1,background:C.sand,marginBottom:28,opacity:0.5}}/>
              <p className="r d2" style={{fontSize:13,fontWeight:300,color:C.muted,lineHeight:1.9}}>Five divisions under one structure. Backed by shared capital, brand governance, and direct oversight.</p>
            </div>

            {/* Cards right */}
            <div style={{display:"flex",flexDirection:"column",gap:2}}>
              {/* Featured */}
              <div className="r d1" style={{background:C.forest,border:`1px solid #243024`,display:"grid",gridTemplateColumns:"1fr auto",gap:0,overflow:"hidden",minHeight:200,transition:"border-color 0.4s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor="#D8C8A018"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="#243024"}
              >
                <div style={{padding:"44px 48px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24}}>
                    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:C.sand,letterSpacing:"0.4em",textTransform:"uppercase",border:`1px solid ${C.sand}35`,padding:"4px 12px"}}>Live · Operational</span>
                    <span style={{fontFamily:"'Cormorant',serif",fontSize:11,color:C.dim,fontStyle:"italic"}}>01 of 05</span>
                  </div>
                  <a href="https://zolarasalon.com" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                    <h3 style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(24px,3vw,38px)",fontWeight:400,color:C.ivory,marginBottom:14,lineHeight:1.15,transition:"color 0.3s"}}
                      onMouseEnter={e=>e.target.style.color=C.sand}
                      onMouseLeave={e=>e.target.style.color=C.ivory}
                    >Zolara Beauty Studio</h3>
                  </a>
                  <p style={{fontSize:13,fontWeight:300,color:C.muted,lineHeight:1.85,marginBottom:28,maxWidth:480}}>Premium salon and beauty services. Flagship operational subsidiary. Sakasaka, Tamale — serving Northern Ghana.</p>
                  <a href="https://zolarasalon.com" target="_blank" rel="noopener noreferrer" className="bsec" style={{padding:"10px 24px",fontSize:9}}>Visit Site →</a>
                </div>
                <div className="hidem" style={{width:200,display:"flex",alignItems:"center",justifyContent:"center",borderLeft:`1px solid #243024`,background:`radial-gradient(ellipse at center,${C.bg3},${C.bg})`}}>
                  <img src="/zh-logo.jpeg" alt="ZH" style={{width:90,height:90,objectFit:"contain",opacity:0.1}}/>
                </div>
              </div>

              {/* Sub-grid */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2}} >
                {[
                  {n:"02",name:"Zolara Properties",desc:"Real estate investment and property development.",tag:"Upcoming"},
                  {n:"03",name:"Zolara Logistics",desc:"Supply chain coordination and last-mile delivery.",tag:"Upcoming"},
                  {n:"04",name:"Zolara Pharma",desc:"Pharmaceutical retail and wellness services.",tag:"Upcoming"},
                  {n:"05",name:"Zolara Hospitality",desc:"Premium accommodation development.",tag:"Future"},
                ].map((s,i)=>(
                  <div key={s.name} className={`scard r d${i+2}`} style={{padding:"34px 30px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
                      <span style={{fontFamily:"'Cormorant',serif",fontSize:13,color:C.dim,fontStyle:"italic"}}>{s.n}</span>
                      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:7.5,color:C.dim,letterSpacing:"0.2em",textTransform:"uppercase",padding:"3px 10px",background:C.border}}>{s.tag}</span>
                    </div>
                    <h4 style={{fontFamily:"'Cormorant',serif",fontSize:22,fontWeight:500,color:C.ivory,marginBottom:10,lineHeight:1.3}}>{s.name}</h4>
                    <p style={{fontSize:12,fontWeight:300,color:C.muted,lineHeight:1.88}}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ VALUES — horizontal grid with large roman numerals ━━━ */}
      <section style={{background:C.bg2,padding:"140px 56px"}}>
        <div style={{maxWidth:1360,margin:"0 auto"}}>
          <div className="rslide" style={{display:"flex",alignItems:"center",gap:16,marginBottom:72}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.5em",textTransform:"uppercase"}}>03 / Values</span>
            <span style={{flex:1,height:1,background:`linear-gradient(to right,${C.borderMid},transparent)`}}/>
            <h2 className="rright" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(28px,3vw,42px)",fontWeight:300,color:C.ivory,whiteSpace:"nowrap"}}>Core <em style={{color:C.sand}}>Values</em></h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0,borderLeft:`1px solid ${C.border}`,borderTop:`1px solid ${C.border}`}} className="col4">
            {[{r:"I",t:"Integrity",d:"Honesty and transparency in every decision, relationship, and transaction."},{r:"II",t:"Focus",d:"Disciplined execution over distraction. Fewer pursuits, far greater depth."},{r:"III",t:"Leadership",d:"We lead with clarity, vision, and deep responsibility to build and uplift."},{r:"IV",t:"Excellence",d:"The highest standard in every business operated and every team developed."}].map((v,i)=>(
              <div key={v.t} className={`r d${i+1}`} style={{borderRight:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,padding:"48px 34px",transition:"background 0.35s"}}
                onMouseEnter={e=>e.currentTarget.style.background=C.bg3}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <div style={{fontFamily:"'Cormorant',serif",fontSize:64,fontWeight:300,color:C.dim,lineHeight:1,marginBottom:28,fontStyle:"italic"}}>{v.r}</div>
                <div style={{width:18,height:1,background:C.sand,marginBottom:18,opacity:0.4}}/>
                <h4 style={{fontFamily:"'Cormorant',serif",fontSize:26,fontWeight:500,color:C.ivory,marginBottom:14}}>{v.t}</h4>
                <p style={{fontSize:13,fontWeight:300,color:C.muted,lineHeight:1.88}}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ LEADERSHIP ━━━ */}
      {/* Full width, text on right, portrait left */}
      <section id="leadership" className="padbig" style={{padding:"160px 0",background:C.bg,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",left:0,top:0,bottom:0,width:"48%",background:`linear-gradient(to right,${C.forestMid}55,transparent)`,pointerEvents:"none"}}/>

        <div style={{maxWidth:1360,margin:"0 auto",padding:"0 56px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,alignItems:"center"}} className="col2">
          {/* Portrait — edge to edge feel */}
          <div className="rf" style={{position:"relative",paddingRight:64}}>
            <div style={{background:C.forestMid,border:`1px solid ${C.borderMid}`,aspectRatio:"4/5",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",maxWidth:460}}>
              <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 30%,${C.forest}95,${C.bg})`}}/>
              <div style={{position:"relative",zIndex:2,textAlign:"center"}}>
                <img src="/zh-logo.jpeg" alt="ZH" style={{width:100,height:100,objectFit:"contain",opacity:0.08,marginBottom:16}}/>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:C.dim,letterSpacing:"0.45em",textTransform:"uppercase"}}>Portrait</p>
              </div>
              {[[{top:20,left:20},"M0,24 L0,0 L24,0"],[{top:20,right:20},"M0,0 L24,0 L24,24"],[{bottom:20,left:20},"M0,0 L0,24 L24,24"],[{bottom:20,right:20},"M24,0 L24,24 L0,24"]].map(([pos,d],idx)=>(
                <svg key={idx} width="24" height="24" viewBox="0 0 24 24" style={{position:"absolute",...pos,opacity:0.4}}>
                  <path d={d} fill="none" stroke="#D8C8A0" strokeWidth="1"/>
                </svg>
              ))}
            </div>
            <div style={{position:"absolute",bottom:0,left:0,width:"70%",height:1,background:`linear-gradient(90deg,${C.sand},transparent)`}}/>
          </div>

          {/* Bio */}
          <div>
            <div className="rslide" style={{display:"flex",alignItems:"center",gap:16,marginBottom:48}}>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.5em",textTransform:"uppercase"}}>04 / Leadership</span>
              <span style={{width:40,height:1,background:`linear-gradient(to right,${C.borderMid},transparent)`}}/>
            </div>
            <h2 className="r" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(44px,5.5vw,76px)",fontWeight:300,color:C.ivory,lineHeight:1.0,marginBottom:14,letterSpacing:"0.005em"}}>
              Haruna<br/><em style={{color:C.sand}}>Salifu</em>
            </h2>
            <p className="r d1" style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,color:C.muted,letterSpacing:"0.38em",textTransform:"uppercase",marginBottom:40}}>Executive Director</p>
            <div className="rline r d1" style={{"--tw":"44px",width:44,height:1,background:C.sand,marginBottom:36,opacity:0.5}}/>
            <p className="r d2" style={{fontSize:15,fontWeight:300,color:C.warm,lineHeight:1.95,marginBottom:20,letterSpacing:"0.02em",opacity:0.85}}>Haruna Salifu is the founder and Executive Director of Zolara Holdings Ltd. His strategic leadership drives Zolara's mission to build high-value companies across Ghana.</p>
            <p className="r d3" style={{fontSize:15,fontWeight:300,color:C.warm,lineHeight:1.95,marginBottom:48,letterSpacing:"0.02em",opacity:0.7}}>With a focus on discipline and structured investment, he leads with long-term thinking and a deep commitment to building businesses that endure.</p>
            <div className="r d4" style={{paddingLeft:20,borderLeft:`2px solid ${C.sand}50`}}>
              <p style={{fontFamily:"'Cormorant',serif",fontSize:19,fontStyle:"italic",color:C.muted,lineHeight:1.78}}>"The goal is not to open companies.<br/>It is to build institutions."</p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ TIMELINE — horizontal ━━━ */}
      <section style={{background:C.bg2,padding:"120px 56px",position:"relative",overflow:"hidden"}}>
        <div style={{maxWidth:1360,margin:"0 auto"}}>
          <div className="rslide" style={{display:"flex",alignItems:"center",gap:16,marginBottom:72}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.5em",textTransform:"uppercase"}}>05 / Timeline</span>
            <span style={{flex:1,height:1,background:`linear-gradient(to right,${C.borderMid},transparent)`}}/>
            <h2 className="rright" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(28px,3vw,42px)",fontWeight:300,color:C.ivory,whiteSpace:"nowrap"}}>Strategic <em style={{color:C.sand}}>Timeline</em></h2>
          </div>

          {/* Horizontal timeline */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2}} className="col3">
            {[
              {year:"2025",t:"Group Formation",d:"Establishment of Zolara Holdings Ltd and launch of Zolara Beauty Studio in Tamale. Investment exceeds GHS 700,000.",active:true},
              {year:"2026",t:"Real Estate",d:"Launch of Zolara Properties — real estate development and property management across Northern Ghana."},
              {year:"2027",t:"Pharma & Wellness",d:"Entry into pharmaceutical retail and wellness — expanding Zolara's health footprint across Ghana."},
            ].map((item,i)=>(
              <div key={item.year} className={`r d${i+1}`} style={{background:item.active?C.bg3:C.bg2,border:`1px solid ${C.border}`,padding:"44px 36px",position:"relative",overflow:"hidden",borderTop:item.active?`2px solid ${C.sand}`:`1px solid ${C.border}`}}>
                <div style={{fontFamily:"'Cormorant',serif",fontSize:52,fontWeight:300,color:item.active?`${C.sand}22`:C.border,lineHeight:1,position:"absolute",bottom:-8,right:12,userSelect:"none"}}>{item.year}</div>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:item.active?C.sand:C.muted,letterSpacing:"0.5em",textTransform:"uppercase",marginBottom:16}}>{item.year}</p>
                <div style={{width:16,height:16,borderRadius:"50%",border:`1px solid ${item.active?C.sand:C.dim}`,background:item.active?C.sand:"transparent",marginBottom:20,boxShadow:item.active?`0 0 16px ${C.sand}50`:undefined,animation:item.active?"glow 2.8s ease-in-out infinite":"none"}}/>
                <h3 style={{fontFamily:"'Cormorant',serif",fontSize:26,fontWeight:500,color:C.ivory,marginBottom:14}}>{item.t}</h3>
                <p style={{fontSize:13,fontWeight:300,color:C.muted,lineHeight:1.88}}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CONTACT ━━━ */}
      {/* Inverted: form left, contact info right */}
      <section id="contact" className="padbig" style={{padding:"160px 56px",background:C.bg,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:0,right:0,width:"55%",height:"80%",background:`radial-gradient(ellipse at 80% 80%,${C.forestMid}70,transparent)`,pointerEvents:"none"}}/>

        <div style={{maxWidth:1360,margin:"0 auto",position:"relative",zIndex:2}}>
          <div className="rslide" style={{display:"flex",alignItems:"center",gap:16,marginBottom:72}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:C.sandDim,letterSpacing:"0.5em",textTransform:"uppercase"}}>06 / Contact</span>
            <span style={{flex:1,height:1,background:`linear-gradient(to right,${C.borderMid},transparent)`}}/>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:100,alignItems:"start"}} className="col2">
            {/* Form — left */}
            <div>
              <h2 className="r" style={{fontFamily:"'Cormorant',serif",fontSize:"clamp(38px,4.5vw,64px)",fontWeight:300,color:C.ivory,lineHeight:1.08,marginBottom:48,letterSpacing:"0.005em"}}>
                Investment<br/><em style={{color:C.sand}}>Inquiries</em>
              </h2>
              {sent?(
                <div style={{background:C.bg2,border:`1px solid ${C.sand}25`,padding:"56px 44px",textAlign:"center"}}>
                  <div style={{fontSize:32,color:C.sand,marginBottom:20}}>✓</div>
                  <p style={{fontFamily:"'Cormorant',serif",fontSize:28,color:C.ivory,marginBottom:12}}>Message Received</p>
                  <p style={{fontSize:13,color:C.muted,fontWeight:300}}>We'll be in touch shortly.</p>
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
                  <textarea className="ff" placeholder="Your Message" rows={6} value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} style={{resize:"none"}}/>
                  <button className="bprimary" style={{width:"100%",justifyContent:"center",marginTop:2}} onClick={()=>{if(form.name&&form.email)setSent(true);}}>
                    <span>Send Message <svg width="15" height="7" viewBox="0 0 15 7" fill="none"><path d="M0 3.5H13M9 1l4 2.5-4 2.5" stroke="#050D07" strokeWidth="1.1"/></svg></span>
                  </button>
                </div>
              )}
            </div>

            {/* Info — right */}
            <div style={{paddingTop:8}}>
              <p className="r" style={{fontSize:16,fontWeight:300,color:C.warm,lineHeight:1.95,marginBottom:64,letterSpacing:"0.02em",opacity:0.8}}>
                Whether you're an investor, a business partner, or an individual who shares our vision for building lasting enterprises across Africa — we'd like to hear from you.
              </p>
              <div className="r d1" style={{display:"flex",flexDirection:"column",gap:36}}>
                {[
                  {icon:"✉",label:"Email",val:"info@zolaraholdings.com",href:"mailto:info@zolaraholdings.com"},
                  {icon:"✆",label:"Phone",val:"+233 594 922 679",href:"tel:+233594922679"},
                  {icon:"✆",label:"Alt Phone",val:"+233 249 978 750",href:"tel:+233249978750"},
                  {icon:"◎",label:"Location",val:"Tamale, Northern Region, Ghana",href:null},
                ].map(c=>(
                  <div key={c.val} style={{display:"flex",gap:22,alignItems:"flex-start"}}>
                    <span style={{color:C.sand,fontSize:13,width:20,marginTop:2,flexShrink:0,opacity:0.7}}>{c.icon}</span>
                    <div>
                      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:8,color:C.dim,letterSpacing:"0.45em",textTransform:"uppercase",marginBottom:6}}>{c.label}</p>
                      {c.href?<a href={c.href} style={{fontSize:14,fontWeight:300,color:C.warm,textDecoration:"none",transition:"color 0.3s",letterSpacing:"0.02em"}} onMouseEnter={e=>e.target.style.color=C.sand} onMouseLeave={e=>e.target.style.color=C.warm}>{c.val}</a>:<p style={{fontSize:14,fontWeight:300,color:C.warm,letterSpacing:"0.02em"}}>{c.val}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer style={{background:"#030A04",padding:"44px 56px",borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1360,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24,marginBottom:32,paddingBottom:32,borderBottom:`1px solid ${C.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <img src="/zh-logo.jpeg" alt="ZH" style={{width:34,height:34,objectFit:"contain",opacity:0.35}}/>
              <div>
                <div style={{fontFamily:"'Cormorant',serif",fontSize:12,color:C.dim,letterSpacing:"0.35em"}}>ZOLARA HOLDINGS LTD</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:7.5,color:"#172014",letterSpacing:"0.4em",textTransform:"uppercase",marginTop:2}}>Tamale · Ghana · 2025</div>
              </div>
            </div>
            <nav style={{display:"flex",gap:36}}>
              {[["#about","About"],["#portfolio","Portfolio"],["#leadership","Leadership"],["#contact","Contact"]].map(([h,l])=>(
                <a key={h} href={h} style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"#1E2C1E",letterSpacing:"0.25em",textTransform:"uppercase",textDecoration:"none",transition:"color 0.3s"}} onMouseEnter={e=>e.target.style.color=C.sand} onMouseLeave={e=>e.target.style.color="#1E2C1E"}>{l}</a>
              ))}
            </nav>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,color:"#141E14",letterSpacing:"0.14em"}}>© 2026 Zolara Holdings Ltd. All Rights Reserved.</p>
            <a href="/privacy-policy" style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,color:"#141E14",letterSpacing:"0.14em",textDecoration:"none",transition:"color 0.3s"}} onMouseEnter={e=>e.target.style.color=C.sand} onMouseLeave={e=>e.target.style.color="#141E14"}>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
