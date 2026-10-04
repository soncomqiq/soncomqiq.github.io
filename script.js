/* ---- Particle network background ---- */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
let mouse = { x: null, y: null };

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function initParticles() {
  const count = Math.min(90, Math.floor((canvas.width * canvas.height) / 16000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.6 + 0.6,
  }));
}
initParticles();

window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener("mouseout", () => { mouse.x = null; mouse.y = null; });

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(120, 160, 255, 0.55)";
    ctx.fill();
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(108, 140, 255, ${0.14 * (1 - dist / 130)})`;
        ctx.stroke();
      }
    }
    if (mouse.x !== null) {
      const dx = particles[i].x - mouse.x;
      const dy = particles[i].y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 180) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(78, 240, 192, ${0.22 * (1 - dist / 180)})`;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();

/* ---- Typing effect ---- */
const phrases = [
  "Advanced Software Engineer @ KBTG",
  "Java · Spring Boot · Microservices",
  "React · Node.js · JavaScript",
  "Instructor & lifelong learner",
  "Published researcher — PLOS ONE",
];
const typedEl = document.getElementById("typed");
let pi = 0, ci = 0, deleting = false;

function type() {
  const phrase = phrases[pi];
  typedEl.textContent = phrase.slice(0, ci);
  if (!deleting) {
    ci++;
    if (ci > phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 55);
  } else {
    ci--;
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
    setTimeout(type, 28);
  }
}
setTimeout(type, 1200);

/* ---- Scroll reveal ---- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), idx * 60);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ---- Nav border on scroll + progress bar ---- */
const nav = document.getElementById("nav");
const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
  const h = document.documentElement;
  progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
});

const finePointer = matchMedia("(pointer: fine)").matches;

function calculateExperienceYears(startYear, startMonth) {
  const now = new Date();
  const start = new Date(startYear, startMonth - 1, 1);
  const monthDiff = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  return Math.max(0, monthDiff / 12);
}

const experienceYears = calculateExperienceYears(2019, 6);
const experienceYearsRounded = Math.floor(experienceYears);
const experienceYearsDisplay = `${experienceYearsRounded}+`;

const experienceCopyEl = document.getElementById("experience-years-copy");
const experienceAboutEl = document.getElementById("experience-years-about");
const experienceJsonEl = document.getElementById("experience-years-json");
const experienceStatEl = document.getElementById("experience-years-stat");

if (experienceCopyEl) experienceCopyEl.textContent = experienceYearsDisplay;
if (experienceAboutEl) experienceAboutEl.textContent = `${experienceYearsRounded} years`;
if (experienceJsonEl) experienceJsonEl.textContent = experienceYearsDisplay;
if (experienceStatEl) experienceStatEl.dataset.target = String(experienceYearsRounded);

/* ---- Custom cursor ---- */
if (finePointer) {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  let cx = -100, cy = -100, rx = -100, ry = -100;
  window.addEventListener("mousemove", (e) => {
    cx = e.clientX; cy = e.clientY;
    dot.style.transform = `translate(${cx}px, ${cy}px)`;
  });
  (function ringLoop() {
    rx += (cx - rx) * 0.16;
    ry += (cy - ry) * 0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(ringLoop);
  })();
  document.querySelectorAll("a, .btn, .skill, .job, .card, .stat").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hovering"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hovering"));
  });
}

/* ---- 3D tilt on cards ---- */
if (finePointer) {
  document.querySelectorAll(".card, .terminal, .stat").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
}

/* ---- Magnetic buttons ---- */
if (finePointer) {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const mx = (e.clientX - r.left - r.width / 2) * 0.25;
      const my = (e.clientY - r.top - r.height / 2) * 0.25;
      btn.style.transform = `translate(${mx}px, ${my}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });
}

/* ---- Click sparks ---- */
const sparkColors = ["#4ef0c0", "#6c8cff", "#c66cff"];
window.addEventListener("click", (e) => {
  for (let i = 0; i < 12; i++) {
    const s = document.createElement("div");
    s.className = "spark";
    s.style.left = e.clientX + "px";
    s.style.top = e.clientY + "px";
    s.style.background = sparkColors[i % 3];
    document.body.appendChild(s);
    const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.4;
    const dist = 36 + Math.random() * 44;
    s.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        { transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`, opacity: 0 },
      ],
      { duration: 450 + Math.random() * 250, easing: "cubic-bezier(0,.5,.5,1)" }
    ).onfinish = () => s.remove();
  }
});

/* ---- Animated stat counters ---- */
const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      counterObs.unobserve(entry.target);
      const el = entry.target;
      const target = Number(el.dataset.target);
      const decimals = Number(el.dataset.decimals || 0);
      const suffix = el.dataset.suffix || "";
      const start = performance.now();
      (function tick(now) {
        const t = Math.min((now - start) / 1400, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = target * eased;
        el.textContent = (decimals > 0 ? value.toFixed(decimals) : Math.round(value)) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      })(start);
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll(".stat-num").forEach((el) => counterObs.observe(el));

/* ---- Learners stat breakdown ---- */
const learnersStatCard = document.getElementById("learners-stat-card");
const learnersTooltip = document.getElementById("learners-tooltip");
if (learnersStatCard && learnersTooltip) {
  const setTooltipOpen = (open) => {
    learnersStatCard.classList.toggle("open", open);
    learnersStatCard.setAttribute("aria-expanded", open ? "true" : "false");
    learnersTooltip.setAttribute("aria-hidden", open ? "false" : "true");
  };

  const toggleTooltip = () => {
    const isOpen = learnersStatCard.classList.contains("open");
    setTooltipOpen(!isOpen);
  };

  learnersStatCard.addEventListener("click", toggleTooltip);
  learnersStatCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleTooltip();
    }
  });

  document.addEventListener("click", (e) => {
    if (!learnersStatCard.contains(e.target)) setTooltipOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setTooltipOpen(false);
  });
}

/* ---- Section-title scramble ---- */
const scrambleChars = "!<>-_\\/[]{}=+*^?#____";
function scramble(el) {
  const original = el.dataset.text;
  let frame = 0;
  const total = 22;
  const timer = setInterval(() => {
    el.textContent = original
      .split("")
      .map((c, i) =>
        i < (frame / total) * original.length
          ? c
          : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
      )
      .join("");
    if (++frame > total) { clearInterval(timer); el.textContent = original; }
  }, 38);
}
const titleObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      titleObs.unobserve(entry.target);
      scramble(entry.target);
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll(".section-title").forEach((el) => {
  el.dataset.text = el.textContent.trim();
  titleObs.observe(el);
});

/* ---- Konami code → matrix rain ---- */
const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let ki = 0, raining = false;
document.addEventListener("keydown", (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  ki = key === konami[ki] ? ki + 1 : key === konami[0] ? 1 : 0;
  if (ki === konami.length) { ki = 0; matrixRain(); }
});

const matrixCanvas = document.getElementById("matrix");
function matrixRain() {
  if (raining) return;
  raining = true;
  const mctx = matrixCanvas.getContext("2d");
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  matrixCanvas.classList.add("on");
  const colWidth = 16;
  const drops = Array(Math.ceil(matrixCanvas.width / colWidth)).fill(0);
  const glyphs = "アカサタナハマヤラワ0123456789ABCDEF<>+*";
  const interval = setInterval(() => {
    mctx.fillStyle = "rgba(6, 9, 19, 0.16)";
    mctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    mctx.fillStyle = "#4ef0c0";
    mctx.font = "15px monospace";
    drops.forEach((y, i) => {
      mctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], i * colWidth, y * colWidth);
      drops[i] = y * colWidth > matrixCanvas.height && Math.random() > 0.975 ? 0 : y + 1;
    });
  }, 45);
  setTimeout(() => {
    matrixCanvas.classList.remove("on");
    setTimeout(() => {
      clearInterval(interval);
      mctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      raining = false;
    }, 700);
  }, 7000);
}

