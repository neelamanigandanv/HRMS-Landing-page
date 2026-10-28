import { Link, useNavigate } from "react-router-dom";

export function Logo({ light = false }: { light?: boolean }) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <Link to="/" onClick={handleClick} className={`logo ${light ? "logo-light" : ""}`} aria-label="nuvendix home">
      <span className="logo-text nuvendix-logo">
        nuvendix
      </span>
    </Link>
  );
}

export default Logo;
