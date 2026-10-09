import { Link } from "react-router-dom";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`logo ${light ? "logo-light" : ""}`} aria-label="LattiumHR home">
      <span className="logo-mark">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6.5" fill="var(--indigo)" />
          <rect x="5.5" y="5.5" width="5" height="5" rx="1.5" fill="white" />
          <rect x="13.5" y="5.5" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.8" />
          <rect x="5.5" y="13.5" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.8" />
          <rect x="13.5" y="13.5" width="5" height="5" rx="1.5" fill="white" />
        </svg>
      </span>
      <span className="logo-text">
        Lattium<span>HR</span>
      </span>
    </Link>
  );
}

export default Logo;
