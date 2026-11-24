/* Chime — макет за записами екрана реальної апки (світла тема: YouTube VbNvzPWGFR0, темна: CHqTFBNSjmc)
   і скріншотами App Store (жовтень 2026). Назва бренду — тут: */
const BRAND="Chime";

const $=id=>document.getElementById(id);
const J=window.jit||(v=>v), PF=window.PROFILE||{first:"Alex",last:"Morgan",full:"Alex Morgan",user:"alexmorgan"};
/* суми унікалізуються на $1–2 при кожному заході (profile.js); баланс — випадковий $2 000–50 000 */
let balance=Math.round((2000+Math.random()*48000)*100)/100, savings=J(6842.17), hidden=false;
const SCORE=720, SCORE_UP=14;
/* ---------- валюта: Profile → Currency або ?currency=usd|cad|gbp ---------- */
const CURS={
  usd:{c:"USD",s:"$",f:"us",n:"US Dollar"},
  cad:{c:"CAD",s:"$",f:"ca",n:"Canadian Dollar"},
  gbp:{c:"GBP",s:"£",f:"gb",n:"British Pound"},
};
const CUR_KEY="ch-cur";
let curK=(new URLSearchParams(location.search).get("currency")||"").toLowerCase();
if(!CURS[curK]){try{curK=localStorage.getItem(CUR_KEY)||""}catch(_){}}
if(!CURS[curK]) curK="usd";
try{localStorage.setItem(CUR_KEY,curK)}catch(_){}
let CUR=CURS[curK];
const money=(v,d=2)=>CUR.s+v.toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d});
/* формат як у Chime: -$100.00 / +$100.00 */
const sgn=v=>(v<0?"-":"+")+money(Math.abs(v));
const ic=(n,st="")=>`<i class="i" ${st?`style="${st}"`:""}><svg><use href="#i-${n}"/></svg></i>`;
const hydrate=(root=document)=>root.querySelectorAll("[data-i]").forEach(e=>{e.innerHTML=`<svg><use href="#i-${e.dataset.i}"/></svg>`;e.removeAttribute("data-i")});

/* ---------- заборона зуму ---------- */
["gesturestart","gesturechange","gestureend"].forEach(t=>document.addEventListener(t,e=>e.preventDefault(),{passive:false}));
document.addEventListener("touchmove",e=>{if(e.touches.length>1)e.preventDefault()},{passive:false});
document.addEventListener("wheel",e=>{if(e.ctrlKey)e.preventDefault()},{passive:false});
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&["+","-","=","0"].includes(e.key))e.preventDefault()});

/* ---------- транзакції ---------- */
const B=s=>"img/brands/"+s;
let OF=window.OFFER||{n:"Freecash",l:"img/offers/freecash.png"};
let inN=0;
/* надходження від офера: o — порядковий номер (для amounts в offers.js), b — стандартна сума */
const IN=(v,d)=>{const k=inN++;return {n:OF.n,l:OF.l,o:k,b:v,v:(OF.amounts&&OF.amounts[k]!=null)?OF.amounts[k]:v,d,c:"Deposit"}};
/* c — категорія як у Chime ("6:11 PM • Transfer"), p — pending */
const tx=[
  {n:"Starbucks",v:-6.45,l:B("starbucks.png"),d:0,p:1,c:"Food & drink"},IN(87.43,0),
  {n:"McDonald's",v:-11.87,l:B("mcdonalds.svg"),d:0,p:1,c:"Food & drink"},{n:"Shell",v:-38.62,l:B("shell.png"),d:0,c:"Gas"},
  {n:"Walmart Supercenter",v:-64.31,l:B("walmart.png"),d:1,c:"Shopping"},{n:"Uber",v:-17.48,l:B("uber.png"),d:1,c:"Transportation"},
  IN(118.62,1),{n:"Dunkin'",v:-4.29,l:B("dunkin.png"),d:1,c:"Food & drink"},
  {n:"Netflix",v:-15.49,l:B("netflix.svg"),d:2,c:"Subscriptions"},{n:"Chipotle",v:-13.65,l:B("chipotle.png"),d:2,c:"Food & drink"},
  {n:"Round Up to Savings",v:-3.17,e:"💰",d:2,c:"Transfer"},{n:"Wendy's",v:-8.17,l:B("wendys.png"),d:2,c:"Food & drink"},
  IN(52.17,3),{n:"Kroger",v:-47.92,l:B("kroger.png"),d:3,c:"Groceries"},
  {n:"Starbucks",v:-7.25,l:B("starbucks.png"),d:3,c:"Food & drink"},IN(64.89,3),
  {n:"Amazon",v:-29.99,l:B("amazon.svg"),d:4,c:"Shopping"},{n:"Taco Bell",v:-9.38,l:B("tacobell.svg"),d:4,c:"Food & drink"},
  {n:"Spotify",v:-11.99,l:B("spotify.png"),d:5,c:"Subscriptions"},{n:"Target",v:-36.74,l:B("target.png"),d:5,c:"Shopping"},
  IN(138.26,5),{n:"Chevron",v:-42.15,l:B("chevron.png"),d:5,c:"Gas"},
  {n:"McDonald's",v:-8.59,l:B("mcdonalds.svg"),d:6,c:"Food & drink"},{n:"Chick-fil-A",v:-12.63,l:B("chickfila.png"),d:6,c:"Food & drink"},
  {n:"Trader Joe's",v:-53.08,l:B("traderjoes.png"),d:7,c:"Groceries"},IN(76.54,7),
  {n:"Starbucks",v:-5.95,l:B("starbucks.png"),d:7,c:"Food & drink"},{n:"DoorDash",v:-27.41,l:B("doordash.svg"),d:8,c:"Food & drink"},
  {n:"Lyft",v:-14.22,l:B("lyft.png"),d:8,c:"Transportation"},IN(109.31,9),
  {n:"Whole Foods Market",v:-71.56,l:B("wholefoods.png"),d:9,c:"Groceries"},{n:"Wendy's",v:-10.47,l:B("wendys.png"),d:9,c:"Food & drink"},
];
tx.forEach((t,i)=>{t.v=J(t.v);t.id=i;
  /* стабільний час для кожної транзакції; сьогоднішні — не пізніше поточної години */
  const h=(i*7+8)%24; t.h=t.d===0?Math.min(h,Math.max(0,new Date().getHours()-1-i%3)):h; t.mi=(i*17+5)%60;});
