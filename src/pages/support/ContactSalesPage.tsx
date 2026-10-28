import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import SEO from '@/components/layout/SEO';
import { SUPPORT_CONTACT_CONFIG } from '@/data/supportData';

export default function ContactSalesPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    teamSize: '51-200 employees',
    modules: [] as string[],
    message: ''
  });

  const modulesList = [
    'Payroll & Statutory Compliance',
    'Attendance & Biometric Sync',
    'Recruitment & Onboarding',
    'Performance & Appraisal Cycles',
    'Enterprise Integrations & SSO'
  ];

  const handleModuleToggle = (m: string) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.includes(m)
        ? prev.modules.filter((item) => item !== m)
        : [...prev.modules, m]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <PageLayout>
      <SEO
        title={`Contact Sales & Schedule Demo | ${SUPPORT_CONTACT_CONFIG.brandName}`}
        description="Speak with our HRMS solution specialists to explore pricing, security compliance, and customized plans for your organization."
      />
      <div style={{ backgroundColor: '#fcfafc', borderBottom: '1px solid #ebdbe6', padding: '36px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
            <Link to="/support" style={{ color: '#7b2958', textDecoration: 'none' }}>Support</Link>
            <span>›</span>
            <span style={{ color: '#374151', fontWeight: 500 }}>Contact Sales</span>
          </nav>
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '16px',
            backgroundColor: '#faedf4',
            color: '#7b2958',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '12px',
            border: '1px solid #ebdbe6'
          }}>
            Sales & Demo Inquiries
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#111827', margin: '0 0 12px', lineHeight: 1.2 }}>
            Let's find the right HRMS plan for your team
          </h1>
          <p style={{ fontSize: '17px', color: '#4b5563', margin: 0, maxWidth: '680px', lineHeight: 1.6 }}>
            Questions on pricing, payroll automation, statutory compliance, or enterprise security? Connect with our product specialists or schedule an interactive walkthrough.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '48px auto 80px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
          {/* Left Column: Form */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            padding: '36px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#faedf4',
                  color: '#7b2958',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <Icon name="check" size={28} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                  Thank you! We'll be in touch.
                </h3>
                <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.6, marginBottom: '24px' }}>
                  A sales consultant specializing in your team size will reach out to <strong>{formData.workEmail}</strong> within 1 business day with custom pricing and demo details.
                </p>
                <Button onClick={() => setSubmitted(false)}>
                  Send another inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 20px' }}>
                  Talk to a Product Specialist
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <label htmlFor="sales-name" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                      Full Name <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      id="sales-name"
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        fontSize: '14px',
                        outline: 'none',
                        minHeight: '44px'
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="sales-email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                      Work Email <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                      id="sales-email"
                      type="email"
                      required
                      placeholder="sarah@yourcompany.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        fontSize: '14px',
                        outline: 'none',
                        minHeight: '44px'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label htmlFor="sales-company" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                        Company Name <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        id="sales-company"
                        type="text"
                        required
                        placeholder="Company Ltd"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #d1d5db',
                          fontSize: '14px',
                          outline: 'none',
                          minHeight: '44px'
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="sales-team-size" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                        Team Size
                      </label>
                      <select
                        id="sales-team-size"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #d1d5db',
                          fontSize: '14px',
                          backgroundColor: '#ffffff',
                          minHeight: '44px'
                        }}
                      >
                        <option>1-20 employees</option>
                        <option>21-50 employees</option>
                        <option>51-200 employees</option>
                        <option>201-500 employees</option>
                        <option>500+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                      Key Modules You Need
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {modulesList.map((m) => (
                        <label key={m} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={formData.modules.includes(m)}
                            onChange={() => handleModuleToggle(m)}
                            style={{ accentColor: '#7b2958', width: '16px', height: '16px' }}
                          />
                          {m}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="sales-message" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                      Specific requirements or questions
                    </label>
                    <textarea
                      id="sales-message"
                      rows={3}
                      placeholder="Tell us about your current HR setup, migration timeline, or custom integration needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        fontSize: '14px',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full justify-center">
                    {loading ? 'Submitting...' : 'Request Pricing & Demo'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Demo Booking & Guarantees */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Book a live demo slot */}
            <div style={{
              backgroundColor: '#faedf4',
              borderRadius: '16px',
              border: '1px solid #ebdbe6',
              padding: '32px'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                color: '#7b2958',
                fontSize: '12px',
                fontWeight: 700,
                marginBottom: '12px',
                border: '1px solid #ebdbe6'
              }}>
                Instant Scheduling
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 10px' }}>
                Prefer a 1-on-1 walkthrough now?
              </h3>
              <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: '0 0 20px' }}>
                Skip the back-and-forth email exchange. Pick a 30-minute interactive live demo slot directly on our calendar.
              </p>
              <a
                href={SUPPORT_CONTACT_CONFIG.bookingUrl}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: '#7b2958',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textDecoration: 'none'
                }}
              >
                <span>📅</span> Book a Demo Slot [booking link] →
              </a>
            </div>

            {/* What you get in the demo */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              padding: '28px'
            }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>
                What happens during your sales demo:
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', color: '#4b5563', fontSize: '14px' }}>
                <li>Tailored demonstration configured for your company size and industry.</li>
                <li>Live payroll run showing automated PF, ESI, TDS, and statutory rules.</li>
                <li>Discussion on your existing biometric devices and API integrations.</li>
                <li>Transparent per-employee monthly pricing and multi-year discounts.</li>
              </ul>
            </div>

            {/* Enterprise Security Certifications */}
            <div style={{
              backgroundColor: '#f9fafb',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              padding: '20px'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                Enterprise Ready & Compliant
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {SUPPORT_CONTACT_CONFIG.trustBadges.map((badge) => (
                  <span
                    key={badge}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #d1d5db',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#374151'
                    }}
                  >
                    🔒 {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
