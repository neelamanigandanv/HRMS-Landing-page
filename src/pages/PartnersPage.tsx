import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/layout/SEO";
import {
  HeroBanner,
  BenefitGrid,
  PartnerTypeCard,
  ChecklistCard,
  StepList,
  PartnerLogoGrid,
  EnquiryForm,
} from "@/components/partners";
import { PartnerCategory } from "@/data/partnersData";
import "./PartnersPage.css";

export function PartnersPage() {
  const [selectedPartnerType, setSelectedPartnerType] = useState<PartnerCategory>("reseller");

  // Smooth scroll to enquiry form
  const scrollToForm = () => {
    const el = document.getElementById("partner-enquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handler when clicking "Join as [type]" in Section 3
  const handleJoinTypeClick = (type: PartnerCategory) => {
    setSelectedPartnerType(type);
    scrollToForm();
  };

  return (
    <PageLayout hideCTA>
      <SEO
        title="Partner Programme | Reseller, Referral & Tech Alliances | LattiumHR"
        description="Join the LattiumHR Partner Programme. Expand your consulting practice, earn recurring subscription revenue share, and collaborate with enterprise HRMS experts."
        canonicalPath="/partners"
      />

      <div className="partners-page-root">
        {/* 1) HERO */}
        <HeroBanner onBecomePartnerClick={scrollToForm} />

        {/* 2) WHY PARTNER WITH US */}
        <BenefitGrid />

        {/* 3) FIND THE RIGHT FIT */}
        <PartnerTypeCard onJoinTypeClick={handleJoinTypeClick} />

        {/* 4) WHAT YOU GET */}
        <ChecklistCard />

        {/* 5) HOW IT WORKS */}
        <StepList />

        {/* 6) OUR PARTNERS (SOCIAL PROOF) */}
        <PartnerLogoGrid />

        {/* 7) PARTNER ENQUIRY FORM */}
        <EnquiryForm initialPartnerType={selectedPartnerType} />
      </div>
    </PageLayout>
  );
}

export default PartnersPage;
