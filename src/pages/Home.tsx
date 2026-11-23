import { ArchitecturePhoto, Approach, Closing, FounderPhoto, StudioPhoto, TextLink } from "../components/Editorial";
import { founder } from "../content";

export default function Home() {
  return (
    <>
      <section className="hero shell" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">A Ghanaian holding company</p>
          <h1 id="home-title">We build<br />businesses <em>for the long term.</em></h1>
          <p className="hero-lede">From our base in Tamale, we develop, own and operate businesses. Zolara Beauty Studio is where we began.</p>
          <div className="hero-actions">
            <a className="button" href="/businesses/">Explore our businesses</a>
            <TextLink href="/about/">About Zolara</TextLink>
          </div>
        </div>
        <ArchitecturePhoto subject="theatre" eager />
      </section>

      <section id="about" className="intro-band" aria-labelledby="intro-title">
        <div className="shell intro-grid">
          <p className="eyebrow">What we do</p>
          <h2 id="intro-title">We commit capital and stay involved in how our businesses are run.</h2>
          <p>From setting operating standards to deciding when to expand, we take responsibility for the decisions that shape a business over time.</p>
        </div>
      </section>

      <section id="portfolio" className="portfolio-home shell" aria-labelledby="portfolio-title">
        <div className="section-heading">
          <p className="eyebrow">Our businesses</p>
          <h2 id="portfolio-title">In operation today.</h2>
        </div>
        <div className="studio-feature">
          <StudioPhoto />
          <div>
            <p className="status">Operating business · Tamale</p>
            <h3>Zolara Beauty Studio</h3>
            <p>A beauty studio in Sakasaka, Tamale, offering braiding, nail care and other beauty services by appointment.</p>
            <TextLink href="/businesses/beauty-studio/">Meet Beauty Studio</TextLink>
            <TextLink href="https://www.zolarasalon.com/">Visit the studio website</TextLink>
          </div>
        </div>
        <div className="portfolio-foot"><p>We are also exploring opportunities in property, logistics, pharma and wellness, and hospitality.</p><TextLink href="/businesses/">View our business interests</TextLink></div>
      </section>

      <Approach dark />

      <section id="leadership" className="leader-home shell" aria-labelledby="leader-title">
        <div className="leader-frame"><FounderPhoto /></div>
        <div className="leader-copy">
          <p className="eyebrow">Leadership</p>
          <h2 id="leader-title">{founder.name}</h2>
          <p className="role">{founder.role}</p>
          <p>Haruna founded Zolara Holdings in Ghana. He focuses on how the group commits capital, supports its businesses and decides where to grow.</p>
          <TextLink href="/leadership/">Meet our founder</TextLink>
        </div>
      </section>

      <Closing title="Good partnerships begin with a conversation.">We welcome inquiries from people and organisations interested in building businesses in Ghana.</Closing>
    </>
  );
}
