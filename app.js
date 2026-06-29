import { PERSONAL_SEED_RECORDS, PERSONAL_SEED_MANIFEST } from './sample-data.js';

const APP_NAME = 'Evidence Ledger';
const DB_NAME = 'evidence-ledger-db';
const DB_VERSION = 1;
const RECORD_STORE = 'records';
const HISTORY_STORE = 'history';

const TYPES = ['実例', '能力・知識', '習慣', '気づき', '苦手・反証'];
const RECORD_STATUSES = ['事実', '自己観察', '仮説'];
const DOMAINS = ['仕事', '私生活', '学習', '人間関係', '健康', '趣味'];
const FREQUENCIES = ['単発', 'ときどき', '継続中', '繰り返し'];
const PRESENTATION_USES = ['まだ使わない', '候補', '使う'];
const DEADLINES = ['未記録', '余裕あり', '期限あり', '短納期', '当日対応'];
const AUTONOMIES = ['未記録', '低い', '中程度', '高い'];
const STAKEHOLDER_SCALES = ['未記録', '自分中心', '少人数', '複数部署', '社外含む'];
const UNCERTAINTIES = ['未記録', '定型', '例外あり', '前例なし'];
const CONDITION_OPTIONS = ['裁量あり', '目的が明確', '判断期限あり', '決裁者が明確', '数字が見える', '文章化が必要', '現場運用あり', '関係者が多い', '利害が衝突', '前例なし', '制作・表現を扱う', '技術・仕組みを扱う'];
const AXES = [
  ['dataAxis', '数字・データ'],
  ['meaningAxis', '言葉・文脈'],
  ['peopleAxis', '人・利害'],
  ['operationsAxis', '現場運用'],
  ['creativeAxis', '制作・表現'],
  ['technicalAxis', '技術・仕組み'],
];

const root = document.getElementById('app');
const toastRegion = document.getElementById('toast-region');

const state = {
  view: 'inbox',
  records: [],
  activeRecordId: null,
  draft: null,
  filters: {
    query: '', type: 'すべて', domain: 'すべて', evidence: 'すべて', status: 'すべて', order: '最近更新',
  },
  collapsedSections: new Set(),
  outputSelection: new Set(),
  outputInitialized: false,
  outputFormat: 'interview',
  importMode: 'append',
  importText: '',
  importPreview: null,
  importColumnMap: null,
  importHeaders: [],
  modal: null,
};