const txIc=t=>t.l?`<img src="${t.l}" alt="">`:t.e?t.e:t.i?ic(t.i):"";
const recips=[["Jamie Lee","#1ec176","JL","$jamielee"],["Sam Rivera","#d6336c","SR","$samrivera"],["Taylor Kim","#7048e8","TK","$taylork"],["Jordan Blake","#0ca678","JB","$jblake"],["Vincent Cole","#f08c00","VC","$vincecole"],["Mia Torres","#1c7ed6","MT","$miatorres"]];
const goals=[{n:"My Savings",e:"💰",def:1},{n:"Emergency fund",e:"☔",amt:1240,goal:1500},{n:"Travel",e:"🌴",amt:380,goal:2000}];
/* Chime Deals: [назва, кешбек, лого, категорія] */
const deals=[["Starbucks","10% cash back",B("starbucks.png"),"f"],["Dunkin'","14% cash back",B("dunkin.png"),"f"],["Chipotle","8% cash back",B("chipotle.png"),"f"],["DoorDash","$5 cash back",B("doordash.svg"),"f"],["Walmart","3% cash back",B("walmart.png"),"s"],["Target","4% cash back",B("target.png"),"s"],["Amazon","2% cash back",B("amazon.svg"),"s"],["Uber","5% cash back",B("uber.png"),"s"]];
const active=new Set(["Starbucks","Walmart","Uber"]);

function rng(seed){let s=seed;return()=>{s=(s*9301+49297)%233280;return s/233280}}

/* ---------- дати як у Chime: "Thursday, August 6th" ---------- */
const ago=d=>{const t=new Date();t.setDate(t.getDate()-d);return t};
const dstr=(d,o={month:"short",day:"numeric"})=>ago(d).toLocaleDateString("en-US",o);
const ord=n=>n+(n%100>10&&n%100<14?"th":["th","st","nd","rd"][n%10]||"th");
const dgrp=d=>{const t=ago(d);return t.toLocaleDateString("en-US",{weekday:"long"})+", "+t.toLocaleDateString("en-US",{month:"long"})+" "+ord(t.getDate())};
const tm=t=>{const h=t.h%12||12;return h+":"+String(t.mi).padStart(2,"0")+" "+(t.h<12?"AM":"PM")};
const mask=s=>hidden?CUR.s+"••••":s;
const curTxt=s=>s.replace("$",CUR.s);
/* залишок після кожної транзакції (як у Chime під сумою) */
function runBal(){let b=balance;tx.forEach(t=>{t.after=b;b-=t.v;});}
const row=t=>`<div class="tx" data-t="${t.id}"><div class="ic${t.l?" lg":""}">${txIc(t)}</div><div class="m"><b>${t.n}</b><span${t.p?' class="pd"':""}>${t.p?"Pending • ":tm(t)+" • "}${t.c}</span></div><div class="v"><b${t.v>0?' class="p"':""}>${sgn(t.v)}</b><span>${money(t.after)}</span></div></div>`;
function grouped(list){let out="",cur=null;
  list.forEach(t=>{const g=dgrp(t.d); if(g!==cur){cur=g;out+=`<div class="dgrp">${g}</div>`;} out+=row(t);});
  return out||'<p class="sm" style="text-align:center;margin-top:30px">No transactions found</p>';}
const avSq=(r,sz)=>`<div class="sq" style="background:${r[1]};width:${sz}px;height:${sz}px;font-size:${sz>50?20:sz<32?11:15}px">${r[2]}</div>`;
let filt="all";

function render(){
  runBal();
  document.querySelectorAll("[data-m]").forEach(e=>e.textContent=money(+e.dataset.m,e.dataset.d!=null?+e.dataset.d:2));
  $("curRowTxt").textContent=CUR.c;
  document.querySelectorAll(".curCode").forEach(e=>e.textContent=CUR.c);
  $("curChip").querySelector("use").setAttribute("href","#flag-"+CUR.f);
  $("mBal").textContent=mask(money(balance)); $("cBal").textContent=money(balance);
  $("mSav").textContent=mask(money(savings)); $("sAmt").textContent=money(savings);
  $("recent").innerHTML=tx.slice(0,5).map(row).join("");
  const q=$("q").value.toLowerCase();
  $("all").innerHTML=grouped(tx.filter(t=>(filt==="all"||(filt==="in"?t.v>0:filt==="out"?t.v<0:t.p))&&(!q||t.n.toLowerCase().includes(q))));
  const lastIn=tx.find(t=>t.v>0&&t.o!=null);
  $("ddLast").textContent=lastIn?dstr(lastIn.d):"Set up";
  $("spend").textContent=money(tx.filter(t=>t.v<0&&ago(t.d).getMonth()===new Date().getMonth()).reduce((a,t)=>a-t.v,0));
  $("referT").textContent=`${money(100,0)} for you, ${money(100,0)} for a friend`;
  /* Savings goals */
  const rest=goals.slice(1).reduce((a,g)=>a+g.amt,0);
  $("goals").innerHTML=goals.map((g,i)=>{const amt=g.def?savings-rest:g.amt;
    const ring=g.goal?`<svg viewBox="0 0 46 46" style="position:absolute;inset:0;width:100%;height:100%"><circle cx="23" cy="23" r="21" fill="none" stroke="#1ec176" stroke-width="3" stroke-linecap="round" stroke-dasharray="${132*g.amt/g.goal} 132" transform="rotate(-90 23 23)"/></svg>`:"";
    return `<div class="lrow" data-goal="${i}"><div class="emo" style="position:relative">${ring}${g.e}</div><div class="m"><b>${g.n}</b><span style="color:var(--text);font-size:16px">${money(amt)}</span></div>${g.def?'<span class="bdg">Default</span>':'<i class="i cv"><svg><use href="#i-chev"/></svg></i>'}</div>`}).join("");
  /* Pay Anyone → Recent */
  $("payRecent").innerHTML=recips.slice(0,4).map((r,i)=>`<div class="lrow" data-r="${i}">${avSq(r,44)}<div class="m"><b>${r[0]}</b><span>${r[3]}</span></div><i class="i cv"><svg><use href="#i-chev"/></svg></i></div>`).join("");
  /* Deals */
  const dl=c=>deals.filter(d=>d[3]===c).map(d=>`<div class="lrow"><div class="ic lg">${`<img src="${d[2]}" alt="">`}</div><div class="m"><b>${d[0]}</b><span>${curTxt(d[1])}</span></div><button class="chip${active.has(d[0])?" on":""}" data-deal="${d[0]}">${active.has(d[0])?"Activated":"Activate"}</button></div>`).join("");
  $("dealsFood").innerHTML=dl("f"); $("dealsShop").innerHTML=dl("s"); $("actCnt").textContent=active.size;
  /* MyPay ring */
  $("mpRing").innerHTML=mpRing();
  $("mpGo").textContent="Get "+money(275,0);
  $("gauge").innerHTML=gauge(SCORE);
  drawT();
}
/* MyPay: кільце з градієнтом темно-зелений → зелений → лайм */
function mpRing(){const r=110,c=135,len=2*Math.PI*r*.75,f=.62;
  return `<svg viewBox="0 0 270 270"><defs><linearGradient id="mpg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#0b4a2c"/><stop offset=".5" stop-color="#3fd98c"/><stop offset="1" stop-color="#c7ec74"/></linearGradient></defs>
  <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="var(--tint)" stroke-width="30" stroke-linecap="round" stroke-dasharray="${len} 999" transform="rotate(135 ${c} ${c})"/>
  <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="url(#mpg)" stroke-width="30" stroke-linecap="round" stroke-dasharray="${len*f} 999" transform="rotate(135 ${c} ${c})"/></svg>
  <div class="rv"><b>${money(275,0)}</b><span>Available now</span></div>`;}