/* ---- Tab-title wink ---- */
const baseTitle = document.title;
document.addEventListener("visibilitychange", () => {
  document.title = document.hidden ? "👀 miss you already — come back!" : baseTitle;
});

/* ---- Console easter egg ---- */
console.log(
  "%c\n  ███╗   ██╗██╗   ██╗████████╗████████╗\n  ████╗  ██║██║   ██║╚══██╔══╝╚══██╔══╝\n  ██╔██╗ ██║██║   ██║   ██║      ██║\n  ██║╚██╗██║██║   ██║   ██║      ██║\n  ██║ ╚████║╚██████╔╝   ██║      ██║\n  ╚═╝  ╚═══╝ ╚═════╝    ╚═╝      ╚═╝  .site\n",
  "color:#4ef0c0;font-family:monospace;font-size:12px"
);
console.log(
  "%cCurious devs make the best hires. 📬 nuttachai.ku@hotmail.com",
  "color:#6c8cff;font-family:monospace;font-size:13px"
);

/* ---- Profile chat bot ---- */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function currentAge() {
  const now = new Date();
  let a = now.getFullYear() - 1996;
  if (now < new Date(now.getFullYear(), 10, 24)) a--;
  return a;
}

const CONTACT_HTML =
  'Here\u2019s how to reach him 📬\n• Email: <a href="mailto:nuttachai.ku@hotmail.com">nuttachai.ku@hotmail.com</a>\n• LinkedIn: <a href="https://linkedin.com/in/nuttachai-kulthammanit" target="_blank" rel="noopener">nuttachai-kulthammanit</a>\n• Phone: (+66) 86 375 3485\nHe\u2019s always open to interesting conversations!';

const KB = [
  { k: ["hi", "hello", "hey", "yo", "sup", "greetings"],
    r: () => pick([
      "Hey there! 👋 Ask me anything about Nuttachai — his experience, skills, research, you name it.",
      "Hello! I\u2019m nutt_bot 🤖 — the resident expert on all things Nuttachai. What would you like to know?",
    ]) },
  { k: ["who", "about", "introduce", "summary", "himself", "objective"],
    r: () => `Nuttachai is an <b>Advanced Software Engineer at KBTG</b> in Bangkok with <b>${experienceYearsDisplay} years</b> of experience across fintech, trading, and e-commerce. He builds with Java, Spring Boot, Node, and React — and he\u2019s also taught hundreds of students as an instructor. 🎓` },
  { k: ["experience", "career", "work", "worked", "history", "background", "companies", "jobs", "timeline"],
    r: "Here\u2019s the career timeline 👇\n• <b>2024–now</b> · Advanced Software Engineer @ KBTG\n• <b>2024</b> · Senior Full-stack Dev @ Deftdev Tech\n• <b>2022–24</b> · Senior Software Engineer @ LSEG\n• <b>2021–22</b> · Software Engineer @ Ascend Commerce\n• <b>2019–20</b> · Full-stack Dev / Lead Instructor @ Buzzfreeze\nTeaching track: <b>2023</b> · Course Instructor @ FutureSkill, plus ongoing part-time mentorship @ <b>WeStride</b>.\nAsk me about any role for details!" },
  { k: ["kbtg", "kasikorn", "current", "present", "now"],
    r: "Right now he\u2019s at <b>KASIKORN Business-Technology Group (KBTG)</b> 🏦 — building internal tools for financial advisors and designing new services within a microservices architecture." },
  { k: ["lseg", "london", "stock exchange", "trading", "currency"],
    r: "At the <b>London Stock Exchange Group</b> (2022–2024) 📈 he migrated a global currency trading platform from Java Applet to Angular, delivered new features end-to-end, and resolved critical backend latency issues." },
  { k: ["deftdev", "ev", "e-commerce", "ecommerce"],
    r: "At <b>Deftdev Tech</b> (2024) ⚡ he built an EV-car e-commerce platform on Spring Boot + PostgreSQL microservices, and fixed nasty out-of-memory and latency issues." },
  { k: ["ascend", "food", "delivery"],
    r: "At <b>Ascend Commerce</b> (2021–2022) 🍜 he built microservices for a food delivery platform using Spring Boot, MongoDB, and Elasticsearch — plus wrote top-notch documentation." },
  { k: ["teach", "teacher", "instructor", "course", "students", "buzzfreeze", "mentor"],
    r: "He\u2019s taught <b>hundreds of students</b> 🏫 through roles across Buzzfreeze, FutureSkill, and WeStride — including online React courses, part-time on-site React and Spring Boot instruction at KBTG, live mentoring, recorded lessons, and practical software engineering guidance." },
  { k: ["skill", "skills", "stack", "tech", "technologies", "framework", "tools", "java", "react", "node", "spring", "docker", "redis", "sql"],
    r: "His toolbox 🧰\nJavaScript · React · Node.js · Spring Boot · SQL · Database Design · Microservices · Docker · Redis\nSweet spot: scalable backend systems with Java & Spring Boot." },
  { k: ["education", "degree", "university", "study", "studied", "master", "bachelor", "chula", "chulalongkorn"],
    r: "🎓 Both degrees from <b>Chulalongkorn University</b>, Computer Engineering:\n• M.Eng (2020–2023)\n• B.Eng (2015–2019)" },
  { k: ["publication", "publications", "research", "paper", "plos", "forensic", "science", "published"],
    r: 'He\u2019s a published researcher 🧬\n• <b>STRategy</b> — NGS data analysis for forensic science, <i>PLOS ONE</i> (2023) → <a href="https://doi.org/10.1371/journal.pone.0282551" target="_blank" rel="noopener">DOI link</a>\n• <b>Sentiment Analysis on Cannabis Legalization on Twitter</b> — submitted to <i>SAU Journal of Science & Technology</i>.' },
  { k: ["contact", "email", "mail", "phone", "call", "reach", "linkedin", "hire", "hiring", "available", "cv", "resume", "recruit"],
    r: CONTACT_HTML },
  { k: ["where", "location", "bangkok", "live", "lives", "based", "thailand", "city"],
    r: "He\u2019s based in <b>Bangkok, Thailand</b> 🇹🇭 (10400)." },
  { k: ["language", "languages", "english", "thai", "speak", "speaks"],
    r: "He speaks <b>Thai</b> (native) and <b>English</b> (intermediate). 🗣️" },
  { k: ["age", "old", "birthday", "born", "birth"],
    r: () => `Born on <b>24 Nov 1996</b> 🎂 — that makes him ${currentAge()} years old.` },
  { k: ["fun", "fact", "secret", "easter", "egg", "joke", "cool", "interesting"],
    r: () => pick([
      "Fun fact: his research helps forensic scientists analyze DNA — published in <i>PLOS ONE</i>! 🧬",
      "Secret 🤫 try pressing ↑ ↑ ↓ ↓ ← → ← → B A on this page…",
      "Fun fact: he\u2019s taught hundreds of students to code — so he can explain microservices to literally anyone. 🏫",
    ]) },
  { k: ["thank", "thanks", "thx", "great", "awesome", "nice"],
    r: () => pick(["Anytime! 🙌 Anything else you\u2019d like to know?", "Happy to help! 🚀"]) },
  { k: ["bye", "goodbye", "later", "cya"],
    r: "See you around! 👋 Don\u2019t forget to drop him a line at <a href=\"mailto:nuttachai.ku@hotmail.com\">nuttachai.ku@hotmail.com</a>." },
];

const FALLBACKS = [
  "Hmm, I\u2019m just a humble profile bot 🤖 — try asking about his <b>experience</b>, <b>skills</b>, <b>education</b>, <b>publications</b>, or <b>contact info</b>!",
  "That one\u2019s beyond my circuits ⚡ — but I know everything about his career, skills, research, and how to reach him. Try one of those!",
];

