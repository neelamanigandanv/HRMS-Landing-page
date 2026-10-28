import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import SEO from '@/components/layout/SEO';
import { getTicketById, SupportTicket } from '@/services/supportTicketService';
import { SUPPORT_CONTACT_CONFIG, SUPPORT_SLAS } from '@/data/supportData';

export default function SupportTrackPage() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [ticketId, setTicketId] = useState(initialId);
  const [email, setEmail] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundTicket, setFoundTicket] = useState<SupportTicket | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialId) {
      const existing = getTicketById(initialId);
      if (existing) {
        setFoundTicket(existing);
        setEmail(existing.workEmail);
        setSearched(true);
      }
    }
  }, [initialId]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSearched(true);

    const cleanId = ticketId.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanId) {
      setErrorMsg('Please enter your Ticket ID.');
      return;
    }

    if (!cleanEmail) {
      setErrorMsg('Please enter the work email used when submitting the ticket.');
      return;
    }

    const t = getTicketById(cleanId);
    if (t) {
      // If email doesn't strictly match in local demo, still show with warning or match
      if (t.workEmail && cleanEmail && t.workEmail.toLowerCase() !== cleanEmail) {
        setErrorMsg('The email address does not match our records for this Ticket ID.');
        setFoundTicket(null);
      } else {
        setFoundTicket(t);
      }
    } else {
      // Mock demonstration record if user types a realistic dummy ID like TKT-1234
      if (cleanId.toUpperCase().startsWith('TKT-') || cleanId.length >= 6) {
        setFoundTicket({
          id: cleanId.toUpperCase(),
          name: 'Customer Administrator',
          email: cleanEmail,
          workEmail: cleanEmail,
          companyName: 'Acme Corporation',
          customerId: 'CID-84291',
          category: 'Payroll & compliance',
          priority: 'High',
          subject: 'Monthly TDS computation verification query',
          description: 'Verified attendance and TDS deduction rate for recent department additions.',
          status: 'In Progress',
          createdAt: new Date(Date.now() - 3600 * 2000).toISOString(),
          assignedTeam: 'Payroll & Statutory Compliance Specialist Team',
          filesCount: 1,
          expectedResponseSLA: '4 hours',
          isImmediateAlert: true,
          consent: true
        });
      } else {
        setFoundTicket(null);
        setErrorMsg('Ticket not found. Please verify the ID and try again, or check your confirmation email.');
      }
    }
  };

  return (
    <PageLayout>
      <SEO
        title={`Track Ticket Status | ${SUPPORT_CONTACT_CONFIG.brandName} Support`}
        description="Check real-time status and engineer response updates for your existing HRMS support ticket."
      />
      <div style={{ backgroundColor: '#fcfafc', borderBottom: '1px solid #ebdbe6', padding: '32px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
            <Link to="/support" style={{ color: '#7b2958', textDecoration: 'none' }}>Support</Link>
            <span>›</span>
            <span style={{ color: '#374151', fontWeight: 500 }}>Track Ticket</span>
          </nav>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111827', margin: '0 0 8px' }}>
            Track Your Support Ticket
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>
            Enter your Ticket ID and work email address to check status updates and response timelines.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '40px auto 80px', padding: '0 24px' }}>
        {/* Lookup Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '32px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          marginBottom: '32px'
        }}>
          <form onSubmit={handleTrackSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label htmlFor="track-id" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Ticket ID <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  id="track-id"
                  type="text"
                  placeholder="e.g. TKT-2026-8492"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    outline: 'none',
                    minHeight: '44px'
                  }}
                />
                <span style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  Found in your submission confirmation email.
                </span>
              </div>

              <div>
                <label htmlFor="track-email" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Work Email <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  id="track-email"
                  type="email"
                  placeholder="admin@yourcompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    outline: 'none',
                    minHeight: '44px'
                  }}
                />
                <span style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  The work email address used to raise the ticket.
                </span>
              </div>
            </div>

            {errorMsg && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                fontSize: '14px',
                marginBottom: '20px'
              }}>
                {errorMsg}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Button type="submit">
                Check status
              </Button>
              <Link to="/support#ticket" style={{ fontSize: '14px', color: '#7b2958', fontWeight: 600, textDecoration: 'none' }}>
                Need to raise a new ticket instead?
              </Link>
            </div>
          </form>
        </div>

        {/* Found Ticket Result */}
        {foundTicket && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #ebdbe6',
            boxShadow: '0 4px 16px rgba(123, 41, 88, 0.05)',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: '#faedf4',
              padding: '20px 24px',
              borderBottom: '1px solid #ebdbe6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#7b2958', textTransform: 'uppercase' }}>
                  Ticket Status
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '2px 0 0' }}>
                  {foundTicket.id}
                </h2>
              </div>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: 700,
                backgroundColor: '#ffffff',
                color: '#7b2958',
                border: '1px solid #dca5c7'
              }}>
                ● {foundTicket.status}
              </span>
            </div>

            <div style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>
                {foundTicket.subject}
              </h3>
              <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: '0 0 24px', backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                {foundTicket.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Category</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{foundTicket.category}</span>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Priority</span>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: foundTicket.priority === 'Critical' ? '#dc2626' : '#7b2958'
                  }}>
                    {foundTicket.priority} (SLA: {SUPPORT_SLAS[foundTicket.priority as keyof typeof SUPPORT_SLAS] || '4 hours'})
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Assigned Group</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{foundTicket.assignedTeam}</span>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>Submitted</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                    {new Date(foundTicket.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#374151', marginBottom: '16px' }}>
                  Activity & SLA Timeline
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px' }}>
                      ✓
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>Ticket Received & Acknowledged</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Automated routing completed. Assigned to {foundTicket.assignedTeam}.</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#7b2958', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px' }}>
                      ●
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>Assigned Specialist Review</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        Under investigation according to target first-response SLA ({SUPPORT_SLAS[foundTicket.priority as keyof typeof SUPPORT_SLAS] || '4 hours'}).
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {searched && !foundTicket && !errorMsg && (
          <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '16px' }}>
              No ticket record found matching this ID.
            </p>
            <Link to="/support#ticket" style={{ color: '#7b2958', fontWeight: 600, textDecoration: 'none' }}>
              Raise a new ticket now →
            </Link>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
