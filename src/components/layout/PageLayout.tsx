import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FooterCTA, { FooterCTAProps } from "../common/FooterCTA";

interface PageLayoutProps {
  children: ReactNode;
  breadcrumbs?: unknown;
  hideCTA?: boolean;
  onOpenDemo?: () => void;
  footerCtaProps?: Partial<FooterCTAProps>;
}

export function PageLayout({
  children,
  hideCTA = false,
  footerCtaProps,
}: PageLayoutProps) {
  return (
    <div className="app-shell inner-page-shell">
      <Navbar />

      <main className="inner-main-content">{children}</main>

      {!hideCTA && <FooterCTA {...footerCtaProps} />}

      <Footer />
    </div>
  );
}

export default PageLayout;