function answer(q) {
  let best = null, bestScore = 0;
  for (const entry of KB) {
    let score = 0;
    for (const key of entry.k) {
      const re = new RegExp("\\b" + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
      if (re.test(q)) score++;
    }
    if (score > bestScore) { bestScore = score; best = entry; }
  }
  if (!best) return pick(FALLBACKS);
  return typeof best.r === "function" ? best.r() : best.r;
}

const fab = document.getElementById("chat-fab");
const chatPanel = document.getElementById("chat-panel");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const chatForm = document.getElementById("chat-form");
let greeted = false;

function addMsg(content, who) {
  const m = document.createElement("div");
  m.className = "msg " + who;
  // user text is untrusted -> textContent; bot replies are static HTML
  if (who.includes("user")) m.textContent = content;
  else m.innerHTML = content;
  chatBody.appendChild(m);
  chatBody.scrollTop = chatBody.scrollHeight;
  return m;
}

function botSay(html, delay = 600 + Math.random() * 600) {
  const t = addMsg('<span class="tdot"></span><span class="tdot"></span><span class="tdot"></span>', "bot");
  setTimeout(() => {
    t.innerHTML = html;
    chatBody.scrollTop = chatBody.scrollHeight;
  }, delay);
}

const CHIPS = ["experience?", "skills?", "education?", "contact info", "fun fact"];
function showChips() {
  const wrap = document.createElement("div");
  wrap.className = "chips";
  CHIPS.forEach((c) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = c;
    b.addEventListener("click", () => { wrap.remove(); ask(c); });
    wrap.appendChild(b);
  });
  setTimeout(() => {
    chatBody.appendChild(wrap);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1400);
}

function ask(text) {
  addMsg(text, "user");
  botSay(answer(text.toLowerCase()));
}

fab.addEventListener("click", () => {
  chatPanel.classList.toggle("open");
  if (chatPanel.classList.contains("open")) {
    chatInput.focus();
    if (!greeted) {
      greeted = true;
      botSay("Hi! 👋 I\u2019m <b>nutt_bot</b> — ask me anything about Nuttachai\u2019s profile.");
      showChips();
    }
  }
});
document.getElementById("chat-close").addEventListener("click", () => chatPanel.classList.remove("open"));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") chatPanel.classList.remove("open");
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = "";
  ask(text);
});

/* ---- profile intel (shared by the games) ---- */
const PROFILE_FACTS = [
  `${experienceYearsDisplay} years building with Java, Spring Boot, Node & React`,
  "Currently @ KBTG — building tools for financial advisors",
  "Migrated LSEG's currency trading platform from Java Applet to Angular",
  "Reached 1,000+ online learners through React courses",
  "Published in PLOS ONE — forensic DNA research 🧬",
  "M.Eng in Computer Engineering @ Chulalongkorn University",
  "Slayed out-of-memory & latency bugs on an EV e-commerce platform",
  "Built food-delivery microservices with MongoDB & Elasticsearch",
  "Based in Bangkok 🇹🇭 — speaks Thai & English",
  "Daily drivers: Docker · Redis · SQL · Microservices",
];
const factToast = document.getElementById("fact-toast");
let factTimer, factIdx = Math.floor(Math.random() * PROFILE_FACTS.length);
function nextFact() {
  factIdx = (factIdx + 1) % PROFILE_FACTS.length;
  return PROFILE_FACTS[factIdx];
}
function showFact(text) {
  factToast.innerHTML = "<b>INTEL</b> · " + text;
  factToast.classList.add("show");
  clearTimeout(factTimer);
  factTimer = setTimeout(() => factToast.classList.remove("show"), 4000);
}

