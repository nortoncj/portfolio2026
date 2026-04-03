import React, { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa6";

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
    <button onClick={toggleTheme}>
      {theme === "light" ? <FaMoon /> : <CiLight color="white" />}{" "}
    </button>
  );
}

export default ThemeChanger;
