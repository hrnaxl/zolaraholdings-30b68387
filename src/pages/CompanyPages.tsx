import { ArchitecturePhoto, Approach, Closing, PageIntro, StudioPhoto, TextLink } from "../components/Editorial";
import { email, founder, plannedVentures, salonUrl } from "../content";

export function About() {
  return (
    <>
      <PageIntro label="About Zolara" title="Ownership over the long term.">
        <p>Zolara Holdings Ltd is a Ghanaian holding company based in Tamale. We develop, own and operate businesses with a long-term view.</p>
      </PageIntro>
      <section className="shell origin-story">
        <div><p className="eyebrow">Our beginnings</p><h2>From Tamale.</h2><p>We began in Tamale, where running a customer-facing business gave us firsthand experience setting service standards and building a team in Northern Ghana.</p><TextLink href="/businesses/">Explore the portfolio</TextLink></div>
        <ArchitecturePhoto subject="airport" />
      </section>
      <Approach />
      <section className="shell direction-grid">
        <div><p className="eyebrow">Group oversight</p><h2>How decisions are made.</h2></div>
        <div><p>At group level, our priorities are how capital is allocated, how operating performance is reviewed and when a business is ready to grow.</p><p>We intend to build in Ghana first. Over time, we will consider opportunities elsewhere in Africa where demand and our ability to operate justify expansion.</p><TextLink href="/leadership/">Meet our founder</TextLink></div>
      </section>
    </>
  );
}

export function Businesses() {
  return (
    <>
      <PageIntro label="Our businesses" title="The Zolara portfolio.">
        <p>Our portfolio reflects what we operate today and the sectors we are exploring for future growth.</p>
      </PageIntro>
      <section className="ventures">
        <div className="shell ventures-grid">
          <div><p className="eyebrow">Future ventures</p><h2>Areas of interest.</h2><p>These are areas for potential development. We have no public launch dates for them.</p></div>
          <dl className="approach-list">{plannedVentures.map(venture => <div key={venture.name}><dt>{venture.name}</dt><dd>{venture.description}</dd></div>)}</dl>
        </div>
      </section>
      <section className="shell operating-business" aria-labelledby="operating-title">
        <h2 id="operating-title">Current operations</h2>
        <div className="operating-business-row">
          <img className="operating-business-thumb" src="/images/beauty-storefront-thumb.webp" width="72" height="72" alt="" loading="lazy" decoding="async" />
          <div>
            <h3>Zolara Beauty Studio</h3>
            <p>Beauty and personal care · Tamale, Ghana</p>
          </div>
          <TextLink href="/businesses/beauty-studio/">View business</TextLink>
        </div>
      </section>
      <Closing title="Interested in working together?">Tell us about your business and where you think we could work together.</Closing>
    </>
  );
}

export function BeautyStudio() {
  return (
    <>
      <PageIntro label="Operating business · Tamale" title="Zolara Beauty Studio">
        <p>A beauty and personal care studio serving clients in Sakasaka, Tamale.</p>
        <a className="button" href={salonUrl}>Visit the studio website</a>
      </PageIntro>
      <section className="shell studio-story" aria-labelledby="studio-title">
        <StudioPhoto />
        <div>
          <p className="eyebrow">At the studio</p><h2 id="studio-title">Beauty care by appointment.</h2>
          <p>The studio offers braiding, nail care and other beauty services. Visit its booking site for the current service menu, prices and appointments.</p>
          <p>Sakasaka, opposite CalBank<br />Tamale, Northern Region, Ghana</p>
          <TextLink href={salonUrl}>View services and book</TextLink>
          <TextLink href="/businesses/">Back to our businesses</TextLink>
        </div>
        <img className="studio-detail" src="/images/beauty-craft.webp" width="507" height="900" loading="lazy" decoding="async" alt="Close view of intricate braiding by Zolara Beauty Studio" />
      </section>
    </>
  );
}

export function Leadership() {
  return (
    <PageIntro label="Leadership" title={founder.name}>
      <p className="role">{founder.role}</p>
      <p className="founder-introduction">{founder.introduction}</p>
      <TextLink href="/about/">About the group</TextLink>
    </PageIntro>
  );
}

export function Contact() {
  return (
    <>
      <PageIntro label="Contact" title="Talk to Zolara.">
        <p>For group inquiries, partnership proposals or opportunities to work together, reach us directly by email or phone.</p>
      </PageIntro>
      <section className="shell contact-grid" aria-labelledby="inquiries">
        <div className="contact-panel">
          <p className="eyebrow">Group inquiries</p>
          <h2 id="inquiries">Get in touch.</h2>
          <p>Include your name, organisation and a brief description of what you would like to discuss.</p>
          <a className="button button-light" href={`mailto:${email}?subject=Zolara%20Holdings%20inquiry`}>Open your email app</a>
        </div>
        <address className="contact-details">
          <div><h3>Email</h3><a href={`mailto:${email}`}>{email}</a></div>
          <div><h3>Phone</h3><a href="tel:+233594922679">+233 59 492 2679</a><a href="tel:+233249978750">+233 24 997 8750</a></div>
          <div><h3>Location</h3><p>Tamale, Northern Region, Ghana</p></div>
          <div><h3>Salon appointments</h3><TextLink href={salonUrl}>Visit Zolara Beauty Studio</TextLink></div>
        </address>
      </section>
    </>
  );
}

export function Privacy() {
  return (
    <>
      <PageIntro label="Website information" title="Privacy policy.">
        <p>How Zolara Holdings Ltd handles information from website visits and inquiries.</p>
      </PageIntro>
      <div className="shell privacy-copy">
        <section><h2>Website visits</h2><p>This website does not ask you to create an account or submit a web form. The hosting provider may process technical information such as your IP address and the pages requested to deliver and protect the site.</p></section>
        <section><h2>Email and phone inquiries</h2><p>If you contact us, we receive the contact information and message you choose to share. We use that information to respond and follow up on your inquiry. Please avoid sending sensitive personal information in your initial message.</p></section>
        <section><h2>Other websites</h2><p>Links to other websites, including the Beauty Studio booking site, lead to services with their own privacy practices.</p></section>
        <section><h2>Privacy questions and requests</h2><p>Contact <a href={`mailto:${email}`}>{email}</a> with questions or to ask about accessing or correcting your personal information. Ghana’s <a href="https://dpc.gov.gh/">Data Protection Commission</a> provides information about data protection rights.</p></section>
      </div>
    </>
  );
}

export function NotFound() {
  return (
    <PageIntro label="Page unavailable" title="We couldn’t find that page.">
      <p>Check the address or return to the homepage.</p><a className="button" href="/">Back to home</a>
    </PageIntro>
  );
}
