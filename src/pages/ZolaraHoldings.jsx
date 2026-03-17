import { useState, useEffect, useRef } from "react";

// Fresh palette. Deep forest green. Sage accent. No gold anywhere.
const P = {
  void:    "#040A05",
  deep:    "#07120A",
  forest:  "#0C1E10",
  canopy:  "#142A18",
  sage:    "#A8C8A0",
  sageDim: "#789068",
  white:   "#F4F1EA",
  grey:    "#8A9A84",
  faint:   "#3A4E38",
  line:    "#101E12",
};

const H = "'EB Garamond', Georgia, serif";
const B = "'Outfit', system-ui, sans-serif";

const css = `
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Outfit:wght@200;300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:#040A05;color:#F4F1EA;font-family:'Outfit',system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
*{cursor:none!important;}
::-webkit-scrollbar{width:1px;}
::-webkit-scrollbar-thumb{background:#A8C8A018;}

/* cursor */
.cur{position:fixed;width:7px;height:7px;background:#A8C8A0;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform 0.15s,width 0.2s,height 0.2s;}
.cur2{position:fixed;width:28px;height:28px;border:1px solid #A8C8A025;border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:left 0.09s ease,top 0.09s ease;}

/* grain */
.grain{position:fixed;inset:0;pointer-events:none;z-index:9000;opacity:0.035;
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E");background-size:150px;}

/* nav */
.na{font-family:'Outfit',sans-serif;font-size:10.5px;font-weight:300;letter-spacing:0.16em;text-transform:uppercase;color:#4A6048;text-decoration:none;transition:color 0.25s;}
.na:hover{color:#A8C8A0;}

/* buttons */
.b1{display:inline-flex;align-items:center;gap:10px;padding:14px 38px;background:#A8C8A0;color:#040A05;font-family:'Outfit',sans-serif;font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:background 0.3s,box-shadow 0.3s;}
.b1:hover{background:#BCD8B4;box-shadow:0 8px 32px #A8C8A018;}
.b2{display:inline-flex;align-items:center;gap:10px;padding:13px 36px;background:transparent;color:#A8C8A0;border:1px solid #A8C8A022;font-family:'Outfit',sans-serif;font-size:10px;font-weight:300;letter-spacing:0.22em;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:border-color 0.3s,background 0.3s;}
.b2:hover{border-color:#A8C8A050;background:#A8C8A006;}

/* reveals */
.up{opacity:0;transform:translateY(22px);transition:opacity 0.85s cubic-bezier(0.25,0.46,0.45,0.94),transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94);}
.up.go{opacity:1;transform:none;}
.up.s1{transition-delay:0.05s;}.up.s2{transition-delay:0.12s;}.up.s3{transition-delay:0.2s;}.up.s4{transition-delay:0.3s;}.up.s5{transition-delay:0.42s;}
.fade{opacity:0;transition:opacity 1.1s ease;}.fade.go{opacity:1;}
.left{opacity:0;transform:translateX(-20px);transition:opacity 0.9s ease,transform 0.9s ease;}.left.go{opacity:1;transform:none;}
.right{opacity:0;transform:translateX(20px);transition:opacity 0.9s ease,transform 0.9s ease;}.right.go{opacity:1;transform:none;}

/* ticker */
@keyframes roll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.roll{display:flex;animation:roll 38s linear infinite;white-space:nowrap;}

/* cards */
.card{background:#0C1E10;border:1px solid #101E12;padding:40px 36px;position:relative;overflow:hidden;transition:border-color 0.4s,transform 0.4s,box-shadow 0.4s;}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#A8C8A0,transparent);transform:scaleX(0);transform-origin:left;transition:transform 0.55s ease;}
.card:hover{border-color:#A8C8A018;transform:translateY(-3px);box-shadow:0 20px 56px rgba(0,0,0,0.4);}
.card:hover::before{transform:scaleX(1);}

/* form */
.inp{width:100%;background:#0C1E10;border:1px solid #101E12;color:#F4F1EA;font-family:'Outfit',sans-serif;font-size:13px;font-weight:300;padding:16px 20px;outline:none;transition:border-color 0.25s;letter-spacing:0.02em;}
.inp::placeholder{color:#1C2C1C;}.inp:focus{border-color:#A8C8A025;}

@keyframes float{0%,100%{opacity:0.4;}50%{opacity:0.8;}}
@keyframes ping{0%,100%{box-shadow:0 0 0 0 #A8C8A030;}60%{box-shadow:0 0 0 10px #A8C8A000;}}

@media(max-width:1024px){.col2{grid-template-columns:1fr!important;gap:60px!important;}.hidemd{display:none!important;}}
@media(max-width:768px){.col3{grid-template-columns:1fr!important;}.col4{grid-template-columns:1fr 1fr!important;}.hidesm{display:none!important;}.px{padding-left:24px!important;padding-right:24px!important;}.bigh{font-size:clamp(52px,12vw,80px)!important;}}
`;