/* ---- Battle City: profile siege (the page is the stage) ---- */
(() => {
  const overlay = document.getElementById("game-overlay");
  const cvs = document.getElementById("game-canvas");
  const g = cvs.getContext("2d");
  const msgBox = document.getElementById("game-msg");
  const msgTitle = msgBox.querySelector("h3");
  const msgText = msgBox.querySelector("p");
  const againBtn = document.getElementById("game-again");
  const hudWave = document.getElementById("g-stage");
  const hudScore = document.getElementById("g-score");
  const hudLives = document.getElementById("g-lives");
  const hudLeft = document.getElementById("g-left");
  const hudPwr = document.getElementById("g-pwr");
  const chatPanelEl = document.getElementById("chat-panel");

  const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const ANGLES = { up: 0, right: Math.PI / 2, down: Math.PI, left: -Math.PI / 2 };
  // fixed-position elements are excluded: their cached page coords go stale on scroll
  const TARGET_SEL = ".skill, .stat, .card, .job, .terminal, .section-title, .hero h1, .hero-tag, .typed-line, .hero-desc, .scroll-hint, .about-text p, .contact h2, .contact p, .hero-cta .btn, .contact-links .btn, footer";

  let player, enemies = [], bullets = [], particles = [], targets = [];
  let powerups = [], floats = [], freezeTimer = 0, shake = 0;
  let wave, score, lives, toSpawn, spawnTimer, destroyedCount = 0;
  let gameState, running = false, frame = 0, raf;
  const keys = {};
  let touchDir = null, touchFire = false;

  const docW = () => document.documentElement.scrollWidth;
  const docH = () => document.documentElement.scrollHeight;

  function resizeCanvas() {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
  }
  window.addEventListener("resize", () => {
    if (!running) return;
    resizeCanvas();
    refreshRects();
  });

  function updateHud() {
    hudWave.textContent = wave;
    hudScore.textContent = score;
    hudLives.textContent = lives;
    hudLeft.textContent = toSpawn + enemies.length;
    hudPwr.textContent = player ? player.power : 1;
  }

  function collectTargets() {
    targets = [...document.querySelectorAll(TARGET_SEL)]
      .filter((el) => !overlay.contains(el) && !chatPanelEl.contains(el))
      .map((el) => {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return null;
        return { el, x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height, alive: true };
      })
      .filter(Boolean);
  }

  function refreshRects() {
    targets.forEach((t) => {
      const r = t.el.getBoundingClientRect();
      Object.assign(t, { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height });
    });
  }

  function restoreTarget(t) {
    // cancel only the game's shatter animation; CSS animations (hero fadeUp) must survive
    if (t.anim) { t.anim.cancel(); t.anim = null; }
    t.el.style.visibility = "";
    t.alive = true;
  }

  function restorePage() {
    targets.forEach(restoreTarget);
    destroyedCount = 0;
  }

  function boom(x, y, n = 14) {
    shake = Math.min(shake + 5, 14);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 3;
      particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1, life: 30 + Math.random() * 20, color: ["#4ef0c0", "#ffb454", "#ff7b5c"][i % 3] });
    }
  }

  function destroyTarget(t, bx, by) {
    t.alive = false;
    destroyedCount++;
    const el = t.el;
    t.anim = el.animate(
      [
        { transform: "scale(1) rotate(0deg)", opacity: 1 },
        { transform: `scale(0.3) rotate(${Math.random() < 0.5 ? -14 : 14}deg)`, opacity: 0 },
      ],
      { duration: 320, easing: "ease-in", fill: "forwards" }
    );
    t.anim.onfinish = () => { el.style.visibility = "hidden"; };
    boom(bx, by, 16);
  }

  /* power-ups */
  const POWERS = {
    star:   { icon: "⭐", label: "FIREPOWER+" },
    shield: { icon: "🛡️", label: "SHIELD" },
    bomb:   { icon: "💣", label: "BOOM!" },
    heart:  { icon: "❤️", label: "+1 LIFE" },
    freeze: { icon: "❄️", label: "FREEZE" },
    wrench: { icon: "🔧", label: "REPAIRED" },
  };

  function dropPower(x, y) {
    const types = Object.keys(POWERS);
    powerups.push({ x, y, type: types[Math.floor(Math.random() * types.length)], life: 600 });
  }

  function floatText(x, y, label) {
    floats.push({ x, y, label, life: 70 });
  }

  function repairTargets(n) {
    const dead = targets.filter((t) => !t.alive);
    dead.slice(-n).forEach((t) => {
      restoreTarget(t);
      destroyedCount--;
      t.el.animate(
        [{ transform: "scale(0.5)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }],
        { duration: 350, easing: "ease-out" }
      );
    });
  }

  function applyPower(type) {
    if (type === "star") player.power = Math.min(3, player.power + 1);
    else if (type === "shield") player.invuln = 600;
    else if (type === "bomb") {
      enemies.forEach((e) => { boom(e.x + 16, e.y + 16, 22); score += 150; });
      enemies = [];
      if (toSpawn === 0 && gameState === "play") waveClear();
    }
    else if (type === "heart") lives++;
    else if (type === "freeze") freezeTimer = 360;
    else if (type === "wrench") repairTargets(5);
    score += 50;
    updateHud();
  }

  function updatePowerups() {
    for (let i = powerups.length - 1; i >= 0; i--) {
      const p = powerups[i];
      if (--p.life <= 0) { powerups.splice(i, 1); continue; }
      if (player.x + 30 > p.x && player.x + 2 < p.x + 26 && player.y + 30 > p.y && player.y + 2 < p.y + 26) {
        powerups.splice(i, 1);
        applyPower(p.type);
        floatText(p.x + 13, p.y, POWERS[p.type].label);
      }
    }
  }

  function shoot(t) {
    if (t.cool > 0) return;
    if (t.isPlayer && bullets.filter((b) => b.from === "p").length >= t.power) return;
    const [dx, dy] = DIRS[t.dir];
    const sp = t.isPlayer ? 8 : 5;
    bullets.push({ x: t.x + 16 + dx * 22 - 3, y: t.y + 16 + dy * 22 - 3, dx: dx * sp, dy: dy * sp, from: t.isPlayer ? "p" : "e", travel: 0 });
    t.cool = t.isPlayer ? 17 - t.power * 3 : 90;
  }

  function enemyThink(e) {
    e.turnTimer--;
    e.cool--;
    if (e.invuln > 0) e.invuln--;
    const offscreen = e.y < window.scrollY - 60 || e.y > window.scrollY + window.innerHeight + 60;
    if (e.turnTimer <= 0 || offscreen) {
      if (offscreen) e.dir = e.y < player.y ? "down" : "up";
      else if (Math.random() < 0.5)
        e.dir = Math.abs(player.x - e.x) > Math.abs(player.y - e.y)
          ? (player.x > e.x ? "right" : "left")
          : (player.y > e.y ? "down" : "up");
      else e.dir = ["up", "down", "left", "right"][Math.floor(Math.random() * 4)];
      e.turnTimer = 40 + Math.random() * 80;
    }
    const [dx, dy] = DIRS[e.dir];
    e.x = Math.max(0, Math.min(docW() - 32, e.x + dx * e.speed));
    e.y = Math.max(0, Math.min(docH() - 32, e.y + dy * e.speed));
    if (e.cool <= 0) {
      if (Math.abs(e.x - player.x) < 20) { e.dir = player.y > e.y ? "down" : "up"; shoot(e); }
      else if (Math.abs(e.y - player.y) < 20) { e.dir = player.x > e.x ? "right" : "left"; shoot(e); }
      else if (Math.random() < 0.006) shoot(e);
    }
  }

  function trySpawn() {
    if (toSpawn <= 0 || enemies.length >= 2) return;
    if (--spawnTimer > 0) return;
    const x = 20 + Math.random() * (window.innerWidth - 72);
    const y = window.scrollY + (Math.random() < 0.5 ? 20 : Math.random() * (window.innerHeight - 220));
    if (Math.hypot(x - player.x, y - player.y) < 180) { spawnTimer = 20; return; }
    enemies.push({ x, y, dir: "down", speed: 1 + Math.min(wave * 0.15, 1), isPlayer: false, cool: 60, invuln: 50, turnTimer: 50 });
    toSpawn--;
    spawnTimer = Math.max(80, 200 - wave * 12);
    updateHud();
  }

  function updateBullets() {
    outer:
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.x += b.dx; b.y += b.dy;
      b.travel += Math.abs(b.dx) + Math.abs(b.dy);
      const cx = b.x + 3, cy = b.y + 3;
      if (b.travel > 1500 || cx < 0 || cy < 0 || cx > docW() || cy > docH()) { bullets.splice(i, 1); continue; }
      const j = bullets.findIndex((o, k) => k !== i && o.from !== b.from && Math.abs(o.x - b.x) < 10 && Math.abs(o.y - b.y) < 10);
      if (j >= 0) { boom(cx, cy, 6); bullets.splice(Math.max(i, j), 1); bullets.splice(Math.min(i, j), 1); i--; continue; }
      if (b.from === "p") {
        for (let k = enemies.length - 1; k >= 0; k--) {
          const e = enemies[k];
          if (e.invuln <= 0 && cx > e.x && cx < e.x + 32 && cy > e.y && cy < e.y + 32) {
            boom(e.x + 16, e.y + 16, 22);
            if (Math.random() < 0.5) dropPower(e.x + 2, e.y + 2);
            if (Math.random() < 0.3) showFact(nextFact());
            enemies.splice(k, 1);
            bullets.splice(i, 1);
            score += 150;
            updateHud();
            if (toSpawn === 0 && enemies.length === 0) waveClear();
            continue outer;
          }
        }
      } else if (player.invuln <= 0 && cx > player.x && cx < player.x + 32 && cy > player.y && cy < player.y + 32) {
        boom(player.x + 16, player.y + 16, 22);
        bullets.splice(i, 1);
        loseLife();
        continue;
      }
      for (const t of targets) {
        if (t.alive && cx > t.x && cx < t.x + t.w && cy > t.y && cy < t.y + t.h) {
          destroyTarget(t, cx, cy);
          bullets.splice(i, 1);
          continue outer;
        }
      }
    }
  }

  function loseLife() {
    lives--;
    updateHud();
    if (lives <= 0) { gameOver("GAME OVER"); return; }
    Object.assign(player, {
      x: window.scrollX + window.innerWidth / 2 - 16,
      y: window.scrollY + window.innerHeight - 110,
      dir: "up",
      invuln: 180,
    });
  }

  function showMsg(title, text, withBtn) {
    msgTitle.textContent = title;
    msgText.textContent = text;
    againBtn.style.display = withBtn ? "" : "none";
    msgBox.classList.add("show");
  }

  function gameOver(title) {
    gameState = "over";
    showMsg(title, `score ${score} · wave ${wave} · profile casualties ${destroyedCount}`, true);
  }

  function waveClear() {
    gameState = "clear";
    showMsg(`WAVE ${wave} CLEAR!`, "INTEL · " + nextFact(), false);
    setTimeout(() => {
      if (!running) return;
      wave++;
      startWave();
    }, 1600);
  }

  function startWave() {
    enemies = [];
    bullets = [];
    toSpawn = 3 + wave;
    spawnTimer = 30;
    gameState = "play";
    msgBox.classList.remove("show");
    updateHud();
  }

  function startGame() {
    wave = 1; score = 0; lives = 5;
    restorePage();
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    resizeCanvas();
    collectTargets();
    particles = [];
    powerups = [];
    floats = [];
    freezeTimer = 0;
    shake = 0;
    player = {
      x: window.scrollX + window.innerWidth / 2 - 16,
      y: window.scrollY + window.innerHeight - 110,
      dir: "up", speed: 3.2, isPlayer: true, cool: 0, invuln: 120, power: 1,
    };
    startWave();
  }

  function updatePlayer() {
    const want =
      keys["arrowup"] || keys["w"] ? "up" :
      keys["arrowdown"] || keys["s"] ? "down" :
      keys["arrowleft"] || keys["a"] ? "left" :
      keys["arrowright"] || keys["d"] ? "right" : touchDir;
    if (want) {
      player.dir = want;
      const [dx, dy] = DIRS[want];
      player.x = Math.max(0, Math.min(docW() - 32, player.x + dx * player.speed));
      player.y = Math.max(0, Math.min(docH() - 32, player.y + dy * player.speed));
      const vy = player.y - window.scrollY;
      if (vy < 140) window.scrollTo({ top: player.y - 140, behavior: "instant" });
      else if (vy > window.innerHeight - 172) window.scrollTo({ top: player.y - (window.innerHeight - 172), behavior: "instant" });
    }
    if (keys[" "] || touchFire) shoot(player);
    if (player.cool > 0) player.cool--;
    if (player.invuln > 0) player.invuln--;
  }

  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.vy += 0.08;
      if (--p.life <= 0) particles.splice(i, 1);
    }
    for (let i = floats.length - 1; i >= 0; i--) {
      floats[i].y -= 0.7;
      if (--floats[i].life <= 0) floats.splice(i, 1);
    }
  }

  function update() {
    updatePlayer();
    if (freezeTimer > 0) freezeTimer--;
    else enemies.forEach(enemyThink);
    trySpawn();
    updateBullets();
    updatePowerups();
    if (frame % 600 === 0) dropPower(
      window.scrollX + 40 + Math.random() * (window.innerWidth - 110),
      window.scrollY + 80 + Math.random() * (window.innerHeight - 260)
    );
  }

  function drawTank(t, sx, sy) {
    if (t.invuln > 0 && frame % 8 < 3) {
      g.strokeStyle = "#4ef0c0";
      g.strokeRect(t.x - sx + 1, t.y - sy + 1, 30, 30);
    }
    g.save();
    g.translate(t.x - sx + 16, t.y - sy + 16);
    g.rotate(ANGLES[t.dir]);
    const frozen = !t.isPlayer && freezeTimer > 0;
    g.fillStyle = t.isPlayer ? "#2a8f70" : frozen ? "#3a5a80" : "#8f3b2a";
    g.fillRect(-13, -11, 5, 22);
    g.fillRect(8, -11, 5, 22);
    g.fillStyle = t.isPlayer ? "#4ef0c0" : frozen ? "#7cc4ff" : "#ff7b5c";
    g.fillRect(-8, -9, 16, 18);
    g.fillRect(-2, -16, 4, 10);
    g.restore();
  }

  function drawGame() {
    g.clearRect(0, 0, cvs.width, cvs.height);
    const sx = window.scrollX, sy = window.scrollY;
    const shaking = shake > 0;
    if (shaking) {
      g.save();
      g.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
      shake--;
    }
    powerups.forEach((p) => {
      if (p.life < 150 && frame % 10 < 4) return;
      g.font = "22px serif";
      g.textBaseline = "top";
      g.fillText(POWERS[p.type].icon, p.x - sx, p.y - sy);
    });
    drawTank(player, sx, sy);
    enemies.forEach((e) => drawTank(e, sx, sy));
    g.fillStyle = "#f4f7ff";
    bullets.forEach((b) => g.fillRect(b.x - sx, b.y - sy, 6, 6));
    particles.forEach((p) => {
      g.globalAlpha = Math.max(p.life / 40, 0);
      g.fillStyle = p.color;
      g.fillRect(p.x - sx, p.y - sy, 4, 4);
    });
    floats.forEach((f) => {
      g.globalAlpha = Math.max(f.life / 70, 0);
      g.font = "bold 13px 'JetBrains Mono', monospace";
      g.textAlign = "center";
      g.fillStyle = "#4ef0c0";
      g.fillText(f.label, f.x - sx, f.y - sy);
      g.textAlign = "left";
    });
    g.globalAlpha = 1;
    if (shaking) g.restore();
  }

  function loop() {
    if (!running) return;
    frame++;
    if (gameState === "play") update();
    updateParticles();
    drawGame();
    raf = requestAnimationFrame(loop);
  }

  function quitGame() {
    running = false;
    cancelAnimationFrame(raf);
    overlay.classList.remove("open");
    restorePage();
  }

  document.getElementById("play-game").addEventListener("click", () => {
    overlay.classList.add("open");
    startGame();
    if (!running) { running = true; loop(); }
  });
  document.getElementById("game-quit").addEventListener("click", quitGame);
  againBtn.addEventListener("click", startGame);

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") { quitGame(); return; }
    const k = e.key.toLowerCase();
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k)) e.preventDefault();
    keys[k] = true;
  });
  document.addEventListener("keyup", (e) => { keys[e.key.toLowerCase()] = false; });

  document.querySelectorAll("#game-touch .dpad button").forEach((b) => {
    b.addEventListener("touchstart", (e) => { e.preventDefault(); touchDir = b.dataset.dir; }, { passive: false });
    b.addEventListener("touchend", () => { if (touchDir === b.dataset.dir) touchDir = null; });
  });
  const fireBtn = document.getElementById("fire-btn");
  fireBtn.addEventListener("touchstart", (e) => { e.preventDefault(); touchFire = true; }, { passive: false });
  fireBtn.addEventListener("touchend", () => { touchFire = false; });
})();

