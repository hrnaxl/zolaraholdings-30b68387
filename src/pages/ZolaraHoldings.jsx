import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0B0B0D",
  bgSecondary: "#1A1A1F",
  gold: "#C6A15B",
  goldDim: "#A8864A",
  goldGlow: "#C6A15B22",
  ivory: "#F6F4EF",
  platinum: "#B8B8B8",
  emerald: "#0F3D2E",
  border: "#2A2A30",
  borderGold: "#C6A15B30",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }
  body { background: #0B0B0D; color: #F6F4EF; font-family: 'Inter', sans-serif; overflow-x: hidden; }
  * { cursor: none !important; }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #0B0B0D; }
  ::-webkit-scrollbar-thumb { background: #C6A15B40; }

  /* Cursor */
  .cur-dot {
    position: fixed; width: 6px; height: 6px;
    background: #C6A15B; border-radius: 50%;
    pointer-events: none; z-index: 99999;
    transform: translate(-50%,-50%);
    transition: transform 0.1s;
  }
  .cur-ring {
    position: fixed; width: 32px; height: 32px;
    border: 1px solid #C6A15B55; border-radius: 50%;
    pointer-events: none; z-index: 99998;
    transform: translate(-50%,-50%);
    transition: left 0.12s ease, top 0.12s ease, width 0.3s, height 0.3s, border-color 0.3s;
  }

  /* Noise texture */
  .noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 9000; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
  }

  /* Nav */
  .nav-item {
    font-family: 'Inter', sans-serif; font-size: 11px;
    font-weight: 400; letter-spacing: 0.16em;
    text-transform: uppercase; color: #B8B8B8;
    text-decoration: none; padding: 6px 0;
    position: relative; transition: color 0.3s;
  }
  .nav-item::after {
    content: ''; position: absolute; bottom: 0; left: 0;
    width: 0; height: 1px; background: #C6A15B;
    transition: width 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .nav-item:hover { color: #C6A15B; }
  .nav-item:hover::after { width: 100%; }

  /* Buttons */
  .btn-gold {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 15px 40px; background: #C6A15B; color: #0B0B0D;
    border: none; font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 500; letter-spacing: 0.2em;
    text-transform: uppercase; text-decoration: none;
    transition: background 0.3s, box-shadow 0.3s;
    position: relative; overflow: hidden;
  }
  .btn-gold:hover {
    background: #D4AF6B;
    box-shadow: 0 0 30px #C6A15B33;
  }

  .btn-outline {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 38px; background: transparent; color: #C6A15B;
    border: 1px solid #C6A15B55; font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 400; letter-spacing: 0.2em;
    text-transform: uppercase; text-decoration: none;
    transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
  }
  .btn-outline:hover {
    border-color: #C6A15B;
    background: #C6A15B0A;
    box-shadow: 0 0 20px #C6A15B1A;
  }

  /* Scroll reveal */
  .sr { opacity: 0; transform: translateY(28px); transition: opacity 1s cubic-bezier(0.25,0.46,0.45,0.94), transform 1s cubic-bezier(0.25,0.46,0.45,0.94); }
  .sr.in { opacity: 1; transform: translateY(0); }
  .sr.d1 { transition-delay: 0.1s; }
  .sr.d2 { transition-delay: 0.2s; }
  .sr.d3 { transition-delay: 0.3s; }
  .sr.d4 { transition-delay: 0.45s; }
  .sr.d5 { transition-delay: 0.6s; }
  .sr.d6 { transition-delay: 0.75s; }

  .sr-fade { opacity: 0; transition: opacity 1.2s cubic-bezier(0.25,0.46,0.45,0.94); }
  .sr-fade.in { opacity: 1; }

  .line-grow { width: 0 !important; transition: width 1.4s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
  .line-grow.in { width: 56px !important; }

  /* Portfolio cards */
  .port-card {
    background: #1A1A1F; border: 1px solid #2A2A30;
    padding: 44px 36px; position: relative; overflow: hidden;
    transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s;
  }
  .port-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 1px; background: linear-gradient(90deg, transparent, #C6A15B, transparent);
    transform: scaleX(0); transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .port-card:hover {
    border-color: #C6A15B22;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px #C6A15B0A;
    transform: translateY(-4px);
  }
  .port-card:hover::before { transform: scaleX(1); }

  /* Value cards */
  .val-item {
    padding: 40px 32px; border-left: 1px solid #2A2A30;
    transition: border-color 0.3s;
  }
  .val-item:hover { border-color: #C6A15B55; }

  /* Leadership */
  .leader-frame {
    border: 1px solid #2A2A30; padding: 56px 48px;
    position: relative; transition: border-color 0.4s;
  }
  .leader-frame::after {
    content: ''; position: absolute; bottom: -1px; left: 0;
    width: 0; height: 1px; background: #C6A15B;
    transition: width 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .leader-frame:hover { border-color: #C6A15B30; }
  .leader-frame:hover::after { width: 100%; }

  /* Contact form */
  .form-field {
    width: 100%; background: #1A1A1F; border: 1px solid #2A2A30;
    color: #F6F4EF; font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 300; letter-spacing: 0.04em;
    padding: 16px 20px; outline: none;
    transition: border-color 0.3s;
  }
  .form-field::placeholder { color: #4A4A52; }
  .form-field:focus { border-color: #C6A15B55; }

  /* Divider */
  .gold-hr { height: 1px; background: linear-gradient(to right, transparent, #C6A15B20, transparent); }

  /* Section label */
  .sec-label {
    font-family: 'Inter', sans-serif; font-size: 9px;
    font-weight: 500; letter-spacing: 0.45em;
    text-transform: uppercase; color: #C6A15B;
  }

  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 #C6A15B30;} 50%{box-shadow:0 0 0 10px #C6A15B00;} }
  @keyframes scanline { 0%{top:-100%;} 100%{top:200%;} }

  @media (max-width: 1024px) {
    .grid-2 { grid-template-columns: 1fr !important; }
    .hide-md { display: none !important; }
  }
  @media (max-width: 768px) {
    .grid-3 { grid-template-columns: 1fr !important; }
    .grid-4 { grid-template-columns: 1fr 1fr !important; }
    .hero-title { font-size: clamp(40px, 10vw, 80px) !important; }
    .sec-pad { padding: 80px 24px !important; }
    .nav-links { display: none !important; }
  }
`;

// ─── Helpers ───────────────────────────────────────────────
function Label({ children, center }) {
  return (
    <p className="sec-label" style={{ textAlign: center ? "center" : "left", marginBottom: 20 }}>
      {children}
    </p>
  );
}

function GoldRule({ center }) {
  return (
    <div className="line-grow sr" style={{
      width: 56, height: 1,
      background: "linear-gradient(90deg, #C6A15B, #A8864A)",
      margin: center ? "0 auto" : "0",
      marginBottom: 32,
    }} />
  );
}

function Divider() {
  return <div className="gold-hr" />;
}

// ─── Main Component ────────────────────────────────────────
export default function ZolaraHoldings() {
  const [loaded, setLoaded] = useState(false);
  const [heroIn, setHeroIn] = useState(false);
  const [dot, setDot] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);
    setTimeout(() => setHeroIn(true), 300);

    const move = (e) => {
      setDot({ x: e.clientX, y: e.clientY });
      setTimeout(() => setRing({ x: e.clientX, y: e.clientY }), 90);
    };
    window.addEventListener("mousemove", move);

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    setTimeout(() => {
      document.querySelectorAll(".sr, .sr-fade, .line-grow").forEach(el => obs.observe(el));
    }, 200);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  const appear = (delay = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 1s ease ${delay}s, transform 1s ease ${delay}s`,
  });

  const word = (delay) => ({
    display: "inline-block",
    opacity: heroIn ? 1 : 0,
    transform: heroIn ? "translateY(0)" : "translateY(60px)",
    transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <div style={{ background: C.bg, color: C.ivory, fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <style>{css}</style>
      <div className="noise" />
      <div className="cur-dot" style={{ left: dot.x, top: dot.y }} />
      <div className="cur-ring" style={{ left: ring.x, top: ring.y }} />

      {/* ════ HEADER ════ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: 76, background: "#0B0B0DEC",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #1E1E24",
        ...appear(0.1),
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 56px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}>
            <img src="/zh-logo.jpeg" alt="Zolara Holdings" style={{ width: 48, height: 48, objectFit: "contain" }} />
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500, color: C.ivory, letterSpacing: "0.2em" }}>ZOLARA</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 7.5, color: C.platinum, letterSpacing: "0.4em", textTransform: "uppercase", marginTop: 1 }}>Holdings Ltd</div>
            </div>
          </a>

          {/* Nav */}
          <nav className="nav-links" style={{ display: "flex", gap: 40 }}>
            {[["#about","About"],["#portfolio","Portfolio"],["#leadership","Leadership"],["#contact","Contact"]].map(([h,l]) => (
              <a key={h} href={h} className="nav-item">{l}</a>
            ))}
          </nav>

          <a href="#contact" className="btn-outline hide-md" style={{ padding: "10px 24px", fontSize: 10 }}>
            Inquire
          </a>
        </div>
      </header>

      {/* ════ HERO ════ */}
      <section style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 76 }}>

        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${C.border}18 1px, transparent 1px), linear-gradient(90deg, ${C.border}18 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }} />

        {/* Ambient light */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 800, height: 500, background: `radial-gradient(ellipse, ${C.gold}06 0%, transparent 65%)`, pointerEvents: "none" }} />

        {/* Side text */}
        <div className="hide-md" style={{ position: "absolute", left: 40, top: "50%", transform: "translateY(-50%) rotate(-90deg)", ...appear(1.8) }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#3A3A44", letterSpacing: "0.4em", textTransform: "uppercase" }}>Tamale · Ghana · Est. 2025</span>
        </div>
        <div className="hide-md" style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%) rotate(90deg)", ...appear(1.8) }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#3A3A44", letterSpacing: "0.4em", textTransform: "uppercase" }}>zolaraholdings.com</span>
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 56px", width: "100%", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 820 }}>

            {/* Label */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 52, ...appear(0.4) }}>
              <span style={{ width: 28, height: 1, background: C.gold, opacity: 0.6 }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: C.gold, letterSpacing: "0.45em", textTransform: "uppercase" }}>Strategic Investment Group</span>
            </div>

            {/* Headline */}
            <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(52px, 7.5vw, 96px)", fontWeight: 400, lineHeight: 1.0, color: C.ivory, marginBottom: 0, letterSpacing: "0.01em" }}>
              <div style={{ overflow: "hidden", marginBottom: 2 }}>
                <span style={word(0.4)}>Building</span>
              </div>
              <div style={{ overflow: "hidden", marginBottom: 2 }}>
                <span style={word(0.55)}>Businesses</span>
              </div>
              <div style={{ overflow: "hidden" }}>
                <em style={{ ...word(0.7), color: C.gold, fontStyle: "italic" }}>That Last.</em>
              </div>
            </h1>

            {/* Gold accent line */}
            <div style={{
              height: 1, background: `linear-gradient(90deg, ${C.gold}90, transparent)`,
              width: heroIn ? 280 : 0,
              transition: "width 1.6s cubic-bezier(0.25,0.46,0.45,0.94) 1s",
              marginTop: 52, marginBottom: 44,
            }} />

            {/* Subhead */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 300, color: C.platinum, maxWidth: 520, lineHeight: 1.9, letterSpacing: "0.02em", marginBottom: 56, ...appear(1.2) }}>
              Zolara Holdings is a Ghanaian strategic investment and operating company — focused on developing, owning, and scaling premium businesses across Africa.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", ...appear(1.5) }}>
              <a href="#portfolio" className="btn-gold">
                View Portfolio
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none"><path d="M0 4H14M10 1l4 3-4 3" stroke="#0B0B0D" strokeWidth="1.2"/></svg>
              </a>
              <a href="#contact" className="btn-outline">Investment Inquiries</a>
            </div>
          </div>
        </div>

        {/* Bottom stat bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          borderTop: "1px solid #1E1E24",
          display: "flex", justifyContent: "center",
          ...appear(1.9),
        }}>
          {[["5","Portfolio Companies"],["GHS 700K+","Deployed Capital"],["2025","Year Founded"],["Ghana","Headquarters"]].map(([n,l], i) => (
            <div key={l} style={{
              padding: "20px 52px", textAlign: "center",
              borderRight: i < 3 ? "1px solid #1E1E24" : "none",
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, color: C.gold }}>{n}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#4A4A52", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 5 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ════ ABOUT ════ */}
      <section id="about" className="sec-pad" style={{ padding: "140px 56px", background: C.bg, position: "relative", overflow: "hidden" }}>
        {/* Watermark */}
        <div style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", fontFamily: "'Playfair Display', serif", fontSize: 280, fontWeight: 700, color: "#FFFFFF02", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>ZH</div>

        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }} className="grid-2">
          <div>
            <div className="sr"><Label>Who We Are</Label></div>
            <GoldRule />
            <h2 className="sr d1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 3.5vw, 52px)", fontWeight: 400, lineHeight: 1.1, color: C.ivory, marginBottom: 36, letterSpacing: "0.01em" }}>
              About Zolara<br /><em style={{ color: C.gold }}>Holdings</em>
            </h2>
            <p className="sr d2" style={{ fontSize: 15, fontWeight: 300, color: C.platinum, lineHeight: 1.95, marginBottom: 22, letterSpacing: "0.02em" }}>
              We are a Ghanaian holding company focused on developing, owning, and managing businesses across beauty, wellness, real estate, logistics, and hospitality sectors.
            </p>
            <p className="sr d3" style={{ fontSize: 15, fontWeight: 300, color: C.platinum, lineHeight: 1.95, marginBottom: 52, letterSpacing: "0.02em" }}>
              Our role is to provide leadership, capital, and strategy — helping each business grow with strength and stability for the long term.
            </p>
            <div className="sr d4">
              <a href="#portfolio" className="btn-outline">Explore Our Portfolio</a>
            </div>
          </div>

          {/* Mission / Vision */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { label: "Our Mission", title: "Strategic Growth", body: "To grow high-value businesses through disciplined investment, structured capital allocation, and hands-on operational leadership across Ghana and Africa." },
              { label: "Our Vision", title: "African Leadership", body: "To become one of Africa's premier holding companies — known for excellence, strong brands, and the long-term generational wealth we create." },
              { label: "Our Philosophy", title: "Structure First", body: "We centralise finance, branding, and operations across all subsidiaries — reducing risk, enabling scale, and protecting long-term asset value." },
            ].map((item, i) => (
              <div key={item.label} className={`sr d${i+1}`} style={{ background: C.bgSecondary, border: "1px solid #2A2A30", padding: "32px 36px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${C.gold}, transparent)` }} />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: C.gold, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 10 }}>{item.label}</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, color: C.ivory, marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: "#8A8A94", lineHeight: 1.85 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ════ PORTFOLIO ════ */}
      <section id="portfolio" className="sec-pad" style={{ padding: "140px 56px", background: C.bgSecondary }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 80 }}>
            <div className="sr"><Label>Our Portfolio</Label></div>
            <GoldRule />
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
              <h2 className="sr d1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 4vw, 54px)", fontWeight: 400, color: C.ivory, lineHeight: 1.1 }}>
                Subsidiaries &<br /><em style={{ color: C.gold }}>Divisions</em>
              </h2>
              <p className="sr d2" style={{ fontSize: 14, fontWeight: 300, color: "#6A6A74", maxWidth: 360, lineHeight: 1.9 }}>
                Each business operates with full autonomy, backed by shared capital, brand governance, and operational oversight from Zolara Holdings.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }} className="grid-3">
            {[
              { name: "Zolara Beauty Studio", desc: "Premium salon and beauty services. First operational subsidiary. Established 2025 in Tamale, Ghana.", tag: "Operational", url: "https://zolarasalon.com", icon: "◆" },
              { name: "Zolara Properties", desc: "Real estate investment, property development, and asset management across Northern Ghana.", tag: "Upcoming", icon: "⬡" },
              { name: "Zolara Logistics", desc: "Supply chain coordination, distribution planning, and last-mile delivery infrastructure.", tag: "Upcoming", icon: "◈" },
              { name: "Zolara Pharma & Wellness", desc: "Pharmaceutical retail, health products, and community wellness services.", tag: "Upcoming", icon: "✚" },
              { name: "Zolara Hospitality", desc: "Premium accommodation, hospitality development, and guest experience management.", tag: "Future", icon: "⌂" },
            ].map((s, i) => (
              <div key={s.name} className={`port-card sr d${Math.min(i+1,6)}`}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                  <span style={{ fontSize: 18, color: C.gold, opacity: 0.7 }}>{s.icon}</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 8, letterSpacing: "0.25em",
                    textTransform: "uppercase", padding: "4px 12px",
                    background: s.tag === "Operational" ? `${C.gold}18` : "#2A2A30",
                    color: s.tag === "Operational" ? C.gold : "#5A5A64",
                    border: `1px solid ${s.tag === "Operational" ? C.gold + "40" : "#3A3A40"}`,
                  }}>{s.tag}</span>
                </div>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, color: C.ivory, marginBottom: 12, lineHeight: 1.25, transition: "color 0.3s" }}
                      onMouseEnter={e => e.target.style.color = C.gold}
                      onMouseLeave={e => e.target.style.color = C.ivory}
                    >{s.name}</h4>
                  </a>
                ) : (
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, color: C.ivory, marginBottom: 12, lineHeight: 1.25 }}>{s.name}</h4>
                )}
                <p style={{ fontSize: 13, fontWeight: 300, color: "#6A6A74", lineHeight: 1.85, letterSpacing: "0.02em" }}>{s.desc}</p>
              </div>
            ))}

            {/* Philosophy card */}
            <div className={`port-card sr d6`} style={{ background: `${C.gold}08`, borderColor: `${C.gold}20`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "44px 32px" }}>
              <img src="/zh-logo.jpeg" alt="Zolara Holdings" style={{ width: 48, height: 48, objectFit: "contain", marginBottom: 24, opacity: 0.5 }} />
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontStyle: "italic", color: "#6A6A74", lineHeight: 1.8 }}>
                "We build businesses<br />that last generations."
              </p>
              <div style={{ width: 32, height: 1, background: C.gold, opacity: 0.3, margin: "24px auto 0" }} />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ════ VALUES ════ */}
      <section className="sec-pad" style={{ padding: "140px 56px", background: C.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <div className="sr"><Label center>What Guides Us</Label></div>
            <GoldRule center />
            <h2 className="sr d1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px,4vw,52px)", fontWeight: 400, color: C.ivory }}>
              Core <em style={{ color: C.gold }}>Values</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, border: "1px solid #1E1E24" }} className="grid-4">
            {[
              { n: "01", title: "Integrity", desc: "Honesty and transparency in every decision, relationship, and transaction." },
              { n: "02", title: "Focus", desc: "Disciplined execution. We pursue fewer things with far greater depth." },
              { n: "03", title: "Leadership", desc: "We lead with clarity, long-term vision, and a deep responsibility to build." },
              { n: "04", title: "Excellence", desc: "The highest standard in every business we operate, brand we build, and person we develop." },
            ].map((v, i) => (
              <div key={v.title} className={`val-item sr d${i+1}`} style={{ borderLeft: i > 0 ? "1px solid #1E1E24" : "none" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 400, color: "#1E1E24", lineHeight: 1, marginBottom: 28 }}>{v.n}</div>
                <div style={{ width: 24, height: 1, background: C.gold, marginBottom: 20, opacity: 0.6 }} />
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 500, color: C.ivory, marginBottom: 14 }}>{v.title}</h4>
                <p style={{ fontSize: 13, fontWeight: 300, color: "#6A6A74", lineHeight: 1.85 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ════ LEADERSHIP ════ */}
      <section id="leadership" className="sec-pad" style={{ padding: "140px 56px", background: C.bgSecondary }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 80 }}>
            <div className="sr"><Label>Leadership</Label></div>
            <GoldRule />
            <h2 className="sr d1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px,4vw,52px)", fontWeight: 400, color: C.ivory }}>
              Executive <em style={{ color: C.gold }}>Director</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }} className="grid-2">
            {/* Portrait placeholder */}
            <div className="sr-fade" style={{ position: "relative" }}>
              <div style={{ background: "#111115", border: "1px solid #1E1E24", aspectRatio: "4/5", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                {/* Scanline effect */}
                <div style={{ position: "absolute", top: "-100%", left: 0, right: 0, height: "30%", background: "linear-gradient(to bottom, transparent, #C6A15B04, transparent)", animation: "scanline 8s linear infinite", pointerEvents: "none" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, border: `1px solid ${C.gold}40`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", animation: "pulse 3s ease-in-out infinite" }}>
                  <img src="/zh-logo.jpeg" alt="ZH" style={{ width: 48, height: 48, objectFit: "contain" }} />
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#3A3A44", letterSpacing: "0.35em", textTransform: "uppercase" }}>Portrait</p>
                </div>
                {/* Corner marks */}
                {[[{top:0,left:0},"0,0 16,0 0,16"],[{top:0,right:0},"20,0 4,0 20,16"],[{bottom:0,left:0},"0,20 16,20 0,4"],[{bottom:0,right:0},"20,20 4,20 20,4"]].map(([pos,pts],idx) => (
                  <svg key={idx} width="20" height="20" viewBox="0 0 20 20" style={{ position:"absolute", ...pos, opacity:0.6 }}>
                    <polyline points={pts} fill="none" stroke="#C6A15B" strokeWidth="1"/>
                  </svg>
                ))}
              </div>
              <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, ${C.gold}80, transparent)` }} />
            </div>

            {/* Bio */}
            <div>
              <p className="sr" style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: C.gold, letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: 20 }}>Founder</p>
              <h3 className="sr d1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 400, color: C.ivory, marginBottom: 8, lineHeight: 1.1 }}>Haruna<br />Salifu</h3>
              <p className="sr d2" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.platinum, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 36 }}>Executive Director</p>
              <div className="sr d2" style={{ width: 40, height: 1, background: C.gold, marginBottom: 36, opacity: 0.6 }} />
              <p className="sr d3" style={{ fontSize: 15, fontWeight: 300, color: "#8A8A94", lineHeight: 1.95, marginBottom: 20, letterSpacing: "0.02em" }}>
                Haruna Salifu is the founder and Executive Director of Zolara Holdings Ltd. His strategic leadership and vision drive Zolara's mission to build high-value companies across beauty, real estate, wellness, and logistics in Ghana.
              </p>
              <p className="sr d4" style={{ fontSize: 15, fontWeight: 300, color: "#8A8A94", lineHeight: 1.95, marginBottom: 48, letterSpacing: "0.02em" }}>
                With a focus on discipline and structured investment, he leads the company with long-term planning, operational excellence, and a deep commitment to building businesses that endure.
              </p>
              <div className="sr d5" style={{ background: C.bg, border: `1px solid #1E1E24`, padding: "20px 28px", borderLeft: `2px solid ${C.gold}` }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontStyle: "italic", color: "#5A5A64", lineHeight: 1.7 }}>
                  "The goal is not to open companies. It's to build institutions."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ════ TIMELINE ════ */}
      <section className="sec-pad" style={{ padding: "140px 56px", background: C.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }} className="grid-2">
          <div>
            <div className="sr"><Label>Our Journey</Label></div>
            <GoldRule />
            <h2 className="sr d1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px,4vw,52px)", fontWeight: 400, color: C.ivory, lineHeight: 1.15 }}>
              Strategic<br /><em style={{ color: C.gold }}>Timeline</em>
            </h2>
          </div>
          <div style={{ paddingTop: 12 }}>
            {[
              { year: "2025", title: "Group Formation", desc: "Establishment of Zolara Holdings Ltd. Successful launch of Zolara Beauty Studio in Tamale, Ghana. Total investment exceeds GHS 700,000.", active: true },
              { year: "2026", title: "Real Estate", desc: "Launch of Zolara Properties — real estate development and property management across Northern Ghana and key urban markets." },
              { year: "2027", title: "Pharma & Wellness", desc: "Entry into pharmaceutical retail and wellness — expanding Zolara's health and community footprint." },
            ].map((t, i) => (
              <div key={t.year} className={`sr d${i+1}`} style={{ display: "flex", gap: 28, marginBottom: i < 2 ? 48 : 0, paddingBottom: i < 2 ? 48 : 0, borderBottom: i < 2 ? "1px solid #1E1E24" : "none" }}>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: t.active ? C.gold : "transparent", border: `1px solid ${t.active ? C.gold : "#3A3A44"}`, boxShadow: t.active ? `0 0 16px ${C.gold}50` : "none", marginTop: 6 }} />
                  {i < 2 && <div style={{ width: 1, flex: 1, background: "linear-gradient(to bottom, #2A2A30, transparent)" }} />}
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: C.gold, letterSpacing: "0.35em", marginBottom: 8 }}>{t.year}</p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 500, color: C.ivory, marginBottom: 12 }}>{t.title}</h3>
                  <p style={{ fontSize: 13, fontWeight: 300, color: "#6A6A74", lineHeight: 1.85 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ════ CONTACT ════ */}
      <section id="contact" className="sec-pad" style={{ padding: "140px 56px", background: C.bgSecondary, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "40%", right: -100, width: 600, height: 600, background: `radial-gradient(ellipse, ${C.gold}04 0%, transparent 65%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }} className="grid-2">
          {/* Left */}
          <div>
            <div className="sr"><Label>Get In Touch</Label></div>
            <GoldRule />
            <h2 className="sr d1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px,4vw,52px)", fontWeight: 400, color: C.ivory, lineHeight: 1.15, marginBottom: 28 }}>
              Investment<br /><em style={{ color: C.gold }}>Inquiries</em>
            </h2>
            <p className="sr d2" style={{ fontSize: 15, fontWeight: 300, color: "#6A6A74", lineHeight: 1.9, marginBottom: 56, letterSpacing: "0.02em" }}>
              Whether you're an investor, a business partner, or an individual who shares our vision for building lasting enterprises across Africa — we'd like to hear from you.
            </p>

            <div className="sr d3" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { icon: "✉", label: "Email", val: "info@zolaraholdings.com", href: "mailto:info@zolaraholdings.com" },
                { icon: "✆", label: "Phone", val: "+233 594 922 679", href: "tel:+233594922679" },
                { icon: "✆", label: "Phone", val: "+233 249 978 750", href: "tel:+233249978750" },
                { icon: "◎", label: "Location", val: "Tamale, Northern Region, Ghana", href: null },
              ].map(c => (
                <div key={c.val} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <span style={{ color: C.gold, fontSize: 13, width: 20, marginTop: 2 }}>{c.icon}</span>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#4A4A54", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 }}>{c.label}</p>
                    {c.href ? (
                      <a href={c.href} style={{ fontSize: 14, fontWeight: 300, color: C.platinum, textDecoration: "none", letterSpacing: "0.03em", transition: "color 0.3s" }}
                        onMouseEnter={e => e.target.style.color = C.gold}
                        onMouseLeave={e => e.target.style.color = C.platinum}
                      >{c.val}</a>
                    ) : (
                      <p style={{ fontSize: 14, fontWeight: 300, color: C.platinum, letterSpacing: "0.03em" }}>{c.val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="sr d2">
            {sent ? (
              <div style={{ background: C.bg, border: `1px solid ${C.gold}30`, padding: "56px 44px", textAlign: "center" }}>
                <div style={{ fontSize: 28, color: C.gold, marginBottom: 20 }}>✓</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: C.ivory, marginBottom: 12 }}>Message Received</p>
                <p style={{ fontSize: 13, color: "#6A6A74", fontWeight: 300 }}>We'll be in touch shortly.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <input className="form-field" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input className="form-field" placeholder="Email Address" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <textarea className="form-field" placeholder="Your Message" rows={6} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ resize: "none" }} />
                <button className="btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 2 }} onClick={() => { if (formData.name && formData.email) setSent(true); }}>
                  Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Divider />

      {/* ════ FOOTER ════ */}
      <footer style={{ background: "#08080A", padding: "40px 56px", borderTop: "1px solid #141418" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src="/zh-logo.jpeg" alt="Zolara Holdings" style={{ width: 28, height: 28, objectFit: "contain", opacity: 0.5 }} />
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 12, color: "#3A3A44", letterSpacing: "0.3em" }}>ZOLARA HOLDINGS LTD</span>
            </div>
            <nav style={{ display: "flex", gap: 32 }}>
              {[["#about","About"],["#portfolio","Portfolio"],["#leadership","Leadership"],["#contact","Contact"]].map(([h,l]) => (
                <a key={h} href={h} style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#3A3A44", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = C.gold}
                  onMouseLeave={e => e.target.style.color = "#3A3A44"}
                >{l}</a>
              ))}
            </nav>
          </div>
          <div style={{ borderTop: "1px solid #141418", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#2A2A32", letterSpacing: "0.12em" }}>© 2026 Zolara Holdings Ltd. All Rights Reserved.</p>
            <a href="/privacy-policy" style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#2A2A32", letterSpacing: "0.12em", textDecoration: "none" }}>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
