import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import SEO from '@/components/layout/SEO';
import {
  SUPPORT_ARTICLES,
  SUPPORT_TOPICS,
  SUPPORT_CONTACT_CONFIG,
  trackSupportEvent
} from '@/data/supportData';

export default function SupportArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  const article = SUPPORT_ARTICLES.find((a) => a.slug === slug);
  const topic = article ? SUPPORT_TOPICS.find((t) => t.slug === article.topicSlug) : null;

  const handleFeedback = (val: 'yes' | 'no') => {
    setFeedback(val);
    trackSupportEvent(val === 'yes' ? 'article_helpful_yes' : 'article_helpful_no', {
      article_slug: slug,
      article_title: article?.title
    });
  };

  if (!article) {
    return (
      <PageLayout>
        <div style={{ maxWidth: '800px', margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1f2937', marginBottom: '12px' }}>
            Article not found
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            The guide or article you're looking for might have been moved or updated.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Button onClick={() => navigate('/support')}>
              Back to Support hub
            </Button>
            <Button secondary onClick={() => navigate('/support/help-center')}>
              Browse all topics
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Related articles in same topic
  const relatedArticles = SUPPORT_ARTICLES.filter(
    (a) => a.topicSlug === article.topicSlug && a.slug !== article.slug
  );

  return (
    <PageLayout>
      <SEO
        title={`${article.title} | ${SUPPORT_CONTACT_CONFIG.brandName} Support`}
        description={article.summary}
      />
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5EAEA', padding: '32px 24px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
            <Link to="/support" style={{ color: '#004B49', textDecoration: 'none' }}>Support</Link>
            <span>›</span>
            <Link to="/support/help-center" style={{ color: '#004B49', textDecoration: 'none' }}>Help Center</Link>
            {topic && (
              <>
                <span>›</span>
                <Link to={`/support/help-center/${topic.slug}`} style={{ color: '#004B49', textDecoration: 'none' }}>{topic.name}</Link>
              </>
            )}
            <span>›</span>
            <span style={{ color: '#374151', fontWeight: 500 }}>Article</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {topic && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: '#F6F8F8',
                color: '#004B49',
                border: '1px solid #E5EAEA'
              }}>
                <Icon name={topic.icon as any} size={14} />
                {topic.name}
              </span>
            )}
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              ⏱️ {article.readTime} read
            </span>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111827', lineHeight: 1.25, margin: 0 }}>
            {article.title}
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* Article Summary */}
        <p style={{ fontSize: '17px', color: '#4b5563', lineHeight: 1.6, marginTop: 0, marginBottom: '32px' }}>
          {article.summary}
        </p>

        {/* Step by step guide */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '28px',
          marginBottom: '40px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: 0, marginBottom: '20px' }}>
            Step-by-step instructions
          </h2>
          <ol style={{ margin: 0, paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {article.steps.map((step, idx) => (
              <li key={idx} style={{ color: '#374151', fontSize: '15px', lineHeight: 1.6 }}>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Was this helpful? Section */}
        <div style={{
          backgroundColor: '#fafbfc',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <p style={{ margin: '0 0 16px', fontWeight: 600, color: '#1f2937', fontSize: '16px' }}>
            Was this article helpful?
          </p>
          {feedback === null ? (
            <div style={{ display: 'inline-flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => handleFeedback('yes')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minHeight: '44px'
                }}
              >
                <span>👍</span> Yes, it helped
              </button>
              <button
                type="button"
                onClick={() => handleFeedback('no')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minHeight: '44px'
                }}
              >
                <span>👎</span> No, I still have questions
              </button>
            </div>
          ) : feedback === 'yes' ? (
            <div style={{ color: '#047857', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>✓</span> Thanks for your feedback! Glad we could help.
            </div>
          ) : (
            <div>
              <p style={{ color: '#b45309', margin: '0 0 20px', fontWeight: 500, fontSize: '14px' }}>
                Sorry this didn't resolve your issue. We're here to help directly:
              </p>
              {/* Still need help fallback box */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                textAlign: 'left'
              }}>
                <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827', marginBottom: '6px' }}>Raise a ticket</div>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 12px' }}>
                    Send full details to our support team with priority response.
                  </p>
                  <Link
                    to={`/support?category=${encodeURIComponent(topic?.name || '')}#ticket`}
                    style={{
                      display: 'inline-block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#004B49',
                      textDecoration: 'none'
                    }}
                  >
                    Open ticket form →
                  </Link>
                </div>
                <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827', marginBottom: '6px' }}>Live chat</div>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 12px' }}>
                    Chat with support specialists during business hours.
                  </p>
                  <Link
                    to="/support#ticket"
                    style={{
                      display: 'inline-block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#004B49',
                      textDecoration: 'none'
                    }}
                  >
                    Start chat or ticket →
                  </Link>
                </div>
                <div style={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827', marginBottom: '6px' }}>Book a call</div>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 12px' }}>
                    Pick a dedicated 30-min slot with an onboarding expert.
                  </p>
                  <a
                    href={SUPPORT_CONTACT_CONFIG.bookingUrl}
                    style={{
                      display: 'inline-block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#004B49',
                      textDecoration: 'none'
                    }}
                  >
                    Schedule call [booking link] →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related articles if any */}
        {relatedArticles.length > 0 && (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
              Related articles in this module
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/support/article/${rel.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    textDecoration: 'none',
                    color: '#1f2937'
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '15px' }}>{rel.title}</span>
                  <span style={{ fontSize: '13px', color: '#004B49', fontWeight: 600 }}>Read guide →</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
