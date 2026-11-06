(() => {
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const main = $("#main");

/* ---------- état ---------- */
const MEM = {};
const store = {
  get(k, d) { return k in MEM ? MEM[k] : d; },
  set(k, v) { MEM[k] = v; }
};
const S = {
  aud: store.get("aud", "g"),          // j | g | p
  env: store.get("env", "mixte"),      // nature | crise | mixte
  results: store.get("results", {}),   // scénarios : id -> [s,s,s]
  res: store.get("resres", {}),        // campagnes : id -> {score, ok}
  quizBest: store.get("quizBest", {}), // aud -> score
  view: "home"
};
const AUD = { j: "Jeunes et scolaires", g: "Grand public", p: "Professionnels" };
const ENV = { nature: "Milieu naturel", crise: "Crises et catastrophes", mixte: "Mixte" };
const VERDICT = { 2: "Réflexe adapté", 1: "Incomplet", 0: "Dangereux" };
const QTIME = { j: 25, g: 18, p: 15 };
const KEYS = ["A", "B", "C", "D"];

function track(name, props) { try { window.plausible && window.plausible(name, { props }); } catch {} }
function save() { store.set("aud", S.aud); store.set("env", S.env); store.set("results", S.results); store.set("resres", S.res); store.set("quizBest", S.quizBest); }
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 2200); }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const envOk = e => S.env === "mixte" || e === S.env;
const scenList = () => SCENARIOS.filter(s => s.aud.includes(S.aud) && envOk(s.env));
const campList = () => CAMPAIGNS.filter(c => envOk(c.env));
const quizPool = () => QUIZ.filter(q => q.aud.includes(S.aud) && envOk(q.env));
const envTag = e => `<span class="tag ${e}">${e === "nature" ? "Nature" : "Crise"}</span>`;

/* ---------- topo ---------- */
function topo() {
  let p = "";
  const cx = [820, 180], cy = [120, 380];
  for (let c = 0; c < 2; c++) for (let i = 1; i < 14; i++) {
    const r = i * 34, pts = [];
    for (let a = 0; a <= 360; a += 12) {
      const rad = a * Math.PI / 180, w = 1 + 0.12 * Math.sin(rad * 3 + i * .7 + c) + 0.07 * Math.cos(rad * 5 - i * .4);
      pts.push(`${(cx[c] + Math.cos(rad) * r * w * 1.35).toFixed(1)},${(cy[c] + Math.sin(rad) * r * w).toFixed(1)}`);
    }
    p += `<polyline points="${pts.join(" ")}" />`;
  }
  return `<svg class="topo" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="var(--topo)" stroke-width="1.2">${p}</g></svg>`;
}

/* ---------- navigation ---------- */
function go(view, arg) {
  S.view = view; clearInterval(Q.timer);
  document.querySelectorAll(".nav button").forEach(b => b.setAttribute("aria-current", b.dataset.go === view ? "page" : "false"));
  ({ home, scen, scenPlay: scenPlay, res, resPlay, quiz, quizPlay, bilan, sources })[view](arg);
  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
}
document.addEventListener("click", e => { const b = e.target.closest("[data-go]"); if (b) go(b.dataset.go); });
main.tabIndex = -1;

