/* ============================================================
   Google Consent Mode v2 + first-party consent banner
   ------------------------------------------------------------
   MUST load synchronously in <head> BEFORE gtag.js and before the
   AdSense loader, so the default consent state is registered before
   any Google tag can read or write storage.

   Region handling:
     EEA / UK / Switzerland -> everything denied until the visitor
       chooses. This is opt-in, as GDPR requires.
     Everywhere else        -> granted by default with a visible way
       to opt out, which is the opt-out model CCPA/CPRA expects.

   If you later switch to Google's certified CMP (AdSense ->
   Privacy & messaging), set USE_FIRST_PARTY_BANNER to false. The
   consent-mode defaults below stay; only our banner stops rendering,
   so visitors never get prompted twice.
   ============================================================ */
(function () {
  'use strict';

  var USE_FIRST_PARTY_BANNER = true;
  var STORAGE_KEY = 'bc_consent_v1';

  /* Countries where consent must be collected before storage is used. */
  var CONSENT_REQUIRED_REGIONS = [
    'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE',
    'IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE',
    'GB','CH'
  ];

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  /* ---- 1. Defaults, before any tag loads -------------------- */
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    region: CONSENT_REQUIRED_REGIONS,
    wait_for_update: 500
  });

  gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });

  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);

  /* ---- 2. Replay a stored decision -------------------------- */
  function readStored() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;   // private mode / storage disabled
    }
  }

  function store(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* nothing we can do; consent simply won't persist */ }
  }

  /* Consent Mode stops FUTURE writes but never removes cookies that are
     already on the device. Without this, someone who declines keeps their
     _ga identifier for up to two years, which is not what "decline" means. */
  function clearTrackingCookies() {
    var kill = /^(_ga|_gid|_gat|__gads|__gpi|__eoi|_gcl_)/;
    var host = window.location.hostname;
    var domains = ['', host, '.' + host];
    var parts = host.split('.');
    if (parts.length > 2) {
      domains.push('.' + parts.slice(-2).join('.'));   // .example.com
    }

    document.cookie.split(';').forEach(function (raw) {
      var name = raw.split('=')[0].trim();
      if (!name || !kill.test(name)) return;
      domains.forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  function apply(granted) {
    var v = granted ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: v,
      ad_user_data: v,
      ad_personalization: v,
      analytics_storage: v
    });
    if (!granted) clearTrackingCookies();
  }

  var stored = readStored();
  if (stored && typeof stored.granted === 'boolean') {
    apply(stored.granted);
  }

  /* ---- 3. Banner -------------------------------------------- */
  function decide(granted) {
    apply(granted);
    store({ granted: granted, ts: new Date().toISOString(), v: 1 });
    var el = document.getElementById('bc-consent');
    if (el) { el.hidden = true; el.setAttribute('aria-hidden', 'true'); }
  }

  function build() {
    if (document.getElementById('bc-consent')) return;

    var bar = document.createElement('div');
    bar.id = 'bc-consent';
    bar.className = 'bc-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-live', 'polite');
    bar.setAttribute('aria-label', 'Cookie choices');
    bar.innerHTML =
      '<div class="bc-consent-inner">' +
        '<p class="bc-consent-text">' +
          'This site uses cookies for Google Analytics and for the ads that pay for it. ' +
          'Decline and you still get every calculator, in full. ' +
          '<a href="/privacy-policy/">How we handle data</a>.' +
        '</p>' +
        '<div class="bc-consent-actions">' +
          '<button type="button" class="bc-btn bc-btn-ghost" data-bc="decline">Decline</button>' +
          '<button type="button" class="bc-btn bc-btn-accept" data-bc="accept">Accept</button>' +
        '</div>' +
      '</div>';

    bar.addEventListener('click', function (e) {
      var t = e.target.closest('[data-bc]');
      if (!t) return;
      decide(t.getAttribute('data-bc') === 'accept');
    });

    document.body.appendChild(bar);
    var first = bar.querySelector('button');
    if (first) { try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); } }
  }

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  if (USE_FIRST_PARTY_BANNER && !stored) {
    ready(build);
  }

  /* Re-open from the footer link on any page. */
  window.bcOpenConsent = function () {
    var el = document.getElementById('bc-consent');
    if (el) {
      el.hidden = false;
      el.removeAttribute('aria-hidden');
    } else {
      ready(build);
    }
  };

  ready(function () {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('[data-consent-open]');
      if (!link) return;
      e.preventDefault();
      window.bcOpenConsent();
    });
  });
})();
