import { Socials } from "@/types/Info";
import { FaXTwitter, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa6";
export const social: Socials[] = [
  // {
  //   name: "x",
  //   icon: FaXTwitter,
  //   url: "",
  // },
  {
    name: "git",
    icon: FaGithub,
    url: "https://www.github.com/nortoncj",
  },
  {
    name: "youtube",
    icon: FaYoutube,
    url: "https://www.youtube.com/@chrisnortonjr",
  },
  {
    name: "linkedin",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/chrisnortonjr/",
  },
];

export const email = () => {
  if (typeof window !== "undefined") {
    window.open("mailto:contact@chrisnortonjr.com");
  }
};

export const CV = () => {
  if (typeof window !== "undefined") {
    window.open(
      "https://docs.google.com/document/d/16Cp_Q5bbbjoZqqiHHOPIa31t2y3S4b2StQtIFcnjrFY/edit?usp=drive_link",
    );
  }
};