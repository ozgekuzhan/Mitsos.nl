const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Zacht scrollen met Lenis (niet bij 'minder beweging')
if (window.Lenis && !reduceMotion) {
  const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -96 } });
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

// Mobiel menu
const menuBtn = document.querySelector(".menu-btn");
const sheet = document.getElementById("sheet");
menuBtn.addEventListener("click", () => {
  const open = sheet.hidden;
  sheet.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
});
sheet.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    sheet.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Carrousels
document.querySelectorAll(".carousel").forEach((car) => {
  const track = car.querySelector(".track");
  const slides = [...track.children];
  const dots = car.querySelector(".dots");
  slides.forEach(() => dots.append(document.createElement("span")));
  const step = () => slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
  const current = () => Math.min(slides.length - 1, Math.round(track.scrollLeft / step()));
  const paint = () => [...dots.children].forEach((d, i) => d.classList.toggle("on", i === current()));
  const go = (dir) => {
    const next = (current() + dir + slides.length) % slides.length;
    track.scrollTo({ left: next * step(), behavior: reduceMotion ? "auto" : "smooth" });
  };
  car.querySelector(".prev").addEventListener("click", () => go(-1));
  car.querySelector(".next").addEventListener("click", () => go(1));
  track.addEventListener("scroll", paint, { passive: true });
  paint();
});

document.getElementById("year").textContent = new Date().getFullYear();
