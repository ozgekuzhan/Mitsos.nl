// Mobiel menu
const menuBtn = document.querySelector(".menu-btn");
const mobileNav = document.getElementById("mobile-nav");
menuBtn.addEventListener("click", () => {
  const open = mobileNav.hidden;
  mobileNav.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
});
mobileNav.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    mobileNav.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Carrousels
document.querySelectorAll(".carousel").forEach((car) => {
  const track = car.querySelector(".track");
  const slides = track.children.length;
  const dots = car.querySelector(".dots");
  for (let i = 0; i < slides; i++) dots.append(document.createElement("span"));
  const current = () => Math.round(track.scrollLeft / track.clientWidth);
  const paint = () => [...dots.children].forEach((d, i) => d.classList.toggle("on", i === current()));
  const go = (dir) => {
    const next = (current() + dir + slides) % slides;
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  };
  car.querySelector(".prev").addEventListener("click", () => go(-1));
  car.querySelector(".next").addEventListener("click", () => go(1));
  track.addEventListener("scroll", paint, { passive: true });
  paint();
});

// Kleurwisselaar: terrakota of geel (alleen voor het ontwerp)
const root = document.documentElement;
const setAccent = (name) => {
  if (name === "geel") root.dataset.accent = "geel";
  else delete root.dataset.accent;
  document.querySelectorAll(".switcher button").forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.accent === (name || "terra")))
  );
  try { localStorage.setItem("mitsos-accent", name); } catch (e) {}
};
document.querySelectorAll(".switcher button").forEach((b) =>
  b.addEventListener("click", () => setAccent(b.dataset.accent))
);
let saved = "terra";
try { saved = localStorage.getItem("mitsos-accent") || "terra"; } catch (e) {}
setAccent(saved);

document.getElementById("year").textContent = new Date().getFullYear();
