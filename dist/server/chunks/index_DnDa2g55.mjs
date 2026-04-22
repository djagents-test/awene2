import { c as createComponent } from './astro-component_DHzua5za.mjs';
import 'piccolore';
import { r as renderTemplate, h as renderHead } from './server_VPo9KEKI.mjs';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template([`<html lang="fr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>AWENE — Nouveau site en préparation</title><meta name="description" content="AWENE prépare un nouvel espace dédié à la neuro-wellness en périménopause et ménopause."><meta name="robots" content="noindex, nofollow"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="icon" type="image/png" href="/favicon.png"><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet"><style>
      *, *::before, *::after { box-sizing: border-box; }
      html { height: 100%; }
      body {
        margin: 0;
        min-height: 100%;
        font-family: 'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        color: #2E2438;
        background: #FCFAF8;
        overflow-x: hidden;
        position: relative;
      }
      .sr-only {
        position: absolute; width: 1px; height: 1px; padding: 0;
        margin: -1px; overflow: hidden; clip: rect(0,0,0,0);
        white-space: nowrap; border-width: 0;
      }
      .bg {
        position: fixed; inset: 0; overflow: hidden;
        z-index: 0; pointer-events: none;
      }
      .orb {
        position: absolute; border-radius: 50%;
        filter: blur(72px); will-change: transform;
      }
      .orb-1 {
        width: 520px; height: 520px;
        background: radial-gradient(circle at 40% 40%, #C8A8F2 0%, #A070E0 60%, transparent 100%);
        top: -140px; right: -100px; opacity: 0.52;
        animation: orb1 20s ease-in-out infinite;
      }
      .orb-2 {
        width: 440px; height: 440px;
        background: radial-gradient(circle at 50% 60%, #F5E4F8 0%, #DCA8D8 60%, transparent 100%);
        bottom: -80px; left: -110px; opacity: 0.48;
        animation: orb2 25s ease-in-out infinite;
      }
      .orb-3 {
        width: 320px; height: 320px;
        background: radial-gradient(circle at 50% 50%, #BFA0F0 0%, #8860D8 70%, transparent 100%);
        top: 38%; left: 22%; opacity: 0.22;
        animation: orb3 30s ease-in-out infinite;
      }
      .orb-4 {
        width: 260px; height: 260px;
        background: radial-gradient(circle at 50% 50%, #FFD8B8 0%, #F4A870 70%, transparent 100%);
        top: 12%; left: 4%; opacity: 0.28;
        animation: orb4 22s ease-in-out infinite;
      }
      @keyframes orb1 {
        0%,100% { transform: translate(0,0) scale(1); }
        33%      { transform: translate(-44px,36px) scale(1.06); }
        66%      { transform: translate(22px,-18px) scale(0.96); }
      }
      @keyframes orb2 {
        0%,100% { transform: translate(0,0) scale(1); }
        40%      { transform: translate(52px,-44px) scale(1.09); }
        72%      { transform: translate(-18px,22px) scale(0.94); }
      }
      @keyframes orb3 {
        0%,100% { transform: translate(0,0) scale(1); }
        50%      { transform: translate(64px,-52px) scale(1.12); }
      }
      @keyframes orb4 {
        0%,100% { transform: translate(0,0) scale(1); }
        45%      { transform: translate(28px,38px) scale(1.07); }
      }
      .header { position: relative; z-index: 10; padding: 22px 20px; }
      .header-inner {
        display: flex; align-items: center; justify-content: space-between;
        max-width: 720px; margin: 0 auto;
      }
      .wordmark {
        display: inline-flex; align-items: center; line-height: 0;
      }
      .wordmark img { height: 36px; width: auto; display: block; }
      .header-link {
        display: inline-flex; align-items: center; gap: 5px;
        font-size: 0.875rem; font-weight: 500; color: #6E6478;
        text-decoration: none; letter-spacing: 0.02em;
        transition: color 200ms ease;
      }
      .header-link:hover { color: #6F3FD6; }
      .header-link .link-arrow { transition: transform 200ms ease; }
      .header-link:hover .link-arrow { transform: translateX(3px); }
      .main {
        position: relative; z-index: 10;
        padding: 36px 20px 72px;
        display: flex; justify-content: center;
      }
      .content {
        max-width: 620px; width: 100%;
        animation: fadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .badge {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 7px 15px; border-radius: 999px;
        border: 1px solid rgba(111,63,214,0.18);
        background: rgba(255,255,255,0.75);
        backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        font-size: 0.73rem; font-weight: 500; letter-spacing: 0.07em;
        color: #6E6478; text-transform: uppercase;
        margin-bottom: 32px; width: fit-content;
      }
      .badge-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: #6F3FD6; flex-shrink: 0;
        animation: dotPulse 2.4s ease-in-out infinite;
      }
      @keyframes dotPulse {
        0%,100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.45; transform: scale(0.75); }
      }
      .headline {
        font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
        font-weight: 500;
        font-size: clamp(2.8rem, 9vw, 5rem);
        line-height: 1.08; letter-spacing: -0.025em;
        color: #2E2438; margin: 0 0 22px;
      }
      .headline em { font-style: italic; color: #6F3FD6; font-weight: 400; }
      .subheadline {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: clamp(1.05rem, 2.8vw, 1.3rem);
        line-height: 1.7; color: #4B1F7A; margin: 0 0 20px;
        font-weight: 400; font-style: italic;
      }
      .br-md { display: none; }
      .body-text {
        font-size: 0.975rem; line-height: 1.85;
        color: #6E6478; margin: 0 0 40px;
        max-width: 500px; font-weight: 300;
      }
      .capture-block {
        background: rgba(255,255,255,0.68);
        backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
        border: 1px solid rgba(232,223,240,0.9); border-radius: 22px;
        padding: 26px 22px; margin-bottom: 36px;
        box-shadow: 0 4px 24px rgba(111,63,214,0.06);
      }
      .capture-label {
        font-size: 0.78rem; font-weight: 600; letter-spacing: 0.07em;
        color: #2E2438; text-transform: uppercase; margin: 0 0 14px;
      }
      .capture-form { display: flex; flex-direction: column; gap: 10px; }
      .capture-row { display: flex; flex-direction: column; gap: 9px; }
      .capture-input {
        flex: 1; min-width: 0;
        border: 1.5px solid #E8DFF0; border-radius: 12px;
        padding: 13px 17px;
        font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
        color: #2E2438; background: rgba(255,255,255,0.92);
        outline: none;
        transition: border-color 180ms ease, box-shadow 180ms ease;
        -webkit-appearance: none; width: 100%;
      }
      .capture-input::placeholder { color: #B8A8C8; }
      .capture-input:focus {
        border-color: #6F3FD6;
        box-shadow: 0 0 0 3px rgba(111,63,214,0.12);
      }
      .capture-btn {
        display: flex; align-items: center; justify-content: center;
        gap: 7px; border: none; border-radius: 12px;
        padding: 13px 22px;
        background: linear-gradient(135deg, #F89A3C 0%, #F06820 100%);
        color: #fff; font-family: 'DM Sans', sans-serif;
        font-weight: 600; font-size: 0.95rem; cursor: pointer;
        transition: opacity 200ms ease, transform 150ms ease, box-shadow 200ms ease;
        box-shadow: 0 4px 18px rgba(240,104,32,0.36);
        white-space: nowrap; -webkit-font-smoothing: antialiased;
      }
      .capture-btn:hover {
        opacity: 0.92; transform: translateY(-1px);
        box-shadow: 0 6px 22px rgba(240,104,32,0.44);
      }
      .capture-btn:active { transform: translateY(0); }
      .capture-btn:disabled { opacity: 0.68; cursor: wait; transform: none; }
      .btn-icon { flex-shrink: 0; }
      .capture-consent { font-size: 0.75rem; color: #B8A8C8; margin: 0; line-height: 1.5; }
      .notify-feedback {
        display: none; margin-top: 10px; padding: 11px 15px;
        border-radius: 10px; font-size: 0.875rem;
        font-weight: 500; line-height: 1.55;
      }
      .notify-feedback.is-visible { display: block; }
      .notify-feedback.is-success { background: rgba(111,63,214,0.07); color: #4B1F7A; }
      .notify-feedback.is-error { background: rgba(246,139,44,0.1); color: #7A3A00; }
      .sep {
        height: 1px;
        background: linear-gradient(90deg, transparent 0%, #E8DFF0 25%, #E8DFF0 75%, transparent 100%);
        margin-bottom: 32px;
      }
      .articles-row {
        display: flex; flex-direction: column;
        align-items: flex-start; gap: 14px; margin-bottom: 28px;
      }
      .articles-intro { font-size: 0.875rem; color: #6E6478; margin: 0; font-weight: 300; }
      .articles-cta {
        display: inline-flex; align-items: center; gap: 7px;
        padding: 12px 22px; border-radius: 11px;
        border: none;
        background: linear-gradient(135deg, #7A4FE8 0%, #6030C8 100%);
        color: #fff;
        font-family: 'DM Sans', sans-serif; font-weight: 600;
        font-size: 0.9rem; text-decoration: none;
        box-shadow: 0 4px 16px rgba(111,63,214,0.28);
        transition: opacity 200ms ease, transform 150ms ease, box-shadow 200ms ease;
        -webkit-font-smoothing: antialiased;
      }
      .articles-cta:hover {
        opacity: 0.9; transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(111,63,214,0.36);
      }
      .articles-cta .link-arrow { transition: transform 200ms ease; }
      .articles-cta:hover .link-arrow { transform: translateX(3px); }
      .contact-row { padding-bottom: 4px; }
      .contact-link {
        display: inline-flex; align-items: center; gap: 7px;
        padding: 12px 22px; border-radius: 11px;
        border: 1.5px solid rgba(232,223,240,0.9);
        background: rgba(255,255,255,0.6);
        color: #6E6478; font-family: 'DM Sans', sans-serif;
        font-weight: 500; font-size: 0.9rem; text-decoration: none;
        transition: border-color 200ms ease, color 200ms ease, background 200ms ease, transform 150ms ease;
        -webkit-font-smoothing: antialiased;
      }
      .contact-link:hover {
        border-color: rgba(111,63,214,0.35); color: #6F3FD6;
        background: rgba(255,255,255,0.85); transform: translateY(-1px);
      }
      .footer {
        position: relative; z-index: 10;
        padding: 28px 20px 40px;
        border-top: 1px solid rgba(232,223,240,0.7);
      }
      .footer-inner { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 6px; }
      .footer-brand {
        font-weight: 600; letter-spacing: 0.18em; color: #4B1F7A;
        font-size: 0.78rem; text-transform: uppercase; margin: 0;
        -webkit-font-smoothing: antialiased;
      }
      .footer-tagline { font-size: 0.75rem; color: #B8A8C8; margin: 0; font-weight: 300; }
      @media (min-width: 480px) {
        .capture-row { flex-direction: row; }
        .capture-btn { flex-shrink: 0; }
        .capture-input { width: auto; }
      }
      @media (min-width: 640px) {
        .header { padding: 30px 32px; }
        .main { padding: 52px 32px 88px; }
        .br-md { display: inline; }
        .articles-row { flex-direction: row; align-items: center; gap: 20px; }
      }
      @media (min-width: 1024px) {
        .header { padding: 36px 48px; }
        .main { padding: 72px 48px 100px; }
        .orb-1 { width: 680px; height: 680px; }
        .orb-2 { width: 580px; height: 580px; }
        .orb-3 { width: 420px; height: 420px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .orb, .badge-dot, .content { animation: none; }
      }
    </style>`, `</head> <body> <!-- Animated background orbs --> <div class="bg" aria-hidden="true"> <div class="orb orb-1"></div> <div class="orb orb-2"></div> <div class="orb orb-3"></div> <div class="orb orb-4"></div> </div> <!-- Minimal header --> <header class="header"> <div class="header-inner"> <div class="wordmark"><img src="/awene-logo.png" alt="AWENE"></div> <a href="/articles" class="header-link">
Articles
<svg class="link-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"> <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </a> </div> </header> <!-- Main content --> <main class="main"> <div class="content"> <!-- Status badge --> <div class="badge" aria-label="Statut : Nouveau site en préparation"> <span class="badge-dot" aria-hidden="true"></span>
Nouveau site en préparation
</div> <!-- Editorial heading --> <h1 class="headline">
Le site AWENE<br> <em>se transforme.</em> </h1> <!-- Subheadline --> <p class="subheadline">
Nous préparons un nouvel espace,<br class="br-md">
plus doux, plus clair, plus incarné.
</p> <!-- Body copy --> <p class="body-text">
AWENE construit actuellement une nouvelle expérience digitale autour de la neuro-wellness en périménopause et en ménopause. Un espace pensé avec plus de profondeur, de présence et d'intention.
</p> <!-- Email capture --> <div class="capture-block"> <p class="capture-label">Être informée du lancement</p> <form id="notify-form" class="capture-form" novalidate> <div class="capture-row"> <label class="sr-only" for="notify-email">Votre adresse email</label> <input id="notify-email" name="email" type="email" autocomplete="email" placeholder="votre@email.com" class="capture-input" required> <button type="submit" class="capture-btn"> <span class="btn-label">Me prévenir</span> <svg class="btn-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"> <path d="M3 8h10M9.5 4.5 13 8l-3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </button> </div> <p class="capture-consent">Aucune publicité. Uniquement les nouvelles d'AWENE.</p> </form> <div id="notify-feedback" class="notify-feedback" role="status" aria-live="polite"></div> </div> <!-- Separator --> <div class="sep" aria-hidden="true"></div> <!-- Articles access --> <div class="articles-row"> <p class="articles-intro">En attendant, nos articles sont disponibles</p> <a href="/articles" class="articles-cta"> <span>Voir les articles</span> <svg class="link-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"> <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </a> </div> <!-- Contact --> <div class="contact-row"> <a href="/contact" class="contact-link">Nous contacter</a> </div> </div> </main> <!-- Minimal footer --> <footer class="footer"> <div class="footer-inner"> <p class="footer-brand">AWENE</p> <p class="footer-tagline">Neuro-wellness en périménopause et ménopause</p> </div> </footer> <script>
      (function () {
        var form = document.querySelector('#notify-form');
        var feedback = document.querySelector('#notify-feedback');
        var emailInput = document.querySelector('#notify-email');

        function showFeedback(msg, type) {
          if (!feedback) return;
          feedback.textContent = msg;
          feedback.className = 'notify-feedback is-visible ' + (type === 'error' ? 'is-error' : 'is-success');
        }

        if (!form) return;

        form.addEventListener('submit', async function (e) {
          e.preventDefault();

          var email = emailInput ? emailInput.value.trim() : '';
          if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
            showFeedback('Merci de saisir une adresse email valide.', 'error');
            return;
          }

          var btn = form.querySelector('.capture-btn');
          var label = form.querySelector('.btn-label');
          var icon = form.querySelector('.btn-icon');
          if (btn) btn.disabled = true;
          if (label) label.textContent = 'En cours…';
          if (icon) icon.style.display = 'none';

          try {
            var res = await fetch('/api/notify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: email })
            });
            var data = await res.json();

            if (!res.ok) {
              showFeedback(data.error || 'Une erreur est survenue. Merci de réessayer.', 'error');
              if (btn) btn.disabled = false;
              if (label) label.textContent = 'Me prévenir';
              if (icon) icon.style.display = '';
            } else {
              form.style.display = 'none';
              showFeedback('Parfait ! Vous serez la première informée.', 'success');
            }
          } catch (_) {
            showFeedback('Une erreur réseau est survenue. Merci de réessayer.', 'error');
            if (btn) btn.disabled = false;
            if (label) label.textContent = 'Me prévenir';
            if (icon) icon.style.display = '';
          }
        });
      })();
    <\/script> </body> </html>`], [`<html lang="fr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>AWENE — Nouveau site en préparation</title><meta name="description" content="AWENE prépare un nouvel espace dédié à la neuro-wellness en périménopause et ménopause."><meta name="robots" content="noindex, nofollow"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="icon" type="image/png" href="/favicon.png"><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet"><style>
      *, *::before, *::after { box-sizing: border-box; }
      html { height: 100%; }
      body {
        margin: 0;
        min-height: 100%;
        font-family: 'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        color: #2E2438;
        background: #FCFAF8;
        overflow-x: hidden;
        position: relative;
      }
      .sr-only {
        position: absolute; width: 1px; height: 1px; padding: 0;
        margin: -1px; overflow: hidden; clip: rect(0,0,0,0);
        white-space: nowrap; border-width: 0;
      }
      .bg {
        position: fixed; inset: 0; overflow: hidden;
        z-index: 0; pointer-events: none;
      }
      .orb {
        position: absolute; border-radius: 50%;
        filter: blur(72px); will-change: transform;
      }
      .orb-1 {
        width: 520px; height: 520px;
        background: radial-gradient(circle at 40% 40%, #C8A8F2 0%, #A070E0 60%, transparent 100%);
        top: -140px; right: -100px; opacity: 0.52;
        animation: orb1 20s ease-in-out infinite;
      }
      .orb-2 {
        width: 440px; height: 440px;
        background: radial-gradient(circle at 50% 60%, #F5E4F8 0%, #DCA8D8 60%, transparent 100%);
        bottom: -80px; left: -110px; opacity: 0.48;
        animation: orb2 25s ease-in-out infinite;
      }
      .orb-3 {
        width: 320px; height: 320px;
        background: radial-gradient(circle at 50% 50%, #BFA0F0 0%, #8860D8 70%, transparent 100%);
        top: 38%; left: 22%; opacity: 0.22;
        animation: orb3 30s ease-in-out infinite;
      }
      .orb-4 {
        width: 260px; height: 260px;
        background: radial-gradient(circle at 50% 50%, #FFD8B8 0%, #F4A870 70%, transparent 100%);
        top: 12%; left: 4%; opacity: 0.28;
        animation: orb4 22s ease-in-out infinite;
      }
      @keyframes orb1 {
        0%,100% { transform: translate(0,0) scale(1); }
        33%      { transform: translate(-44px,36px) scale(1.06); }
        66%      { transform: translate(22px,-18px) scale(0.96); }
      }
      @keyframes orb2 {
        0%,100% { transform: translate(0,0) scale(1); }
        40%      { transform: translate(52px,-44px) scale(1.09); }
        72%      { transform: translate(-18px,22px) scale(0.94); }
      }
      @keyframes orb3 {
        0%,100% { transform: translate(0,0) scale(1); }
        50%      { transform: translate(64px,-52px) scale(1.12); }
      }
      @keyframes orb4 {
        0%,100% { transform: translate(0,0) scale(1); }
        45%      { transform: translate(28px,38px) scale(1.07); }
      }
      .header { position: relative; z-index: 10; padding: 22px 20px; }
      .header-inner {
        display: flex; align-items: center; justify-content: space-between;
        max-width: 720px; margin: 0 auto;
      }
      .wordmark {
        display: inline-flex; align-items: center; line-height: 0;
      }
      .wordmark img { height: 36px; width: auto; display: block; }
      .header-link {
        display: inline-flex; align-items: center; gap: 5px;
        font-size: 0.875rem; font-weight: 500; color: #6E6478;
        text-decoration: none; letter-spacing: 0.02em;
        transition: color 200ms ease;
      }
      .header-link:hover { color: #6F3FD6; }
      .header-link .link-arrow { transition: transform 200ms ease; }
      .header-link:hover .link-arrow { transform: translateX(3px); }
      .main {
        position: relative; z-index: 10;
        padding: 36px 20px 72px;
        display: flex; justify-content: center;
      }
      .content {
        max-width: 620px; width: 100%;
        animation: fadeUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .badge {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 7px 15px; border-radius: 999px;
        border: 1px solid rgba(111,63,214,0.18);
        background: rgba(255,255,255,0.75);
        backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        font-size: 0.73rem; font-weight: 500; letter-spacing: 0.07em;
        color: #6E6478; text-transform: uppercase;
        margin-bottom: 32px; width: fit-content;
      }
      .badge-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: #6F3FD6; flex-shrink: 0;
        animation: dotPulse 2.4s ease-in-out infinite;
      }
      @keyframes dotPulse {
        0%,100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.45; transform: scale(0.75); }
      }
      .headline {
        font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
        font-weight: 500;
        font-size: clamp(2.8rem, 9vw, 5rem);
        line-height: 1.08; letter-spacing: -0.025em;
        color: #2E2438; margin: 0 0 22px;
      }
      .headline em { font-style: italic; color: #6F3FD6; font-weight: 400; }
      .subheadline {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: clamp(1.05rem, 2.8vw, 1.3rem);
        line-height: 1.7; color: #4B1F7A; margin: 0 0 20px;
        font-weight: 400; font-style: italic;
      }
      .br-md { display: none; }
      .body-text {
        font-size: 0.975rem; line-height: 1.85;
        color: #6E6478; margin: 0 0 40px;
        max-width: 500px; font-weight: 300;
      }
      .capture-block {
        background: rgba(255,255,255,0.68);
        backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
        border: 1px solid rgba(232,223,240,0.9); border-radius: 22px;
        padding: 26px 22px; margin-bottom: 36px;
        box-shadow: 0 4px 24px rgba(111,63,214,0.06);
      }
      .capture-label {
        font-size: 0.78rem; font-weight: 600; letter-spacing: 0.07em;
        color: #2E2438; text-transform: uppercase; margin: 0 0 14px;
      }
      .capture-form { display: flex; flex-direction: column; gap: 10px; }
      .capture-row { display: flex; flex-direction: column; gap: 9px; }
      .capture-input {
        flex: 1; min-width: 0;
        border: 1.5px solid #E8DFF0; border-radius: 12px;
        padding: 13px 17px;
        font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
        color: #2E2438; background: rgba(255,255,255,0.92);
        outline: none;
        transition: border-color 180ms ease, box-shadow 180ms ease;
        -webkit-appearance: none; width: 100%;
      }
      .capture-input::placeholder { color: #B8A8C8; }
      .capture-input:focus {
        border-color: #6F3FD6;
        box-shadow: 0 0 0 3px rgba(111,63,214,0.12);
      }
      .capture-btn {
        display: flex; align-items: center; justify-content: center;
        gap: 7px; border: none; border-radius: 12px;
        padding: 13px 22px;
        background: linear-gradient(135deg, #F89A3C 0%, #F06820 100%);
        color: #fff; font-family: 'DM Sans', sans-serif;
        font-weight: 600; font-size: 0.95rem; cursor: pointer;
        transition: opacity 200ms ease, transform 150ms ease, box-shadow 200ms ease;
        box-shadow: 0 4px 18px rgba(240,104,32,0.36);
        white-space: nowrap; -webkit-font-smoothing: antialiased;
      }
      .capture-btn:hover {
        opacity: 0.92; transform: translateY(-1px);
        box-shadow: 0 6px 22px rgba(240,104,32,0.44);
      }
      .capture-btn:active { transform: translateY(0); }
      .capture-btn:disabled { opacity: 0.68; cursor: wait; transform: none; }
      .btn-icon { flex-shrink: 0; }
      .capture-consent { font-size: 0.75rem; color: #B8A8C8; margin: 0; line-height: 1.5; }
      .notify-feedback {
        display: none; margin-top: 10px; padding: 11px 15px;
        border-radius: 10px; font-size: 0.875rem;
        font-weight: 500; line-height: 1.55;
      }
      .notify-feedback.is-visible { display: block; }
      .notify-feedback.is-success { background: rgba(111,63,214,0.07); color: #4B1F7A; }
      .notify-feedback.is-error { background: rgba(246,139,44,0.1); color: #7A3A00; }
      .sep {
        height: 1px;
        background: linear-gradient(90deg, transparent 0%, #E8DFF0 25%, #E8DFF0 75%, transparent 100%);
        margin-bottom: 32px;
      }
      .articles-row {
        display: flex; flex-direction: column;
        align-items: flex-start; gap: 14px; margin-bottom: 28px;
      }
      .articles-intro { font-size: 0.875rem; color: #6E6478; margin: 0; font-weight: 300; }
      .articles-cta {
        display: inline-flex; align-items: center; gap: 7px;
        padding: 12px 22px; border-radius: 11px;
        border: none;
        background: linear-gradient(135deg, #7A4FE8 0%, #6030C8 100%);
        color: #fff;
        font-family: 'DM Sans', sans-serif; font-weight: 600;
        font-size: 0.9rem; text-decoration: none;
        box-shadow: 0 4px 16px rgba(111,63,214,0.28);
        transition: opacity 200ms ease, transform 150ms ease, box-shadow 200ms ease;
        -webkit-font-smoothing: antialiased;
      }
      .articles-cta:hover {
        opacity: 0.9; transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(111,63,214,0.36);
      }
      .articles-cta .link-arrow { transition: transform 200ms ease; }
      .articles-cta:hover .link-arrow { transform: translateX(3px); }
      .contact-row { padding-bottom: 4px; }
      .contact-link {
        display: inline-flex; align-items: center; gap: 7px;
        padding: 12px 22px; border-radius: 11px;
        border: 1.5px solid rgba(232,223,240,0.9);
        background: rgba(255,255,255,0.6);
        color: #6E6478; font-family: 'DM Sans', sans-serif;
        font-weight: 500; font-size: 0.9rem; text-decoration: none;
        transition: border-color 200ms ease, color 200ms ease, background 200ms ease, transform 150ms ease;
        -webkit-font-smoothing: antialiased;
      }
      .contact-link:hover {
        border-color: rgba(111,63,214,0.35); color: #6F3FD6;
        background: rgba(255,255,255,0.85); transform: translateY(-1px);
      }
      .footer {
        position: relative; z-index: 10;
        padding: 28px 20px 40px;
        border-top: 1px solid rgba(232,223,240,0.7);
      }
      .footer-inner { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 6px; }
      .footer-brand {
        font-weight: 600; letter-spacing: 0.18em; color: #4B1F7A;
        font-size: 0.78rem; text-transform: uppercase; margin: 0;
        -webkit-font-smoothing: antialiased;
      }
      .footer-tagline { font-size: 0.75rem; color: #B8A8C8; margin: 0; font-weight: 300; }
      @media (min-width: 480px) {
        .capture-row { flex-direction: row; }
        .capture-btn { flex-shrink: 0; }
        .capture-input { width: auto; }
      }
      @media (min-width: 640px) {
        .header { padding: 30px 32px; }
        .main { padding: 52px 32px 88px; }
        .br-md { display: inline; }
        .articles-row { flex-direction: row; align-items: center; gap: 20px; }
      }
      @media (min-width: 1024px) {
        .header { padding: 36px 48px; }
        .main { padding: 72px 48px 100px; }
        .orb-1 { width: 680px; height: 680px; }
        .orb-2 { width: 580px; height: 580px; }
        .orb-3 { width: 420px; height: 420px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .orb, .badge-dot, .content { animation: none; }
      }
    </style>`, `</head> <body> <!-- Animated background orbs --> <div class="bg" aria-hidden="true"> <div class="orb orb-1"></div> <div class="orb orb-2"></div> <div class="orb orb-3"></div> <div class="orb orb-4"></div> </div> <!-- Minimal header --> <header class="header"> <div class="header-inner"> <div class="wordmark"><img src="/awene-logo.png" alt="AWENE"></div> <a href="/articles" class="header-link">
Articles
<svg class="link-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"> <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </a> </div> </header> <!-- Main content --> <main class="main"> <div class="content"> <!-- Status badge --> <div class="badge" aria-label="Statut : Nouveau site en préparation"> <span class="badge-dot" aria-hidden="true"></span>
Nouveau site en préparation
</div> <!-- Editorial heading --> <h1 class="headline">
Le site AWENE<br> <em>se transforme.</em> </h1> <!-- Subheadline --> <p class="subheadline">
Nous préparons un nouvel espace,<br class="br-md">
plus doux, plus clair, plus incarné.
</p> <!-- Body copy --> <p class="body-text">
AWENE construit actuellement une nouvelle expérience digitale autour de la neuro-wellness en périménopause et en ménopause. Un espace pensé avec plus de profondeur, de présence et d'intention.
</p> <!-- Email capture --> <div class="capture-block"> <p class="capture-label">Être informée du lancement</p> <form id="notify-form" class="capture-form" novalidate> <div class="capture-row"> <label class="sr-only" for="notify-email">Votre adresse email</label> <input id="notify-email" name="email" type="email" autocomplete="email" placeholder="votre@email.com" class="capture-input" required> <button type="submit" class="capture-btn"> <span class="btn-label">Me prévenir</span> <svg class="btn-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"> <path d="M3 8h10M9.5 4.5 13 8l-3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </button> </div> <p class="capture-consent">Aucune publicité. Uniquement les nouvelles d'AWENE.</p> </form> <div id="notify-feedback" class="notify-feedback" role="status" aria-live="polite"></div> </div> <!-- Separator --> <div class="sep" aria-hidden="true"></div> <!-- Articles access --> <div class="articles-row"> <p class="articles-intro">En attendant, nos articles sont disponibles</p> <a href="/articles" class="articles-cta"> <span>Voir les articles</span> <svg class="link-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"> <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </a> </div> <!-- Contact --> <div class="contact-row"> <a href="/contact" class="contact-link">Nous contacter</a> </div> </div> </main> <!-- Minimal footer --> <footer class="footer"> <div class="footer-inner"> <p class="footer-brand">AWENE</p> <p class="footer-tagline">Neuro-wellness en périménopause et ménopause</p> </div> </footer> <script>
      (function () {
        var form = document.querySelector('#notify-form');
        var feedback = document.querySelector('#notify-feedback');
        var emailInput = document.querySelector('#notify-email');

        function showFeedback(msg, type) {
          if (!feedback) return;
          feedback.textContent = msg;
          feedback.className = 'notify-feedback is-visible ' + (type === 'error' ? 'is-error' : 'is-success');
        }

        if (!form) return;

        form.addEventListener('submit', async function (e) {
          e.preventDefault();

          var email = emailInput ? emailInput.value.trim() : '';
          if (!email || !/^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/.test(email)) {
            showFeedback('Merci de saisir une adresse email valide.', 'error');
            return;
          }

          var btn = form.querySelector('.capture-btn');
          var label = form.querySelector('.btn-label');
          var icon = form.querySelector('.btn-icon');
          if (btn) btn.disabled = true;
          if (label) label.textContent = 'En cours…';
          if (icon) icon.style.display = 'none';

          try {
            var res = await fetch('/api/notify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: email })
            });
            var data = await res.json();

            if (!res.ok) {
              showFeedback(data.error || 'Une erreur est survenue. Merci de réessayer.', 'error');
              if (btn) btn.disabled = false;
              if (label) label.textContent = 'Me prévenir';
              if (icon) icon.style.display = '';
            } else {
              form.style.display = 'none';
              showFeedback('Parfait ! Vous serez la première informée.', 'success');
            }
          } catch (_) {
            showFeedback('Une erreur réseau est survenue. Merci de réessayer.', 'error');
            if (btn) btn.disabled = false;
            if (label) label.textContent = 'Me prévenir';
            if (icon) icon.style.display = '';
          }
        });
      })();
    <\/script> </body> </html>`])), renderHead());
}, "/Users/oussema/Downloads/Awene-survey-main/src/pages/index.astro", void 0);

const $$file = "/Users/oussema/Downloads/Awene-survey-main/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