/* ---------- accueil ---------- */
function seg(name, opts, cur) {
  return `<div class="seg" role="group">${Object.entries(opts).map(([k, v]) => `<button data-${name}="${k}" aria-pressed="${k === cur}">${v}</button>`).join("")}</div>`;
}
function home() {
  const audHint = { j: "Questions plus simples, plus de temps au quiz, pas de scénarios professionnels.", g: "Tous les scénarios grand public, temps de réponse standard.", p: "Ajoute les scénarios en établissement de santé, les notes expertes et des questions spécifiques. Quiz plus rapide." };
  main.innerHTML = `
  <section class="hero">${topo()}
    <span class="eyebrow">Serious game · survie et crises</span>
    <h1>Les bons réflexes quand tout bascule.</h1>
    <p class="lead">Égaré en montagne, privé de courant en plein hiver, surpris par une crue : chaque décision compte. Entraînez-vous ici, avec des explications sourcées, avant d’en avoir besoin.</p>
    <div class="config">
      <fieldset class="field"><legend>Public</legend>${seg("aud", AUD, S.aud)}<p class="hint">${audHint[S.aud]}</p></fieldset>
      <fieldset class="field"><legend>Terrain</legend>${seg("env", ENV, S.env)}<p class="hint">${scenList().length} scénarios, ${campList().length} campagne${campList().length > 1 ? "s" : ""}, ${quizPool().length} questions disponibles.</p></fieldset>
    </div>
  </section>
  <div class="section-h"><h2>Choisissez un mode</h2></div>
  <div class="modes">
    <button class="mode" data-go="scen"><span class="num">01 · Scénarios à décisions</span><h3>Trois choix, une situation</h3><p>Des mises en situation courtes. Chaque choix est expliqué : pourquoi c’est adapté, incomplet ou dangereux.</p><span class="meta">${scenList().length} scénarios · ${Object.keys(S.results).filter(id => scenList().some(s => s.id === id)).length} terminés</span></button>
    <button class="mode" data-go="res"><span class="num">02 · Gestion de ressources</span><h3>Tenir 48 à 72 heures</h3><p>Eau, chaleur, énergie, moral : vos décisions font monter ou chuter les jauges. Une seule à zéro et c’est l’échec.</p><span class="meta">${campList().length} campagne${campList().length > 1 ? "s" : ""}</span></button>
    <button class="mode" data-go="quiz"><span class="num">03 · Quiz chronométré</span><h3>Dix questions, ${QTIME[S.aud]} secondes</h3><p>Réflexes rapides, bonus de vitesse et de série. Rejouable à volonté, questions tirées au hasard.</p><span class="meta">Meilleur score : ${S.quizBest[S.aud] || 0}</span></button>
  </div>`;
  main.querySelectorAll("[data-aud]").forEach(b => b.onclick = () => { S.aud = b.dataset.aud; save(); track("Public", { public: S.aud }); home(); });
  main.querySelectorAll("[data-env]").forEach(b => b.onclick = () => { S.env = b.dataset.env; save(); home(); });
}

