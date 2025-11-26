import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const loc = useLocation();
  const [date, setDate] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const goToDate = (e) => {
    e.preventDefault();
    if (!date) return;
    navigate(`/detail/${date}`);
    setDate("");
  };

  return (
    <header className="nav">
      <div className="nav__left"> {/* 🚀 */}
        <Link className="brand" to="/">  NASA APOD</Link>
        <nav className="nav__links">
          <Link className={loc.pathname === "/" ? "active" : ""} to="/">Today</Link>
          <Link className={loc.pathname.startsWith("/gallery") ? "active" : ""} to="/gallery">Gallery</Link>
        </nav>
      </div>

      <form className="nav__date" onSubmit={goToDate}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-label="Pick date"
        />
        <button className="btn" type="submit" disabled={!date}>Go</button>
      </form>

      <button
        className="btn btn--ghost"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
}
