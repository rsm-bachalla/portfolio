/* =============================================================================
   PORTFOLIO — script.js
   -----------------------------------------------------------------------------
   Sections:
     1. Theme toggle (dark / light mode)
     2. Navbar scroll behaviour
     3. Mobile menu
     4. Typing effect (hero)
     5. Scroll-reveal animations
     6. Project data (EDIT this to update case studies)
     7. Modal open / close
     8. Active nav-link highlighting
   ============================================================================= */

'use strict';

/* =============================================================================
   1. THEME TOGGLE
   ============================================================================= */

const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');

/* Restore theme from localStorage, default to 'light' */
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
   2. NAVBAR SCROLL BEHAVIOUR
   ============================================================================= */

const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });


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

/* Close mobile menu when any link is tapped */
document.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navMenuBtn.classList.remove('open');
    navMenuBtn.setAttribute('aria-expanded', 'false');
  });
});


/* =============================================================================
   4. TYPING EFFECT
   ============================================================================= */

/* EDIT: Change these phrases to whatever you want the hero to cycle through */
const PHRASES = [
  'build products people want.',
  'work with data to find truth.',
  'experiment with AI to unlock scale.',
  'ship fast and learn faster.',
];

const typedEl = document.getElementById('typedText');
let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;

function tick() {
  const current = PHRASES[phraseIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;

    if (charIdx === current.length) {
      deleting = true;
      setTimeout(tick, 1900); /* pause at end of phrase */
      return;
    }
    setTimeout(tick, 65);
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;

    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % PHRASES.length;
    }
    setTimeout(tick, 38);
  }
}

/* Start typing after the hero entrance animation settles */
setTimeout(tick, 1300);


/* =============================================================================
   5. SCROLL-REVEAL ANIMATIONS
   ============================================================================= */

const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    /* Stagger sibling .reveal elements within the same parent */
    const siblings = Array.from(
      entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
    );
    const delay = siblings.indexOf(entry.target) * 75;

    setTimeout(() => entry.target.classList.add('visible'), delay);
    revealObserver.unobserve(entry.target);
  });
}, {
  threshold:  0.1,
  rootMargin: '0px 0px -40px 0px',
});

revealEls.forEach(el => revealObserver.observe(el));


/* =============================================================================
   6. PROJECT CASE-STUDY DATA
   -----------------------------------------------------------------------------
   EDIT: Update each object to reflect your actual projects.
   Keys: label, title, problem, what, tools (array), impact (array of strings)
   ============================================================================= */

const PROJECTS = {
  1: {
    label:   'AI · Product',
    title:   'AI-Powered Catalog Enrichment',
    problem: 'Product catalogs were riddled with missing attributes, inconsistent descriptions, and incomplete specs — making search and discovery poor for end users and creating massive manual work for the ops team. The team was spending 30+ hours a week on enrichment that should have been automatic.',
    what:    'Designed and built an LLM-based enrichment pipeline that processed product data through structured prompts, validated outputs against a JSON schema, and flagged low-confidence items for human review. Worked with engineering to productionise it and with the ops team to design the review workflow so humans stayed in the loop on edge cases.',
    tools:   ['Claude API', 'GPT-4', 'Python', 'dbt', 'BigQuery', 'Retool'],
    impact:  [
      '80% reduction in manual enrichment effort',
      'Catalog completeness went from 54% → 91% in 6 weeks',
      'Search click-through rate improved by 23%',
      'Scaled to 200k+ SKUs without adding headcount',
    ],
  },

  2: {
    label:   'Growth · Data',
    title:   'Growth Experimentation Framework',
    problem: 'The team was running experiments ad hoc, with no shared methodology, inconsistent metric definitions, and no way to confidently declare winners. Most tests ran too short and were statistically underpowered — meaning decisions were being made on noise.',
    what:    'Built a full A/B testing framework from scratch: defined a minimum detectable effect calculator, created a shared experiment doc template, built a statistical results dashboard in Looker, and ran a team training session. Ran the first cohort of 5 experiments under the new framework myself to prove it out.',
    tools:   ['Python (statsmodels)', 'Looker', 'Segment', 'BigQuery', 'Notion'],
    impact:  [
      '3× increase in experiments shipped per quarter',
      'Avg experiment runtime cut from 5 weeks → 2.5 weeks',
      'First cohort uncovered a $140k ARR opportunity',
      'Team confidence in results significantly improved',
    ],
  },

  3: {
    label:   'Analytics · Strategy',
    title:   'GTM Analytics & Funnel Optimization',
    problem: "Marketing spend was $200k/quarter with no clear picture of what was working. Attribution was broken (last-touch only), funnel drop-offs were invisible, and the sales team didn't trust the data — so decisions were being made on gut feel.",
    what:    "Rebuilt the marketing data stack: implemented a clean Segment schema, set up dbt models for unified funnel tracking, built a multi-touch attribution model, and created a real-time dashboard for both marketing and sales. Then used the data to run a series of funnel optimization experiments that actually moved the needle.",
    tools:   ['Segment', 'dbt', 'BigQuery', 'Metabase', 'Python', 'HubSpot API'],
    impact:  [
      'Identified 2 channels responsible for 70% of pipeline (previously invisible)',
      'Reallocated $80k/quarter in budget based on data',
      'Funnel conversion rate improved 18% in one quarter',
      'Sales and marketing alignment improved meaningfully',
    ],
  },

  4: {
    label:   'AI Agents · Automation',
    title:   'AI Marketing Agent',
    problem: "Content creation, outreach personalisation, and campaign reporting were consuming 60%+ of the marketing team's time — leaving little room for strategy, creativity, or experimentation. The team was stuck in a production treadmill.",
    what:    'Designed an AI agent system using the Claude API for content generation, automated lead research and personalisation, and campaign performance summarisation. Built a lightweight orchestration layer with human-in-the-loop review for outbound sequences, so the team stayed in control without doing all the manual work.',
    tools:   ['Claude API', 'Anthropic SDK', 'Next.js', 'PostgreSQL', 'Resend', 'Vercel'],
    impact:  [
      'Content creation time reduced by 65%',
      'Personalised outreach at 10× previous volume',
      'Reply rate on outbound sequences improved 2.3×',
      'Marketing team refocused 40% of time on strategy',
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
      <div class="modal-tools">
        ${p.tools.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>

    <div class="modal-section">
      <p class="modal-section-label">Impact</p>
      <div class="modal-impact">
        <ul>${p.impact.map(item => `<li>${item}</li>`).join('')}</ul>
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

  /* Return focus to close button for accessibility */
  requestAnimationFrame(() => modalClose.focus());
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* Open on card click */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    openModal(Number(card.getAttribute('data-project')));
  });
  /* Also open on Enter / Space for keyboard users */
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(Number(card.getAttribute('data-project')));
    }
  });
});

/* Close via button, overlay click, or Escape */
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


/* =============================================================================
   8. ACTIVE NAV LINK HIGHLIGHTING (on scroll)
   ============================================================================= */

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${entry.target.id}`
      );
    });
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));