function uid() {
  return crypto?.randomUUID?.() || `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function now() { return new Date().toISOString(); }
function clone(value) { return JSON.parse(JSON.stringify(value)); }
function escapeHTML(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
function safeText(value = '') { return escapeHTML(value).replaceAll('\n', '<br>'); }
function dateLabel(value) {
  if (!value) return '未記録';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ja-JP', { month: 'numeric', day: 'numeric' }).format(date);
}
function localDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(date);
}
function normalizeKey(value = '') {
  return String(value).trim().toLowerCase().replace(/[\s　_\-・\/]/g, '');
}
function normalizeTags(text = '') {
  const raw = Array.isArray(text) ? text : String(text).split(/[|｜,，、\n]/);
  return [...new Set(raw.map(x => x.trim()).filter(Boolean))];
}
function evidenceLines(value = '') {
  return String(value).split('\n').map(x => x.trim()).filter(Boolean);
}
function evidenceCount(record) { return evidenceLines(record.evidenceText).length; }
function selectedUseClass(value) {
  if (value === '候補') return 'candidate';
  if (value === '使う') return 'use';
  return '';
}
function displayCapability(value) {
  return ['未検証', '支援があればできる', '定型なら一人でできる', '例外があっても進められる', '人に教える／仕組みにできる'][Number(value) || 0] || '未記録';
}
function displayScaleValue(value, labels) {
  return labels[Number(value) - 1] || '未記録';
}
function countTruthy(record, keys) {
  return keys.filter(key => Number(record.reflection?.[key] || 0) > 0).length;
}

function defaultRecord(overrides = {}) {
  const timestamp = now();
  return {
    id: uid(),
    seedKey: '',
    recordStatus: '事実',
    title: '',
    type: '実例',
    domain: '仕事',
    summary: '',
    tags: [],
    frequency: '単発',
    lastPracticedAt: '',
    fact: { what: '', when: '', role: '', stakeholders: '', result: '' },
    evidenceText: '',
    linkedRecordIds: [],
    conditions: {
      deadline: '未記録', autonomy: '未記録', stakeholderScale: '未記録', uncertainty: '未記録', attributes: [],
    },
    reflection: {
      enjoyment: 0, depletion: 0, capability: 0,
      dataAxis: 0, meaningAxis: 0, peopleAxis: 0, operationsAxis: 0, creativeAxis: 0, technicalAxis: 0,
      notes: '', counterEvidence: '', nextExperiment: '',
    },
    presentation: {
      use: 'まだ使わない', oneLiner: '', reusableConditions: '', translation: '', companyTags: [],
    },
    createdAt: timestamp,
    updatedAt: timestamp,
    ...overrides,
  };
}

function normalizeRecord(record) {
  const base = defaultRecord({ id: record?.id || uid(), createdAt: record?.createdAt || now() });
  const merged = {
    ...base,
    ...record,
    fact: { ...base.fact, ...(record?.fact || {}) },
    conditions: { ...base.conditions, ...(record?.conditions || {}) },
    reflection: { ...base.reflection, ...(record?.reflection || {}) },
    presentation: { ...base.presentation, ...(record?.presentation || {}) },
  };
  merged.tags = normalizeTags(merged.tags);
  merged.seedKey = String(merged.seedKey || '').trim();
  if (!RECORD_STATUSES.includes(merged.recordStatus)) merged.recordStatus = '事実';
  merged.linkedRecordIds = Array.isArray(merged.linkedRecordIds) ? merged.linkedRecordIds : [];
  merged.conditions.attributes = Array.isArray(merged.conditions.attributes) ? merged.conditions.attributes : [];
  merged.presentation.companyTags = normalizeTags(merged.presentation.companyTags);
  for (const key of ['enjoyment', 'depletion', 'capability', ...AXES.map(([key]) => key)]) {
    merged.reflection[key] = Math.max(0, Math.min(key === 'capability' ? 5 : key === 'enjoyment' || key === 'depletion' ? 5 : 3, Number(merged.reflection[key]) || 0));
  }
  merged.updatedAt = record?.updatedAt || base.updatedAt;
  return merged;
}

// IndexedDB ------------------------------------------------------------------
let dbPromise;
function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(RECORD_STORE)) db.createObjectStore(RECORD_STORE, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(HISTORY_STORE)) db.createObjectStore(HISTORY_STORE, { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}
async function dbGetAll(storeName) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const request = tx.objectStore(storeName).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}
async function dbPut(storeName, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).put(value);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
async function dbDelete(storeName, id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
async function dbReplaceAllRecords(records) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(RECORD_STORE, 'readwrite');
    const store = tx.objectStore(RECORD_STORE);
    store.clear();
    records.forEach(record => store.put(record));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
async function saveSnapshot(action, before) {
  const history = { id: uid(), type: 'snapshot', action, createdAt: now(), before: clone(before) };
  await dbPut(HISTORY_STORE, history);
  return history;
}
async function getLatestSnapshot() {
  const rows = await dbGetAll(HISTORY_STORE);
  return rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;
}

// Sample data ----------------------------------------------------------------
function sampleRecords() {
  return PERSONAL_SEED_RECORDS.map(record => normalizeRecord(clone(record)));
}

// Render ---------------------------------------------------------------------
function navButton(view, icon, label) {
  const active = (state.view === view || (view === 'ledger' && state.view === 'detail')) ? 'is-active' : '';
  return `<button class="nav-button ${active}" data-view="${view}"><span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span></button>`;
}
function mobileButton(view, icon, label) {
  const active = (state.view === view || (view === 'ledger' && state.view === 'detail')) ? 'is-active' : '';
  return `<button class="${active}" data-view="${view}"><span aria-hidden="true">${icon}</span><span>${label}</span></button>`;
}
function appChrome(content) {
  const existingSeeds = new Set(state.records.map(record => record.seedKey).filter(Boolean));
  const remainingSeeds = PERSONAL_SEED_RECORDS.filter(record => !existingSeeds.has(record.seedKey)).length;
  const sampleLabel = remainingSeeds ? `初期台帳を追加（${remainingSeeds}件）` : '初期台帳を追加済';
  return `
    <header class="app-header">
      <div class="header-inner">
        <a href="#" class="brand" data-view="inbox" aria-label="実績台帳の受信箱へ">
          <img class="brand-mark" src="assets/evidence-ledger-icon-64.png" width="34" height="34" alt="" />
          <span class="brand-copy"><strong>Evidence Ledger</strong><span>事実を残し、後から検証する</span></span>
        </a>
        <div class="header-actions">
          <button class="secondary-button" data-action="sample" ${remainingSeeds ? '' : 'disabled'} title="${escapeHTML(PERSONAL_SEED_MANIFEST.description)}">${sampleLabel}</button>
          <button class="primary-button" data-action="new-record">＋ 記録する</button>
        </div>
      </div>
    </header>
    <div class="layout">
      <aside class="sidebar">
        <nav class="sidebar-nav" aria-label="主な機能">
          ${navButton('inbox', '＋', '受信箱')}
          ${navButton('ledger', '▤', '台帳')}
          ${navButton('organize', '✓', '整理')}
          ${navButton('discover', '⌁', '発見')}
          ${navButton('output', '↗', '出力')}
          ${navButton('data', '⇄', 'データ')}
        </nav>
        <p class="sidebar-note">まずは事実を残す。<br>評価や面接用の言い換えは、あとから足す。</p>
      </aside>
      <main id="app-main" class="main">${content}</main>
    </div>
    <nav class="mobile-nav" aria-label="モバイルナビゲーション">
      ${mobileButton('inbox', '＋', '記録')}
      ${mobileButton('ledger', '▤', '一覧')}
      ${mobileButton('organize', '✓', '整理')}
      ${mobileButton('data', '⋯', 'その他')}
    </nav>
    ${state.modal ? renderModal() : ''}
  `;
}

function render() {
  const content = {
    inbox: renderInbox,
    ledger: renderLedger,
    detail: renderDetail,
    organize: renderOrganize,
    discover: renderDiscover,
    output: renderOutput,
    data: renderData,
  }[state.view]?.() || renderInbox();
  root.innerHTML = appChrome(content);
  bindEvents();
}

function renderInbox() {
  const records = state.records;
  const complete = records.filter(r => evidenceCount(r) > 0).length;
  const candidates = records.filter(r => r.presentation?.use !== 'まだ使わない').length;
  const used = records.filter(r => r.presentation?.use === '使う').length;
  const recent = [...records].sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5);
  return `
    <section class="page-head">
      <div><h1>受信箱</h1><p>思いついた事実を先に残す。分類や評価は、後からで大丈夫。</p></div>
    </section>
    <section class="inbox-card section">
      <h2>何を残す？</h2>
      <p>実際にやったこと、知っていること、気づいたこと。弱そうでも、まず保管。</p>
      <form id="quick-entry-form">
        <div class="quick-entry"><input id="quick-title" name="title" autocomplete="off" placeholder="例：関係者12人の進行をまとめた" aria-label="残す内容" required><button type="submit">事実メモとして保存</button></div>
        <div class="quick-options">
          <label>領域 <select id="quick-domain" name="domain" style="padding:3px 6px;border:0;border-radius:6px"><option>仕事</option><option>私生活</option><option>学習</option><option>人間関係</option><option>健康</option><option>趣味</option></select></label>
          <label>種類 <select id="quick-type" name="type" style="padding:3px 6px;border:0;border-radius:6px"><option>実例</option><option>能力・知識</option><option>習慣</option><option>気づき</option><option>苦手・反証</option></select></label>
        </div>
      </form>
    </section>
    <section class="section">
      <div class="stat-grid">
        <div class="stat"><strong>${records.length}</strong><span>記録した事実</span></div>
        <div class="stat"><strong>${complete}</strong><span>証拠を足した記録</span></div>
        <div class="stat"><strong>${candidates}</strong><span>面接の候補</span></div>
        <div class="stat"><strong>${used}</strong><span>いま使う素材</span></div>
      </div>
    </section>
    <section class="section">
      <div class="section-title"><h2>迷ったときの入口</h2><p>「強み」ではなく、具体的な出来事を残す。</p></div>
      <div class="suggestion-grid">
        <button class="suggestion" data-suggestion="英語の記事を読んで要点を整理した"><b>読んだ・調べた</b><span>英語、記事、専門知識、比較したこと</span></button>
        <button class="suggestion" data-suggestion="関係者の多い案件で、確認事項を整理した"><b>進めた・調整した</b><span>企画、進行、合意形成、当日運用</span></button>
        <button class="suggestion" data-suggestion="うまくいかなかった条件に気づいた"><b>つまずいた・学んだ</b><span>消耗した条件、反証、次に試すこと</span></button>
      </div>
    </section>
    <section class="section">
      <div class="section-title"><h2>最近の記録</h2><button class="ghost-button" data-view="ledger">台帳を見る →</button></div>
      ${recent.length ? `<div class="record-list">${recent.map(renderRecordCard).join('')}</div>` : renderEmpty('まだ記録がない', 'まずは上の入力欄に、思い出した事実をひとつだけ入れる。', 'new-record', '最初の記録をつくる')}
    </section>
  `;
}

function renderEmpty(title, text, action, label) {
  return `<div class="card empty"><h3>${escapeHTML(title)}</h3><p>${escapeHTML(text)}</p><button class="primary-button" data-action="${action}">${escapeHTML(label)}</button></div>`;
}
function recordBadges(record) {
  const bits = [`<span class="chip type">${escapeHTML(record.type)}</span>`, `<span class="chip domain">${escapeHTML(record.domain)}</span>`];
  if (record.recordStatus && record.recordStatus !== '事実') bits.push(`<span class="chip ${record.recordStatus === '仮説' ? 'warning' : ''}">${escapeHTML(record.recordStatus)}</span>`);
  if (evidenceCount(record)) bits.push(`<span class="chip">証拠 ${evidenceCount(record)}件</span>`);
  if (record.presentation?.use && record.presentation.use !== 'まだ使わない') bits.push(`<span class="chip ${selectedUseClass(record.presentation.use)}">面接：${escapeHTML(record.presentation.use)}</span>`);
  if (!record.summary) bits.push(`<span class="chip warning">要約未整理</span>`);
  return bits.join('');
}
function renderRecordCard(record) {
  const summary = record.summary || record.fact?.what || '詳細を開いて、事実や証拠を足す';
  return `<article class="card record-card" data-record-id="${record.id}">
    <div class="record-card-top">
      <div>
        <h3 class="record-card-title">${escapeHTML(record.title || '無題の記録')}</h3>
        <p class="record-card-summary">${safeText(summary)}</p>
      </div>
      <div class="record-actions">
        <button class="small-button" data-action="open-record" data-record-id="${record.id}">開く</button>
        <button class="small-button" data-action="duplicate-record" data-record-id="${record.id}">複製</button>
      </div>
    </div>
    <div class="record-meta">${recordBadges(record)}${record.tags.slice(0,6).map(tag => `<span class="chip">#${escapeHTML(tag)}</span>`).join('')}<span class="muted" style="font-size:11px;margin-left:auto">更新 ${dateLabel(record.updatedAt)}</span></div>
  </article>`;
}

function renderLedger() {
  const records = getFilteredRecords();
  return `
    <section class="page-head">
      <div><h1>台帳</h1><p>実例・能力・習慣・気づきを横断して探す。評価より、根拠と条件を優先。</p></div>
      <div class="button-row"><button class="secondary-button" data-action="export-filtered">表示中をTSV</button><button class="primary-button" data-action="new-record">＋ 記録する</button></div>
    </section>
    <section class="card section">
      <div class="filter-bar">
        <input data-filter="query" value="${escapeHTML(state.filters.query)}" placeholder="タイトル・内容・タグを検索" aria-label="台帳を検索">
        ${renderSelect('type', state.filters.type, ['すべて', ...TYPES], '種類')}
        ${renderSelect('domain', state.filters.domain, ['すべて', ...DOMAINS], '領域')}
        ${renderSelect('evidence', state.filters.evidence, ['すべて', '証拠あり', '証拠なし', '面接候補', '未整理'], '状態')}
        ${renderSelect('status', state.filters.status || 'すべて', ['すべて', ...RECORD_STATUSES], '記録の扱い')}
        ${renderSelect('order', state.filters.order, ['最近更新', '作成順', '証拠が多い', '好き度', '扱える範囲'], '並び替え')}
      </div>
    </section>
    <section class="section">
      <div class="section-title"><h2>${records.length}件の記録</h2><p>カードを開くと、事実・証拠・条件・振り返りを編集できる。</p></div>
      ${records.length ? `<div class="record-list">${records.map(renderRecordCard).join('')}</div>` : renderEmpty('条件に合う記録がない', '検索や絞り込みを変えるか、新しい記録を追加する。', 'new-record', '記録を追加')}
    </section>
  `;
}
function renderSelect(filter, selected, options, label) {
  return `<select data-filter="${filter}" aria-label="${label}">${options.map(option => `<option ${option === selected ? 'selected' : ''}>${escapeHTML(option)}</option>`).join('')}</select>`;
}
function getFilteredRecords() {
  const query = state.filters.query.trim().toLowerCase();
  const result = state.records.filter(record => {
    const haystack = [record.title, record.summary, record.fact?.what, record.fact?.role, record.evidenceText, record.tags.join(' '), record.conditions?.attributes?.join(' '), record.conditions?.deadline, record.conditions?.autonomy, record.conditions?.stakeholderScale, record.conditions?.uncertainty, record.presentation?.oneLiner, record.recordStatus].join(' ').toLowerCase();
    if (query && !haystack.includes(query)) return false;
    if (state.filters.type !== 'すべて' && record.type !== state.filters.type) return false;
    if (state.filters.domain !== 'すべて' && record.domain !== state.filters.domain) return false;
    if (state.filters.evidence === '証拠あり' && evidenceCount(record) === 0) return false;
    if (state.filters.evidence === '証拠なし' && evidenceCount(record) > 0) return false;
    if (state.filters.evidence === '面接候補' && record.presentation?.use === 'まだ使わない') return false;
    if (state.filters.evidence === '未整理' && record.summary && record.fact?.what) return false;
    if ((state.filters.status || 'すべて') !== 'すべて' && record.recordStatus !== state.filters.status) return false;
    return true;
  });
  const sorter = {
    '最近更新': (a,b) => new Date(b.updatedAt) - new Date(a.updatedAt),
    '作成順': (a,b) => new Date(b.createdAt) - new Date(a.createdAt),
    '証拠が多い': (a,b) => evidenceCount(b) - evidenceCount(a),
    '好き度': (a,b) => (b.reflection?.enjoyment || 0) - (a.reflection?.enjoyment || 0),
    '扱える範囲': (a,b) => (b.reflection?.capability || 0) - (a.reflection?.capability || 0),
  }[state.filters.order];
  return result.sort(sorter);
}

function renderDetail() {
  const draft = state.draft || defaultRecord();
  const isNew = !state.records.some(record => record.id === draft.id);
  const allOtherRecords = state.records.filter(record => record.id !== draft.id);
  return `
    <section class="page-head">
      <div><button class="ghost-button" data-action="back-ledger">← 台帳へ戻る</button><h1 style="margin-top:8px">${isNew ? '新しい記録' : escapeHTML(draft.title || '無題の記録')}</h1><p>事実を先に。評価と面接向けの言い換えは、必要なところだけ後から足す。</p></div>
      <div class="button-row"><button class="danger-button" data-action="delete-record" ${isNew ? 'disabled' : ''}>削除</button><button class="primary-button" data-action="save-record">保存する</button></div>
    </section>
    <section class="detail-layout">
      <form id="detail-form" class="card detail-form" novalidate>
        ${renderDetailCore(draft)}
        ${renderFactSection(draft)}
        ${renderEvidenceSection(draft, allOtherRecords)}
        ${renderConditionsSection(draft)}
        ${renderReflectionSection(draft)}
        ${renderPresentationSection(draft)}
      </form>
      <aside class="detail-aside">
        <div class="card sidebar-summary">
          <div class="key-value"><span>記録の状態</span><strong>${isNew ? 'まだ保存していない' : '保存済み'}</strong></div>
          <div class="key-value"><span>記録の扱い</span><strong>${escapeHTML(draft.recordStatus || '事実')}</strong></div>
          <div class="key-value"><span>証拠</span><strong>${evidenceCount(draft)}件</strong></div>
          <div class="key-value"><span>面接利用</span><strong>${escapeHTML(draft.presentation?.use || 'まだ使わない')}</strong></div>
          <div class="key-value"><span>最終更新</span><strong>${localDateTime(draft.updatedAt)}</strong></div>
          <hr style="border:0;border-top:1px solid var(--line);width:100%;margin:2px 0">
          <p class="help-text">保存前に画面を閉じると、入力中の内容は残らない。長文はまず「事実」として保存してから整える。</p>
          <button class="secondary-button" data-action="save-record">保存する</button>
        </div>
      </aside>
    </section>
  `;
}
function sectionWrapper(key, title, description, content, open = true) {
  const collapsed = state.collapsedSections.has(key);
  return `<section class="form-section ${collapsed ? 'is-collapsed' : ''}" data-section="${key}">
    <button type="button" class="section-toggle" data-action="toggle-section" data-section="${key}"><span><h2>${title}</h2><p>${description}</p></span><span class="chev">⌄</span></button>
    <div class="form-section-content">${content}</div>
  </section>`;
}
function renderDetailCore(draft) {
  return sectionWrapper('core', '記録の基本', '一覧で見つけやすくするための、最小限の情報。', `
    <div class="field-grid">
      ${field('タイトル', 'title', draft.title, '例：テーママッチの告知設計を進める', true)}
      ${selectField('記録の扱い', 'recordStatus', draft.recordStatus, RECORD_STATUSES)}
      ${selectField('種類', 'type', draft.type, TYPES)}
      ${selectField('領域', 'domain', draft.domain, DOMAINS)}
      ${selectField('頻度', 'frequency', draft.frequency, FREQUENCIES)}
      ${field('最終実施日', 'lastPracticedAt', draft.lastPracticedAt, '', false, 'date')}
      ${field('タグ', 'tagsText', draft.tagsText ?? draft.tags.join(' | '), '例：広報 | 企画 | 英語')}
    </div>
    ${field('一言要約', 'summary', draft.summary, '一覧で読めるように、何をした／できるかを短く', false, 'text', true)}
  `);
}
function field(label, path, value, placeholder = '', required = false, type = 'text', textarea = false) {
  const safe = escapeHTML(value ?? '');
  return `<div class="field"><label for="field-${path}">${escapeHTML(label)}${required ? '<span aria-hidden="true"> *</span>' : ''}</label>${textarea ? `<textarea id="field-${path}" data-field="${path}" placeholder="${escapeHTML(placeholder)}">${safe}</textarea>` : `<input id="field-${path}" data-field="${path}" type="${type}" value="${safe}" placeholder="${escapeHTML(placeholder)}" ${required ? 'required' : ''}>`}</div>`;
}
function selectField(label, path, selected, options) {
  return `<div class="field"><label for="field-${path}">${escapeHTML(label)}</label><select id="field-${path}" data-field="${path}">${options.map(option => `<option ${option === selected ? 'selected' : ''}>${escapeHTML(option)}</option>`).join('')}</select></div>`;
}
function renderFactSection(draft) {
  return sectionWrapper('fact', '1. 事実', '評価せずに、何があったかを残す。', `
    ${field('何をしたか', 'fact.what', draft.fact.what, '自分が行ったこと、起きたこと', false, 'text', true)}
    <div class="field-grid three">
      ${field('いつ・どこで', 'fact.when', draft.fact.when, '例：2026年6月／業務')}
      ${field('自分の役割', 'fact.role', draft.fact.role, '例：企画・進行・主担当')}
      ${field('関係者', 'fact.stakeholders', draft.fact.stakeholders, '例：社内3部署＋制作会社')}
    </div>
    ${field('結果・変化', 'fact.result', draft.fact.result, '数字、相手の変化、残ったもの。小さくてもよい。', false, 'text', true)}
  `);
}
function renderEvidenceSection(draft, otherRecords) {
  const links = otherRecords.length ? `<div class="field"><label>紐づく実例・能力</label><div class="checkbox-list">${otherRecords.map(record => `<label class="checkbox-label"><input type="checkbox" data-link-id="${record.id}" ${draft.linkedRecordIds.includes(record.id) ? 'checked' : ''}><span>${escapeHTML(record.title || '無題の記録')}</span></label>`).join('')}</div><p class="help-text">能力・知識の記録に、根拠となる実例をつなぐための欄。</p></div>` : '';
  return sectionWrapper('evidence', '2. 証拠', 'あとから裏取りできるもの。URL、案件名、数字、資料名、第三者の言葉など。', `
    ${field('証拠・具体例', 'evidenceText', draft.evidenceText, '1行に1件。例：\n2026年6月の告知ページ\n販売数 8,418枚\n制作進行表（Google Drive）', false, 'text', true)}
    <p class="help-text">公開できない情報は、案件名やファイル名だけでも残す。秘密情報そのものは貼らない。</p>
    ${links}
  `);
}
function renderConditionsSection(draft) {
  const c = draft.conditions;
  const attrs = c.attributes || [];
  return sectionWrapper('conditions', '3. 条件・背景', '「何が好きか」ではなく、どんな条件で力が出た／出なかったかを残す。', `
    <div class="field-grid">
      ${selectField('期限', 'conditions.deadline', c.deadline, DEADLINES)}
      ${selectField('裁量', 'conditions.autonomy', c.autonomy, AUTONOMIES)}
      ${selectField('関係者の広さ', 'conditions.stakeholderScale', c.stakeholderScale, STAKEHOLDER_SCALES)}
      ${selectField('不確実性', 'conditions.uncertainty', c.uncertainty, UNCERTAINTIES)}
    </div>
    <div class="field" style="margin-top:12px"><label>条件タグ</label><div class="checkbox-list">${CONDITION_OPTIONS.map(option => `<label class="checkbox-label"><input type="checkbox" data-condition="${escapeHTML(option)}" ${attrs.includes(option) ? 'checked' : ''}><span>${escapeHTML(option)}</span></label>`).join('')}</div></div>
  `);
}
function renderScale(path, value, labels) {
  return `<div class="scale">${labels.map((label, index) => { const v = index + 1; return `<button type="button" class="${Number(value) === v ? 'is-selected' : ''}" data-scale="${path}" data-value="${v}">${escapeHTML(label)}</button>`; }).join('')}</div>`;
}
function renderReflectionSection(draft) {
  const r = draft.reflection;
  const capabilityLabels = ['未検証', '支援があれば\nできる', '定型なら\n一人でできる', '例外があっても\n進められる', '人に教える／\n仕組みにできる'];
  const shortFive = ['かなり低い', 'やや低い', '普通', 'やや高い', '高い'];
  const axisLabels = ['0', '1', '2', '3'];
  return sectionWrapper('reflection', '4. 振り返り', '感じ方と実行できた範囲を、事実とは分けて残す。未入力でもよい。', `
    <div class="field-grid three">
      <fieldset class="field-group"><legend>好き度</legend>${renderScale('reflection.enjoyment', r.enjoyment, ['かなり嫌い','やや嫌い','どちらでもない','やや好き','かなり好き'])}</fieldset>
      <fieldset class="field-group"><legend>消耗度</legend>${renderScale('reflection.depletion', r.depletion, shortFive)}</fieldset>
      <fieldset class="field-group"><legend>扱える範囲</legend>${renderScale('reflection.capability', r.capability, capabilityLabels)}</fieldset>
    </div>
    <div class="form-section" style="margin-top:18px"><h2>この記録で扱った要素</h2><p>定量／定性を一本の軸にせず、重なりとして残す。</p><div class="field-grid three">${AXES.map(([key, label]) => `<fieldset class="field-group"><legend>${escapeHTML(label)}</legend><div class="scale compact">${renderScale(`reflection.${key}`, r[key], axisLabels)}</div></fieldset>`).join('')}</div></div>
    ${field('振り返りメモ', 'reflection.notes', r.notes, '何がうまくいったか。何を次も再現したいか。', false, 'text', true)}
    <div class="field-grid">
      ${field('反証・うまくいかなかった条件', 'reflection.counterEvidence', r.counterEvidence, '例：決裁者が不明確な案件では進行が滞った', false, 'text', true)}
      ${field('次に試すこと', 'reflection.nextExperiment', r.nextExperiment, '例：キックオフ時に判断期限を固定する', false, 'text', true)}
    </div>
  `);
}
function renderPresentationSection(draft) {
  const p = draft.presentation;
  return sectionWrapper('presentation', '5. 提示用メモ', '面接や職務経歴書に使うときだけ編集する。私的な記録を勝手に売り物にしない。', `
    <div class="field-grid">
      ${selectField('面接での利用', 'presentation.use', p.use, PRESENTATION_USES)}
      ${field('応募先・用途タグ', 'presentation.companyTagsText', p.companyTagsText ?? (p.companyTags || []).join(' | '), '例：PARK | Account Producer')}
    </div>
    ${field('一言で言うと', 'presentation.oneLiner', p.oneLiner, '例：企画から告知、運用、振り返りまでをつなげる', false, 'text', true)}
    <div class="field-grid">
      ${field('再現できる条件', 'presentation.reusableConditions', p.reusableConditions, '例：目的、対象者、決裁者、期限が共有されている', false, 'text', true)}
      ${field('他社でも通じる言い換え', 'presentation.translation', p.translation, '例：統合コミュニケーション設計・プロジェクト推進', false, 'text', true)}
    </div>
  `);
}

function renderOrganize() {
  const noEvidence = state.records.filter(r => evidenceCount(r) === 0);
  const noConditions = state.records.filter(r => r.conditions?.deadline === '未記録' && r.conditions?.autonomy === '未記録' && r.conditions?.stakeholderScale === '未記録');
  const candidatesWeak = state.records.filter(r => r.presentation?.use !== 'まだ使わない' && evidenceCount(r) < 2);
  const noCounter = state.records.filter(r => (r.type === '能力・知識' || r.type === '実例') && !r.reflection?.counterEvidence?.trim());
  const queues = [
    ['証拠待ち', '数字、URL、資料名、案件名などを足す。', noEvidence],
    ['条件未整理', 'どんな環境・制約のなかで行ったかを残す。', noConditions],
    ['面接候補の補強', '候補だが、具体例が少ない記録。', candidatesWeak],
    ['反証・学び待ち', 'うまくいかなかった条件や次の実験を残す。', noCounter],
  ];
  return `
    <section class="page-head"><div><h1>整理</h1><p>評価を上げる場所ではなく、事実を育てる場所。未整理は失敗ではなく、次の手入れ。</p></div></section>
    <section class="organize-grid section">
      ${queues.map(([title, desc, records]) => `<article class="card queue-card"><h3>${title}</h3><p>${desc}</p><div class="queue-count">${records.length}</div>${records.length ? `<div class="queue-items">${records.slice(0,4).map(r => `<button class="queue-item" data-action="open-record" data-record-id="${r.id}">${escapeHTML(r.title || '無題の記録')}</button>`).join('')}${records.length > 4 ? `<span class="muted" style="font-size:11px">ほか ${records.length - 4}件</span>` : ''}</div>` : '<p class="muted" style="font-size:12px">いまは該当なし。</p>'}</article>`).join('')}
    </section>
    <section class="section">
      <div class="section-title"><h2>整える順番</h2><p>全部を一度に埋めなくてよい。</p></div>
      <div class="card pad"><ol style="margin:0;padding-left:1.25em"><li>「何をしたか」を書く</li><li>案件名・数字・URLなど、裏取りできるものを1つ足す</li><li>期限・裁量・関係者の広さを記録する</li><li>面接で使う必要が出たものだけ、提示用メモへ進める</li></ol></div>
    </section>
  `;
}

function renderDiscover() {
  const scored = state.records.filter(r => Number(r.reflection?.enjoyment) > 0 && Number(r.reflection?.capability) > 0);
  const matrixCells = [];
  for (let capability = 5; capability >= 1; capability--) {
    matrixCells.push(`<div class="matrix-label">${capability}</div>`);
    for (let enjoyment = 1; enjoyment <= 5; enjoyment++) {
      const records = scored.filter(r => Number(r.reflection.capability) === capability && Number(r.reflection.enjoyment) === enjoyment);
      matrixCells.push(`<div class="matrix-cell" data-matrix-capability="${capability}" data-matrix-enjoyment="${enjoyment}">${records.map(r => `<button class="matrix-record" title="${escapeHTML(r.title)}" data-action="open-record" data-record-id="${r.id}">${escapeHTML(r.title)}</button>`).join('')}</div>`);
    }
  }
  const high = scored.filter(r => r.reflection.enjoyment >= 4 && r.reflection.capability >= 4);
  const drain = scored.filter(r => r.reflection.capability >= 4 && r.reflection.enjoyment <= 2);
  const grow = scored.filter(r => r.reflection.enjoyment >= 4 && r.reflection.capability <= 2);
  const axisTotals = AXES.map(([key, label]) => ({ label, total: state.records.reduce((sum, r) => sum + Number(r.reflection?.[key] || 0), 0) })).sort((a,b) => b.total - a.total);
  return `
    <section class="page-head"><div><h1>発見</h1><p>診断ではなく、記録に現れている傾向を見る。評価が入った記録だけを表示。</p></div></section>
    <section class="discover-grid section">
      <div class="card pad">
        <div class="section-title"><h2>好き度 × 扱える範囲</h2><p>${scored.length}件を表示</p></div>
        <div class="matrix" role="img" aria-label="横軸が好き度、縦軸が扱える範囲のマトリクス">
          <div></div>${[1,2,3,4,5].map(n => `<div class="matrix-label">好き度 ${n}</div>`).join('')}
          ${matrixCells.join('')}
          <div></div>${[1,2,3,4,5].map(n => `<div class="matrix-label">${n}</div>`).join('')}
        </div>
        <p class="axis-note">上・右にあるほど「好きで、例外があっても進められる」と自己評価した記録。結論ではなく、掘る候補。</p>
      </div>
      <aside class="insight-list">
        <article class="insight"><strong>好きで、扱える範囲も広い</strong><p>${high.length}件。面接で使う前に、証拠と再現条件を確認する。</p></article>
        <article class="insight"><strong>得意だが、好きではない</strong><p>${drain.length}件。消耗の原因を条件欄で確かめる。</p></article>
        <article class="insight"><strong>好きだが、まだ育成中</strong><p>${grow.length}件。次の実験や学習の入口にする。</p></article>
        <article class="insight"><strong>記録で多く扱っている要素</strong><p>${axisTotals.filter(x => x.total > 0).slice(0,3).map(x => `${escapeHTML(x.label)} ${x.total}`).join(' ／ ') || '評価を入れると、ここに傾向が出る。'}</p></article>
      </aside>
    </section>
    <section class="section"><div class="section-title"><h2>条件別に見る</h2><p>「何が得意か」より、「どんな環境で力が出るか」を見る。</p></div><div class="suggestion-grid">
      ${['短納期', '関係者が多い', '前例なし'].map(condition => {
        const records = state.records.filter(r => r.conditions?.deadline === condition || r.conditions?.attributes?.includes(condition) || r.conditions?.uncertainty === condition);
        return `<button class="suggestion" data-action="show-condition" data-condition-label="${condition}"><b>${condition}</b><span>${records.length}件。クリックで該当記録を台帳で見る。</span></button>`;
      }).join('')}
    </div></section>
  `;
}

function renderOutput() {
  const records = [...state.records].sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  if (!state.outputInitialized) {
    records.filter(r => r.presentation?.use === '使う').forEach(r => state.outputSelection.add(r.id));
    state.outputInitialized = true;
  }
  const selected = records.filter(r => state.outputSelection.has(r.id));
  const output = generateOutput(selected, state.outputFormat);
  return `
    <section class="page-head"><div><h1>出力</h1><p>台帳本体とは別に、必要な記録だけを面接・職務経歴書用に編集する。</p></div><div class="button-row"><button class="secondary-button" data-action="copy-output">コピー</button><button class="primary-button" data-action="export-output-tsv">選択分をTSV</button></div></section>
    <section class="output-layout">
      <div class="card output-select"><div class="section-title"><h2>使う記録</h2><p>${selected.length}件選択</p></div>${records.length ? records.map(r => `<label class="output-record"><input type="checkbox" data-output-id="${r.id}" ${state.outputSelection.has(r.id) ? 'checked' : ''}><span><b>${escapeHTML(r.title || '無題の記録')}</b><br><span class="muted">${escapeHTML(r.presentation?.oneLiner || r.summary || r.type)}</span></span></label>`).join('') : '<p class="muted">まずは台帳に記録を追加する。</p>'}</div>
      <div class="card output-result"><div class="section-title"><h2>生成する形式</h2><select data-output-format><option value="interview" ${state.outputFormat === 'interview' ? 'selected' : ''}>面接で話す素材</option><option value="bullets" ${state.outputFormat === 'bullets' ? 'selected' : ''}>職務経歴書向け箇条書き</option><option value="evidence" ${state.outputFormat === 'evidence' ? 'selected' : ''}>根拠つき実績一覧</option></select></div><textarea readonly aria-label="出力結果">${escapeHTML(output)}</textarea><p class="help-text">自動生成は下書き。事実と応募先の文脈を見て、最後に自分で編集する。</p></div>
    </section>
  `;
}
function generateOutput(records, format) {
  if (!records.length) return '左から、面接で使いたい記録を選ぶとここに下書きが出ます。';
  if (format === 'bullets') {
    return records.map(r => `・${r.presentation?.oneLiner || r.summary || r.title}\n  - 具体例：${r.fact?.what || '要追記'}\n  - 根拠：${evidenceLines(r.evidenceText).slice(0,2).join('／') || '要追記'}\n  - 再現条件：${r.presentation?.reusableConditions || '要整理'}`).join('\n\n');
  }
  if (format === 'evidence') {
    return records.map(r => `【${r.title}】\n種類：${r.type}｜領域：${r.domain}\n事実：${r.fact?.what || r.summary || '要追記'}\n役割：${r.fact?.role || '要追記'}\n結果：${r.fact?.result || '要追記'}\n証拠：${evidenceLines(r.evidenceText).join('／') || '要追記'}\n条件：期限 ${r.conditions?.deadline || '未記録'}、裁量 ${r.conditions?.autonomy || '未記録'}、関係者 ${r.conditions?.stakeholderScale || '未記録'}\n`).join('\n');
  }
  return `【面接で話す素材】\n\n${records.map((r, index) => `${index + 1}. ${r.presentation?.oneLiner || r.summary || r.title}\n・実例：${r.fact?.what || '要追記'}\n・自分の役割：${r.fact?.role || '要追記'}\n・残ったもの：${r.fact?.result || '要追記'}\n・再現できる条件：${r.presentation?.reusableConditions || '要整理'}\n`).join('\n')}`;
}

function renderData() {
  const latestSnapshotNote = 'TSVは「貼る → 読み取る → 差分を見る → 反映する」の順。反映前に自動バックアップを残す。';
  return `
    <section class="page-head"><div><h1>データ</h1><p>スプレッドシートで磨くためのTSV入出力。全置換は、必要なときだけ使う。</p></div></section>
    <section class="card section" style="border-color:#f0c36a;background:#fffaf0">
      <h2 style="margin-top:0">公開設定の注意</h2>
      <p style="margin-bottom:0">このプロジェクトの <span class="mono">sample-data.js</span> と <span class="mono">sample-data.tsv</span> には、個人のキャリア情報や業務メモが入る。GitHub Pagesを公開リポジトリで運用する場合は、この2ファイルを削除・置換した公開版を使う。個人用の台帳はローカルまたは非公開環境で管理する。</p>
    </section>
    <section class="data-grid section">
      <article class="card data-action"><h3>全件バックアップ</h3><p>現在の台帳を、すべての列を含むTSVで書き出す。</p><button class="primary-button" data-action="export-all">全件TSVを保存</button></article>
      <article class="card data-action"><h3>表示中を書き出す</h3><p>台帳の検索・絞り込み条件に合う記録だけを出力する。</p><button class="secondary-button" data-action="export-filtered">表示中をTSV</button></article>
      <article class="card data-action"><h3>空テンプレート</h3><p>ChatGPTやスプレッドシートで項目を増やすための見出しをコピーする。</p><button class="secondary-button" data-action="copy-template">テンプレートをコピー</button></article>
    </section>
    <section class="card import-panel section">
      <div class="section-title"><div><h2>TSVを取り込む</h2><p>貼り付けた時点では、まだ台帳を書き換えない。</p></div><button class="secondary-button" data-action="undo-import">直前の取り込みを戻す</button></div>
      <div class="import-mode-grid">
        ${renderModeChoice('append', '追加', '既存データに触れず、新しい行を足す。')}
        ${renderModeChoice('partial', '部分更新', 'IDが一致する行の、入っている列だけを更新。')}
        ${renderModeChoice('restore', '全件復元', 'バックアップTSVを台帳全体として復元。')}
        ${renderModeChoice('replace', '全置換', '現在の台帳をTSVの内容で完全に置き換える。')}
      </div>
      <textarea id="import-text" placeholder="ここにTSVを貼り付ける。\nGoogleスプレッドシートやExcelから、そのまま貼れる。">${escapeHTML(state.importText)}</textarea>
      <div class="button-row" style="margin-top:10px"><button class="primary-button" data-action="analyze-import">読み取って差分を見る</button><button class="secondary-button" data-action="load-template">テンプレートを入れる</button><label class="secondary-button" for="tsv-file">TSVファイルを選ぶ</label><input class="hidden" id="tsv-file" type="file" accept=".tsv,.txt,text/tab-separated-values"></div>
      <div class="data-note">${latestSnapshotNote}<br>部分更新は <span class="mono">__id</span> が必須。列がない／セルが空欄なら既存値は変更しない。消す場合だけ <span class="mono">__CLEAR__</span> と入れる。</div>
      ${state.importPreview ? renderImportPreview() : ''}
    </section>
  `;
}
function renderModeChoice(mode, title, desc) {
  return `<button class="mode-choice ${state.importMode === mode ? 'is-selected' : ''}" data-action="set-import-mode" data-mode="${mode}"><strong>${title}</strong><span>${desc}</span></button>`;
}
function renderImportPreview() {
  const preview = state.importPreview;
  const rows = preview.rows.slice(0, 30);
  const actionLabels = { new: '追加', update: '更新', skip: 'スキップ', warning: '注意', error: 'エラー' };
  const classByAction = { new: 'diff-new', update: 'diff-update', skip: 'diff-warning', warning: 'diff-warning', error: 'diff-error' };
  const errors = preview.rows.filter(row => row.status === 'error').length;
  return `<div class="preview"><div class="section-title"><div><h2>差分プレビュー</h2><p>追加 ${preview.counts.new}件／更新 ${preview.counts.update}件／スキップ ${preview.counts.skip}件／エラー ${errors}件</p></div><button class="primary-button" data-action="apply-import" ${errors ? 'disabled' : ''}>${state.importMode === 'replace' ? '全置換を実行' : state.importMode === 'restore' ? '復元する' : '反映する'}</button></div>
  ${state.importMode === 'replace' || state.importMode === 'restore' ? `<div class="data-note">${state.importMode === 'replace' ? '全置換は、TSVにない記録を削除する。反映前にバックアップを作る。' : '全件復元は、現在の台帳をバックアップTSVの内容に戻す。'} </div>` : ''}
  <table><thead><tr><th>行</th><th>タイトル</th><th>判定</th><th>内容</th></tr></thead><tbody>${rows.map(row => `<tr><td>${row.index}</td><td>${escapeHTML(row.title || '—')}</td><td class="${classByAction[row.status]}">${actionLabels[row.status]}</td><td>${escapeHTML(row.message)}</td></tr>`).join('')}</tbody></table>${preview.rows.length > 30 ? `<p class="help-text" style="margin-top:8px">先頭30件を表示中。全 ${preview.rows.length}件。</p>` : ''}</div>`;
}
function renderModal() {
  const modal = state.modal;
  if (modal.type === 'confirm-replace') {
    return `<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><h2 id="modal-title">${modal.title}</h2><p>${modal.description}</p><p><b>現在の台帳：${modal.current}件</b><br>取り込みデータ：${modal.next}件<br>削除予定：${modal.deleted}件</p><label class="field">確認のため、<span class="mono">${modal.confirmText}</span> と入力<input id="confirm-replace-input" autocomplete="off"></label><div class="button-row" style="margin-top:16px"><button class="secondary-button" data-action="close-modal">やめる</button><button class="danger-button" data-action="confirm-replace" data-confirm-text="${escapeHTML(modal.confirmText)}">実行する</button></div></div></div>`;
  }
  return '';
}

// TSV ------------------------------------------------------------------------
const CANONICAL_HEADERS = [
  '__id','seedKey','recordStatus','title','type','domain','summary','tags','frequency','lastPracticedAt',
  'fact.what','fact.when','fact.role','fact.stakeholders','fact.result','evidenceText','linkedRecordIds',
  'conditions.deadline','conditions.autonomy','conditions.stakeholderScale','conditions.uncertainty','conditions.attributes',
  'reflection.enjoyment','reflection.depletion','reflection.capability','reflection.dataAxis','reflection.meaningAxis','reflection.peopleAxis','reflection.operationsAxis','reflection.creativeAxis','reflection.technicalAxis','reflection.notes','reflection.counterEvidence','reflection.nextExperiment',
  'presentation.use','presentation.oneLiner','presentation.reusableConditions','presentation.translation','presentation.companyTags','createdAt','updatedAt',
];
const HEADER_LABELS = {
  '__id':'__id','seedKey':'__seed','recordStatus':'記録の扱い','title':'タイトル','type':'種類','domain':'領域','summary':'一言要約','tags':'タグ','frequency':'頻度','lastPracticedAt':'最終実施日',
  'fact.what':'何をしたか','fact.when':'いつ・どこで','fact.role':'自分の役割','fact.stakeholders':'関係者','fact.result':'結果・変化','evidenceText':'証拠・具体例','linkedRecordIds':'紐づくID',
  'conditions.deadline':'期限','conditions.autonomy':'裁量','conditions.stakeholderScale':'関係者の広さ','conditions.uncertainty':'不確実性','conditions.attributes':'条件タグ',
  'reflection.enjoyment':'好き度','reflection.depletion':'消耗度','reflection.capability':'扱える範囲','reflection.dataAxis':'数字・データ','reflection.meaningAxis':'言葉・文脈','reflection.peopleAxis':'人・利害','reflection.operationsAxis':'現場運用','reflection.creativeAxis':'制作・表現','reflection.technicalAxis':'技術・仕組み','reflection.notes':'振り返りメモ','reflection.counterEvidence':'反証・うまくいかなかった条件','reflection.nextExperiment':'次に試すこと',
  'presentation.use':'面接での利用','presentation.oneLiner':'一言で言うと','presentation.reusableConditions':'再現できる条件','presentation.translation':'他社でも通じる言い換え','presentation.companyTags':'応募先・用途タグ','createdAt':'作成日時','updatedAt':'更新日時',
};
const HEADER_ALIASES = (() => {
  const map = {};
  Object.entries(HEADER_LABELS).forEach(([key, label]) => { map[normalizeKey(key)] = key; map[normalizeKey(label)] = key; });
  const aliases = {
    id:'__id', recordid:'__id', id:'__id', 得意度:'reflection.capability', 得意不得意:'reflection.capability', 扱える範囲:'reflection.capability',
    好き嫌い:'reflection.enjoyment', 好き度:'reflection.enjoyment', 消耗:'reflection.depletion', 消耗度:'reflection.depletion',
    証拠:'evidenceText', 証拠具体例:'evidenceText', 内容:'summary', メモ:'summary',
    実績:'fact.what', できること:'fact.what', 何をした:'fact.what',
    面接利用:'presentation.use', 面接で使えるか:'presentation.use',
    数字:'reflection.dataAxis', 定量:'reflection.dataAxis', 定性:'reflection.meaningAxis', 文脈:'reflection.meaningAxis',
    タグ:'tags', 種別:'type', 分類:'type',
  };
  Object.entries(aliases).forEach(([alias, key]) => { map[normalizeKey(alias)] = key; });
  return map;
})();
function quoteTSV(value) {
  const text = String(value ?? '');
  return /[\t\n\r"]/.test(text) ? `"${text.replaceAll('"','""')}"` : text;
}
function recordToTsvRow(record) {
  const get = path => getByPath(record, path);
  return CANONICAL_HEADERS.map(key => {
    if (key === '__id') return record.id;
    if (key === 'seedKey') return record.seedKey || '';
    const value = get(key);
    if (Array.isArray(value)) return value.join(' | ');
    return value ?? '';
  });
}
function buildTSV(records) {
  const headers = CANONICAL_HEADERS.map(key => HEADER_LABELS[key]);
  return [headers, ...records.map(recordToTsvRow)].map(row => row.map(quoteTSV).join('\t')).join('\n');
}
function buildTemplateTSV() {
  const example = defaultRecord({
    id: '例のID（新規追加なら空欄でOK）',
    recordStatus: '事実',
    title: '例：英語記事を読んで要点を整理した', type: '能力・知識', domain: '学習', summary: '英語記事を読み、仕事に使える日本語メモへ整理する', tags: ['英語','リサーチ'], frequency: '継続中',
    fact: { what: '海外記事を読んで要点を日本語で整理した', when: '2026年6月', role: '個人', stakeholders: '自分', result: '論点をすぐ使える形にした' },
    evidenceText: '記事URL\n要点メモ',
    conditions: { deadline:'余裕あり', autonomy:'高い', stakeholderScale:'自分中心', uncertainty:'例外あり', attributes:['裁量あり','文章化が必要'] },
    reflection: { enjoyment:4, depletion:2, capability:3, dataAxis:1, meaningAxis:3, peopleAxis:0, operationsAxis:0, creativeAxis:1, technicalAxis:0, notes:'', counterEvidence:'専門用語は要確認', nextExperiment:'5分で口頭説明する' },
    presentation: { use:'候補', oneLiner:'海外情報を仕事で使える論点に変換できる', reusableConditions:'出力先が明確なとき', translation:'英語による情報収集', companyTags:['英語','リサーチ'] },
  });
  return buildTSV([example]);
}
function parseTSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"') {
      if (inQuotes && next === '"') { cell += '"'; i++; }
      else inQuotes = !inQuotes;
      continue;
    }
    if (!inQuotes && char === '\t') { row.push(cell); cell = ''; continue; }
    if (!inQuotes && (char === '\n' || char === '\r')) {
      if (char === '\r' && next === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = ''; continue;
    }
    cell += char;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(row => row.some(cell => String(cell).trim() !== ''));
}
function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}
function setByPath(obj, path, value) {
  const keys = path.split('.');
  const last = keys.pop();
  const target = keys.reduce((acc, key) => { if (!acc[key] || typeof acc[key] !== 'object') acc[key] = {}; return acc[key]; }, obj);
  target[last] = value;
}
function valueFromTSV(path, raw) {
  const value = String(raw ?? '');
  if (value === '__CLEAR__') return '__CLEAR__';
  if (['tags','conditions.attributes','presentation.companyTags','linkedRecordIds'].includes(path)) return normalizeTags(value);
  if (['reflection.enjoyment','reflection.depletion','reflection.capability','reflection.dataAxis','reflection.meaningAxis','reflection.peopleAxis','reflection.operationsAxis','reflection.creativeAxis','reflection.technicalAxis'].includes(path)) {
    const lookup = {
      'かなり嫌い':1,'やや嫌い':2,'どちらでもない':3,'やや好き':4,'かなり好き':5,
      'かなり低い':1,'やや低い':2,'普通':3,'やや高い':4,'高い':5,
      '未検証':1,'支援があればできる':2,'定型なら一人でできる':3,'例外があっても進められる':4,'人に教える／仕組みにできる':5,
    };
    return Number.isFinite(Number(value)) && value !== '' ? Number(value) : (lookup[value] || 0);
  }
  return value;
}
function analyzeImport(text, mode) {
  const table = parseTSV(text);
  if (table.length < 2) return { error: '見出し行と、少なくとも1行のデータが必要。' };
  const rawHeaders = table[0];
  const columnMap = rawHeaders.map(header => HEADER_ALIASES[normalizeKey(header)] || null);
  const validColumns = columnMap.filter(Boolean);
  if (!validColumns.includes('title') && !validColumns.includes('__id')) return { error: '「タイトル」または「__id」列が見つからない。テンプレートの見出しを使う。' };
  const existingById = new Map(state.records.map(record => [record.id, record]));
  const existingTitles = new Map();
  state.records.forEach(record => {
    const key = normalizeKey(record.title);
    if (key) existingTitles.set(key, (existingTitles.get(key) || []).concat(record));
  });
  const rows = table.slice(1).map((cells, index) => {
    const input = {};
    cells.forEach((cell, colIndex) => {
      const path = columnMap[colIndex];
      if (path) input[path] = valueFromTSV(path, cell);
    });
    const rowIndex = index + 2;
    const id = input.__id?.trim();
    const title = input.title?.trim();
    const existing = id ? existingById.get(id) : null;
    const titleMatches = title ? (existingTitles.get(normalizeKey(title)) || []) : [];
    let status = 'new';
    let message = '新しい記録として追加する';
    let record = null;
    if (mode === 'append') {
      if (!title) { status = 'error'; message = '追加にはタイトルが必要。'; }
      else if (id && existing) { status = 'skip'; message = '同じIDが既にあるため、追加では触らない。部分更新を使う。'; }
      else { record = recordFromImport(input, defaultRecord({ id: id || uid() }), 'new'); }
    }
    if (mode === 'partial') {
      if (!id) { status = 'error'; message = '部分更新には __id が必要。'; }
      else if (!existing) { status = 'error'; message = '一致するIDが見つからない。'; }
      else {
        status = 'update'; message = `入力のある ${Object.keys(input).filter(k => k !== '__id' && String(input[k] ?? '') !== '').length}列を更新する`;
        record = recordFromImport(input, clone(existing), 'partial');
      }
    }
    if (mode === 'restore' || mode === 'replace') {
      if (!title) { status = 'error'; message = '全件復元・全置換にはタイトルが必要。'; }
      else {
        const targetId = id || uid();
        status = existingById.has(targetId) ? 'update' : 'new';
        message = existingById.has(targetId) ? '同じIDの記録を置き換える' : '新しい記録として登録する';
        record = recordFromImport(input, defaultRecord({ id: targetId }), 'new');
      }
    }
    if (titleMatches.length > 1 && !id && status === 'new') { status = 'warning'; message = '同じタイトルの記録が複数ある。重複を確認する。'; }
    return { index: rowIndex, input, title: title || input['fact.what'] || '', status, message, record };
  });
  const counts = { new:0, update:0, skip:0, warning:0, error:0 };
  rows.forEach(row => counts[row.status]++);
  return { rows, counts, columnMap, rawHeaders };
}
function recordFromImport(input, base, mode) {
  const target = normalizeRecord(base);
  Object.entries(input).forEach(([path, value]) => {
    if (path === '__id') return;
    if (mode === 'partial' && (value === '' || value == null)) return;
    if (value === '__CLEAR__') {
      if (['tags','conditions.attributes','presentation.companyTags','linkedRecordIds'].includes(path)) setByPath(target, path, []);
      else if (path.startsWith('reflection.')) setByPath(target, path, 0);
      else setByPath(target, path, '');
      return;
    }
    setByPath(target, path, value);
  });
  if (input.__id && input.__id !== '__CLEAR__') target.id = input.__id;
  target.tags = normalizeTags(target.tags);
  target.conditions.attributes = normalizeTags(target.conditions.attributes);
  target.presentation.companyTags = normalizeTags(target.presentation.companyTags);
  target.linkedRecordIds = normalizeTags(target.linkedRecordIds);
  target.updatedAt = now();
  return normalizeRecord(target);
}

