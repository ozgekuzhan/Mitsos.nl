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
  track.addEventListener("scroll", paint, { passive: true });
  paint();

  // Automatisch doorschuiven: alleen in beeld, pauze bij aanraken of muis erop
  const DELAY = 4000;
  let timer = null, inView = false, paused = false;
  const stop = () => { clearInterval(timer); timer = null; };
  const start = () => {
    stop();
    if (!reduceMotion && inView && !paused && !document.hidden) timer = setInterval(() => go(1), DELAY);
  };
  const manual = (dir) => { go(dir); start(); };
  car.querySelector(".prev").addEventListener("click", () => manual(-1));
  car.querySelector(".next").addEventListener("click", () => manual(1));
  car.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { paused = true; stop(); } });
  car.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") { paused = false; start(); } });
  track.addEventListener("touchstart", stop, { passive: true });
  track.addEventListener("touchend", start, { passive: true });
  car.addEventListener("focusin", (e) => { if (e.target.matches(":focus-visible")) { paused = true; stop(); } });
  car.addEventListener("focusout", () => { paused = false; start(); });
  document.addEventListener("visibilitychange", start);
  new IntersectionObserver(([e]) => { inView = e.isIntersecting; start(); }, { threshold: 0.4 }).observe(car);
});

// Offerteformulier: zolang er geen server is, opent het de e-mail van de bezoeker met alles ingevuld
const OFFERTE_EMAIL = "info@mitsos.nl";
const form = document.getElementById("offerte-form");
const formMsg = form.querySelector(".form-msg");
const formText = {
  nl: { missing: "Vul de gemarkeerde velden in.", sent: "Je e-mailprogramma opent met je aanvraag. Verstuur die e-mail om de aanvraag af te ronden.", subject: "Cateringaanvraag" },
  en: { missing: "Please fill in the highlighted fields.", sent: "Your email app opens with your request. Send that email to complete the request.", subject: "Catering request" },
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const t = formText[document.documentElement.lang] || formText.nl;
  const fields = [...form.querySelectorAll("input, select, textarea")];
  fields.forEach((f) => f.classList.toggle("invalid", !f.checkValidity()));
  formMsg.hidden = false;
  if (!form.checkValidity()) {
    formMsg.textContent = t.missing;
    form.querySelector(".invalid").focus();
    return;
  }
  const data = new FormData(form);
  const lines = [...form.querySelectorAll(".field")].map((field) => {
    const label = field.querySelector("label, legend").textContent.trim();
    const input = field.querySelector("input:checked, input:not([type=radio]), select, textarea");
    return `${label}: ${data.get(input.name) || "-"}`;
  });
  const subject = `${t.subject} ${data.get("datum")} (${data.get("gasten")})`;
  location.href = `mailto:${OFFERTE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  formMsg.textContent = t.sent;
});
form.addEventListener("input", (e) => e.target.classList.remove("invalid"));

document.getElementById("year").textContent = new Date().getFullYear();
