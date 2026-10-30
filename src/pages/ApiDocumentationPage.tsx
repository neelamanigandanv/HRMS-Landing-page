import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import SEO from "@/components/layout/SEO";
import Icon from "@/components/ui/Icon";
import {
  API_MODULES,
  API_ENDPOINTS,
  ApiEndpoint,
  ApiModule,
} from "@/data/apiDocsData";
import "./ApiDocumentationPage.css";

export default function ApiDocumentationPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const breadcrumbs = [
    { label: "Resources", to: "/resources" },
    { label: "API Documentation" },
  ];

  // Active module state (default to first module: authentication)
  const initialModuleId = searchParams.get("module") || API_MODULES[0].id;
  const [activeModuleId, setActiveModuleId] = useState<string>(initialModuleId);

  // Active module
  const activeModule = useMemo(() => {
    return API_MODULES.find((m) => m.id === activeModuleId) || API_MODULES[0];
  }, [activeModuleId]);

  // Active endpoint state (default to first endpoint: id 1)
  const initialApiId = parseInt(searchParams.get("api") || "", 10);
  const [selectedApiId, setSelectedApiId] = useState<number>(() => {
    const found = API_ENDPOINTS.find((ep) => ep.id === initialApiId);
    return found ? found.id : 1;
  });

  // Current API object
  const currentApi: ApiEndpoint = useMemo(() => {
    const found = API_ENDPOINTS.find((ep) => ep.id === selectedApiId);
    return found || API_ENDPOINTS[0];
  }, [selectedApiId]);

  // Language tab for Right Code Card: "curl" | "js" | "python" | "http"
  const [langTab, setLangTab] = useState<"curl" | "js" | "python" | "http">("curl");

  // Selected response status tab
  const [activeResponseStatus, setActiveResponseStatus] = useState<string>("200 OK");

  // Sync active response status when API changes
  useEffect(() => {
    if (currentApi.responses && currentApi.responses.length > 0) {
      setActiveResponseStatus(currentApi.responses[0].status);
    }
  }, [currentApi.id]);

  // Copy states
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Sidebar search filter
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Active "On This Page" section tracking
  const [activeOnPageSection, setActiveOnPageSection] = useState<"headers" | "request-body" | "responses">("headers");

  // Listen to keyboard shortcut "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle module click in left sidebar
  const handleModuleClick = (modId: string) => {
    setActiveModuleId(modId);
    const modEndpoints = API_ENDPOINTS.filter((ep) => ep.moduleId === modId);
    if (modEndpoints.length > 0) {
      setSelectedApiId(modEndpoints[0].id);
      setSearchParams({ module: modId, api: String(modEndpoints[0].id) }, { replace: true });
    }
  };

  // Handle endpoint click
  const handleEndpointClick = (ep: ApiEndpoint) => {
    setActiveModuleId(ep.moduleId);
    setSelectedApiId(ep.id);
    setSearchParams({ module: ep.moduleId, api: String(ep.id) }, { replace: true });
  };

  // Copy URL helper
  const handleCopyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentApi.endpointUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  // Copy Code helper
  const handleCopyCode = () => {
    const textToCopy = currentApi.codeSnippets[langTab] || currentApi.codeSnippets.curl;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // Scroll to section on "On This Page" click
  const scrollToAnchor = (anchorId: "section-headers" | "section-request-body" | "section-responses", type: "headers" | "request-body" | "responses") => {
    setActiveOnPageSection(type);
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filtered endpoints if search is active
  const filteredEndpoints = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    return API_ENDPOINTS.filter(
      (ep) =>
        ep.name.toLowerCase().includes(q) ||
        ep.shortName.toLowerCase().includes(q) ||
        ep.endpointUrl.toLowerCase().includes(q) ||
        ep.method.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Method badge color helper
  const getMethodBadgeClass = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "badge-get";
      case "POST":
        return "badge-post";
      case "PUT":
        return "badge-put";
      case "DELETE":
        return "badge-delete";
      default:
        return "badge-default";
    }
  };

  // Active response object
  const activeResponseObj = useMemo(() => {
    const found = currentApi.responses.find((r) => r.status === activeResponseStatus);
    return found || currentApi.responses[0] || { status: "200 OK", code: 200, body: "{}" };
  }, [currentApi.responses, activeResponseStatus]);

  return (
    <PageLayout breadcrumbs={breadcrumbs} hideCTA={true}>
      <SEO
        title="LattiumHR API Documentation | Developer REST API Reference"
        description="Explore LattiumHR API endpoints, understand request methods, view schemas, and find code examples to integrate authentication, onboarding, payroll, assets, surveys, and offboarding."
        canonicalPath="/resources/api-documentation"
      />

      <div className="api-docs-page">
        {/* ==================================================================
            1. HERO SECTION
            ================================================================== */}
        <section className="api-hero-section" aria-labelledby="api-hero-heading">
          <div className="container">
            <div className="api-hero-content">
              {/* Eyebrow */}
              <div className="api-hero-eyebrow">
                <span className="api-hero-sparkle">✦</span>
                <span>DEVELOPER REST API &amp; SPECS</span>
                <span className="api-hero-sparkle">✦</span>
              </div>

              {/* Heading */}
              <h1 id="api-hero-heading" className="api-hero-title">
                LattiumHR REST API <span className="api-hero-highlight">Reference &amp; Workbench</span>
              </h1>

              {/* Subheading */}
              <p className="api-hero-subtext">
                Comprehensive HTTP endpoints, JSON payload schemas, real-time webhooks, and copy-paste code snippets to integrate your core workforce, biometric hardware, and payroll engine.
              </p>

              {/* Developer Badges */}
              <div className="api-hero-badges-row">
                <span className="api-hero-badge"><Icon name="sparkle" size={13} /> OpenAPI 3.1 &amp; Postman Ready</span>
                <span className="api-hero-badge"><Icon name="lock" size={13} /> OAuth 2.0 &amp; Bearer Tokens</span>
                <span className="api-hero-badge"><Icon name="shield" size={13} /> 99.99% Core API Uptime SLA</span>
                <span className="api-hero-badge"><Icon name="check" size={13} /> Real-Time Webhooks</span>
              </div>

              {/* Action Buttons */}
              <div className="api-hero-actions">
                <a
                  href="#explore-api-documentation"
                  className="api-hero-btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("explore-api-documentation")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore Endpoints <Icon name="arrow" size={15} />
                </a>
                <button
                  type="button"
                  className="api-hero-btn-secondary"
                  onClick={() => {
                    handleModuleClick("authentication");
                    document.getElementById("explore-api-documentation")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Icon name="lock" size={14} /> Quickstart &amp; Auth
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. EXPLORE API DOCUMENTATION — EXPANDED 3-COLUMN WORKBENCH
            ================================================================== */}
        <section className="api-workbench-section" id="explore-api-documentation">
          <div className="api-workbench-container">
            {/* Section Header */}
            <div className="api-section-header">
              <span className="api-section-eyebrow">✦ INTERACTIVE API EXPLORER ✦</span>
              <h2 className="api-section-title">Explore API Documentation</h2>
              <p className="api-section-subtitle">
                Select a module to explore its available APIs, endpoint details, request schemas,
                headers, and live multi-language code snippets.
              </p>
            </div>

            {/* 3-Column Layout: Left Sidebar + Center Card + Right Code Column */}
            <div className="api-3col-workbench">
              {/* ============================================================
                  COLUMN 1: LEFT SIDEBAR (SEARCH + MODULES + ENDPOINTS)
                  ============================================================ */}
              <aside className="api-left-sidebar" aria-label="API Modules and Endpoints">
                {/* Search Box */}
                <div className="api-search-box-wrap">
                  <Icon name="search" size={15} className="api-search-icon" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="api-search-input"
                    placeholder="Search APIs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search APIs"
                  />
                  <span className="api-search-shortcut-pill">/</span>
                </div>

                {/* If searching, show flat list of matches */}
                {filteredEndpoints ? (
                  <div className="api-search-results-list">
                    <div className="api-search-results-header">
                      {filteredEndpoints.length} {filteredEndpoints.length === 1 ? "result" : "results"}
                    </div>
                    {filteredEndpoints.length === 0 ? (
                      <div className="api-search-empty">No APIs found</div>
                    ) : (
                      filteredEndpoints.map((ep) => {
                        const isSelected = ep.id === currentApi.id;
                        return (
                          <button
                            key={ep.id}
                            type="button"
                            onClick={() => handleEndpointClick(ep)}
                            className={`api-nav-endpoint-item ${isSelected ? "selected" : ""}`}
                          >
                            <span className={`api-method-badge ${getMethodBadgeClass(ep.method)}`}>
                              {ep.method}
                            </span>
                            <span className="api-nav-endpoint-name">{ep.shortName}</span>
                          </button>
                        );
                      })
                    )}
                  </div>
                ) : (
                  /* Default: Accordion of 6 Modules */
                  <div className="api-modules-accordion" role="navigation">
                    {API_MODULES.map((mod: ApiModule) => {
                      const isExpanded = mod.id === activeModuleId;
                      const modEndpoints = API_ENDPOINTS.filter((ep) => ep.moduleId === mod.id);

                      return (
                        <div key={mod.id} className="api-module-group">
                          {/* Module Header Button */}
                          <button
                            type="button"
                            className={`api-module-header-btn ${isExpanded ? "active" : ""}`}
                            onClick={() => handleModuleClick(mod.id)}
                            aria-expanded={isExpanded}
                          >
                            <span className="api-module-name">{mod.shortName || mod.name}</span>
                            <span className="api-module-count">{mod.apiCount}</span>
                          </button>

                          {/* Endpoints List (shown when module is active) */}
                          {isExpanded && (
                            <div className="api-module-endpoints-list" role="list">
                              {modEndpoints.map((ep) => {
                                const isSelected = ep.id === currentApi.id;
                                return (
                                  <button
                                    key={ep.id}
                                    type="button"
                                    role="listitem"
                                    onClick={() => handleEndpointClick(ep)}
                                    className={`api-nav-endpoint-item ${isSelected ? "selected" : ""}`}
                                    aria-current={isSelected ? "true" : undefined}
                                  >
                                    <span className={`api-method-badge ${getMethodBadgeClass(ep.method)}`}>
                                      {ep.method}
                                    </span>
                                    <span className="api-nav-endpoint-name">{ep.shortName}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </aside>

              {/* ============================================================
                  COLUMN 2: CENTER MAIN DOCUMENTATION CARD
                  ============================================================ */}
              <main className="api-center-content" aria-label="Endpoint Documentation">
                <article className="api-main-card">
                  {/* Breadcrumb */}
                  <div className="api-doc-breadcrumb">
                    <span>{currentApi.module}</span>
                    <span className="api-doc-breadcrumb-sep">/</span>
                    <span>{currentApi.shortName}</span>
                  </div>

                  {/* Title */}
                  <h3 className="api-doc-heading">{currentApi.name}</h3>

                  {/* Description */}
                  <p className="api-doc-description">{currentApi.description}</p>

                  {/* Endpoint URL Bar */}
                  <div className="api-url-bar">
                    <div className="api-url-bar-left">
                      <span className={`api-method-badge ${getMethodBadgeClass(currentApi.method)}`}>
                        {currentApi.method}
                      </span>
                      <code className="api-url-bar-text">{currentApi.endpointUrl}</code>
                    </div>
                    <button
                      type="button"
                      className={`api-url-bar-copy-btn ${copiedUrl ? "copied" : ""}`}
                      onClick={handleCopyUrl}
                      aria-label="Copy endpoint URL"
                    >
                      {copiedUrl ? (
                        <>
                          <Icon name="check" size={13} /> Copied
                        </>
                      ) : (
                        "Copy"
                      )}
                    </button>
                  </div>

                  {/* ========================================================
                      HEADERS SECTION
                      ======================================================== */}
                  <div className="api-doc-section-block" id="section-headers">
                    <h4 className="api-doc-section-label">HEADERS</h4>
                    <div className="api-table-wrapper">
                      <table className="api-spec-table">
                        <thead>
                          <tr>
                            <th style={{ width: "40%" }}>Key</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentApi.headersTable && currentApi.headersTable.length > 0 ? (
                            currentApi.headersTable.map((h, i) => (
                              <tr key={i}>
                                <td>
                                  <span className="api-table-pill">{h.key}</span>
                                </td>
                                <td>
                                  <span className="api-table-pill">{h.value}</span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={2} className="api-empty-row">
                                No custom headers required (standard Authorization header applies)
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* ========================================================
                      REQUEST BODY OR PARAMETERS SECTION
                      ======================================================== */}
                  <div className="api-doc-section-block" id="section-request-body">
                    {currentApi.requestBodyFields && currentApi.requestBodyFields.length > 0 ? (
                      <>
                        <h4 className="api-doc-section-label">REQUEST BODY</h4>
                        <div className="api-table-wrapper">
                          <table className="api-spec-table">
                            <thead>
                              <tr>
                                <th style={{ width: "30%" }}>Name</th>
                                <th style={{ width: "20%" }}>Type</th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentApi.requestBodyFields.map((f, i) => (
                                <tr key={i}>
                                  <td>
                                    <div className="api-field-name-cell">
                                      <span className="api-table-pill">{f.name}</span>
                                      {f.required && (
                                        <span className="api-required-micro-label">required</span>
                                      )}
                                    </div>
                                  </td>
                                  <td>
                                    <span className="api-type-text">{f.type}</span>
                                  </td>
                                  <td>
                                    <span className="api-desc-text">{f.description}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : currentApi.parameters && currentApi.parameters.length > 0 ? (
                      <>
                        <h4 className="api-doc-section-label">PARAMETERS</h4>
                        <div className="api-table-wrapper">
                          <table className="api-spec-table">
                            <thead>
                              <tr>
                                <th style={{ width: "30%" }}>Name</th>
                                <th style={{ width: "20%" }}>In</th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentApi.parameters.map((p, i) => (
                                <tr key={i}>
                                  <td>
                                    <div className="api-field-name-cell">
                                      <span className="api-table-pill">{p.name}</span>
                                      {p.required && (
                                        <span className="api-required-micro-label">required</span>
                                      )}
                                    </div>
                                  </td>
                                  <td>
                                    <span className="api-type-text">{p.in}</span>
                                  </td>
                                  <td>
                                    <span className="api-desc-text">{p.description}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="api-doc-section-label">REQUEST BODY</h4>
                        <p className="api-no-body-note">None specified in the collection for this request.</p>
                      </>
                    )}
                  </div>

                  {/* ========================================================
                      RESPONSES SECTION
                      ======================================================== */}
                  <div className="api-doc-section-block" id="section-responses">
                    <h4 className="api-doc-section-label">RESPONSES</h4>

                    {/* Status Code Pills (200 OK, 401, 422) */}
                    <div className="api-response-pills-row" role="tablist" aria-label="Response status codes">
                      {currentApi.responses.map((r) => {
                        const isActive = r.status === activeResponseStatus;
                        return (
                          <button
                            key={r.status}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`api-response-pill-btn ${isActive ? "active" : ""}`}
                            onClick={() => setActiveResponseStatus(r.status)}
                          >
                            {r.status}
                          </button>
                        );
                      })}
                    </div>

                    {/* Dark Code Box for Response Body */}
                    <div className="api-response-code-box">
                      <pre className="api-response-pre">
                        <code>{activeResponseObj.body}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Note Section if present */}
                  {currentApi.note && (
                    <div className="api-doc-section-block api-note-block">
                      <h4 className="api-doc-section-label">NOTE</h4>
                      <p className="api-note-text-content">{currentApi.note}</p>
                    </div>
                  )}
                </article>
              </main>

              {/* ============================================================
                  COLUMN 3: RIGHT SIDEBAR (ON THIS PAGE + CODE SNIPPET CARD)
                  ============================================================ */}
              <aside className="api-right-column" aria-label="Code and Page Navigation">
                {/* On This Page Nav */}
                <div className="api-on-this-page-box">
                  <span className="api-on-this-page-label">ON THIS PAGE</span>
                  <nav className="api-on-this-page-nav" aria-label="On this page navigation">
                    <button
                      type="button"
                      className={`api-on-this-page-link ${activeOnPageSection === "headers" ? "active" : ""}`}
                      onClick={() => scrollToAnchor("section-headers", "headers")}
                    >
                      Headers
                    </button>
                    <button
                      type="button"
                      className={`api-on-this-page-link ${activeOnPageSection === "request-body" ? "active" : ""}`}
                      onClick={() => scrollToAnchor("section-request-body", "request-body")}
                    >
                      Request body
                    </button>
                    <button
                      type="button"
                      className={`api-on-this-page-link ${activeOnPageSection === "responses" ? "active" : ""}`}
                      onClick={() => scrollToAnchor("section-responses", "responses")}
                    >
                      Responses
                    </button>
                  </nav>
                </div>

                {/* Dark Code Card */}
                <div className="api-dark-code-card">
                  {/* Language Selector Tabs */}
                  <div className="api-code-lang-tabs" role="tablist" aria-label="Programming language">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={langTab === "curl"}
                      className={`api-lang-tab-btn ${langTab === "curl" ? "active" : ""}`}
                      onClick={() => setLangTab("curl")}
                    >
                      cURL
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={langTab === "js"}
                      className={`api-lang-tab-btn ${langTab === "js" ? "active" : ""}`}
                      onClick={() => setLangTab("js")}
                    >
                      JS
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={langTab === "python"}
                      className={`api-lang-tab-btn ${langTab === "python" ? "active" : ""}`}
                      onClick={() => setLangTab("python")}
                    >
                      Python
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={langTab === "http"}
                      className={`api-lang-tab-btn ${langTab === "http" ? "active" : ""}`}
                      onClick={() => setLangTab("http")}
                    >
                      HTTP
                    </button>
                  </div>

                  {/* Code Snippet Box */}
                  <div className="api-dark-code-content">
                    <pre className="api-dark-code-pre">
                      <code>{currentApi.codeSnippets[langTab] || currentApi.codeSnippets.curl}</code>
                    </pre>
                  </div>

                  {/* Copy Code Button */}
                  <div className="api-dark-code-footer">
                    <button
                      type="button"
                      className={`api-copy-code-full-btn ${copiedCode ? "copied" : ""}`}
                      onClick={handleCopyCode}
                    >
                      {copiedCode ? (
                        <>
                          <Icon name="check" size={14} /> Copied!
                        </>
                      ) : (
                        "Copy code"
                      )}
                    </button>
                  </div>
                </div>

                {/* Subtitle / Helper note below code box */}
                <p className="api-code-card-subtext">
                  Replace the placeholders with your own values.
                </p>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
