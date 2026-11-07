import { Link, useNavigate } from "react-router-dom";

export interface LogoProps {
  light?: boolean;
  className?: string;
  height?: number;
}

export function Logo({ light = false, className = "", height }: LogoProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const logoSrc = light ? "/images/logo-white.webp" : "/images/logo.webp";

  return (
    <Link
      to="/"
      onClick={handleClick}
      className={`logo ${light ? "logo-light" : ""} ${className}`.trim()}
      aria-label="zentilos home"
    >
      <img
        src={logoSrc}
        alt="zentilos"
        className="logo-img"
        width={1024}
        height={269}
        decoding="async"
        style={height ? { height: `${height}px` } : undefined}
      />
    </Link>
  );
}

export default Logo;
