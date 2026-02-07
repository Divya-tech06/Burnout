const clamp = (value, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const form = document.getElementById("burnoutForm");
const scoreNumber = document.getElementById("scoreNumber");
const scoreLabel = document.getElementById("scoreLabel");
const scoreFill = document.getElementById("scoreFill");
const scoreState = document.getElementById("scoreState");

const sleepBar = document.getElementById("sleepBar");
const academicBar = document.getElementById("academicBar");
const mentalBar = document.getElementById("mentalBar");
const lifestyleBar = document.getElementById("lifestyleBar");

const sleepNote = document.getElementById("sleepNote");
const academicNote = document.getElementById("academicNote");
const mentalNote = document.getElementById("mentalNote");
const lifestyleNote = document.getElementById("lifestyleNote");
const recommendations = document.getElementById("recommendations");
const summaryGrid = document.getElementById("summaryGrid");

const setRangeOutputs = () => {
  document.querySelectorAll(".range-wrap").forEach((wrap) => {
    const input = wrap.querySelector("input");
    const output = wrap.querySelector("output");
    if (input && output) {
      output.textContent = input.value;
    }
  });
};

const severityLabel = (value) => {
  if (value >= 0.7) return "Critical pressure";
  if (value >= 0.5) return "Elevated pressure";
  if (value >= 0.35) return "Mild pressure";
  return "Stable";
};

const updateWeakBar = (bar, value) => {
  bar.style.width = `${Math.round(value * 100)}%`;
  bar.dataset.level = value >= 0.7 ? "high" : value >= 0.5 ? "mid" : "low";
};

const computeScore = (data) => {
  const sleepHours = parseFloat(data.sleepHours) || 0;
  const sleepQuality = parseFloat(data.sleepQuality) || 1;
  const studyHours = parseFloat(data.studyHours) || 0;
  const cgpa = parseFloat(data.cgpa) || 0;
  const workload = parseFloat(data.workload) || 1;
  const anxiety = parseFloat(data.anxiety) || 1;
  const selfEsteem = parseFloat(data.selfEsteem) || 1;
  const screenTime = parseFloat(data.screenTime) || 0;
  const harassment = parseFloat(data.harassment) || 1;
  const physicalActivity = parseFloat(data.physicalActivity) || 0;

  const S_sleep_hours = clamp((7 - sleepHours) / 4, 0, 1);
  const S_sleep_quality = (5 - sleepQuality) / 4;
  const S_study = clamp((studyHours - 6) / 4, 0, 1);
  const S_cgpa = (10 - cgpa) / 10;
  const S_workload = (workload - 1) / 4;
  const S_anxiety = (anxiety - 1) / 4;
  const S_selfesteem = (5 - selfEsteem) / 4;
  const S_screen = clamp((screenTime - 2) / 8, 0, 1);
  const S_harassment = (harassment - 1) / 4;
  const S_activity = clamp((5 - physicalActivity) / 5, 0, 1);

  const SleepIndex = (S_sleep_hours + S_sleep_quality) / 2;
  const AcademicIndex = (S_study + S_cgpa + S_workload) / 3;
  const MentalIndex = (S_anxiety + S_selfesteem) / 2;
  const LifestyleIndex = (S_screen + S_harassment + S_activity) / 3;

  const BurnoutScore =
    100 *
    (0.22 * SleepIndex +
      0.25 * AcademicIndex +
      0.23 * MentalIndex +
      0.1 * S_screen +
      0.12 * S_harassment +
      0.08 * S_activity);

  return {
    score: Math.round(BurnoutScore),
    SleepIndex,
    AcademicIndex,
    MentalIndex,
    LifestyleIndex,
    S_screen,
    S_harassment,
    S_activity,
  };
};

const updateScore = (data) => {
  const {
    score,
    SleepIndex,
    AcademicIndex,
    MentalIndex,
    LifestyleIndex,
    S_screen,
    S_harassment,
    S_activity,
  } = computeScore(data);
  const scoreText = Number.isFinite(score) ? score : 0;
  scoreNumber.textContent = scoreText;
  scoreFill.style.width = `${scoreText}%`;

  let label = "Low Stress";
  if (scoreText >= 81) label = "Severe Burnout";
  else if (scoreText >= 61) label = "High Stress";
  else if (scoreText >= 31) label = "Moderate Stress";
  scoreLabel.textContent = label;
  scoreState.textContent = label;
  scoreFill.dataset.state = label.toLowerCase().replace(/\s+/g, "-");

  updateWeakBar(sleepBar, SleepIndex);
  updateWeakBar(academicBar, AcademicIndex);
  updateWeakBar(mentalBar, MentalIndex);
  updateWeakBar(lifestyleBar, LifestyleIndex);

  sleepNote.textContent = severityLabel(SleepIndex);
  academicNote.textContent = severityLabel(AcademicIndex);
  mentalNote.textContent = severityLabel(MentalIndex);
  lifestyleNote.textContent = severityLabel(LifestyleIndex);

  const factors = [
    {
      key: "Sleep stability",
      score: SleepIndex,
      tip: "Aim for 7–8 hours and protect a consistent bedtime window.",
    },
    {
      key: "Academic load",
      score: AcademicIndex,
      tip: "Reduce intensity peaks by splitting study blocks and adding recovery gaps.",
    },
    {
      key: "Mental pressure",
      score: MentalIndex,
      tip: "Schedule supportive conversations and short daily decompression rituals.",
    },
    {
      key: "Screen time",
      score: S_screen,
      tip: "Add 5-minute breaks every 30–40 minutes to reset focus.",
    },
    {
      key: "Harassment safety",
      score: S_harassment,
      tip: "Reach out to a trusted mentor or campus support channel for help.",
    },
    {
      key: "Physical activity",
      score: S_activity,
      tip: "Target 3–5 hours weekly with low-barrier movement.",
    },
  ];

  const ranked = [...factors].sort((a, b) => b.score - a.score);
  const top = ranked.slice(0, 3);

  recommendations.innerHTML = "";
  if (top[0].score < 0.35) {
    const item = document.createElement("li");
    item.textContent =
      "You are in a balanced zone. Keep routines consistent and protect rest.";
    recommendations.appendChild(item);
  } else {
    top.forEach((factor) => {
      const item = document.createElement("li");
      item.textContent = `${factor.key}: ${factor.tip}`;
      recommendations.appendChild(item);
    });
  }
};

const formToData = () =>
  Object.fromEntries(new FormData(form).entries());

const fillSummary = (data) => {
  if (!summaryGrid) return;
  const labels = [
    ["Sleep hours", data.sleepHours],
    ["Sleep quality", data.sleepQuality],
    ["Study hours", data.studyHours],
    ["CGPA", data.cgpa],
    ["Workload", data.workload],
    ["Anxiety", data.anxiety],
    ["Self-esteem", data.selfEsteem],
    ["Screen time", data.screenTime],
    ["Harassment", data.harassment],
    ["Physical activity", data.physicalActivity],
  ];
  summaryGrid.innerHTML = "";
  labels.forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "summary-card";
    card.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    summaryGrid.appendChild(card);
  });
};

const getQueryData = () => {
  const params = new URLSearchParams(window.location.search);
  const data = {};
  [
    "sleepHours",
    "sleepQuality",
    "studyHours",
    "cgpa",
    "workload",
    "anxiety",
    "selfEsteem",
    "screenTime",
    "harassment",
    "physicalActivity",
  ].forEach((key) => {
    data[key] = params.get(key) || "";
  });
  return data;
};

if (form) {
  form.addEventListener("input", () => {
    setRangeOutputs();
  });
  setRangeOutputs();
}

if (scoreNumber && scoreFill) {
  const data = form ? formToData() : getQueryData();
  updateScore(data);
  fillSummary(data);
}

const canvas = document.getElementById("glitterCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const spawnParticles = () => {
  particles = [];
  const count = Math.min(120, Math.floor(window.innerWidth / 12));
  for (let i = 0; i < count; i += 1) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.8 + 0.6,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.6 + 0.3,
    });
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${p.alpha})`);
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animate);
};

window.addEventListener("resize", () => {
  resizeCanvas();
  spawnParticles();
});

resizeCanvas();
spawnParticles();
animate();
