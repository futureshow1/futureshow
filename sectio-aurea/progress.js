/* SECTIO AUREA — wspólny system złota (punktów). Drop-in: <script src="progress.js"></script> + SA.mountHUD()
   Stan trzymany w localStorage (wspólny dla wszystkich komnat tego samego origin). */
(function(){
"use strict";
const KEY='sectioAurea.v1';
const RANKS=[{m:0,n:'Profan'},{m:25,n:'Adept'},{m:70,n:'Uczeń'},{m:140,n:'Czeladnik'},{m:240,n:'Mistrz'},{m:380,n:'Wielki Mistrz'}];
const ACH={
  geometra:{n:'Geometra',d:'Komplet w Próbie Brył'},
  pitagorejczyk:{n:'Pitagorejczyk',d:'Prześledzony cały przekaz Loży'},
  zlotnik:{n:'Złotnik',d:'Zbadane wszystkie mity w Probierzu'},
  sceptyk:{n:'Sceptyk',d:'Wszystkie werdykty trafione'},
  ogrodnik:{n:'Ogrodnik',d:'Znaleziony złoty kąt 137,5°'},
  konsonans:{n:'Mistrz konsonansu',d:'Wysłuchane pitagorejskie interwały'},
  odkrywca:{n:'Odkrywca',d:'Samodzielnie odkryte φ (x² = x + 1)'},
  mierniczy:{n:'Mierniczy',d:'Zmierzone proporcje ciała'},
  architekt:{n:'Architekt',d:'Mit i system proporcji świątyni'},
  esteta:{n:'Esteta',d:'Złota siatka w sztuce zdemaskowana'},
  prozodyk:{n:'Prozodyk',d:'Złoty podział w czasie usłyszany'},
  matematyk:{n:'Matematyk',d:'Najbardziej niewymierna liczba poznana'},
  pielgrzym:{n:'Pielgrzym',d:'Odwiedzone wszystkie komnaty'},
};
const ROOMS={liczba:'Liczba',proporcja:'Proporcja',pentada:'Pentada',bryly:'Bryły',cialo:'Ciało',swiatynia:'Świątynia',eurytmia:'Eurytmia',slowo:'Słowo',ogrod:'Ogród',loza:'Loża',nauka:'Nauka',probierz:'Probierz'};
const AWARD_GOLD=20;

function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
let S=load();S.gold=S.gold||0;S.ach=S.ach||{};S.rooms=S.rooms||{};
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function rank(){let r=RANKS[0];for(const x of RANKS){if(S.gold>=x.m)r=x;}return r;}
function nextRank(){for(const x of RANKS){if(S.gold<x.m)return x;}return null;}

let hud=null,toastWrap=null;

const SA={
  get:()=>S, rank, nextRank, ach:ACH, rooms:ROOMS,
  add(a,why){a=a|0;if(a<=0)return S.gold;S.gold+=a;save();toast('+'+a+' ✦',why||'',false);refresh();return S.gold;},
  award(id){if(!ACH[id]||S.ach[id])return false;S.ach[id]=1;S.gold+=AWARD_GOLD;save();
    toast('🏅 '+ACH[id].n,ACH[id].d+' · +'+AWARD_GOLD+' ✦',true);refresh();pilgrim();return true;},
  visit(r){if(!ROOMS[r]||S.rooms[r])return;S.rooms[r]=1;save();SA.add(3,'Nowa komnata: '+ROOMS[r]);pilgrim();},
  mountHUD(){if(hud)return;injectCSS();buildHUD();},
  treasury(){injectCSS();openTreasury();},
  reset(){S={gold:0,ach:{},rooms:{}};save();refresh();}
};
function pilgrim(){if(Object.keys(ROOMS).every(r=>S.rooms[r])&&!S.ach.pielgrzym)SA.award('pielgrzym');}

function injectCSS(){
  if(document.getElementById('sa-style'))return;
  const css=`
  #saHud{position:fixed;top:13px;left:50%;transform:translateX(-50%);z-index:90;display:inline-flex;align-items:center;gap:9px;
    font-family:"Inter",system-ui,sans-serif;font-size:12px;letter-spacing:.04em;color:#ece6d6;cursor:pointer;
    background:rgba(12,11,20,.7);border:1px solid rgba(227,178,60,.4);border-radius:999px;padding:7px 15px;backdrop-filter:blur(10px);transition:.2s}
  #saHud:hover{border-color:#e3b23c;box-shadow:0 0 24px -6px rgba(227,178,60,.5)}
  #saHud .sa-coin{color:#f2d27a;font-size:14px;line-height:1}
  #saHud .sa-g{font-family:"Fraunces",Georgia,serif;font-size:15px;color:#f2d27a;font-variant-numeric:tabular-nums}
  #saHud .sa-sep{width:1px;height:13px;background:rgba(227,178,60,.3)}
  #saHud .sa-r{font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:#9a93a6}
  #saToasts{position:fixed;top:52px;left:50%;transform:translateX(-50%);z-index:91;display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none}
  .sa-toast{font-family:"Inter",sans-serif;font-size:12.5px;color:#ece6d6;background:rgba(12,11,20,.92);border:1px solid rgba(227,178,60,.4);
    border-radius:12px;padding:9px 16px;backdrop-filter:blur(10px);box-shadow:0 12px 40px -16px #000;opacity:0;transform:translateY(-10px);
    transition:opacity .3s,transform .3s;text-align:center;max-width:80vw}
  .sa-toast.on{opacity:1;transform:none}
  .sa-toast b{color:#f2d27a;font-family:"Fraunces",serif;font-weight:500}
  .sa-toast.big{border-color:#e3b23c;box-shadow:0 0 36px -8px rgba(227,178,60,.55)}
  .sa-toast .sa-sub{display:block;font-size:10.5px;color:#9a93a6;margin-top:2px}
  #saTre{position:fixed;inset:0;z-index:120;display:none;align-items:center;justify-content:center;padding:24px;font-family:"Inter",sans-serif}
  #saTre.on{display:flex}
  #saTre .sa-scrim{position:absolute;inset:0;background:rgba(4,3,8,.8);backdrop-filter:blur(8px)}
  #saTre .sa-box{position:relative;width:560px;max-width:100%;max-height:88vh;overflow:auto;background:linear-gradient(165deg,#191527,#0c0b14);
    border:1px solid rgba(227,178,60,.25);border-radius:20px;padding:30px 30px 26px;box-shadow:0 40px 100px -40px #000}
  #saTre .sa-x{position:absolute;top:16px;right:18px;width:32px;height:32px;border-radius:50%;border:1px solid rgba(227,178,60,.25);
    background:transparent;color:#9a93a6;font-size:18px;cursor:pointer;transition:.2s}
  #saTre .sa-x:hover{color:#ece6d6;border-color:#e3b23c;transform:rotate(90deg)}
  #saTre h2{font-family:"Fraunces",Georgia,serif;font-weight:300;font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#e3b23c;margin:0}
  #saTre .sa-total{font-family:"Fraunces",serif;font-size:52px;color:#f2d27a;line-height:1;margin:10px 0 2px}
  #saTre .sa-total small{font-size:22px;color:#9a93a6}
  #saTre .sa-rank{font-size:12px;letter-spacing:.1em;color:#ece6d6}
  #saTre .sa-rank b{color:#f2d27a;font-family:"Fraunces",serif}
  #saTre .sa-bar{height:6px;border-radius:4px;background:rgba(255,255,255,.07);margin:14px 0 6px;overflow:hidden}
  #saTre .sa-bar i{display:block;height:100%;background:linear-gradient(90deg,#a9801f,#f2d27a)}
  #saTre .sa-next{font-size:11px;color:#9a93a6;margin-bottom:22px}
  #saTre .sa-h{font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:#9a93a6;margin:20px 0 12px}
  #saTre .sa-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}
  #saTre .sa-badge{display:flex;gap:11px;align-items:flex-start;border:1px solid rgba(236,230,214,.08);border-radius:12px;padding:12px 13px;background:rgba(0,0,0,.2);opacity:.4}
  #saTre .sa-badge.on{opacity:1;border-color:rgba(227,178,60,.35);background:rgba(227,178,60,.06)}
  #saTre .sa-badge .ic{font-size:18px;line-height:1.1}
  #saTre .sa-badge b{font-family:"Fraunces",serif;font-weight:500;font-size:14px;color:#ece6d6;display:block}
  #saTre .sa-badge span{font-size:11px;color:#9a93a6;line-height:1.4}
  #saTre .sa-rooms{display:flex;flex-wrap:wrap;gap:7px}
  #saTre .sa-room{font-size:11px;letter-spacing:.04em;color:#9a93a6;border:1px solid rgba(236,230,214,.1);border-radius:999px;padding:6px 12px}
  #saTre .sa-room.on{color:#1a1305;background:#e3b23c;border-color:#e3b23c}
  #saTre .sa-foot{display:flex;justify-content:space-between;align-items:center;margin-top:22px;padding-top:16px;border-top:1px solid rgba(236,230,214,.08)}
  #saTre .sa-reset{font-size:10.5px;color:#6b6478;background:none;border:none;cursor:pointer}
  #saTre .sa-reset:hover{color:#d2553f}
  #saTre .sa-home{font-size:11.5px;color:#1a1305;background:#e3b23c;border:none;border-radius:999px;padding:9px 18px;cursor:pointer;text-decoration:none}
  @media(max-width:560px){#saTre .sa-grid{grid-template-columns:1fr}}
  @media(max-width:600px){
    #saHud{left:auto;right:12px;transform:none;top:11px;padding:6px 13px}
    #saHud .sa-g{font-size:14px}
    #saToasts{top:58px;max-width:92vw}
    .brand small{display:none}
    .topbar .back,.topbar .toplink{display:none}
  }`;
  const st=document.createElement('style');st.id='sa-style';st.textContent=css;document.head.appendChild(st);
}
function buildHUD(){
  hud=document.createElement('div');hud.id='saHud';hud.title='Twoje złoto · kliknij po Skarbiec';
  hud.innerHTML='<span class="sa-coin">✦</span><span class="sa-g">0</span><span class="sa-sep"></span><span class="sa-r">Profan</span>';
  hud.addEventListener('click',openTreasury);document.body.appendChild(hud);
  toastWrap=document.createElement('div');toastWrap.id='saToasts';document.body.appendChild(toastWrap);
  refresh();
}
function refresh(){if(!hud)return;hud.querySelector('.sa-g').textContent=S.gold;hud.querySelector('.sa-r').textContent=rank().n;}
function toast(title,sub,big){
  if(!toastWrap){injectCSS();toastWrap=document.createElement('div');toastWrap.id='saToasts';document.body.appendChild(toastWrap);}
  const t=document.createElement('div');t.className='sa-toast'+(big?' big':'');
  t.innerHTML='<b>'+title+'</b>'+(sub?'<span class="sa-sub">'+sub+'</span>':'');
  toastWrap.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('on')));
  setTimeout(()=>{t.classList.remove('on');setTimeout(()=>t.remove(),350);},big?3400:2300);
}
function openTreasury(){
  injectCSS();
  let tre=document.getElementById('saTre');
  if(!tre){tre=document.createElement('div');tre.id='saTre';
    tre.innerHTML='<div class="sa-scrim"></div><div class="sa-box"></div>';
    document.body.appendChild(tre);
    tre.querySelector('.sa-scrim').addEventListener('click',()=>tre.classList.remove('on'));
  }
  const r=rank(),nx=nextRank();
  const lo=r.m, hi=nx?nx.m:r.m+1, prog=nx?Math.max(0,Math.min(1,(S.gold-lo)/(hi-lo))):1;
  const onHome=/index\.html$|\/$/.test(location.pathname);
  const badges=Object.keys(ACH).map(id=>{const a=ACH[id],got=!!S.ach[id];
    return '<div class="sa-badge'+(got?' on':'')+'"><span class="ic">'+(got?'🏅':'·')+'</span><div><b>'+a.n+'</b><span>'+a.d+'</span></div></div>';}).join('');
  const rooms=Object.keys(ROOMS).map(k=>'<span class="sa-room'+(S.rooms[k]?' on':'')+'">'+ROOMS[k]+'</span>').join('');
  tre.querySelector('.sa-box').innerHTML=
    '<button class="sa-x" aria-label="zamknij">×</button>'+
    '<h2>Skarbiec</h2>'+
    '<div class="sa-total">'+S.gold+' <small>✦ złota</small></div>'+
    '<div class="sa-rank">Ranga loży: <b>'+r.n+'</b></div>'+
    '<div class="sa-bar"><i style="width:'+(prog*100).toFixed(0)+'%"></i></div>'+
    '<div class="sa-next">'+(nx?('jeszcze '+(hi-S.gold)+' ✦ do rangi: '+nx.n):'Najwyższa ranga osiągnięta — Wielki Mistrz.')+'</div>'+
    '<div class="sa-h">Odznaki · '+Object.keys(S.ach).filter(k=>S.ach[k]).length+' / '+Object.keys(ACH).length+'</div>'+
    '<div class="sa-grid">'+badges+'</div>'+
    '<div class="sa-h">Komnaty · '+Object.keys(ROOMS).filter(k=>S.rooms[k]).length+' / '+Object.keys(ROOMS).length+'</div>'+
    '<div class="sa-rooms">'+rooms+'</div>'+
    '<div class="sa-foot"><button class="sa-reset">wyzeruj postęp</button>'+(onHome?'':'<a class="sa-home" href="index.html">← do nawigatora</a>')+'</div>';
  tre.querySelector('.sa-x').addEventListener('click',()=>tre.classList.remove('on'));
  tre.querySelector('.sa-reset').addEventListener('click',()=>{if(confirm('Wyzerować całe zebrane złoto i odznaki?')){SA.reset();openTreasury();}});
  tre.classList.add('on');
}
window.SA=SA;
})();
