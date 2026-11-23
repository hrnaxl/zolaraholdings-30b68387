import { type ReactNode } from "react";
import { company, email, navigation, type PagePath } from "../content";

function Brand() {
  return (
    <a className="brand" href="/">
      <img src="/brand-zh.webp" width="44" height="44" alt="" />
      <span className="brand-type">Zolara{" "}<span>Holdings Ltd</span></span>
    </a>
  );
}

function NavLinks({ path }: { path: PagePath | null }) {
  return navigation.map(item => (
    <a
      key={item.path}
      href={item.path}
      aria-current={path === item.path ? "page" : undefined}
      className={path?.startsWith(item.path) ? "current" : undefined}
    >
      {item.label}
    </a>
  ));
}

function Header({ path }: { path: PagePath | null }) {

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation"><NavLinks path={path} /></nav>
        <details className="mobile-menu">
          <summary>Menu <span aria-hidden="true" className="menu-icon" /></summary>
          <nav aria-label="Main navigation"><NavLinks path={path} /></nav>
        </details>
      </div>
    </header>
  );
}

export function SiteLayout({ path, children }: { path: PagePath | null; children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header path={path} />
      <main id="main" tabIndex={-1}>{children}</main>
      <footer className="site-footer">
        <div className="shell">
          <div className="footer-main">
            <div className="footer-identity"><Brand /><p>Tamale, Northern Region, Ghana</p></div>
            <nav aria-label="Footer"><NavLinks path={path} /></nav>
            <a className="footer-email" href={`mailto:${email}`}>{email}</a>
          </div>
          <div className="footer-bottom">
            <span>© {company}</span>
            <a href="/privacy-policy/">Privacy policy</a>
          </div>
        </div>
      </footer>
    </>
  );
}
