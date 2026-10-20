// Nederlands staat in de HTML; hier alleen de Engelse vertaling per tekst
const EN = {
  // Navigatie
  "Traiteur": "Deli",
  "Bezoek": "Visit",
  "Bestellen": "Order",
  "Bezoek & bestellen": "Visit & order",
  "Mitsos, naar boven": "Mitsos, back to top",
  "Menu openen": "Open menu",
  "Hoofdmenu": "Main menu",

  // Hero
  "Griekse traiteur · Amsterdam": "Greek deli · Amsterdam",
  "Huisgemaakt Grieks,": "Homemade Greek,",
  "elke dag vers.": "fresh every day.",
  "Moussaka, spanakopita, meze en gyros. Sinds 1996 koken we in de Hugo de Grootstraat zoals we het thuis doen.":
    "Moussaka, spanakopita, meze and gyros. Since 1996 we have been cooking on Hugo de Grootstraat the way we do at home.",
  "Bekijk de vitrine": "See what's in store",
  "Sinds 1996": "Since 1996",
  "Catering op maat": "Tailor-made catering",
  "Vandaag in de vitrine": "In the display today",

  // Aanbod
  "Drie manieren om": "Three ways to",
  "bij ons": "eat",
  "te eten": "with us",
  "Vers uit de vitrine": "Fresh from the display",
  "Aan de blauwe tafeltjes": "At the blue tables",
  "Voor elk gezelschap": "For every occasion",

  // Traiteur
  "De vitrine,": "The display,",
  "elke ochtend": "freshly filled",
  "opnieuw gevuld": "every morning",
  "Ovenschotels, gevulde groenten, salades en meze. Alles wordt bij ons in de keuken gemaakt, met olijfolie, oregano en de recepten van de familie.":
    "Oven dishes, stuffed vegetables, salads and meze. Everything is made in our own kitchen, with olive oil, oregano and family recipes.",
  "Bekijk het menu": "View the menu",
  "Vorige foto": "Previous photo",
  "Volgende foto": "Next photo",

  // Eat in
  "Even zitten,": "Sit down,",
  "of mee naar huis": "or take it home",
  "Neem plaats aan een van onze blauwe tafeltjes op de stoep, of laat je bord inpakken. Pita gyros en souvlaki maken we terwijl je wacht.":
    "Grab a seat at one of our blue tables on the pavement, or have your food packed to go. Pita gyros and souvlaki are made while you wait.",
  "Bestel om af te halen": "Order for pick-up",

  // Catering
  "Een Grieks buffet": "A Greek buffet",
  "voor jouw gasten": "for your guests",
  "Op kantoor, op een verjaardag of op een bruiloft. We verzorgen catering voor kleine en grote gezelschappen in Amsterdam en omgeving.":
    "At the office, a birthday or a wedding. We cater for small and large groups in Amsterdam and the surrounding area.",
  "Vertel ons over je feest": "Tell us about your event",
  "Datum, aantal gasten en wensen.": "Date, number of guests and wishes.",
  "We stellen het menu samen": "We put the menu together",
  "Meze, ovenschotels, salades en zoet, op maat van je budget.": "Meze, oven dishes, salads and sweets, tailored to your budget.",
  "Wij koken, jij geniet": "We cook, you enjoy",
  "Ophalen bij de winkel of laten bezorgen.": "Pick up at the shop or have it delivered.",
  "Offerte aanvragen": "Request a quote",
  "Cateringmenu": "Catering menu",

  // Bezoek
  "Open de locatie in Google Maps": "Open the location in Google Maps",
  "Kom langs": "Come by",
  "Adres": "Address",
  "Open": "Opening hours",
  "Telefoon": "Phone",
  "ma–za 00:00–00:00": "Mon–Sat 00:00–00:00",
  "zo gesloten": "Sun closed",
  "Route plannen": "Get directions",
  "Route plannen ↗": "Get directions ↗",

  // Footer
  "Griekse traiteur in Amsterdam sinds 1996. Take away, eat in en catering.": "Greek deli in Amsterdam since 1996. Take away, eat in and catering.",
  "Ons verhaal": "Our story",
  "Voorwaarden": "Terms",

  // Foto's
  "Griekse meze op een gedekte tafel": "Greek meze on a set table",
  "Schalen met Griekse gerechten": "Bowls of Greek dishes",
  "Pita gyros met tomaat": "Pita gyros with tomato",
  "Gedekte tafel met meze": "Table set with meze",
  "Moussaka op een bord": "Moussaka on a plate",
  "Dolmades, gevulde wijnbladeren": "Dolmades, stuffed vine leaves",
  "Pastitsio op een bord": "Pastitsio on a plate",
  "Griekse salade": "Greek salad",
  "Souvlaki spiesen": "Souvlaki skewers",
  "Buffet met Griekse meze": "Buffet with Greek meze",
  "Borrelplank met kaas, ham en olijven": "Platter with cheese, ham and olives",
  "Hapjes op een dienblad tijdens een walking dinner": "Bites on a tray at a walking dinner",
  "Foto volgt": "Photo coming soon",

  // Pagina
  "Mitsos, Griekse traiteur in Amsterdam sinds 1996. Take away, eat in en catering.": "Mitsos, Greek deli in Amsterdam since 1996. Take away, eat in and catering."
};

const ATTRS = ["alt", "aria-label"];
const textNodes = [];
const attrNodes = [];
const meta = document.querySelector('meta[name="description"]');

// Onthoud de Nederlandse tekst van alles wat een vertaling heeft
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const node = walker.currentNode;
  const key = node.nodeValue.trim();
  if (EN[key]) textNodes.push({ node, nl: node.nodeValue, en: node.nodeValue.replace(key, EN[key]) });
}
document.querySelectorAll(ATTRS.map((a) => `[${a}]`).join(",")).forEach((el) => {
  ATTRS.forEach((a) => {
    const nl = el.getAttribute(a);
    if (nl && EN[nl]) attrNodes.push({ el, a, nl, en: EN[nl] });
  });
});
const metaNl = meta.content;

const langBtn = document.querySelector(".lang");

function setLang(lang) {
  const en = lang === "en";
  textNodes.forEach((t) => { t.node.nodeValue = en ? t.en : t.nl; });
  attrNodes.forEach((t) => t.el.setAttribute(t.a, en ? t.en : t.nl));
  meta.content = en ? EN[metaNl] : metaNl;
  document.documentElement.lang = lang;
  langBtn.textContent = en ? "NL" : "EN";
  langBtn.setAttribute("aria-label", en ? "Bekijk de site in het Nederlands" : "View the site in English");
  langBtn.lang = en ? "nl" : "en";

  const url = new URL(location.href);
  if (en) url.searchParams.set("lang", "en"); else url.searchParams.delete("lang");
  try { history.replaceState(null, "", url); } catch (e) {}
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

// Volgorde: ?lang= in de link, eerdere keuze, anders de taal van de browser
function startLang() {
  const param = new URLSearchParams(location.search).get("lang");
  if (param === "en" || param === "nl") return param;
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "nl") return saved;
  } catch (e) {}
  return (navigator.language || "nl").toLowerCase().startsWith("nl") ? "nl" : "en";
}

langBtn.addEventListener("click", () => setLang(document.documentElement.lang === "en" ? "nl" : "en"));
setLang(startLang());
