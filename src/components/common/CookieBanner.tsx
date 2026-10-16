import { useEffect, useState } from "react";
import Icon from "../ui/Icon";
import Button from "../ui/Button";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
}

const STORAGE_KEY = "lattium_cookie_preferences";

export function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    // Read saved preferences if any
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch {
        // fallback
      }
    }

    // Always show cookie banner when visitor enters or hard-refreshes the page
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 350);

    const handleOpenModal = () => {
      setShowModal(true);
    };

    const handleForceOpenBanner = () => {
      setIsOpen(true);
    };

    window.addEventListener("open-cookie-preferences", handleOpenModal);
    window.addEventListener("open-cookie-banner", handleForceOpenBanner);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-cookie-preferences", handleOpenModal);
      window.removeEventListener("open-cookie-banner", handleForceOpenBanner);
    };
  }, []);

  const handleAcceptAll = () => {
    const updated = { essential: true, analytics: true, functional: true };
    setPreferences(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setIsOpen(false);
    setShowModal(false);
  };

  const handleRejectNonEssential = () => {
    const updated = { essential: true, analytics: false, functional: false };
    setPreferences(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setIsOpen(false);
    setShowModal(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    setIsOpen(false);
    setShowModal(false);
  };

  return (
    <>
      {isOpen && !showModal && (
        <div className="cookie-banner" role="region" aria-label="Cookie consent banner">
          <div className="cookie-banner-inner">
            <div className="cookie-text">
              <div className="cookie-icon-wrapper" aria-hidden="true">
                <Icon name="shield" size={18} className="cookie-icon" />
              </div>
              <p>
                We use strictly necessary cookies to ensure LattiumHR functions correctly. With your
                consent, we also use optional analytics cookies to measure site performance and enhance your experience. Read our{" "}
                <a href="/cookie-policy" className="cookie-link">
                  Cookie Policy
                </a>.
              </p>
            </div>
            <div className="cookie-actions">
              <button
                type="button"
                className="cookie-btn-pref"
                onClick={() => setShowModal(true)}
              >
                Preferences
              </button>
              <button
                type="button"
                className="cookie-btn-essential"
                onClick={handleRejectNonEssential}
              >
                Essential Only
              </button>
              <button
                type="button"
                className="cookie-btn-accept"
                onClick={handleAcceptAll}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="cookie-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="cookie-modal-card">
            <div className="cookie-modal-header">
              <h3 id="cookie-modal-title">Cookie Preferences</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <p className="cookie-modal-intro">
              Manage your cookie preferences below. Essential cookies are mandatory for security, authentication, and core functionality.
            </p>

            <div className="cookie-options-list">
              <div className="cookie-option-item">
                <div className="cookie-option-info">
                  <strong>Strictly Necessary Cookies</strong>
                  <p>Required for platform security, form submissions, session tracking, and routing.</p>
                </div>
                <div className="cookie-toggle locked">
                  <span>Always Active</span>
                </div>
              </div>

              <div className="cookie-option-item">
                <div className="cookie-option-info">
                  <strong>Performance & Analytics</strong>
                  <p>Helps us understand visitor traffic patterns and navigation paths without personal identifiers.</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                    }
                  />
                  <span className="slider" />
                </label>
              </div>

              <div className="cookie-option-item">
                <div className="cookie-option-info">
                  <strong>Functional Cookies</strong>
                  <p>Remembers custom settings such as team size inputs and notification preferences.</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, functional: e.target.checked }))
                    }
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>

            <div className="cookie-modal-footer">
              <Button secondary onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveCustom}>Save Preferences</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CookieBanner;