// Event handling --------------------------------------------------------------
function bindEvents() {
  root.onclick = handleClick;
  root.oninput = handleInput;
  root.onchange = handleChange;
  root.onsubmit = handleSubmit;
}
async function handleClick(event) {
  const target = event.target.closest('[data-action], [data-view], [data-suggestion], [data-scale]');
  if (!target) return;
  const view = target.dataset.view;
  if (view) { event.preventDefault(); navigate(view); return; }
  if (target.dataset.suggestion !== undefined) {
    const input = document.getElementById('quick-title');
    if (input) { input.value = target.dataset.suggestion; input.focus(); }
    return;
  }
  if (target.dataset.scale && state.draft) {
    setByPath(state.draft, target.dataset.scale, Number(target.dataset.value));
    render();
    return;
  }
  const action = target.dataset.action;
  if (!action) return;
  if (action === 'new-record') return createNewRecord();
  if (action === 'open-record') return openRecord(target.dataset.recordId);
  if (action === 'duplicate-record') return duplicateRecord(target.dataset.recordId);
  if (action === 'back-ledger') { state.activeRecordId = null; state.draft = null; navigate('ledger'); return; }
  if (action === 'save-record') return saveDraft();
  if (action === 'delete-record') return deleteActiveRecord();
  if (action === 'toggle-section') { toggleSection(target.dataset.section); return; }
  if (action === 'export-all') return downloadTSV(state.records, 'evidence-ledger-all.tsv');
  if (action === 'export-filtered') return downloadTSV(getFilteredRecords(), 'evidence-ledger-filtered.tsv');
  if (action === 'copy-template') return copyToClipboard(buildTemplateTSV(), 'TSVテンプレートをコピーした');
  if (action === 'load-template') { state.importText = buildTemplateTSV(); state.importPreview = null; render(); toast('テンプレートを入力欄に入れた'); return; }
  if (action === 'set-import-mode') { state.importMode = target.dataset.mode; state.importPreview = null; render(); return; }
  if (action === 'analyze-import') return analyzeCurrentImport();
  if (action === 'apply-import') return beginApplyImport();
  if (action === 'undo-import') return undoImport();
  if (action === 'confirm-replace') return confirmReplace();
  if (action === 'close-modal') { state.modal = null; render(); return; }
  if (action === 'sample') return insertSampleData();
  if (action === 'copy-output') return copyToClipboard(generateOutput(getSelectedOutputRecords(), state.outputFormat), '出力結果をコピーした');
  if (action === 'export-output-tsv') return downloadTSV(getSelectedOutputRecords(), 'evidence-ledger-selection.tsv');
  if (action === 'show-condition') return filterByCondition(target.dataset.conditionLabel);
}
function handleInput(event) {
  const input = event.target;
  if (input.id === 'import-text') { state.importText = input.value; state.importPreview = null; return; }
  if (input.dataset.filter) { state.filters[input.dataset.filter] = input.value; if (input.dataset.filter === 'query') debounceRenderLedger(); return; }
  if (input.dataset.field && state.draft) { setByPath(state.draft, input.dataset.field, input.value); return; }
}
let ledgerRenderTimer;
function debounceRenderLedger() {
  clearTimeout(ledgerRenderTimer);
  ledgerRenderTimer = setTimeout(() => { if (state.view === 'ledger') render(); }, 180);
}
function handleChange(event) {
  const input = event.target;
  if (input.dataset.filter) { state.filters[input.dataset.filter] = input.value; render(); return; }
  if (input.dataset.field && state.draft) { setByPath(state.draft, input.dataset.field, input.value); return; }
  if (input.dataset.linkId && state.draft) {
    const id = input.dataset.linkId;
    const set = new Set(state.draft.linkedRecordIds || []);
    input.checked ? set.add(id) : set.delete(id);
    state.draft.linkedRecordIds = [...set];
    return;
  }
  if (input.dataset.condition && state.draft) {
    const value = input.dataset.condition;
    const set = new Set(state.draft.conditions.attributes || []);
    input.checked ? set.add(value) : set.delete(value);
    state.draft.conditions.attributes = [...set];
    return;
  }
  if (input.dataset.outputId) {
    input.checked ? state.outputSelection.add(input.dataset.outputId) : state.outputSelection.delete(input.dataset.outputId);
    if (state.view === 'output') render();
    return;
  }
  if ('outputFormat' in input.dataset) { state.outputFormat = input.value; render(); return; }
  if (input.id === 'tsv-file') {
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { state.importText = String(reader.result || ''); state.importPreview = null; render(); toast('TSVファイルを読み込んだ'); };
    reader.readAsText(file, 'utf-8');
  }
}
function handleSubmit(event) {
  if (event.target.id === 'quick-entry-form') {
    event.preventDefault();
    const form = new FormData(event.target);
    const title = String(form.get('title') || '').trim();
    if (!title) return;
    const record = defaultRecord({ title, type: String(form.get('type')), domain: String(form.get('domain')), summary: title });
    state.draft = record;
    state.activeRecordId = record.id;
    state.view = 'detail';
    render();
    toast('下書きを作った。必要なら詳細を足して保存。');
  }
}

