import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import SEO from '@/components/layout/SEO';
import {
  getTicketById,
  SupportTicket
} from '@/services/supportTicketService';
import {
  SUPPORT_SLAS,
  SUPPORT_CONTACT_CONFIG
} from '@/data/supportData';

export default function SupportTicketConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ticketId = searchParams.get('id') || '';
  const [ticket, setTicket] = useState<SupportTicket | null>(null);

  useEffect(() => {
    if (ticketId) {
      const found = getTicketById(ticketId);
      if (found) {
        setTicket(found);
      }
    }
  }, [ticketId]);

  const priorityKey = ticket?.priority || 'High';
  const slaText = SUPPORT_SLAS[priorityKey as keyof typeof SUPPORT_SLAS] || SUPPORT_SLAS['High'];

  return (
    <PageLayout>
      <SEO
        title={`Ticket Submitted #${ticketId || 'New'} | ${SUPPORT_CONTACT_CONFIG.brandName} Support`}
        description="Your support request has been received by our engineering and payroll support team."
      />
      <div style={{ backgroundColor: '#fcfafc', borderBottom: '1px solid #ebdbe6', padding: '32px 24px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280' }}>
            <Link to="/support" style={{ color: '#7b2958', textDecoration: 'none' }}>Support</Link>
            <span>›</span>
            <span style={{ color: '#374151', fontWeight: 500 }}>Ticket Confirmation</span>
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '48px auto 80px', padding: '0 24px' }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #ebdbe6',
          boxShadow: '0 4px 20px rgba(123, 41, 88, 0.06)',
          overflow: 'hidden'
        }}>
          {/* Header Banner */}
          <div style={{
            backgroundColor: '#faedf4',
            borderBottom: '1px solid #ebdbe6',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#7b2958',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Icon name="check" size={28} />
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#111827', margin: '0 0 8px' }}>
              Ticket Raised Successfully
            </h1>
            <p style={{ fontSize: '15px', color: '#4b5563', margin: 0 }}>
              Our team has been notified and is reviewing your request.
            </p>
          </div>

          {/* Ticket Information Body */}
          <div style={{ padding: '32px' }}>
            {/* Ticket ID Highlight */}
            <div style={{
              backgroundColor: '#faf5f8',
              border: '1px dashed #dca5c7',
              borderRadius: '10px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#7b2958', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Your Reference Ticket ID
                </span>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#111827', letterSpacing: '0.02em', marginTop: '2px' }}>
                  {ticketId || '[TKT-2026-XXXX]'}
                </div>
              </div>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: priorityKey === 'Critical' ? '#fee2e2' : '#faedf4',
                color: priorityKey === 'Critical' ? '#dc2626' : '#7b2958',
                border: '1px solid #ebdbe6'
              }}>
                Priority: {priorityKey}
              </span>
            </div>

            {/* Expected First Response Time */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ color: '#7b2958', marginTop: '2px' }}>
                  <Icon name="clock" size={20} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: '#111827' }}>
                    Expected First Response SLA: {slaText}
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#4b5563', lineHeight: 1.5 }}>
                    Based on your <strong>{priorityKey}</strong> priority selection, our engineering and payroll specialists aim to provide their first response within <strong>{slaText}</strong> during support hours ({SUPPORT_CONTACT_CONFIG.supportHours}).
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmation Email Notice */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: '#f3f4f6',
              marginBottom: '32px'
            }}>
              <span style={{ fontSize: '18px' }}>✉️</span>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: 1.5 }}>
                A confirmation email has been sent to <strong>{ticket?.workEmail || 'your registered work email'}</strong> with your ticket summary, direct status tracking link, and instructions to reply with further attachments.
              </p>
            </div>

            {/* Ticket Overview if available */}
            {ticket && (
              <div style={{
                borderTop: '1px solid #f3f4f6',
                paddingTop: '20px',
                marginBottom: '32px'
              }}>
                <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: '#374151' }}>
                  Summary of your request
                </h4>
                <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6 }}>
                  <div><strong>Subject:</strong> {ticket.subject}</div>
                  <div><strong>Category:</strong> {ticket.category}</div>
                  <div><strong>Assigned Department:</strong> {ticket.assignedTeam}</div>
                  <div><strong>Company:</strong> {ticket.companyName}</div>
                  {Boolean(ticket.filesCount && ticket.filesCount > 0) && (
                    <div><strong>Attachments:</strong> {ticket.filesCount} file(s) attached</div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Button
                onClick={() => navigate(`/support/track?id=${ticketId}`)}
                className="flex-1 justify-center"
              >
                Track my ticket
              </Button>
              <Button
                secondary
                onClick={() => navigate('/support')}
                className="flex-1 justify-center"
              >
                Back to Support Hub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
