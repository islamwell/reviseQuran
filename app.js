/* ================================================================
   HifzFlow — Quran Memorization Revision Engine (Phase 1 Expansion)
   Surahs 63–114 Scope, 9-Point Scale, Dual-Track SM-2, & Analytics
   ================================================================ */

/* ============ 9-POINT RATING SCALE CONFIG ============ */
export const RATING_SCALE = [
  { level: 1, label: "Not memorized", pct: 0, iv: 0, class: "lvl-1" },
  { level: 2, label: "Very weak", pct: 15, iv: 0.05, class: "lvl-2" },
  { level: 3, label: "Weak", pct: 30, iv: 1, class: "lvl-3" },
  { level: 4, label: "Developing", pct: 45, iv: 3, class: "lvl-4" },
  { level: 5, label: "Moderate", pct: 60, iv: 7, class: "lvl-5" },
  { level: 6, label: "Good", pct: 72, iv: 14, class: "lvl-6" },
  { level: 7, label: "Strong", pct: 84, iv: 30, class: "lvl-7" },
  { level: 8, label: "Very strong", pct: 93, iv: 60, class: "lvl-8" },
  { level: 9, label: "Almost automatic", pct: 100, iv: 90, class: "lvl-9" }
];

export function ratingToStrength(lvl) {
  const item = RATING_SCALE.find(r => r.level === lvl);
  return item ? item.pct : 0;
}

export function strengthToRating(pct) {
  if (pct === null) return 1;
  if (pct >= 95) return 9;
  if (pct >= 88) return 8;
  if (pct >= 78) return 7;
  if (pct >= 66) return 6;
  if (pct >= 52) return 5;
  if (pct >= 38) return 4;
  if (pct >= 22) return 3;
  if (pct >= 5) return 2;
  return 1;
}

/* ============ WISDOM DATA ============ */
export const WISDOM = [
  { tag: "On Patience", t: "\"O you who believe, seek help through patience and prayer. Indeed, Allah is with the patient.\"", s: "Qur'an 2:153" },
  { tag: "On Steadiness", t: "\"The most beloved deeds to Allah are the most consistent, even if small.\"", s: "Sahih al-Bukhari 6464" },
  { tag: "On the Qur'an", t: "\"The example of the one who recites the Qur'an is that of a citron — its fragrance is sweet and its taste is sweet.\"", s: "Sahih al-Bukhari 7560" },
  { tag: "On Review", t: "\"Keep revisiting the Qur'an, for it slips away from memory more easily than camels escape their ropes.\"", s: "Sahih al-Bukhari 5033" },
  { tag: "On Ease", t: "\"Allah intends for you ease and does not intend for you hardship.\"", s: "Qur'an 2:185" },
  { tag: "On Knowledge", t: "\"Read! And your Lord is the Most Generous. Who has taught by the pen.\"", s: "Qur'an 96:3-5" },
  { tag: "On Progress", t: "\"You returned to an ayah that was difficult. That is progress.\"", s: "Hifz Mindset" }
];

/* ============ DATASET & STATE MANAGEMENT ============ */
export let QURAN_DATA = {};
const KEY = "hifzflow-v1.1";

let S = {
  memorized: {}, // surah_num -> boolean or ayah_map
  stats: {},     // "surah:ayah" -> { a: { lvl, iv, last }, m: { lvl, iv, last } }
  logs: [],      // recitation logs: [{ date, who, notes }]
  streak: 0,
  lastDay: null,
  today: { day: "", done: 0 },
  theme: "dark",
  zoom: 1,
  onboarded: false,
  dailyGoal: 10,
  cycleDays: 30
};

// Async Dataset Loader
export async function loadQuranDataset() {
  try {
    const res = await fetch('./data/quran_63_114.json');
    if (res.ok) {
      QURAN_DATA = await res.json();
      console.log("Quran Dataset (Surahs 63-114) loaded successfully with keys:", Object.keys(QURAN_DATA).length);
    } else {
      console.error("Failed to load quran_63_114.json, HTTP status:", res.status);
    }
  } catch (err) {
    console.warn("Falling back to local cache or basic dataset", err);
  }
}

// Load state from localStorage
function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      S = { ...S, ...parsed };
      if (!S.today) S.today = { day: "", done: 0 };
      if (!S.dailyGoal) S.dailyGoal = 10;
      if (!S.cycleDays) S.cycleDays = 30;
      if (!S.logs) S.logs = [];
      if (!S.reminders) S.reminders = { enabled: false, time: "08:00", lastFired: null };
    }
  } catch (e) {
    console.error("Failed to load local storage state", e);
  }
}

let syncDebounceTimer = null;
export function syncWithCloudflare() {
  clearTimeout(syncDebounceTimer);
  syncDebounceTimer = setTimeout(async () => {
    try {
      const chipBadge = document.getElementById('chipSyncStatus');
      if (chipBadge) chipBadge.textContent = 'Syncing...';

      const payload = {
        userId: S.user?.id || 'guest',
        data: {
          memorized: S.memorized,
          stats: S.stats,
          logs: S.logs,
          streak: S.streak,
          settings: { dailyGoal: S.dailyGoal, cycleDays: S.cycleDays }
        }
      };

      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        if (chipBadge) {
          chipBadge.textContent = S.user?.email ? 'Synced 🟢' : 'Local 🟡';
          chipBadge.className = `sync-badge ${S.user?.email ? 'synced' : ''}`;
        }
      }
    } catch (err) {
      console.warn("Cloudflare background sync offline/failed", err);
    }
  }, 1200);
}

