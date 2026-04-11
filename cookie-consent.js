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
var GA_ID = '';  // e.g. 'G-XXXXXXXXXX'
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
    '#fs-cookie-overlay{position:fixed;inset:0;z-index:999998;background:rgba(0,0,0,0.45);opacity:0;transition:opacity .3s;pointer-events:none}',
    '#fs-cookie-overlay.fs-show{opacity:1;pointer-events:auto}',
    '#fs-cookie-banner{position:fixed;bottom:0;left:0;right:0;z-index:999999;font-family:"Inter",system-ui,sans-serif;transform:translateY(100%);transition:transform .35s ease;pointer-events:none}',
    '#fs-cookie-banner.fs-show{transform:translateY(0);pointer-events:auto}',
    '#fs-cookie-inner{max-width:720px;margin:0 auto 24px;padding:28px 32px;background:#0d1525;border:1px solid rgba(60,100,160,0.25);border-radius:14px;box-shadow:0 -4px 40px rgba(0,0,0,0.5);color:#c8d8e8;font-size:0.88rem;line-height:1.65}',
    '#fs-cookie-inner h3{font-size:1.05rem;font-weight:700;color:#e8f0fa;margin:0 0 8px;letter-spacing:-0.01em}',
    '#fs-cookie-inner p{margin:0 0 18px;color:#8aa0b8}',
    '#fs-cookie-inner a{color:#00e5ff;text-decoration:underline;text-underline-offset:2px}',
    '.fs-cookie-cats{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:20px}',
    '.fs-cookie-cat{display:flex;align-items:center;gap:8px;font-size:0.82rem;color:#a0b8cc}',
    '.fs-cookie-cat input[type=checkbox]{appearance:none;-webkit-appearance:none;width:18px;height:18px;border:1.5px solid rgba(0,229,255,0.35);border-radius:4px;background:transparent;cursor:pointer;position:relative;flex-shrink:0;transition:all .15s}',
    '.fs-cookie-cat input[type=checkbox]:checked{background:rgba(0,229,255,0.15);border-color:#00e5ff}',
    '.fs-cookie-cat input[type=checkbox]:checked::after{content:"\\2713";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:12px;color:#00e5ff;font-weight:700}',
    '.fs-cookie-cat input[disabled]{opacity:0.5;cursor:default}',
    '.fs-cookie-btns{display:flex;gap:10px;flex-wrap:wrap}',
    '.fs-cookie-btn{padding:10px 22px;border:none;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;transition:all .15s;letter-spacing:0.01em}',
    '.fs-cookie-btn:hover{transform:translateY(-1px)}',
    '.fs-btn-accept{background:linear-gradient(135deg,#00e5ff,#2979ff);color:#050a12}',
    '.fs-btn-accept:hover{box-shadow:0 4px 16px rgba(0,229,255,0.3)}',
    '.fs-btn-reject{background:transparent;border:1px solid rgba(60,100,160,0.3);color:#8aa0b8}',
    '.fs-btn-reject:hover{border-color:rgba(0,229,255,0.3);color:#c8d8e8}',
    '.fs-btn-save{background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);color:#00e5ff}',
    '.fs-btn-save:hover{background:rgba(0,229,255,0.18)}',
    '.fs-cookie-reopen{position:fixed;bottom:16px;left:16px;z-index:999997;width:40px;height:40px;border-radius:50%;background:#0d1525;border:1px solid rgba(60,100,160,0.25);color:#8aa0b8;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;opacity:0;pointer-events:none}',
    '.fs-cookie-reopen.fs-show{opacity:1;pointer-events:auto}',
    '.fs-cookie-reopen:hover{border-color:#00e5ff;color:#00e5ff;transform:scale(1.1)}',
    '@media(max-width:600px){#fs-cookie-inner{margin:0 12px 12px;padding:20px 18px}.fs-cookie-btns{flex-direction:column}.fs-cookie-btn{width:100%;text-align:center}}'
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