/* ---------- scénarios ---------- */
function scen() {
  const list = scenList();
  main.innerHTML = `<button class="back" data-go="home">← Accueil</button>
  <div class="section-h"><div><span class="eyebrow">${AUD[S.aud]} · ${ENV[S.env]}</span><h2>Scénarios à décisions</h2></div>
  <button class="btn ghost" data-go="bilan">Voir le bilan</button></div>
  ${list.length ? `<div class="grid">${list.map(s => {
    const r = S.results[s.id]; const sc = r ? r.reduce((a, b) => a + b, 0) : null;
    return `<button class="card" data-s="${s.id}"><div class="tags">${envTag(s.env)}${s.aud.length === 1 ? '<span class="tag pro">Pro</span>' : ""}${r ? `<span class="tag done">${sc}/${r.length * 2}</span>` : ""}</div><h3>${s.title}</h3><p class="note">${s.ctx.slice(0, 96)}…</p></button>`;
  }).join("")}</div>` : `<div class="empty">Aucun scénario pour cette combinaison.</div>`}`;
  main.querySelectorAll("[data-s]").forEach(b => b.onclick = () => go("scenPlay", b.dataset.s));
}
function scenPlay(id) {
  const s = SCENARIOS.find(x => x.id === id); const ans = []; let step = 0;
  track("Scenario start", { id });
  const render = () => {
    const st = s.steps[step];
    main.innerHTML = `<div class="play"><button class="back" data-go="scen">← Scénarios</button>
      <div class="tags">${envTag(s.env)}<span class="tag">Étape ${step + 1} / ${s.steps.length}</span></div>
      <h2 style="margin-top:var(--s2)">${s.title}</h2>
      <div class="steps">${s.steps.map((_, i) => `<i class="${i < ans.length ? "s" + ans[i] : i === step ? "on" : ""}"></i>`).join("")}</div>
      ${step === 0 ? `<div class="ctx">${s.ctx}</div>` : ""}
      <p class="q">${st.q}</p>
      <div class="opts">${st._o.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${KEYS[i]}</span><span>${o.t}</span></button>`).join("")}</div>
      <div id="fb"></div></div>`;
    main.querySelectorAll(".opt").forEach(b => b.onclick = () => pick(+b.dataset.i));
  };
  s.steps.forEach(st => st._o = shuffle(st.opts));
  const pick = i => {
    const st = s.steps[step], o = st._o[i]; ans.push(o.s);
    main.querySelectorAll(".opt").forEach((b, j) => { b.disabled = true; const oo = st._o[j]; if (j === i) b.classList.add("v" + oo.s); else if (oo.s === 2) b.classList.add("v2"); else b.classList.add("dim"); });
    const best = st._o.find(x => x.s === 2);
    const last = step === s.steps.length - 1;
    $("#fb").innerHTML = `<div class="fb v${o.s}"><div class="verdict">${VERDICT[o.s]}</div><p>${o.fb}</p>
      ${o.s < 2 && S.aud !== "j" ? `<p class="note" style="margin-top:var(--s2)"><b>Réflexe attendu :</b> ${best.t} ${best.fb}</p>` : ""}
      ${o.s < 2 && S.aud === "j" ? `<p class="note" style="margin-top:var(--s2)"><b>La bonne réponse :</b> ${best.t}</p>` : ""}
      <div class="actions"><button class="btn primary" id="nx">${last ? "Voir le résultat" : "Étape suivante"}</button></div></div>`;
    $("#nx").onclick = () => { if (last) end(); else { step++; render(); } };
    $("#nx").focus({ preventScroll: true });
    $("#fb").scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const end = () => {
    S.results[s.id] = ans; save();
    const sc = ans.reduce((a, b) => a + b, 0), max = ans.length * 2;
    track("Scenario end", { id, score: sc });
    const msg = sc === max ? "Parfait. Vous avez les bons réflexes." : sc >= max - 2 ? "Bonne base, quelques points à consolider." : "À retravailler : relisez les explications ci-dessous.";
    const idx = scenList().findIndex(x => x.id === s.id); const nextS = scenList()[idx + 1];
    main.innerHTML = `<div class="play"><button class="back" data-go="scen">← Scénarios</button>
      <span class="eyebrow">Résultat</span><h2>${s.title}</h2>
      <div class="kpis"><div class="kpi"><div class="l">Score</div><div class="v">${sc} / ${max}</div></div><div class="kpi"><div class="l">Verdict</div><div class="v" style="font-size:var(--text-lg)">${msg}</div></div></div>
      <ul class="recap">${s.steps.map((st, i) => { const b = st.opts.find(x => x.s === 2); return `<li><span class="dot s${ans[i]}"></span><span class="lab">${st.q}</span><br>${b.t}</li>`; }).join("")}</ul>
      ${S.aud === "p" && s.pro ? `<div class="pronote"><b>Note experte</b>${s.pro}</div>` : ""}
      ${S.aud !== "p" && s.pro && S.aud === "g" ? `<div class="pronote"><b>Pour aller plus loin</b>${s.pro}</div>` : ""}
      ${s.src ? `<p class="note" style="margin-top:var(--s4)">Source : ${s.src.map(k => `<a href="${SOURCES[k].url}" target="_blank" rel="noopener" style="color:var(--accent)">${SOURCES[k].label}</a>`).join(" · ")}</p>` : ""}
      <div class="row" style="margin-top:var(--s5)">${nextS ? `<button class="btn primary" id="nxs">Scénario suivant : ${nextS.title}</button>` : ""}<button class="btn ghost" id="rep">Rejouer</button><button class="btn ghost" data-go="scen">Liste</button></div></div>`;
    if (nextS) $("#nxs").onclick = () => go("scenPlay", nextS.id);
    $("#rep").onclick = () => go("scenPlay", s.id);
  };
  render();
}

/* ---------- ressources ---------- */
function res() {
  main.innerHTML = `<button class="back" data-go="home">← Accueil</button>
  <div class="section-h"><div><span class="eyebrow">${ENV[S.env]}</span><h2>Gestion de ressources</h2></div></div>
  <p class="note" style="max-width:62ch;margin-bottom:var(--s5)">Chaque étape fait passer le temps : l’eau, la chaleur et les forces baissent toutes seules. Vos choix les compensent ou les aggravent. Si une jauge tombe à zéro, la partie s’arrête.</p>
  <div class="modes">${campList().map(c => { const r = S.res[c.id]; return `<button class="mode" data-c="${c.id}"><div class="tags">${envTag(c.env)}${r ? `<span class="tag ${r.ok ? "done" : ""}">${r.ok ? "Réussi" : "Échec"} · ${r.score} pts</span>` : ""}</div><h3>${c.title}</h3><p>${c.ctx}</p><span class="meta">${c.turns.length} étapes · ${c.gauges.length} jauges</span></button>`; }).join("")}</div>`;
  main.querySelectorAll("[data-c]").forEach(b => b.onclick = () => go("resPlay", b.dataset.c));
}
function resPlay(id) {
  const c = CAMPAIGNS.find(x => x.id === id);
  const g = Object.fromEntries(c.gauges.map(x => [x.k, x.v])); const names = Object.fromEntries(c.gauges.map(x => [x.k, x.n]));
  let turn = 0, pts = 0; const log = [];
  track("Campaign start", { id });
  const gaugesHtml = (flash = {}) => `<div class="gauges">${c.gauges.map(x => { const v = g[x.k]; const cl = v <= 2 ? "low" : v <= 4 ? "midv" : ""; const d = flash[x.k]; return `<div class="gauge"><div class="top-g"><span>${x.n}</span><b>${v}/10 ${d ? `<span class="delta ${d > 0 ? "up" : "down"}">${d > 0 ? "+" : ""}${d}</span>` : ""}</b></div><div class="bar"><i class="${cl}" style="width:${v * 10}%"></i></div></div>`; }).join("")}</div>`;
  const apply = d => { const f = {}; for (const k in d) { if (!(k in g)) continue; const before = g[k]; g[k] = Math.max(0, Math.min(10, g[k] + d[k])); if (g[k] !== before) f[k] = g[k] - before; } return f; };
  const dead = () => c.gauges.find(x => g[x.k] <= 0);
  const render = () => {
    const t = c.turns[turn]; const opts = shuffle(t.c);
    main.innerHTML = `<div class="play"><button class="back" data-go="res">← Campagnes</button>
      <span class="clock">${t.t}</span><h2 style="margin-top:var(--s1)">${c.title}</h2>
      <div class="steps">${c.turns.map((_, i) => `<i class="${i < log.length ? "s" + log[i].s : i === turn ? "on" : ""}"></i>`).join("")}</div>
      ${turn === 0 ? `<div class="ctx">${c.ctx}</div>` : ""}
      ${gaugesHtml()}
      <p class="q">${t.e}</p>
      <div class="opts">${opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${KEYS[i]}</span><span>${o.t}</span></button>`).join("")}</div>
      <div id="fb"></div></div>`;
    main.querySelectorAll(".opt").forEach(b => b.onclick = () => choose(opts[+b.dataset.i], +b.dataset.i, opts));
  };
  const choose = (o, i, opts) => {
    log.push({ s: o.s, t: c.turns[turn].t, choice: o.t }); pts += o.s * 10;
    const f1 = apply(o.d);
    main.querySelectorAll(".opt").forEach((b, j) => { b.disabled = true; if (j === i) b.classList.add("v" + o.s); else b.classList.add("dim"); });
    const lost = dead(); const last = turn === c.turns.length - 1;
    let f2 = {}; if (!lost && !last) f2 = apply(c.decay);
    const lost2 = lost || dead();
    const fmt = f => Object.entries(f).map(([k, v]) => `<span class="delta ${v > 0 ? "up" : "down"}">${names[k]} ${v > 0 ? "+" : ""}${v}</span>`).join("") || `<span class="note">Aucun effet</span>`;
    main.querySelector(".gauges").outerHTML = gaugesHtml(f1);
    $("#fb").innerHTML = `<div class="fb v${o.s}"><div class="verdict">${VERDICT[o.s]}</div><p>${o.fb}</p>
      <div class="deltas">${fmt(f1)}</div>
      ${Object.keys(f2).length ? `<p class="note" style="margin-top:var(--s3)">Le temps passe :</p><div class="deltas">${fmt(f2)}</div>` : ""}
      <div class="actions"><button class="btn primary" id="nx">${lost2 ? "Voir le bilan" : last ? "Terminer" : "Étape suivante"}</button></div></div>`;
    $("#nx").onclick = () => { if (lost2 || last) end(lost2); else { turn++; render(); } };
    $("#fb").scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const end = lost => {
    const total = pts + (lost ? 0 : Object.values(g).reduce((a, b) => a + b, 0));
    S.res[c.id] = { score: total, ok: !lost }; save();
    track("Campaign end", { id, ok: !lost, score: total });
    main.innerHTML = `<div class="play"><button class="back" data-go="res">← Campagnes</button>
      <span class="eyebrow">${lost ? "Échec" : "Mission accomplie"}</span><h2>${c.title}</h2>
      <p style="margin-top:var(--s3)">${lost ? `La jauge « ${lost.n} » est tombée à zéro. En situation réelle, c’est le moment où la situation devient critique. Relisez les décisions ci-dessous.` : "Vous avez tenu jusqu’au bout. Les jauges restantes s’ajoutent à votre score."}</p>
      <div class="kpis"><div class="kpi"><div class="l">Score</div><div class="v">${total}</div></div><div class="kpi"><div class="l">Réflexes adaptés</div><div class="v">${log.filter(x => x.s === 2).length} / ${log.length}</div></div><div class="kpi"><div class="l">Choix dangereux</div><div class="v">${log.filter(x => x.s === 0).length}</div></div></div>
      ${gaugesHtml()}
      <ul class="recap">${log.map(x => `<li><span class="dot s${x.s}"></span><span class="lab">${x.t}</span><br>${x.choice}</li>`).join("")}</ul>
      <div class="row" style="margin-top:var(--s5)"><button class="btn primary" id="rep">Rejouer</button><button class="btn ghost" data-go="res">Autres campagnes</button></div></div>`;
    $("#rep").onclick = () => go("resPlay", c.id);
  };
  render();
}

