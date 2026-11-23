import { ArchitecturePhoto, Approach, Closing, TextLink } from "../components/Editorial";
import { founder } from "../content";

export default function Home() {
  return (
    <>
      <section className="hero shell" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">A Ghanaian holding company</p>
          <h1 id="home-title">We build<br />businesses <em>for the long term.</em></h1>
          <p className="hero-lede">From our base in Tamale, we develop, own and operate businesses in Ghana.</p>
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

      <Approach dark />

      <section id="portfolio" className="shell direction-grid" aria-labelledby="portfolio-title">
        <div>
          <p className="eyebrow">Our businesses</p>
          <h2 id="portfolio-title">Where we’re looking.</h2>
        </div>
        <div>
          <p>Alongside our current operations, we are exploring opportunities in property, logistics, pharma and wellness, and hospitality.</p>
          <TextLink href="/businesses/">Explore the portfolio</TextLink>
        </div>
      </section>

      <section id="leadership" className="leader-home shell" aria-labelledby="leader-title">
        <div>
          <p className="eyebrow">Leadership</p>
          <h2 id="leader-title">{founder.name}</h2>
          <p className="role">{founder.role}</p>
        </div>
        <div className="leader-copy">
          <p>{founder.introduction}</p>
          <TextLink href="/leadership/">Meet our founder</TextLink>
        </div>
      </section>

      <Closing title="Good partnerships begin with a conversation.">We welcome inquiries from people and organisations interested in building businesses in Ghana.</Closing>
    </>
  );
}
