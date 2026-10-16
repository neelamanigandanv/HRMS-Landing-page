import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { useDemoModal } from "../../context/DemoModalContext";

interface PageLayoutProps {
  children: ReactNode;
  breadcrumbs?: unknown;
  hideCTA?: boolean;
  onOpenDemo?: () => void;
}

export function PageLayout({
  children,
  hideCTA = false,
  onOpenDemo,
}: PageLayoutProps) {
  const { openDemoModal } = useDemoModal();

  return (
    <div className="app-shell inner-page-shell">
      <Navbar />

      <main className="inner-main-content">{children}</main>

      {!hideCTA && (
        <section className="final-cta inner-page-cta">
          <div className="container final-grid">
            <div>
              <span className="eyebrow">READY TO SIMPLIFY HR?</span>
              <h2>Your people deserve better than spreadsheets.</h2>
              <p>
                Join 500+ growing multi-branch businesses running HR, attendance, and payroll on LattiumHR.
              </p>
              <div className="final-actions">
                <Button onClick={onOpenDemo || (() => openDemoModal())}>
                  Request a Free Demo <Icon name="arrow" />
                </Button>
                <Button to="/contact" secondary>
                  Contact Our Team
                </Button>
              </div>
              <div className="final-points">
                <span>
                  <Icon name="check" /> Free personalized 30-min walkthrough
                </span>
                <span>
                  <Icon name="check" /> Dedicated onboarding specialist
                </span>
                <span>
                  <Icon name="check" /> Go live in 2–4 weeks
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default PageLayout;
