const PLAYLISTS = [
  ["PL--HRC4VtTkV2eFNCjkaCCVSY4Ah9acp5", "Marathi Tenses", "⏳"],
  ["PL--HRC4VtTkVUo_BfKQSXWihEWhxt7OfD", "Daily Used Sentences", "💬"],
  ["PL--HRC4VtTkXCXTTjg-o1wlMivQNFHI57", "Marathi Vocabulary", "📚"],
  ["PL--HRC4VtTkWHZienc_GqP_GopZly1Zxt", "Marathi Conversations", "🗣️"],
  ["PL--HRC4VtTkXKjjDk2Md6SKshAZNXaYsD", "Chat Conversations", "📱"],
  ["PL--HRC4VtTkUKzGNiINu6Odzu2R-PA2hx", "Marathi Verbs", "🏃"],
  ["PL--HRC4VtTkWe0GO8PXgPshx07Mj37RMm", "Marathi Pronouns", "👤"],
  ["PL--HRC4VtTkXZSDMWokYnrk4eWz3iAJk6", "Prepositions", "📍"],
  ["PL--HRC4VtTkVzy5wcODTXOKVn8kmLJYvS", "Marathi vs Hindi Words", "🔤"],
  ["PL--HRC4VtTkUv38euh5L160yv4Wplyqmy", "Panchatantra Stories", "🦊"],
  ["PL--HRC4VtTkV-Dv5R6I7xqLytu8Mc7yYn", "Essays / Nibandh", "✍️"],
  ["PL--HRC4VtTkWE38oYs1V4rH3t-bCUPC9r", "Marathi News", "📰"],
  ["PL--HRC4VtTkUHifYQsvsZMwn0-7s6hT8-", "Songs in Marathi", "🎵"],
  ["PL--HRC4VtTkXXg7c6j1p7r4V8Xcq_lcay", "YouTube Live", "🔴"],
  ["PL--HRC4VtTkVhfDKA8lk8Ah9TF9G5CovN", "Miscellaneous", "✨"],
];

const PHRASES = [
  ["नमस्कार", "Namaskar", "Hello"],
  ["तुम्ही कसे आहात?", "Tumhi kase aahat?", "How are you?"],
  ["मी ठीक आहे", "Mi theek aahe", "I am fine"],
  ["माझं नाव … आहे", "Maza naav … aahe", "My name is …"],
  ["धन्यवाद", "Dhanyavaad", "Thank you"],
  ["हो / नाही", "Ho / Nahi", "Yes / No"],
  ["काय चाललंय?", "Kay chaalalay?", "What's going on?"],
  ["मला मराठी येते", "Mala Marathi yete", "I know Marathi"],
];

const $ = (s) => document.querySelector(s);
$("#playlistGrid").innerHTML = PLAYLISTS.map(([id, name, icon]) =>
  `<a class="pl" href="https://www.youtube.com/playlist?list=${id}" target="_blank" rel="noopener"><span>${icon}</span>${name}</a>`).join("");

$("#phraseGrid").innerHTML = PHRASES.map(([mr, roman, en]) => `
  <button class="ph-card" aria-label="${en}"><div class="ph-inner">
    <div class="ph-face"><b>${mr}</b><small>${roman}</small></div>
    <div class="ph-face ph-back">${en}</div>
  </div></button>`).join("");
$("#phraseGrid").addEventListener("click", (e) => e.target.closest(".ph-card")?.classList.toggle("flipped"));

$("#year").textContent = new Date().getFullYear();

// ---------- animations ----------
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Floating Marathi letters behind the hero
const letters = "अआइईउऊएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशसहळक्षज्ञ";
$(".letters").innerHTML = calm ? "" : Array.from({ length: 22 }, () => {
  const ch = letters[Math.floor(Math.random() * letters.length)];
  return `<span style="left:${Math.random() * 100}%;font-size:${1.5 + Math.random() * 3}rem;animation-duration:${12 + Math.random() * 14}s;animation-delay:-${Math.random() * 20}s">${ch}</span>`;
}).join("");

// Rotating headline word
const words = ["simple", "easy", "fun", "सोपा"];
let wi = 0;
if (!calm) setInterval(() => {
  const w = $("#word");
  w.classList.add("out");
  setTimeout(() => { wi = (wi + 1) % words.length; w.textContent = words[wi]; w.classList.remove("out"); }, 350);
}, 2500);

// Count-up stats
document.querySelectorAll("[data-count]").forEach((el) => {
  if (calm) return;
  const end = +el.dataset.count, dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || "", t0 = performance.now();
  const tick = (t) => {
    const p = Math.min((t - t0) / 1600, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = (end * e).toFixed(dec) + suf;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

// Reveal on scroll, staggered within each grid
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll(".section h2, .section .sub, .pl, .ph-card, .about > *").forEach((el) => {
  const i = [...el.parentElement.children].indexOf(el);
  el.style.setProperty("--d", `${Math.min(i, 10) * 0.06}s`);
  el.classList.add("reveal");
  io.observe(el);
});
