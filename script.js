/* =============================================================================
   PORTFOLIO — script.js
   Sections:
     1. Theme toggle
     2. Navbar scroll
     3. Mobile menu
     4. Typing effect        ← EDIT: update PHRASES array
     5. Scroll-reveal
     6. Project data         ← EDIT: update PROJECTS object with your real content
     7. Modal
     8. Active nav links
   ============================================================================= */

'use strict';

/* =============================================================================
   1. THEME TOGGLE
   ============================================================================= */

const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', theme);
}

applyTheme(localStorage.getItem('theme') || 'light');

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});


/* =============================================================================
   2. NAVBAR SCROLL
   ============================================================================= */

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 24), { passive: true });


/* =============================================================================
   3. MOBILE MENU
   ============================================================================= */

const navMenuBtn = document.getElementById('navMenuBtn');
const navMobile  = document.getElementById('navMobile');

navMenuBtn.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  navMenuBtn.classList.toggle('open', open);
  navMenuBtn.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navMenuBtn.classList.remove('open');
    navMenuBtn.setAttribute('aria-expanded', 'false');
  });
});


/* =============================================================================
   4. TYPING EFFECT
   EDIT: Change the phrases below to whatever you want to cycle through.
   ============================================================================= */

const PHRASES = [
  'like figuring out why things aren\'t working.',
  'work in data, AI, and product.',
  'enjoy the problem more than the solution.',
  'looking for full-time roles in analytics and AI.',
];

const typedEl = document.getElementById('typedText');
let phraseIdx = 0, charIdx = 0, deleting = false;

function tick() {
  const current = PHRASES[phraseIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) { deleting = true; setTimeout(tick, 1900); return; }
    setTimeout(tick, 65);
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % PHRASES.length; }
    setTimeout(tick, 38);
  }
}

setTimeout(tick, 1400);


/* =============================================================================
   5. SCROLL-REVEAL
   ============================================================================= */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
    const delay    = siblings.indexOf(entry.target) * 75;
    setTimeout(() => entry.target.classList.add('visible'), delay);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* =============================================================================
   6. PROJECT CASE-STUDY DATA
   EDIT: Update each object here to reflect your real projects and outcomes.
   ============================================================================= */

