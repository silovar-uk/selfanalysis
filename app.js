import { SAMPLE_RECORDS } from './sample-data.js';
import { SKILL_CATEGORIES, SKILL_QUESTIONS, SKILL_STATUSES, SKILL_QUESTION_COUNT } from './skill-questions.js';

const INITIAL_SAMPLE_COUNT = SAMPLE_RECORDS.length;
const APP_VERSION = 'v05';

const DB_NAME = 'selfanalysis-db';
const DB_VERSION = 3;
const RECORD_STORE = 'records';
const SNAPSHOT_STORE = 'snapshots';
const SKILL_ANSWER_STORE = 'skillAnswers';
const SKILL_SESSION_KEY = 'selfanalysis-skill-session-v2';
const LEGACY_SKILL_SESSION_KEY = 'selfanalysis-skill-session-v1';
const CLEAR = '__CLEAR__';

const STATUS = ['事実', '自己観察', '仮説'];
const TYPES = ['実例', '能力・知識', '習慣', '性質', 'できないこと・制約', '趣味'];
const DOMAINS = ['仕事', '私生活', '学習', '人間関係', '健康', '趣味'];
const FREQUENCIES = ['単発', 'ときどき', '継続中', '繰り返し'];
const INTERVIEW = ['まだ使わない', '候補', '使う'];
const CAPABILITY = ['未検証', '支援があればできる', '定型なら一人でできる', '例外があっても進められる', '人に教える／仕組みにできる'];
const SCORE_LABELS = {
  enjoyment: ['かなり嫌い', 'やや嫌い', 'どちらでもない', 'やや好き', 'かなり好き'],
  fatigue: ['低い', 'やや低い', '普通', 'やや高い', '高い'],
};
const AXIS_LABELS = {
  dataHandling: '数字・データ',
  meaningHandling: '言葉・文脈',
  peopleHandling: '人・利害',
  operations: '現場運用',
  creation: '制作・表現',
  technology: '技術・仕組み',
};

const TSV_COLUMNS = [
  ['__id', 'id'], ['__seed', 'seedId'], ['記録の扱い', 'status'], ['タイトル', 'title'], ['種類', 'type'], ['領域', 'domain'], ['一言要約', 'summary'], ['タグ', 'tags'], ['頻度', 'frequency'], ['最終実施日', 'lastDone'], ['何をしたか', 'what'], ['いつ・どこで', 'where'], ['自分の役割', 'role'], ['関係者', 'stakeholders'], ['結果・変化', 'result'], ['証拠・具体例', 'evidence'], ['紐づくID', 'linkedIds'], ['期限', 'deadline'], ['裁量', 'autonomy'], ['関係者の広さ', 'stakeholderScope'], ['不確実性', 'uncertainty'], ['条件タグ', 'conditions'], ['好き度', 'enjoyment'], ['消耗度', 'fatigue'], ['扱える範囲', 'capability'], ['数字・データ', 'dataHandling'], ['言葉・文脈', 'meaningHandling'], ['人・利害', 'peopleHandling'], ['現場運用', 'operations'], ['制作・表現', 'creation'], ['技術・仕組み', 'technology'], ['振り返りメモ', 'reflection'], ['反証・うまくいかなかった条件', 'counterEvidence'], ['次に試すこと・代替策', 'nextExperiment'], ['次に試すこと', 'nextExperiment'], ['面接での利用', 'interviewUse'], ['一言で言うと', 'oneLiner'], ['再現できる条件', 'reproducibleConditions'], ['他社でも通じる言い換え', 'translation'], ['応募先・用途タグ', 'useTags'],
];

const HEADER_ALIASES = new Map([
  ['id', 'id'], ['__id', 'id'], ['ID', 'id'], ['タイトル', 'title'], ['title', 'title'], ['種類', 'type'], ['分類', 'type'], ['領域', 'domain'], ['記録の扱い', 'status'], ['扱い', 'status'], ['一言要約', 'summary'], ['内容', 'summary'], ['タグ', 'tags'], ['頻度', 'frequency'], ['最終実施日', 'lastDone'], ['何をしたか', 'what'], ['いつ・どこで', 'where'], ['自分の役割', 'role'], ['関係者', 'stakeholders'], ['結果・変化', 'result'], ['証拠・具体例', 'evidence'], ['証拠', 'evidence'], ['条件タグ', 'conditions'], ['好き度', 'enjoyment'], ['消耗度', 'fatigue'], ['扱える範囲', 'capability'], ['得意度', 'capability'], ['数字・データ', 'dataHandling'], ['言葉・文脈', 'meaningHandling'], ['人・利害', 'peopleHandling'], ['現場運用', 'operations'], ['制作・表現', 'creation'], ['技術・仕組み', 'technology'], ['振り返りメモ', 'reflection'], ['反証・うまくいかなかった条件', 'counterEvidence'], ['次に試すこと・代替策', 'nextExperiment'], ['次に試すこと', 'nextExperiment'], ['面接での利用', 'interviewUse'], ['一言で言うと', 'oneLiner'], ['再現できる条件', 'reproducibleConditions'], ['他社でも通じる言い換え', 'translation'], ['応募先・用途タグ', 'useTags'], ['期限', 'deadline'], ['裁量', 'autonomy'], ['関係者の広さ', 'stakeholderScope'], ['不確実性', 'uncertainty'], ['紐づくID', 'linkedIds'], ['__seed', 'seedId'],
]);