/* ---------- quiz ---------- */
const Q = { timer: null };
function quiz() {
  const pool = quizPool();
  main.innerHTML = `<button class="back" data-go="home">← Accueil</button>
  <section class="hero" style="text-align:left">${topo()}
    <span class="eyebrow">${AUD[S.aud]} · ${ENV[S.env]}</span><h1 style="font-size:var(--text-xl)">Quiz chronométré</h1>
    <p class="lead">${Math.min(10, pool.length)} questions tirées parmi ${pool.length}. ${QTIME[S.aud]} secondes par question. 100 points par bonne réponse, bonus de vitesse et de série.</p>
    <div class="row" style="margin-top:var(--s5)"><button class="btn primary" id="go">Lancer le quiz</button><span class="note">Meilleur score : ${S.quizBest[S.aud] || 0}</span></div>
  </section>`;
  $("#go").onclick = () => go("quizPlay");
}
function quizPlay() {
  const qs = shuffle(quizPool()).slice(0, 10).map(q => { const order = shuffle(q.o.map((t, i) => ({ t, ok: i === q.a }))); return { ...q, order }; });
  let i = 0, score = 0, streak = 0; const hist = []; const T = QTIME[S.aud];
  track("Quiz start", { public: S.aud });
  const render = () => {
    const q = qs[i]; let left = T * 4;
    main.innerHTML = `<div class="play"><div class="qhead"><span>Question <b>${i + 1}</b> / ${qs.length}</span><span>Série <b>${streak}</b></span><span>Score <b>${score}</b></span></div>
      <div class="timer"><i id="tb" style="width:100%"></i></div>
      <div class="tags">${envTag(q.env)}</div>
      <p class="q" style="margin-top:var(--s2)">${q.q}</p>
      <div class="opts">${q.order.map((o, j) => `<button class="opt" data-j="${j}"><span class="k">${KEYS[j]}</span><span>${o.t}</span></button>`).join("")}</div><div id="fb"></div></div>`;
    main.querySelectorAll(".opt").forEach(b => b.onclick = () => answer(+b.dataset.j, left / 4));
    clearInterval(Q.timer);
    Q.timer = setInterval(() => { left--; const tb = $("#tb"); if (tb) tb.style.width = (left / (T * 4) * 100) + "%"; if (left <= 0) answer(-1, 0); }, 250);
  };
  const answer = (j, secs) => {
    clearInterval(Q.timer);
    const q = qs[i]; const ok = j >= 0 && q.order[j].ok;
    let gain = 0;
    if (ok) { streak++; gain = 100 + Math.round(secs * 5) + (streak >= 3 ? 50 : 0); score += gain; } else streak = 0;
    hist.push({ q, ok, j });
    main.querySelectorAll(".opt").forEach((b, k) => { b.disabled = true; if (q.order[k].ok) b.classList.add("v2"); else if (k === j) b.classList.add("v0"); else b.classList.add("dim"); });
    const last = i === qs.length - 1;
    $("#fb").innerHTML = `<div class="fb ${ok ? "v2" : "v0"}"><div class="verdict">${ok ? `Exact · +${gain}` : j < 0 ? "Temps écoulé" : "Faux"}</div><p>${q.x}</p><div class="actions"><button class="btn primary" id="nx">${last ? "Résultats" : "Question suivante"}</button></div></div>`;
    $("#nx").onclick = () => { if (last) end(); else { i++; render(); } };
    $("#nx").focus({ preventScroll: true });
  };
  const end = () => {
    const good = hist.filter(h => h.ok).length; const best = S.quizBest[S.aud] || 0; const rec = score > best;
    if (rec) { S.quizBest[S.aud] = score; save(); }
    track("Quiz end", { public: S.aud, score, good });
    main.innerHTML = `<div class="play"><span class="eyebrow">${rec ? "Nouveau record" : "Résultats"}</span><div class="score-big" style="margin-top:var(--s2)">${score} pts</div>
      <div class="kpis"><div class="kpi"><div class="l">Bonnes réponses</div><div class="v">${good} / ${hist.length}</div></div><div class="kpi"><div class="l">Meilleur score</div><div class="v">${S.quizBest[S.aud]}</div></div></div>
      <h3>Corrections</h3>
      <ul class="recap">${hist.map(h => `<li><span class="dot s${h.ok ? 2 : 0}"></span><span class="lab">${h.q.q}</span><br>${h.q.o[h.q.a]}. ${h.q.x}</li>`).join("")}</ul>
      <div class="row" style="margin-top:var(--s5)"><button class="btn primary" id="rep">Rejouer</button><button class="btn ghost" data-go="home">Accueil</button></div></div>`;
    $("#rep").onclick = () => go("quizPlay");
  };
  render();
}