export function saveState() {
  try {
    localStorage.setItem(KEY, JSON.stringify(S));
    syncWithCloudflare();
  } catch (e) {
    console.error("Failed to save state to local storage", e);
  }
}

const idOf = (sn, ai) => `${sn}:${ai}`;

// Get stats block
export function getStatBlock(id, track) {
  if (!S.stats[id]) S.stats[id] = { a: null, m: null };
  if (!S.stats[id][track]) {
    S.stats[id][track] = { lvl: 1, iv: 0, last: 0 };
  }
  return S.stats[id][track];
}

// Retention Curve Calculation (0 to 100%)
export function calculateStrength(id, track) {
  const st = S.stats[id]?.[track];
  if (!st || !st.last) return null;
  const elapsedDays = (Date.now() - st.last) / 86400000;
  const halfLife = Math.max(st.iv, 0.1);
  return Math.max(0, Math.round(100 * Math.exp(-elapsedDays / halfLife)));
}

export function getCombinedStrength(id) {
  const a = calculateStrength(id, 'a');
  const m = calculateStrength(id, 'm');
  if (a === null && m === null) return null;
  return Math.round(((a ?? 0) + (m ?? 0)) / 2);
}

// 9-Point Scale Rating Update
export function setAyahRating(id, track, ratingLevel) {
  const st = getStatBlock(id, track);
  const scaleInfo = RATING_SCALE.find(r => r.level === ratingLevel) || RATING_SCALE[0];
  
  st.lvl = ratingLevel;
  st.iv = scaleInfo.iv;
  st.last = Date.now();
  saveState();
}

// Check if Ayah is due or fading
export function isAyahDue(id, track) {
  const st = S.stats[id]?.[track];
  if (!st || !st.last) return true;
  const strVal = calculateStrength(id, track);
  return strVal === null || strVal < 70;
}

// Get Flat list of all ayahs from loaded Quran dataset
export function getFlatAyahs() {
  const list = [];
  for (const sNum in QURAN_DATA) {
    const s = QURAN_DATA[sNum];
    if (!s || !s.ayahs) continue;
    s.ayahs.forEach((ay, idx) => {
      list.push({
        s,
        id: idOf(s.n, idx),
        ai: idx,
        ar: ay.ar,
        en: ay.en
      });
    });
  }
  return list;
}

export function getMemorizedAyahs() {
  return getFlatAyahs().filter(x => isSurahMemorized(x.s.n));
}

export function isSurahMemorized(sNum) {
  return !!S.memorized[sNum];
}

export function getSurahRollup(sNum) {
  const surah = QURAN_DATA[sNum] || QURAN_DATA[sNum.toString()];
  if (!surah || !surah.ayahs) return { status: "Not Started", memCount: 0, total: 0, pct: 0, avgStr: 0 };
  
  const total = surah.ayahs.length;
  let memCount = 0;
  let totalStrengthSum = 0;
  let testedCount = 0;
  
  surah.ayahs.forEach((_, idx) => {
    const id = idOf(sNum, idx);
    const comb = getCombinedStrength(id);
    if (comb !== null) {
      memCount++;
      totalStrengthSum += comb;
      testedCount++;
    }
  });
  
  const status = memCount === 0 ? "Not Started" : (memCount === total ? "Complete" : "Partial");
  const avgStr = testedCount ? Math.round(totalStrengthSum / testedCount) : 0;
  const pct = Math.round((memCount / total) * 100);
  
  return { status, memCount, total, pct, avgStr };
}

// Bulk mark entire surah as memorized
export function bulkMarkSurahMemorized(sNum, level = 7) {
  const surah = QURAN_DATA[sNum] || QURAN_DATA[sNum.toString()];
  if (!surah || !surah.ayahs) return;
  
  S.memorized[sNum] = true;
  surah.ayahs.forEach((_, idx) => {
    const id = idOf(sNum, idx);
    setAyahRating(id, 'a', level);
    setAyahRating(id, 'm', level);
  });
  saveState();
}

/* ============ PREFERENCES APPLIER ============ */
function applyPreferences() {
  document.documentElement.dataset.theme = S.theme;
  document.documentElement.style.setProperty('--fz', S.zoom);
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.textContent = S.theme === 'dark' ? '☾' : '☀';
    document.querySelector('meta[name="theme-color"]').setAttribute('content', S.theme === 'dark' ? '#070d0b' : '#f4f6f1');
  }
  document.querySelectorAll('#zoomer button').forEach(b => {
    b.classList.toggle('on', parseFloat(b.dataset.z) === S.zoom);
  });
  
  const verDiv = document.getElementById('appVersion');
  if (verDiv) {
    verDiv.textContent = `v1.3.0 (updated 2026-07-21 18:59)`;
  }
}

/* ============ STREAK MANAGEMENT ============ */
const TODAY_STRING = new Date().toDateString();
function verifyDailyStreak() {
  if (S.today.day !== TODAY_STRING) {
    S.today = { day: TODAY_STRING, done: 0 };
  }
  const yesterdayString = new Date(Date.now() - 86400000).toDateString();
  if (S.lastDay !== TODAY_STRING) {
    if (S.lastDay === yesterdayString) {
      S.streak++;
    } else if (S.lastDay !== null) {
      S.streak = 1;
    } else {
      S.streak = 0;
    }
    S.lastDay = TODAY_STRING;
  }
  saveState();
}