/* FICO: дуга помаранчевий → лайм → зелений */
function gauge(score){const f=(score-300)/550,r=100,len=Math.PI*1.25*r;
  return `<svg viewBox="0 0 250 170"><defs><linearGradient id="fg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#e07a2c"/><stop offset=".55" stop-color="#c9ec74"/><stop offset="1" stop-color="#1ec176"/></linearGradient></defs>
  <path d="M40 150 A100 100 0 1 1 210 150" fill="none" stroke="#dff3e7" stroke-width="22" stroke-linecap="round"/>
  <path d="M40 150 A100 100 0 1 1 210 150" fill="none" stroke="url(#fg)" stroke-width="22" stroke-linecap="round" stroke-dasharray="${len*f} 999"/></svg><div class="gv">${score}</div>`;}
$("scDate").textContent=dstr(3);
$("mpFrom").textContent=dstr(9); $("mpTo").textContent=dstr(-5);
/* Profile: "Ashley R." + ініціал */
$("pfName").textContent=PF.first+" "+PF.last[0]+"."; $("pfIni").textContent=PF.first[0];

/* ---------- навігація ---------- */
const noNav=["transfer","done"];
const tabOf={home:"home",checking:"home",addmoney:"home",acctdet:"home",cards:"home",savings:"home",mypay:"home",credit:"home",move:"move",transfer:"move",pay:"pay",deals:"deals",profile:"profile"};
const stack=[]; let curId="home";
function show(id){
  curId=id;
  document.querySelectorAll(".screen").forEach(s=>s.classList.toggle("on",s.id===id));
  if(tabOf[id]) document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.go===tabOf[id]));
  $("nav").style.display=noNav.includes(id)?"none":"flex";
  document.querySelector("main").scrollTop=0;
  ppadShow(false);
  const dark=document.documentElement.dataset.theme==="dark";
  document.querySelector("meta[name=theme-color]").content=id==="home"?(dark?"#163a2a":"#10412d"):(dark?"#0f1d17":"#f7f7f7");
}
function go(id,push){ if(push) stack.push(curId); else stack.length=0; if(id==="transfer") tReset(); show(id); }
function back(){ show(stack.pop()||"home"); }

document.addEventListener("click",e=>{
  if(e.target.closest(".sheet")) return;
  if(e.target.closest("#hideBal")) return;
  if(e.target.closest(".pc .x")){ const p=e.target.closest(".pc"); p.remove(); dotsUpd(); return; }
  const g=e.target.closest("[data-go]"); if(g){ go(g.dataset.go,g.hasAttribute("data-push")); return; }
  if(e.target.closest("[data-back]")){ back(); return; }
  const f=e.target.closest("#fchips [data-f]"); if(f){ filt=f.dataset.f; document.querySelectorAll("#fchips .chip").forEach(c=>c.classList.toggle("on",c===f)); render(); return; }
  const r=e.target.closest("[data-r]"); if(r){ to=recips[+r.dataset.r]; if(parseFloat(pay.v)) review("Pay"); else {toast("Enter an amount");ppadShow(true);} return; }
  const t=e.target.closest(".tx[data-t]"); if(t){ openTx(tx.find(x=>x.id===+t.dataset.t)); return; }
  const dl=e.target.closest("[data-deal]"); if(dl){ const n=dl.dataset.deal; if(active.has(n)){toast("Already activated");return;} active.add(n); render(); toast(n+" deal activated"); return; }
  const a=e.target.closest("[data-add]"); if(a){ addFlow(a.dataset.add); return; }
  const gl=e.target.closest("[data-goal]"); if(gl){ const gg=goals[+gl.dataset.goal]; toast(gg.def?"Your default savings goal":`${gg.n}: ${money(gg.amt,0)} of ${money(gg.goal,0)}`); return; }
  if(e.target.closest(".bell")){ bellSheet(); return; }
  if(e.target.closest(".get")){ referSheet(); return; }
});
/* крапки під промо-каруселлю */
const dotsUpd=()=>{const n=$("promo").children.length,i=Math.round($("promo").scrollLeft/($("promo").clientWidth-20));$("pdots").innerHTML=Array.from({length:n},(_,k)=>`<i${k===Math.min(i,n-1)?' class="on"':""}></i>`).join("")};
$("promo").addEventListener("scroll",dotsUpd,{passive:true});

