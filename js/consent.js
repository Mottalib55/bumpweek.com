/*
 * Audience measurement with Microsoft Clarity, loaded only with the visitor's consent.
 *
 * Nothing is requested from clarity.ms until "Accept" is chosen. The choice is kept in
 * localStorage (key `consent-choice`), never in a cookie, and the "Cookie settings" link
 * added to the footer reopens the banner. A refusal after acceptance removes Clarity's
 * cookies. /embed/ does not load this file: the widget measures nothing on third-party sites.
 */
(function () {
  var CLARITY_ID = 'yrbnxjdnbm';
  var KEY = 'consent-choice';
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) { /* storage blocked: ask again */ }

  window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
  var load = function () {
    if (window.__clarityOn) return;
    window.__clarityOn = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.clarity.ms/tag/' + CLARITY_ID;
    document.head.appendChild(s);
  };
  var grant = function () {
    window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
    load();
  };
  if (stored === 'granted') grant();

  var build = function () {
    var banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.hidden = true;
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-labelledby', 'consent-title');
    banner.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:1000;background:#fff;color:#111827;border-top:1px solid #d1d5db;box-shadow:0 -4px 16px rgba(0,0,0,.08);';
    banner.innerHTML =
      '<div style="max-width:56rem;margin:0 auto;padding:16px;">' +
      '<h2 id="consent-title" style="margin:0 0 6px;font-size:14px;font-weight:600;color:#111827;">Cookies and audience measurement</h2>' +
      '<p style="margin:0 0 12px;font-size:14px;line-height:1.55;color:#374151;">The calculators run entirely in your browser and need no cookies. We would only like to measure how the site is used, to see which pages are useful. Nothing is set without your consent. <a href="/privacy/" style="color:#111827;text-decoration:underline;">Learn more</a>.</p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:8px;">' +
      '<button type="button" data-consent="granted" style="min-height:44px;padding:8px 16px;border-radius:8px;border:1px solid #111827;background:#111827;color:#fff;font-size:14px;font-weight:600;cursor:pointer;">Accept</button>' +
      '<button type="button" data-consent="denied" style="min-height:44px;padding:8px 16px;border-radius:8px;border:1px solid #6b7280;background:#fff;color:#111827;font-size:14px;font-weight:600;cursor:pointer;">Continue without accepting</button>' +
      '</div></div>';
    document.body.appendChild(banner);

    var manage = document.createElement('p');
    manage.style.cssText = 'margin:0;padding:12px 16px 20px;text-align:center;font-size:13px;';
    manage.innerHTML = '<button type="button" data-consent-manage style="background:none;border:0;padding:0;font:inherit;color:inherit;opacity:.75;text-decoration:underline;cursor:pointer;">Cookie settings</button>';
    document.body.insertBefore(manage, banner);

    if (stored === null) banner.hidden = false;
    banner.querySelectorAll('[data-consent]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.getAttribute('data-consent');
        try { localStorage.setItem(KEY, value); } catch (e) { /* choice holds for this page */ }
        if (value === 'granted') grant();
        else if (window.__clarityOn) window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
        banner.hidden = true;
      });
    });
    manage.querySelector('[data-consent-manage]').addEventListener('click', function () { banner.hidden = false; });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
