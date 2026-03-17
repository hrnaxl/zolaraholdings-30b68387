import { useState, useEffect, useRef } from "react";

// One palette. Committed.
const G = {
  bg:     "#060E08",
  panel:  "#0A1A0C",
  green:  "#112614",
  accent: "#C8B98A",  // warm sand — confident, not flashy
  text:   "#EDE6D4",
  sub:    "#8A9080",
  dim:    "#3A4A38",
  line:   "#162018",
  copper: "#A06030",
};

const FONT_HEAD = "'Cormorant Garamond', 'Cormorant', Georgia, serif";
const FONT_BODY = "'DM Sans', 'Inter', system-ui, sans-serif";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body { background: #060E08; color: #EDE6D4; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
* { cursor: none !important; }

::-webkit-scrollbar { width: 2px; }
::-webkit-scrollbar-thumb { background: #C8B98A22; }

/* Cursor */
.c1 { position: fixed; width: 6px; height: 6px; background: #C8B98A; border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%,-50%); }
.c2 { position: fixed; width: 30px; height: 30px; border: 1px solid #C8B98A30; border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%,-50%); transition: left 0.1s ease, top 0.1s ease; }

/* Film grain — subtle */
.grain { position: fixed; inset: 0; pointer-events: none; z-index: 9000; opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 140px; }

/* Nav links */
.nav-a { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase; color: #546050; text-decoration: none; transition: color 0.25s; }
.nav-a:hover { color: #C8B98A; }

/* Primary button */
.btn { display: inline-flex; align-items: center; gap: 10px; padding: 14px 36px; background: #C8B98A; color: #060E08; font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.24em; text-transform: uppercase; text-decoration: none; border: none; transition: background 0.3s, box-shadow 0.3s; }
.btn:hover { background: #D8CDA0; box-shadow: 0 6px 32px #C8B98A1A; }

/* Ghost button */
.btn-g { display: inline-flex; align-items: center; gap: 10px; padding: 13px 34px; background: transparent; color: #C8B98A; border: 1px solid #C8B98A30; font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; text-decoration: none; transition: border-color 0.3s, background 0.3s; }
.btn-g:hover { border-color: #C8B98A60; background: #C8B98A06; }

/* Scroll reveals */
.sr { opacity: 0; transform: translateY(18px); transition: opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94); }
.sr.in { opacity: 1; transform: none; }
.sr.t1 { transition-delay: 0.05s; } .sr.t2 { transition-delay: 0.12s; } .sr.t3 { transition-delay: 0.2s; } .sr.t4 { transition-delay: 0.3s; } .sr.t5 { transition-delay: 0.42s; }
.sfade { opacity: 0; transition: opacity 1s ease; } .sfade.in { opacity: 1; }

/* Portfolio card */
.pcard { border: 1px solid #162018; background: #0A1A0C; padding: 40px 36px; position: relative; transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s; }
.pcard:hover { border-color: #C8B98A1A; box-shadow: 0 16px 48px rgba(0,0,0,0.35); transform: translateY(-2px); }
.pcard-accent { position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #C8B98A, transparent); transform: scaleX(0); transform-origin: left; transition: transform 0.5s ease; }
.pcard:hover .pcard-accent { transform: scaleX(1); }

/* Form */
.field { width: 100%; background: #0A1A0C; border: 1px solid #162018; color: #EDE6D4; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; padding: 15px 18px; outline: none; transition: border-color 0.25s; letter-spacing: 0.02em; }
.field::placeholder { color: #243020; }
.field:focus { border-color: #C8B98A30; }

/* Ticker */
@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.tk { display: flex; animation: ticker 35s linear infinite; white-space: nowrap; }
.tk:hover { animation-play-state: paused; }

/* Pulse for timeline dot */
@keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 #C8B98A28; } 60% { box-shadow: 0 0 0 8px #C8B98A00; } }

/* Divider */
.hr { height: 1px; background: linear-gradient(to right, transparent, #1A2A1A, transparent); }

@media (max-width: 1024px) {
  .two { grid-template-columns: 1fr !important; gap: 56px !important; }
  .hm { display: none !important; }
}
@media (max-width: 768px) {
  .three { grid-template-columns: 1fr !important; }
  .four { grid-template-columns: 1fr 1fr !important; }
  .hn { display: none !important; }
  .pad { padding-left: 24px !important; padding-right: 24px !important; }
  .hero-h { font-size: clamp(52px, 13vw, 80px) !important; }
}
`;

// Section wrapper
const S = ({ id, style, children, className="" }) => (
  <section id={id} className={`pad ${className}`} style={{ padding: "120px 64px", position: "relative", ...style }}>
    {children}
  </section>
);

// Section label
const Label = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
    <span style={{ width: 20, height: 1, background: G.accent, opacity: 0.5 }} />
    <span style={{ fontFamily: FONT_BODY, fontSize: 9, color: G.accent, letterSpacing: "0.52em", textTransform: "uppercase" }}>{children}</span>
  </div>
);

// Divider
const Divider = () => <div className="hr" />;

// Counter
function Counter({ to, suffix = "" }) {
  const ref = useRef(); const [go, setGo] = useState(false); const [v, setV] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current); return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!go) return;
    let raf, t0 = null;
    const fn = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / 1600, 1); setV(Math.floor(p * to)); if (p < 1) raf = requestAnimationFrame(fn); };
    raf = requestAnimationFrame(fn); return () => cancelAnimationFrame(raf);
  }, [go, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export default function ZolaraHoldings() {
  const [loaded, setLoaded] = useState(false);
  const [heroIn, setHeroIn] = useState(false);
  const [dot, setDot] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 50);
    setTimeout(() => setHeroIn(true), 160);
    const mv = e => { setDot({ x: e.clientX, y: e.clientY }); setTimeout(() => setRing({ x: e.clientX, y: e.clientY }), 85); };
    window.addEventListener("mousemove", mv);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    setTimeout(() => document.querySelectorAll(".sr, .sfade").forEach(el => obs.observe(el)), 250);
    return () => window.removeEventListener("mousemove", mv);
  }, []);

  const show = (d = 0) => ({ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(12px)", transition: `opacity 0.9s ease ${d}s, transform 0.9s ease ${d}s` });
  const word = d => ({ display: "inline-block", opacity: heroIn ? 1 : 0, transform: heroIn ? "none" : "translateY(100%)", transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${d}s` });

  const nav = [["#about","About"],["#portfolio","Portfolio"],["#thesis","Investment Thesis"],["#leadership","Leadership"],["#contact","Contact"]];

  return (
    <div style={{ background: G.bg, color: G.text, fontFamily: FONT_BODY, overflowX: "hidden" }}>
      <style>{css}</style>
      <div className="grain" />
      <div className="c1" style={{ left: dot.x, top: dot.y }} />
      <div className="c2" style={{ left: ring.x, top: ring.y }} />

      {/* ─────────────────── HEADER ─────────────────── */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 68, background: "#060E08F0", backdropFilter: "blur(20px)", borderBottom: "1px solid #0E180E", ...show(0.1) }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 56px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img src="/zh-logo.jpeg" alt="Zolara Holdings" style={{ width: 38, height: 38, objectFit: "contain" }} />
            <div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 16, fontWeight: 500, color: G.text, letterSpacing: "0.25em" }}>ZOLARA</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 7, color: G.sub, letterSpacing: "0.5em", textTransform: "uppercase", marginTop: 1 }}>Holdings Ltd</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hn" style={{ display: "flex", gap: 40 }}>
            {nav.map(([h, l]) => <a key={h} href={h} className="nav-a">{l}</a>)}
          </nav>

          {/* CTA */}
          <a href="#contact" className="btn hm" style={{ padding: "10px 22px", fontSize: 9 }}>Inquire</a>
        </div>
      </header>

      {/* ─────────────────── HERO ─────────────────── */}
      <section style={{ minHeight: "100vh", background: G.bg, display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 68 }}>
        
        {/* Atmospheric green depth */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 70% at 55% 45%, ${G.green}90 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 40% 50% at 10% 80%, #0D2010A0 0%, transparent 55%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 64px", width: "100%", position: "relative", zIndex: 2 }}>
          
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 64, ...show(0.25) }}>
            <span style={{ width: 18, height: 1, background: G.accent, opacity: 0.5 }} />
            <span style={{ fontFamily: FONT_BODY, fontSize: 9, color: G.accent, letterSpacing: "0.52em", textTransform: "uppercase" }}>Strategic Investment Group · Tamale, Ghana</span>
          </div>

          {/* Headline — clean, no tricks */}
          <h1 className="hero-h" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(64px, 9.5vw, 128px)", fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.01em", marginBottom: 0 }}>
            <div style={{ overflow: "hidden", marginBottom: 6 }}>
              <span style={word(0.2)}>Building</span>
            </div>
            <div style={{ overflow: "hidden", marginBottom: 6 }}>
              <span style={word(0.35)}>Businesses</span>
            </div>
            <div style={{ overflow: "hidden" }}>
              <em style={{ ...word(0.5), color: G.accent, fontStyle: "italic" }}>That Last.</em>
            </div>
          </h1>

          {/* Ruled line — draws in */}
          <div style={{ height: 1, background: `linear-gradient(90deg, ${G.accent}70, ${G.accent}20, transparent)`, width: heroIn ? "50%" : 0, transition: "width 1.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.9s", marginTop: 52, marginBottom: 48 }} />

          {/* Sub + actions */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 40, ...show(1.1) }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 16, fontWeight: 300, color: G.sub, maxWidth: 480, lineHeight: 1.85, letterSpacing: "0.02em" }}>
              A Ghanaian holding company developing, owning, and scaling premium businesses across beauty, real estate, logistics, and wellness.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="#portfolio" className="btn">View Portfolio</a>
              <a href="#contact" className="btn-g">Inquire</a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 44, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, ...show(2) }}>
          <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, ${G.accent}50, transparent)` }} />
          <span style={{ fontFamily: FONT_BODY, fontSize: 8, color: G.dim, letterSpacing: "0.45em", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* ─────────────────── STATS ─────────────────── */}
      <div style={{ background: G.panel, borderTop: `1px solid ${G.line}`, borderBottom: `1px solid ${G.line}` }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "56px 64px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }} className="four">
          {[["5", "", "Portfolio Companies"], ["2", "M+", "Capital Deployed GHS"], ["2025", "", "Year Founded"], ["7", "", "Staff Employed"]].map(([n, s, l], i) => (
            <div key={l} className="sr" style={{ textAlign: "center", borderRight: i < 3 ? `1px solid ${G.line}` : "none", padding: "0 20px" }}>
              <div style={{ fontFamily: FONT_HEAD, fontSize: "clamp(36px,4.5vw,56px)", fontWeight: 400, color: G.accent, lineHeight: 1, marginBottom: 10 }}>
                <Counter to={parseInt(n)} suffix={s} />
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 9, color: G.dim, letterSpacing: "0.32em", textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ─────────────────── ABOUT ─────────────────── */}
      <S id="about" style={{ background: G.bg }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "start" }} className="two">
            
            {/* Left */}
            <div>
              <div className="sr"><Label>About Zolara Holdings</Label></div>
              <h2 className="sr t1" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 400, lineHeight: 1.1, color: G.text, marginBottom: 36, letterSpacing: "0.005em" }}>
                We invest in,<br />build, and operate<br /><em style={{ color: G.accent }}>premium businesses.</em>
              </h2>
              <div className="sr t2" style={{ width: 48, height: 1, background: G.accent, opacity: 0.5, marginBottom: 36 }} />
              <p className="sr t3" style={{ fontSize: 15, fontWeight: 300, color: G.sub, lineHeight: 1.9, marginBottom: 20 }}>
                Zolara Holdings Ltd is a Ghanaian holding company founded to develop, own, and manage businesses across key sectors of the economy — beauty, real estate, logistics, pharma, and hospitality.
              </p>
              <p className="sr t4" style={{ fontSize: 15, fontWeight: 300, color: G.sub, lineHeight: 1.9, marginBottom: 48 }}>
                We provide shared leadership, capital, and brand strategy across all our subsidiaries — reducing risk, enabling scale, and building enterprises that stand the test of time.
              </p>
              <div className="sr t5"><a href="#portfolio" className="btn-g">See Our Portfolio</a></div>
            </div>

            {/* Right — three clean pillars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 8 }}>
              {[
                { tag: "Mission", title: "Strategic Growth", body: "To grow high-value businesses through disciplined investment and hands-on operational leadership across Ghana and Africa." },
                { tag: "Vision", title: "African Leadership", body: "To be one of Africa's most respected holding companies — known for building strong, lasting brands and creating generational wealth." },
                { tag: "Philosophy", title: "Structure First", body: "One holding structure. Centralised finance, branding, and governance. Every subsidiary benefits from the whole." },
              ].map((p, i) => (
                <div key={p.tag} className={`sr t${i + 1}`}
                  style={{ background: G.panel, borderLeft: `2px solid ${G.accent}`, padding: "28px 32px", transition: "background 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#0C1E0E"}
                  onMouseLeave={e => e.currentTarget.style.background = G.panel}
                >
                  <p style={{ fontFamily: FONT_BODY, fontSize: 8.5, color: G.accent, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 10 }}>{p.tag}</p>
                  <h3 style={{ fontFamily: FONT_HEAD, fontSize: 22, fontWeight: 500, color: G.text, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, fontWeight: 300, color: G.sub, lineHeight: 1.85 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </S>

      <Divider />

      {/* ─────────────────── PORTFOLIO ─────────────────── */}
      <S id="portfolio" style={{ background: G.panel }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 64 }}>
            <div>
              <div className="sr"><Label>Our Portfolio</Label></div>
              <h2 className="sr t1" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(36px,4vw,54px)", fontWeight: 400, color: G.text, lineHeight: 1.1 }}>
                Subsidiaries &<br /><em style={{ color: G.accent }}>Divisions</em>
              </h2>
            </div>
            <p className="sr t2" style={{ fontSize: 14, fontWeight: 300, color: G.sub, maxWidth: 360, lineHeight: 1.85 }}>
              Each business operates independently — backed by Zolara's shared capital, brand standards, and governance.
            </p>
          </div>

          {/* Featured — Beauty Studio */}
          <div className="sr t1" style={{ display: "grid", gridTemplateColumns: "1fr auto", marginBottom: 2, background: G.green, border: `1px solid #1E3820`, overflow: "hidden", transition: "border-color 0.35s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#C8B98A18"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#1E3820"}
          >
            <div style={{ padding: "52px 52px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                <span style={{ fontFamily: FONT_BODY, fontSize: 8, color: G.accent, letterSpacing: "0.42em", textTransform: "uppercase", border: `1px solid ${G.accent}35`, padding: "4px 12px" }}>Operational · Live</span>
              </div>
              <a href="https://zolarasalon.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <h3 style={{ fontFamily: FONT_HEAD, fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 400, color: G.text, marginBottom: 16, lineHeight: 1.1, transition: "color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = G.accent}
                  onMouseLeave={e => e.target.style.color = G.text}
                >Zolara Beauty Studio</h3>
              </a>
              <p style={{ fontSize: 15, fontWeight: 300, color: G.sub, lineHeight: 1.85, marginBottom: 32, maxWidth: 560 }}>
                Premium salon and beauty services. Our flagship operational subsidiary, based in Sakasaka, Tamale — setting the standard for luxury beauty in Northern Ghana.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://zolarasalon.com" target="_blank" rel="noopener noreferrer" className="btn">Visit zolarasalon.com</a>
                <a href="#contact" className="btn-g">Partner With Us</a>
              </div>
            </div>
            <div className="hm" style={{ width: 240, background: `radial-gradient(ellipse at center, #1E3A22, ${G.bg})`, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: `1px solid #1E3820` }}>
              <img src="/zh-logo.jpeg" alt="ZH" style={{ width: 88, height: 88, objectFit: "contain", opacity: 0.1 }} />
            </div>
          </div>

          {/* Grid — 4 upcoming */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }} className="four">
            {[
              { name: "Zolara Properties", desc: "Real estate investment and property development across Northern Ghana.", tag: "Upcoming 2026" },
              { name: "Zolara Logistics", desc: "Supply chain coordination and last-mile delivery infrastructure.", tag: "Upcoming 2026" },
              { name: "Zolara Pharma & Wellness", desc: "Pharmaceutical retail and community wellness services.", tag: "Upcoming 2027" },
              { name: "Zolara Hospitality", desc: "Premium accommodation and guest experience development.", tag: "Future" },
            ].map((s, i) => (
              <div key={s.name} className={`pcard sr t${i + 1}`}>
                <div className="pcard-accent" />
                <p style={{ fontFamily: FONT_BODY, fontSize: 8, color: G.dim, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20 }}>{s.tag}</p>
                <h4 style={{ fontFamily: FONT_HEAD, fontSize: 20, fontWeight: 500, color: G.text, marginBottom: 12, lineHeight: 1.25 }}>{s.name}</h4>
                <p style={{ fontSize: 13, fontWeight: 300, color: G.sub, lineHeight: 1.85 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </S>

      {/* ─────────────────── TICKER ─────────────────── */}
      <div style={{ background: G.bg, borderTop: `1px solid ${G.line}`, borderBottom: `1px solid ${G.line}`, padding: "14px 0", overflow: "hidden" }}>
        <div className="tk">
          {[...Array(6)].flatMap(() => ["Zolara Beauty Studio", "Zolara Properties", "Zolara Logistics", "Zolara Pharma & Wellness", "Zolara Hospitality"]).map((s, i) => (
            <span key={i} style={{ fontFamily: FONT_BODY, fontSize: 9, color: G.dim, letterSpacing: "0.38em", textTransform: "uppercase", padding: "0 36px" }}>
              {s} <span style={{ color: "#243020", marginLeft: 6 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      <Divider />

      {/* ─────────────────── INVESTMENT THESIS ─────────────────── */}
      <S id="thesis" style={{ background: G.bg }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div className="sr"><Label>Investment Thesis</Label></div>

          {/* Large centred statement */}
          <h2 className="sr t1" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px, 4.5vw, 62px)", fontWeight: 300, lineHeight: 1.2, color: G.text, maxWidth: 900, marginBottom: 72, letterSpacing: "0.005em" }}>
            Ghana is one of West Africa's most stable economies. The opportunity to build premium, structured businesses here — and scale them across the continent — is enormous.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }} className="three">
            {[
              { n: "01", title: "Underserved Markets", body: "Beauty, logistics, real estate, and wellness in Northern Ghana are largely informal and fragmented. Zolara brings structure, quality, and brand — creating categories, not just companies." },
              { n: "02", title: "Holding Structure Advantage", body: "A holding company model allows centralised capital allocation, shared overheads, and group-level brand credibility that individual businesses can't build alone." },
              { n: "03", title: "Long-Term Capital", body: "We are not building businesses to sell. We are building institutions to own. Every investment decision is made with a 10-year minimum horizon." },
            ].map((t, i) => (
              <div key={t.n} className={`sr t${i + 1}`} style={{ borderTop: `1px solid ${G.line}`, paddingTop: 36 }}>
                <p style={{ fontFamily: FONT_HEAD, fontSize: 13, color: G.accent, letterSpacing: "0.2em", marginBottom: 20, opacity: 0.7 }}>{t.n}</p>
                <h3 style={{ fontFamily: FONT_HEAD, fontSize: 26, fontWeight: 500, color: G.text, marginBottom: 16, lineHeight: 1.2 }}>{t.title}</h3>
                <p style={{ fontSize: 14, fontWeight: 300, color: G.sub, lineHeight: 1.88 }}>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </S>

      <Divider />

      {/* ─────────────────── LEADERSHIP ─────────────────── */}
      <S id="leadership" style={{ background: G.panel }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center" }} className="two">

          {/* Portrait */}
          <div className="sfade" style={{ position: "relative" }}>
            <div style={{ background: G.green, border: `1px solid #1E3018`, aspectRatio: "4/5", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", maxWidth: 480 }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 30%, #1A3818, ${G.bg})` }} />
              <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                <img src="/zh-logo.jpeg" alt="ZH" style={{ width: 88, height: 88, objectFit: "contain", opacity: 0.08, marginBottom: 16 }} />
                <p style={{ fontFamily: FONT_BODY, fontSize: 8, color: G.dim, letterSpacing: "0.48em", textTransform: "uppercase" }}>Portrait</p>
              </div>
              {/* Corner marks */}
              {[[{ top: 20, left: 20 }, "M0,22 L0,0 L22,0"], [{ top: 20, right: 20 }, "M0,0 L22,0 L22,22"], [{ bottom: 20, left: 20 }, "M0,0 L0,22 L22,22"], [{ bottom: 20, right: 20 }, "M22,0 L22,22 L0,22"]].map(([pos, d], idx) => (
                <svg key={idx} width="22" height="22" viewBox="0 0 22 22" style={{ position: "absolute", ...pos, opacity: 0.35 }}>
                  <path d={d} fill="none" stroke="#C8B98A" strokeWidth="1" />
                </svg>
              ))}
            </div>
            <div style={{ position: "absolute", bottom: -1, left: 0, width: "55%", height: 1, background: `linear-gradient(90deg, ${G.accent}, transparent)` }} />
          </div>

          {/* Bio */}
          <div>
            <div className="sr"><Label>Leadership</Label></div>
            <h2 className="sr t1" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(44px,6vw,80px)", fontWeight: 300, color: G.text, lineHeight: 0.95, marginBottom: 16, letterSpacing: "-0.005em" }}>
              Haruna<br /><em style={{ color: G.accent }}>Salifu</em>
            </h2>
            <p className="sr t2" style={{ fontFamily: FONT_BODY, fontSize: 10, color: G.sub, letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 36 }}>Founder & Executive Director</p>
            <div className="sr t2" style={{ width: 40, height: 1, background: G.accent, marginBottom: 36, opacity: 0.45 }} />
            <p className="sr t3" style={{ fontSize: 15, fontWeight: 300, color: G.sub, lineHeight: 1.9, marginBottom: 18 }}>
              Haruna Salifu founded Zolara Holdings with a clear thesis: Ghana's most important economic sectors are underserved, fragmented, and ripe for structured, branded enterprise.
            </p>
            <p className="sr t4" style={{ fontSize: 15, fontWeight: 300, color: G.sub, lineHeight: 1.9, marginBottom: 44, opacity: 0.8 }}>
              He leads the group with a focus on discipline, long-term capital allocation, and operational excellence — building a business ecosystem designed to last generations.
            </p>
            <div className="sr t5" style={{ borderLeft: `2px solid ${G.accent}40`, paddingLeft: 22 }}>
              <p style={{ fontFamily: FONT_HEAD, fontSize: 20, fontStyle: "italic", color: "#4A5A48", lineHeight: 1.72 }}>
                "The goal is not to open companies.<br />It is to build institutions."
              </p>
            </div>
          </div>
        </div>
      </S>

      <Divider />

      {/* ─────────────────── TIMELINE ─────────────────── */}
      <S style={{ background: G.bg }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 80, alignItems: "start" }} className="two">
            <div>
              <div className="sr"><Label>Roadmap</Label></div>
              <h2 className="sr t1" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 400, color: G.text, lineHeight: 1.1 }}>
                Where We're<br /><em style={{ color: G.accent }}>Headed</em>
              </h2>
            </div>
            <div style={{ borderTop: `1px solid ${G.line}` }}>
              {[
                { year: "2025", title: "Group Formation + Beauty Studio Launch", body: "Zolara Holdings Ltd established. Zolara Beauty Studio opened in Tamale. Total capital deployed exceeds GHS 2M. Staff hired: 7.", active: true },
                { year: "2026", title: "Real Estate Expansion", body: "Launch of Zolara Properties — real estate development and property management across Northern Ghana and key urban centres." },
                { year: "2027", title: "Pharma & Wellness", body: "Entry into pharmaceutical retail and community wellness — expanding Zolara's health and wellness footprint across Ghana." },
                { year: "2028+", title: "Logistics + Hospitality", body: "Full activation of Zolara Logistics and Zolara Hospitality. Group revenue target reached. Regional expansion begins." },
              ].map((t, i) => (
                <div key={t.year} className={`sr t${Math.min(i + 1, 5)}`} style={{ display: "flex", gap: 28, padding: "32px 0", borderBottom: `1px solid ${G.line}` }}>
                  <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.active ? G.accent : "transparent", border: `1px solid ${t.active ? G.accent : G.dim}`, boxShadow: t.active ? `0 0 12px ${G.accent}50` : "none", animation: t.active ? "pulse 2.8s ease-in-out infinite" : "none", flexShrink: 0 }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: FONT_BODY, fontSize: 9, color: t.active ? G.accent : G.dim, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 8 }}>{t.year}</p>
                    <h3 style={{ fontFamily: FONT_HEAD, fontSize: 22, fontWeight: 500, color: G.text, marginBottom: 10 }}>{t.title}</h3>
                    <p style={{ fontSize: 13, fontWeight: 300, color: G.sub, lineHeight: 1.85 }}>{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </S>

      <Divider />

      {/* ─────────────────── CONTACT ─────────────────── */}
      <S id="contact" style={{ background: G.panel }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 70% at 75% 50%, ${G.green}60, transparent)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1360, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start", position: "relative", zIndex: 2 }} className="two">

          {/* Left */}
          <div>
            <div className="sr"><Label>Get In Touch</Label></div>
            <h2 className="sr t1" style={{ fontFamily: FONT_HEAD, fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 400, color: G.text, lineHeight: 1.1, marginBottom: 24 }}>
              Investment<br /><em style={{ color: G.accent }}>Inquiries</em>
            </h2>
            <p className="sr t2" style={{ fontSize: 15, fontWeight: 300, color: G.sub, lineHeight: 1.88, marginBottom: 56 }}>
              We welcome conversations with investors, business partners, and individuals who share our vision of building lasting enterprises across Africa.
            </p>
            <div className="sr t3" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { icon: "✉", label: "Email", value: "info@zolaraholdings.com", href: "mailto:info@zolaraholdings.com" },
                { icon: "✆", label: "Phone", value: "+233 594 922 679", href: "tel:+233594922679" },
                { icon: "✆", label: "Phone", value: "+233 249 978 750", href: "tel:+233249978750" },
                { icon: "◎", label: "Location", value: "Tamale, Northern Region, Ghana", href: null },
              ].map(c => (
                <div key={c.value} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <span style={{ color: G.accent, fontSize: 12, width: 18, marginTop: 1, flexShrink: 0, opacity: 0.65 }}>{c.icon}</span>
                  <div>
                    <p style={{ fontFamily: FONT_BODY, fontSize: 8.5, color: G.dim, letterSpacing: "0.42em", textTransform: "uppercase", marginBottom: 5 }}>{c.label}</p>
                    {c.href
                      ? <a href={c.href} style={{ fontSize: 14, fontWeight: 300, color: G.sub, textDecoration: "none", transition: "color 0.25s" }} onMouseEnter={e => e.target.style.color = G.accent} onMouseLeave={e => e.target.style.color = G.sub}>{c.value}</a>
                      : <p style={{ fontSize: 14, fontWeight: 300, color: G.sub }}>{c.value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="sr t2">
            {sent ? (
              <div style={{ background: G.green, border: `1px solid ${G.accent}22`, padding: "56px 44px", textAlign: "center" }}>
                <div style={{ fontSize: 30, color: G.accent, marginBottom: 20, opacity: 0.8 }}>✓</div>
                <p style={{ fontFamily: FONT_HEAD, fontSize: 28, color: G.text, marginBottom: 12 }}>Message Received</p>
                <p style={{ fontSize: 14, color: G.sub, fontWeight: 300 }}>We'll be in touch within 48 hours.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <input className="field" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input className="field" type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <select className="field" style={{ appearance: "none" }} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="" disabled>Inquiry Type</option>
                  <option>Investment Partnership</option>
                  <option>Business Proposal</option>
                  <option>General Inquiry</option>
                  <option>Media & Press</option>
                  <option>Other</option>
                </select>
                <textarea className="field" placeholder="Your Message" rows={6} style={{ resize: "none" }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                <button className="btn" style={{ width: "100%", justifyContent: "center", marginTop: 1 }} onClick={() => { if (form.name && form.email) setSent(true); }}>
                  Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      </S>

      <Divider />

      {/* ─────────────────── FOOTER ─────────────────── */}
      <footer style={{ background: "#030806", padding: "44px 64px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 32, paddingBottom: 32, borderBottom: `1px solid ${G.line}` }}>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
              <img src="/zh-logo.jpeg" alt="ZH" style={{ width: 30, height: 30, objectFit: "contain", opacity: 0.3 }} />
              <div style={{ fontFamily: FONT_HEAD, fontSize: 11, color: G.dim, letterSpacing: "0.35em" }}>ZOLARA HOLDINGS LTD</div>
            </a>
            <nav style={{ display: "flex", gap: 36 }}>
              {nav.map(([h, l]) => (
                <a key={h} href={h} style={{ fontFamily: FONT_BODY, fontSize: 9, color: "#182018", letterSpacing: "0.24em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.25s" }}
                  onMouseEnter={e => e.target.style.color = G.accent} onMouseLeave={e => e.target.style.color = "#182018"}>{l}</a>
              ))}
            </nav>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 9.5, color: "#121A12", letterSpacing: "0.14em" }}>© 2026 Zolara Holdings Ltd. All Rights Reserved.</p>
            <a href="/privacy-policy" style={{ fontFamily: FONT_BODY, fontSize: 9.5, color: "#121A12", letterSpacing: "0.14em", textDecoration: "none", transition: "color 0.25s" }}
              onMouseEnter={e => e.target.style.color = G.accent} onMouseLeave={e => e.target.style.color = "#121A12"}>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
