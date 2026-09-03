/**
 * Cookie Consent — FutureShow
 * Drop-in bilingual (EN/PL) cookie banner with category management.
 *
 * SETUP:
 *   1. Set your GA4 Measurement ID below (GA_ID)
 *   2. Add to each HTML page before </body>:
 *      <script src="cookie-consent.js"></script>          (from root)
 *      <script src="../cookie-consent.js"></script>       (from /projects/)
 *
 * API:
 *   CookieConsent.hasConsent('analytics')  → true/false
 *   CookieConsent.hasConsent('marketing')  → true/false
 *   CookieConsent.revoke()                 → re-shows banner
 *   CookieConsent.onAccept(category, fn)   → callback when category accepted
 */

// ═══════════════════════════════════════════
// CONFIG — set your Google Analytics 4 ID here
// ═══════════════════════════════════════════
var GA_ID = 'G-RNDL66P478';
// ═══════════════════════════════════════════
(function(){
  'use strict';

  var STORAGE_KEY = 'fs_cookie_consent';
  var CONSENT_VERSION = 1;

  // ---- State ----
  var state = load();

  function load(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if(raw){ var d=JSON.parse(raw); if(d.v===CONSENT_VERSION) return d; }
    } catch(e){}
    return null;
  }
  function save(s){ localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

  // ---- Language helpers ----
  function lang(){ return (document.documentElement.lang||'en').substring(0,2); }
  function t(en,pl){ return lang()==='pl'?pl:en; }

  // ---- Callbacks registry ----
  var callbacks = {};
  function fireCallbacks(cat){
    (callbacks[cat]||[]).forEach(function(fn){ try{fn();}catch(e){} });
  }

  // ---- Inject CSS ----
  var style = document.createElement('style');
  style.textContent = [
    '#fs-cookie-overlay{display:none}',
    '#fs-cookie-banner{position:fixed;bottom:0;left:0;right:0;z-index:999999;font-family:"JetBrains Mono","Inter",system-ui,monospace;transform:translateY(100%);transition:transform .35s ease;pointer-events:none}',
    '#fs-cookie-banner.fs-show{transform:translateY(0);pointer-events:auto}',
    '#fs-cookie-inner{margin:0;padding:10px 36px;background:#0a0a0a;border-top:1px solid #ff2d00;color:#fafaf7;font-size:0.7rem;letter-spacing:0.04em;line-height:1.5;display:flex;align-items:center;gap:18px;flex-wrap:wrap}',
    '#fs-cookie-inner h3{display:none}',
    '#fs-cookie-inner p{margin:0;flex:1;min-width:240px;color:rgba(250,250,247,0.75)}',
    '.fs-cookie-cats{display:flex;gap:14px;margin:0}',
    '.fs-cookie-cat{display:flex;align-items:center;gap:6px;font-size:0.66rem;text-transform:uppercase;letter-spacing:0.12em;color:rgba(250,250,247,0.75);cursor:pointer}',
    '.fs-cookie-cat input[type=checkbox]{appearance:none;-webkit-appearance:none;width:14px;height:14px;border:1px solid rgba(250,250,247,0.5);background:transparent;cursor:pointer;position:relative;flex-shrink:0}',
    '.fs-cookie-cat input[type=checkbox]:checked{background:#ff2d00;border-color:#ff2d00}',
    '.fs-cookie-cat input[type=checkbox]:disabled{opacity:.5;cursor:default}',
    '.fs-cookie-btns{display:flex;gap:8px;margin:0}',
    '.fs-cookie-btn{font-family:inherit;font-size:0.64rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;padding:8px 14px;border:1px solid rgba(250,250,247,0.5);background:transparent;color:#fafaf7;cursor:pointer;transition:all .15s}',
    '.fs-cookie-btn:hover{background:#fafaf7;color:#0a0a0a}',
    '.fs-cookie-btn--accept{background:#ff2d00;border-color:#ff2d00}',
    '.fs-cookie-btn--accept:hover{background:#f0ff00;border-color:#f0ff00;color:#0a0a0a}',
    '.fs-cookie-reopen{position:fixed;bottom:14px;left:14px;z-index:999997;width:34px;height:34px;border-radius:0;background:#0a0a0a;border:1px solid rgba(250,250,247,0.35);color:#fafaf7;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;opacity:0;pointer-events:none}',
    '.fs-cookie-reopen.fs-show{opacity:.7;pointer-events:auto}',
    '.fs-cookie-reopen:hover{border-color:#ff2d00;color:#ff2d00;opacity:1}',
    '@media(max-width:700px){#fs-cookie-inner{padding:10px 16px;gap:10px}.fs-cookie-cats{width:100%}.fs-cookie-btns{width:100%}.fs-cookie-btn{flex:1;text-align:center}}'
  ].join('\n');
  document.head.appendChild(style);

  // ---- Build DOM ----
  var overlay = document.createElement('div');
  overlay.id = 'fs-cookie-overlay';
  document.body.appendChild(overlay);

  var banner = document.createElement('div');
  banner.id = 'fs-cookie-banner';
  document.body.appendChild(banner);

  var reopenBtn = document.createElement('button');
  reopenBtn.className = 'fs-cookie-reopen';
  reopenBtn.innerHTML = '&#127850;';
  reopenBtn.title = 'Cookie settings';
  document.body.appendChild(reopenBtn);

  function render(){
    var inner = document.createElement('div');
    inner.id = 'fs-cookie-inner';
    inner.innerHTML = '<h3>' + t('Cookie settings','Ustawienia cookies') + '</h3>'
      + '<p>' + t(
        'We use cookies to analyze site traffic and optimize your experience. You can choose which categories to allow.',
        'Używamy cookies do analizy ruchu na stronie i optymalizacji doświadczenia. Możesz wybrać, które kategorie dopuścić.'
      ) + '</p>'
      + '<div class="fs-cookie-cats">'
      + '<label class="fs-cookie-cat"><input type="checkbox" checked disabled data-cat="necessary"> ' + t('Necessary','Niezbędne') + '</label>'
      + '<label class="fs-cookie-cat"><input type="checkbox" data-cat="analytics" id="fs-cb-analytics"> ' + t('Analytics','Analityka') + '</label>'
      + '<label class="fs-cookie-cat"><input type="checkbox" data-cat="marketing" id="fs-cb-marketing"> ' + t('Marketing','Marketing') + '</label>'
      + '</div>'
      + '<div class="fs-cookie-btns">'
      + '<button class="fs-cookie-btn fs-btn-accept" id="fs-btn-all">' + t('Accept all','Akceptuj wszystkie') + '</button>'
      + '<button class="fs-cookie-btn fs-btn-save" id="fs-btn-save">' + t('Save preferences','Zapisz wybrane') + '</button>'
      + '<button class="fs-cookie-btn fs-btn-reject" id="fs-btn-reject">' + t('Reject optional','Odrzuć opcjonalne') + '</button>'
      + '</div>';
    banner.innerHTML = '';
    banner.appendChild(inner);

    document.getElementById('fs-btn-all').addEventListener('click', function(){
      accept({analytics:true, marketing:true});
    });
    document.getElementById('fs-btn-save').addEventListener('click', function(){
      accept({
        analytics: document.getElementById('fs-cb-analytics').checked,
        marketing: document.getElementById('fs-cb-marketing').checked
      });
    });
    document.getElementById('fs-btn-reject').addEventListener('click', function(){
      accept({analytics:false, marketing:false});
    });
  }

  function accept(cats){
    state = { v:CONSENT_VERSION, ts:Date.now(), necessary:true, analytics:!!cats.analytics, marketing:!!cats.marketing };
    save(state);
    hide();
    if(state.analytics) fireCallbacks('analytics');
    if(state.marketing) fireCallbacks('marketing');
  }

  function show(){
    render();
    requestAnimationFrame(function(){
      banner.classList.add('fs-show');
      overlay.classList.add('fs-show');
      reopenBtn.classList.remove('fs-show');
    });
  }

  function hide(){
    banner.classList.remove('fs-show');
    overlay.classList.remove('fs-show');
    setTimeout(function(){ reopenBtn.classList.add('fs-show'); }, 400);
  }

  reopenBtn.addEventListener('click', function(){ show(); });
  overlay.addEventListener('click', function(){ /* do nothing — force choice */ });

  // ---- Public API ----
  window.CookieConsent = {
    hasConsent: function(cat){ return state ? !!state[cat] : false; },
    revoke: function(){ localStorage.removeItem(STORAGE_KEY); state=null; show(); },
    onAccept: function(cat, fn){
      if(!callbacks[cat]) callbacks[cat]=[];
      callbacks[cat].push(fn);
      if(state && state[cat]) fn();
    }
  };

  // ---- GA4 loader (fires only after analytics consent) ----
  function loadGA4(){
    if(!GA_ID || document.getElementById('fs-gtag')) return;
    var s = document.createElement('script');
    s.id = 'fs-gtag';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }
  callbacks['analytics'] = callbacks['analytics'] || [];
  callbacks['analytics'].push(loadGA4);

  // ---- Init ----
  if(!state){
    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded', function(){ setTimeout(show, 600); });
    } else {
      setTimeout(show, 600);
    }
  } else {
    reopenBtn.classList.add('fs-show');
    if(state.analytics) fireCallbacks('analytics');
    if(state.marketing) fireCallbacks('marketing');
  }

  // ---- React to language toggle ----
  var obs = new MutationObserver(function(muts){
    muts.forEach(function(m){
      if(m.attributeName==='lang' && banner.classList.contains('fs-show')) render();
    });
  });
  obs.observe(document.documentElement, {attributes:true});

})();