/* ---- Virtua Cop: bug patrol (rail shooter over the profile) ---- */
(() => {
  const overlay = document.getElementById("cop-overlay");
  const cvs = document.getElementById("cop-canvas");
  const g = cvs.getContext("2d");
  const banner = document.getElementById("cop-banner");
  const msgBox = document.getElementById("cop-msg");
  const msgTitle = msgBox.querySelector("h3");
  const msgText = msgBox.querySelector("p");
  const againBtn = document.getElementById("cop-again");
  const hudArea = document.getElementById("c-area");
  const hudScore = document.getElementById("c-score");
  const hudAmmo = document.getElementById("c-ammo");
  const hudHealth = document.getElementById("c-health");

  const SCENES = [
    { sel: ".hero", label: "AREA 1 · THE INTRO" },
    { sel: "#about", label: `AREA 2 · ${experienceYearsDisplay} YEARS OF CODE` },
    { sel: "#experience", label: "AREA 3 · 5 COMPANIES" },
    { sel: "#skills", label: "AREA 4 · THE TOOLBOX" },
    { sel: "#contact", label: "AREA 5 · GET IN TOUCH" },
  ];
  const BADDIES = ["🐛", "👾", "🦠"];
  const INTEL_ICONS = ["📁", "🎓", "🧬", "💼"];
  const CLIP = 6, MAX_HEALTH = 5;
  const docH = () => document.documentElement.scrollHeight;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pickOf = (arr) => arr[Math.floor(Math.random() * arr.length)];

  let running = false, raf, frame = 0;
  let score, health, ammo, shots, hits, combo, reloading;
  let enemies = [], parts = [], pops = [], misses = [];
  let scenes = [], covers = [], sceneIdx, toSpawn, spawnTimer, phase, panTarget;
  let mx = -100, my = -100, recoil = 0, flash = 0, shakeT = 0;

  /* tiny synth sfx */
  let actx;
  function tone(freq, dur, type, vol, slideTo) {
    const o = actx.createOscillator(), gn = actx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, actx.currentTime);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, actx.currentTime + dur);
    gn.gain.setValueAtTime(vol, actx.currentTime);
    gn.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
    o.connect(gn).connect(actx.destination);
    o.start();
    o.stop(actx.currentTime + dur);
  }
  function sfx(kind) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      if (kind === "shot") {
        const buf = actx.createBuffer(1, 3000, actx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
        const src = actx.createBufferSource();
        src.buffer = buf;
        const lp = actx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 1200;
        const gn = actx.createGain();
        gn.gain.value = 0.3;
        src.connect(lp); lp.connect(gn); gn.connect(actx.destination);
        src.start();
        tone(150, 0.09, "square", 0.12, 55);
      }
      else if (kind === "empty") tone(1250, 0.05, "square", 0.07);
      else if (kind === "reload") { tone(680, 0.05, "square", 0.1); setTimeout(() => tone(920, 0.05, "square", 0.1), 110); }
      else if (kind === "hit") tone(480, 0.1, "triangle", 0.16, 900);
      else if (kind === "justice") { tone(660, 0.09, "triangle", 0.14, 990); setTimeout(() => tone(990, 0.12, "triangle", 0.14, 1320), 90); }
      else if (kind === "hurt") tone(140, 0.28, "sawtooth", 0.25, 55);
    } catch (err) { /* audio blocked — play silent */ }
  }

  function resizeCanvas() {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
  }
  window.addEventListener("resize", () => { if (running) resizeCanvas(); });

  function updateHud() {
    hudArea.textContent = sceneIdx + 1;
    hudScore.textContent = score;
    hudAmmo.textContent = reloading ? "RELOADING…" : "▮".repeat(ammo) + "▯".repeat(CLIP - ammo);
    hudHealth.textContent = "♥".repeat(Math.max(health, 0)) + "♡".repeat(Math.max(MAX_HEALTH - health, 0));
  }

  function showBanner(text) {
    banner.textContent = text;
    banner.classList.remove("show");
    void banner.offsetWidth;
    banner.classList.add("show");
  }

  function showMsg(title, text) {
    msgTitle.textContent = title;
    msgText.textContent = text;
    msgBox.classList.add("show");
  }

  function popText(x, y, label, color) {
    pops.push({ x, y, label, color, life: 60 });
  }

  function burst(x, y, n = 16) {
    shakeT = Math.min(shakeT + 4, 10);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 3.5;
      parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1, life: 25 + Math.random() * 20, color: ["#4ef0c0", "#ffb454", "#ff7b5c"][i % 3] });
    }
  }

  function sceneCovers(s) {
    return [...s.el.querySelectorAll(".card, .job, .skill, .stat, .btn, .terminal, h1, h2, p")]
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
      })
      .filter((r) => r.w > 40 && r.h > 14);
  }

  function beginScene(i) {
    sceneIdx = i;
    phase = "pan";
    const s = scenes[i];
    panTarget = Math.max(0, Math.min(s.top - 90, docH() - window.innerHeight));
    toSpawn = 4 + i;
    spawnTimer = 40;
    showBanner(s.label);
    updateHud();
  }

  function startGame() {
    score = 0; health = MAX_HEALTH; ammo = CLIP;
    shots = 0; hits = 0; combo = 0; reloading = false;
    enemies = []; parts = []; pops = []; misses = [];
    flash = 0; shakeT = 0; recoil = 0;
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    resizeCanvas();
    scenes = SCENES.map((s) => {
      const el = document.querySelector(s.sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { el, top: r.top + window.scrollY, label: s.label };
    }).filter(Boolean);
    msgBox.classList.remove("show");
    beginScene(0);
  }

  function trySpawn() {
    if (toSpawn <= 0 || enemies.length >= 2) return;
    if (--spawnTimer > 0) return;
    const intel = Math.random() < 0.25;
    let x, yEnd;
    if (covers.length && Math.random() < 0.8) {
      const c = pickOf(covers);
      x = c.x + 10 + Math.random() * Math.max(10, c.w - 50);
      yEnd = c.y - 36;
    } else {
      x = window.scrollX + rnd(40, window.innerWidth - 80);
      yEnd = window.scrollY + rnd(120, window.innerHeight - 200);
    }
    x = Math.max(window.scrollX + 40, Math.min(x, window.scrollX + window.innerWidth - 40));
    yEnd = Math.max(window.scrollY + 90, Math.min(yEnd, window.scrollY + window.innerHeight - 80));
    const ringMax = Math.max(90, 150 - sceneIdx * 10);
    enemies.push({ x, y: yEnd + 46, yEnd, intel, icon: intel ? pickOf(INTEL_ICONS) : pickOf(BADDIES), state: "rise", ring: ringMax, ringMax, wob: Math.random() * 6.28 });
    toSpawn--;
    spawnTimer = rnd(60, 110);
  }

  function enemyFires() {
    sfx("hurt");
    flash = 26;
    shakeT = 14;
    combo = 0;
    health--;
    updateHud();
    if (health <= 0) gameOver();
  }

  function updateEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      e.wob += 0.1;
      if (e.state === "rise") {
        e.y -= 3;
        if (e.y <= e.yEnd) { e.y = e.yEnd; e.state = "aim"; }
      } else if (e.state === "aim") {
        if (--e.ring <= 0) {
          if (!e.intel && phase === "action") enemyFires();
          e.state = "leave";
        }
      } else {
        e.y += 4;
        if (e.y > e.yEnd + 70) enemies.splice(i, 1);
      }
    }
  }

  function update() {
    if (phase === "pan") {
      const d = panTarget - window.scrollY;
      if (Math.abs(d) < 4) {
        window.scrollTo({ top: panTarget, behavior: "instant" });
        covers = sceneCovers(scenes[sceneIdx]);
        phase = "action";
      } else {
        window.scrollTo({ top: window.scrollY + d * 0.09, behavior: "instant" });
      }
      return;
    }
    trySpawn();
    updateEnemies();
    if (phase === "action" && toSpawn === 0 && enemies.length === 0) {
      phase = "transition";
      showBanner("AREA CLEAR!");
      setTimeout(() => {
        if (!running || phase !== "transition") return;
        if (sceneIdx + 1 < scenes.length) beginScene(sceneIdx + 1);
        else results();
      }, 1300);
    }
  }

  function results() {
    phase = "over";
    const acc = shots ? Math.round((hits / shots) * 100) : 0;
    const rank = acc >= 85 && health >= 3 ? "S" : acc >= 70 ? "A" : acc >= 50 ? "B" : "C";
    const pitch = rank === "S" ? "Sharp eye, detective. Imagine what we could build together."
      : rank === "A" ? "Great shooting! The portfolio thanks you."
      : "Case closed — the chat bot has more intel if you want it.";
    showMsg(`CASE CLOSED — RANK ${rank}`, `score ${score} · accuracy ${acc}% · bugs busted ${hits}\n${pitch}\n📬 nuttachai.ku@hotmail.com`);
  }

  function gameOver() {
    if (phase === "over") return;
    phase = "over";
    const acc = shots ? Math.round((hits / shots) * 100) : 0;
    showMsg("THE BUGS WON (THIS TIME)", `score ${score} · accuracy ${acc}% · bugs busted ${hits}\ndebugging is just repeated attempts — go again!`);
  }

  function reload() {
    if (reloading || ammo === CLIP || phase === "over") return;
    reloading = true;
    sfx("reload");
    updateHud();
    setTimeout(() => {
      if (!running) return;
      ammo = CLIP;
      reloading = false;
      updateHud();
    }, 400);
  }

  function fire(clientX, clientY) {
    if (phase === "over" || phase === "pan") return;
    if (reloading) return;
    if (ammo <= 0) { sfx("empty"); showBanner("RELOAD! [R]"); return; }
    ammo--; shots++; recoil = 9;
    sfx("shot");
    updateHud();
    const dx = clientX + window.scrollX, dy = clientY + window.scrollY;
    let hitIdx = -1;
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      if (e.state === "leave") continue;
      if (Math.hypot(dx - e.x, dy - e.y) < 34) { hitIdx = i; break; }
    }
    if (hitIdx < 0) {
      combo = 0;
      misses.push({ x: dx, y: dy, life: 14 });
      return;
    }
    const e = enemies[hitIdx];
    enemies.splice(hitIdx, 1);
    if (e.intel) {
      hits++;
      combo++;
      score += 250;
      popText(e.x, e.y, "+250 INTEL", "#6c8cff");
      burst(e.x, e.y, 10);
      showFact(nextFact());
      sfx("justice");
      updateHud();
      return;
    }
    hits++;
    combo++;
    let gain = 100 + combo * 25;
    const justice = e.state === "rise" || e.ring > e.ringMax * 0.7;
    if (justice) {
      gain += 300;
      popText(e.x, e.y - 28, "JUSTICE SHOT!", "#ffd66b");
      sfx("justice");
    } else {
      sfx("hit");
    }
    score += gain;
    popText(e.x, e.y, "+" + gain + (combo > 1 ? "  x" + combo : ""), "#4ef0c0");
    burst(e.x, e.y);
    updateHud();
  }

  function updateFx() {
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.09;
      if (--p.life <= 0) parts.splice(i, 1);
    }
    for (let i = pops.length - 1; i >= 0; i--) {
      pops[i].y -= 0.8;
      if (--pops[i].life <= 0) pops.splice(i, 1);
    }
    for (let i = misses.length - 1; i >= 0; i--) {
      if (--misses[i].life <= 0) misses.splice(i, 1);
    }
    if (recoil > 0) recoil -= 1.2;
    if (flash > 0) flash--;
  }

  function draw() {
    g.clearRect(0, 0, cvs.width, cvs.height);
    const sx = window.scrollX, sy = window.scrollY;
    let ox = 0, oy = 0;
    if (shakeT > 0) { shakeT--; ox = (Math.random() - 0.5) * 10; oy = (Math.random() - 0.5) * 10; }
    g.save();
    g.translate(ox, oy);

    enemies.forEach((e) => {
      const x = e.x - sx, y = e.y - sy + Math.sin(e.wob) * 2;
      if (e.state === "aim") {
        const p = e.ring / e.ringMax;
        g.beginPath();
        g.arc(x, y, 20 + p * 26, 0, Math.PI * 2);
        g.strokeStyle = e.intel ? "rgba(108, 140, 255, 0.9)" : p > 0.5 ? "rgba(255, 214, 107, 0.9)" : "rgba(255, 80, 80, 0.95)";
        g.lineWidth = 2.5;
        g.stroke();
        if (e.intel) {
          g.font = "10px monospace";
          g.textAlign = "center";
          g.fillStyle = "#6c8cff";
          g.fillText("INTEL — SHOOT!", x, y + 34);
        }
      }
      g.font = "30px serif";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(e.icon, x, y);
    });

    parts.forEach((p) => {
      g.globalAlpha = Math.max(p.life / 35, 0);
      g.fillStyle = p.color;
      g.fillRect(p.x - sx, p.y - sy, 4, 4);
    });
    misses.forEach((m) => {
      g.globalAlpha = m.life / 14;
      g.strokeStyle = "#8b93a7";
      g.lineWidth = 1.5;
      const x = m.x - sx, y = m.y - sy;
      g.beginPath();
      g.moveTo(x - 5, y - 5); g.lineTo(x + 5, y + 5);
      g.moveTo(x + 5, y - 5); g.lineTo(x - 5, y + 5);
      g.stroke();
    });
    pops.forEach((p) => {
      g.globalAlpha = Math.max(p.life / 60, 0);
      g.font = "bold 14px 'JetBrains Mono', monospace";
      g.textAlign = "center";
      g.fillStyle = p.color;
      g.fillText(p.label, p.x - sx, p.y - sy);
    });
    g.globalAlpha = 1;
    g.restore();

    if (flash > 0) {
      g.fillStyle = `rgba(255, 40, 40, ${flash / 70})`;
      g.fillRect(0, 0, cvs.width, cvs.height);
    }

    // crosshair
    const r = 14 + recoil;
    g.strokeStyle = "#4ef0c0";
    g.lineWidth = 1.6;
    g.beginPath();
    g.arc(mx, my, r, 0, Math.PI * 2);
    g.stroke();
    g.beginPath();
    g.moveTo(mx - r - 6, my); g.lineTo(mx - r + 4, my);
    g.moveTo(mx + r + 6, my); g.lineTo(mx + r - 4, my);
    g.moveTo(mx, my - r - 6); g.lineTo(mx, my - r + 4);
    g.moveTo(mx, my + r + 6); g.lineTo(mx, my + r - 4);
    g.stroke();
    g.fillStyle = "#4ef0c0";
    g.fillRect(mx - 1.5, my - 1.5, 3, 3);
  }

  function loop() {
    if (!running) return;
    frame++;
    if (phase !== "over") update();
    updateFx();
    draw();
    raf = requestAnimationFrame(loop);
  }

  function quitGame() {
    running = false;
    cancelAnimationFrame(raf);
    overlay.classList.remove("open");
    document.body.classList.remove("cop-playing");
    msgBox.classList.remove("show");
  }

  document.getElementById("play-cop").addEventListener("click", () => {
    overlay.classList.add("open");
    document.body.classList.add("cop-playing");
    startGame();
    if (!running) { running = true; loop(); }
  });
  document.getElementById("cop-quit").addEventListener("click", quitGame);
  againBtn.addEventListener("click", startGame);

  cvs.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
  cvs.addEventListener("mousedown", (e) => { mx = e.clientX; my = e.clientY; fire(e.clientX, e.clientY); });
  overlay.addEventListener("contextmenu", (e) => { e.preventDefault(); reload(); });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") { quitGame(); return; }
    if (e.key.toLowerCase() === "r") reload();
  });
})();