function useCount(to, go) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    let r, t = null;
    const fn = ts => { if (!t) t = ts; const p = Math.min((ts - t) / 1800, 1); setV(Math.floor(p * to)); if (p < 1) r = requestAnimationFrame(fn); };
    r = requestAnimationFrame(fn); return () => cancelAnimationFrame(r);
  }, [go, to]);
  return v;
}

function Num({ to, suffix = "" }) {
  const ref = useRef(); const [go, setGo] = useState(false); const v = useCount(to, go);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); o.disconnect(); } }, { threshold: 0.5 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);
  return <span ref={ref}>{v}{suffix}</span>;
}

const Tag = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
    <span style={{ width: 28, height: 1, background: P.sage, opacity: 0.4 }} />
    <span style={{ fontFamily: B, fontSize: 9, fontWeight: 500, color: P.sage, letterSpacing: "0.5em", textTransform: "uppercase" }}>{children}</span>
  </div>
);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [heroIn, setHeroIn] = useState(false);
  const [mouse, setMouse] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [form, setForm] = useState({ name: "", email: "", type: "", msg: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 60);
    setTimeout(() => setHeroIn(true), 200);
    const mv = e => { setMouse({ x: e.clientX, y: e.clientY }); setTimeout(() => setTrail({ x: e.clientX, y: e.clientY }), 90); };
    window.addEventListener("mousemove", mv);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("go"); obs.unobserve(e.target); } });
    }, { threshold: 0.07, rootMargin: "0px 0px -20px 0px" });
    setTimeout(() => document.querySelectorAll(".up,.fade,.left,.right").forEach(el => obs.observe(el)), 300);
    return () => window.removeEventListener("mousemove", mv);
  }, []);

  const ap = d => ({ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(10px)", transition: `opacity 0.9s ease ${d}s, transform 0.9s ease ${d}s` });
  const wi = d => ({ display: "inline-block", opacity: heroIn ? 1 : 0, transform: heroIn ? "none" : "translateY(108%)", transition: `opacity 1.15s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 1.15s cubic-bezier(0.16,1,0.3,1) ${d}s` });

  return (
    <div style={{ background: P.void, color: P.white, fontFamily: B }}>
      <style>{css}</style>
      <div className="grain" />
      <div className="cur" style={{ left: mouse.x, top: mouse.y }} />
      <div className="cur2" style={{ left: trail.x, top: trail.y }} />

      {/* ══════════════ NAVIGATION ══════════════ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 66, display: "flex", alignItems: "center", background: "#040A05F2", backdropFilter: "blur(24px)", borderBottom: "1px solid #0C1A0C", ...ap(0.1) }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 56px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
            <div style={{ width: 36, height: 36, border: `1px solid ${P.faint}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: H, fontSize: 20, fontWeight: 500, color: P.sage }}>Z</span>
            </div>
            <div>
              <div style={{ fontFamily: B, fontSize: 13, fontWeight: 500, color: P.white, letterSpacing: "0.28em" }}>ZOLARA</div>
              <div style={{ fontFamily: B, fontSize: 7, fontWeight: 300, color: P.grey, letterSpacing: "0.5em", textTransform: "uppercase" }}>Holdings Ltd</div>
            </div>
          </a>
          <div className="hidesm" style={{ display: "flex", alignItems: "center", gap: 44 }}>
            {["About", "Portfolio", "Thesis", "Leadership", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="na">{l}</a>
            ))}
          </div>
          <a href="#contact" className="b2" style={{ padding: "9px 22px", fontSize: 9 }}>Inquire</a>
        </div>
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      {/* Layout: left-heavy. Huge type left, info panel right */}
      <section style={{ minHeight: "100vh", paddingTop: 66, display: "grid", gridTemplateColumns: "1fr 380px", position: "relative", overflow: "hidden" }} className="col2">

        {/* Atmosphere */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 80% at 35% 50%, ${P.forest}95 0%, transparent 65%)` }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 40% 50% at 90% 20%, ${P.canopy}60 0%, transparent 55%)` }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 35% 40% at 5% 90%, #0A1A0C70 0%, transparent 50%)` }} />

        {/* Left: massive type */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 64px", position: "relative", zIndex: 2 }}>
          <div style={{ ...ap(0.25), display: "flex", alignItems: "center", gap: 12, marginBottom: 60 }}>
            <span style={{ width: 20, height: 1, background: P.sage, opacity: 0.4 }} />
            <span style={{ fontFamily: B, fontSize: 9, fontWeight: 400, color: P.sage, letterSpacing: "0.55em", textTransform: "uppercase" }}>Strategic Investment Group · Ghana</span>
          </div>

          <h1 className="bigh" style={{ fontFamily: H, fontSize: "clamp(72px,10.5vw,148px)", fontWeight: 400, lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: 0 }}>
            <div style={{ overflow: "hidden", marginBottom: 8 }}><span style={wi(0.2)}>Building</span></div>
            <div style={{ overflow: "hidden", marginBottom: 8 }}><span style={wi(0.36)}>Businesses</span></div>
            <div style={{ overflow: "hidden" }}><em style={{ ...wi(0.52), color: P.sage }}>That Last.</em></div>
          </h1>

          <div style={{ width: heroIn ? "60%" : 0, height: 1, background: `linear-gradient(90deg, ${P.sage}60, transparent)`, transition: "width 1.9s cubic-bezier(0.25,0.46,0.45,0.94) 0.9s", marginTop: 52, marginBottom: 48 }} />

          <p style={{ fontFamily: B, fontSize: 16, fontWeight: 300, color: P.grey, maxWidth: 460, lineHeight: 1.85, marginBottom: 44, ...ap(1.15) }}>
            A Ghanaian holding company developing, owning, and scaling premium businesses — with a long-term vision for Africa.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", ...ap(1.4) }}>
            <a href="#portfolio" className="b1">View Portfolio</a>
            <a href="#contact" className="b2">Inquire →</a>
          </div>
        </div>

        {/* Right panel: vertical info strip */}
        <div className="hidemd" style={{ borderLeft: `1px solid ${P.line}`, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "120px 44px 80px", position: "relative", zIndex: 2, background: `${P.forest}40` }}>

          {/* Stats stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {[["5", "", "Subsidiaries"], ["2M+", "", "GHS Deployed"], ["2025", "", "Founded"], ["Ghana", "", "Headquarters"]].map(([n, s, l]) => (
              <div key={l} style={{ ...ap(1.2) }}>
                <div style={{ fontFamily: H, fontSize: 38, fontWeight: 400, color: P.sage, lineHeight: 1, marginBottom: 6 }}>{n}{s}</div>
                <div style={{ fontFamily: B, fontSize: 9, fontWeight: 300, color: P.faint, letterSpacing: "0.35em", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Rotated label */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, ...ap(1.8) }}>
            <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${P.sage}40, transparent)`, animation: "float 2.8s ease-in-out infinite" }} />
            <span style={{ fontFamily: B, fontSize: 8, color: P.faint, letterSpacing: "0.5em", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
          </div>
        </div>
      </section>

      {/* ══════════════ TICKER ══════════════ */}
      <div style={{ background: P.canopy, borderTop: `1px solid ${P.line}`, borderBottom: `1px solid ${P.line}`, padding: "13px 0", overflow: "hidden" }}>
        <div className="roll">
          {[...Array(8)].flatMap(() => ["Zolara Beauty Studio", "Zolara Properties", "Zolara Logistics", "Zolara Pharma & Wellness", "Zolara Hospitality"]).map((s, i) => (
            <span key={i} style={{ fontFamily: B, fontSize: 9, fontWeight: 300, color: P.faint, letterSpacing: "0.42em", textTransform: "uppercase", padding: "0 40px" }}>
              {s} <span style={{ color: P.line, margin: "0 4px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════ ABOUT ══════════════ */}
      <section id="about" style={{ background: P.void, padding: "140px 64px" }} className="px">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>

          {/* Pull quote style intro */}
          <div style={{ borderBottom: `1px solid ${P.line}`, paddingBottom: 80, marginBottom: 80 }}>
            <div className="left"><Tag>About</Tag></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="col2">
              <h2 className="up s1" style={{ fontFamily: H, fontSize: "clamp(38px,4.5vw,64px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "0.005em" }}>
                We invest in,<br />build, and operate<br /><em style={{ color: P.sage }}>premium businesses.</em>
              </h2>
              <div style={{ paddingTop: 8 }}>
                <p className="up s2" style={{ fontFamily: B, fontSize: 16, fontWeight: 300, color: P.grey, lineHeight: 1.88, marginBottom: 22 }}>
                  Zolara Holdings Ltd is a Ghanaian holding company founded to develop, own, and manage businesses across key sectors of the economy.
                </p>
                <p className="up s3" style={{ fontFamily: B, fontSize: 16, fontWeight: 300, color: P.grey, lineHeight: 1.88, marginBottom: 44, opacity: 0.75 }}>
                  We provide shared leadership, capital, and brand strategy — reducing risk, enabling scale, and building enterprises that stand the test of time.
                </p>
                <div className="up s4"><a href="#portfolio" className="b2">See Our Portfolio</a></div>
              </div>
            </div>
          </div>

          {/* Three pillars horizontal */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderLeft: `1px solid ${P.line}` }} className="col3">
            {[
              { tag: "Mission", body: "To grow high-value businesses through disciplined investment and hands-on operational leadership across Ghana and Africa." },
              { tag: "Vision", body: "To be one of Africa's most respected holding companies — known for building strong, lasting brands and generational wealth." },
              { tag: "Philosophy", body: "One structure. Centralised finance, branding, and governance. Every subsidiary benefits from the strength of the whole." },
            ].map((p, i) => (
              <div key={p.tag} className={`up s${i + 1}`}
                style={{ borderRight: `1px solid ${P.line}`, padding: "40px 40px 0 40px", transition: "background 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.background = P.forest}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ width: 24, height: 1, background: P.sage, opacity: 0.5, marginBottom: 22 }} />
                <p style={{ fontFamily: B, fontSize: 9, fontWeight: 500, color: P.sage, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 16 }}>{p.tag}</p>
                <p style={{ fontFamily: B, fontSize: 14, fontWeight: 300, color: P.grey, lineHeight: 1.88 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PORTFOLIO ══════════════ */}
      <section id="portfolio" style={{ background: P.forest, padding: "140px 64px", borderTop: `1px solid ${P.line}` }} className="px">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72, flexWrap: "wrap", gap: 32 }}>
            <div>
              <div className="left"><Tag>Portfolio</Tag></div>
              <h2 className="up s1" style={{ fontFamily: H, fontSize: "clamp(36px,4vw,58px)", fontWeight: 400, lineHeight: 1.1 }}>
                Subsidiaries &<br /><em style={{ color: P.sage }}>Divisions</em>
              </h2>
            </div>
            <p className="right" style={{ fontFamily: B, fontSize: 14, fontWeight: 300, color: P.grey, maxWidth: 360, lineHeight: 1.85 }}>
              Five divisions under one structure. Each backed by shared capital, brand standards, and direct oversight from Zolara Holdings.
            </p>
          </div>

          {/* Beauty Studio — full width featured */}
          <div className="up s1" style={{ display: "grid", gridTemplateColumns: "1fr 300px", marginBottom: 2, background: P.canopy, border: `1px solid #1E3820`, overflow: "hidden", transition: "border-color 0.4s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#A8C8A018"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#1E3820"}
          >
            <div style={{ padding: "52px 56px" }}>
              <span style={{ fontFamily: B, fontSize: 8, fontWeight: 500, color: P.sage, letterSpacing: "0.45em", textTransform: "uppercase", border: `1px solid ${P.sage}28`, padding: "5px 14px", marginBottom: 24, display: "inline-block" }}>Operational · Live</span>
              <h3 style={{ fontFamily: H, fontSize: "clamp(28px,3.2vw,46px)", fontWeight: 400, color: P.white, lineHeight: 1.1, marginBottom: 16 }}>Zolara Beauty Studio</h3>
              <p style={{ fontFamily: B, fontSize: 15, fontWeight: 300, color: P.grey, lineHeight: 1.88, marginBottom: 32, maxWidth: 560 }}>
                Premium salon and beauty services. Flagship subsidiary. Sakasaka, Tamale — setting the standard for luxury beauty in Northern Ghana.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://zolarasalon.com" target="_blank" rel="noopener noreferrer" className="b1">Visit zolarasalon.com</a>
                <a href="#contact" className="b2">Partner With Us</a>
              </div>
            </div>
            <div className="hidemd" style={{ background: `radial-gradient(ellipse at center, #1A3820, ${P.void})`, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: `1px solid #1E3820` }}>
              <img src="/zh-logo.jpeg" alt="ZH" style={{ width: 88, height: 88, objectFit: "contain", opacity: 0.08 }}/>
            </div>
          </div>

          {/* Remaining 4 — 2x2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {[
              { name: "Zolara Properties", desc: "Real estate investment and property development across Northern Ghana and key urban markets.", tag: "Launching 2026" },
              { name: "Zolara Logistics", desc: "Supply chain coordination and last-mile delivery infrastructure across Ghana.", tag: "Launching 2026" },
              { name: "Zolara Pharma & Wellness", desc: "Pharmaceutical retail and community health and wellness services.", tag: "Launching 2027" },
              { name: "Zolara Hospitality", desc: "Premium accommodation and world-class guest experience development.", tag: "Future" },
            ].map((s, i) => (
              <div key={s.name} className={`card up s${i + 1}`}>
                <p style={{ fontFamily: B, fontSize: 8, fontWeight: 400, color: P.faint, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 22 }}>{s.tag}</p>
                <h4 style={{ fontFamily: H, fontSize: 24, fontWeight: 400, color: P.white, marginBottom: 14, lineHeight: 1.2 }}>{s.name}</h4>
                <p style={{ fontFamily: B, fontSize: 13, fontWeight: 300, color: P.grey, lineHeight: 1.88 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ INVESTMENT THESIS ══════════════ */}
      <section id="thesis" style={{ background: P.void, padding: "140px 64px", borderTop: `1px solid ${P.line}` }} className="px">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="left"><Tag>Investment Thesis</Tag></div>
          <h2 className="up s1" style={{ fontFamily: H, fontSize: "clamp(32px,4.5vw,62px)", fontWeight: 400, lineHeight: 1.2, maxWidth: 900, marginBottom: 80, letterSpacing: "0.005em" }}>
            Ghana is one of West Africa's most stable economies. The opportunity to build premium, structured businesses here — and scale across the continent — is enormous.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, borderTop: `1px solid ${P.line}` }} className="col3">
            {[
              { n: "01", title: "Underserved Markets", body: "Beauty, logistics, real estate, and wellness in Northern Ghana are largely informal and fragmented. Zolara brings structure, quality, and brand — creating categories, not just companies." },
              { n: "02", title: "Holding Advantage", body: "Centralised capital allocation, shared infrastructure, and group-level credibility that individual businesses cannot build alone. One strong structure backing everything." },
              { n: "03", title: "Long-Term Capital", body: "We are not building businesses to sell. We are building institutions to own. Every investment decision is made with a minimum 10-year horizon." },
            ].map((t, i) => (
              <div key={t.n} className={`up s${i + 1}`}
                style={{ padding: "44px 44px 44px 0", paddingLeft: i > 0 ? 44 : 0, borderRight: i < 2 ? `1px solid ${P.line}` : "none", transition: "background 0.3s" }}
              >
                <p style={{ fontFamily: H, fontSize: 13, color: P.sage, letterSpacing: "0.2em", marginBottom: 24, opacity: 0.5 }}>{t.n}</p>
                <h3 style={{ fontFamily: H, fontSize: 28, fontWeight: 400, color: P.white, marginBottom: 18, lineHeight: 1.2 }}>{t.title}</h3>
                <p style={{ fontFamily: B, fontSize: 14, fontWeight: 300, color: P.grey, lineHeight: 1.88 }}>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ QUOTE ══════════════ */}
      <section style={{ background: P.canopy, padding: "120px 64px", borderTop: `1px solid ${P.line}` }} className="px">
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="col2">
          <blockquote className="up s1" style={{ fontFamily: H, fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 400, color: P.white, lineHeight: 1.65, fontStyle: "italic" }}>
            "I built Zolara Holdings with one purpose — to create businesses that last. Not just to open companies, but to build strong, disciplined brands that will serve communities and stand the test of time."
          </blockquote>
          <div style={{ paddingLeft: 64, borderLeft: `1px solid ${P.faint}` }}>
            <div className="up s1" style={{ width: 36, height: 1, background: P.sage, marginBottom: 24, opacity: 0.5 }} />
            <p className="up s2" style={{ fontFamily: H, fontSize: 28, color: P.sage, letterSpacing: "0.06em", marginBottom: 8 }}>Haruna Salifu</p>
            <p className="up s3" style={{ fontFamily: B, fontSize: 9, fontWeight: 300, color: P.grey, letterSpacing: "0.42em", textTransform: "uppercase", marginBottom: 40 }}>Founder & Executive Director</p>
            <a href="#leadership" className="up s4 b2" style={{ fontSize: 9, padding: "11px 24px" }}>Meet the Founder</a>
          </div>
        </div>
      </section>

      {/* ══════════════ LEADERSHIP ══════════════ */}
      <section id="leadership" style={{ background: P.void, padding: "140px 64px", borderTop: `1px solid ${P.line}` }} className="px">
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }} className="col2">

          {/* Portrait */}
          <div className="fade" style={{ position: "relative" }}>
            <div style={{ background: P.forest, border: `1px solid ${P.canopy}`, aspectRatio: "4/5", maxWidth: 480, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 30%, ${P.canopy}, ${P.void})` }} />
              <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                <img src="/zh-logo.jpeg" alt="ZH" style={{ width: 88, height: 88, objectFit: "contain", opacity: 0.08, marginBottom: 20 }}/>
                <p style={{ fontFamily: B, fontSize: 8, fontWeight: 300, color: P.faint, letterSpacing: "0.5em", textTransform: "uppercase" }}>Portrait</p>
              </div>
              {[[{ top: 20, left: 20 }, "M0,24 L0,0 L24,0"], [{ top: 20, right: 20 }, "M0,0 L24,0 L24,24"], [{ bottom: 20, left: 20 }, "M0,0 L0,24 L24,24"], [{ bottom: 20, right: 20 }, "M24,0 L24,24 L0,24"]].map(([pos, d], i) => (
                <svg key={i} width="24" height="24" viewBox="0 0 24 24" style={{ position: "absolute", ...pos, opacity: 0.3 }}>
                  <path d={d} fill="none" stroke="#A8C8A0" strokeWidth="1" />
                </svg>
              ))}
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "55%", height: 1, background: `linear-gradient(90deg, ${P.sage}, transparent)` }} />
          </div>

          {/* Bio */}
          <div>
            <div className="up"><Tag>Leadership</Tag></div>
            <h2 className="up s1" style={{ fontFamily: H, fontSize: "clamp(48px,6.5vw,92px)", fontWeight: 400, lineHeight: 0.92, marginBottom: 20, letterSpacing: "-0.01em" }}>
              Haruna<br /><em style={{ color: P.sage }}>Salifu</em>
            </h2>
            <p className="up s2" style={{ fontFamily: B, fontSize: 10, fontWeight: 300, color: P.grey, letterSpacing: "0.38em", textTransform: "uppercase", marginBottom: 36 }}>Founder & Executive Director</p>
            <div className="up s2" style={{ width: 36, height: 1, background: P.sage, marginBottom: 36, opacity: 0.4 }} />
            <p className="up s3" style={{ fontFamily: B, fontSize: 15, fontWeight: 300, color: P.grey, lineHeight: 1.9, marginBottom: 20 }}>
              Haruna Salifu founded Zolara Holdings with a clear thesis: Ghana's most important economic sectors are underserved, fragmented, and ripe for structured, branded enterprise.
            </p>
            <p className="up s4" style={{ fontFamily: B, fontSize: 15, fontWeight: 300, color: P.grey, lineHeight: 1.9, marginBottom: 44, opacity: 0.75 }}>
              He leads with a focus on discipline, long-term capital allocation, and operational excellence — building a business ecosystem designed to last generations.
            </p>
            <div className="up s5" style={{ borderLeft: `2px solid ${P.sage}30`, paddingLeft: 22 }}>
              <p style={{ fontFamily: H, fontSize: 20, fontStyle: "italic", color: P.faint, lineHeight: 1.75 }}>
                "The goal is not to open companies.<br />It is to build institutions."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ TIMELINE ══════════════ */}
      <section style={{ background: P.forest, padding: "120px 64px", borderTop: `1px solid ${P.line}` }} className="px">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 80 }} className="col2">
            <div>
              <div className="up"><Tag>Roadmap</Tag></div>
              <h2 className="up s1" style={{ fontFamily: H, fontSize: "clamp(32px,3.5vw,50px)", fontWeight: 400, lineHeight: 1.1 }}>
                Where We're<br /><em style={{ color: P.sage }}>Headed</em>
              </h2>
            </div>
            <div style={{ borderTop: `1px solid ${P.line}` }}>
              {[
                { year: "2025", title: "Group Formation & Beauty Studio Launch", body: "Zolara Holdings Ltd established. Zolara Beauty Studio opened in Tamale. Capital deployed exceeds GHS 2M. 7 staff employed.", live: true },
                { year: "2026", title: "Real Estate Expansion", body: "Launch of Zolara Properties — real estate development and management across Northern Ghana and key urban centres." },
                { year: "2027", title: "Pharma & Wellness Entry", body: "Entry into pharmaceutical retail and community wellness — expanding Zolara's health footprint across Ghana." },
                { year: "2028+", title: "Logistics, Hospitality & Regional Growth", body: "Full activation of Zolara Logistics and Hospitality. Group revenue targets hit. Continental expansion begins." },
              ].map((t, i) => (
                <div key={t.year} className={`up s${Math.min(i + 1, 5)}`} style={{ display: "flex", gap: 28, padding: "32px 0", borderBottom: `1px solid ${P.line}` }}>
                  <div style={{ flexShrink: 0, paddingTop: 4 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.live ? P.sage : "transparent", border: `1px solid ${t.live ? P.sage : P.faint}`, boxShadow: t.live ? `0 0 14px ${P.sage}50` : "none", animation: t.live ? "ping 2.8s ease-in-out infinite" : "none" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: B, fontSize: 9, fontWeight: 500, color: t.live ? P.sage : P.faint, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 8 }}>{t.year}</p>
                    <h3 style={{ fontFamily: H, fontSize: 24, fontWeight: 400, color: P.white, marginBottom: 10 }}>{t.title}</h3>
                    <p style={{ fontFamily: B, fontSize: 13, fontWeight: 300, color: P.grey, lineHeight: 1.85 }}>{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CONTACT ══════════════ */}
      <section id="contact" style={{ background: P.void, padding: "140px 64px", borderTop: `1px solid ${P.line}`, position: "relative", overflow: "hidden" }} className="px">
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 55% 70% at 80% 55%, ${P.forest}80, transparent)` }} />
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start", position: "relative", zIndex: 2 }} className="col2">

          {/* Left: info */}
          <div>
            <div className="up"><Tag>Contact</Tag></div>
            <h2 className="up s1" style={{ fontFamily: H, fontSize: "clamp(36px,4.5vw,64px)", fontWeight: 400, lineHeight: 1.08, marginBottom: 24 }}>
              Investment<br /><em style={{ color: P.sage }}>Inquiries</em>
            </h2>
            <p className="up s2" style={{ fontFamily: B, fontSize: 15, fontWeight: 300, color: P.grey, lineHeight: 1.88, marginBottom: 56 }}>
              We welcome conversations with investors, business partners, and individuals who share our vision of building lasting enterprises across Africa.
            </p>
            <div className="up s3" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { i: "✉", l: "Email", v: "info@zolaraholdings.com", h: "mailto:info@zolaraholdings.com" },
                { i: "✆", l: "Phone", v: "+233 594 922 679", h: "tel:+233594922679" },
                { i: "✆", l: "Phone", v: "+233 249 978 750", h: "tel:+233249978750" },
                { i: "◎", l: "Location", v: "Tamale, Northern Region, Ghana" },
              ].map(c => (
                <div key={c.v} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <span style={{ color: P.sage, fontSize: 12, width: 18, marginTop: 2, flexShrink: 0, opacity: 0.55 }}>{c.i}</span>
                  <div>
                    <p style={{ fontFamily: B, fontSize: 8.5, fontWeight: 400, color: P.faint, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 5 }}>{c.l}</p>
                    {c.h
                      ? <a href={c.h} style={{ fontFamily: B, fontSize: 14, fontWeight: 300, color: P.grey, textDecoration: "none", transition: "color 0.25s" }} onMouseEnter={e => e.target.style.color = P.sage} onMouseLeave={e => e.target.style.color = P.grey}>{c.v}</a>
                      : <p style={{ fontFamily: B, fontSize: 14, fontWeight: 300, color: P.grey }}>{c.v}</p>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="up s2">
            {sent ? (
              <div style={{ background: P.forest, border: `1px solid ${P.sage}20`, padding: "56px 44px", textAlign: "center" }}>
                <div style={{ fontSize: 28, color: P.sage, marginBottom: 20, opacity: 0.7 }}>✓</div>
                <p style={{ fontFamily: H, fontSize: 30, color: P.white, marginBottom: 12 }}>Message Received</p>
                <p style={{ fontFamily: B, fontSize: 14, color: P.grey, fontWeight: 300 }}>We'll be in touch within 48 hours.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <input className="inp" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input className="inp" type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <select className="inp" style={{ appearance: "none" }} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="" disabled>Inquiry Type</option>
                  <option>Investment Partnership</option>
                  <option>Business Proposal</option>
                  <option>General Inquiry</option>
                  <option>Media & Press</option>
                  <option>Other</option>
                </select>
                <textarea className="inp" placeholder="Your Message" rows={6} style={{ resize: "none" }} value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />
                <button className="b1" style={{ width: "100%", justifyContent: "center", marginTop: 1 }} onClick={() => { if (form.name && form.email) setSent(true); }}>
                  Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer style={{ background: "#020806", padding: "44px 64px", borderTop: `1px solid ${P.line}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, marginBottom: 32, paddingBottom: 32, borderBottom: `1px solid ${P.line}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src="/zh-logo.jpeg" alt="ZH" style={{ width: 30, height: 30, objectFit: "contain", opacity: 0.3 }}/>
              <span style={{ fontFamily: B, fontSize: 10, fontWeight: 300, color: P.faint, letterSpacing: "0.35em", textTransform: "uppercase" }}>Zolara Holdings Ltd</span>
            </div>
            <nav style={{ display: "flex", gap: 36 }}>
              {["About", "Portfolio", "Thesis", "Leadership", "Contact"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily: B, fontSize: 9, fontWeight: 300, color: "#182018", letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.25s" }}
                  onMouseEnter={e => e.target.style.color = P.sage} onMouseLeave={e => e.target.style.color = "#182018"}>{l}</a>
              ))}
            </nav>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontFamily: B, fontSize: 9.5, fontWeight: 300, color: "#111810", letterSpacing: "0.14em" }}>© 2026 Zolara Holdings Ltd. All Rights Reserved.</p>
            <a href="/privacy-policy" style={{ fontFamily: B, fontSize: 9.5, fontWeight: 300, color: "#111810", letterSpacing: "0.14em", textDecoration: "none" }}>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