/* ---------- bilan ---------- */
function bilanData() {
  const rows = SCENARIOS.filter(s => S.results[s.id]).map(s => { const r = S.results[s.id]; return { s, sc: r.reduce((a, b) => a + b, 0), max: r.length * 2, r }; });
  const tot = rows.reduce((a, x) => a + x.sc, 0), max = rows.reduce((a, x) => a + x.max, 0);
  const weak = [];
  rows.forEach(x => x.r.forEach((v, i) => { if (v < 2) weak.push({ s: x.s, st: x.s.steps[i], v }); }));
  return { rows, tot, max, weak };
}
function bilan() {
  const d = bilanData();
  main.innerHTML = `<button class="back no-print" data-go="home">← Accueil</button>
  <div class="section-h"><div><span class="eyebrow">${AUD[S.aud]}</span><h2>Bilan de session</h2></div>
  <div class="row no-print"><button class="btn primary" id="dl">Télécharger le bilan</button><button class="btn ghost" id="rz">Réinitialiser</button></div></div>
  ${d.rows.length || Object.keys(S.res).length ? `
  <div class="kpis"><div class="kpi"><div class="l">Scénarios terminés</div><div class="v">${d.rows.length} / ${scenList().length}</div></div>
  <div class="kpi"><div class="l">Score scénarios</div><div class="v">${d.max ? Math.round(d.tot / d.max * 100) : 0} %</div></div>
  <div class="kpi"><div class="l">Campagnes réussies</div><div class="v">${Object.values(S.res).filter(x => x.ok).length} / ${CAMPAIGNS.length}</div></div>
  <div class="kpi"><div class="l">Record quiz</div><div class="v">${S.quizBest[S.aud] || 0}</div></div></div>
  ${d.rows.length ? `<h3>Scénarios</h3><ul class="recap">${d.rows.map(x => `<li><span class="lab">${x.s.title}</span> · ${x.sc}/${x.max} ${x.r.map(v => `<span class="dot s${v}"></span>`).join("")}</li>`).join("")}</ul>` : ""}
  ${d.weak.length ? `<h3 style="margin-top:var(--s6)">Réflexes à consolider</h3><ul class="recap">${d.weak.map(w => { const b = w.st.opts.find(o => o.s === 2); return `<li><span class="dot s${w.v}"></span><span class="lab">${w.s.title} : ${w.st.q}</span><br>${b.t}</li>`; }).join("")}</ul>` : ""}
  ` : `<div class="empty">Aucune partie terminée pour l’instant. Commencez par un scénario.</div>`}`;
  $("#dl").onclick = download;
  $("#rz").onclick = () => { if ($("#rz").dataset.c) { S.results = {}; S.res = {}; S.quizBest = {}; save(); toast("Progression réinitialisée"); bilan(); } else { $("#rz").dataset.c = 1; $("#rz").textContent = "Confirmer la réinitialisation"; } };
}
function download() {
  const d = bilanData(); const date = new Date().toLocaleDateString("fr-FR");
  const html = `<!doctype html><html lang="fr"><meta charset="utf-8"><title>Bilan Cap Survie</title><style>body{font-family:system-ui,sans-serif;max-width:760px;margin:2rem auto;padding:0 1rem;color:#1E2620}h1{margin-bottom:.2rem}li{margin:.4rem 0}.m{color:#58614F}</style>
  <h1>Bilan Cap Survie</h1><p class="m">${date} · Public : ${AUD[S.aud]}</p>
  <p>Scénarios terminés : ${d.rows.length} · Score : ${d.max ? Math.round(d.tot / d.max * 100) : 0} % · Campagnes réussies : ${Object.values(S.res).filter(x => x.ok).length}/${CAMPAIGNS.length} · Record quiz : ${S.quizBest[S.aud] || 0}</p>
  <h2>Scénarios</h2><ul>${d.rows.map(x => `<li>${x.s.title} : ${x.sc}/${x.max}</li>`).join("")}</ul>
  <h2>Réflexes à consolider</h2><ul>${d.weak.map(w => `<li><b>${w.s.title}</b> · ${w.st.q}<br>${w.st.opts.find(o => o.s === 2).t}</li>`).join("") || "<li>Aucun</li>"}</ul>
  <p class="m">Outil pédagogique. Ne remplace pas une formation aux premiers secours. Urgences : 112.</p></html>`;
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([html], { type: "text/html" })); a.download = "bilan-cap-survie.html"; document.body.appendChild(a); a.click(); a.remove();
  track("Bilan download"); toast("Bilan téléchargé");
}