/* ============ UI NAVIGATION (5 MAIN TABS) ============ */
export function go(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const currentView = document.getElementById(`v-${viewId}`);
  if (currentView) currentView.classList.add('active');
  
  document.querySelectorAll('nav .nav-btn').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.v === viewId);
  });
  
  if (viewId === 'home') renderHome();
  if (viewId === 'revise') renderRevise();
  if (viewId === 'quran') renderQuran();
  if (viewId === 'history') renderHistory();
  if (viewId === 'insights') renderInsights();
  if (viewId === 'settings') renderSettings();
  
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function toast(msg) {
  const toastBox = document.getElementById('toast');
  if (!toastBox) return;
  toastBox.textContent = msg;
  toastBox.classList.add('show');
  clearTimeout(toastBox._timer);
  toastBox._timer = setTimeout(() => {
    toastBox.classList.remove('show');
  }, 2200);
}

function getDaysAgo(st) {
  if (!st || !st.last) return 'never';
  const elapsedDays = (Date.now() - st.last) / 86400000;
  return elapsedDays < 0.1 ? 'today' : `${elapsedDays.toFixed(1)}d ago`;
}

function cellBg(v) {
  if (v === null) return '';
  if (v >= 80) return '#2fae72';
  if (v >= 55) return '#6fbf5a';
  if (v >= 35) return '#cfc64d';
  if (v >= 18) return '#e8a24d';
  return '#e05656';
}

/* ============ 1. RENDER HOME VIEW ============ */
function renderHome() {
  const dayIndex = new Date().getDate() % WISDOM.length;
  const wisdom = WISDOM[dayIndex];
  
  const tag = document.getElementById('wisTag');
  const text = document.getElementById('wisText');
  const src = document.getElementById('wisSrc');
  
  if (tag) tag.textContent = wisdom.tag;
  if (text) text.textContent = wisdom.t;
  if (src) src.textContent = wisdom.s;
  
  const memorized = getMemorizedAyahs();
  const totalScopeAyahs = getFlatAyahs().length;
  const coveragePct = totalScopeAyahs ? Math.round((memorized.length / totalScopeAyahs) * 100) : 0;
  
  let weakCount = 0;
  let dueArabic = 0;
  let dueMeaning = 0;
  
  memorized.forEach(ayah => {
    const combinedStr = getCombinedStrength(ayah.id);
    if (combinedStr !== null && combinedStr < 40) weakCount++;
    if (isAyahDue(ayah.id, 'a')) dueArabic++;
    if (isAyahDue(ayah.id, 'm')) dueMeaning++;
  });
  
  const streakBox = document.getElementById('stStreak');
  const strongBox = document.getElementById('stStrong');
  const weakBox = document.getElementById('stWeak');
  
  if (streakBox) streakBox.textContent = `${S.streak} 🔥`;
  if (strongBox) strongBox.textContent = `${coveragePct}%`;
  if (weakBox) weakBox.textContent = weakCount;
  
  const doneCount = S.today.day === TODAY_STRING ? S.today.done : 0;
  const goalTarget = S.dailyGoal || 10;
  
  const ringTxt = document.getElementById('ringTxt');
  const ringFg = document.getElementById('ringFg');
  
  if (ringTxt) ringTxt.textContent = `${doneCount}/${goalTarget}`;
  if (ringFg) {
    const circum = 201;
    const offset = circum * (1 - Math.min(1, doneCount / goalTarget));
    ringFg.style.strokeDashoffset = offset;
  }
  
  const pillAr = document.getElementById('pillAr');
  const pillEn = document.getElementById('pillEn');
  if (pillAr) pillAr.textContent = `${dueArabic} Arabic due`;
  if (pillEn) pillEn.textContent = `${dueMeaning} meaning due`;
  
  // Render Surah Heatmap Grid (Surahs 63-114)
  const grid = document.getElementById('surahHeatmapGrid');
  if (grid) {
    let gridHtml = '';
    for (let sNum = 63; sNum <= 114; sNum++) {
      const surah = QURAN_DATA[sNum];
      if (!surah) continue;
      
      const rollup = getSurahRollup(sNum);
      const isKnown = S.memorized[sNum];
      
      const aHue = (rollup.avgStr / 100 * 120).toFixed(1);
      const stateLabel = rollup.avgStr < 35 && isKnown ? 'red' : 'green';
      const hueStyles = `--h: ${aHue}; --mh: ${aHue};`;
      
      gridHtml += `
        <button class="hm-cell ${isKnown ? 'reviewed' : 'untouched'}" data-state="${stateLabel}" style="${isKnown ? hueStyles : ''}" onclick="openSurahDetail(${sNum})">
          <span style="font-size:0.65rem;opacity:0.75">#${sNum}</span>
          <b style="font-size:0.85rem">${surah.name}</b>
          <span style="font-size:0.6rem;color:var(--ink3)">${rollup.memCount}/${rollup.total} ayahs</span>
          <span class="tip">
            <span class="row"><b>${surah.name}</b> <span>${surah.ar}</span></span>
            <span class="row"><b>Status:</b> <span>${rollup.status}</span></span>
            <span class="row"><b>Avg Strength:</b> <span>${rollup.avgStr}%</span></span>
            <span class="hint">Click to open Surah details</span>
          </span>
        </button>
      `;
    }
    grid.innerHTML = gridHtml;
  }
}

