import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
import Icon from "../ui/Icon";
import { footerColumns } from "../../data/navigationData";

export function Footer() {
  const handleOpenCookiePreferences = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
  };

  return (
    <footer id="footer">
      <div className="container-wide footer-top">
        <div className="footer-brand">
          <Logo light />
          <p>
            Connected, simple, and compliant HR software built for ambitious businesses with multiple branches.
          </p>
          <div className="socials" aria-label="Social media links">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Icon name="linkedin" size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              title="Twitter / X"
            >
              <Icon name="twitter" size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <Icon name="instagram" size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <Icon name="facebook" size={20} />
            </a>
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title} className="footer-column">
            <strong>{col.title}</strong>
            {col.links.map((link) => (
              <Link key={link.href} to={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="container-wide footer-bottom">
        <span>© {new Date().getFullYear()} LattiumHR Technologies Pvt. Ltd. All rights reserved.</span>
        <div className="footer-bottom-links">
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms-of-service">Terms</Link>
          <Link to="/security">Security</Link>
          <button
            type="button"
            className="footer-cookie-btn"
            onClick={handleOpenCookiePreferences}
          >
            Cookie Preferences
          </button>
        </div>
        <em>Built for global & multi-branch teams</em>
      </div>
    </footer>
  );
}

export default Footer;
