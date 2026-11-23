import { SiteLayout } from "./components/SiteLayout";
import { type PagePath } from "./content";
import Home from "./pages/Home";
import { About, BeautyStudio, Businesses, Contact, Leadership, NotFound, Privacy } from "./pages/CompanyPages";

const routes = {
  "/": Home,
  "/about/": About,
  "/businesses/": Businesses,
  "/businesses/beauty-studio/": BeautyStudio,
  "/leadership/": Leadership,
  "/contact/": Contact,
  "/privacy-policy/": Privacy,
} satisfies Record<PagePath, () => React.JSX.Element>;

export default function App({ path }: { path: PagePath | null }) {
  const Page = path === null ? NotFound : routes[path];
  return <SiteLayout path={path}><Page /></SiteLayout>;
}
