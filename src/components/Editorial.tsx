import type { ReactNode } from "react";
import { approach, founder } from "../content";

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

const architecture = {
  theatre: {
    file: "theatre",
    name: "National Theatre, Accra, Ghana",
    alt: "Angular concrete facade of the National Theatre in Accra",
    source: "https://commons.wikimedia.org/wiki/File:National_Theatre_-_Ghana.jpg",
    credit: "Fquasie",
    edits: "Cropped and colour adjusted",
  },
  airport: {
    file: "accra",
    name: "Airport City, Accra, Ghana",
    alt: "Commercial buildings at Airport City in Accra",
    source: "https://commons.wikimedia.org/wiki/File:Accra_Skyline_-_Ghana.jpg",
    credit: "Synth85",
    edits: "Cropped and colour adjusted",
  },
} as const;

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
      <figcaption>
        <span>{photo.name}</span>
        <span><a href={photo.source}>{photo.credit}</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> · {photo.edits}</span>
      </figcaption>
    </figure>
  );
}

export function StudioPhoto({ eager = false }: { eager?: boolean }) {
  return <img className="studio-image" src="/images/beauty-studio.webp" width="630" height="1050" loading={eager ? "eager" : "lazy"} {...(eager ? { fetchpriority: "high" } : {})} decoding="async" alt="A Zolara Beauty Studio client with long braids" />;
}

export function FounderPhoto({ eager = false }: { eager?: boolean }) {
  return <img className="founder-image" src="/images/haruna-salifu.webp" width="551" height="720" loading={eager ? "eager" : "lazy"} {...(eager ? { fetchpriority: "high" } : {})} decoding="async" alt={founder.name} />;
}
