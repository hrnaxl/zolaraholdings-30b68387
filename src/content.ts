export const origin = "https://www.zolaraholdings.com";
export const company = "Zolara Holdings Ltd";
export const email = "info@zolaraholdings.com";
export const salonUrl = "https://www.zolarasalon.com/";
export const founder = {
  name: "Haruna Salifu",
  role: "Founder & Executive Director",
  introduction: "Haruna Salifu founded Zolara Holdings to build and operate businesses in Ghana for the long term. He guides where the group invests, how it supports its businesses and when it is ready to expand.",
};

export const navigation = [
  { label: "About", path: "/about/" },
  { label: "Businesses", path: "/businesses/" },
  { label: "Leadership", path: "/leadership/" },
  { label: "Contact", path: "/contact/" },
];

export const pages = {
  "/": {
    title: "Zolara Holdings Ltd | Long-term business ownership in Ghana",
    description: "Zolara Holdings is a Ghanaian holding company based in Tamale. We build, own and operate businesses for the long term.",
  },
  "/about/": {
    title: "About Zolara | Zolara Holdings Ltd",
    description: "The purpose and operating philosophy of Zolara Holdings, a Ghanaian holding company with a long-term approach to business ownership.",
  },
  "/businesses/": {
    title: "Our Businesses | Zolara Holdings Ltd",
    description: "Explore Zolara Holdings’ current operations and the sectors we are considering for future growth.",
  },
  "/businesses/beauty-studio/": {
    title: "Zolara Beauty Studio | Zolara Holdings Ltd",
    description: "Discover Zolara Beauty Studio, an operating beauty business in Sakasaka, Tamale, Ghana.",
  },
  "/leadership/": {
    title: "Leadership | Zolara Holdings Ltd",
    description: "Meet Haruna Salifu, founder and executive director of Zolara Holdings Ltd.",
  },
  "/contact/": {
    title: "Contact | Zolara Holdings Ltd",
    description: "Contact Zolara Holdings in Tamale, Ghana, for business and partnership inquiries.",
  },
  "/privacy-policy/": {
    title: "Privacy Policy | Zolara Holdings Ltd",
    description: "Learn how Zolara Holdings handles information from website visits and email inquiries.",
  },
} as const;

export type PagePath = keyof typeof pages;

export function getPagePath(pathname: string): PagePath | null {
  const path = pathname.endsWith("/") ? pathname : pathname + "/";
  return Object.hasOwnProperty.call(pages, path) ? (path as PagePath) : null;
}

export const approach = [
  { title: "Capital with a purpose", text: "We look closely at what a business needs to serve customers well and where investment can make the greatest difference." },
  { title: "Hands-on ownership", text: "We pay attention to how a business runs day to day, from service quality and staffing to costs and cash flow." },
  { title: "Growth at the right pace", text: "We look for evidence of demand and the capacity to deliver consistently before committing to expansion." },
];

export const plannedVentures = [
  { name: "Zolara Properties", description: "Real estate development and property management." },
  { name: "Zolara Logistics", description: "Transport, distribution and delivery services." },
  { name: "Zolara Pharma & Wellness", description: "Pharmaceutical retail and wellness services." },
  { name: "Zolara Hospitality", description: "Hospitality development and operations." },
];