/* ---------- sheets ---------- */
const sheet=$("sheet"),bg=$("bg");
const closeSheet=()=>{sheet.classList.remove("on");bg.classList.remove("on")};
const openSheet=(h,tall)=>{sheet.className="sheet on"+(tall?" tall":"");sheet.innerHTML=h;hydrate(sheet);bg.classList.add("on")};
bg.onclick=closeSheet;
const cv='<i class="i cv"><svg><use href="#i-chev"/></svg></i>';
const descr=t=>t.desc||(t.o!=null?t.n.toUpperCase().replace(/[^A-Z0-9 ]/g,"")+" PAYOUT ACH CREDIT":t.v<0&&t.l?t.n.toUpperCase().replace(/[^A-Z0-9 ]/g,"")+" POS DEBIT":t.n);
function openTx(t){
  openSheet(`<div class="grab"></div><div class="ic${t.l?" lg":""}" style="width:60px;height:60px;font-size:28px;margin:0 auto 12px">${txIc(t)}</div><h3 class="c">${t.n}</h3>
  <div style="text-align:center;font-size:40px;letter-spacing:-.02em;margin:6px 0 2px;color:${t.v>0?"var(--pos)":"var(--text)"}">${sgn(t.v)}</div>
  <div class="sm" style="text-align:center;margin-bottom:12px">${dgrp(t.d)} · ${tm(t)}</div>
  <div class="lst rvw">
  <div class="kv"><span>Status</span><b>${t.p?"Pending":"Settled"}</b></div>
  <div class="kv"><span>Category</span><b>${t.c}</b></div>
  <div class="kv"><span>${t.v>0?"To":"From"}</span><b>Checking</b></div>
  ${t.v<0&&t.l?`<div class="kv"><span>Card</span><b>Debit ••4821</b></div>`:""}
  <div class="kv"><span>Description</span><b style="font-size:13.5px">${descr(t)}</b></div>
  <div class="kv"><span>Balance after</span><b>${money(t.after)}</b></div></div>
  <button class="pill g" style="margin-top:12px" id="txHelp">Get help</button>`);
  $("txHelp").onclick=()=>{closeSheet();toast("Connecting you to Member Services")};
}
function bellSheet(){
  document.querySelectorAll(".bell em").forEach(e=>e.remove());
  const lastIn=tx.find(t=>t.v>0);
  const it=(t,s,d)=>`<div class="lrow" style="cursor:default;align-items:flex-start"><span style="width:8px;height:8px;border-radius:50%;background:var(--acc);margin-top:7px;flex-shrink:0"></span><div class="m"><b style="font-weight:500">${t}</b><span>${s}</span><span>${d}</span></div></div>`;
  openSheet(`<div class="grab"></div><h3 style="margin-bottom:6px">Inbox</h3><div class="lst">
  ${lastIn?it("You got paid! 💸",`${money(lastIn.v)} from ${lastIn.n} landed in your Checking account.`,dstr(lastIn.d)):""}
  ${it("Get up to 10% cash back.","Remember to activate this offer before you shop at Starbucks.",dstr(2))}
  ${it("Your FICO® Score went up",`Nice work! Your score is up ${SCORE_UP} points to ${SCORE}.`,dstr(4))}
  ${it("Don't miss balance alerts","Turn on notifications to track your spending, financial progress, updates, and exclusives.",dstr(12))}</div>`,true);
}
function qrSvg(seed){const n=25,r=rng(seed);let s="";
  const fz=(x,y)=>(x<8&&y<8)||(x>n-9&&y<8)||(x<8&&y>n-9)||(x>9&&x<15&&y>9&&y<15);
  for(let y=0;y<n;y++)for(let x=0;x<n;x++) if(!fz(x,y)&&r()>.5) s+=`M${x} ${y}h1v1h-1z`;
  const f=(x,y)=>`<rect x="${x+.5}" y="${y+.5}" width="6" height="6" fill="none" stroke="#10412d"/><rect x="${x+2}" y="${y+2}" width="3" height="3" fill="#10412d"/>`;
  return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><path d="${s}" fill="#10412d"/>${f(0,0)}${f(n-7,0)}${f(0,n-7)}</svg>`;}
function qrSheet(){
  openSheet(`<div class="grab"></div><h3 class="c">${PF.full}</h3><div class="sm" style="text-align:center">$${PF.user}</div>
  <div class="qrbox">${qrSvg(17)}${CLOGO}</div>
  <button class="pill" id="qrShare" style="margin-top:14px">Share</button><button class="pill g" id="qrCopy" style="margin-top:10px">Copy $ChimeSign</button>`);
  $("qrShare").onclick=()=>toast("Link copied"); $("qrCopy").onclick=()=>{try{navigator.clipboard.writeText("$"+PF.user)}catch(_){}toast("$ChimeSign copied")};
}
function referSheet(){
  openSheet(`<div class="grab"></div><h3>${money(100,0)} for you, ${money(100,0)} for a friend</h3><p class="sm" style="margin:8px 0 4px;color:var(--text)">And you'll earn a ${money(10,0)} SpotMe® bonus! You both get paid when they enroll and receive a qualifying direct deposit. <span class="ul">View terms</span></p>
  <div class="qrbox">${qrSvg(29)}${CLOGO}</div><div class="sm" style="text-align:center">Show or print this QR code to refer your friends</div>
  <button class="pill" style="margin-top:16px" id="refGo">Share invite link</button>`);
  $("refGo").onclick=()=>{closeSheet();toast("Invite link copied")};
}
$("sQr").onclick=qrSheet; $("sQr2").onclick=qrSheet; $("inviteRow").onclick=referSheet;

/* ---------- Add money ---------- */
function addFlow(k){
  if(k==="cash"){toast("3 Walgreens near you accept cash deposits");return;}
  if(k==="app"){toast("Use your Chime account & routing number in the app");return;}
  let amt=0;
  openSheet(`<div class="grab"></div><h3>Add money</h3><div class="sm" style="margin-top:4px">${k==="apple"?"Apple Pay · Debit card only":"From your debit card"} · Instant</div>
  <div class="btns" id="aq" style="grid-template-columns:repeat(3,1fr);margin:18px 0">${[25,50,100,200,500,1000].map(v=>`<button class="pill g" data-v="${v}">${money(v,0)}</button>`).join("")}</div>
  <div class="lst rvw" id="arv"></div>
  <button class="pill off" id="aGo">Confirm transfer</button><button class="pill g" style="margin-top:10px" id="aCancel">Cancel</button>`);
  const upd=()=>{$("arv").innerHTML=`<div class="kv"><span>Amount</span><b>${money(amt)}</b></div><div class="kv"><span>Available</span><b>Instantly ${ic("bolt","color:#f5b000;width:14px")}</b></div><div class="kv"><span>From</span><b>External card ••3390</b></div><div class="kv"><span>To</span><b>Checking</b></div>`;};
  upd();
  $("aq").onclick=e=>{const b=e.target.closest("[data-v]");if(!b)return;amt=+b.dataset.v;$("aq").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));$("aq").querySelectorAll("button").forEach(x=>x.className="pill "+(x===b?"":"g"));$("aGo").classList.remove("off");upd();};
  $("aCancel").onclick=closeSheet;
  $("aGo").onclick=()=>{balance+=amt;tx.unshift({id:tx.length+100,n:"Transfer from debit card",v:amt,e:"💳",d:0,c:"Transfer",h:new Date().getHours(),mi:new Date().getMinutes()});closeSheet();render();doneScr(`You added ${money(amt)} to your Checking Account`,"")};
}
function doneScr(t,s){$("dTitle").textContent=t;$("dSub").textContent=s;stack.length=0;show("done");}

/* ---------- Transfer money (From / To, клавіатура) ---------- */
const ACC={
  chk:{n:"Checking",bal:()=>balance,k:"c"},
  sav:{n:"Savings",bal:()=>savings,k:"c"},
  nwc:{n:"Northwind Checking",sub:()=>money(1084.26)+" as of 12 minutes ago",k:"b",days:"1-5 business days"},
  nwd:{n:"Northwind Debit card",sub:()=>"Ending in 3390",k:"d",inst:1},
};
const tf={v:"0",from:"nwd",to:"chk"};
const CLOGO='<img class="cic" src="img/logo.png?v=2" alt="">';
const accIc=a=>a.k==="c"?CLOGO:`<span class="cic b">${ic(a.k==="d"?"card":"bank")}</span>`;
const accCol=(id,lab)=>{const a=ACC[id];return `<small>${lab}</small>${accIc(a)}<b>${a.n}</b><span>${a.bal?money(a.bal()):a.sub()}</span>`};
function tReset(){tf.v="0";tf.from="nwd";tf.to="chk";}
function drawT(){
  $("tAmt").innerHTML=`<sup>${CUR.s}</sup>${tf.v}`;
  $("tFrom").innerHTML=accCol(tf.from,"From"); $("tTo").innerHTML=accCol(tf.to,"To");
  hydrate($("tFrom")); hydrate($("tTo"));
  const v=parseFloat(tf.v)||0, src=ACC[tf.from], dst=ACC[tf.to];
  let hint="";
  if(dst.k==="d"&&v>0&&v<25) hint=`Transfers to debit cards have a ${money(25,0)} minimum`;
  else if(dst.k==="d"&&v>0) hint=`1.75% fee updated to ${money(Math.max(v*.0175,.25))}`;
  if(src.bal&&v>src.bal()) hint="There isn't enough money in your account";
  $("tHint").textContent=hint;
  $("tReview").classList.toggle("off",!v||(src.bal&&v>src.bal())||(dst.k==="d"&&v<25));
}
function pickAcc(which){
  const other=which==="from"?tf.to:tf.from;
  const rowA=id=>{const a=ACC[id];const right=a.k==="c"?cv:a.inst?`<div style="text-align:right"><span class="inst">${ic("bolt")}Instant</span>${which==="to"?'<br><span class="fee">1.75% fee</span>':""}</div>`:`<span class="sm" style="color:var(--text)">${a.days}</span>`;
    return `<div class="lrow" data-acc="${id}">${accIc(a)}<div class="m"><b>${a.n}</b><span>${a.bal?money(a.bal()):a.sub()}</span></div>${right}</div>`};
  const chime=["chk","sav"].filter(x=>x!==other), linked=["nwc","nwd"].filter(x=>x!==other);
  openSheet(`<div class="grab"></div><h3>${which==="from"?"From":"To"}</h3>${chime.length?`<h4>Chime accounts</h4><div class="lst">${chime.map(rowA).join("")}</div>`:""}
  ${ACC[other].k==="c"?`<h4>Linked accounts</h4><div class="lst">${linked.map(rowA).join("")}
  <div class="lrow" data-acc="newbank">${ic("bank")}<div class="m"><b>Add a bank account</b><span>Transfer within 1-5 business days</span></div>${cv}</div>
  <div class="lrow" data-acc="newcard">${ic("card")}<div class="m"><b>Add a debit card</b><span>Transfer instantly ⚡</span></div>${cv}</div></div>`:""}`);
  sheet.querySelectorAll("[data-acc]").forEach(el=>el.onclick=()=>{const id=el.dataset.acc;
    if(!ACC[id]){closeSheet();toast("Linking is unavailable in demo");return;}
    tf[which]=id; if(ACC[tf.from].k!=="c"&&ACC[tf.to].k!=="c") tf[which==="from"?"to":"from"]="chk"; closeSheet(); drawT();});
}
$("tFrom").onclick=()=>pickAcc("from"); $("tTo").onclick=()=>pickAcc("to");
$("tSwap").onclick=()=>{[tf.from,tf.to]=[tf.to,tf.from];drawT()};
$("tReview").onclick=()=>{
  const v=parseFloat(tf.v),src=ACC[tf.from],dst=ACC[tf.to],fee=dst.k==="d"?Math.max(v*.0175,.25):0;
  const avail=dst.k==="b"?dst.days:src.k==="b"?src.days:`Instant ${ic("bolt","color:#f5b000;width:14px")}`;
  openSheet(`<div class="grab"></div><h3 class="c">Review transfer</h3><div style="text-align:center;font-size:44px;font-weight:600;letter-spacing:-.03em;margin:14px 0 8px">${money(v)}</div>
  <div class="lst rvw"><div class="kv"><span>From</span><b>${src.n}</b></div><div class="kv"><span>To</span><b>${dst.n}</b></div>
  ${fee?`<div class="kv"><span>1.75% fee</span><b>${money(fee)}</b></div><div class="kv"><span>Total charge</span><b>${money(v+fee)}</b></div>`:""}
  <div class="kv"><span>Availability</span><b>${avail}</b></div></div>
  <p class="sm" style="font-size:12px;margin:10px 0 14px">There may be times when instant transfers may be delayed due to network timing or other factors beyond our control.</p>
  <button class="pill" id="tGo">${src.k==="b"?"Schedule":"Transfer "+money(v)}</button>`);
  $("tGo").onclick=()=>{
    if(src.bal){ if(tf.from==="chk") balance-=v+fee; else savings-=v; }
    if(tf.to==="chk") balance+=v; else if(tf.to==="sav") savings+=v;
    const now=new Date();
    if(tf.from==="chk"||tf.to==="chk") tx.unshift({id:tx.length+200,n:tf.to==="chk"?"Transfer from "+src.n:"Transfer to "+dst.n,v:tf.to==="chk"?v:-(v+fee),e:"💸",d:0,c:"Transfer",h:now.getHours(),mi:now.getMinutes()});
    closeSheet(); render(); doneScr(`You transferred ${money(v)} to ${dst.n}`,dst.k==="b"?"It should arrive in 1-5 business days.":"It's there now.");
  };
};

/* ---------- клавіатура iOS (цифри + літери) ---------- */
const KL={2:"ABC",3:"DEF",4:"GHI",5:"JKL",6:"MNO",7:"PQRS",8:"TUV",9:"WXYZ"};
function keypad(el,o,onChange){
  ["1","2","3","4","5","6","7","8","9",".","0","‹"].forEach(k=>{
    const b=document.createElement("button");
    if(k==="‹"){b.innerHTML=ic("del");b.className="n";b.setAttribute("aria-label","Delete");}
    else if(k==="."){b.textContent=".";b.className="n";}
    else b.innerHTML=k+(KL[k]?`<small>${KL[k]}</small>`:"");
    b.onclick=()=>{ if(k==="‹") o.v=o.v.length>1?o.v.slice(0,-1):"0";
      else if(k==="."){ if(!o.v.includes(".")) o.v+="."; }
      else if(!(o.v.includes(".")&&o.v.split(".")[1].length>=2)) o.v=o.v==="0"?k:o.v+k;
      if(o.v.replace(".","").length>7) o.v=o.v.slice(0,-1);
      onChange(); };
    $(el).appendChild(b);});
}
keypad("tpad",tf,drawT);

/* ---------- Pay Anyone ---------- */
const pay={v:"0"}; let to=null, pfNote="";
const payDraw=()=>{$("payAmt").textContent=CUR.s+pay.v;};
const ppadShow=on=>{$("ppad").classList.toggle("on",on);$("payAmt").classList.toggle("on",on);};
keypad("ppad",pay,payDraw);
$("payAmt").onclick=()=>ppadShow(true);
document.addEventListener("click",e=>{if(curId==="pay"&&!e.target.closest("#ppad,#payAmt,.sheet"))ppadShow(false)},true);
function pickSheet(kind){
  openSheet(`<div class="grab"></div><div class="search" style="box-shadow:none;border:1px solid var(--line)">${ic("search")}<input id="pq" placeholder="Search by name, $ChimeSign or phone" autocomplete="off"></div>
  <div class="lrow" id="payLink" style="margin-top:6px"><div class="emo">🤝</div><div class="m"><b>Send Money to Anyone</b><span>Even if they use Cash App® or Venmo® — no Chime app needed.</span></div></div>
  <h4>Recents</h4><div class="lst" id="pres"></div>`,true);
  const draw=()=>{const q=$("pq").value.toLowerCase();$("pres").innerHTML=recips.filter(r=>(r[0]+r[3]).toLowerCase().includes(q)).map(r=>`<div class="lrow" data-rp="${recips.indexOf(r)}">${avSq(r,44)}<div class="m"><b>${r[0]}</b><span>${r[3]}</span></div></div>`).join("")||'<p class="sm" style="padding:16px 0;text-align:center">No results</p>';
    sheet.querySelectorAll("[data-rp]").forEach(el=>el.onclick=()=>{to=recips[+el.dataset.rp];review(kind)});};
  $("pq").oninput=draw; draw();
  $("payLink").onclick=()=>{try{navigator.clipboard.writeText("https://chime.com/pay/"+PF.user)}catch(_){}closeSheet();toast("Payment link copied")};
}
function startPay(kind){ if(!parseFloat(pay.v)){toast("Enter an amount");ppadShow(true);return;} ppadShow(false); pickSheet(kind); }
function review(kind){
  const isPay=kind==="Pay", v=parseFloat(pay.v);
  openSheet(`<div class="grab"></div><h3>Let's review</h3>
  <div class="lst rvw" style="margin-top:8px">
  <div class="kv"><span>${isPay?"To":"From"}</span><b><span style="text-align:right">${to[0]}<br><small style="color:var(--muted);font-size:13px">${to[3]}</small></span>${avSq(to,36)}</b></div>
  <div class="kv"><span>Amount</span><b>${money(v)}</b></div>
  <div class="kv"><span>For</span><b style="flex:1"><input class="note" id="note" placeholder="What's this for?" value="${pfNote}" autocomplete="off"></b></div>
  ${isPay?`<div class="kv"><span>From</span><b><span class="chip on" style="background:var(--tint);color:var(--text);border-color:var(--tint)">Checking ${money(balance)} ${ic("chevd").replace('class="i"','class="i cd"')}</span></b></div>`:""}</div>
  <p class="sm" style="text-align:center;margin:8px 0 14px">All payment methods are fee-free</p>
  <button class="pill" id="sendGo">${isPay?"Pay":"Request"} ${money(v)}</button>`);
  $("note").oninput=e=>pfNote=e.target.value;
  $("sendGo").onclick=()=>{
    const first=to[0].split(" ")[0];
    if(isPay){ if(v>balance){toast("Insufficient funds");return;}
      balance-=v; const now=new Date();
      tx.unshift({id:tx.length+300,n:to[0],v:-v,e:`<span style="color:${to[1]};font-size:14px;font-weight:700">${to[2]}</span>`,d:0,c:"Pay Anyone",h:now.getHours(),mi:now.getMinutes(),desc:"Pay Anyone to "+to[3]+(pfNote?" · "+pfNote:"")});
      doneScr(`You paid ${first} ${money(v)}`,"Payments to Chime members arrive instantly.");
    } else doneScr(`You requested ${money(v)} from ${first}`,`We'll let you know when ${first} pays.`);
    pfNote=""; pay.v="0"; payDraw(); closeSheet(); render();
  };
}
$("payBtn").onclick=()=>startPay("Pay"); $("reqBtn").onclick=()=>startPay("Request");
$("paySearch").onclick=()=>pickSheet("Pay");
$("howBtn").onclick=()=>toast("Send money instantly with a $ChimeSign, phone or email");
$("grpBtn").onclick=()=>toast("Groups: share expenses with friends and family");