const PROJECTS = {
  1: {
    label:   'AI · Product · Paladio.ai',
    title:   'Improving AI Accuracy from 75% → 92%',
    problem: 'AI-driven construction takeoff had only ~75% accuracy. The system used page-level OCR processing, which missed cross-page context, causing errors that cascaded into downstream estimation and bidding workflows. Every inaccuracy meant manual rework for the ops team and eroded trust in the system.',
    what:    'Led a systematic evaluation of the full document parsing pipeline to identify failure modes. Redesigned the OCR-based workflow into intent-aware, document-level processing that maintained context across pages. Defined a production metrics framework (accuracy, latency, and recovery rate) to guide deployment decisions and give the engineering team clear targets.',
    tools:   ['Python', 'Document Parsing Pipelines', 'OCR Systems', 'SQL', 'System Metrics Design'],
    impact:  [
      'Accuracy improved from ~75% → ~92%',
      'Cross-page data consistency significantly improved',
      'Defined production-ready metrics framework adopted by engineering',
      'Reduced manual rework for the operations team',
    ],
  },

  2: {
    label:   'AI · NLP · San Diego County Taxpayers Association',
    title:   'AI-Powered Document Analysis Workflows',
    problem: 'Analysts were manually reading and categorizing hundreds of public policy documents per reporting cycle, which took days and produced inconsistent output. There was no scalable way to surface patterns across large text corpora.',
    what:    'Built AI-assisted workflows using OpenAI APIs to automate document analysis end-to-end. Applied NLP techniques including topic modeling, clustering, and sentiment analysis to extract structured insights from large-scale unstructured text. Built interactive Streamlit dashboards so stakeholders could explore public sentiment and policy insights without SQL knowledge.',
    tools:   ['OpenAI APIs', 'Python', 'NLP (topic modeling, clustering, sentiment)', 'Streamlit', 'pandas'],
    impact:  [
      'Turnaround time reduced by 70–80%',
      'Enabled analysis at a scale previously impossible manually',
      'Interactive dashboards adopted by non-technical stakeholders',
      'Consistent, reproducible output across document batches',
    ],
  },

  3: {
    label:   'Growth · Analytics · Basey Insurance',
    title:   'Funnel Optimization & Engagement',
    problem: 'User engagement was stagnating and drop-off points were invisible. The team lacked clear metric definitions and relied on manual, error-prone reporting that consumed hours each week, leaving no time for analysis or experimentation.',
    what:    'Conducted in-depth customer journey mapping to identify drop-off points across the funnel. Designed and ran targeted A/B tests against the highest-impact drop-off stages. Defined and formally tracked product metrics across activation, conversion, retention, and drop-offs. Built automated Power BI dashboards replacing the manual reporting workflow entirely.',
    tools:   ['Power BI', 'SQL', 'Python', 'A/B Testing', 'Journey Mapping'],
    impact:  [
      '15% improvement in user engagement',
      '80% reduction in manual reporting effort',
      'Clear metric definitions adopted across the product team',
      'Data-driven experimentation culture established',
    ],
  },

  5: {
    label:   'AI Agents · Automation',
    title:   'OpenClaw: Automated B2B Marketing Agent',
    problem: 'Finding the right leads and following up consistently is one of those things that sounds simple but takes a huge amount of time when done manually. Searching for ICP-matching companies, tracking contact info, writing personalized emails, logging what was sent and when — it adds up fast and usually falls through the cracks.',
    what:    'Built OpenClaw, an end-to-end agentic marketing system. It uses web search to find companies that match a target customer profile, enriches and stores contact data in a structured pipeline, and automatically sends personalized outreach emails through Gmail via Composio. The agent tracks campaign status, manages follow-up sequences, and logs every action — so nothing gets missed and the whole process runs on demand without manual input.',
    tools:   ['Claude AI', 'Composio', 'Gmail API', 'Web Search', 'Python', 'Agentic Workflows'],
    impact:  [
      'Fully automated the lead discovery to email outreach pipeline',
      'Campaigns run on demand with no manual steps',
      'Contact pipeline tracked with status, follow-up scheduling, and outreach logs',
      'Built-in guardrails for compliance (opt-out handling, honest claims)',
    ],
  },

  4: {
    label:   'Pricing · Data · Paladio.ai',
    title:   'Demand-Driven Pricing Models',
    problem: 'E-commerce agent pricing was static and not responsive to demand signals. This left revenue on the table during high-demand periods and created price volatility that eroded customer trust during low-demand cycles.',
    what:    'Built demand-driven pricing models using trend analysis and systematic experimentation. Integrated demand signals into pricing logic and validated impact through controlled experiments. Worked cross-functionally with product and engineering to translate model outputs into production pricing decisions.',
    tools:   ['Python', 'SQL', 'Trend Analysis', 'Experimentation Frameworks', 'Data Visualization'],
    impact:  [
      'Revenue per SKU increased by 3–5%',
      'Price volatility reduced by ~20%',
      'Pricing decisions shifted from static to data-driven',
      'Framework extensible to new product categories',
    ],
  },
};


/* =============================================================================
   7. MODAL — open / close
   ============================================================================= */

const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const modalBody    = document.getElementById('modalBody');

function buildModalHTML(p) {
  return `
    <p class="modal-label">${p.label}</p>
    <h2 class="modal-title" id="modalTitle">${p.title}</h2>
    <div class="modal-section">
      <p class="modal-section-label">The Problem</p>
      <p>${p.problem}</p>
    </div>
    <div class="modal-section">
      <p class="modal-section-label">What I Did</p>
      <p>${p.what}</p>
    </div>
    <div class="modal-section">
      <p class="modal-section-label">Tools Used</p>
      <div class="modal-tools">${p.tools.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
    <div class="modal-section">
      <p class="modal-section-label">Impact</p>
      <div class="modal-impact">
        <ul>${p.impact.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
    </div>
  `;
}

function openModal(id) {
  const project = PROJECTS[id];
  if (!project) return;
  modalBody.innerHTML = buildModalHTML(project);
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modalClose.focus());
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openModal(Number(card.getAttribute('data-project'))));
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(Number(card.getAttribute('data-project'))); }
  });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


/* =============================================================================
   8. ACTIVE NAV LINK HIGHLIGHTING
   ============================================================================= */

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
