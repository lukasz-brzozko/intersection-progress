import showScrollProgress from "./showScrollProgress";

import "./style.css";

const section = document.querySelector(".section-2");

const clb = ({ el, progress }) => {
  el.style.opacity = 1 - progress;
};

showScrollProgress(section, clb);