/* ---------- Cards ---------- */
const CARDS={debit:{n:"4821",full:"4232 2310 7745 4821",exp:"09/29",cvv:"318",t:"Virtual Debit",d:"Shop online and use it for bills and subscriptions. It'll work even if your physical card is lost or stolen."},
  cc:{n:"7731",full:"4147 0980 2216 7731",exp:"03/30",cvv:"702",t:"Chime Card",d:`Secured Chime Visa® Credit Card. Earn 5% cash back on your top category and build credit with on-time payments.`}};
let cardK="debit",shown=false; const locked={debit:false,cc:false};
function drawCard(){const c=CARDS[cardK];
  $("cTitle").textContent=c.t; $("cDesc").textContent=c.d;
  Object.keys(CARDS).forEach(k=>{$("num-"+k).textContent=(shown&&k===cardK)?CARDS[k].full+"  "+CARDS[k].exp+"  "+CARDS[k].cvv:"•••• "+CARDS[k].n;
    document.querySelector(`[data-ck="${k}"]`).classList.toggle("locked",locked[k]);});
  $("showNumT").textContent=shown?"Hide number":"Show number"; $("lockTg").checked=locked[cardK];
  $("cdots").innerHTML=Object.keys(CARDS).map(k=>`<i${k===cardK?' class="on"':""}></i>`).join("");
}
$("cardsw").addEventListener("scroll",()=>{const i=Math.round($("cardsw").scrollLeft/$("cardsw").clientWidth);const k=Object.keys(CARDS)[i]||"debit";if(k!==cardK){cardK=k;shown=false;drawCard();}},{passive:true});
$("showNum").onclick=()=>{shown=!shown;drawCard()};
$("lockTg").onchange=e=>{locked[cardK]=e.target.checked;drawCard();toast(e.target.checked?"Card frozen":"Card unfrozen")};
$("pinRow").onclick=()=>toast("We sent a code to your phone");
$("replRow").onclick=()=>toast("Replacement card ships in 7–10 days");
$("walletBtn").onclick=()=>toast("Added to Apple Wallet");

