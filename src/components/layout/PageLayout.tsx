import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FooterCTA from "../common/FooterCTA";

interface PageLayoutProps {
  children: ReactNode;
  breadcrumbs?: unknown;
  hideCTA?: boolean;
  onOpenDemo?: () => void;
}

export function PageLayout({
  children,
  hideCTA = false,
}: PageLayoutProps) {
  return (
    <div className="app-shell inner-page-shell">
      <Navbar />

      <main className="inner-main-content">{children}</main>

      {!hideCTA && <FooterCTA />}

      <Footer />
    </div>
  );
}

export default PageLayout;
