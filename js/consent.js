/*
 * Audience measurement with Microsoft Clarity and Google Analytics 4, loaded when the page opens.
 *
 * The site shows no consent banner (publisher's decision, 2026-10-02); the privacy page says so
 * and explains how to block Clarity and Google Analytics from the browser. A refusal recorded while
 * the banner still existed (localStorage key `consent-choice` = `denied`) is still honoured: neither
 * tool is loaded.
 * /embed/ does not load this file: the widget measures nothing on third-party sites.
 */
(function () {
  var CLARITY_ID = 'yrbnxjdnbm';
  var GA4_ID = 'G-X3GWYCY8R0';
  var stored = null;
  try { stored = localStorage.getItem('consent-choice'); } catch (e) { /* storage blocked */ }
  if (stored === 'denied' || window.__clarityOn) return;

  window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
  window.__clarityOn = true;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.clarity.ms/tag/' + CLARITY_ID;
  document.head.appendChild(s);

  // Google Analytics 4, official gtag.js snippet, standard page views only.
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA4_ID);
  var g = document.createElement('script');
  g.async = true;
  g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
  document.head.appendChild(g);
})();