/* ---------- sources ---------- */
function sources() {
  main.innerHTML = `<button class="back" data-go="home">← Accueil</button>
  <div class="prose"><span class="eyebrow">Méthode</span><h2 style="margin-bottom:var(--s4)">Sources et limites</h2>
  <p>Les contenus reprennent les consignes des autorités françaises et d’organismes de santé publique. Chaque scénario est classé en trois niveaux : réflexe adapté, incomplet, dangereux.</p>
  <ul class="src-list">${Object.values(SOURCES).map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`).join("")}</ul>
  <h3 style="margin:var(--s5) 0 var(--s2)">Limites</h3>
  <p>Ce jeu sensibilise, il ne forme pas. Pour apprendre les gestes, suivez une formation PSC1 (Croix-Rouge, Protection civile, sapeurs-pompiers). En situation réelle, les consignes des autorités priment toujours.</p>
  <p>Les scénarios professionnels s’appuient sur les principes généraux du plan de gestion des tensions et situations sanitaires exceptionnelles et doivent être adaptés aux procédures de votre établissement.</p></div>`;
}

/* ---------- thème ---------- */
const th = store.get("theme", matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.documentElement.dataset.theme = th;
$("#themeBtn").onclick = () => { const n = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = n; store.set("theme", n); };

go("home");
})();
