import { renderToString } from "react-dom/server";
import App from "./App";
import { company, founder, origin, pages, type PagePath } from "./content";

export { origin, pages };

export function render(path: PagePath | null) {
  return renderToString(<App path={path} />);
}

export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": origin + "/#organization",
  name: company,
  url: origin + "/",
  logo: origin + "/brand-mark.svg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tamale",
    addressRegion: "Northern Region",
    addressCountry: "GH",
  },
  founder: {
    "@type": "Person",
    name: founder.name,
    url: origin + "/leadership/",
  },
};