/* ============ 2. RENDER REVISE VIEW (Intelligent Queue) ============ */
function renderRevise() {
  const container = document.getElementById('revisionQueueList');
  if (!container) return;
  
  const memorized = getMemorizedAyahs();
  if (!memorized.length) {
    container.innerHTML = `
      <div class="empty">
        <span class="big">⚡</span>
        Your revision queue is empty.<br>Go to the <b>Quran</b> tab and mark Surahs you have memorized to build your queue.
      </div>
    `;
    return;
  }
  
  // Sort by weakest memory strength
  const queue = memorized.map(ayah => ({
    ...ayah,
    combined: getCombinedStrength(ayah.id) ?? 0,
    sa: calculateStrength(ayah.id, 'a'),
    sm: calculateStrength(ayah.id, 'm')
  }))
  .sort((a, b) => a.combined - b.combined)
  .slice(0, 15);
  
  container.innerHTML = `
    <div style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:0.75rem;font-weight:800;color:var(--gold);text-transform:uppercase;letter-spacing:0.08em;">
        ${queue.length} Queue Items Ready
      </span>
      <button class="cta" style="width:auto;padding:8px 16px;font-size:0.8rem;" onclick="startPracticeSession()">
        Start Revision →
      </button>
    </div>
    ` + queue.map(item => {
      const col = cellBg(item.combined);
      const ratingLvl = strengthToRating(item.combined);
      const scaleObj = RATING_SCALE.find(r => r.level === ratingLvl) || RATING_SCALE[0];
      
      return `
        <div class="due-item" onclick="openAyahSheet('${item.id}')">
          <span class="strength-dot" style="background:${col}1c;color:${col}">${item.combined}%</span>
          <span style="min-width:0">
            <span class="ref">${item.s.name} · Ayah ${item.ai + 1}</span>
            <span class="ar-line">${item.ar}</span>
          </span>
          <span class="why">
            <span class="lvl-badge ${scaleObj.class}">${scaleObj.label}</span>
          </span>
        </div>
      `;
    }).join('');
}

/* ============ 3. RENDER QURAN BROWSER VIEW ============ */
let activeQuranFilter = 'all';
let quranSearchQuery = '';

function renderQuran() {
  const container = document.getElementById('quranSurahList');
  if (!container) return;
  
  let html = '';
  
  for (let sNum = 63; sNum <= 114; sNum++) {
    const surah = QURAN_DATA[sNum] || QURAN_DATA[sNum.toString()];
    if (!surah) continue;
    
    // Apply filters
    if (activeQuranFilter === 'juz28' && surah.juz !== 28) continue;
    if (activeQuranFilter === 'juz29' && surah.juz !== 29) continue;
    if (activeQuranFilter === 'juz30' && surah.juz !== 30) continue;
    if (activeQuranFilter === 'known' && !S.memorized[sNum]) continue;
    
    if (quranSearchQuery.trim() !== '') {
      const q = quranSearchQuery.toLowerCase();
      const matchNum = surah.n.toString() === q;
      const matchName = surah.name.toLowerCase().includes(q);
      const matchAr = surah.ar.includes(q);
      if (!matchNum && !matchName && !matchAr) continue;
    }
    
    const rollup = getSurahRollup(sNum);
    const isKnown = S.memorized[sNum];
    
    html += `
      <div class="surah-card">
        <div class="surah-top">
          <span class="surah-num">
            <svg viewBox="0 0 40 40"><path d="M20 2 24 10 32 8 30 16 38 20 30 24 32 32 24 30 20 38 16 30 8 32 10 24 2 20 10 16 8 8 16 10Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
            ${surah.n}
          </span>
          <div class="surah-meta">
            <b>${surah.name}</b>
            <span>${surah.en} · ${surah.ayahs.length} Ayahs · Juz ${surah.juz}</span>
          </div>
          <span class="surah-arname">${surah.ar}</span>
          <button class="know-toggle ${isKnown ? 'on' : ''}" onclick="toggleSurahMemorized(${surah.n})">
            ${isKnown ? '✓ Known' : 'I know this'}
          </button>
        </div>
        ${isKnown ? `
          <div class="prog-track">
            <div class="prog-fill" style="width:${rollup.pct}%"></div>
          </div>
          <div class="prog-labels">
            <span>Progress: ${rollup.memCount}/${rollup.total} ayahs</span>
            <span>Avg Strength: ${rollup.avgStr}%</span>
          </div>
        ` : ''}
        <div style="margin-top:10px;display:flex;gap:8px;justify-content:flex-end;">
          <button class="btn-secondary" style="font-size:0.72rem;padding:4px 10px;" onclick="openSurahDetail(${surah.n})">
            Ayah List &amp; Ratings →
          </button>
        </div>
      </div>
    `;
  }
  
  container.innerHTML = html || `<div class="empty" style="margin-top:20px"><span class="big">🔍</span>No surahs found matching filter.</div>`;
}

export function toggleSurahMemorized(sNum) {
  if (S.memorized[sNum]) {
    delete S.memorized[sNum];
  } else {
    bulkMarkSurahMemorized(sNum, 7);
  }
  saveState();
  renderQuran();
  renderHome();
  toast(S.memorized[sNum] ? "Surah marked as memorized! ✦" : "Removed surah from memorized tracking");
}

/* ============ 4. RENDER HISTORY VIEW (Logs) ============ */
function renderHistory() {
  const container = document.getElementById('historyLogList');
  if (!container) return;
  
  if (!S.logs || S.logs.length === 0) {
    container.innerHTML = `
      <div class="empty">
        <span class="big">📖</span>
        No recitation logs recorded yet.<br>Click <b>"Log a Recitation Session"</b> above to record who you recited to.
      </div>
    `;
    return;
  }
  
  container.innerHTML = S.logs.map(log => `
    <div class="log-item">
      <div>
        <span class="who">Recited to: ${log.who}</span>
        <div style="font-size:0.85rem;font-weight:700;margin-top:4px;color:var(--ink)">${log.notes}</div>
        <small style="font-size:0.68rem;color:var(--ink3)">${log.date}</small>
      </div>
    </div>
  `).join('');
}

