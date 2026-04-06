"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import "@css/styles.css";
import { FaBars, FaMoon } from "react-icons/fa6";
import Logo from "@images/logo2.png";
import Image from "next/image";
import Link from "next/link";
import ThemeChanger from "./themeChanger";

function MainHeader() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        btnRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header>
      <nav className="top-nav lightGlass dark:darkGlass">
        <div className="top-nav_left">
          <a className="logo-link flex items-center" href="/">
            <Image
              alt="Chris Norton JR Engineer"
              className="w-12 h-12 p-0"
              src={Logo}
            />{" "}
            {/* Chris Norton JR */}
          </a>
        </div>
        <div className="top_nav_middle">
          <Link className="nav-link" href="#skills">
            Skills
          </Link>
          <Link className="nav-link" href="#about">
            About
          </Link>
          <Link className="nav-link" href="#projects">
            Projects
          </Link>
          <Link className="nav-link" href="#insights">
            Insights
          </Link>
          <Link className="nav-link" href="#contact">
            Contact
          </Link>
        </div>
        <div className="top_nav_right">
          <ThemeChanger />
        </div>
      </nav>
      <nav className="mobile-nav lightGlass dark:darkGlass">
        <div className="mobile-nav_left">
          <Link className="logo-link" href="/">
            <Image
              alt="Chris Norton JR Systems Engineer"
              className="w-12 h-12 p-0"
              src={Logo}
            />
          </Link>
        </div>
        <button
          id="menuBtn"
          ref={btnRef}
          onClick={toggleMenu}
          className="mobile-nav_right bg-transparent border-0"
        >
          <FaBars className="nav-link" />
        </button>
        <div className="mobile-nav_right">
          <ThemeChanger />
        </div>
      </nav>
      <div
        id="mobileMenu"
        ref={menuRef}
        className={`mobile-menu lightGlass glow-pulse ${open ? "mobile-active" : ""}`}
      >
        <Link className="mobile-menu-link" href="#skills">
          Skills
        </Link>
        <Link className="mobile-menu-link" href="#about">
          About
        </Link>
        <Link className="mobile-menu-link" href="#projects">
          Projects
        </Link>
        <Link className="mobile-menu-link" href="#insights">
          Insights
        </Link>
        <Link className="mobile-menu-link" href="#contact">
          Contact
        </Link>
      </div>
    </header>
  );
}

export default MainHeader;