/* ---- Destruction mode: shoot the page, crack it, break it, fix it ---- */
(() => {
  const overlay = document.getElementById("shoot-overlay");
  const cvs = document.getElementById("shoot-canvas");
  const g = cvs.getContext("2d");
  const hudShots = document.getElementById("s-shots");
  const hudBroken = document.getElementById("s-broken");
  const chatPanelEl = document.getElementById("chat-panel");
  const TARGET_SEL = ".skill, .stat, .card, .job, .terminal, .section-title, .hero h1, .hero-tag, .typed-line, .hero-desc, .scroll-hint, .about-text p, .contact h2, .contact p, .hero-cta .btn, .contact-links .btn, footer";
  // hits taken -> visual damage state
  const DMG_TRANSFORM = ["", "rotate(-1.2deg) translateY(1px)", "rotate(1.6deg) skewX(-1.5deg) translateY(2px)"];
  const DMG_FILTER = ["", "brightness(0.85)", "brightness(0.7) grayscale(0.5) blur(0.6px)"];

  let running = false, raf;
  let targets = [], cracks = [], parts = [];
  let shots = 0, mx = -100, my = -100, recoil = 0, shakeT = 0;

  let actx;
  function tone(freq, dur, type, vol, slideTo) {
    const o = actx.createOscillator(), gn = actx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, actx.currentTime);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, actx.currentTime + dur);
    gn.gain.setValueAtTime(vol, actx.currentTime);
    gn.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
    o.connect(gn).connect(actx.destination);
    o.start();
    o.stop(actx.currentTime + dur);
  }
  function noiseBurst(len, cutoff, vol) {
    const buf = actx.createBuffer(1, len, actx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const src = actx.createBufferSource();
    src.buffer = buf;
    const lp = actx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = cutoff;
    const gn = actx.createGain();
    gn.gain.value = vol;
    src.connect(lp); lp.connect(gn); gn.connect(actx.destination);
    src.start();
  }
  function sfx(kind) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      if (kind === "shot") { noiseBurst(3000, 1200, 0.28); tone(150, 0.09, "square", 0.1, 55); }
      else if (kind === "crack") tone(900, 0.07, "triangle", 0.12, 480);
      else if (kind === "break") { noiseBurst(6000, 700, 0.32); tone(380, 0.3, "sawtooth", 0.14, 70); }
      else if (kind === "fix") { tone(520, 0.1, "triangle", 0.14, 780); setTimeout(() => tone(780, 0.14, "triangle", 0.14, 1040), 100); }
    } catch (err) { /* audio blocked — stay silent */ }
  }

  function resizeCanvas() {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
  }
  window.addEventListener("resize", () => {
    if (!running) return;
    resizeCanvas();
    targets.forEach((t) => {
      const r = t.el.getBoundingClientRect();
      Object.assign(t, { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height });
    });
  });

  function updateHud() {
    hudShots.textContent = shots;
    hudBroken.textContent = targets.filter((t) => t.broken).length + "/" + targets.length;
  }

  function collectTargets() {
    targets = [...document.querySelectorAll(TARGET_SEL)]
      .filter((el) => !overlay.contains(el) && !chatPanelEl.contains(el))
      .map((el) => {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return null;
        const area = r.width * r.height;
        const hp = area > 40000 ? 3 : area > 12000 ? 2 : 1;
        return { el, x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height, hp, maxHp: hp, broken: false, anim: null };
      })
      .filter(Boolean);
  }

  function burst(x, y, n = 12, color) {
    shakeT = Math.min(shakeT + 4, 10);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 3.5;
      parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1, life: 25 + Math.random() * 20, color: color || ["#4ef0c0", "#ffb454", "#ff7b5c"][i % 3] });
    }
  }

  function applyDamage(t) {
    const lvl = Math.min(t.maxHp - t.hp, 2);
    const base = DMG_TRANSFORM[lvl];
    t.el.style.transform = base;
    t.el.style.filter = DMG_FILTER[lvl];
    t.el.animate(
      [
        { transform: base + " translateX(0)" },
        { transform: base + " translateX(-4px)" },
        { transform: base + " translateX(3px)" },
        { transform: base + " translateX(0)" },
      ],
      { duration: 160 }
    );
  }

  function breakTarget(t, x, y) {
    t.broken = true;
    t.anim = t.el.animate(
      [
        { transform: t.el.style.transform + " scale(1)", opacity: 1 },
        { transform: t.el.style.transform + ` scale(0.4) rotate(${Math.random() < 0.5 ? -10 : 10}deg)`, opacity: 0 },
      ],
      { duration: 300, easing: "ease-in", fill: "forwards" }
    );
    t.anim.onfinish = () => { t.el.style.visibility = "hidden"; };
    cracks = cracks.filter((c) => c.t !== t);
    burst(x, y, 22);
    sfx("break");
    updateHud();
  }

  function fixAll() {
    targets.forEach((t) => {
      if (t.anim) { t.anim.cancel(); t.anim = null; }
      const wasDamaged = t.hp < t.maxHp || t.broken;
      t.el.style.visibility = "";
      t.el.style.transform = "";
      t.el.style.filter = "";
      t.hp = t.maxHp;
      t.broken = false;
      if (wasDamaged) {
        t.el.animate(
          [{ transform: "scale(0.92)", opacity: 0.4 }, { transform: "scale(1)", opacity: 1 }],
          { duration: 320, easing: "ease-out" }
        );
      }
    });
    cracks = [];
    sfx("fix");
    updateHud();
  }

  function fire(clientX, clientY) {
    shots++;
    recoil = 8;
    sfx("shot");
    const dx = clientX + window.scrollX, dy = clientY + window.scrollY;
    // nested elements: smallest hit target wins
    let best = null;
    for (const t of targets) {
      if (t.broken) continue;
      if (dx > t.x && dx < t.x + t.w && dy > t.y && dy < t.y + t.h) {
        if (!best || t.w * t.h < best.w * best.h) best = t;
      }
    }
    updateHud();
    if (!best) { burst(dx, dy, 5, "#8b93a7"); return; }
    best.hp--;
    if (best.hp <= 0) {
      breakTarget(best, dx, dy);
    } else {
      cracks.push({ x: dx, y: dy, seed: Math.random() * 10, t: best });
      applyDamage(best);
      burst(dx, dy, 6);
      sfx("crack");
    }
  }

  function updateFx() {
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.09;
      if (--p.life <= 0) parts.splice(i, 1);
    }
    if (recoil > 0) recoil -= 1.2;
  }

  function drawCrack(c, sx, sy) {
    const x = c.x - sx, y = c.y - sy;
    g.strokeStyle = "rgba(232, 236, 244, 0.5)";
    g.lineWidth = 1;
    const rays = 5 + (Math.floor(c.seed) % 3);
    for (let i = 0; i < rays; i++) {
      const a = c.seed + (Math.PI * 2 * i) / rays;
      const len = 7 + ((c.seed * (i + 3)) % 9);
      const mxx = x + Math.cos(a) * len, myy = y + Math.sin(a) * len;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(mxx, myy);
      g.lineTo(mxx + Math.cos(a + 0.5) * len * 0.6, myy + Math.sin(a + 0.5) * len * 0.6);
      g.stroke();
    }
    g.beginPath();
    g.arc(x, y, 2, 0, Math.PI * 2);
    g.fillStyle = "rgba(232, 236, 244, 0.6)";
    g.fill();
  }

  function draw() {
    g.clearRect(0, 0, cvs.width, cvs.height);
    const sx = window.scrollX, sy = window.scrollY;
    let ox = 0, oy = 0;
    if (shakeT > 0) { shakeT--; ox = (Math.random() - 0.5) * 8; oy = (Math.random() - 0.5) * 8; }
    g.save();
    g.translate(ox, oy);
    cracks.forEach((c) => drawCrack(c, sx, sy));
    parts.forEach((p) => {
      g.globalAlpha = Math.max(p.life / 35, 0);
      g.fillStyle = p.color;
      g.fillRect(p.x - sx, p.y - sy, 4, 4);
    });
    g.globalAlpha = 1;
    g.restore();

    // crosshair
    const r = 14 + recoil;
    g.strokeStyle = "#4ef0c0";
    g.lineWidth = 1.6;
    g.beginPath();
    g.arc(mx, my, r, 0, Math.PI * 2);
    g.stroke();
    g.beginPath();
    g.moveTo(mx - r - 6, my); g.lineTo(mx - r + 4, my);
    g.moveTo(mx + r + 6, my); g.lineTo(mx + r - 4, my);
    g.moveTo(mx, my - r - 6); g.lineTo(mx, my - r + 4);
    g.moveTo(mx, my + r + 6); g.lineTo(mx, my + r - 4);
    g.stroke();
    g.fillStyle = "#4ef0c0";
    g.fillRect(mx - 1.5, my - 1.5, 3, 3);
  }

  function loop() {
    if (!running) return;
    updateFx();
    draw();
    raf = requestAnimationFrame(loop);
  }

  function quitGame() {
    fixAll();
    running = false;
    cancelAnimationFrame(raf);
    overlay.classList.remove("open");
    document.body.classList.remove("shoot-playing");
  }

  document.getElementById("play-shoot").addEventListener("click", () => {
    overlay.classList.add("open");
    document.body.classList.add("shoot-playing");
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    resizeCanvas();
    collectTargets();
    shots = 0;
    cracks = [];
    parts = [];
    updateHud();
    if (!running) { running = true; loop(); }
  });
  document.getElementById("shoot-quit").addEventListener("click", quitGame);
  document.getElementById("shoot-fix").addEventListener("click", fixAll);

  cvs.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
  cvs.addEventListener("mousedown", (e) => { mx = e.clientX; my = e.clientY; fire(e.clientX, e.clientY); });
  overlay.addEventListener("contextmenu", (e) => e.preventDefault());

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") quitGame();
  });
})();