const state = {
  db: null,
  tab: 'inbox',
  records: [],
  filters: { search: '', status: '', type: '', domain: '', interviewUse: '', sort: 'updated' },
  selected: new Set(),
  importPreview: null,
  lastSnapshotId: null,
  skillAnswers: new Map(),
  skill: { sessionIds: [], index: 0, memoOpenQuestionId: '', outputFormat: 'markdown', outputFilter: 'all', tempo: 'stay', sessionName: '', lastAnswered: null },
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const uid = () => (crypto?.randomUUID?.() || `r-${Date.now()}-${Math.random().toString(16).slice(2)}`);
const now = () => new Date().toISOString();
const shortDate = (value) => value ? new Intl.DateTimeFormat('ja-JP', { month: 'numeric', day: 'numeric' }).format(new Date(value)) : '—';
const escape = (value = '') => String(value).replace(/[&<>'"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[ch]);
const nl2br = (value = '') => escape(value).replace(/\n/g, '<br>');
const toArray = (value) => Array.isArray(value) ? value.filter(Boolean) : String(value || '').split('|').map((x) => x.trim()).filter(Boolean);
const toInt = (value, max = 5) => { const n = Number(value); return Number.isFinite(n) && n >= 0 && n <= max ? n : null; };
const statusClass = (status) => status === '事実' ? 'status-fact' : status === '自己観察' ? 'status-observation' : 'status-hypothesis';
const recordDefaults = () => ({
  id: uid(), seedId: '', status: '事実', title: '', type: '実例', domain: '仕事', summary: '', tags: [], frequency: '単発', lastDone: '',
  what: '', where: '', role: '', stakeholders: '', result: '', evidence: '', linkedIds: [], deadline: '', autonomy: '', stakeholderScope: '', uncertainty: '', conditions: [],
  enjoyment: null, fatigue: null, capability: null, dataHandling: null, meaningHandling: null, peopleHandling: null, operations: null, creation: null, technology: null,
  reflection: '', counterEvidence: '', nextExperiment: '', interviewUse: 'まだ使わない', oneLiner: '', reproducibleConditions: '', translation: '', useTags: [], createdAt: now(), updatedAt: now(), isSample: false,
});

function normalizeRecord(input = {}) {
  const base = recordDefaults();
  const merged = { ...base, ...input };
  if (merged.type === '失敗・苦手') merged.type = 'できないこと・制約';
  ['tags', 'linkedIds', 'conditions', 'useTags'].forEach((key) => { merged[key] = toArray(merged[key]); });
  ['enjoyment', 'fatigue', 'capability'].forEach((key) => { merged[key] = toInt(merged[key], 5); });
  Object.keys(AXIS_LABELS).forEach((key) => { merged[key] = toInt(merged[key], 3); });
  if (!merged.createdAt) merged.createdAt = now();
  if (!merged.updatedAt) merged.updatedAt = now();
  return merged;
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(RECORD_STORE)) db.createObjectStore(RECORD_STORE, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(SNAPSHOT_STORE)) db.createObjectStore(SNAPSHOT_STORE, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(SKILL_ANSWER_STORE)) db.createObjectStore(SKILL_ANSWER_STORE, { keyPath: 'questionId' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
function tx(storeName, mode = 'readonly') { return state.db.transaction(storeName, mode).objectStore(storeName); }
function requestToPromise(request) { return new Promise((resolve, reject) => { request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); }); }
async function getAllRecords() { return requestToPromise(tx(RECORD_STORE).getAll()); }
async function putRecord(record) { return requestToPromise(tx(RECORD_STORE, 'readwrite').put(record)); }
async function deleteRecord(id) { return requestToPromise(tx(RECORD_STORE, 'readwrite').delete(id)); }
async function replaceAllRecords(records) {
  return new Promise((resolve, reject) => {
    const transaction = state.db.transaction(RECORD_STORE, 'readwrite');
    const store = transaction.objectStore(RECORD_STORE);
    store.clear();
    records.forEach((record) => store.put(record));
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}
async function makeSnapshot(label) {
  const snapshot = { id: uid(), label, createdAt: now(), records: structuredClone(state.records) };
  await requestToPromise(tx(SNAPSHOT_STORE, 'readwrite').put(snapshot));
  state.lastSnapshotId = snapshot.id;
  return snapshot;
}
async function getSnapshot(id) { return requestToPromise(tx(SNAPSHOT_STORE).get(id)); }

function skillAnswerDefaults(questionId) { return { questionId, status: '', note: '', guidedSupport: [], pins: [], updatedAt: now() }; }
function normalizeSkillAnswer(input = {}) {
  const base = skillAnswerDefaults(input.questionId || '');
  return {
    ...base,
    ...input,
    guidedSupport: [...new Set(toArray(input.guidedSupport))],
    pins: [...new Set(toArray(input.pins))],
  };
}
async function getAllSkillAnswers() { return requestToPromise(tx(SKILL_ANSWER_STORE).getAll()); }
async function putSkillAnswer(answer) { return requestToPromise(tx(SKILL_ANSWER_STORE, 'readwrite').put(normalizeSkillAnswer(answer))); }
async function deleteSkillAnswer(questionId) { return requestToPromise(tx(SKILL_ANSWER_STORE, 'readwrite').delete(questionId)); }
function skillAnswer(questionId) { return normalizeSkillAnswer(state.skillAnswers.get(questionId) || skillAnswerDefaults(questionId)); }
function persistSkillSession() {
  try {
    localStorage.setItem(SKILL_SESSION_KEY, JSON.stringify({
      sessionIds: state.skill.sessionIds,
      index: state.skill.index,
      tempo: state.skill.tempo,
      sessionName: state.skill.sessionName,
      lastAnswered: state.skill.lastAnswered,
      outputFormat: state.skill.outputFormat,
      outputFilter: state.skill.outputFilter,
    }));
  } catch {}
}
function restoreSkillSession() {
  try {
    const raw = localStorage.getItem(SKILL_SESSION_KEY) || localStorage.getItem(LEGACY_SKILL_SESSION_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    const validIds = new Set(SKILL_QUESTIONS.map((q) => q.id));
    const ids = Array.isArray(parsed.sessionIds) ? parsed.sessionIds.filter((id) => validIds.has(id)) : [];
    state.skill = {
      ...state.skill,
      sessionIds: ids,
      index: ids.length ? Math.max(0, Math.min(Number(parsed.index) || 0, ids.length - 1)) : 0,
      tempo: parsed.tempo === 'fast' ? 'fast' : 'stay',
      sessionName: typeof parsed.sessionName === 'string' ? parsed.sessionName : '',
      lastAnswered: parsed.lastAnswered?.questionId ? parsed.lastAnswered : null,
      outputFormat: parsed.outputFormat === 'text' ? 'text' : 'markdown',
      outputFilter: ['all', 'ready', 'usable', 'pinned', 'constraints'].includes(parsed.outputFilter) ? parsed.outputFilter : 'all',
    };
  } catch {}
}

function refreshRecords() {
  return getAllRecords().then((records) => {
    state.records = records.map(normalizeRecord).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    render();
  });
}

function toast(message, tone = '') {
  const root = $('#toast-region');
  const node = document.createElement('div');
  node.className = `toast ${tone}`;
  node.textContent = message;
  root.append(node);
  setTimeout(() => node.remove(), 3400);
}

function button(label, action, options = {}) {
  const cls = ['button', options.variant || 'ghost', options.small ? 'small' : '', options.full ? 'full' : ''].filter(Boolean).join(' ');
  const attrs = [action ? `data-action="${action}"` : '', options.id ? `data-id="${escape(options.id)}"` : '', options.extra ? options.extra : '', options.type ? `type="${options.type}"` : 'type="button"'].filter(Boolean).join(' ');
  return `<button class="${cls}" ${attrs}>${escape(label)}</button>`;
}
function badge(text, cls = '') { return `<span class="badge ${cls}">${escape(text)}</span>`; }
function tags(tags) { return toArray(tags).slice(0, 8).map((tag) => `<span class="tag">${escape(tag)}</span>`).join(''); }

function navigation() {
  const nav = [
    ['inbox', '受信箱'], ['skills', 'スキルチェック'], ['ledger', '台帳'], ['organize', '整理'], ['discover', '発見'], ['output', '出力'], ['data', 'データ'],
  ];
  const make = (mobile = false) => nav.filter(([, label]) => !mobile || ['inbox', 'ledger', 'organize', 'data'].includes(label === '受信箱' ? 'inbox' : label === '台帳' ? 'ledger' : label === '整理' ? 'organize' : label === 'データ' ? 'data' : '')).map(([id, label]) => `<button class="nav-button ${state.tab === id ? 'active' : ''}" data-tab="${id}">${label}</button>`).join('');
  // Explicit mobile buttons to avoid fragile label mapping.
  const mobile = [['inbox','記録'],['skills','チェック'],['ledger','一覧'],['data','その他']].map(([id,label]) => `<button class="nav-button ${state.tab === id ? 'active' : ''}" data-tab="${id}">${label}</button>`).join('');
  return `
    <header class="app-header">
      <div class="header-inner">
        <button class="brand" type="button" data-tab="inbox" aria-label="受信箱へ">
          <img src="assets/selfanalysis-icon-64.png" alt="" />
          <span class="brand-copy"><strong>selfanalysis</strong><span>実績・証拠・条件の台帳</span></span>
        </button>
        <nav class="primary-nav" aria-label="主な画面">${make()}</nav>
        <div class="header-actions">${button('＋ 記録', 'new-record', { variant: 'primary' })}</div>
      </div>
    </header>
  ` + `<nav class="mobile-nav" aria-label="モバイルナビ">${mobile}</nav>`;
}

function heading(title, subtitle, actions = '') {
  return `<div class="page-heading"><div><h1>${escape(title)}</h1><p>${escape(subtitle)}</p></div><div class="page-heading-actions">${actions}</div></div>`;
}

function recordCard(record, options = {}) {
  const evidenceCount = [record.evidence, record.result, record.lastDone].filter(Boolean).length;
  const badges = [
    badge(record.status, statusClass(record.status)),
    badge(record.type), badge(record.domain),
    evidenceCount ? badge(`証拠 ${evidenceCount}件`) : badge('証拠未入力', 'alert'),
    record.interviewUse !== 'まだ使わない' ? badge(`面接：${record.interviewUse}`, 'interview') : '',
  ].join(' ');
  const checked = state.selected.has(record.id) ? 'checked' : '';
  return `<article class="record-card" data-record-card="${escape(record.id)}">
    <div class="record-card-top">
      <div>
        <h3 class="record-title">${escape(record.title || '無題の記録')}</h3>
        ${record.summary ? `<p class="record-summary">${escape(record.summary)}</p>` : ''}
      </div>
      <div>${options.selectable ? `<label class="badge"><input type="checkbox" data-select-record="${escape(record.id)}" ${checked}/> 選択</label>` : button('開く', 'open-record', { id: record.id, small: true })}</div>
    </div>
    <div class="record-meta">${badges}</div>
    ${record.tags?.length ? `<div class="tag-row">${tags(record.tags)}</div>` : ''}
    <div class="record-foot"><span>更新 ${shortDate(record.updatedAt)}</span><span>${record.frequency || '頻度未整理'}</span></div>
  </article>`;
}

function inboxView() {
  const facts = state.records.filter((r) => r.status === '事実').length;
  const evidence = state.records.filter((r) => r.evidence || r.result).length;
  const initialAction = state.records.length ? '' : button(`初期台帳${INITIAL_SAMPLE_COUNT}件を追加`, 'seed-sample', { variant: 'secondary' });
  const recent = state.records.slice(0, 6);
  return `
    ${heading('受信箱', 'まずは、評価せずに事実を残す。詳しい整理はあとでよい。', initialAction)}
    <section class="card hero">
      <h2>何を残す？</h2>
      <p>実績、学んだこと、できないこと、うまくいかなかったこと、仕事外で続いていること。弱そうに見える話でも、まず事実として置く。</p>
      <form id="quick-capture" class="quick-form">
        <input class="input" name="title" required maxlength="140" placeholder="例：英語記事を読んで要点を日本語で整理した" aria-label="記録のタイトル" />
        <select class="select" name="domain" aria-label="領域">${DOMAINS.map((x) => `<option>${x}</option>`).join('')}</select>
        <button class="button primary" type="submit">事実メモとして保存</button>
      </form>
      <p class="help">保存後に、証拠・条件・振り返りを足せる。ここでは「得意か」「面接で使えるか」を決めなくてよい。</p>
    </section>
    <section class="grid grid-4" style="margin-top:16px">
      <div class="card kpi"><div class="kpi-value">${state.records.length}</div><div class="kpi-label">記録数</div><div class="kpi-note">まずは量。評価は後から。</div></div>
      <div class="card kpi"><div class="kpi-value">${facts}</div><div class="kpi-label">事実として記録</div><div class="kpi-note">実際にやったこと・起きたこと。</div></div>
      <div class="card kpi"><div class="kpi-value">${evidence}</div><div class="kpi-label">証拠あり</div><div class="kpi-note">数値、制作物、URL、案件名。</div></div>
      <div class="card kpi"><div class="kpi-value">${state.records.filter((r) => r.interviewUse === '使う').length}</div><div class="kpi-label">面接で使う候補</div><div class="kpi-note">提示用は、台帳と別レイヤー。</div></div>
    </section>
    <section class="grid grid-2" style="margin-top:16px">
      <div class="card card-pad">
        <div class="section-heading"><h2>最近の記録</h2>${button('台帳へ', 'go-ledger', { small: true })}</div>
        <div class="list">${recent.length ? recent.map(recordCard).join('') : `<div class="empty">まだ記録がない。上の入力欄に、今日あったことを一つ残してみる。</div>`}</div>
      </div>
      <div class="card card-pad">
        <div class="section-heading"><h2>残し方のヒント</h2></div>
        <div class="progress-list">
          <div class="progress-row"><span>仕事で手を動かしたこと</span><strong>例：会議の論点を整理した</strong></div>
          <div class="progress-row"><span>知識を得た・使ったこと</span><strong>例：英語記事を比較した</strong></div>
          <div class="progress-row"><span>条件が見えたこと</span><strong>例：短納期だと消耗しやすい</strong></div>
          <div class="progress-row"><span>できないこと・制約</span><strong>例：車の運転を移動前提に置かない</strong></div>
          <div class="progress-row"><span>反証・失敗</span><strong>例：決裁者不明で進まなかった</strong></div>
        </div>
        <div class="notice" style="margin-top:14px">「答えがない」ことは、課題から降りる理由ではない。目的と判断基準を仮置きし、検証できる記録として残す。</div>
      </div>
    </section>`;
}

function filteredRecords() {
  const f = state.filters;
  const q = f.search.trim().toLowerCase();
  const rows = state.records.filter((r) => {
    const hay = [r.title, r.summary, r.tags.join(' '), r.evidence, r.what, r.oneLiner].join('\n').toLowerCase();
    const inSubset = !state._subset || state._subset.rows.includes(r.id);
    return inSubset && (!q || hay.includes(q)) && (!f.status || r.status === f.status) && (!f.type || r.type === f.type) && (!f.domain || r.domain === f.domain) && (!f.interviewUse || r.interviewUse === f.interviewUse);
  });
  return rows.sort((a, b) => {
    if (f.sort === 'created') return new Date(b.createdAt) - new Date(a.createdAt);
    if (f.sort === 'evidence') return scoreEvidence(b) - scoreEvidence(a);
    if (f.sort === 'enjoyment') return (b.enjoyment || -1) - (a.enjoyment || -1);
    if (f.sort === 'capability') return (b.capability || -1) - (a.capability || -1);
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
}
function scoreEvidence(r) { return [r.evidence, r.result, r.lastDone, r.where, r.role].filter(Boolean).length; }
function selectOptions(list, selected, label = 'すべて') { return `<option value="">${label}</option>${list.map((x) => `<option value="${escape(x)}" ${x === selected ? 'selected' : ''}>${escape(x)}</option>`).join('')}`; }

function ledgerView() {
  const rows = filteredRecords();
  const f = state.filters;
  return `${heading('台帳', '根拠を検索し、必要な記録を開いて育てる。', button('＋ 詳しく記録', 'new-record', { variant: 'primary' }))}
    <section class="card toolbar">
      <input class="input grow" data-filter="search" value="${escape(f.search)}" placeholder="タイトル、タグ、証拠から検索" />
      <button class="button secondary" data-action="clear-filters">絞り込みを解除</button>
      <div class="filter-grid" style="width:100%">
        <select class="select" data-filter="status">${selectOptions(STATUS, f.status, '扱い：すべて')}</select>
        <select class="select" data-filter="type">${selectOptions(TYPES, f.type, '種類：すべて')}</select>
        <select class="select" data-filter="domain">${selectOptions(DOMAINS, f.domain, '領域：すべて')}</select>
        <select class="select" data-filter="interviewUse">${selectOptions(INTERVIEW, f.interviewUse, '面接利用：すべて')}</select>
        <select class="select" data-filter="sort"><option value="updated" ${f.sort === 'updated' ? 'selected' : ''}>更新順</option><option value="created" ${f.sort === 'created' ? 'selected' : ''}>作成順</option><option value="evidence" ${f.sort === 'evidence' ? 'selected' : ''}>証拠が多い順</option><option value="capability" ${f.sort === 'capability' ? 'selected' : ''}>扱える範囲順</option><option value="enjoyment" ${f.sort === 'enjoyment' ? 'selected' : ''}>好き度順</option></select>
      </div>
    </section>
    <section style="margin-top:16px">
      <div class="section-heading"><h2>${rows.length}件の記録</h2><span class="sub">検索・絞り込みの結果</span></div>
      <div class="list">${rows.length ? rows.map(recordCard).join('') : `<div class="empty">条件に合う記録がない。検索語や絞り込みを外してみる。</div>`}</div>
    </section>`;
}

function organizeView() {
  const evidenceMissing = state.records.filter((r) => !r.evidence && !r.result);
  const conditionMissing = state.records.filter((r) => !r.conditions.length && !r.deadline && !r.autonomy && !r.stakeholderScope);
  const reflectionMissing = state.records.filter((r) => !r.reflection && !r.counterEvidence && !r.nextExperiment);
  const candidatesThin = state.records.filter((r) => r.interviewUse !== 'まだ使わない' && scoreEvidence(r) < 2);
  const constraints = state.records.filter((r) => r.type === 'できないこと・制約');
  const items = [
    ['証拠待ち', evidenceMissing, '数値、案件名、制作物、URL、第三者の評価などを足す。', 'filter-evidence-missing'],
    ['条件未整理', conditionMissing, '期限・裁量・関係者・不確実性を記録する。', 'filter-condition-missing'],
    ['振り返り待ち', reflectionMissing, 'うまくいった条件、反証、次の実験を残す。', 'filter-reflection-missing'],
    ['面接候補だが薄い', candidatesThin, '提示用の前に、具体例と証拠を増やす。', 'filter-interview-thin'],
  ];
  return `${heading('整理', '足りないものを「弱さ」ではなく、次に手入れする場所として扱う。')}
    <section class="grid grid-4">${items.map(([label, rows, text, action]) => `<div class="card kpi"><div class="kpi-value">${rows.length}</div><div class="kpi-label">${label}</div><div class="kpi-note">${text}</div><div style="margin-top:10px">${button('見る', action, { small:true })}</div></div>`).join('')}</section>
    <section class="grid grid-2" style="margin-top:16px">
      ${items.slice(0,2).map(([label, rows, text]) => `<div class="card card-pad"><div class="section-heading"><h2>${label}</h2><span class="sub">${text}</span></div><div class="list">${rows.slice(0,5).length ? rows.slice(0,5).map(recordCard).join('') : `<div class="empty">ここは今のところ空。良い状態。</div>`}</div></div>`).join('')}
      <div class="card card-pad"><div class="section-heading"><h2>できないこと・制約</h2><span class="sub">${constraints.length}件</span></div><div class="notice">ここは改善リストではない。現時点で前提に置かないこと、必要な支援、避ける条件、代替手段を明文化する場所。</div><div class="list" style="margin-top:12px">${constraints.slice(0,5).length ? constraints.slice(0,5).map(recordCard).join('') : `<div class="empty">まだない。車の運転、早起き、即興会議など、無理を前提にしないことを残せる。</div>`}</div><div style="margin-top:10px">${button('制約だけを見る', 'filter-constraints', {small:true})}</div></div>
    </section>
    <section class="card card-pad" style="margin-top:16px">
      <div class="section-heading"><h2>整理の原則</h2></div>
      <div class="notice">評価の低い記録を消す場所ではない。「事実」「証拠」「条件」「反証」「次の実験・代替策」のどこが空いているかを見つけ、次の一手をつくる場所。</div>
    </section>`;
}

function discoverView() {
  const usable = state.records.filter((r) => r.enjoyment && r.capability);
  const cells = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => []));
  usable.forEach((r) => cells[5 - r.capability][r.enjoyment - 1].push(r));
  const axisAverages = Object.entries(AXIS_LABELS).map(([key, label]) => {
    const vals = state.records.map((r) => r[key]).filter((n) => Number.isFinite(n));
    return { key, label, avg: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0, count: vals.length };
  });
  const tagsCount = new Map();
  state.records.forEach((r) => r.conditions.forEach((tag) => tagsCount.set(tag, (tagsCount.get(tag) || 0) + 1)));
  const topConditions = [...tagsCount.entries()].sort((a,b) => b[1]-a[1]).slice(0,8);
  return `${heading('発見', '点数で自分を断定せず、記録に現れた偏りや条件を眺める。')}
    <section class="card card-pad">
      <div class="section-heading"><h2>好き度 × 扱える範囲</h2><span class="sub">両方を入力した ${usable.length}件</span></div>
      ${usable.length ? `<div class="matrix"><div class="matrix-label">扱える範囲<br>↑</div>${[1,2,3,4,5].map((n) => `<div class="matrix-label">好き度 ${n}</div>`).join('')}${[5,4,3,2,1].map((cap) => `<div class="matrix-label">${escape(CAPABILITY[cap-1])}</div>${[1,2,3,4,5].map((enjoy) => { const rs=cells[5-cap][enjoy-1]; return `<div class="matrix-cell"><strong>${rs.length}件</strong>${rs.slice(0,4).map((r) => `<button class="matrix-item" data-action="open-record" data-id="${escape(r.id)}">${escape(r.title)}</button>`).join('')}</div>`; }).join('')}`).join('')}</div>` : `<div class="empty">詳細画面の「振り返り」で好き度と扱える範囲を入れると、ここに並ぶ。</div>`}
    </section>
    <section class="grid grid-2" style="margin-top:16px">
      <div class="card card-pad"><div class="section-heading"><h2>扱っている要素</h2><span class="sub">0〜3の平均</span></div><div class="metric-bars">${axisAverages.map((x) => `<div class="metric-bar"><span>${escape(x.label)}</span><div class="track"><div class="fill" style="width:${(x.avg / 3) * 100}%"></div></div><strong>${x.count ? x.avg.toFixed(1) : '—'}</strong></div>`).join('')}</div></div>
      <div class="card card-pad"><div class="section-heading"><h2>よく出る条件</h2><span class="sub">条件タグの出現数</span></div>${topConditions.length ? `<div class="progress-list">${topConditions.map(([tag, count]) => `<div class="progress-row"><span>${escape(tag)}</span><strong>${count}件</strong></div>`).join('')}</div>` : `<div class="empty">条件タグがまだない。詳細画面から足してみる。</div>`}</div>
    </section>
    <section class="notice" style="margin-top:16px">「数字・データ」と「言葉・文脈」は対立軸ではない。両方が高い記録は、数値と意味を往復している経験の手がかりになる。</section>`;
}

function outputView() {
  const chosen = state.records.filter((r) => state.selected.has(r.id));
  return `${heading('出力', '台帳を直接書き換えず、必要な記録だけを提示用に編集する。')}
    <section class="grid grid-2">
      <div class="card card-pad">
        <div class="section-heading"><h2>使う記録を選ぶ</h2><span class="sub">${chosen.length}件を選択中</span></div>
        <div class="notice">私生活・未整理・機密情報は、ここで選ばない限り出力に混ざらない。</div>
        <div class="list" style="margin-top:12px">${state.records.length ? state.records.slice().sort((a,b)=> (b.interviewUse==='使う')-(a.interviewUse==='使う')).map((r) => recordCard(r,{selectable:true})).join('') : `<div class="empty">まずは受信箱に記録を残す。</div>`}</div>
      </div>
      <div class="card card-pad">
        <div class="section-heading"><h2>下書き</h2><span class="sub">根拠を残したまま整える</span></div>
        <div class="tabs"><button class="tab active" data-output-kind="summary">職務経歴書</button><button class="tab" data-output-kind="talk">面接90秒</button><button class="tab" data-output-kind="skills">スキル一覧</button></div>
        <textarea id="output-text" class="output-box" readonly>${escape(buildOutput(chosen, 'summary'))}</textarea>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">${button('コピー', 'copy-output', { variant:'primary' })}${button('TSVで書き出す', 'export-selected', { variant:'secondary' })}</div>
        <hr />
        <div class="notice">出力は下書き。数字、守秘義務、公開可否、応募先との接続は最後に人の目で確認する。</div>
      </div>
    </section>`;
}
function buildOutput(records, kind) {
  if (!records.length) return '左側から、出力したい記録を選んでください。';
  if (kind === 'talk') return records.map((r, i) => `${i+1}. ${r.oneLiner || r.title}\n根拠：${r.result || r.summary || r.what || '具体例を追記'}\n条件：${r.reproducibleConditions || '要整理'}`).join('\n\n');
  if (kind === 'skills') return records.map((r) => `・${r.oneLiner || r.title}${r.translation ? `（${r.translation}）` : ''}`).join('\n');
  return records.map((r) => `【${r.oneLiner || r.title}】\n${r.summary || r.what || ''}\n根拠：${r.evidence || r.result || '要追記'}\n`).join('\n');
}

function dataView() {
  const preview = state.importPreview;
  return `${heading('データ', 'TSVでまとめて編集する。反映前に差分を確認し、必ず戻れる状態で操作する。')}
    <section class="grid grid-2">
      <div class="card card-pad">
        <div class="section-heading"><h2>書き出し</h2></div>
        <div class="progress-list">
          <div class="progress-row"><span>全件バックアップ</span>${button('TSVを保存', 'export-all', {small:true})}</div>
          <div class="progress-row"><span>現在の絞り込み結果</span>${button('TSVを保存', 'export-filtered', {small:true})}</div>
          <div class="progress-row"><span>空テンプレート</span>${button('コピー', 'copy-template', {small:true})}</div>
          <div class="progress-row"><span>初期台帳（${INITIAL_SAMPLE_COUNT}件）</span>${button('追加する', 'seed-sample', {small:true})}</div>
        </div>
        <p class="help">公開GitHub Pagesに置く場合、業務の未公表情報・売上・連絡先などを含むTSVをリポジトリに置かない。</p>
      </div>
      <div class="card card-pad">
        <div class="section-heading"><h2>安全な取り込み</h2></div>
        <div class="notice warn">貼り付けた瞬間には保存しない。<strong>貼る → 読み取る → 差分を見る → 反映する</strong>の順で進める。</div>
        <div class="field" style="margin-top:12px"><label class="label">取り込み方式</label><select id="import-mode" class="select"><option value="add">追加（既存データは触らない）</option><option value="partial">部分更新（ID一致の列だけ更新）</option><option value="restore">全件復元（バックアップから戻す）</option><option value="replace">全置換（現在の台帳を置き換える）</option></select></div>
        <div class="field" style="margin-top:12px"><label class="label">TSVを貼り付ける</label><textarea id="import-text" class="textarea import-area" placeholder="Excel / Googleスプレッドシートから、見出し行を含めて貼り付け"></textarea></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">${button('差分を確認', 'parse-import', {variant:'primary'})}${button('ファイルを選ぶ', 'choose-tsv-file', {variant:'secondary'})}<input id="tsv-file" type="file" accept=".tsv,text/tab-separated-values,text/plain" hidden /></div>
      </div>
    </section>
    ${preview ? importPreviewView(preview) : ''}
    <section class="card card-pad" style="margin-top:16px"><div class="section-heading"><h2>部分更新のルール</h2></div><div class="notice"><span class="code">__id</span> が一致する記録だけを更新する。TSVに列そのものがなければ変更しない。列があってもセルが空なら変更しない。値を消すときだけ <span class="code">__CLEAR__</span> を入れる。</div></section>`;
}
function importPreviewView(preview) {
  const examples = preview.rows.slice(0, 20);
  const error = preview.errors.length;
  return `<section class="card card-pad" style="margin-top:16px"><div class="section-heading"><h2>取り込み前の差分</h2><span class="sub">${preview.modeLabel}</span></div>
  <div class="grid grid-4"><div class="kpi"><div class="kpi-value">${preview.add}</div><div class="kpi-label">追加</div></div><div class="kpi"><div class="kpi-value">${preview.update}</div><div class="kpi-label">更新</div></div><div class="kpi"><div class="kpi-value">${preview.skip}</div><div class="kpi-label">スキップ</div></div><div class="kpi"><div class="kpi-value">${error}</div><div class="kpi-label">エラー</div></div></div>
  ${error ? `<div class="notice danger" style="margin-top:12px">エラー行がある。修正するか、「エラー行を除いて反映」を選ぶ。</div>` : `<div class="notice" style="margin-top:12px">内容を確認してから反映する。反映前に自動バックアップを作る。</div>`}
  <div class="table-wrap" style="margin-top:12px"><table><thead><tr><th>行</th><th>タイトル</th><th>判定</th><th>内容</th></tr></thead><tbody>${examples.map((x) => `<tr class="row-${x.kind}"><td>${x.line}</td><td>${escape(x.title || '—')}</td><td>${escape(x.label)}</td><td>${escape(x.note)}</td></tr>`).join('')}</tbody></table></div>
  ${preview.rows.length > examples.length ? `<p class="help">ほか ${preview.rows.length-examples.length}行は省略表示。</p>` : ''}
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">${button('反映する', 'apply-import', {variant:'primary', extra: error ? 'data-allow-errors="true"' : ''})}${button('プレビューを閉じる', 'clear-import-preview', {variant:'secondary'})}</div>
  </section>`;
}



const SKILL_STATUS_ORDER = ['yes', 'guided', 'no', 'unknown'];
const SKILL_UI_LABELS = {
  yes: '○ 実務で一人でできる',
  guided: '△ 手順・確認があればできる',
  no: '× 現時点で前提に置かない',
  unknown: '— 未経験・判断保留',
};
const GUIDED_SUPPORT_OPTIONS = ['見本があれば', '検索すれば', '手順書があれば', 'レビューがあれば'];
const SKILL_PIN_OPTIONS = ['仕事で使った', '個人で試した', '条件あり', '証拠を後で足す', '学びたい'];
const OUTPUT_FILTERS = {
  all: 'すべて',
  ready: '○だけ',
  usable: '○＋△',
  pinned: 'メモ・ピンあり',
  constraints: '×・制約',
};
const QUICK_SKILL_IDS = [
  'spreadsheet-12', 'writing-16', 'planning-04', 'event-07', 'digital-20', 'english-01',
];
const WORK_PATHS = [
  { id: 'numbers', label: '数字と判断', description: '表計算・データから、判断材料を整える操作', categoryIds: ['spreadsheet', 'data'] },
  { id: 'words', label: '言葉と発信', description: '文章・広報で、誤解なく行動につなげる操作', categoryIds: ['writing', 'pr'] },
  { id: 'coordination', label: '企画と調整', description: '目的・判断・関係者をそろえて前に進める操作', categoryIds: ['planning'] },
  { id: 'field', label: '現場と制作', description: '集客・当日運用・制作進行の具体操作', categoryIds: ['event', 'production'] },
];

const skillStatusById = (id) => SKILL_STATUSES.find((status) => status.id === id) || SKILL_STATUSES[3];
const skillQuestionById = (id) => SKILL_QUESTIONS.find((question) => question.id === id);
const skillAnswered = (answer) => Boolean(answer?.status);
const selectedQuestionIds = (ids = []) => [...new Set(ids)].filter((id) => skillQuestionById(id));
const toggleListValue = (values, value) => values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

function skillCounts(questionIds = SKILL_QUESTIONS.map((question) => question.id)) {
  const counts = { yes: 0, guided: 0, no: 0, unknown: 0, unanswered: 0, total: questionIds.length, note: 0, pin: 0 };
  questionIds.forEach((questionId) => {
    const answer = skillAnswer(questionId);
    if (answer.note?.trim()) counts.note += 1;
    if (answer.pins?.length) counts.pin += 1;
    if (answer.status && counts[answer.status] !== undefined) counts[answer.status] += 1;
    else counts.unanswered += 1;
  });
  return counts;
}
function categoryQuestions(categoryId) { return SKILL_QUESTIONS.filter((question) => question.categoryId === categoryId); }
function questionIdsForCategories(categoryIds) { return SKILL_QUESTIONS.filter((question) => categoryIds.includes(question.categoryId)).map((question) => question.id); }
function questionIdsForWorkPath(pathId) { return questionIdsForCategories((WORK_PATHS.find((path) => path.id === pathId) || {}).categoryIds || []); }
function skillAnswerMarkup(questionId, answer) {
  return SKILL_STATUSES.map((status) => {
    const active = answer.status === status.id ? 'active' : '';
    return `<button type="button" class="skill-answer ${status.id} ${active}" data-action="answer-skill" data-question-id="${escape(questionId)}" data-status="${status.id}"><strong>${escape(status.mark)}</strong><span>${escape(SKILL_UI_LABELS[status.id])}</span></button>`;
  }).join('');
}
function skillProgressBar(answered, total) {
  const ratio = total ? Math.round((answered / total) * 100) : 0;
  return `<div class="skill-progress" aria-label="${answered} / ${total}問 回答済み"><div class="skill-progress-fill" style="width:${ratio}%"></div></div>`;
}
function shortSkillSummary(counts) { return `${counts.yes} ○ / ${counts.guided} △ / ${counts.no} × / ${counts.unknown} —`; }
function quickSkillQuestionIds() { return selectedQuestionIds(QUICK_SKILL_IDS); }
function answerMetaMarkup(answer, compact = false) {
  const rows = [];
  if (answer.guidedSupport?.length) rows.push(`<span class="skill-meta-chip support">△ ${escape(answer.guidedSupport.join('・'))}</span>`);
  (answer.pins || []).forEach((pin) => rows.push(`<span class="skill-meta-chip pin">${escape(pin)}</span>`));
  if (!rows.length) return '';
  return `<div class="skill-meta-row ${compact ? 'compact' : ''}">${rows.join('')}</div>`;
}
function guidedSupportMarkup(questionId, answer) {
  if (answer.status !== 'guided') return '';
  return `<div class="skill-subsection"><div class="skill-subsection-head"><strong>△の条件</strong><span>任意。使えるために必要なものを残す。</span></div><div class="skill-chip-row">${GUIDED_SUPPORT_OPTIONS.map((option) => `<button type="button" class="skill-chip ${answer.guidedSupport.includes(option) ? 'active' : ''}" data-action="toggle-guided-support" data-question-id="${escape(questionId)}" data-value="${escape(option)}">${escape(option)}</button>`).join('')}</div></div>`;
}
function pinMarkup(questionId, answer) {
  return `<div class="skill-subsection"><div class="skill-subsection-head"><strong>この回答にピンを置く</strong><span>自由記入なしでも、後で見つけやすくなる。</span></div><div class="skill-chip-row">${SKILL_PIN_OPTIONS.map((option) => `<button type="button" class="skill-chip pin-chip ${answer.pins.includes(option) ? 'active' : ''}" data-action="toggle-skill-pin" data-question-id="${escape(questionId)}" data-value="${escape(option)}">${escape(option)}</button>`).join('')}</div></div>`;
}
function startSkillSession(questionIds, options = {}) {
  const ids = selectedQuestionIds(questionIds);
  if (!ids.length) { toast('開始できる質問がない。', 'warn'); return; }
  const preferredIndex = options.preferredId ? ids.indexOf(options.preferredId) : -1;
  const firstUnanswered = ids.findIndex((id) => !skillAnswer(id).status);
  const index = preferredIndex >= 0 ? preferredIndex : firstUnanswered >= 0 ? firstUnanswered : 0;
  state.skill = {
    ...state.skill,
    sessionIds: ids,
    index,
    sessionName: options.name || 'できることチェック',
    memoOpenQuestionId: options.memoQuestionId || '',
    lastAnswered: options.keepRecent ? state.skill.lastAnswered : null,
  };
  persistSkillSession();
  render();
  window.scrollTo(0, 0);
}
function endSkillSession() {
  state.skill = { ...state.skill, sessionIds: [], index: 0, memoOpenQuestionId: '', sessionName: '' };
  persistSkillSession();
  render();
}
async function updateSkillAnswer(questionId, patch, announce = '') {
  const current = skillAnswer(questionId);
  const next = normalizeSkillAnswer({ ...current, ...patch, questionId, updatedAt: now() });
  state.skillAnswers.set(questionId, next);
  await putSkillAnswer(next);
  if (announce) toast(announce);
  return next;
}
async function setSkillStatus(questionId, status) {
  await updateSkillAnswer(questionId, { status });
  state.skill.lastAnswered = { questionId, status };
  const currentInSession = state.skill.sessionIds[state.skill.index] === questionId;
  const canAdvance = currentInSession && state.skill.tempo === 'fast' && state.skill.index < state.skill.sessionIds.length - 1;
  if (canAdvance) {
    state.skill.index += 1;
    state.skill.memoOpenQuestionId = '';
    persistSkillSession();
    render();
    toast('保存した。直前の回答には後からメモを足せる。');
    window.scrollTo(0, 0);
    return;
  }
  persistSkillSession();
  render();
  toast(status === 'guided' ? '回答を保存した。必要なら△の条件も選べる。' : '回答を保存した。');
}
async function toggleGuidedSupport(questionId, value) {
  const answer = skillAnswer(questionId);
  await updateSkillAnswer(questionId, { guidedSupport: toggleListValue(answer.guidedSupport, value) });
  if ($('.skill-memo-modal')) return skillMemoModal(questionId);
  render();
}
async function toggleSkillPin(questionId, value) {
  const answer = skillAnswer(questionId);
  await updateSkillAnswer(questionId, { pins: toggleListValue(answer.pins, value) });
  if ($('.skill-memo-modal')) return skillMemoModal(questionId);
  render();
}
async function clearSkillAnswer(questionId) {
  const answer = skillAnswer(questionId);
  if (!answer.status && !answer.note && !answer.pins.length) return;
  if (!confirm('この質問の回答・メモ・ピンを消す？')) return;
  await deleteSkillAnswer(questionId);
  state.skillAnswers.delete(questionId);
  render();
  toast('回答を消した。');
}
async function clearSkillStatusOnly(questionId) {
  if (!questionId) return;
  const answer = skillAnswer(questionId);
  await updateSkillAnswer(questionId, { status: '', guidedSupport: [] });
  state.skill.lastAnswered = null;
  const index = state.skill.sessionIds.indexOf(questionId);
  if (index >= 0) state.skill.index = index;
  persistSkillSession();
  render();
  toast('直前の回答を取り消した。メモとピンは残してある。');
  window.scrollTo(0, 0);
}
function skillQuestionsForOutput(filter = state.skill.outputFilter) {
  return SKILL_QUESTIONS.filter((question) => {
    const answer = skillAnswer(question.id);
    const decorated = Boolean(answer.status || answer.note?.trim() || answer.pins?.length);
    if (filter === 'ready') return answer.status === 'yes';
    if (filter === 'usable') return ['yes', 'guided'].includes(answer.status);
    if (filter === 'pinned') return Boolean(answer.note?.trim() || answer.pins?.length);
    if (filter === 'constraints') return question.isConstraint || answer.status === 'no';
    return decorated;
  });
}
function answerDetailsForOutput(answer, format) {
  const lines = [];
  if (answer.guidedSupport?.length) lines.push(format === 'text' ? `  条件：${answer.guidedSupport.join('・')}` : `  - 条件：${answer.guidedSupport.join('・')}`);
  if (answer.pins?.length) lines.push(format === 'text' ? `  ピン：${answer.pins.join('・')}` : `  - ピン：${answer.pins.join('・')}`);
  if (answer.note?.trim()) lines.push(format === 'text' ? `  メモ：${answer.note.trim()}` : `  - メモ：${answer.note.trim()}`);
  return lines;
}
function skillOutput(format = state.skill.outputFormat) {
  const counts = skillCounts();
  const outputQuestions = skillQuestionsForOutput();
  const selectedIds = new Set(outputQuestions.map((question) => question.id));
  const answeredQuestions = SKILL_QUESTIONS.filter((question) => skillAnswer(question.id).status);
  const stamp = new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()).replaceAll('/', '-');
  const filterLabel = OUTPUT_FILTERS[state.skill.outputFilter] || OUTPUT_FILTERS.all;
  if (format === 'text') {
    const lines = [
      'selfanalysis｜できることチェック',
      `出力日時：${stamp}`,
      `表示条件：${filterLabel}`,
      `回答：${answeredQuestions.length} / ${SKILL_QUESTION_COUNT}問`,
      `内訳：○ ${counts.yes} / △ ${counts.guided} / × ${counts.no} / — ${counts.unknown} / 未回答 ${counts.unanswered}`,
      `メモ：${counts.note}件 / ピン：${counts.pin}件`,
      '',
    ];
    SKILL_CATEGORIES.forEach((category) => {
      const rows = categoryQuestions(category.id).filter((question) => selectedIds.has(question.id));
      if (!rows.length) return;
      lines.push(`【${category.label}】`);
      SKILL_STATUS_ORDER.forEach((statusId) => {
        const statusRows = rows.filter((question) => skillAnswer(question.id).status === statusId);
        if (!statusRows.length) return;
        lines.push(skillStatusById(statusId).short);
        statusRows.forEach((question) => {
          const answer = skillAnswer(question.id);
          lines.push(`- ${question.question}`);
          lines.push(...answerDetailsForOutput(answer, 'text'));
        });
      });
      const memoOnlyRows = rows.filter((question) => !skillAnswer(question.id).status && (skillAnswer(question.id).note?.trim() || skillAnswer(question.id).pins?.length));
      if (memoOnlyRows.length) {
        lines.push('回答保留（メモ・ピンあり）');
        memoOnlyRows.forEach((question) => {
          const answer = skillAnswer(question.id);
          lines.push(`- ${question.question}`);
          lines.push(...answerDetailsForOutput(answer, 'text'));
        });
      }
      lines.push('');
    });
    if (!outputQuestions.length) lines.push('表示条件に合う回答・メモがまだない。');
    return lines.join('\n').trim();
  }
  const lines = [
    '# selfanalysis｜できることチェック',
    '',
    `- 出力日時：${stamp}`,
    `- 表示条件：${filterLabel}`,
    `- 回答：${answeredQuestions.length} / ${SKILL_QUESTION_COUNT}問`,
    `- 内訳：○ ${counts.yes} / △ ${counts.guided} / × ${counts.no} / — ${counts.unknown} / 未回答 ${counts.unanswered}`,
    `- 質問に紐づくメモ：${counts.note}件`,
    `- ピン：${counts.pin}件`,
    '',
    '> これはタイプ診断ではなく、具体的な操作を現時点でどこまで担えるかの棚卸し。回答は状況・道具・経験で変わりうる。',
  ];
  SKILL_CATEGORIES.forEach((category) => {
    const rows = categoryQuestions(category.id).filter((question) => selectedIds.has(question.id));
    if (!rows.length) return;
    lines.push('', `## ${category.label}`);
    SKILL_STATUS_ORDER.forEach((statusId) => {
      const statusRows = rows.filter((question) => skillAnswer(question.id).status === statusId);
      if (!statusRows.length) return;
      lines.push('', `### ${skillStatusById(statusId).short}`);
      statusRows.forEach((question) => {
        const answer = skillAnswer(question.id);
        lines.push(`- ${question.question}`);
        lines.push(...answerDetailsForOutput(answer, 'markdown'));
      });
    });
    const memoOnlyRows = rows.filter((question) => !skillAnswer(question.id).status && (skillAnswer(question.id).note?.trim() || skillAnswer(question.id).pins?.length));
    if (memoOnlyRows.length) {
      lines.push('', '### 回答保留（メモ・ピンあり）');
      memoOnlyRows.forEach((question) => {
        const answer = skillAnswer(question.id);
        lines.push(`- ${question.question}`);
        lines.push(...answerDetailsForOutput(answer, 'markdown'));
      });
    }
  });
  if (!outputQuestions.length) lines.push('', '表示条件に合う回答・メモがまだない。');
  return lines.join('\n');
}
function skillInsightMarkup() {
  const answered = SKILL_QUESTION_COUNT - skillCounts().unanswered;
  if (answered < 3) return `<section class="card card-pad skill-insight-empty"><div class="section-heading"><h2>途中の見取り図</h2><span class="sub">3問から表示</span></div><p>まずは3問。ここには診断結果ではなく、回答から見える具体的な操作だけが並ぶ。</p></section>`;
  const rows = SKILL_CATEGORIES.map((category) => {
    const questions = categoryQuestions(category.id);
    const counts = skillCounts(questions.map((question) => question.id));
    const strengths = questions.filter((question) => skillAnswer(question.id).status === 'yes').slice(0, 3);
    const supports = questions.filter((question) => skillAnswer(question.id).status === 'guided').slice(0, 2);
    const pins = questions.filter((question) => skillAnswer(question.id).pins.length || skillAnswer(question.id).note?.trim()).slice(0, 2);
    if (!strengths.length && !supports.length && !pins.length) return '';
    return `<article class="skill-insight-card ${category.isConstraint ? 'constraint' : ''}"><div class="skill-insight-title"><span>${escape(category.shortLabel)}</span><strong>${counts.yes} ○ / ${counts.guided} △</strong></div>${strengths.length ? `<p><b>できること</b> ${escape(strengths.map((question) => question.question).join('／'))}</p>` : ''}${supports.length ? `<p><b>条件があれば</b> ${escape(supports.map((question) => question.question).join('／'))}</p>` : ''}${pins.length ? `<p><b>ピン・メモ</b> ${escape(pins.map((question) => question.question).join('／'))}</p>` : ''}</article>`;
  }).filter(Boolean).slice(0, 6);
  return `<section class="card card-pad" style="margin-top:16px"><div class="section-heading"><h2>今のところ見えていること</h2><span class="sub">診断ではなく、回答した具体操作の見取り図</span></div><div class="skill-insight-grid">${rows.join('') || '<p class="muted">回答はあるが、まだカテゴリごとの傾向を出せるほどではない。</p>'}</div></section>`;
}
function recentAnswerMarkup() {
  const recent = state.skill.lastAnswered;
  if (!recent?.questionId || recent.questionId === state.skill.sessionIds[state.skill.index]) return '';
  const question = skillQuestionById(recent.questionId);
  const answer = skillAnswer(recent.questionId);
  if (!question || !answer.status) return '';
  return `<aside class="skill-recent-answer"><div><span>直前の回答</span><strong>${escape(skillStatusById(answer.status).short)}｜${escape(question.question)}</strong></div><div>${button('直前にメモ', 'open-recent-skill-memo', { variant:'secondary', small:true })}${button('取り消す', 'undo-recent-skill-answer', { variant:'ghost', small:true })}</div></aside>`;
}
function skillDashboardView() {
  const counts = skillCounts();
  const quick = quickSkillQuestionIds();
  const resume = state.skill.sessionIds.length ? ` ${button(`前回の続き（${state.skill.index + 1}問目）`, 'resume-skill', { variant: 'secondary' })}` : '';
  const format = state.skill.outputFormat;
  const output = skillOutput(format);
  const filter = state.skill.outputFilter;
  return `${heading('できることチェック', 'タイプ診断ではなく、具体的な操作を○△×—で積み上げる。思いついたことは、その質問にピンやメモで残す。', `${button('3分だけ答える', 'start-skill-quick', { variant:'primary' })}${resume}`)}
    <section class="card skill-hero">
      <div class="skill-hero-copy">
        <span class="eyebrow">Concrete skill inventory</span>
        <h2>「何が得意か」より、<br>何をどこまで担えるか。</h2>
        <p>自由記入を必須にしない。まずは具体的な一行へ答える。根拠や思い出は、浮かんだときにだけ質問へピンやメモを添える。</p>
        <div class="skill-hero-actions">${button('3分だけ答える｜6問', 'start-skill-quick', { variant:'primary' })}${button(`全 ${SKILL_QUESTION_COUNT}問を始める`, 'start-skill-all', { variant:'secondary' })}</div>
      </div>
      <div class="skill-hero-summary">
        <div class="skill-summary-total"><strong>${SKILL_QUESTION_COUNT - counts.unanswered}</strong><span>/ ${SKILL_QUESTION_COUNT}問<br>回答済み</span></div>
        ${skillProgressBar(SKILL_QUESTION_COUNT - counts.unanswered, SKILL_QUESTION_COUNT)}
        <div class="skill-status-mini"><span class="yes">○ ${counts.yes}</span><span class="guided">△ ${counts.guided}</span><span class="no">× ${counts.no}</span><span class="unknown">— ${counts.unknown}</span></div>
        <div class="skill-mini-meta">メモ ${counts.note}件｜ピン ${counts.pin}件</div>
      </div>
    </section>
    <section class="card card-pad" style="margin-top:16px">
      <div class="section-heading"><h2>今の仕事から始める</h2><span class="sub">今使っている手つきから、12〜50問ずつ</span></div>
      <div class="skill-path-grid">${WORK_PATHS.map((path) => { const ids = questionIdsForWorkPath(path.id); const pathCounts = skillCounts(ids); return `<article class="skill-path-card"><span>${ids.length}問</span><h3>${escape(path.label)}</h3><p>${escape(path.description)}</p>${skillProgressBar(ids.length - pathCounts.unanswered, ids.length)}<footer><small>${ids.length - pathCounts.unanswered} / ${ids.length}問</small>${button('始める', 'start-skill-work-path', { variant:'ghost', small:true, extra:`data-path-id="${escape(path.id)}"` })}</footer></article>`; }).join('')}</div>
    </section>
    ${skillInsightMarkup()}
    <section class="grid grid-2" style="margin-top:16px">
      <div class="card card-pad">
        <div class="section-heading"><h2>気になる分野を深掘り</h2><span class="sub">回答済みでも、最初の未回答から再開</span></div>
        <div class="skill-category-grid">${SKILL_CATEGORIES.map((category) => {
          const questions = categoryQuestions(category.id); const categoryCounts = skillCounts(questions.map((question) => question.id)); const answered = questions.length - categoryCounts.unanswered;
          return `<article class="skill-category-card ${category.isConstraint ? 'constraint' : ''}"><div class="skill-category-head"><div><span class="skill-category-count">${questions.length}問</span><h3>${escape(category.label)}</h3></div><button class="button ghost small" data-action="start-skill-category" data-category-id="${escape(category.id)}">始める</button></div><p>${escape(category.description)}</p>${skillProgressBar(answered, questions.length)}<div class="skill-category-foot"><span>${answered} / ${questions.length}問</span><span>${escape(shortSkillSummary(categoryCounts))}</span></div></article>`;
        }).join('')}</div>
      </div>
      <div class="card card-pad">
        <div class="section-heading"><h2>途中経過を出力</h2><span class="sub">回答した分だけ、いつでも持ち出せる</span></div>
        <div class="skill-output-filter-row">${Object.entries(OUTPUT_FILTERS).map(([id,label]) => `<button type="button" class="skill-filter-chip ${filter === id ? 'active' : ''}" data-action="set-skill-output-filter" data-filter="${id}">${escape(label)}</button>`).join('')}</div>
        <div class="tabs"><button class="tab ${format === 'markdown' ? 'active' : ''}" data-action="set-skill-output-format" data-format="markdown">Markdown</button><button class="tab ${format === 'text' ? 'active' : ''}" data-action="set-skill-output-format" data-format="text">テキスト</button></div>
        <textarea id="skill-output-text" class="output-box skill-output-box" readonly>${escape(output)}</textarea>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">${button('コピー', 'copy-skill-output', { variant:'primary' })}${button(`${format === 'markdown' ? 'Markdown' : 'テキスト'}を保存`, 'download-skill-output', { variant:'secondary' })}</div>
        <div class="notice" style="margin-top:12px">出力には、回答・△の条件・質問に紐づくピン／メモだけが入る。途中でも、今の状態をそのまま残せる。</div>
      </div>
    </section>
    <section class="card card-pad" style="margin-top:16px">
      <div class="section-heading"><h2>このチェックで残すもの</h2></div>
      <div class="grid grid-4"><div class="skill-rule"><strong>○ 実務で一人でできる</strong><span>現時点で仕事の前提に置ける操作</span></div><div class="skill-rule"><strong>△ 条件があればできる</strong><span>見本・検索・手順書・レビューなどを残せる</span></div><div class="skill-rule"><strong>× 現時点で前提に置かない</strong><span>能力の欠点ではなく、支援や代替策を考える材料</span></div><div class="skill-rule"><strong>— 未経験・判断保留</strong><span>不足ではなく、まだ試していない領域</span></div></div>
    </section>`;
}
function skillQuestionView() {
  const ids = state.skill.sessionIds;
  if (!ids.length) return skillDashboardView();
  const safeIndex = Math.max(0, Math.min(state.skill.index, ids.length - 1));
  const question = skillQuestionById(ids[safeIndex]);
  if (!question) { endSkillSession(); return ''; }
  const answer = skillAnswer(question.id);
  const answered = ids.filter((id) => skillAnswer(id).status).length;
  const memoOpen = state.skill.memoOpenQuestionId === question.id || Boolean(answer.note?.trim());
  const isLast = safeIndex === ids.length - 1;
  const category = SKILL_CATEGORIES.find((item) => item.id === question.categoryId);
  const tempo = state.skill.tempo;
  return `${heading('できることチェック', `${escape(state.skill.sessionName || category?.label || question.category)}｜${safeIndex + 1} / ${ids.length}問。回答はいつでも変えられる。`, button('終了して一覧へ', 'finish-skill-session', { variant:'secondary' }))}
    <section class="skill-question-shell">
      <div class="skill-question-top"><div><span class="eyebrow">${escape(category?.shortLabel || 'スキル')}</span><p>${escape(category?.description || '')}</p></div><div class="skill-count">${answered} / ${ids.length}<span>回答済み</span></div></div>
      ${skillProgressBar(safeIndex + 1, ids.length)}
      <div class="skill-tempo"><span>テンポ</span><div><button type="button" class="skill-tempo-button ${tempo === 'fast' ? 'active' : ''}" data-action="set-skill-tempo" data-tempo="fast">サクサク<span>答えたら次へ</span></button><button type="button" class="skill-tempo-button ${tempo === 'stay' ? 'active' : ''}" data-action="set-skill-tempo" data-tempo="stay">じっくり<span>その場でメモ</span></button></div></div>
      ${recentAnswerMarkup()}
      ${question.isConstraint ? `<div class="notice warn" style="margin-top:16px">これは改善の宿題ではない。現時点で業務の前提に置けるか、必要な支援や代替手段があるかを残すための質問。</div>` : ''}
      <div class="skill-question-card">
        <span class="skill-question-number">Q${String(safeIndex + 1).padStart(2, '0')}</span>
        <h2>${escape(question.question)}</h2>
        <p>${escape(question.hint)}</p>
        <div class="skill-answer-grid">${skillAnswerMarkup(question.id, answer)}</div>
        ${guidedSupportMarkup(question.id, answer)}
        <div class="skill-memo-area">
          ${pinMarkup(question.id, answer)}
          <div class="skill-memo-head"><div><strong>この質問へのメモ</strong><span>任意。思い出・根拠・条件が浮かんだときだけ。</span></div><button type="button" class="button ghost small" data-action="toggle-skill-memo" data-question-id="${escape(question.id)}">${memoOpen ? 'メモを閉じる' : '自由メモ'}</button></div>
          ${memoOpen ? `<textarea class="textarea skill-memo-input" data-skill-note="${escape(question.id)}" placeholder="例：SUMIFSはチケット販売集計で使った。複数条件の設計は見本を確認する。">${escape(answer.note || '')}</textarea><span class="help">入力内容はこの質問だけに自動保存される。</span>` : ''}
          ${answerMetaMarkup(answer)}
        </div>
        ${answer.status ? `<div class="skill-current-answer"><span>${escape(SKILL_UI_LABELS[answer.status])}</span><button class="text-button" data-action="clear-skill-answer" data-question-id="${escape(question.id)}">回答を消す</button></div>` : `<div class="skill-current-answer muted">まだ答えなくても進める。未回答は出力に含めない。</div>`}
      </div>
      <div class="skill-question-nav"><button class="button ghost" data-action="skill-prev" ${safeIndex === 0 ? 'disabled' : ''}>← 前へ</button><div>${button('途中経過を出力', 'show-skill-output', { variant:'secondary' })}</div><button class="button primary" data-action="skill-next">${isLast ? '一覧へ戻る' : '次へ →'}</button></div>
    </section>`;
}
function skillsView() { return state.skill.sessionIds.length ? skillQuestionView() : skillDashboardView(); }

function skillMemoModal(questionId, title = 'この質問にメモを添える') {
  const question = skillQuestionById(questionId);
  if (!question) return;
  const answer = skillAnswer(questionId);
  $('#modal-root').innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal skill-memo-modal" role="dialog" aria-modal="true" aria-labelledby="skill-memo-title" onclick="event.stopPropagation()"><header class="modal-head"><h2 id="skill-memo-title">${escape(title)}</h2><button class="icon-button" type="button" data-action="close-modal" aria-label="閉じる">×</button></header><div class="modal-body"><div class="skill-modal-question"><span>${escape(skillStatusById(answer.status).short)}</span><strong>${escape(question.question)}</strong></div>${guidedSupportMarkup(questionId, answer)}${pinMarkup(questionId, answer)}<div class="field" style="margin-top:16px"><label class="label" for="recent-note">自由メモ</label><textarea id="recent-note" class="textarea skill-memo-input" data-skill-note="${escape(questionId)}" placeholder="仕事で使った場面、条件、証拠など。短くてもよい。">${escape(answer.note || '')}</textarea><span class="help">入力内容はこの質問だけに自動保存される。</span></div>${answerMetaMarkup(answer)}</div><footer class="modal-foot"><span class="muted">質問に紐づくメモ</span>${button('閉じる', 'close-modal', { variant:'primary' })}</footer></section></div>`;
  document.body.style.overflow = 'hidden';
}
function skillOutputModal() {
  const format = state.skill.outputFormat;
  const text = skillOutput(format);
  const filter = state.skill.outputFilter;
  $('#modal-root').innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal skill-output-modal" role="dialog" aria-modal="true" aria-labelledby="skill-output-title" onclick="event.stopPropagation()"><header class="modal-head"><h2 id="skill-output-title">できることチェックを出力</h2><button class="icon-button" type="button" data-action="close-modal" aria-label="閉じる">×</button></header><div class="modal-body"><div class="notice">途中経過でも、回答・△の条件・質問に紐づくピン／メモを出力する。未回答は本文に含めない。</div><div class="skill-output-filter-row" style="margin-top:14px">${Object.entries(OUTPUT_FILTERS).map(([id,label]) => `<button type="button" class="skill-filter-chip ${filter === id ? 'active' : ''}" data-action="set-skill-output-filter" data-filter="${id}">${escape(label)}</button>`).join('')}</div><div class="tabs" style="margin-top:14px"><button class="tab ${format === 'markdown' ? 'active' : ''}" data-action="set-skill-output-format" data-format="markdown">Markdown</button><button class="tab ${format === 'text' ? 'active' : ''}" data-action="set-skill-output-format" data-format="text">テキスト</button></div><textarea id="skill-output-modal-text" class="output-box skill-output-box" readonly>${escape(text)}</textarea></div><footer class="modal-foot"><span class="muted">${SKILL_QUESTION_COUNT - skillCounts().unanswered} / ${SKILL_QUESTION_COUNT}問 回答済み</span><div style="display:flex;gap:8px">${button('コピー', 'copy-skill-output', {variant:'secondary'})}${button(`${format === 'markdown' ? 'Markdown' : 'テキスト'}を保存`, 'download-skill-output', {variant:'primary'})}</div></footer></section></div>`;
  document.body.style.overflow = 'hidden';
}

function page() {
  if (state.tab === 'skills') return skillsView();
  if (state.tab === 'ledger') return ledgerView();
  if (state.tab === 'organize') return organizeView();
  if (state.tab === 'discover') return discoverView();
  if (state.tab === 'output') return outputView();
  if (state.tab === 'data') return dataView();
  return inboxView();
}
function render() { $('#app').innerHTML = `${navigation()}<main id="app-main" class="main">${page()}</main>`; }

function scoreControl(name, value, labels, max = 5) {
  return `<div class="score-group"><input type="hidden" name="${name}" value="${value ?? ''}" /> <div class="score-options">${Array.from({length:max}, (_,i)=>i+1).map((n) => `<button type="button" class="score-option ${value === n ? 'active' : ''}" data-score-field="${name}" data-score-value="${n}">${escape(labels ? labels[n-1] : String(n))}</button>`).join('')}</div></div>`;
}
function optionList(list, selected, blank = '未設定') { return `<option value="">${blank}</option>${list.map((x,i) => `<option value="${i+1}" ${Number(selected) === i+1 ? 'selected' : ''}>${escape(x)}</option>`).join('')}`; }
function textField(label, name, value, options = {}) { return `<div class="field ${options.span ? 'span-2' : ''}"><label class="label" for="field-${name}">${escape(label)}</label>${options.area ? `<textarea id="field-${name}" class="textarea" name="${name}" placeholder="${escape(options.placeholder || '')}">${escape(value || '')}</textarea>` : `<input id="field-${name}" class="input" name="${name}" value="${escape(value || '')}" placeholder="${escape(options.placeholder || '')}" />`}${options.help ? `<span class="help">${escape(options.help)}</span>` : ''}</div>`; }
function selectField(label, name, list, value, options={}) { return `<div class="field ${options.span ? 'span-2' : ''}"><label class="label" for="field-${name}">${escape(label)}</label><select id="field-${name}" class="select" name="${name}">${list.map((x) => `<option value="${escape(x)}" ${x === value ? 'selected' : ''}>${escape(x)}</option>`).join('')}</select>${options.help ? `<span class="help">${escape(options.help)}</span>` : ''}</div>`; }

function editorModal(recordInput = null) {
  const r = normalizeRecord(recordInput || recordDefaults());
  const isNew = !recordInput;
  const modal = `
    <div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="editor-title" onclick="event.stopPropagation()">
      <header class="modal-head"><h2 id="editor-title">${isNew ? '新しい記録' : '記録を編集'}</h2><button class="icon-button" type="button" data-action="close-modal" aria-label="閉じる">×</button></header>
      <form id="record-form">
      <div class="modal-body">
        <div class="form-grid">
          ${textField('タイトル', 'title', r.title, {span:true, placeholder:'例：関係者12人の進行をまとめた'})}
          ${selectField('記録の扱い', 'status', STATUS, r.status)}
          ${selectField('種類', 'type', TYPES, r.type, {help:'「できないこと・制約」は、能力の欠陥ではなく、現時点で前提に置かない条件、必要な支援、代替手段を残すための分類。'})}
          ${selectField('領域', 'domain', DOMAINS, r.domain)}
          ${selectField('頻度', 'frequency', FREQUENCIES, r.frequency)}
          ${textField('一言要約', 'summary', r.summary, {span:true, area:true, placeholder:'何をしたか、何が起きたかを短く'})}
          ${textField('タグ', 'tags', r.tags.join(' | '), {span:true, help:'複数タグは | で区切る。例：広報 | 企画 | 英語'})}
        </div>
        <details class="details" open><summary>1. 事実</summary><div class="details-content"><div class="form-grid">
          ${textField('何をしたか', 'what', r.what, {span:true, area:true})}
          ${textField('いつ・どこで', 'where', r.where, {area:true})}
          ${textField('自分の役割', 'role', r.role, {area:true})}
          ${textField('関係者', 'stakeholders', r.stakeholders, {area:true})}
          ${textField('結果・変化', 'result', r.result, {area:true})}
          ${textField('最終実施日', 'lastDone', r.lastDone, {help:'YYYY-MM-DD または自由記述'})}
        </div></div></details>
        <details class="details"><summary>2. 証拠</summary><div class="details-content"><div class="form-grid">
          ${textField('証拠・具体例', 'evidence', r.evidence, {span:true, area:true, placeholder:'案件名、数値、URL、制作物、第三者の評価'})}
          ${textField('紐づくID', 'linkedIds', r.linkedIds.join(' | '), {help:'関連する記録IDがあれば | 区切り'})}
        </div></div></details>
        <details class="details"><summary>3. 条件・背景</summary><div class="details-content"><div class="form-grid">
          ${textField('期限', 'deadline', r.deadline, {placeholder:'例：短納期／期限あり'})}
          ${textField('裁量', 'autonomy', r.autonomy, {placeholder:'例：低い／中程度／高い'})}
          ${textField('関係者の広さ', 'stakeholderScope', r.stakeholderScope, {placeholder:'例：少人数／複数部署／社外含む'})}
          ${textField('不確実性', 'uncertainty', r.uncertainty, {placeholder:'例：定型／例外あり／前例なし'})}
          ${textField('条件タグ', 'conditions', r.conditions.join(' | '), {span:true, help:'例：目的が明確 | 判断期限あり | 現場運用あり'})}
        </div></div></details>
        <details class="details"><summary>4. 振り返り</summary><div class="details-content"><div class="form-grid">
          <div class="field"><label class="label">好き度</label>${scoreControl('enjoyment', r.enjoyment, SCORE_LABELS.enjoyment)}</div>
          <div class="field"><label class="label">消耗度</label>${scoreControl('fatigue', r.fatigue, SCORE_LABELS.fatigue)}</div>
          <div class="field span-2"><label class="label">扱える範囲</label><select class="select" name="capability">${optionList(CAPABILITY, r.capability)}</select><span class="help">「得意」は感覚でなく、どこまで自走・応用・仕組み化できるかで残す。</span></div>
          ${Object.entries(AXIS_LABELS).map(([key,label]) => `<div class="field"><label class="label">${escape(label)}を扱う度合い</label><select class="select" name="${key}"><option value="">未整理</option><option value="0" ${r[key] === 0 ? 'selected' : ''}>0：扱わない</option><option value="1" ${r[key] === 1 ? 'selected' : ''}>1：少し扱う</option><option value="2" ${r[key] === 2 ? 'selected' : ''}>2：中心的に扱う</option><option value="3" ${r[key] === 3 ? 'selected' : ''}>3：強く扱う</option></select></div>`).join('')}
          ${textField('振り返りメモ', 'reflection', r.reflection, {span:true, area:true})}
          ${textField('反証・うまくいかなかった条件', 'counterEvidence', r.counterEvidence, {span:true, area:true})}
          ${textField('次に試すこと・代替策', 'nextExperiment', r.nextExperiment, {span:true, area:true, help:'改善だけでなく、避ける・頼る・仕組みで補う選択肢も書く。'})}
        </div></div></details>
        <details class="details"><summary>5. 提示用メモ</summary><div class="details-content"><div class="form-grid">
          ${selectField('面接での利用', 'interviewUse', INTERVIEW, r.interviewUse)}
          ${textField('応募先・用途タグ', 'useTags', r.useTags.join(' | '), {help:'例：PARK | PM | ブランディング'})}
          ${textField('一言で言うと', 'oneLiner', r.oneLiner, {span:true, area:true})}
          ${textField('再現できる条件', 'reproducibleConditions', r.reproducibleConditions, {span:true, area:true})}
          ${textField('他社でも通じる言い換え', 'translation', r.translation, {span:true, area:true})}
        </div></div></details>
        <input type="hidden" name="id" value="${escape(r.id)}" /><input type="hidden" name="createdAt" value="${escape(r.createdAt)}" /><input type="hidden" name="seedId" value="${escape(r.seedId || '')}" />
      </div>
      <footer class="modal-foot"><div>${!isNew ? button('削除', 'delete-record', {variant:'danger', id:r.id}) : '<span class="muted">保存後に証拠や条件を足せる。</span>'}</div><div style="display:flex;gap:8px">${button('閉じる', 'close-modal', {variant:'secondary'})}<button class="button primary" type="submit">保存する</button></div></footer>
      </form>
    </section></div>`;
  $('#modal-root').innerHTML = modal;
  document.body.style.overflow = 'hidden';
  setTimeout(() => $('#field-title')?.focus(), 20);
}
function closeModal() { $('#modal-root').innerHTML = ''; document.body.style.overflow = ''; }

function formToRecord(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  ['tags', 'linkedIds', 'conditions', 'useTags'].forEach((key) => data[key] = toArray(data[key]));
  ['enjoyment', 'fatigue', 'capability'].forEach((key) => data[key] = toInt(data[key], 5));
  Object.keys(AXIS_LABELS).forEach((key) => data[key] = toInt(data[key], 3));
  data.updatedAt = now();
  return normalizeRecord(data);
}

function downloadText(filename, text, type = 'text/tab-separated-values;charset=utf-8') {
  const blob = new Blob([`\uFEFF${text}`], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 700);
}
function tsvEscape(value) {
  const text = Array.isArray(value) ? value.join(' | ') : String(value ?? '');
  return /[\t\n\r"]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}
function recordsToTSV(records) {
  const header = TSV_COLUMNS.map(([label]) => label);
  const lines = [header.map(tsvEscape).join('\t')];
  records.forEach((record) => lines.push(TSV_COLUMNS.map(([,key]) => tsvEscape(record[key])).join('\t')));
  return lines.join('\n');
}
function templateTSV() { return TSV_COLUMNS.map(([label]) => label).join('\t') + '\n'; }
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); toast('クリップボードにコピーした。'); }
  catch { toast('コピーできなかった。ブラウザの権限を確認して。', 'error'); }
}

function parseTSV(text) {
  const rows = []; let row = []; let field = ''; let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]; const next = text[i+1];
    if (char === '"') { if (quoted && next === '"') { field += '"'; i += 1; } else quoted = !quoted; }
    else if (char === '\t' && !quoted) { row.push(field); field = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(field); field = '';
      if (row.some((value) => value !== '')) rows.push(row);
      row = [];
    } else field += char;
  }
  if (field || row.length) { row.push(field); if (row.some((value) => value !== '')) rows.push(row); }
  if (!rows.length) return { headers: [], rows: [] };
  const headers = rows[0].map((x) => x.trim());
  return { headers, rows: rows.slice(1).map((values, index) => ({ line: index + 2, values })) };
}
function mapImportRow(headers, values) {
  const patch = {};
  headers.forEach((header, idx) => {
    const key = HEADER_ALIASES.get(header.trim());
    if (!key) return;
    const value = values[idx] ?? '';
    if (key === 'tags' || key === 'linkedIds' || key === 'conditions' || key === 'useTags') patch[key] = value === '' ? '' : value === CLEAR ? CLEAR : toArray(value);
    else if (['enjoyment','fatigue','capability'].includes(key)) patch[key] = value === '' ? '' : value === CLEAR ? CLEAR : toInt(value, 5);
    else if (Object.keys(AXIS_LABELS).includes(key)) patch[key] = value === '' ? '' : value === CLEAR ? CLEAR : toInt(value, 3);
    else patch[key] = value;
  });
  return patch;
}
function createImportPreview(text, mode) {
  const parsed = parseTSV(text);
  const mapped = parsed.headers.map((h) => ({ raw:h, key:HEADER_ALIASES.get(h.trim()) || '' }));
  const recognized = mapped.filter((x) => x.key);
  const existing = new Map(state.records.map((r) => [r.id, r]));
  const preview = { mode, modeLabel: { add:'追加',partial:'部分更新',restore:'全件復元',replace:'全置換' }[mode], headers: parsed.headers, mapped, rows: [], errors: [], add:0, update:0, skip:0, parsedRows: [] };
  if (!recognized.length) { preview.errors.push('見出しを認識できなかった。テンプレートを使うか、タイトル列を含めて貼り付ける。'); return preview; }
  parsed.rows.forEach(({line, values}) => {
    const patch = mapImportRow(parsed.headers, values);
    const id = patch.id;
    const existingRecord = id ? existing.get(id) : null;
    const title = patch.title || existingRecord?.title || '';
    let kind = 'skip'; let label='スキップ'; let note='空行または更新対象がない';
    if (mode === 'partial') {
      if (!id || !existingRecord) { kind='error'; label='エラー'; note='部分更新には既存の __id が必要'; }
      else {
        const changedKeys = Object.keys(patch).filter((key) => key !== 'id' && patch[key] !== '');
        if (changedKeys.length) { kind='update'; label='更新'; note=`${changedKeys.join('、')} を更新`; }
        else { kind='skip'; label='スキップ'; note='空欄は変更しない'; }
      }
    } else if (mode === 'add') {
      if (!patch.title) { kind='error'; label='エラー'; note='タイトルが空欄'; }
      else if (id && existingRecord) { kind='skip'; label='スキップ'; note='同じ __id が既にある（既存データは触らない）'; }
      else { kind='new'; label='追加'; note='新しい記録として追加'; }
    } else {
      if (!patch.title) { kind='error'; label='エラー'; note='タイトルが空欄'; }
      else if (id && existingRecord) { kind='update'; label='更新'; note='全件データとして反映'; }
      else { kind='new'; label='追加'; note='全件データに追加'; }
    }
    const item = { line, patch, title, kind, label, note };
    preview.rows.push(item); preview.parsedRows.push(item);
    if (kind === 'new') preview.add += 1;
    else if (kind === 'update') preview.update += 1;
    else if (kind === 'skip') preview.skip += 1;
    else preview.errors.push(`行${line}：${note}`);
  });
  return preview;
}
async function applyImport(preview) {
  const valid = preview.rows.filter((x) => x.kind === 'new' || x.kind === 'update');
  if (!valid.length) { toast('反映できる行がない。', 'warn'); return; }
  if ((preview.mode === 'replace' || preview.mode === 'restore') && !confirm(`現在の${state.records.length}件を、取り込みデータで置き換える。自動バックアップは作るが、実行してよい？`)) return;
  await makeSnapshot(`TSV${preview.modeLabel}前`);
  const current = new Map(state.records.map((r) => [r.id, r]));
  let next;
  if (preview.mode === 'replace' || preview.mode === 'restore') {
    next = valid.map((item) => normalizeRecord({ ...item.patch, id: item.patch.id || uid(), createdAt: current.get(item.patch.id)?.createdAt || now(), updatedAt: now() }));
  } else if (preview.mode === 'partial') {
    next = state.records.map((old) => {
      const item = valid.find((x) => x.patch.id === old.id);
      if (!item) return old;
      const patch = {};
      Object.entries(item.patch).forEach(([key,value]) => { if (key !== 'id' && value !== '') patch[key] = value === CLEAR ? (Array.isArray(old[key]) ? [] : '') : value; });
      return normalizeRecord({ ...old, ...patch, updatedAt: now() });
    });
  } else {
    next = [...state.records, ...valid.map((item) => normalizeRecord({ ...item.patch, id: item.patch.id || uid(), createdAt: now(), updatedAt: now() }))];
  }
  await replaceAllRecords(next);
  state.importPreview = null;
  await refreshRecords();
  toast(`${preview.modeLabel}を反映した。追加 ${preview.add}件、更新 ${preview.update}件。`);
}

async function seedSample() {
  const existing = new Set(state.records.map((r) => r.seedId || r.id));
  const candidates = SAMPLE_RECORDS.filter((r) => !existing.has(r.seedId || r.id)).map((r) => normalizeRecord({ ...r, id: r.id || uid(), seedId: r.seedId || r.id, createdAt: now(), updatedAt: now(), isSample: true }));
  if (!candidates.length) { toast('初期台帳はすでに取り込み済み。', 'warn'); return; }
  if (!confirm(`初期台帳 ${candidates.length}件を追加する。業務上の機微な情報も含むため、公開GitHubにはそのまま置かない。`)) return;
  await makeSnapshot('初期台帳追加前');
  await Promise.all(candidates.map(putRecord));
  await refreshRecords();
  toast(`初期台帳 ${candidates.length}件を追加した。`);
}

function setFilters(partial) { state.filters = { ...state.filters, ...partial }; render(); }
function showSubset(rows, label) { state.tab = 'ledger'; state.filters = { search:'', status:'', type:'', domain:'', interviewUse:'', sort:'updated' }; state._subset = { rows: rows.map((r)=>r.id), label }; render(); }

function handleAction(action, target) {
  if (action === 'start-skill-quick') return startSkillSession(quickSkillQuestionIds(), { name: '3分だけ答える｜6問' });
  if (action === 'start-skill-all') return startSkillSession(SKILL_QUESTIONS.map((question) => question.id), { name: `全 ${SKILL_QUESTION_COUNT}問` });
  if (action === 'start-skill-category') { const category = SKILL_CATEGORIES.find((item) => item.id === target.dataset.categoryId); return startSkillSession(categoryQuestions(target.dataset.categoryId).map((question) => question.id), { name: category?.label || '分野別チェック' }); }
  if (action === 'start-skill-work-path') { const path = WORK_PATHS.find((item) => item.id === target.dataset.pathId); return startSkillSession(questionIdsForWorkPath(target.dataset.pathId), { name: path?.label || '仕事から始める' }); }
  if (action === 'resume-skill') { persistSkillSession(); render(); return; }
  if (action === 'answer-skill') return setSkillStatus(target.dataset.questionId, target.dataset.status);
  if (action === 'set-skill-tempo') { state.skill.tempo = target.dataset.tempo === 'fast' ? 'fast' : 'stay'; persistSkillSession(); render(); return; }
  if (action === 'toggle-guided-support') return toggleGuidedSupport(target.dataset.questionId, target.dataset.value);
  if (action === 'toggle-skill-pin') return toggleSkillPin(target.dataset.questionId, target.dataset.value);
  if (action === 'toggle-skill-memo') { state.skill.memoOpenQuestionId = state.skill.memoOpenQuestionId === target.dataset.questionId ? '' : target.dataset.questionId; render(); return; }
  if (action === 'open-recent-skill-memo') return skillMemoModal(state.skill.lastAnswered?.questionId, '直前の回答にメモを添える');
  if (action === 'undo-recent-skill-answer') return clearSkillStatusOnly(state.skill.lastAnswered?.questionId);
  if (action === 'clear-skill-answer') return clearSkillAnswer(target.dataset.questionId);
  if (action === 'skill-prev') { state.skill.index = Math.max(0, state.skill.index - 1); persistSkillSession(); render(); window.scrollTo(0, 0); return; }
  if (action === 'skill-next') { if (state.skill.index >= state.skill.sessionIds.length - 1) return endSkillSession(); state.skill.index += 1; state.skill.memoOpenQuestionId = ''; persistSkillSession(); render(); window.scrollTo(0, 0); return; }
  if (action === 'finish-skill-session') return endSkillSession();
  if (action === 'show-skill-output') return skillOutputModal();
  if (action === 'set-skill-output-format') { state.skill.outputFormat = target.dataset.format === 'text' ? 'text' : 'markdown'; persistSkillSession(); if ($('#modal-root').innerHTML) skillOutputModal(); else render(); return; }
  if (action === 'set-skill-output-filter') { state.skill.outputFilter = Object.hasOwn(OUTPUT_FILTERS, target.dataset.filter) ? target.dataset.filter : 'all'; persistSkillSession(); if ($('#modal-root').innerHTML) skillOutputModal(); else render(); return; }
  if (action === 'copy-skill-output') return copyText($('#skill-output-modal-text')?.value || $('#skill-output-text')?.value || skillOutput());
  if (action === 'download-skill-output') { const format = state.skill.outputFormat; return downloadText(`selfanalysis-skill-check-${new Date().toISOString().slice(0,10)}.${format === 'markdown' ? 'md' : 'txt'}`, skillOutput(format), format === 'markdown' ? 'text/markdown;charset=utf-8' : 'text/plain;charset=utf-8'); }
  if (action === 'new-record') return editorModal();
  if (action === 'open-record') return editorModal(state.records.find((r) => r.id === target.dataset.id));
  if (action === 'close-modal') return closeModal();
  if (action === 'delete-record') return deleteCurrent(target.dataset.id);
  if (action === 'go-ledger') { state.tab = 'ledger'; render(); return; }
  if (action === 'clear-filters') { state.filters = { search:'',status:'',type:'',domain:'',interviewUse:'',sort:'updated' }; render(); return; }
  if (action === 'filter-evidence-missing') return showSubset(state.records.filter((r)=>!r.evidence && !r.result), '証拠待ち');
  if (action === 'filter-condition-missing') return showSubset(state.records.filter((r)=>!r.conditions.length && !r.deadline && !r.autonomy && !r.stakeholderScope), '条件未整理');
  if (action === 'filter-reflection-missing') return showSubset(state.records.filter((r)=>!r.reflection && !r.counterEvidence && !r.nextExperiment), '振り返り待ち');
  if (action === 'filter-interview-thin') return showSubset(state.records.filter((r)=>r.interviewUse !== 'まだ使わない' && scoreEvidence(r)<2), '面接候補だが薄い');
  if (action === 'filter-constraints') return showSubset(state.records.filter((r)=>r.type === 'できないこと・制約'), 'できないこと・制約');
  if (action === 'seed-sample') return seedSample();
  if (action === 'export-all') return downloadText(`selfanalysis-${APP_VERSION}-backup-${new Date().toISOString().slice(0,10)}.tsv`, recordsToTSV(state.records));
  if (action === 'export-filtered') return downloadText(`selfanalysis-${APP_VERSION}-filtered-${new Date().toISOString().slice(0,10)}.tsv`, recordsToTSV(filteredRecords()));
  if (action === 'export-selected') return downloadText(`selfanalysis-${APP_VERSION}-selected-${new Date().toISOString().slice(0,10)}.tsv`, recordsToTSV(state.records.filter((r)=>state.selected.has(r.id))));
  if (action === 'copy-template') return copyText(templateTSV());
  if (action === 'choose-tsv-file') return $('#tsv-file')?.click();
  if (action === 'parse-import') {
    const text = $('#import-text')?.value || ''; const mode = $('#import-mode')?.value || 'add';
    if (!text.trim()) return toast('TSVを貼り付けてから差分を確認して。', 'warn');
    state.importPreview = createImportPreview(text, mode); render(); return;
  }
  if (action === 'clear-import-preview') { state.importPreview = null; render(); return; }
  if (action === 'apply-import') return applyImport(state.importPreview);
  if (action === 'copy-output') return copyText($('#output-text')?.value || '');
}
async function deleteCurrent(id) {
  const record = state.records.find((r)=>r.id===id);
  if (!record || !confirm(`「${record.title}」を削除する？ この操作は直前のスナップショットからしか戻せない。`)) return;
  await makeSnapshot('記録削除前'); await deleteRecord(id); closeModal(); await refreshRecords(); toast('削除した。');
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-tab]');
    if (tab) { state.tab = tab.dataset.tab; state._subset = null; render(); return; }
    const score = event.target.closest('[data-score-field]');
    if (score) {
      const input = $(`input[name="${score.dataset.scoreField}"]`, $('#modal-root'));
      if (input) { input.value = score.dataset.scoreValue; $$(`[data-score-field="${score.dataset.scoreField}"]`, $('#modal-root')).forEach((el)=>el.classList.toggle('active', el === score)); }
      return;
    }
    const action = event.target.closest('[data-action]');
    if (action) handleAction(action.dataset.action, action);
  });
  document.addEventListener('submit', async (event) => {
    if (event.target.id === 'quick-capture') {
      event.preventDefault(); const form = event.target; const fd = new FormData(form); const record = normalizeRecord({ ...recordDefaults(), title: fd.get('title'), domain: fd.get('domain'), status:'事実', type:'実例', summary:'', createdAt:now(), updatedAt:now() });
      await putRecord(record); form.reset(); await refreshRecords(); toast('事実メモとして保存した。'); return;
    }
    if (event.target.id === 'record-form') {
      event.preventDefault(); const record = formToRecord(event.target); if (!record.title.trim()) { toast('タイトルを入れて。', 'warn'); return; }
      await putRecord(record); closeModal(); await refreshRecords(); toast('保存した。'); return;
    }
  });
  document.addEventListener('change', async (event) => {
    const filter = event.target.closest('[data-filter]');
    if (filter) { setFilters({ [filter.dataset.filter]: filter.value }); return; }
    const selected = event.target.closest('[data-select-record]');
    if (selected) { if (selected.checked) state.selected.add(selected.dataset.selectRecord); else state.selected.delete(selected.dataset.selectRecord); render(); return; }
    if (event.target.id === 'tsv-file') {
      const file = event.target.files?.[0]; if (!file) return; const text = await file.text(); const box = $('#import-text'); if (box) box.value = text; toast(`${file.name} を読み込んだ。差分を確認して。`); return;
    }
  });
  document.addEventListener('input', (event) => {
    const skillNote = event.target.closest('[data-skill-note]');
    if (skillNote) {
      const questionId = skillNote.dataset.skillNote;
      const note = skillNote.value;
      const current = skillAnswer(questionId);
      state.skillAnswers.set(questionId, { ...current, questionId, note, updatedAt: now() });
      window.__skillNoteTimers = window.__skillNoteTimers || {};
      clearTimeout(window.__skillNoteTimers[questionId]);
      window.__skillNoteTimers[questionId] = setTimeout(() => { putSkillAnswer(state.skillAnswers.get(questionId)).catch(console.error); }, 360);
      return;
    }
    const filter = event.target.closest('[data-filter="search"]');
    if (filter) { state.filters.search = filter.value; clearTimeout(window.__searchTimer); window.__searchTimer = setTimeout(render, 220); }
  });
  document.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-output-kind]');
    if (tab) {
      $$('.tab').forEach((x)=>x.classList.toggle('active', x===tab));
      const records = state.records.filter((r)=>state.selected.has(r.id)); const out = $('#output-text'); if (out) out.value = buildOutput(records, tab.dataset.outputKind);
    }
  });
  window.addEventListener('keydown', async (event) => {
    if (event.key === 'Escape' && $('#modal-root').innerHTML) closeModal();
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase()==='s' && $('#record-form')) { event.preventDefault(); $('#record-form').requestSubmit(); }
  });
}

async function boot() {
  try {
    state.db = await openDB();
    state.records = (await getAllRecords()).map(normalizeRecord).sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt));
    state.skillAnswers = new Map((await getAllSkillAnswers()).map((answer) => [answer.questionId, normalizeSkillAnswer(answer)]));
    restoreSkillSession();
    bindEvents(); render();
  } catch (error) {
    console.error(error);
    $('#app').innerHTML = `<main class="main"><div class="notice danger"><strong>保存領域を開けなかった。</strong><br>ブラウザのプライベートモードやストレージ設定を確認して、ページを再読み込みして。</div></main>`;
  }
}
boot();