function navigate(view) {
  if (view === 'data' && window.innerWidth < 720) {
    // mobile "その他" is intentionally data first; data includes safe import/export.
  }
  state.view = view;
  if (view !== 'detail') { state.activeRecordId = null; state.draft = null; }
  render();
}
function createNewRecord() {
  state.draft = defaultRecord();
  state.activeRecordId = state.draft.id;
  state.view = 'detail';
  state.collapsedSections = new Set(['evidence','conditions','reflection','presentation']);
  render();
}
function openRecord(id) {
  const record = state.records.find(r => r.id === id);
  if (!record) return toast('記録が見つからない');
  state.draft = clone(record);
  state.activeRecordId = id;
  state.view = 'detail';
  state.collapsedSections = new Set();
  render();
}
async function duplicateRecord(id) {
  const record = state.records.find(r => r.id === id);
  if (!record) return;
  const duplicated = clone(record);
  duplicated.id = uid();
  duplicated.title = `${record.title}（複製）`;
  duplicated.createdAt = now();
  duplicated.updatedAt = now();
  state.draft = duplicated;
  state.activeRecordId = duplicated.id;
  state.view = 'detail';
  render();
  toast('複製を作った。必要なところだけ直して保存。');
}
function toggleSection(key) {
  state.collapsedSections.has(key) ? state.collapsedSections.delete(key) : state.collapsedSections.add(key);
  render();
}
async function saveDraft() {
  if (!state.draft) return;
  const title = String(state.draft.title || '').trim();
  if (!title) { toast('タイトルを入れてから保存して。'); document.getElementById('field-title')?.focus(); return; }
  state.draft.title = title;
  state.draft.tags = normalizeTags(state.draft.tagsText ?? state.draft.tags);
  delete state.draft.tagsText;
  state.draft.presentation.companyTags = normalizeTags(state.draft.presentation.companyTagsText ?? state.draft.presentation.companyTags);
  delete state.draft.presentation.companyTagsText;
  state.draft.updatedAt = now();
  const record = normalizeRecord(state.draft);
  await dbPut(RECORD_STORE, record);
  const index = state.records.findIndex(r => r.id === record.id);
  if (index >= 0) state.records[index] = record; else state.records.unshift(record);
  state.draft = clone(record);
  state.activeRecordId = record.id;
  render();
  toast('保存した');
}
async function deleteActiveRecord() {
  if (!state.activeRecordId) return;
  const record = state.records.find(r => r.id === state.activeRecordId);
  if (!record) return;
  if (!confirm(`「${record.title}」を削除する？\nこの操作は通常の保存履歴には残らない。`)) return;
  await dbDelete(RECORD_STORE, record.id);
  state.records = state.records.filter(r => r.id !== record.id);
  state.activeRecordId = null;
  state.draft = null;
  state.view = 'ledger';
  render();
  toast('削除した');
}
async function insertSampleData() {
  const existingSeeds = new Set(state.records.map(record => record.seedKey).filter(Boolean));
  const records = sampleRecords().filter(record => !existingSeeds.has(record.seedKey));
  if (!records.length) { toast('初期台帳はすべて追加済み。'); return; }
  const message = `初期台帳 ${records.length}件を追加する？
今の記録は消さない。事実・自己観察・仮説が混ざるため、あとで根拠を確認して育てる。`;
  if (!confirm(message)) return;
  for (const record of records) {
    record.id = uid();
    record.createdAt = now();
    record.updatedAt = now();
    await dbPut(RECORD_STORE, record);
  }
  state.records = [...records, ...state.records].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  render();
  toast(`初期台帳を ${records.length}件追加した。まずは『整理』で証拠と仮説を見直す。`);
}
function filterByCondition(condition) {
  state.filters = { ...state.filters, query: condition, type: 'すべて', domain: 'すべて', evidence: 'すべて', status: 'すべて', order: '最近更新' };
  state.view = 'ledger';
  render();
}
function getSelectedOutputRecords() {
  return state.records.filter(record => state.outputSelection.has(record.id));
}