/* ---------- Savings ---------- */
function savMove(dir){
  let amt=100;
  openSheet(`<div class="grab"></div><h3>${dir==="in"?"Add money to Savings":"Transfer out of Savings"}</h3>
  <div class="btns" id="sq" style="grid-template-columns:repeat(3,1fr);margin:18px 0">${[25,50,100,250,500,1000].map(v=>`<button class="pill ${v===amt?"":"g"}" data-v="${v}">${money(v,0)}</button>`).join("")}</div>
  <div class="lst rvw"><div class="kv"><span>From</span><b>${dir==="in"?"Checking":"Savings"}</b></div><div class="kv"><span>To</span><b>${dir==="in"?"My Savings":"Checking"}</b></div><div class="kv"><span>Availability</span><b>Instant ${ic("bolt","color:#f5b000;width:14px")}</b></div></div>
  <button class="pill" style="margin-top:12px" id="sGo">Transfer</button>`);
  $("sq").onclick=e=>{const b=e.target.closest("[data-v]");if(!b)return;amt=+b.dataset.v;$("sq").querySelectorAll("button").forEach(x=>x.className="pill "+(x===b?"":"g"))};
  $("sGo").onclick=()=>{
    if(dir==="in"){ if(amt>balance){toast("Insufficient funds");return;} balance-=amt; savings+=amt; }
    else { if(amt>savings){toast("Not enough in Savings");return;} savings-=amt; balance+=amt; }
    const now=new Date(); tx.unshift({id:tx.length+400,n:dir==="in"?"Transfer to Savings":"Transfer from Savings",v:dir==="in"?-amt:amt,e:"💰",d:0,c:"Transfer",h:now.getHours(),mi:now.getMinutes()});
    closeSheet(); render(); toast("Moved "+money(amt,0));
  };
}
$("tin").onclick=()=>savMove("in"); $("tout").onclick=()=>savMove("out");
const autoSheet=()=>{openSheet(`<div class="grab"></div><h3>Auto-save</h3>
  <h4>Paycheck</h4><div class="sm">Save with every direct deposit</div><div class="lst"><div class="lrow"><div class="emo">💸</div><div class="m"><b>Split your pay</b></div><span class="r">On</span>${cv}</div></div>
  <h4>Round ups</h4><div class="sm">Save when you spend with your Chime Card</div><div class="lst"><div class="lrow"><div class="emo">💳</div><div class="m"><b>Debit purchases</b></div><span class="r">On</span>${cv}</div><div class="lrow"><div class="emo">💳</div><div class="m"><b>Chime Card purchases</b></div><span class="r">Off</span>${cv}</div></div>
  <h4>Recurring transfers</h4><div class="sm">Set it and forget it</div><div class="lst"><div class="lrow"><div class="emo">📅</div><div class="m"><b>Manage recurring transfers</b></div>${cv}</div></div>`)};
