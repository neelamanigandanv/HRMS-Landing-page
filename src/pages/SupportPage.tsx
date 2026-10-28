import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import SEO from '@/components/layout/SEO';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import {
  SUPPORT_CONFIG,
  SUPPORT_MODULE_TOPICS,
  SUPPORT_ISSUE_CATEGORIES,
  TICKET_PRIORITIES,
  SLA_RESPONSE_TIMES,
  POPULAR_SEARCH_CHIPS,
  SUPPORT_ROLE_CARDS,
  SUPPORT_FAQS,
  SUPPORT_CONTACT_CHANNELS,
  SUPPORT_SELF_LEARNING_RESOURCES,
  SUPPORT_ARTICLES_DATABASE,
  trackSupportEvent
} from '@/data/supportData';
import { submitSupportTicket } from '@/services/supportTicketService';
import './SupportPage.css';

export default function SupportPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // --------------------------------------------------------------------------
  // 1. HERO SEARCH STATE
  // --------------------------------------------------------------------------
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof SUPPORT_ARTICLES_DATABASE>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (trimmed.length >= 2) {
      const matches = SUPPORT_ARTICLES_DATABASE.filter(
        (a) =>
          a.title.toLowerCase().includes(trimmed) ||
          a.summary.toLowerCase().includes(trimmed)
      ).slice(0, 5);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Handle outside click for search suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    trackSupportEvent('search_performed', { query });
    navigate(`/support/search?q=${encodeURIComponent(query)}`);
  };

  const handleChipClick = (chip: string) => {
    trackSupportEvent('search_performed', { query: chip, source: 'popular_chip' });
    navigate(`/support/search?q=${encodeURIComponent(chip)}`);
  };

  // --------------------------------------------------------------------------
  // 2. FAQ ACCORDION STATE (Only 1 item open at a time; first item default)
  // --------------------------------------------------------------------------
  const [openFaqId, setOpenFaqId] = useState<string | null>(SUPPORT_FAQS[0]?.id || null);

  const toggleFaq = (id: string, question: string) => {
    setOpenFaqId((prev) => {
      const next = prev === id ? null : id;
      if (next !== null) {
        trackSupportEvent('faq_opened', { faq_id: id, question });
      }
      return next;
    });
  };

  // --------------------------------------------------------------------------
  // 3. TICKET FORM STATE & VALIDATION
  // --------------------------------------------------------------------------
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [issueCategory, setIssueCategory] = useState(SUPPORT_ISSUE_CATEGORIES[0] || 'Getting started');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('High');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');

  // Refs for focusing first invalid field
  const fullNameRef = useRef<HTMLInputElement>(null);
  const workEmailRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  // Pre-select category if passed in query params (e.g. ?category=Payroll%20%26%20compliance)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat && SUPPORT_ISSUE_CATEGORIES.includes(cat)) {
      setIssueCategory(cat);
    }
  }, [location.search]);

  // Handle live chat channel click
  const handleChatChannelClick = () => {
    trackSupportEvent('contact_channel_clicked', { channel: 'chat' });
    // Check if within business hours
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const hour = now.getHours();
    const isBusinessHours = day >= 1 && day <= 6 && hour >= 9 && hour < 19;
    if (isBusinessHours && (window as unknown as { Intercom?: unknown; zE?: unknown }).Intercom) {
      alert('Connecting to live support desk...');
    } else {
      // Scroll to ticket form
      const el = document.getElementById('ticket');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --------------------------------------------------------------------------
  // 4. SIDEBAR RELATED ARTICLES (Debounced 300ms from subject input)
  // --------------------------------------------------------------------------
  const [debouncedSubject, setDebouncedSubject] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSubject(subject);
    }, 300);
    return () => clearTimeout(timer);
  }, [subject]);

  const relatedArticles = useMemo(() => {
    const query = debouncedSubject.trim().toLowerCase();
    if (!query) {
      // Default: 3 most popular articles
      return SUPPORT_ARTICLES_DATABASE.filter((a) => a.popular).slice(0, 3);
    }
    const matched = SUPPORT_ARTICLES_DATABASE.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.summary.toLowerCase().includes(query) ||
        a.topicSlug.toLowerCase().includes(query)
    );
    if (matched.length > 0) {
      return matched.slice(0, 3);
    }
    // Fallback to popular if no direct match
    return SUPPORT_ARTICLES_DATABASE.filter((a) => a.popular).slice(0, 3);
  }, [debouncedSubject]);

  // --------------------------------------------------------------------------
  // 5. FILE UPLOAD HANDLING (Drag & Drop + Browse)
  // --------------------------------------------------------------------------
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = (filesList: FileList | null) => {
    if (!filesList) return;
    const newFiles: File[] = [];
    for (let i = 0; i < filesList.length; i++) {
      const file = filesList[i];
      // Limit: 5 files total, 5MB each, png/jpg/pdf
      if (attachedFiles.length + newFiles.length >= 5) {
        alert('You can upload up to 5 attachments.');
        break;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 5 MB limit.`);
        continue;
      }
      newFiles.push(file);
    }
    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // --------------------------------------------------------------------------
  // 6. FORM VALIDATION & SUBMISSION
  // --------------------------------------------------------------------------
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!workEmail.trim()) {
      errors.workEmail = 'Work email is required.';
    } else if (!emailRegex.test(workEmail.trim())) {
      errors.workEmail = 'Please enter a valid email address.';
    }

    if (!companyName.trim()) {
      errors.companyName = 'Company name is required.';
    }

    if (!subject.trim()) {
      errors.subject = 'Subject is required.';
    }

    if (!description.trim()) {
      errors.description = 'Description is required.';
    } else if (description.trim().length < 20) {
      errors.description = `Description must be at least 20 characters (currently ${description.trim().length}).`;
    }

    if (!consent) {
      errors.consent = 'You must agree to the privacy policy to submit a ticket.';
    }

    if (!captchaVerified) {
      errors.captcha = 'Please verify that you are human.';
    }

    setFormErrors(errors);

    // Focus first invalid field
    if (errors.fullName && fullNameRef.current) {
      fullNameRef.current.focus();
    } else if (errors.workEmail && workEmailRef.current) {
      workEmailRef.current.focus();
    } else if (errors.companyName && companyNameRef.current) {
      companyNameRef.current.focus();
    } else if (errors.subject && subjectRef.current) {
      subjectRef.current.focus();
    } else if (errors.description && descriptionRef.current) {
      descriptionRef.current.focus();
    } else if (errors.consent && consentRef.current) {
      consentRef.current.focus();
    } else if (errors.captcha && captchaRef.current) {
      captchaRef.current.focus();
    }

    return Object.keys(errors).length === 0;
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const ticket = await submitSupportTicket({
        name: fullName.trim(),
        email: workEmail.trim(),
        workEmail: workEmail.trim(),
        companyName: companyName.trim(),
        customerId: customerId.trim() || undefined,
        category: issueCategory,
        priority,
        subject: subject.trim(),
        description: description.trim(),
        files: attachedFiles.map((f) => ({ name: f.name, size: f.size, type: f.type })),
        filesCount: attachedFiles.length,
        consent
      });

      trackSupportEvent('ticket_submitted', {
        ticket_id: ticket.id,
        category: ticket.category,
        priority: ticket.priority,
        assigned_team: ticket.assignedTeam
      });

      navigate(`/support/ticket/confirmation?id=${ticket.id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred while submitting your ticket. Please retry.';
      setSubmitErrorMessage(msg);
      setIsSubmitting(false);
    }
  };

  // --------------------------------------------------------------------------
  // 7. FAQPage STRUCTURED DATA (JSON-LD)
  // --------------------------------------------------------------------------
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SUPPORT_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <PageLayout>
      <SEO
        title="Support"
        description="Search our HRMS help center, access step-by-step guides, or raise a support ticket with guaranteed response SLAs for payroll and compliance."
        canonicalPath="/support"
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="support-hub-page">
        {/* ==================================================================
            1. HERO + SEARCH
            ================================================================== */}
        <section className="support-hero-section" aria-labelledby="support-hero-heading">
          <div className="container">
            <div className="support-hero-content">
              <div className="support-hero-badge">
                <Icon name="phone" size={14} /> Support hub
              </div>
              <h1 id="support-hero-heading" className="support-hero-title">
                How can we help you today?
              </h1>
              <p className="support-hero-subtext">
                Search the help center, or reach our team for payroll, compliance and setup questions.
              </p>

              {/* Search Bar + Auto-suggestions */}
              <div className="support-search-wrapper" ref={searchWrapperRef}>
                <form onSubmit={handleSearchSubmit} role="search" aria-label="Support article search">
                  <div className="support-search-bar">
                    <span className="support-search-icon" aria-hidden="true">
                      <Icon name="search" size={20} />
                    </span>
                    <input
                      type="search"
                      className="support-search-input"
                      placeholder="Search questions, articles or guides..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search help center"
                      autoComplete="off"
                    />
                    <button type="submit" className="support-search-btn">
                      Search
                    </button>
                  </div>
                </form>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="support-suggestions-dropdown" role="listbox" aria-label="Search suggestions">
                    {suggestions.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/support/article/${item.slug}`}
                        className="support-suggestion-item"
                        onClick={() => setShowSuggestions(false)}
                      >
                        <div>
                          <div style={{ fontWeight: 600, color: '#111827' }}>{item.title}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{item.summary}</div>
                        </div>
                        <span className="support-suggestion-arrow" aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Popular Chips */}
              <div className="support-chips-container">
                <span className="support-chips-label">Popular:</span>
                {POPULAR_SEARCH_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className="support-chip-button"
                    onClick={() => handleChipClick(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. ROLE CARDS: "I am a…"
            ================================================================== */}
        <section className="support-section" aria-labelledby="roles-heading">
          <div className="container">
            <div className="support-section-header">
              <h2 id="roles-heading" className="support-section-title">I am a…</h2>
              <p className="support-section-subtext">
                Pick the option that fits and we'll take you to the right place.
              </p>
            </div>

            <div className="support-roles-grid">
              {SUPPORT_ROLE_CARDS.map((card) => (
                <div
                  key={card.id}
                  className={`support-role-card ${card.isPrimary ? 'primary' : ''}`}
                >
                  {card.isPrimary && (
                    <span className="support-role-badge-primary">Recommended for Admins</span>
                  )}
                  <div>
                    <span className="support-role-pill">{card.role}</span>
                    <h3 className="support-role-title">{card.heading}</h3>
                    <p className="support-role-desc">{card.desc}</p>
                  </div>

                  {card.actionTo.startsWith('#') ? (
                    <a
                      href={card.actionTo}
                      className="support-role-link"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(card.actionTo.substring(1));
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {card.actionText} →
                    </a>
                  ) : (
                    <Link to={card.actionTo} className="support-role-link">
                      {card.actionText} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="support-section-divider" />

        {/* ==================================================================
            3. BROWSE BY TOPIC (8 Cards)
            ================================================================== */}
        <section className="support-section" aria-labelledby="topics-heading">
          <div className="container">
            <div className="support-section-header">
              <h2 id="topics-heading" className="support-section-title">Browse by topic</h2>
              <p className="support-section-subtext">Guides and answers, grouped by module.</p>
            </div>

            <div className="support-topics-grid">
              {SUPPORT_MODULE_TOPICS.map((topic) => (
                <Link
                  key={topic.slug}
                  to={`/support/help-center/${topic.slug}`}
                  className="support-topic-card"
                >
                  <div className="support-topic-icon">
                    <Icon name={topic.icon as any} size={22} />
                  </div>
                  <h3 className="support-topic-name">{topic.title}</h3>
                  <p className="support-topic-desc">{topic.desc}</p>
                  <span className="support-topic-cta">
                    Explore guides →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <hr className="support-section-divider" />

        {/* ==================================================================
            4. QUICK ANSWERS (FAQ ACCORDION)
            ================================================================== */}
        <section className="support-section" aria-labelledby="faqs-heading">
          <div className="container">
            <div className="support-section-header">
              <h2 id="faqs-heading" className="support-section-title">Quick answers</h2>
              <p className="support-section-subtext">The questions we hear most from HR and payroll teams.</p>
            </div>

            <div className="support-faq-wrapper">
              <div className="support-accordion" role="region" aria-label="Frequently Asked Questions">
                {SUPPORT_FAQS.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`support-faq-item ${isOpen ? 'active' : ''}`}
                    >
                      <button
                        type="button"
                        className="support-faq-trigger"
                        onClick={() => toggleFaq(faq.id, faq.question)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.id}`}
                        id={`faq-btn-${faq.id}`}
                      >
                        <span>{faq.question}</span>
                        <span className="support-faq-chevron" aria-hidden="true">▾</span>
                      </button>
                      {isOpen && (
                        <div
                          id={`faq-answer-${faq.id}`}
                          role="region"
                          aria-labelledby={`faq-btn-${faq.id}`}
                          className="support-faq-content"
                        >
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="support-faq-footer">
                <Link to="/support/help-center" className="support-faq-footer-link">
                  View all articles and setup guides →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <hr className="support-section-divider" />

        {/* ==================================================================
            5. CONTACT OPTIONS ("Talk to a person")
            ================================================================== */}
        <section className="support-section" aria-labelledby="contact-heading">
          <div className="container">
            <div className="support-section-header">
              <h2 id="contact-heading" className="support-section-title">Talk to a person</h2>
              <p className="support-section-subtext">
                Choose the channel that suits the problem. Response times are shown on each card.
              </p>
            </div>

            <div className="support-channels-grid">
              {SUPPORT_CONTACT_CHANNELS.map((ch) => {
                // Hide phone card if no phone configured
                if (ch.id === 'phone' && !SUPPORT_CONFIG.supportPhone) {
                  return null;
                }

                return (
                  <div
                    key={ch.id}
                    className={`support-channel-card ${ch.isPrimary ? 'primary' : ''}`}
                  >
                    <div className="support-channel-top">
                      <div className="support-channel-icon">
                        <Icon name={ch.icon as any} size={20} />
                      </div>
                      <h3 className="support-channel-title">{ch.title}</h3>
                      <p className="support-channel-desc">{ch.desc}</p>
                      <span className="support-channel-note">{ch.note}</span>
                    </div>

                    <div>
                      {ch.actionType === 'scroll' && (
                        <a
                          href={ch.actionTarget}
                          className="support-channel-action"
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(ch.actionTarget.substring(1));
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {ch.actionText} →
                        </a>
                      )}
                      {ch.actionType === 'chat' && (
                        <button
                          type="button"
                          className="support-channel-action"
                          onClick={handleChatChannelClick}
                          style={{ background: 'none', border: 'none', padding: 0 }}
                        >
                          {ch.actionText} →
                        </button>
                      )}
                      {ch.actionType === 'email' && (
                        <a href={ch.actionTarget} className="support-channel-action">
                          {ch.actionText} →
                        </a>
                      )}
                      {ch.actionType === 'phone' && (
                        <a href={ch.actionTarget} className="support-channel-action">
                          {ch.actionText} →
                        </a>
                      )}
                      {ch.actionType === 'booking' && (
                        <a
                          href={ch.actionTarget}
                          target="_blank"
                          rel="noreferrer"
                          className="support-channel-action"
                        >
                          {ch.actionText} [booking link] →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <hr className="support-section-divider" />

        {/* ==================================================================
            6. RAISE A TICKET (id="ticket")
            ================================================================== */}
        <section id="ticket" className="support-section" aria-labelledby="ticket-heading">
          <div className="container">
            <div className="support-section-header">
              <h2 id="ticket-heading" className="support-section-title">Raise a ticket</h2>
              <p className="support-section-subtext">
                Tell us what's happening. The more detail you give, the faster we can fix it.
              </p>
            </div>

            <div className="support-ticket-layout">
              {/* Form Column */}
              <div className="support-ticket-form-card">
                {submitErrorMessage && (
                  <div className="support-submit-error-banner" style={{ marginBottom: '1.5rem' }}>
                    {submitErrorMessage}
                  </div>
                )}

                <form onSubmit={handleTicketSubmit} noValidate>
                  <div className="support-form-grid">
                    {/* Row 1: Full name + Work email */}
                    <div className="support-form-row">
                      <div className="support-field-group">
                        <label htmlFor="ticket-name" className="support-label">
                          Full name <span className="support-required-star">*</span>
                        </label>
                        <input
                          id="ticket-name"
                          ref={fullNameRef}
                          type="text"
                          className={`support-input ${formErrors.fullName ? 'error' : ''}`}
                          placeholder="e.g. Ramesh Sharma"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          aria-invalid={Boolean(formErrors.fullName)}
                          aria-describedby={formErrors.fullName ? 'name-err' : undefined}
                        />
                        {formErrors.fullName && (
                          <span id="name-err" className="support-field-error">
                            {formErrors.fullName}
                          </span>
                        )}
                      </div>

                      <div className="support-field-group">
                        <label htmlFor="ticket-email" className="support-label">
                          Work email <span className="support-required-star">*</span>
                        </label>
                        <input
                          id="ticket-email"
                          ref={workEmailRef}
                          type="email"
                          className={`support-input ${formErrors.workEmail ? 'error' : ''}`}
                          placeholder="ramesh@company.com"
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          required
                          aria-invalid={Boolean(formErrors.workEmail)}
                          aria-describedby={formErrors.workEmail ? 'email-err' : undefined}
                        />
                        {formErrors.workEmail && (
                          <span id="email-err" className="support-field-error">
                            {formErrors.workEmail}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Company name + Customer ID */}
                    <div className="support-form-row">
                      <div className="support-field-group">
                        <label htmlFor="ticket-company" className="support-label">
                          Company name <span className="support-required-star">*</span>
                        </label>
                        <input
                          id="ticket-company"
                          ref={companyNameRef}
                          type="text"
                          className={`support-input ${formErrors.companyName ? 'error' : ''}`}
                          placeholder="Acme Technologies"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          required
                          aria-invalid={Boolean(formErrors.companyName)}
                          aria-describedby={formErrors.companyName ? 'company-err' : undefined}
                        />
                        {formErrors.companyName && (
                          <span id="company-err" className="support-field-error">
                            {formErrors.companyName}
                          </span>
                        )}
                      </div>

                      <div className="support-field-group">
                        <label htmlFor="ticket-customer-id" className="support-label">
                          Customer ID
                        </label>
                        <input
                          id="ticket-customer-id"
                          type="text"
                          className="support-input"
                          placeholder="CID-XXXXX"
                          value={customerId}
                          onChange={(e) => setCustomerId(e.target.value)}
                          aria-describedby="cid-helper"
                        />
                        <span id="cid-helper" className="support-field-helper">
                          Optional for prospects
                        </span>
                      </div>
                    </div>

                    {/* Row 3: Issue category */}
                    <div className="support-field-group">
                      <label htmlFor="ticket-category" className="support-label">
                        Issue category <span className="support-required-star">*</span>
                      </label>
                      <select
                        id="ticket-category"
                        className="support-select"
                        value={issueCategory}
                        onChange={(e) => setIssueCategory(e.target.value)}
                        required
                      >
                        {SUPPORT_ISSUE_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Row 4: Priority Radio Group */}
                    <fieldset className="support-priority-fieldset">
                      <legend className="support-priority-legend">
                        Priority <span className="support-required-star">*</span>
                      </legend>
                      <div className="support-priority-options">
                        {TICKET_PRIORITIES.map((opt) => (
                          <label
                            key={opt.value}
                            className={`support-priority-label ${priority === opt.value ? 'selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name="ticket-priority"
                              className="support-priority-radio"
                              value={opt.value}
                              checked={priority === opt.value}
                              onChange={() => setPriority(opt.value)}
                            />
                            <div className="support-priority-text-block">
                              <span className="support-priority-name">{opt.label}</span>
                              <span className="support-priority-help">{opt.helperText}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {/* Row 5: Subject */}
                    <div className="support-field-group">
                      <label htmlFor="ticket-subject" className="support-label">
                        Subject <span className="support-required-star">*</span>
                      </label>
                      <input
                        id="ticket-subject"
                        ref={subjectRef}
                        type="text"
                        className={`support-input ${formErrors.subject ? 'error' : ''}`}
                        placeholder="e.g. Biometric device offline after network migration"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        aria-invalid={Boolean(formErrors.subject)}
                        aria-describedby="subject-helper"
                      />
                      <span id="subject-helper" className="support-field-helper">
                        Related articles appear on the right as you type.
                      </span>
                      {formErrors.subject && (
                        <span className="support-field-error">{formErrors.subject}</span>
                      )}
                    </div>

                    {/* Row 6: Description */}
                    <div className="support-field-group">
                      <label htmlFor="ticket-description" className="support-label">
                        Description <span className="support-required-star">*</span>
                      </label>
                      <textarea
                        id="ticket-description"
                        ref={descriptionRef}
                        rows={4}
                        className={`support-textarea ${formErrors.description ? 'error' : ''}`}
                        placeholder="What did you expect, and what happened instead? Include employee names or dates if relevant."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        aria-invalid={Boolean(formErrors.description)}
                      />
                      <span className="support-field-helper">
                        Min 20 characters ({description.trim().length}/20)
                      </span>
                      {formErrors.description && (
                        <span className="support-field-error">{formErrors.description}</span>
                      )}
                    </div>

                    {/* Row 7: Attachments (Drag & Drop + Browse) */}
                    <div className="support-field-group">
                      <span className="support-label">Attachments</span>
                      <div
                        className={`support-dropzone ${isDragOver ? 'dragover' : ''}`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragOver(true);
                        }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragOver(false);
                          handleFilesSelected(e.dataTransfer.files);
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            fileInputRef.current?.click();
                          }
                        }}
                        aria-label="Upload attachments file dropzone"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept=".png,.jpg,.jpeg,.pdf"
                          style={{ display: 'none' }}
                          onChange={(e) => handleFilesSelected(e.target.files)}
                        />
                        <div className="support-dropzone-icon">📎</div>
                        <div className="support-dropzone-text">
                          Drag and drop files here, or <span style={{ color: '#7b2958', fontWeight: 600 }}>browse</span>
                        </div>
                        <div className="support-dropzone-hint">
                          PNG, JPG, PDF up to 5 files, 5 MB each
                        </div>
                      </div>

                      {attachedFiles.length > 0 && (
                        <div className="support-file-list">
                          {attachedFiles.map((file, idx) => (
                            <div key={idx} className="support-file-item">
                              <span>📄 {file.name} ({(file.size / 1024).toFixed(0)} KB)</span>
                              <button
                                type="button"
                                className="support-file-remove"
                                onClick={() => removeFile(idx)}
                                aria-label={`Remove file ${file.name}`}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Row 8: Consent Checkbox */}
                    <div className="support-field-group">
                      <label className="support-consent-group">
                        <input
                          ref={consentRef}
                          type="checkbox"
                          className="support-consent-checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          required
                        />
                        <span className="support-consent-text">
                          I agree to be contacted about this ticket and accept the{' '}
                          <Link to="/privacy" target="_blank">privacy policy</Link>.
                        </span>
                      </label>
                      {formErrors.consent && (
                        <span className="support-field-error">{formErrors.consent}</span>
                      )}
                    </div>

                    {/* Row 9: CAPTCHA Placeholder */}
                    <div className="support-field-group">
                      <div className="support-captcha-box">
                        <label className="support-captcha-left">
                          <input
                            ref={captchaRef}
                            type="checkbox"
                            className="support-captcha-checkbox"
                            checked={captchaVerified}
                            onChange={(e) => setCaptchaVerified(e.target.checked)}
                          />
                          <span className="support-captcha-label">I'm not a robot</span>
                        </label>
                        <div className="support-captcha-brand">
                          <div>🛡️ reCAPTCHA</div>
                          <div>Privacy - Terms</div>
                        </div>
                      </div>
                      {formErrors.captcha && (
                        <span className="support-field-error">{formErrors.captcha}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full justify-center"
                    >
                      {isSubmitting ? 'Submitting ticket...' : 'Submit ticket'}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Sidebar Column (3 Blocks) */}
              <div className="support-sidebar">
                {/* Block 1: Related articles */}
                <div className="support-sidebar-card">
                  <h3 className="support-sidebar-title">
                    <span>💡</span> Related articles
                  </h3>
                  <div className="support-sidebar-articles">
                    {relatedArticles.map((art) => (
                      <Link
                        key={art.slug}
                        to={`/support/article/${art.slug}`}
                        className="support-sidebar-article-link"
                      >
                        {art.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Block 2: First response times table */}
                <div className="support-sidebar-card">
                  <h3 className="support-sidebar-title">
                    <span>⏱️</span> First response times
                  </h3>
                  <table className="support-sla-table">
                    <thead>
                      <tr>
                        <th>Priority</th>
                        <th>Target SLA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={priority === 'Critical' ? 'highlight' : ''}>
                        <td>
                          <span className="support-sla-badge critical">Critical</span>
                        </td>
                        <td>{SLA_RESPONSE_TIMES.Critical}</td>
                      </tr>
                      <tr className={priority === 'High' ? 'highlight' : ''}>
                        <td>
                          <span className="support-sla-badge high">High</span>
                        </td>
                        <td>{SLA_RESPONSE_TIMES.High}</td>
                      </tr>
                      <tr className={priority === 'Medium' ? 'highlight' : ''}>
                        <td>
                          <span className="support-sla-badge medium">Medium</span>
                        </td>
                        <td>{SLA_RESPONSE_TIMES.Medium}</td>
                      </tr>
                      <tr className={priority === 'Low' ? 'highlight' : ''}>
                        <td>
                          <span className="support-sla-badge low">Low</span>
                        </td>
                        <td>{SLA_RESPONSE_TIMES.Low}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '10px' }}>
                    During support hours ({SUPPORT_CONFIG.supportHours}).
                  </div>
                </div>

                {/* Block 3: Already raised one? */}
                <div className="support-track-cta-block">
                  <h4 className="support-track-cta-title">Already raised one?</h4>
                  <p className="support-track-cta-text">
                    Check the status or add details using your ticket ID.
                  </p>
                  <Link
                    to="/support/track"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#7b2958',
                      textDecoration: 'none'
                    }}
                  >
                    Track my ticket →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="support-section-divider" />

        {/* ==================================================================
            7. RESOURCES: "Learn at your own pace"
            ================================================================== */}
        <section className="support-section" aria-labelledby="resources-heading">
          <div className="container">
            <div className="support-section-header">
              <h2 id="resources-heading" className="support-section-title">Learn at your own pace</h2>
              <p className="support-section-subtext">Guides, videos and developer docs for admins and teams.</p>
            </div>

            <div className="support-resources-grid">
              {SUPPORT_SELF_LEARNING_RESOURCES.map((res) => (
                <Link key={res.title} to={res.href} className="support-resource-card">
                  <div className="support-resource-top">
                    <div className="support-resource-icon">
                      <Icon name={res.icon as any} size={22} />
                    </div>
                    <span className="support-resource-badge">{res.badge}</span>
                  </div>
                  <h3 className="support-resource-title">{res.title}</h3>
                  <p className="support-resource-desc">{res.desc}</p>
                  <span className="support-resource-cta">
                    Open resource →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