// Import actions --------------------------------------------------------------
function analyzeCurrentImport() {
  const text = state.importText.trim();
  if (!text) { toast('TSVを貼り付けてから読み取る。'); return; }
  const analyzed = analyzeImport(text, state.importMode);
  if (analyzed.error) { toast(analyzed.error); return; }
  state.importPreview = analyzed;
  state.importHeaders = analyzed.rawHeaders;
  render();
  toast('差分を作った。反映前に内容を確認して。');
}
function beginApplyImport() {
  const preview = state.importPreview;
  if (!preview) return;
  if (preview.counts.error) { toast('エラー行を直してから反映する。'); return; }
  if (state.importMode === 'replace' || state.importMode === 'restore') {
    const next = preview.rows.filter(row => row.record && row.status !== 'error').map(row => row.record);
    const nextIds = new Set(next.map(r => r.id));
    const deleted = state.records.filter(r => !nextIds.has(r.id)).length;
    state.modal = {
      type: 'confirm-replace',
      title: state.importMode === 'replace' ? '全置換を実行する' : '全件復元を実行する',
      description: state.importMode === 'replace' ? 'TSVにない記録は削除される。反映前の台帳は自動バックアップする。' : '現在の台帳を、貼り付けたTSVの状態へ戻す。反映前の台帳は自動バックアップする。',
      current: state.records.length, next: next.length, deleted,
      confirmText: `${state.records.length}件を${state.importMode === 'replace' ? '置き換える' : '復元する'}`,
    };
    render();
    return;
  }
  applyImport();
}
async function confirmReplace() {
  const input = document.getElementById('confirm-replace-input');
  const expected = state.modal?.confirmText;
  if (!input || input.value.trim() !== expected) { toast(`確認文「${expected}」を入力して。`); return; }
  state.modal = null;
  await applyImport();
}
async function applyImport() {
  const preview = state.importPreview;
  if (!preview) return;
  const before = clone(state.records);
  await saveSnapshot(`TSV ${state.importMode}`, before);
  let next = clone(state.records);
  const updates = preview.rows.filter(row => row.record && !['error','skip'].includes(row.status));
  if (state.importMode === 'append') {
    updates.forEach(row => { next.push(row.record); });
  } else if (state.importMode === 'partial') {
    updates.forEach(row => { const i = next.findIndex(record => record.id === row.record.id); if (i >= 0) next[i] = row.record; });
  } else {
    next = updates.map(row => row.record);
  }
  // guard duplicate ids in replace / restore
  const ids = new Set();
  for (const record of next) {
    if (ids.has(record.id)) { toast('同じIDが複数あるため反映できない。'); return; }
    ids.add(record.id);
  }
  next = next.map(normalizeRecord);
  await dbReplaceAllRecords(next);
  state.records = next;
  state.importPreview = null;
  state.importText = '';
  render();
  const counts = preview.counts;
  toast(`反映した：追加 ${counts.new}件／更新 ${counts.update}件`);
}
async function undoImport() {
  const snapshot = await getLatestSnapshot();
  if (!snapshot) { toast('戻せる取り込み履歴がない。'); return; }
  if (!confirm(`${localDateTime(snapshot.createdAt)} の「${snapshot.action}」前に戻す？\n現在の台帳はこの操作で置き換わる。`)) return;
  await saveSnapshot('Undo before restore', clone(state.records));
  const records = snapshot.before.map(normalizeRecord);
  await dbReplaceAllRecords(records);
  state.records = records;
  state.importPreview = null;
  render();
  toast('取り込み前の状態に戻した');
}

// Clipboard / download --------------------------------------------------------
async function copyToClipboard(text, message) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text; document.body.appendChild(textarea); textarea.select(); document.execCommand('copy'); textarea.remove();
  }
  toast(message);
}
function downloadTSV(records, filename) {
  const blob = new Blob([`\uFEFF${buildTSV(records)}`], { type: 'text/tab-separated-values;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = filename; anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast(`${records.length}件をTSVで保存した`);
}
function toast(message) {
  const node = document.createElement('div');
  node.className = 'toast'; node.textContent = message;
  toastRegion.appendChild(node);
  setTimeout(() => node.remove(), 3600);
}

// App startup ----------------------------------------------------------------
async function init() {
  try {
    const records = await dbGetAll(RECORD_STORE);
    state.records = records.map(normalizeRecord).sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } catch (error) {
    console.error(error);
    toast('ブラウザ保存を初期化できなかった。プライベートブラウズ設定を確認して。');
  }
  render();
}

init();