$("autoBtn").onclick=autoSheet; $("autoRow").onclick=autoSheet;
$("addGoal").onclick=()=>toast("Goals: Car, Rent, Bills, Travel and more");
$("apyBanner").onclick=()=>toast("Chime Prime: 4.00% APY on savings");

/* ---------- різне ---------- */
$("hideBal").onclick=e=>{e.stopPropagation();hidden=!hidden;$("hideBal").innerHTML=ic(hidden?"eye":"eyeoff");render()};
const spotSheet=()=>{openSheet(`<div class="grab"></div><div style="text-align:center;font-size:64px">🪂</div><h3 class="c" style="margin-top:6px">SpotMe® is on</h3>
  <p class="sm" style="text-align:center;margin:6px 0 16px;color:var(--text)">SpotMe covers you when you need it, with up to ${money(200,0)} fee-free overdraft on debit card purchases and cash withdrawals.</p>
  <div class="lst rvw"><div class="kv"><span>Your limit</span><b>${money(200,0)}</b></div><div class="kv"><span>Currently spotted</span><b>${money(0)}</b></div><div class="kv"><span>Boosts received</span><b>2</b></div></div>
  <button class="pill" style="margin-top:12px" id="boostGo">Boost a friend</button>`);$("boostGo").onclick=()=>{closeSheet();toast("Boost sent")}};
