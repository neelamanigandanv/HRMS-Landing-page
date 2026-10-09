import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import {
  productNavItems,
  solutionsNavItems,
  resourcesNavItems,
  NavLinkItem,
} from "../../data/navigationData";

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileExpandedSection(null);
  }, [location.pathname]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleDropdown = (menuName: string) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const toggleMobileSection = (section: string) => {
    setMobileExpandedSection((prev) => (prev === section ? null : section));
  };

  const isCurrentActive = (prefix: string) => {
    if (prefix === "/" && location.pathname === "/") return true;
    if (prefix !== "/" && location.pathname.startsWith(prefix)) return true;
    return false;
  };

  return (
    <header className="navbar" ref={navRef}>
      <div className="container-wide nav-inner">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="nav-links-desktop" aria-label="Main Navigation">
          <Link
            to="/"
            className={`nav-link-item ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>

          {/* Product Dropdown */}
          <div
            className={`nav-dropdown-wrapper ${activeMenu === "product" ? "is-open" : ""}`}
            onMouseEnter={() => setActiveMenu("product")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              type="button"
              className={`nav-link-item dropdown-trigger ${isCurrentActive("/product") || isCurrentActive("/features") ? "active" : ""}`}
              onClick={() => toggleDropdown("product")}
              aria-expanded={activeMenu === "product"}
              aria-haspopup="true"
            >
              <span>Product</span>
              <Icon name="chevron" size={14} className="dropdown-caret" />
            </button>

            {activeMenu === "product" && (
              <div className="mega-menu mega-menu-wide" role="menu">
                <div className="mega-menu-header">
                  <div>
                    <strong>LattiumHR Product Suite</strong>
                    <p>Modular, connected workforce tools designed for multi-branch companies.</p>
                  </div>
                  <Link to="/product" className="mega-overview-btn">
                    View Product Overview <Icon name="arrow" size={14} />
                  </Link>
                </div>

                <div className="mega-grid-features">
                  {productNavItems.map((item: NavLinkItem) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="mega-item"
                      role="menuitem"
                    >
                      <span className="mega-icon-box">
                        <Icon name={item.icon || "check"} size={17} />
                      </span>
                      <div className="mega-text">
                        <div className="mega-title-row">
                          <strong>{item.title}</strong>
                          {item.badge && <span className="mini-badge">{item.badge}</span>}
                        </div>
                        <small>{item.desc}</small>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            className={`nav-dropdown-wrapper ${activeMenu === "solutions" ? "is-open" : ""}`}
            onMouseEnter={() => setActiveMenu("solutions")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              type="button"
              className={`nav-link-item dropdown-trigger ${isCurrentActive("/solutions") ? "active" : ""}`}
              onClick={() => toggleDropdown("solutions")}
              aria-expanded={activeMenu === "solutions"}
              aria-haspopup="true"
            >
              <span>Solutions</span>
              <Icon name="chevron" size={14} className="dropdown-caret" />
            </button>

            {activeMenu === "solutions" && (
              <div className="mega-menu mega-menu-solutions" role="menu">
                <div className="mega-menu-header">
                  <div>
                    <strong>Tailored HR Solutions</strong>
                    <p>Tailored configurations built for your business stage and role.</p>
                  </div>
                  <Link to="/solutions" className="mega-overview-btn">
                    All Solutions <Icon name="arrow" size={14} />
                  </Link>
                </div>

                <div className="mega-grid-solutions">
                  {solutionsNavItems.map((item: NavLinkItem) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="mega-item"
                      role="menuitem"
                    >
                      <span className="mega-icon-box">
                        <Icon name={item.icon || "branch"} size={17} />
                      </span>
                      <div className="mega-text">
                        <div className="mega-title-row">
                          <strong>{item.title}</strong>
                          {item.badge && <span className="mini-badge orange">{item.badge}</span>}
                        </div>
                        <small>{item.desc}</small>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div
            className={`nav-dropdown-wrapper ${activeMenu === "resources" ? "is-open" : ""}`}
            onMouseEnter={() => setActiveMenu("resources")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              type="button"
              className={`nav-link-item dropdown-trigger ${isCurrentActive("/resources") || isCurrentActive("/help") || isCurrentActive("/support") ? "active" : ""}`}
              onClick={() => toggleDropdown("resources")}
              aria-expanded={activeMenu === "resources"}
              aria-haspopup="true"
            >
              <span>Resources</span>
              <Icon name="chevron" size={14} className="dropdown-caret" />
            </button>

            {activeMenu === "resources" && (
              <div className="mega-menu mega-menu-resources" role="menu">
                <div className="mega-menu-header">
                  <div>
                    <strong>Knowledge & Customer Support</strong>
                    <p>Compliance guides, glossary terms, help documentation, and direct support.</p>
                  </div>
                  <Link to="/resources" className="mega-overview-btn">
                    Resources Overview <Icon name="arrow" size={14} />
                  </Link>
                </div>

                <div className="mega-grid-resources">
                  {resourcesNavItems.map((item: NavLinkItem) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="mega-item"
                      role="menuitem"
                    >
                      <span className="mega-icon-box">
                        <Icon name={item.icon || "book-open"} size={17} />
                      </span>
                      <div className="mega-text">
                        <div className="mega-title-row">
                          <strong>{item.title}</strong>
                          {item.badge && <span className="mini-badge">{item.badge}</span>}
                        </div>
                        <small>{item.desc}</small>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className={`nav-link-item ${location.pathname === "/about" ? "active" : ""}`}
          >
            About Us
          </Link>
        </nav>

        {/* CTA Actions */}
        <div className="nav-actions">
          <Button to="/request-demo" className="nav-primary-cta">
            Request a Demo <Icon name="arrow" size={16} />
          </Button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <Icon name={mobileOpen ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="mobile-drawer-overlay">
          <div className="mobile-drawer-content">
            <div className="mobile-drawer-links">
              <Link to="/" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                Home
              </Link>

              {/* Mobile Product Accordion */}
              <div className="mobile-nav-accordion">
                <button
                  type="button"
                  className="mobile-accordion-btn"
                  onClick={() => toggleMobileSection("product")}
                >
                  <span>Product</span>
                  <Icon
                    name="chevron"
                    size={16}
                    className={mobileExpandedSection === "product" ? "rotate-180" : ""}
                  />
                </button>
                {mobileExpandedSection === "product" && (
                  <div className="mobile-sublinks">
                    <Link to="/product" className="mobile-sublink overview-link">
                      Product Overview
                    </Link>
                    {productNavItems.slice(1).map((item) => (
                      <Link key={item.href} to={item.href} className="mobile-sublink">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Solutions Accordion */}
              <div className="mobile-nav-accordion">
                <button
                  type="button"
                  className="mobile-accordion-btn"
                  onClick={() => toggleMobileSection("solutions")}
                >
                  <span>Solutions</span>
                  <Icon
                    name="chevron"
                    size={16}
                    className={mobileExpandedSection === "solutions" ? "rotate-180" : ""}
                  />
                </button>
                {mobileExpandedSection === "solutions" && (
                  <div className="mobile-sublinks">
                    <Link to="/solutions" className="mobile-sublink overview-link">
                      Solutions Overview
                    </Link>
                    {solutionsNavItems.slice(1).map((item) => (
                      <Link key={item.href} to={item.href} className="mobile-sublink">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Resources Accordion */}
              <div className="mobile-nav-accordion">
                <button
                  type="button"
                  className="mobile-accordion-btn"
                  onClick={() => toggleMobileSection("resources")}
                >
                  <span>Resources</span>
                  <Icon
                    name="chevron"
                    size={16}
                    className={mobileExpandedSection === "resources" ? "rotate-180" : ""}
                  />
                </button>
                {mobileExpandedSection === "resources" && (
                  <div className="mobile-sublinks">
                    {resourcesNavItems.map((item) => (
                      <Link key={item.href} to={item.href} className="mobile-sublink">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/about" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                About Us
              </Link>
            </div>

            <div className="mobile-drawer-cta">
              <Button to="/request-demo" className="btn-full">
                Request a Demo <Icon name="arrow" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
