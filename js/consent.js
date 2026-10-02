/*
 * Audience measurement with Microsoft Clarity, loaded when the page opens.
 *
 * The site shows no consent banner (publisher's decision, 2026-10-02); the privacy page says so
 * and explains how to block Clarity from the browser. A refusal recorded while the banner still
 * existed (localStorage key `consent-choice` = `denied`) is still honoured: Clarity is not loaded.
 * /embed/ does not load this file: the widget measures nothing on third-party sites.
 */
(function () {
  var CLARITY_ID = 'yrbnxjdnbm';
  var stored = null;
  try { stored = localStorage.getItem('consent-choice'); } catch (e) { /* storage blocked */ }
  if (stored === 'denied' || window.__clarityOn) return;

  window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
  window.__clarityOn = true;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.clarity.ms/tag/' + CLARITY_ID;
  document.head.appendChild(s);
})();
