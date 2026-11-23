import type { ReactNode } from "react";
import { approach, architecture } from "../content";

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="text-link" href={href}>{children}</a>;
}

export function PageIntro({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <header className="page-intro shell">
      <div className="page-intro-heading"><p className="eyebrow">{label}</p><h1>{title}</h1></div>
      <div className="page-intro-copy">{children}</div>
    </header>
  );
}

export function Closing({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section id="contact" className="closing" aria-labelledby="closing-title">
      <div className="shell closing-inner">
        <h2 id="closing-title">{title}</h2>
        <div><p>{children}</p><a className="button button-light" href="/contact/">Contact Zolara</a></div>
      </div>
    </section>
  );
}

export function Approach({ dark = false }: { dark?: boolean }) {
  return (
    <section className={dark ? "approach dark" : "approach approach-light"} aria-labelledby="approach-title">
      <div className="shell approach-grid">
        <div>
          <p className="eyebrow">Operating philosophy</p>
          <h2 id="approach-title">What ownership asks of us.</h2>
        </div>
        <dl className="approach-list">
          {approach.map(item => (
            <div key={item.title}><dt>{item.title}</dt><dd>{item.text}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function ArchitecturePhoto({ subject, eager = false }: {
  subject: keyof typeof architecture;
  eager?: boolean;
}) {
  const photo = architecture[subject];

  return (
    <figure className="architecture">
      <img
        src={`/images/${photo.file}-1550.webp`}
        srcSet={`/images/${photo.file}-760.webp 760w, /images/${photo.file}-1550.webp 1550w`}
        sizes="(max-width: 760px) 92vw, (max-width: 1440px) 49vw, 680px"
        width="1550"
        height="1033"
        {...(eager ? { fetchpriority: "high" } : {})}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        alt={photo.alt}
      />
      <figcaption>{photo.name}</figcaption>
    </figure>
  );
}

export function StudioPhoto() {
  return (
    <img
      className="studio-image"
      src="/images/beauty-storefront-850.webp"
      width="850"
      height="1150"
      decoding="async"
      alt="Illuminated Zolara Beauty Studio storefront with a view into the salon"
    />
  );
}
