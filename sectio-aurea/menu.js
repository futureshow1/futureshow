/* SECTIO AUREA — wspólne menu komnat. Drop-in: <script src="menu.js"></script> (auto-montuje się).
   Klasyczna nawigacja obok dwunastościanu: przycisk „☰ Komnaty" → panel z listą. */
(function(){
"use strict";
const KOMNATY=[
  {r:'I',t:'Liczba',sub:'Tetraktys · audio',href:'liczba.html',room:'liczba',vk:'rygor'},
  {r:'II',t:'Proporcja',sub:'Odkryj φ',href:'proporcja.html',room:'proporcja',vk:'rygor'},
  {r:'III',t:'Pentada',sub:'Pentagram · quasikryształ',href:'pentada.html',room:'pentada',vk:'rygor'},
  {r:'IV',t:'Bryły',sub:'Bryły platońskie 3D',href:'bryly.html',room:'bryly',vk:'rygor'},
  {r:'V',t:'Ciało',sub:'Witruwiusz · Modulor',href:'cialo.html',room:'cialo',vk:'rom'},
  {r:'VI',t:'Świątynia',sub:'Partenon · Hambidge',href:'swiatynia.html',room:'swiatynia',vk:'mix'},
  {r:'VII',t:'Eurytmia',sub:'Botticelli · Dürer',href:'eurytmia.html',room:'eurytmia',vk:'rom'},
  {r:'VIII',t:'Słowo',sub:'Rytmy mowy',href:'slowo.html',room:'slowo',vk:'mix'},
  {r:'IX',t:'Ogród',sub:'Złoty kąt 137,5°',href:'atlas.html#garden',room:'ogrod',vk:'rygor'},
  {r:'X',t:'Loża',sub:'Przekaz wiedzy 3D',href:'loza.html',room:'loza',vk:'mix'},
  {r:'XI',t:'Nauka',sub:'Schrödinger · Bergson',href:'nauka.html',room:'nauka',vk:'mix'},
  {r:'XII',t:'Probierz',sub:'Kamień probierczy · gra',href:'probierz.html',room:'probierz',vk:'meta'},
];
const NAV=[
  {t:'Dwunastościan',sub:'nawigator 3D',href:'index.html',ic:'✦'},
  {t:'Atlas',sub:'lista i lektura',href:'atlas.html#atlas',ic:'☰'},
  {t:'Filary',sub:'ośmiu myślicieli',href:'filary.html',ic:'⌗'},
  {t:'Skarbiec',sub:'złoto · rangi · odznaki',treasury:true,ic:'◆'},
];
const VC={rygor:'#e3b23c',mix:'#e0913a',rom:'#d2553f',meta:'#c9b6e0',ezo:'#5fb8a3'};

function injectCSS(){
  if(document.getElementById('sm-style'))return;
  const css=`
  #smFab{position:fixed;bottom:24px;right:24px;z-index:80;display:inline-flex;align-items:center;gap:9px;
    font-family:"Inter",system-ui,sans-serif;font-size:12px;font-weight:600;letter-spacing:.06em;color:#1a1305;
    background:#e3b23c;border:none;border-radius:999px;padding:11px 18px;cursor:pointer;box-shadow:0 14px 36px -14px rgba(227,178,60,.8);transition:.2s}
  #smFab:hover{background:#f2d27a;transform:translateY(-1px)}
  #smFab .b{font-size:15px;line-height:1}
  #smOv{position:fixed;inset:0;z-index:130;display:none}
  #smOv.on{display:block}
  #smOv .sm-scrim{position:absolute;inset:0;background:rgba(4,3,8,.74);backdrop-filter:blur(7px);animation:smF .3s}
  @keyframes smF{from{opacity:0}}
  #smOv .sm-draw{position:absolute;top:0;right:0;bottom:0;width:380px;max-width:92vw;overflow-y:auto;
    background:linear-gradient(180deg,#15131f,#0a0911);border-left:1px solid rgba(227,178,60,.25);
    box-shadow:-30px 0 80px -40px #000;padding:24px 22px 30px;transform:translateX(100%);animation:smIn .42s cubic-bezier(.4,.01,.2,1) forwards}
  @keyframes smIn{to{transform:none}}
  #smOv .sm-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
  #smOv .sm-hd .br{display:flex;align-items:baseline;gap:8px}
  #smOv .sm-hd .phi{font-family:"Fraunces",Georgia,serif;font-size:18px;color:#e3b23c}
  #smOv .sm-hd b{font-family:"Fraunces",serif;font-weight:500;font-size:13px;letter-spacing:.13em;color:#ece6d6}
  #smOv .sm-x{width:30px;height:30px;border-radius:50%;border:1px solid rgba(227,178,60,.25);background:transparent;color:#9a93a6;font-size:17px;cursor:pointer;transition:.2s}
  #smOv .sm-x:hover{color:#ece6d6;border-color:#e3b23c;transform:rotate(90deg)}
  #smOv .sm-h{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#6b6478;margin:18px 0 9px}
  #smOv .sm-nav{display:flex;flex-direction:column;gap:5px}
  #smOv .sm-row{display:flex;align-items:center;gap:12px;border:1px solid rgba(236,230,214,.07);border-radius:11px;
    padding:10px 13px;text-decoration:none;cursor:pointer;transition:.18s;background:rgba(0,0,0,.15)}
  #smOv .sm-row:hover{border-color:rgba(227,178,60,.4);background:rgba(227,178,60,.06)}
  #smOv .sm-row .ic{font-family:"Fraunces",serif;font-size:15px;color:#f2d27a;width:26px;text-align:center;flex:none}
  #smOv .sm-row .rom{font-family:"Fraunces",serif;font-size:13px;color:#f2d27a;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(227,178,60,.25);border-radius:50%;flex:none}
  #smOv .sm-row .tx{flex:1;min-width:0}
  #smOv .sm-row .tx b{font-family:"Fraunces",serif;font-weight:500;font-size:15px;color:#ece6d6;display:block;line-height:1.2}
  #smOv .sm-row .tx span{font-size:11px;color:#9a93a6}
  #smOv .sm-row .vd{width:8px;height:8px;border-radius:50%;flex:none}
  #smOv .sm-row .ck{font-size:11px;color:#5fb8a3;flex:none}
  #smOv .sm-row.plan{opacity:.42;cursor:default}
  #smOv .sm-row.plan:hover{border-color:rgba(236,230,214,.07);background:rgba(0,0,0,.15)}
  #smOv .sm-row.plan .soon{font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:#6b6478;flex:none}
  #smOv .sm-row.here{border-color:rgba(227,178,60,.5);background:rgba(227,178,60,.08)}
  #smOv .sm-grid{display:flex;flex-direction:column;gap:5px}
  #smOv .sm-lang{display:flex;align-items:center;justify-content:space-between;margin:14px 0 2px}
  #smOv .sm-lang>span{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#6b6478}
  #smOv .sm-lang .sw{display:flex;border:1px solid rgba(236,230,214,.12);border-radius:999px;overflow:hidden}
  #smOv .sm-lang .sw button{font-family:"Inter",sans-serif;font-size:11px;font-weight:600;letter-spacing:.06em;color:#9a93a6;background:transparent;border:none;padding:6px 14px;cursor:pointer;transition:.2s}
  #smOv .sm-lang .sw button.on{color:#1a1305;background:#e3b23c}
  @media(max-width:600px){
    #smFab{right:14px;bottom:18px;padding:8px 13px;gap:6px;font-size:10.5px;letter-spacing:.04em}
    #smFab .b{font-size:14px}
    #smOv .sm-draw{width:330px;padding:22px 18px 26px}
  }`;
  const st=document.createElement('style');st.id='sm-style';st.textContent=css;document.head.appendChild(st);
}
function visited(room){try{return room && window.SA && SA.get().rooms && SA.get().rooms[room];}catch(e){return false;}}
function here(href){if(!href)return false;const p=location.pathname.split('/').pop()||'index.html';return href.split('#')[0]===p;}

let ov;
function build(){
  injectCSS();
  if(!document.getElementById('smFab')){
    const fab=document.createElement('button');fab.id='smFab';fab.title='Menu komnat';
    fab.innerHTML='<span class="b">☰</span> MENU';fab.addEventListener('click',open);document.body.appendChild(fab);
  }
  if(!ov){
    ov=document.createElement('div');ov.id='smOv';
    ov.innerHTML='<div class="sm-scrim"></div><div class="sm-draw"></div>';
    document.body.appendChild(ov);
    ov.querySelector('.sm-scrim').addEventListener('click',close);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  }
}
function render(){
  const cl=(window.I18N&&window.I18N.lang)||"pl";
  const navRows=NAV.map(n=>`<a class="sm-row${here(n.href)?' here':''}" data-href="${n.href||''}" data-tre="${n.treasury?1:''}">
    <span class="ic">${n.ic}</span><span class="tx"><b>${n.t}</b><span>${n.sub}</span></span></a>`).join('');
  const komRows=KOMNATY.map(k=>{
    const playable=!!k.href, v=visited(k.room), cur=here(k.href);
    return `<a class="sm-row${playable?'':' plan'}${cur?' here':''}" data-href="${k.href||''}">
      <span class="rom">${k.r}</span>
      <span class="tx"><b>${k.t}</b><span>${k.sub}</span></span>
      ${v?'<span class="ck">✓</span>':''}
      ${playable?`<span class="vd" style="background:${VC[k.vk]||'#e3b23c'}"></span>`:'<span class="soon">wkrótce</span>'}
    </a>`;}).join('');
  ov.querySelector('.sm-draw').innerHTML=
    `<div class="sm-hd"><div class="br"><span class="phi">Φ</span><b>SECTIO&nbsp;AUREA</b></div><button class="sm-x" aria-label="zamknij">×</button></div>
     <div class="sm-lang"><span>Język · Language</span><div class="sw"><button data-lang="pl" class="${cl==='pl'?'on':''}">PL</button><button data-lang="en" class="${cl==='en'?'on':''}">EN</button></div></div>
     <div class="sm-h">Nawigacja</div><div class="sm-nav">${navRows}</div>
     <div class="sm-h">Komnaty · 12</div><div class="sm-grid">${komRows}</div>`;
  ov.querySelector('.sm-x').addEventListener('click',close);
  ov.querySelectorAll('.sm-lang button').forEach(b=>b.addEventListener('click',()=>{if(window.I18N)I18N.set(b.dataset.lang);}));
  ov.querySelectorAll('.sm-row').forEach(a=>{
    a.addEventListener('click',()=>{
      if(a.classList.contains('plan'))return;
      if(a.dataset.tre){close();if(window.SA)SA.treasury();return;}
      if(a.dataset.href)location.href=a.dataset.href;
    });
  });
}
function open(){build();render();ov.querySelector('.sm-draw').style.animation='none';ov.querySelector('.sm-draw').offsetHeight;ov.querySelector('.sm-draw').style.animation='';ov.classList.add('on');}
function close(){if(ov)ov.classList.remove('on');}
function mount(){build();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
window.MENU={open,close,mount};
})();