$("spotRow").onclick=spotSheet; $("spotRow2").onclick=spotSheet; $("boostRow").onclick=spotSheet;
$("carRow").onclick=()=>toast("Compare car insurance quotes in seconds");
$("billsRow").onclick=()=>toast("Move bills to Chime to build credit");
$("insBtn").onclick=()=>toast(dstr(0,{month:"long"})+" spending: "+$("spend").textContent);
$("srchBtn").onclick=()=>{const b=$("srchBox");b.style.display=b.style.display==="none"?"block":"none";if(b.style.display==="block")$("q").focus()};
$("mvCheck").onclick=()=>toast("Camera access is off");
$("mvAtm").onclick=()=>toast("47,000+ fee-free ATMs · 3 within 1 mile");
$("mvCash").onclick=()=>addFlow("cash");
$("mvRec").onclick=()=>toast("No recurring transfers yet");
$("mvMail").onclick=()=>toast("Mail a check: send checks to anyone");
$("mvLinked").onclick=()=>toast("Northwind Bank · Checking & Debit card linked");
$("rout").onclick=()=>{try{navigator.clipboard.writeText("031101279")}catch(_){}toast("Routing number copied")};
$("acct").onclick=()=>{try{navigator.clipboard.writeText("860118421567")}catch(_){}$("acctN").textContent="860118421567";toast("Account number copied")};
$("bankN").onclick=()=>{try{navigator.clipboard.writeText("The Bancorp Bank, N.A.")}catch(_){}toast("Bank name copied")};
$("limits").onclick=()=>toast(`Daily debit card limit: ${money(2500,0)}`);
$("splitRow").onclick=autoSheet;
$("ddForm").onclick=()=>toast("Direct deposit form downloaded");
$("mpGo").onclick=()=>toast("MyPay advance on its way");
$("dealHist").onclick=()=>toast("Cash back history");
$("tierBtn").onclick=()=>toast("You're a Chime Prime member");
$("helpTile").onclick=()=>toast("Connecting you to Member Services");
$("secTile").onclick=()=>toast("High security · 2 of 2 tasks done");
$("pinfo").onclick=()=>toast(PF.full+" · $"+PF.user);
$("docsRow").onclick=()=>toast("Statement for "+dstr(30,{month:"long"})+" downloaded");
$("privRow").onclick=()=>toast("Privacy settings");
$("notifRow").onclick=()=>toast("Notifications are on");
$("logout").onclick=()=>toast("Signed out (demo)");

/* ---------- валюта + офер ---------- */
function setCur(k){
  if(!CURS[k]) return; curK=k; CUR=CURS[k];
  try{const u=new URL(location.href);u.searchParams.set("currency",k);history.replaceState(null,"",u);localStorage.setItem("ch-q",u.search);localStorage.setItem(CUR_KEY,k)}catch(_){}
  payDraw(); render();
}
function setOffer(id){
  const all=window.OFFERS_ALL||{}; if(!all[id]) return;
  OF={id,...all[id]};
  try{const u=new URL(location.href);u.searchParams.set("offer",id);history.replaceState(null,"",u);localStorage.setItem("ch-q",u.search);localStorage.setItem("ch-offer",id)}catch(_){}
  tx.forEach(t=>{if(t.o==null)return;t.n=OF.n;t.l=OF.l;t.v=J(OF.amounts&&OF.amounts[t.o]!=null?OF.amounts[t.o]:t.b)});
  render();
}
/* попап «Currency + Offer» — з Pay Anyone (значок під сумою) і з Profile → Currency */
const curSheet=()=>{
  const offs=Object.entries(window.OFFERS_ALL||{});
  openSheet(`<div class="grab"></div><h3 style="margin-bottom:14px">Currency</h3>${Object.entries(CURS).map(([k,c])=>`<div class="opt ${curK===k?"on":""}" data-cur="${k}"><svg class="flag" style="width:32px;height:32px;flex-shrink:0"><use href="#flag-${c.f}"/></svg><div class="m">${c.c}<span>${c.n}</span></div><span class="radio"></span></div>`).join("")}
  ${offs.length?`<h3 style="margin:22px 0 14px">Offer</h3>${offs.map(([k,o])=>`<div class="opt ${OF.id===k?"on":""}" data-off="${k}"><span class="olg"><img src="${o.l}" alt=""></span><div class="m">${o.n}<span>?offer=${k}</span></div><span class="radio"></span></div>`).join("")}`:""}`);
  sheet.querySelectorAll("[data-cur]").forEach(el=>el.onclick=()=>{setCur(el.dataset.cur);closeSheet()});
  sheet.querySelectorAll("[data-off]").forEach(el=>el.onclick=()=>{setOffer(el.dataset.off);closeSheet();toast("Offer: "+OF.n)});
};
$("curRow").onclick=curSheet; $("curChip").onclick=e=>{e.stopPropagation();ppadShow(false);curSheet()};

/* ---------- теми ---------- */
const THEME_KEY="ch-theme", THEMES=[["light","Light","Always light"],["dark","Dark","Always dark"],["system","System","Match your phone's setting"]];
const darkMq=matchMedia("(prefers-color-scheme: dark)");
let themePref="system"; try{themePref=localStorage.getItem(THEME_KEY)||"system"}catch(_){}
if(!THEMES.some(x=>x[0]===themePref)) themePref="system";
$("themesRow").onclick=()=>{
  openSheet(`<div class="grab"></div><h3 style="margin-bottom:16px">Appearance</h3>${THEMES.map(t=>`<div class="opt ${themePref===t[0]?"on":""}" data-th="${t[0]}"><div class="m">${t[1]}<span>${t[2]}</span></div><span class="radio"></span></div>`).join("")}`);
  sheet.querySelectorAll("[data-th]").forEach(el=>el.onclick=()=>{setTheme(el.dataset.th);closeSheet()});
};
function applyTheme(){
  document.documentElement.dataset.theme=themePref==="system"?(darkMq.matches?"dark":"light"):themePref;
  $("themeLbl").textContent=THEMES.find(x=>x[0]===themePref)[1];
}
function setTheme(p){ if(!THEMES.some(x=>x[0]===p)) return; themePref=p; try{localStorage.setItem(THEME_KEY,p)}catch(_){} applyTheme(); show(curId); render(); }
darkMq.addEventListener("change",()=>{ if(themePref==="system"){applyTheme();show(curId);render();} });
applyTheme();

let tt;function toast(m){const t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),1900)}
$("q").oninput=render;
hydrate(); render(); drawCard(); payDraw(); show("home");
if(location.hash){const h=location.hash.slice(1); if($(h)&&$(h).classList.contains("screen")) show(h);}
