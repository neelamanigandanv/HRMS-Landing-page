import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import Icon from '@/components/ui/Icon';
import SEO from '@/components/layout/SEO';
import { SUPPORT_CONTACT_CONFIG } from '@/data/supportData';

export default function SupportEmployeeHelpPage() {
  const employeeFaqs = [
    {
      q: 'Where do I find my monthly payslips and tax sheets?',
      a: 'Your payslips and Form 16 are generated and published directly by your employer\'s payroll department. Log into your company\'s employee portal or mobile app and check under "My Documents" or "Payroll". If a specific month\'s slip is not visible, please ping your HR/payroll admin.'
    },
    {
      q: 'How do I regularise a biometric punch or apply for leave?',
      a: 'Navigate to the "Attendance & Leave" tab in your employee portal. Submit a regularization request with your punch timings or select your leave type. Your team manager or company HR receives and approves these requests.'
    },
    {
      q: 'Why can\'t I log into the mobile app or employee portal?',
      a: 'Confirm you are using your official company email address. If you forgot your password, tap "Forgot Password" on your company\'s login page. If your account is locked or deactivated, only your company\'s HR administrator can reset or unblock it.'
    },
    {
      q: 'My bank account details or PAN/Aadhaar are incorrect. Can you update them?',
      a: 'For legal and security reasons, our support team cannot view or alter employee personal or bank details. Submit a change request through your portal profile settings or contact your internal HR team with verified proof.'
    }
  ];

  return (
    <PageLayout>
      <SEO
        title={`Employee Help & HR Admin Contact | ${SUPPORT_CONTACT_CONFIG.brandName} Support`}
        description="Are you an employee using HRMS? Learn how to reach your company's internal HR team for payslips, leave, and login requests."
      />
      <div style={{ backgroundColor: '#fcfafc', borderBottom: '1px solid #ebdbe6', padding: '36px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
            <Link to="/support" style={{ color: '#7b2958', textDecoration: 'none' }}>Support</Link>
            <span>›</span>
            <span style={{ color: '#374151', fontWeight: 500 }}>Employee Help</span>
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
            Employee Self-Service Help
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111827', margin: '0 0 12px', lineHeight: 1.25 }}>
            Need help with your payslips, leave, or portal login?
          </h1>
          <p style={{ fontSize: '16px', color: '#4b5563', margin: 0, lineHeight: 1.6 }}>
            {SUPPORT_CONTACT_CONFIG.brandName} powers your organization's HR platform, but your company's internal HR and payroll team manages your individual profile, policies, and approvals.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '40px auto 80px', padding: '0 24px' }}>
        {/* Notice Card */}
        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
          marginBottom: '36px'
        }}>
          <div style={{ color: '#2563eb', fontSize: '24px', flexShrink: 0, marginTop: '2px' }}>
            ℹ️
          </div>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#1e3a8a', margin: '0 0 6px' }}>
              Why you should contact your company's HR Admin directly
            </h2>
            <p style={{ fontSize: '14px', color: '#1e40af', margin: 0, lineHeight: 1.6 }}>
              As the software vendor, our team does not have administrative access to change your personal bank details, approve leave requests, or disclose payroll calculations. Your employer's designated HR manager can resolve these immediately inside their admin portal.
            </p>
          </div>
        </div>

        {/* How to contact HR checklist */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '28px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          marginBottom: '40px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>
            Fastest ways to reach your internal HR team:
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: '#fafbfc', padding: '16px', borderRadius: '8px', border: '1px solid #f3f4f6' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827', marginBottom: '4px' }}>1. Check company intranet / Slack</div>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                Look for channels like #hr-helpdesk, #ask-people, or your internal people operations email (e.g. hr@yourcompany.com).
              </p>
            </div>
            <div style={{ backgroundColor: '#fafbfc', padding: '16px', borderRadius: '8px', border: '1px solid #f3f4f6' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827', marginBottom: '4px' }}>2. Ask your reporting manager</div>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                Your manager can unlock attendance regularisations or point you to your business unit HR business partner (HRBP).
              </p>
            </div>
            <div style={{ backgroundColor: '#fafbfc', padding: '16px', borderRadius: '8px', border: '1px solid #f3f4f6' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827', marginBottom: '4px' }}>3. Company HR Portal</div>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                Log in to your company-specific workspace link (e.g. yourcompany.lattiumhr.com) and use internal ticket routing.
              </p>
            </div>
          </div>
        </div>

        {/* Employee FAQ Accordion */}
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '20px' }}>
          Frequently Asked Questions by Employees
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
          {employeeFaqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                padding: '20px'
              }}
            >
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 8px' }}>
                {faq.q}
              </h3>
              <p style={{ fontSize: '14px', color: '#4b5563', margin: 0, lineHeight: 1.6 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Are you an HR Administrator note */}
        <div style={{
          backgroundColor: '#faf5f8',
          border: '1px solid #ebdbe6',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#7b2958', margin: '0 0 6px' }}>
            Are you an HR Admin or Payroll Manager for your organization?
          </h3>
          <p style={{ fontSize: '14px', color: '#4b5563', margin: '0 0 16px' }}>
            If you have an administrative account and need help with payroll runs, statutory filings, or system configuration, our technical support engineers are ready to assist.
          </p>
          <Link
            to="/support#ticket"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#7b2958',
              color: '#ffffff',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            Raise an Admin Ticket →
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
