import React, { useEffect, useState } from "react";
import { FaMoon} from "react-icons/fa6";
import { MdSunny } from "react-icons/md";

function ThemeChanger() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []); // <-- important

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter =
          " grayscale(0%) brightness(1.8) drop-shadow(0 3px 8px rgba(255, 139, 162, 0.6))";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "brightness(1)";
      }}
      className="theme-toggle-btn"
    >
      {theme === "light" ? <FaMoon /> : <MdSunny color="white" />}{" "}
    </button>
  );
}

export default ThemeChanger;
