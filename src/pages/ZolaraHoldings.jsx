import { useState, useEffect, useRef } from "react";

const C = {
  ivory: "#F8F4ED",
  ivoryDark: "#EDE8DC",
  surface: "#FDFAF6",
  gold: "#A8873A",
  goldLight: "#C4A456",
  goldDim: "#8A6E2E",
  text: "#1C1510",
  textMuted: "#7A6E61",
  dark: "#110E0A",
  darker: "#0C0A07",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Jost:wght@200;300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${C.ivoryDark}; }
  ::-webkit-scrollbar-thumb { background: ${C.gold}60; border-radius: 2px; }

  * { cursor: none !important; }

  .cursor-outer {
    position: fixed;
    width: 36px; height: 36px;
    border: 1px solid ${C.gold}50;
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transform: translate(-50%, -50%);
    transition: left 0.14s ease, top 0.14s ease, transform 0.3s ease, border-color 0.3s;
  }
  .cursor-inner {
    position: fixed;
    width: 5px; height: 5px;
    background: ${C.gold};
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transform: translate(-50%, -50%);
  }

  .grain-layer {
    position: fixed; inset: 0;
    pointer-events: none; z-index: 9990;
    opacity: 0.028;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  .nav-link {
    font-family: 'Jost', sans-serif;
    font-size: 10px; letter-spacing: 0.25em;
    text-transform: uppercase; color: ${C.textMuted};
    text-decoration: none; position: relative;
    transition: color 0.3s ease; padding-bottom: 3px;
  }
  .nav-link::after {
    content: ''; position: absolute;
    bottom: 0; left: 0; width: 0; height: 1px;
    background: ${C.gold};
    transition: width 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .nav-link:hover { color: ${C.gold}; }
  .nav-link:hover::after { width: 100%; }

  @keyframes lineGrow { from { width: 0; opacity: 0; } to { width: 100%; opacity: 1; } }
  @keyframes fixedLineGrow { from { width: 0; } to { width: 60px; } }
  @keyframes fadeUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
  @keyframes wordReveal { from { opacity:0; transform:translateY(110%) skewY(3deg); } to { opacity:1; transform:translateY(0) skewY(0deg); } }
  @keyframes breathe { 0%,100%{transform:translateX(-50%) scaleY(1);opacity:0.6;} 50%{transform:translateX(-50%) scaleY(1.15);opacity:1;} }
  @keyframes shimmerSweep { 0%{left:-100%;} 100%{left:200%;} }
  @keyframes orbitSpin { from{transform:translate(-50%,-50%) rotate(0deg);} to{transform:translate(-50%,-50%) rotate(360deg);} }
  @keyframes orbitSpinRev { from{transform:translate(-50%,-50%) rotate(0deg);} to{transform:translate(-50%,-50%) rotate(-360deg);} }
  @keyframes pulseGold { 0%,100%{box-shadow:0 0 0 0 ${C.gold}30;} 50%{box-shadow:0 0 0 8px ${C.gold}00;} }
  @keyframes scrollDrop { 0%{opacity:1;transform:translateX(-50%) translateY(0);} 100%{opacity:0;transform:translateX(-50%) translateY(20px);} }

  .reveal-word { display:inline-block; overflow:hidden; vertical-align:bottom; }
  .reveal-word span { display:inline-block; opacity:0; transform:translateY(110%) skewY(3deg); }
  .reveal-word span.animate { animation: wordReveal 1.1s cubic-bezier(0.16,1,0.3,1) forwards; }

  .anim-el { opacity:0; transform:translateY(32px); transition: opacity 1.1s cubic-bezier(0.25,0.46,0.45,0.94), transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94); }
  .anim-el.visible { opacity:1; transform:translateY(0); }
  .anim-el.d1 { transition-delay: 0.1s; }
  .anim-el.d2 { transition-delay: 0.2s; }
  .anim-el.d3 { transition-delay: 0.3s; }
  .anim-el.d4 { transition-delay: 0.45s; }
  .anim-el.d5 { transition-delay: 0.6s; }
  .anim-el.d6 { transition-delay: 0.75s; }

  .anim-fade { opacity:0; transition: opacity 1.3s cubic-bezier(0.25,0.46,0.45,0.94); }
  .anim-fade.visible { opacity:1; }

  .anim-line { width:0 !important; transition: width 1.2s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
  .anim-line.visible { width:60px !important; }
  .anim-line-full { width:0 !important; transition: width 1.6s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
  .anim-line-full.visible { width:100% !important; }

  .sub-card {
    background: white;
    border: 1px solid ${C.ivoryDark};
    padding: 40px 32px 36px;
    position: relative; overflow: hidden;
    transition: all 0.55s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .sub-card::before {
    content: ''; position: absolute;
    bottom: 0; left: 0; width: 0; height: 2px;
    background: linear-gradient(90deg, ${C.gold}, ${C.goldLight});
    transition: width 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .sub-card:hover { transform: translateY(-6px); border-color: ${C.gold}40; box-shadow: 0 24px 64px rgba(168,135,58,0.1), 0 4px 12px rgba(0,0,0,0.04); }
  .sub-card:hover::before { width: 100%; }

  .val-card {
    background: white; border: 1px solid ${C.ivoryDark};
    padding: 48px 28px; text-align: center; position: relative;
    transition: all 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
    overflow: hidden;
  }
  .val-card::after {
    content: ''; position: absolute;
    inset: 0; background: linear-gradient(135deg, ${C.gold}05, transparent);
    opacity: 0; transition: opacity 0.4s;
  }
  .val-card:hover { transform: translateY(-4px); border-color: ${C.gold}50; box-shadow: 0 16px 48px rgba(168,135,58,0.09); }
  .val-card:hover::after { opacity: 1; }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 16px 44px; background: ${C.gold}; color: white;
    border: none; font-family: 'Jost', sans-serif;
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    text-decoration: none; position: relative; overflow: hidden;
    transition: background 0.4s, box-shadow 0.4s;
  }
  .btn-primary::after {
    content: ''; position: absolute; top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
    transition: left 0.55s;
  }
  .btn-primary:hover { background: ${C.goldDim}; box-shadow: 0 8px 32px rgba(168,135,58,0.38); }
  .btn-primary:hover::after { left: 100%; }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 36px; background: transparent; color: ${C.gold};
    border: 1px solid ${C.gold}; font-family: 'Jost', sans-serif;
    font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
    text-decoration: none;
    transition: background 0.35s, box-shadow 0.35s;
  }
  .btn-ghost:hover { background: ${C.gold}0C; box-shadow: 0 4px 20px rgba(168,135,58,0.15); }

  .contact-link {
    display: flex; align-items: center; gap: 16px;
    color: #7A6A58; text-decoration: none;
    font-family: 'Jost', sans-serif; font-size: 15px;
    font-weight: 300; letter-spacing: 0.04em;
    transition: color 0.35s;
  }
  .contact-link:hover { color: ${C.goldLight}; }

  .gov-card {
    padding: 56px 44px; position: relative;
    overflow: hidden; transition: all 0.4s;
  }
  .gov-card:not(.featured):hover { background: ${C.ivory}80; }

  @media (max-width: 900px) {
    .hide-md { display: none !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
    .grid-3 { grid-template-columns: 1fr !important; }
    .grid-4 { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 600px) {
    .grid-4 { grid-template-columns: 1fr !important; }
    .hero-h1 { font-size: 52px !important; }
    .section-pad { padding: 80px 24px !important; }
  }
`;

function SectionLabel({ children, center = false }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      justifyContent: center ? "center" : "flex-start",
      fontFamily: "'Jost', sans-serif", fontSize: 9,
      letterSpacing: "0.4em", textTransform: "uppercase", color: C.gold,
      marginBottom: 28,
    }}>
      <span style={{ width: 28, height: 1, background: C.gold, opacity: 0.5, flexShrink: 0 }} />
      {children}
      <span style={{ width: 28, height: 1, background: C.gold, opacity: 0.5, flexShrink: 0 }} />
    </div>
  );
}

function GoldDivider() {
  return <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.gold}35, transparent)` }} />;
}

export default function ZolaraHoldings() {
  const [loaded, setLoaded] = useState(false);
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [mouse, setMouse] = useState({ x: -100, y: -100 });
  const [mouseOuter, setMouseOuter] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 120);
    const t2 = setTimeout(() => setHeroAnimated(true), 500);

    const onMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
      setTimeout(() => setMouseOuter({ x: e.clientX, y: e.clientY }), 80);
    };
    document.addEventListener("mousemove", onMove);

    return () => {
      clearTimeout(t1); clearTimeout(t2);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  // IntersectionObserver for scroll reveals
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    const targets = document.querySelectorAll(".anim-el, .anim-fade, .anim-line, .anim-line-full");
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [loaded]);

  const show = (delay = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 1.1s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
  });

  const wordStyle = (delay) => ({
    display: "inline-block",
    opacity: heroAnimated ? 1 : 0,
    transform: heroAnimated ? "translateY(0) skewY(0deg)" : "translateY(110%) skewY(3deg)",
    transition: `opacity 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <div style={{ background: C.ivory, color: C.text, fontFamily: "'Jost', sans-serif", overflowX: "hidden" }}>
      <style>{css}</style>

      {/* Grain */}
      <div className="grain-layer" />

      {/* Cursor */}
      <div className="cursor-inner" style={{ left: mouse.x, top: mouse.y }} />
      <div className="cursor-outer" style={{ left: mouseOuter.x, top: mouseOuter.y }} />

      {/* ─── HEADER ─── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: 72, background: `${C.ivory}EE`,
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: `1px solid ${C.ivoryDark}`,
        ...show(0.2),
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 48px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
            <svg width="32" height="36" viewBox="0 0 40 46" fill="none">
              <path d="M20 1L39 9.5V25C39 35.5 30.5 43.5 20 46C9.5 43.5 1 35.5 1 25V9.5L20 1Z" stroke={C.gold} strokeWidth="1.2" fill="none"/>
              <path d="M20 10L31 15.5V24C31 30.5 26 36 20 38C14 36 9 30.5 9 24V15.5L20 10Z" fill={`${C.gold}14`}/>
              <text x="20" y="27" textAnchor="middle" fill={C.gold} fontFamily="'Cormorant Garamond', serif" fontSize="13" fontWeight="500">Z</text>
            </svg>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 500, color: C.text, letterSpacing: "0.18em" }}>ZOLARA</div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 7.5, color: C.textMuted, letterSpacing: "0.35em", textTransform: "uppercase", marginTop: -1 }}>Holdings Ltd</div>
            </div>
          </a>

          <nav className="hide-md" style={{ display: "flex", gap: 44 }}>
            {[["#about","About"],["#subsidiaries","Portfolio"],["#mission","Mission"],["#leadership","Leadership"],["#contact","Contact"]].map(([h,l]) => (
              <a key={h} href={h} className="nav-link">{l}</a>
            ))}
          </nav>

          <a href="#contact" className="btn-ghost hide-md" style={{ padding: "10px 24px", fontSize: 9 }}>Get In Touch</a>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section style={{ minHeight: "100vh", background: C.ivory, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", overflow: "hidden", paddingTop: 72 }}>

        {/* Ambient radial */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${C.gold}09 0%, transparent 70%)`, pointerEvents: "none" }} />

        {/* Orbiting rings */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 640, height: 640, animation: "orbitSpin 35s linear infinite", pointerEvents: "none", opacity: 0.06 }}>
          <svg width="640" height="640" viewBox="0 0 640 640" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
            <circle cx="320" cy="320" r="280" stroke={C.gold} strokeWidth="0.8" fill="none" strokeDasharray="4 14"/>
          </svg>
        </div>
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 440, height: 440, animation: "orbitSpinRev 22s linear infinite", pointerEvents: "none", opacity: 0.06 }}>
          <svg width="440" height="440" viewBox="0 0 440 440" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
            <circle cx="220" cy="220" r="190" stroke={C.gold} strokeWidth="0.6" fill="none" strokeDasharray="2 10"/>
          </svg>
        </div>

        {/* Corner bracket ornaments */}
        {[{t:96,l:48,r:undefined,rot:0},{t:96,r:48,l:undefined,rot:90}].map((pos,i) => (
          <svg key={i} width="72" height="72" viewBox="0 0 72 72" className="hide-md" style={{ position:"absolute", top:pos.t, left:pos.l, right:pos.r, opacity:0.14, transform:`rotate(${pos.rot}deg)`, ...show(1.6) }}>
            <path d="M1 71L1 1L71 1" stroke={C.gold} strokeWidth="1" fill="none"/>
            <path d="M8 64L8 8L64 8" stroke={C.gold} strokeWidth="0.5" fill="none" opacity="0.5"/>
          </svg>
        ))}
        <svg width="72" height="72" viewBox="0 0 72 72" className="hide-md" style={{ position:"absolute", bottom:96, left:48, opacity:0.14, transform:"rotate(270deg)", ...show(1.6) }}>
          <path d="M1 71L1 1L71 1" stroke={C.gold} strokeWidth="1" fill="none"/>
        </svg>
        <svg width="72" height="72" viewBox="0 0 72 72" className="hide-md" style={{ position:"absolute", bottom:96, right:48, opacity:0.14, transform:"rotate(180deg)", ...show(1.6) }}>
          <path d="M1 71L1 1L71 1" stroke={C.gold} strokeWidth="1" fill="none"/>
        </svg>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 960, padding: "0 32px" }}>

          {/* Top label */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:64, ...show(0.5) }}>
            <span style={{ width:36, height:1, background:C.gold, opacity:0.4 }}/>
            <span style={{ fontFamily:"'Jost', sans-serif", fontSize:9, letterSpacing:"0.4em", textTransform:"uppercase", color:C.gold }}>Tamale, Ghana · Est. 2025</span>
            <span style={{ width:36, height:1, background:C.gold, opacity:0.4 }}/>
          </div>

          {/* Headline */}
          <h1 className="hero-h1" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(54px, 8.5vw, 104px)", fontWeight:300, lineHeight:1.0, color:C.text, marginBottom:0, letterSpacing:"0.015em" }}>
            <div style={{ overflow:"hidden", marginBottom:6 }}>
              <span style={wordStyle(0.55)}>Building</span>{" "}
              <span style={wordStyle(0.7)}>Businesses</span>
            </div>
            <div style={{ overflow:"hidden" }}>
              <em style={{ ...wordStyle(0.88), color:C.gold, fontStyle:"italic" }}>That Last</em>
            </div>
          </h1>

          {/* Animated gold rule */}
          <div style={{
            height:1, margin:"44px auto", maxWidth:80,
            background:`linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
            width: heroAnimated ? 80 : 0,
            transition:"width 1.4s cubic-bezier(0.25,0.46,0.45,0.94) 1.2s",
          }} />

          {/* Subheadline */}
          <p style={{ fontFamily:"'Jost', sans-serif", fontSize:15, fontWeight:300, color:C.textMuted, maxWidth:580, margin:"0 auto 64px", lineHeight:1.95, letterSpacing:"0.04em", ...show(1.35) }}>
            A Ghanaian holding company investing, building, and scaling premium businesses across beauty, real estate, logistics, and wellness.
          </p>

          {/* CTAs */}
          <div style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap", ...show(1.6) }}>
            <a href="#subsidiaries" className="btn-primary">
              Our Portfolio
              <svg width="18" height="9" viewBox="0 0 18 9" fill="none"><path d="M0 4.5H16M12 1l4 3.5-4 3.5" stroke="white" strokeWidth="1"/></svg>
            </a>
            <a href="#contact" className="btn-ghost">Contact Us</a>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute", bottom:48, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:10, ...show(2.2) }}>
          <span style={{ fontFamily:"'Jost', sans-serif", fontSize:8, letterSpacing:"0.35em", color:C.textMuted, textTransform:"uppercase" }}>Scroll</span>
          <div style={{ width:1, height:52, background:`linear-gradient(to bottom, ${C.gold}80, transparent)`, animation:"breathe 2.4s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <div style={{ background:C.dark, padding:"36px 48px", display:"flex", justifyContent:"center", gap:"clamp(32px,6vw,100px)", flexWrap:"wrap" }}>
        {[["5","Subsidiaries"],["GHS 700K+","Total Investment"],["2025","Founded"],["Ghana","Base"]].map(([n,l]) => (
          <div key={l} className="anim-el" style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:30, fontWeight:400, color:C.gold, letterSpacing:"0.05em" }}>{n}</div>
            <div style={{ fontFamily:"'Jost', sans-serif", fontSize:9, color:"#6A5E52", letterSpacing:"0.25em", textTransform:"uppercase", marginTop:6 }}>{l}</div>
          </div>
        ))}
      </div>

      <GoldDivider/>

      {/* ─── ABOUT ─── */}
      <section id="about" className="section-pad" style={{ padding:"120px 48px", background:C.surface, position:"relative", overflow:"hidden" }}>
        {/* Watermark */}
        <div style={{ position:"absolute", right:-60, bottom:-40, fontFamily:"'Cormorant Garamond', serif", fontSize:220, fontWeight:700, color:`${C.gold}04`, lineHeight:1, pointerEvents:"none", userSelect:"none", letterSpacing:"0.05em" }}>Z</div>

        <div style={{ maxWidth:1240, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"center" }} className="grid-2">
          <div>
            <div className="anim-el"><SectionLabel>Who We Are</SectionLabel></div>
            <div style={{ overflow:"hidden" }}>
              <h2 className="anim-el d1" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(38px,4vw,58px)", fontWeight:400, lineHeight:1.1, color:C.text, marginBottom:36, letterSpacing:"0.01em" }}>
                About<br/><em style={{ color:C.gold }}>Zolara Holdings</em>
              </h2>
            </div>
            <div className="anim-line" style={{ width:60, height:1, background:C.gold, marginBottom:36, opacity:0.6 }}/>
            <p className="anim-el d2" style={{ fontSize:15, fontWeight:300, color:C.textMuted, lineHeight:1.95, marginBottom:24, letterSpacing:"0.025em" }}>
              We are a Ghanaian holding company focused on developing, owning, and managing businesses across beauty, wellness, real estate, logistics, and hospitality sectors.
            </p>
            <p className="anim-el d3" style={{ fontSize:15, fontWeight:300, color:C.textMuted, lineHeight:1.95, letterSpacing:"0.025em", marginBottom:48 }}>
              Our role is to provide leadership, capital, and strategy — helping each business grow with strength and stability for the long term.
            </p>
            <div className="anim-el d4">
              <a href="#contact" className="btn-ghost">Learn More</a>
            </div>
          </div>

          {/* Right decorative panel */}
          <div className="anim-fade hide-md" style={{ position:"relative", height:440 }}>
            <div style={{ position:"absolute", inset:0, border:`1px solid ${C.gold}18`, transform:"rotate(4deg)" }}/>
            <div style={{ position:"absolute", inset:24, border:`1px solid ${C.gold}30`, transform:"rotate(-1deg)" }}/>
            <div style={{
              position:"absolute", inset:40,
              background:`linear-gradient(145deg, ${C.gold}0A, transparent 60%)`,
              border:`1px solid ${C.gold}45`,
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28,
            }}>
              <svg width="72" height="82" viewBox="0 0 40 46" fill="none">
                <path d="M20 1L39 9.5V25C39 35.5 30.5 43.5 20 46C9.5 43.5 1 35.5 1 25V9.5L20 1Z" stroke={C.gold} strokeWidth="1.5" fill="none"/>
                <path d="M20 10L31 15.5V24C31 30.5 26 36 20 38C14 36 9 30.5 9 24V15.5L20 10Z" fill={`${C.gold}18`} stroke={C.gold} strokeWidth="0.8"/>
                <text x="20" y="27" textAnchor="middle" fill={C.gold} fontFamily="'Cormorant Garamond', serif" fontSize="14" fontWeight="500">Z</text>
              </svg>
              <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:11, color:C.gold, letterSpacing:"0.5em", textAlign:"center" }}>ZOLARA HOLDINGS LTD</div>
              <div style={{ width:40, height:1, background:`${C.gold}50` }}/>
              <div style={{ fontFamily:"'Jost', sans-serif", fontSize:8.5, color:C.textMuted, letterSpacing:"0.25em", textAlign:"center", lineHeight:2.2 }}>
                BEAUTY · REAL ESTATE<br/>LOGISTICS · WELLNESS
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider/>

      {/* ─── CEO QUOTE ─── */}
      <section style={{ padding:"140px 48px", background:C.ivory, position:"relative", overflow:"hidden", textAlign:"center" }} className="section-pad">
        {/* Giant bg text */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(100px,18vw,240px)", fontWeight:700, color:`${C.gold}04`, whiteSpace:"nowrap", pointerEvents:"none", userSelect:"none", letterSpacing:"0.08em" }}>ZOLARA</div>

        <div style={{ maxWidth:740, margin:"0 auto", position:"relative", zIndex:2 }}>
          <div className="anim-el"><SectionLabel center>Leadership</SectionLabel></div>
          <div className="anim-fade d1" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:88, color:`${C.gold}28`, lineHeight:0.7, fontStyle:"italic", marginBottom:8 }}>"</div>
          <blockquote className="anim-el d2" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(20px,2.6vw,28px)", fontWeight:300, color:C.text, lineHeight:1.75, fontStyle:"italic", marginBottom:20, letterSpacing:"0.01em" }}>
            I built Zolara Holdings with one purpose — to create businesses that last. Not just to open companies, but to build strong, disciplined brands that will serve communities and stand the test of time.
          </blockquote>
          <div className="anim-el d3" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:22, color:`${C.gold}28`, lineHeight:0.7, fontStyle:"italic", marginBottom:32 }}>"</div>
          <div className="anim-line" style={{ width:48, height:1, background:C.gold, margin:"0 auto 28px", opacity:0.5 }}/>
          <div className="anim-el d4" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:22, color:C.gold, letterSpacing:"0.12em" }}>Haruna Salifu</div>
          <div className="anim-el d5" style={{ fontFamily:"'Jost', sans-serif", fontSize:9.5, color:C.textMuted, letterSpacing:"0.3em", textTransform:"uppercase", marginTop:8 }}>Founder & Executive Director</div>
        </div>
      </section>

      <GoldDivider/>

      {/* ─── MISSION / VISION ─── */}
      <section id="mission" className="section-pad" style={{ padding:"120px 48px", background:C.dark, position:"relative", overflow:"hidden" }}>
        {/* Corner ornaments */}
        {[[{top:40,left:40},0],[{bottom:40,right:40},180]].map(([pos,rot],i) => (
          <svg key={i} width="100" height="100" viewBox="0 0 100 100" style={{ position:"absolute", ...pos, opacity:0.07 }}>
            <path d={`M1 99L1 1L99 1`} stroke={C.gold} strokeWidth="1" fill="none" transform={`rotate(${rot},50,50)`}/>
          </svg>
        ))}

        <div style={{ maxWidth:1240, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }} className="grid-2">
          {[
            { label:"Our Mission", title:"Strategic Growth", body:"To grow high-value businesses through smart investment and disciplined leadership, creating lasting value for communities across Ghana and Africa." },
            { label:"Our Vision", title:"African Leadership", body:"To become one of Africa's leading holding companies, known for strong brands, operational excellence, and long-term generational success." },
          ].map((item,i) => (
            <div key={item.label} style={{ paddingLeft: i===1 ? 80 : 0, borderLeft: i===1 ? `1px solid ${C.gold}18` : "none" }}>
              <div className="anim-line" style={{ width:1, height:56, background:`linear-gradient(to bottom, ${C.gold}, transparent)`, marginBottom:32 }}/>
              <div className={`anim-el d${i+1}`} style={{ fontFamily:"'Jost', sans-serif", fontSize:9, color:C.gold, letterSpacing:"0.4em", textTransform:"uppercase", marginBottom:20 }}>{item.label}</div>
              <h3 className={`anim-el d${i+2}`} style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(34px,3.5vw,48px)", fontWeight:400, color:C.ivory, lineHeight:1.1, marginBottom:28, letterSpacing:"0.01em" }}>
                {item.title.split(" ")[0]}<br/><em style={{ color:C.gold }}>{item.title.split(" ")[1]}</em>
              </h3>
              <p className={`anim-el d${i+3}`} style={{ fontFamily:"'Jost', sans-serif", fontSize:14, fontWeight:300, color:"#7A6A58", lineHeight:1.95, letterSpacing:"0.03em" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <GoldDivider/>

      {/* ─── SUBSIDIARIES ─── */}
      <section id="subsidiaries" className="section-pad" style={{ padding:"120px 48px", background:C.surface }}>
        <div style={{ maxWidth:1240, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:80 }}>
            <div className="anim-el"><SectionLabel center>Our Portfolio</SectionLabel></div>
            <h2 className="anim-el d1" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(36px,4vw,56px)", fontWeight:400, color:C.text, letterSpacing:"0.01em" }}>
              Subsidiaries &amp; <em style={{ color:C.gold }}>Divisions</em>
            </h2>
            <div className="anim-line" style={{ width:60, height:1, background:`linear-gradient(90deg,transparent,${C.gold},transparent)`, margin:"32px auto 0" }}/>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap:20 }}>
            {[
              { name:"Zolara Beauty Studio", desc:"Luxury beauty services and personal care", icon:"✦", url:"https://zolarasalon.com", live:true },
              { name:"Zolara Properties", desc:"Real estate investment and development", icon:"⬡" },
              { name:"Zolara Logistics", desc:"Supply chain and distribution planning", icon:"◈" },
              { name:"Zolara Pharma & Wellness", desc:"Pharmacy and wellness retail", icon:"✚" },
              { name:"Zolara Hospitality", desc:"Future accommodation development", icon:"⌂" },
            ].map((s,i) => (
              <div key={s.name} className={`sub-card anim-el d${Math.min(i+1,6)}`}>
                {s.live && (
                  <span style={{ position:"absolute", top:18, right:18, fontFamily:"'Jost',sans-serif", fontSize:7.5, letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold, border:`1px solid ${C.gold}45`, padding:"3px 9px" }}>Live</span>
                )}
                <div style={{ fontSize:22, color:C.gold, marginBottom:22 }}>{s.icon}</div>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
                    <h4 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:22, fontWeight:500, color:C.text, marginBottom:10, lineHeight:1.25, transition:"color 0.3s" }}>{s.name}</h4>
                  </a>
                ) : (
                  <h4 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:22, fontWeight:500, color:C.text, marginBottom:10, lineHeight:1.25 }}>{s.name}</h4>
                )}
                <p style={{ fontSize:12, fontWeight:300, color:C.textMuted, letterSpacing:"0.04em", lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="anim-el d3" style={{ textAlign:"center", marginTop:80, paddingTop:56, borderTop:`1px solid ${C.gold}18` }}>
            <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(18px,2.2vw,24px)", fontStyle:"italic", color:C.textMuted, maxWidth:560, margin:"0 auto", lineHeight:1.8 }}>
              "We centralise finance, branding, and operations to reduce risk and help our businesses scale faster."
            </p>
          </div>
        </div>
      </section>

      <GoldDivider/>

      {/* ─── VALUES ─── */}
      <section className="section-pad" style={{ padding:"120px 48px", background:C.ivory }}>
        <div style={{ maxWidth:1240, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:80 }}>
            <div className="anim-el"><SectionLabel center>What Guides Us</SectionLabel></div>
            <h2 className="anim-el d1" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(36px,4vw,56px)", fontWeight:400, color:C.text }}>
              Core <em style={{ color:C.gold }}>Values</em>
            </h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }} className="grid-4">
            {[
              { title:"Integrity", desc:"Honesty in every decision and relationship we build", roman:"I" },
              { title:"Focus", desc:"Disciplined execution over distraction and noise", roman:"II" },
              { title:"Leadership", desc:"Guiding with clarity, vision, and long-term thinking", roman:"III" },
              { title:"Excellence", desc:"Pursuing the highest standard in everything we do", roman:"IV" },
            ].map((v,i) => (
              <div key={v.title} className={`val-card anim-el d${i+1}`}>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:11, color:C.gold, letterSpacing:"0.35em", marginBottom:16 }}>{v.roman}</div>
                <div style={{ width:36, height:1, background:C.gold, margin:"0 auto 22px", opacity:0.4 }}/>
                <h4 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:26, fontWeight:500, color:C.text, marginBottom:14, letterSpacing:"0.03em" }}>{v.title}</h4>
                <p style={{ fontSize:12, fontWeight:300, color:C.textMuted, lineHeight:1.85, letterSpacing:"0.03em" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider/>

      {/* ─── EXECUTIVE DIRECTOR ─── */}
      <section id="leadership" className="section-pad" style={{ padding:"120px 48px", background:C.surface }}>
        <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center" }}>
          <div className="anim-el"><SectionLabel center>Leadership</SectionLabel></div>
          <h2 className="anim-el d1" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(36px,4vw,56px)", fontWeight:400, color:C.text, marginBottom:40 }}>
            Executive <em style={{ color:C.gold }}>Director</em>
          </h2>
          <div className="anim-line" style={{ width:60, height:1, background:`linear-gradient(90deg,transparent,${C.gold},transparent)`, margin:"0 auto 60px" }}/>

          <div className="anim-el d2" style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:100, height:100, borderRadius:"50%", border:`1px solid ${C.gold}40`, marginBottom:36, position:"relative" }}>
            <svg width="44" height="50" viewBox="0 0 40 46" fill="none">
              <path d="M20 1L39 9.5V25C39 35.5 30.5 43.5 20 46C9.5 43.5 1 35.5 1 25V9.5L20 1Z" stroke={C.gold} strokeWidth="1.2" fill={`${C.gold}10`}/>
              <text x="20" y="27" textAnchor="middle" fill={C.gold} fontFamily="'Cormorant Garamond', serif" fontSize="14" fontWeight="500">H</text>
            </svg>
            <div style={{ position:"absolute", inset:-6, borderRadius:"50%", border:`1px solid ${C.gold}18` }}/>
          </div>

          <h3 className="anim-el d2" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:36, fontWeight:500, color:C.text, letterSpacing:"0.04em", marginBottom:12 }}>Haruna Salifu</h3>
          <p className="anim-el d3" style={{ fontSize:11, color:C.gold, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:40 }}>Founder & Executive Director</p>
          <div className="anim-line" style={{ width:40, height:1, background:C.gold, margin:"0 auto 40px", opacity:0.4 }}/>
          <p className="anim-el d4" style={{ fontSize:15, fontWeight:300, color:C.textMuted, lineHeight:1.95, maxWidth:680, margin:"0 auto", letterSpacing:"0.025em" }}>
            Haruna Salifu is the founder and Executive Director of Zolara Holdings Ltd. His strategic leadership and vision drive Zolara's mission to build high-value companies across beauty, real estate, wellness, and logistics in Ghana. With a focus on discipline and structured investment, he leads the company with long-term planning and operational excellence.
          </p>
        </div>
      </section>

      <GoldDivider/>

      {/* ─── GOVERNANCE ─── */}
      <section className="section-pad" style={{ padding:"120px 48px", background:C.ivoryDark }}>
        <div style={{ maxWidth:1240, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:80 }}>
            <div className="anim-el"><SectionLabel center>Corporate Structure</SectionLabel></div>
            <h2 className="anim-el d1" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(36px,4vw,56px)", fontWeight:400, color:C.text }}>
              Governance <em style={{ color:C.gold }}>Pillars</em>
            </h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }} className="grid-3">
            {[
              { title:"Strategy", desc:"Defining clear investment objectives and growth pathways for each subsidiary with disciplined capital allocation.", num:"01", featured:false },
              { title:"Oversight", desc:"Continuous monitoring of business performance, ensuring alignment with corporate standards and best practices.", num:"02", featured:true },
              { title:"Protection", desc:"Safeguarding company assets through robust risk management, compliance, and corporate governance frameworks.", num:"03", featured:false },
            ].map((p,i) => (
              <div key={p.title} className={`gov-card anim-el d${i+1}`} style={{ background: p.featured ? C.dark : "white", borderTop:`3px solid ${p.featured ? C.gold : "transparent"}` }}>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:64, fontWeight:300, color: p.featured ? `${C.gold}28` : `${C.gold}18`, lineHeight:1, marginBottom:24 }}>{p.num}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:30, fontWeight:500, color: p.featured ? C.ivory : C.text, marginBottom:20 }}>{p.title}</h3>
                <div style={{ width:32, height:1, background:C.gold, marginBottom:22, opacity:0.45 }}/>
                <p style={{ fontSize:13, fontWeight:300, color: p.featured ? "#7A6A58" : C.textMuted, lineHeight:1.9 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider/>

      {/* ─── TIMELINE ─── */}
      <section className="section-pad" style={{ padding:"120px 48px", background:C.ivory }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:80 }}>
            <div className="anim-el"><SectionLabel center>Our Journey</SectionLabel></div>
            <h2 className="anim-el d1" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(36px,4vw,56px)", fontWeight:400, color:C.text }}>
              Strategic <em style={{ color:C.gold }}>Timeline</em>
            </h2>
          </div>

          <div style={{ position:"relative", paddingLeft:72 }}>
            {/* Vertical line */}
            <div className="anim-line-full" style={{ position:"absolute", left:20, top:16, bottom:16, width:1, background:`linear-gradient(to bottom, ${C.gold}70, ${C.gold}30, transparent)` }}/>

            {[
              { year:"2025", title:"Group Formation", desc:"Establishment of Zolara Holdings Ltd and successful launch of Zolara Beauty Studio in Tamale, Ghana.", active:true },
              { year:"2026", title:"Real Estate Expansion", desc:"Launch of Zolara Properties — real estate development and property management across Northern Ghana." },
              { year:"2027", title:"Pharma & Wellness", desc:"Entry into pharmaceutical distribution and healthcare, serving communities and expanding Zolara's footprint." },
            ].map((t,i) => (
              <div key={t.year} className={`anim-el d${i+1}`} style={{ position:"relative", marginBottom: i<2 ? 64 : 0, paddingBottom: i<2 ? 64 : 0, borderBottom: i<2 ? `1px solid ${C.gold}12` : "none" }}>
                {/* Dot */}
                <div style={{ position:"absolute", left:-60, top:6, width:18, height:18, borderRadius:"50%", background: t.active ? C.gold : C.ivory, border:`2px solid ${C.gold}`, boxShadow: t.active ? `0 0 0 5px ${C.gold}18, 0 0 20px ${C.gold}30` : "none", animation: t.active ? "pulseGold 3s ease-in-out infinite" : "none" }}/>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:11, color:C.gold, letterSpacing:"0.35em", marginBottom:10 }}>{t.year}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:30, fontWeight:500, color:C.text, marginBottom:14 }}>{t.title}</h3>
                <p style={{ fontSize:14, fontWeight:300, color:C.textMuted, lineHeight:1.9 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider/>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="section-pad" style={{ padding:"140px 48px", background:C.dark, position:"relative", overflow:"hidden", textAlign:"center" }}>
        {/* Ambient */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:500, background:`radial-gradient(ellipse, ${C.gold}07 0%, transparent 65%)`, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 80% 50% at 50% 100%, ${C.gold}04 0%, transparent 70%)`, pointerEvents:"none" }}/>

        <div style={{ maxWidth:680, margin:"0 auto", position:"relative", zIndex:2 }}>
          <div className="anim-el"><SectionLabel center>Get In Touch</SectionLabel></div>
          <h2 className="anim-el d1" style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(40px,5vw,64px)", fontWeight:300, color:C.ivory, lineHeight:1.1, marginBottom:28, letterSpacing:"0.01em" }}>
            Let's Build<br/><em style={{ color:C.gold }}>Something Great</em>
          </h2>
          <div className="anim-line" style={{ width:48, height:1, background:C.gold, margin:"0 auto 52px", opacity:0.5 }}/>
          <p className="anim-el d2" style={{ fontSize:15, fontWeight:300, color:"#7A6A58", lineHeight:1.95, marginBottom:64, letterSpacing:"0.03em" }}>
            Whether you're an investor, a business partner, or someone who shares our vision for building lasting enterprises across Africa — we'd love to hear from you.
          </p>

          <div className="anim-el d3" style={{ display:"flex", flexDirection:"column", gap:28, alignItems:"center" }}>
            {[
              { icon:"✉", text:"info@zolaraholdings.com", href:"mailto:info@zolaraholdings.com" },
              { icon:"✆", text:"+233 594 922 679", href:"tel:+233594922679" },
              { icon:"✆", text:"+233 249 978 750", href:"tel:+233249978750" },
              { icon:"◎", text:"Tamale, Ghana", href:null },
            ].map(c => c.href ? (
              <a key={c.text} href={c.href} className="contact-link">
                <span style={{ color:C.gold, fontSize:16, width:20 }}>{c.icon}</span>
                {c.text}
              </a>
            ) : (
              <div key={c.text} className="contact-link">
                <span style={{ color:C.gold, fontSize:16, width:20 }}>{c.icon}</span>
                {c.text}
              </div>
            ))}
          </div>

          <div className="anim-el d4" style={{ marginTop:64 }}>
            <a href="mailto:info@zolaraholdings.com" className="btn-primary">Send Us a Message</a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background:C.darker, padding:"36px 48px", borderTop:`1px solid ${C.gold}18` }}>
        <div style={{ maxWidth:1240, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <svg width="22" height="26" viewBox="0 0 40 46" fill="none">
              <path d="M20 1L39 9.5V25C39 35.5 30.5 43.5 20 46C9.5 43.5 1 35.5 1 25V9.5L20 1Z" stroke={C.gold} strokeWidth="1" fill="none" opacity="0.7"/>
              <text x="20" y="27" textAnchor="middle" fill={C.gold} fontFamily="serif" fontSize="12" opacity="0.7">Z</text>
            </svg>
            <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:11, color:"#5A4E44", letterSpacing:"0.35em" }}>ZOLARA HOLDINGS LTD</span>
          </div>

          <p style={{ fontFamily:"'Jost', sans-serif", fontSize:9.5, color:"#3A3028", letterSpacing:"0.15em" }}>
            © 2026 Zolara Holdings Ltd. All Rights Reserved.
          </p>

          <a href="/privacy-policy" style={{ fontFamily:"'Jost', sans-serif", fontSize:9.5, color:"#3A3028", letterSpacing:"0.15em", textDecoration:"none", transition:"color 0.3s" }}>
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