/* ============ 5. RENDER INSIGHTS VIEW (Analytics) ============ */
function renderInsights() {
  const container = document.getElementById('insightsContent');
  if (!container) return;
  
  const memorized = getMemorizedAyahs();
  const totalScope = getFlatAyahs().length;
  const coveragePct = totalScope ? Math.round((memorized.length / totalScope) * 100) : 0;
  
  // Rating breakdown distribution
  const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  memorized.forEach(ayah => {
    const comb = getCombinedStrength(ayah.id);
    const r = strengthToRating(comb);
    dist[r]++;
  });
  
  container.innerHTML = `
    <div class="insight-card">
      <h3 style="font-size:0.95rem;font-weight:800;">MVP Range Coverage (Surahs 63–114)</h3>
      <div style="font-size:2rem;font-weight:800;color:var(--acc);margin:10px 0 4px;">${coveragePct}%</div>
      <p style="font-size:0.78rem;color:var(--ink2);line-height:1.5;">${memorized.length} of ${totalScope} verses tracked across Juz 28–30.</p>
    </div>
    
    <div class="insight-card">
      <h3 style="font-size:0.95rem;font-weight:800;">Strength Distribution (9-Point Scale)</h3>
      <div class="chart-bar-container">
        ${RATING_SCALE.map(r => {
          const cnt = dist[r.level] || 0;
          const barPct = memorized.length ? Math.round((cnt / memorized.length) * 100) : 0;
          return `
            <div class="chart-row">
              <span class="lbl">${r.label}</span>
              <div class="track"><i style="width:${barPct}%;"></i></div>
              <span style="width:30px;text-align:right;">${cnt}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

/* ============ 6. RENDER SETTINGS VIEW ============ */
function renderSettings() {
  const goalSelect = document.getElementById('goalSelect');
  const cycleSelect = document.getElementById('cycleSelect');
  const remindersToggle = document.getElementById('remindersToggle');
  const reminderTimeInput = document.getElementById('reminderTimeInput');
  
  if (goalSelect) goalSelect.value = S.dailyGoal || 10;
  if (cycleSelect) cycleSelect.value = S.cycleDays || 30;
  if (remindersToggle) remindersToggle.checked = !!S.reminders?.enabled;
  if (reminderTimeInput) reminderTimeInput.value = S.reminders?.time || "08:00";
}

/* ============ REMINDERS & NOTIFICATION ENGINE ============ */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    toast("Notifications not supported on this browser");
    return false;
  }
  if (Notification.permission === 'granted') return true;
  if (Notification.permission !== 'denied') {
    const perm = await Notification.requestPermission();
    return perm === 'granted';
  }
  toast("Notifications blocked in browser settings");
  return false;
}

export function sendNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/favicon.ico',
      tag: 'hifz-reminder'
    });
  }
}

export async function sendTestReminder() {
  const granted = await requestNotificationPermission();
  if (granted) {
    sendNotification(
      "HifzFlow — Guard Your Memorization ✦",
      "Success! Your daily revision reminders are active. Keep up the strong progress!"
    );
    toast("Test notification sent! 🔔");
  }
}
window.sendTestReminder = sendTestReminder;

export function checkReminderAlarms() {
  if (!S.reminders?.enabled) return;
  
  const now = new Date();
  const currentHM = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  if (currentHM === S.reminders.time && S.reminders.lastFired !== TODAY_STRING) {
    S.reminders.lastFired = TODAY_STRING;
    saveState();
    
    const memorized = getMemorizedAyahs();
    let weakCount = 0;
    memorized.forEach(ayah => {
      const comb = getCombinedStrength(ayah.id);
      if (comb !== null && comb < 40) weakCount++;
    });
    
    sendNotification(
      "Daily Hifz Revision Time ✦",
      weakCount > 0 
        ? `You have ${weakCount} weak verses ready for review. Tap to start your quick session!`
        : `Time for your daily hifz review — keep your memorization strong!`
    );
  }
}

