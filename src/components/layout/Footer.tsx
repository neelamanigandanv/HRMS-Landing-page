import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
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
          <div className="socials" aria-label="Social links">
            <span title="LinkedIn">in</span>
            <span title="Twitter / X">𝕏</span>
            <span title="YouTube">▶</span>
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