/* ============ AYAH RATING DETAIL DIALOG ============ */
export function openSurahDetail(sNum) {
  const surah = QURAN_DATA[sNum];
  if (!surah) return;
  
  const content = document.getElementById('ayahSheetContent');
  if (!content) return;
  
  content.innerHTML = `
    <div class="grab"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span class="ref">${surah.name} · Surah ${surah.n}</span>
      <button class="know-toggle ${S.memorized[sNum] ? 'on' : ''}" onclick="toggleSurahMemorized(${surah.n}); openSurahDetail(${surah.n});">
        ${S.memorized[sNum] ? '✓ Known' : 'I know this entire Surah'}
      </button>
    </div>
    <h2 style="font-size:1.3rem;font-weight:800;margin-top:10px;">${surah.name} <span class="ar">${surah.ar}</span></h2>
    <p style="font-size:0.78rem;color:var(--ink2);margin-bottom:16px;">${surah.en} · ${surah.ayahs.length} Ayahs · Juz ${surah.juz}</p>
    
    <div class="ayah-list-detail">
      ${surah.ayahs.map((ay, idx) => {
        const id = idOf(sNum, idx);
        const aStr = calculateStrength(id, 'a');
        const mStr = calculateStrength(id, 'm');
        const aLvl = strengthToRating(aStr);
        const mLvl = strengthToRating(mStr);
        
        return `
          <div style="padding:14px 0;border-bottom:1px solid var(--line);">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:0.75rem;font-weight:800;color:var(--gold);">Ayah ${idx + 1}</span>
              <div style="display:flex;gap:6px;">
                <span class="lvl-badge lvl-${aLvl}">AR: Lvl ${aLvl}</span>
                <span class="lvl-badge lvl-${mLvl}">EN: Lvl ${mLvl}</span>
              </div>
            </div>
            <div class="ar-big" style="font-size:1.35rem;line-height:2;margin:8px 0;">${ay.ar}</div>
            <div class="en-big" style="font-size:0.85rem;">${ay.en}</div>
            
            <!-- 9-Point Scale Quick Selector -->
            <div style="margin-top:10px;">
              <small style="font-size:0.65rem;font-weight:800;color:var(--ink3);text-transform:uppercase;">Rate Recitation (Arabic)</small>
              <div style="display:flex;gap:4px;margin-top:4px;overflow-x:auto;padding-bottom:4px;">
                ${RATING_SCALE.map(r => `
                  <button style="padding:4px 8px;font-size:0.65rem;border-radius:6px;background:var(--bg2);border:1px solid var(--line);font-weight:800;" onclick="setAyahRating('${id}','a',${r.level}); openSurahDetail(${sNum});">
                    ${r.level}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  
  const dlg = document.getElementById('dlgAyahDetail');
  if (dlg) dlg.showModal();
}

export function openAyahSheet(id) {
  const parts = id.split(':');
  if (parts.length === 2) {
    openSurahDetail(parseInt(parts[0]));
  }
}

/* ============ PRACTICE RUNNER ============ */
let practiceQueue = [];
let practiceIndex = 0;
let practiceMode = 'dual';

export function openSessionConfig() {
  const memorized = getMemorizedAyahs();
  if (!memorized.length) {
    toast("Mark memorized surahs in Quran tab first");
    go('quran');
    return;
  }
  const dlg = document.getElementById('dlgSessionConfig');
  if (dlg) dlg.showModal();
}

function startPracticeSession() {
  const activeSizeBtn = document.querySelector('#sessSizeSelect button.active');
  const size = activeSizeBtn ? parseInt(activeSizeBtn.dataset.val) : 10;
  
  const memorized = getMemorizedAyahs();
  practiceQueue = memorized.map(x => ({ ...x, combined: getCombinedStrength(x.id) ?? 0 }))
    .sort((a, b) => a.combined - b.combined)
    .slice(0, size);
    
  practiceIndex = 0;
  verifyDailyStreak();
  
  const dlg = document.getElementById('dlgSessionConfig');
  if (dlg) dlg.close();
  
  document.getElementById('practice').classList.add('open');
  renderPracticeCard();
}

export function endSession(finished) {
  document.getElementById('practice').classList.remove('open');
  renderHome();
  if (finished !== false) toast("Session completed! ✦");
}

function renderPracticeCard() {
  const ayah = practiceQueue[practiceIndex];
  const total = practiceQueue.length;
  
  const pFill = document.getElementById('pFill');
  const pCount = document.getElementById('pCount');
  const pBody = document.getElementById('pBody');
  
  if (pFill) pFill.style.width = `${(practiceIndex / total) * 100}%`;
  if (pCount) pCount.textContent = `${practiceIndex + 1}/${total}`;
  
  if (pBody) {
    pBody.innerHTML = `
      <span class="phase-chip recite">① Recite from Memory</span>
      <div class="p-card">
        <span class="p-ref">${ayah.s.name} · Ayah ${ayah.ai + 1}</span>
        <p class="p-prompt">Recite aloud from memory — then tap to check.</p>
        <div class="hidden-text" id="hidTextReveal">
          <span class="tap"><span class="eye">◉</span>Tap to reveal Arabic</span>
        </div>
      </div>
      <div class="grade-row" id="practiceGradeRow" style="opacity:0.35;pointer-events:none">
        ${RATING_SCALE.slice(0, 4).map((r, i) => `
          <button class="grade g${i + 1}" onclick="gradePractice(${r.level})">
            ${r.label}
          </button>
        `).join('')}
      </div>
    `;
    
    const revealTrigger = document.getElementById('hidTextReveal');
    const gradeRow = document.getElementById('practiceGradeRow');
    
    if (revealTrigger) {
      revealTrigger.onclick = () => {
        revealTrigger.classList.add('revealed');
        revealTrigger.innerHTML = `<span class="reveal-ar">${ayah.ar}</span>`;
        if (gradeRow) {
          gradeRow.style.opacity = '1';
          gradeRow.style.pointerEvents = 'auto';
        }
      };
    }
  }
}

function gradePractice(level) {
  const ayah = practiceQueue[practiceIndex];
  setAyahRating(ayah.id, 'a', level);
  setAyahRating(ayah.id, 'm', level);
  
  S.today.done++;
  saveState();
  
  if (practiceIndex + 1 >= practiceQueue.length) {
    endSession(true);
  } else {
    practiceIndex++;
    renderPracticeCard();
  }
}

/* ============ DEVELOPER TOOLS ============ */
function simulateDay() {
  let count = 0;
  for (const id in S.stats) {
    if (S.stats[id].a && S.stats[id].a.last) { S.stats[id].a.last -= 86400000; count++; }
    if (S.stats[id].m && S.stats[id].m.last) { S.stats[id].m.last -= 86400000; count++; }
  }
  saveState();
  renderHome();
  toast(`Simulated +1 day. Decayed ${count} active tracks. ⚡`);
}

function exportState() {
  const dataStr = JSON.stringify(S, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hifzflow_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  toast("Progress backup file downloaded! ✦");
}

function importState(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const parsed = JSON.parse(evt.target.result);
      if (parsed) {
        S = { ...S, ...parsed };
        saveState();
        applyPreferences();
        renderHome();
        toast("Progress successfully imported! ✦");
      }
    } catch (err) {
      toast("Error parsing backup JSON file");
    }
  };
  reader.readAsText(file);
}

function resetApplication() {
  if (confirm("Reset all hifz records forever?")) {
    localStorage.removeItem(KEY);
    window.location.reload();
  }
}

/* ============ EVENT LISTENERS & BOOTSTRAP ============ */
function setupEventListeners() {
  document.querySelectorAll('nav .nav-btn').forEach(btn => {
    btn.onclick = () => go(btn.dataset.v);
  });
  
  const ctaStart = document.getElementById('ctaStart');
  if (ctaStart) ctaStart.onclick = () => openSessionConfig();
  
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.onclick = () => {
      S.theme = S.theme === 'dark' ? 'light' : 'dark';
      saveState();
      applyPreferences();
    };
  }
  
  document.querySelectorAll('#zoomer button').forEach(btn => {
    btn.onclick = () => {
      S.zoom = parseFloat(btn.dataset.z);
      saveState();
      applyPreferences();
    };
  });
  
  const libSearch = document.getElementById('libSearch');
  if (libSearch) {
    libSearch.oninput = (e) => {
      quranSearchQuery = e.target.value;
      renderQuran();
    };
  }
  
  document.querySelectorAll('#libFilters .filter-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#libFilters .filter-btn').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      activeQuranFilter = btn.dataset.filter;
      renderQuran();
    };
  });
  
  const btnLaunch = document.getElementById('btnLaunchSession');
  if (btnLaunch) btnLaunch.onclick = () => startPracticeSession();
  
  const btnExport = document.getElementById('btnExport');
  if (btnExport) btnExport.onclick = () => exportState();
  
  const btnSimulateDay = document.getElementById('btnSimulateDay');
  if (btnSimulateDay) btnSimulateDay.onclick = () => simulateDay();
  
  const btnReset = document.getElementById('btnReset');
  if (btnReset) btnReset.onclick = () => resetApplication();
  
  const btnAddLog = document.getElementById('btnAddLog');
  if (btnAddLog) {
    btnAddLog.onclick = () => {
      const dlg = document.getElementById('dlgAddLog');
      if (dlg) dlg.showModal();
    };
  }
  
  const btnSaveLog = document.getElementById('btnSaveLog');
  if (btnSaveLog) {
    btnSaveLog.onclick = () => {
      const who = document.getElementById('logWhoInput').value.trim();
      const notes = document.getElementById('logNotesInput').value.trim();
      if (!who || !notes) { toast("Please enter details"); return; }
      
      if (!S.logs) S.logs = [];
      S.logs.unshift({ date: new Date().toLocaleDateString(), who, notes });
      saveState();
      
      const dlg = document.getElementById('dlgAddLog');
      if (dlg) dlg.close();
      renderHistory();
      toast("Recitation log saved! ✦");
    };
  }
  
  // Onboarding CTA button listener
  const obBtn = document.querySelector('#onboard .ob-foot button');
  if (obBtn) {
    obBtn.onclick = () => {
      finishOnboard();
    };
  }

  // Cloudflare Auth button listeners
  const btnGoogle = document.getElementById('btnGoogleAuth');
  if (btnGoogle) btnGoogle.onclick = () => loginWithGoogle();

  const btnEmail = document.getElementById('btnEmailAuth');
  if (btnEmail) {
    btnEmail.onclick = () => {
      const email = document.getElementById('authEmailInput').value.trim();
      if (!email || !email.includes('@')) { toast("Please enter a valid email"); return; }
      loginWithEmail(email);
    };
  }

  const btnSignOut = document.getElementById('btnSignOut');
  if (btnSignOut) btnSignOut.onclick = () => signOutUser();

  // Reminder Settings listeners
  const remindersToggle = document.getElementById('remindersToggle');
  if (remindersToggle) {
    remindersToggle.onchange = async (e) => {
      if (e.target.checked) {
        const granted = await requestNotificationPermission();
        if (!granted) { e.target.checked = false; return; }
        if (!S.reminders) S.reminders = { enabled: true, time: "08:00" };
        S.reminders.enabled = true;
        toast("Daily reminders enabled! 🔔");
      } else {
        if (S.reminders) S.reminders.enabled = false;
        toast("Daily reminders disabled");
      }
      saveState();
    };
  }

  const reminderTimeInput = document.getElementById('reminderTimeInput');
  if (reminderTimeInput) {
    reminderTimeInput.onchange = (e) => {
      if (!S.reminders) S.reminders = { enabled: false, time: "08:00" };
      S.reminders.time = e.target.value;
      saveState();
      toast(`Reminder time set to ${e.target.value}`);
    };
  }

  const btnTestReminder = document.getElementById('btnTestReminder');
  if (btnTestReminder) btnTestReminder.onclick = () => sendTestReminder();
}

export function updateAuthUI() {
  const chipAvatar = document.getElementById('chipAvatar');
  const chipSyncStatus = document.getElementById('chipSyncStatus');
  const signedOutState = document.getElementById('authSignedOutState');
  const signedInState = document.getElementById('authSignedInState');
  const displayAvatar = document.getElementById('authDisplayAvatar');
  const displayName = document.getElementById('authDisplayName');
  const displayEmail = document.getElementById('authDisplayEmail');

  if (S.user && S.user.email) {
    if (chipAvatar) chipAvatar.textContent = '🟢';
    if (chipSyncStatus) { chipSyncStatus.textContent = 'Synced 🟢'; chipSyncStatus.className = 'sync-badge synced'; }
    if (signedOutState) signedOutState.style.display = 'none';
    if (signedInState) signedInState.style.display = 'block';
    if (displayAvatar) displayAvatar.textContent = '👤';
    if (displayName) displayName.textContent = S.user.name || S.user.email.split('@')[0];
    if (displayEmail) displayEmail.textContent = S.user.email;
  } else {
    if (chipAvatar) chipAvatar.textContent = '👤';
    if (chipSyncStatus) { chipSyncStatus.textContent = 'Guest'; chipSyncStatus.className = 'sync-badge'; }
    if (signedOutState) signedOutState.style.display = 'block';
    if (signedInState) signedInState.style.display = 'none';
  }
}

export function openAuthModal() {
  updateAuthUI();
  const dlg = document.getElementById('dlgAuth');
  if (dlg) dlg.showModal();
}
window.openAuthModal = openAuthModal;

export async function loginWithEmail(email) {
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login_email', email })
    });
    const data = await res.json();
    if (data.success) {
      S.user = data.user;
      saveState();
      updateAuthUI();
      const dlg = document.getElementById('dlgAuth');
      if (dlg) dlg.close();
      toast(`Signed in as ${S.user.email}! ✦`);
    } else {
      toast(data.error || "Login failed");
    }
  } catch (err) {
    toast("Network error during login");
  }
}

export async function loginWithGoogle() {
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login_google', email: 'user@gmail.com', name: 'Quran Student' })
    });
    const data = await res.json();
    if (data.success) {
      S.user = data.user;
      saveState();
      updateAuthUI();
      const dlg = document.getElementById('dlgAuth');
      if (dlg) dlg.close();
      toast("Signed in with Google! ✦");
    }
  } catch (err) {
    toast("Network error during Google sign-in");
  }
}

export function signOutUser() {
  S.user = { id: "guest", email: null, name: null, provider: null };
  saveState();
  updateAuthUI();
  const dlg = document.getElementById('dlgAuth');
  if (dlg) dlg.close();
  toast("Signed out");
}

export function renderOnboardList() {
  const obList = document.getElementById('obList');
  if (!obList) return;
  
  let html = '';
  for (let sNum = 63; sNum <= 114; sNum++) {
    const surah = QURAN_DATA[sNum];
    if (!surah) continue;
    const isKnown = !!S.memorized[sNum];
    
    html += `
      <div class="surah-card">
        <div class="surah-top">
          <span class="surah-num">
            <svg viewBox="0 0 40 40"><path d="M20 2 24 10 32 8 30 16 38 20 30 24 32 32 24 30 20 38 16 30 8 32 10 24 2 20 10 16 8 8 16 10Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
            ${surah.n}
          </span>
          <div class="surah-meta">
            <b>${surah.name}</b>
            <span>${surah.en} · ${surah.ayahs.length} Ayahs</span>
          </div>
          <span class="surah-arname">${surah.ar}</span>
          <button class="know-toggle ${isKnown ? 'on' : ''}" data-sn="${surah.n}">
            ${isKnown ? '✓ Known' : 'I know this'}
          </button>
        </div>
      </div>
    `;
  }
  
  obList.innerHTML = html;
  
  obList.querySelectorAll('.know-toggle').forEach(btn => {
    btn.onclick = () => {
      const sNum = parseInt(btn.dataset.sn);
      if (S.memorized[sNum]) {
        delete S.memorized[sNum];
        btn.classList.remove('on');
        btn.textContent = 'I know this';
      } else {
        bulkMarkSurahMemorized(sNum, 7);
        btn.classList.add('on');
        btn.textContent = '✓ Known';
      }
      saveState();
    };
  });
}

export function finishOnboard() {
  S.onboarded = true;
  saveState();
  const obOverlay = document.getElementById('onboard');
  if (obOverlay) obOverlay.classList.remove('open');
  go('home');
  toast("Bismillah — Your revision map is ready! ✦");
}
window.finishOnboard = finishOnboard;

async function boot() {
  loadState();
  applyPreferences();
  verifyDailyStreak();
  setupEventListeners();
  updateAuthUI();
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW reg error:', err));
  }
  
  await loadQuranDataset();
  
  if (!S.onboarded) {
    const obOverlay = document.getElementById('onboard');
    if (obOverlay) obOverlay.classList.add('open');
    renderOnboardList();
  } else {
    go('home');
  }
  
  setInterval(() => {
    const activeBtn = document.querySelector('nav .nav-btn.on');
    if (activeBtn) {
      const viewId = activeBtn.dataset.v;
      if (viewId === 'home') renderHome();
    }
    checkReminderAlarms();
  }, 30000);
}

document.addEventListener('DOMContentLoaded', () => {
  boot();
});

// Attach all global handlers for inline HTML onclick attributes
window.go = go;
window.toast = toast;
window.openSurahDetail = openSurahDetail;
window.openAyahSheet = openAyahSheet;
window.toggleSurahMemorized = toggleSurahMemorized;
window.bulkMarkSurahMemorized = bulkMarkSurahMemorized;
window.setAyahRating = setAyahRating;
window.startPracticeSession = startPracticeSession;
window.endSession = endSession;
window.openSessionConfig = openSessionConfig;
window.gradePractice = gradePractice;
window.finishOnboard = finishOnboard;
window.openAuthModal = openAuthModal;
window.loginWithGoogle = loginWithGoogle;
window.loginWithEmail = loginWithEmail;
window.signOutUser = signOutUser;

