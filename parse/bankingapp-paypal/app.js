/* Назва бренду-плейсхолдера — міняється тут в одному місці */
const BRAND="PayPal";

const $=id=>document.getElementById(id);
const J=window.jit||(v=>v), PF=window.PROFILE||{full:"Alex Morgan",user:"alexmorgan"};
/* суми унікалізуються на $1–2 при кожному заході (profile.js) */
let balance=J(2486.32), savings=J(20522.55), btcUsd=J(899.38), goal=100000, hidden=false;
const BTC_RATE=70761.15;
/* ---------- валюта: перемикач у Send або ?currency=usd|cad|gbp у URL ---------- */
const CURS={
  usd:{c:"USD",s:"$",f:"us",n:"US Dollar"},
  cad:{c:"CAD",s:"$",f:"ca",n:"Canadian Dollar"},
  gbp:{c:"GBP",s:"£",f:"gb",n:"British Pound"},
};
/* валюта кешується: при повторному заході без ?currency= береться остання */
const CUR_KEY="pp-cur";
let curK=(new URLSearchParams(location.search).get("currency")||"").toLowerCase();
if(!CURS[curK]){try{curK=localStorage.getItem(CUR_KEY)||""}catch(_){}}
if(!CURS[curK]) curK="usd";
try{localStorage.setItem(CUR_KEY,curK)}catch(_){}
let CUR=CURS[curK];
const money=(v,d=2)=>CUR.s+v.toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d});
const fmt=v=>(v<0?"−":"+")+money(Math.abs(v));
const ic=(n,st="")=>`<i class="i" ${st?`style="${st}"`:""}><svg><use href="#i-${n}"/></svg></i>`;
const hydrate=(root=document)=>root.querySelectorAll("[data-i]").forEach(e=>{e.innerHTML=`<svg><use href="#i-${e.dataset.i}"/></svg>`;e.removeAttribute("data-i")});
document.querySelectorAll(".brandname").forEach(e=>e.textContent=BRAND);

/* ---------- заборона зуму ---------- */
["gesturestart","gesturechange","gestureend"].forEach(t=>document.addEventListener(t,e=>e.preventDefault(),{passive:false}));
document.addEventListener("touchmove",e=>{if(e.touches.length>1)e.preventDefault()},{passive:false});
document.addEventListener("wheel",e=>{if(e.ctrlKey)e.preventDefault()},{passive:false});
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&["+","-","=","0"].includes(e.key))e.preventDefault()});

/* ---------- data (та сама стрічка, що й у cashapp-версії, для чесного порівняння) ---------- */
const B=s=>"img/brands/"+s;
let OF=window.OFFER||{n:"Freecash",l:"img/offers/freecash.png"};
let inN=0;
/* o — порядковий номер надходження, b — стандартна сума (для перемикання офера) */
const IN=(v,d)=>{const k=inN++;return {n:OF.n,l:OF.l,o:k,b:v,v:(OF.amounts&&OF.amounts[k]!=null)?OF.amounts[k]:v,d}};
const tx=[
  {n:"Starbucks",v:-6.45,l:B("starbucks.png"),d:0},IN(87.43,0),
  {n:"McDonald's",v:-11.87,l:B("mcdonalds.svg"),d:0},{n:"Shell",v:-38.62,l:B("shell.png"),d:0},
  {n:"Walmart Supercenter",v:-64.31,l:B("walmart.png"),d:1},{n:"Uber",v:-17.48,l:B("uber.png"),d:1},
  IN(118.62,1),{n:"Dunkin'",v:-4.29,l:B("dunkin.png"),d:1},
  {n:"Netflix",v:-15.49,l:B("netflix.svg"),d:2},{n:"Chipotle",v:-13.65,l:B("chipotle.png"),d:2},
  {n:"Wendy's",v:-8.17,l:B("wendys.png"),d:2},
  IN(52.17,3),{n:"Kroger",v:-47.92,l:B("kroger.png"),d:3},
  {n:"Starbucks",v:-7.25,l:B("starbucks.png"),d:3},IN(64.89,3),
  {n:"Amazon",v:-29.99,l:B("amazon.svg"),d:4},{n:"Taco Bell",v:-9.38,l:B("tacobell.svg"),d:4},
  {n:"Spotify",v:-11.99,l:B("spotify.png"),d:5},{n:"Target",v:-36.74,l:B("target.png"),d:5},
  IN(138.26,5),{n:"Chevron",v:-42.15,l:B("chevron.png"),d:5},
  {n:"McDonald's",v:-8.59,l:B("mcdonalds.svg"),d:6},{n:"Chick-fil-A",v:-12.63,l:B("chickfila.png"),d:6},
  {n:"Trader Joe's",v:-53.08,l:B("traderjoes.png"),d:7},IN(76.54,7),
  {n:"Starbucks",v:-5.95,l:B("starbucks.png"),d:7},{n:"DoorDash",v:-27.41,l:B("doordash.svg"),d:8},
  {n:"Lyft",v:-14.22,l:B("lyft.png"),d:8},IN(109.31,9),
  {n:"Whole Foods Market",v:-71.56,l:B("wholefoods.png"),d:9},{n:"Wendy's",v:-10.47,l:B("wendys.png"),d:9},
];
tx.forEach(t=>t.v=J(t.v));
const txIc=t=>t.l?`<img src="${t.l}" alt="">`:(t.e||"");
const recips=[["Jamie Lee","#0b3bd6","JL","@jamielee"],["Sam Rivera","#d6336c","SR","@samr"],["Taylor Kim","#7048e8","TK","@taylork"],["Jordan Blake","#0ca678","JB","@jblake"],["Vincent Cole","#f08c00","VC","@vcole"],["Mia Torres","#1c7ed6","MT","@miat"]];
const goals=[{n:"Emergency fund",img:"img/bag.svg",pct:null},{n:"Gifts",img:"img/gift.svg",pct:66,amt:1000},{n:"Rainy day",img:"img/umbrella.svg",pct:25,amt:500}];
const rOffers=[["Starbucks","5% back",B("starbucks.png")],["Walmart","3% back",B("walmart.png")],["DoorDash","$5 back",B("doordash.svg")],["Target","4% back",B("target.png")],["Uber","2% back",B("uber.png")]];
/* пропозиції на головній: [назва, кешбек, лого] */
const hOffers=[["Walmart","3% back",B("walmart.png")],["Target","4% back",B("target.png")],["Starbucks","5% back",B("starbucks.png")],["Amazon","2% back",B("amazon.svg")],["DoorDash","$5 back",B("doordash.svg")],["Chipotle","6% back",B("chipotle.png")],["Uber","2% back",B("uber.png")],["Kroger","3% back",B("kroger.png")]];
/* лого з власним квадратним фоном — заповнюють коло повністю, без білої рамки */
const FULL=/(target|starbucks|kroger|amazon|doordash|mcdonalds|netflix|tacobell|spotify)\./;
const subs=[["Netflix",15.49,B("netflix.svg"),12],["Spotify",11.99,B("spotify.png"),9],["DoorDash DashPass",9.99,B("doordash.svg"),21]];

/* ---------- charts ---------- */
function rng(seed){let s=seed;return()=>{s=(s*9301+49297)%233280;return s/233280}}
const sstep=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
function series(kind,seed,n=90){const r=rng(seed);let w=0;const a=[];
  for(let i=0;i<n;i++){const t=i/n;w=w*.88+(r()-.5)*.09;
    const base=kind==="btc"?.72-.46*sstep((t-.6)/.2)-.04*t:.95-.22*sstep(t/.14)-.34*t;a.push(base+w);}
  for(let k=0;k<2;k++) for(let i=1;i<n-1;i++) a[i]=(a[i-1]+a[i]*2+a[i+1])/4;
  return a;}
function path(a,w,h){const mn=Math.min(...a),mx=Math.max(...a);
  const p=a.map((v,i)=>[i/(a.length-1)*w,h-(v-mn)/(mx-mn||1)*h*.88-h*.06]);
  let d=`M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for(let i=0;i<p.length-1;i++){const p0=p[i-1]||p[i],p1=p[i],p2=p[i+1],p3=p[i+2]||p2;
    d+=` C${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)} ${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)} ${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;}
  return {d,last:p[p.length-1]};}
function draw(el,kind,seed,w=300,h=100){const {d}=path(series(kind,seed),w,h);
  $(el).innerHTML=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="${d} L${w} ${h} L0 ${h}Z" fill="currentColor" opacity=".08"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;}
function ring(size,sw,frac){const r=(size-sw)/2,c=2*Math.PI*r;
  return `<svg viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="${sw}"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--acc)" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${c*frac} ${c}" transform="rotate(-90 ${size/2} ${size/2})"/></svg>`;}

/* ---------- rows ---------- */
const dstr=(d,o={month:"short",day:"numeric"})=>{const t=new Date();t.setDate(t.getDate()-d);return t.toLocaleDateString("en-US",o)};
const dgrp=d=>d===0?"Today":d===1?"Yesterday":dstr(d,{weekday:"long",month:"short",day:"numeric"});
const kindOf=t=>t.v>0?"Money received":t.k||"Payment";
const row=t=>`<div class="tx" data-t="${tx.indexOf(t)}"><div class="ic${t.l?" logo":""}">${txIc(t)}</div><div class="m"><b>${t.n}</b><span>${dstr(t.d)} • ${kindOf(t)}</span></div><div class="v ${t.v>0?"p":"n"}">${fmt(t.v)}</div></div>`;
const mask=s=>hidden?CUR.s+"••••••":s;
const curTxt=s=>s.replace("$",CUR.s);
let filt="all";
/* Activity: групування по місяцях, як у PayPal — заголовок місяця + круглі кнопки фільтра/пошуку */
const ahdBtns=()=>`<button class="cb rb${filt!=="all"?" on":""}" id="aFilt" aria-label="Filter">${ic("filter")}</button><button class="cb rb" data-go="search" data-push aria-label="Search">${ic("search")}</button>`;
function grouped(list){let out="",cur=null,first=true;
  list.forEach(t=>{const m=dstr(t.d,{month:"long"});
    if(m!==cur){if(cur!==null)out+=`</div>`;cur=m;
      out+=`<div class="ahd"><h2>${m}</h2>${first?`<div class="ahb">${ahdBtns()}</div>`:""}</div><div class="alst">`;first=false;}
    out+=row(t);});
  if(cur===null) out=`<div class="ahd"><h2>${dstr(0,{month:"long"})}</h2><div class="ahb">${ahdBtns()}</div></div><p class="sm" style="text-align:center;margin-top:30px">No activity</p>`;
  else out+=`</div>`;
  return out;}
function filtSheet(){
  openSheet(`<div class="grab"></div><h3 style="margin-bottom:14px">Filter</h3>${[["all","All transactions"],["in","Money in"],["out","Money out"]].map(f=>`<div class="opt ${filt===f[0]?"on":""}" data-fs="${f[0]}"><div class="m">${f[1]}</div><span class="radio"></span></div>`).join("")}`);
  sheet.querySelectorAll("[data-fs]").forEach(el=>el.onclick=()=>{filt=el.dataset.fs;closeSheet();render()});
}
const avSq=(r,sz)=>`<div class="sq" style="background:${r[1]};width:${sz}px;height:${sz}px;font-size:${sz>50?20:sz<32?11:15}px">${r[2]}</div>`;
document.querySelectorAll(".plDue").forEach(e=>e.textContent=dstr(-16));

function render(){
  document.querySelectorAll("[data-m]").forEach(e=>e.textContent=money(+e.dataset.m));
  document.querySelectorAll(".curCode").forEach(e=>e.textContent=CUR.c);
  $("curChip").querySelector("use").setAttribute("href","#flag-"+CUR.f);
  $("mBal").textContent=mask(money(balance)); $("cBal").textContent=money(balance); $("wBal").textContent=money(balance);
  $("mSav").textContent=money(savings,0); $("mBtc").textContent=money(btcUsd);
  $("recent").innerHTML=tx.slice(0,4).map(row).join("");
  const fl=tx.filter(t=>filt==="all"||(filt==="in"?t.v>0:t.v<0));
  $("all").innerHTML=grouped(fl);
  const pq=$("pq").value.toLowerCase();
  const rc=recips.filter(r=>(r[0]+r[3]).toLowerCase().includes(pq));
  const linkRow=pq?"":`<div class="lrow" id="payLink"><div class="sq" style="background:#1f5eff">${ic("link")}</div><div class="m"><b>Send and request with a link</b><span>Share it over text, email, or any app.</span></div></div>`;
  $("contacts").innerHTML=linkRow+(rc.length?rc.map(r=>`<div class="lrow" data-r="${recips.indexOf(r)}">${avSq(r,44)}<div class="m"><b>${r[0]}</b><span>${r[3]}</span></div><i class="i info"><svg><use href="#i-info"/></svg></i></div>`).join(""):'<p class="sm" style="padding:18px 0;text-align:center">No contacts found</p>');
  $("hOffers").innerHTML=hOffers.map(o=>`<div class="of" data-go="rewards" data-push><i${FULL.test(o[2])?' class="full"':""}><img src="${o[2]}" alt=""></i><b>${o[0]}</b><span>${curTxt(o[1])}</span><span>Pay Later</span></div>`).join("");
  $("subs").innerHTML=subs.map(s=>`<div class="tx" style="cursor:default"><div class="ic logo"><img src="${s[2]}" alt=""></div><div class="m"><b>${s[0]}</b><span>Monthly · Next ${dstr(-s[3])}</span></div><div class="v">${money(s[1])}</div></div>`).join("");
  $("sAmt").textContent=money(savings);
  const rest=goals.slice(1).reduce((a,g)=>a+g.amt,0);
  $("goals").innerHTML=goals.map((g,i)=>{const amt=i?g.amt:savings-rest,frac=i?g.pct/100:savings/goal;
    return `<div class="lrow"><div class="ring">${ring(52,5,frac)}<span><img src="${g.img}" width="22" height="22" alt=""></span></div><div class="m"><b>${g.n}</b><span>${i?g.pct:Math.round(frac*100)}% of goal</span></div><b style="font-size:16px">${money(amt)}</b></div>`}).join("");
  $("sAct").innerHTML=[["Nov 1","Interest earned","+"+money(64.88)],["Oct 18","From balance","+"+money(720)]].map(r=>`<div class="lrow" style="cursor:default"><div class="ic">${ic("piggy")}</div><div class="m"><b>${r[1]}</b><span>${r[0]}</span></div><b class="up">${r[2]}</b></div>`).join("");
  $("bUsd").textContent=money(btcUsd); $("bSats").textContent=(btcUsd/BTC_RATE).toFixed(8)+" BTC";
  $("rOffers").innerHTML=rOffers.map(o=>`<div class="ofc"><div class="ic logo"><img src="${o[2]}" alt=""></div><b>${o[0]}</b><span>Online &amp; in store</span><div class="tag">${curTxt(o[1])}</div></div>`).join("");
  const q=$("q").value.toLowerCase();
  const m=q?tx.filter(t=>t.n.toLowerCase().includes(q)):[];
  $("sres").innerHTML=q?(m.length?`<div class="lst">${m.map(row).join("")}</div>`:'<p class="sm" style="text-align:center;margin-top:30px">No results</p>'):'<p class="sm" style="text-align:center;margin-top:30px">Search stores, activity and help</p>';
  draw("chB","btc",3);
}

/* ---------- navigation ---------- */
const noNav=["pick","buy","confirm","done","search"];
const tabOf={home:"home",balance:"home",savings:"home",crypto:"home",rewards:"home",send:"send",me:"me"};
const stack=[]; let curId="home";
function show(id){
  curId=id;
  document.querySelectorAll(".screen").forEach(s=>s.classList.toggle("on",s.id===id));
  if(tabOf[id]) document.querySelectorAll("nav .np button").forEach(b=>b.classList.toggle("on",b.dataset.go===tabOf[id]));
  $("nav").style.display=noNav.includes(id)?"none":"flex";
  document.querySelector("main").scrollTop=0;
}
function go(id,push){ if(push) stack.push(curId); else stack.length=0; show(id); }
function back(){ show(stack.pop()||"home"); }
function mePanel(p){
  document.querySelectorAll("#mchips .chip").forEach(c=>c.classList.toggle("on",c.dataset.p===p));
  document.querySelectorAll("#me .mp").forEach(x=>x.classList.toggle("on",x.id==="p-"+p));
}

document.addEventListener("click",e=>{
  if(e.target.closest(".sheet")) return;
  const g=e.target.closest("[data-go]"); if(g){ go(g.dataset.go,g.hasAttribute("data-push")); if(g.dataset.p) mePanel(g.dataset.p); return; }
  if(e.target.closest("[data-back]")){ back(); return; }
  const p=e.target.closest("#mchips [data-p]"); if(p){ mePanel(p.dataset.p); return; }
  const r=e.target.closest("[data-r]"); if(r){ pickRecipient(recips[+r.dataset.r]); return; }
  const t=e.target.closest(".tx[data-t]"); if(t){ openTx(tx[+t.dataset.t]); return; }
  if(e.target.closest("#aFilt")){ filtSheet(); return; }
  if(e.target.closest("#payLink")){ try{navigator.clipboard.writeText("https://example.com/"+PF.user)}catch(_){} toast("Payment link copied"); return; }
  if(e.target.closest(".bell")){ bellSheet(); return; }
});
document.querySelectorAll(".rng").forEach(box=>box.addEventListener("click",e=>{
  const b=e.target.closest("button"); if(!b) return;
  box.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));
  draw(box.dataset.chart,box.dataset.kind,[...box.children].indexOf(b)*11+3);
}));

/* ---------- sheets ---------- */
const sheet=$("sheet"),bg=$("bg");
const closeSheet=()=>{sheet.classList.remove("on");bg.classList.remove("on")};
const openSheet=(h,tall)=>{sheet.className="sheet on"+(tall?" tall":"");sheet.innerHTML=h;hydrate(sheet);bg.classList.add("on")};
bg.onclick=closeSheet;
function openTx(t){
  openSheet(`<div class="grab"></div><div class="ic${t.l?" logo":""}" style="width:64px;height:64px;font-size:28px;margin:0 auto 12px">${txIc(t)}</div><h3>${t.n}</h3>
  <div style="text-align:center;font-size:38px;font-weight:700;margin:6px 0 4px;color:${t.v>0?"var(--pos)":"var(--text)"}">${fmt(t.v)}</div>
  <div class="sm" style="text-align:center;margin-bottom:16px">${dstr(t.d,{month:"long",day:"numeric",year:"numeric"})}</div>
  <div class="lst" style="box-shadow:none">
  <div class="kv"><span>Status</span><b class="up">Completed</b></div>
  <div class="kv"><span>Type</span><b>${kindOf(t)}</b></div>
  <div class="kv"><span>${t.v>0?"Received in":"Paid with"}</span><b>${BRAND} balance</b></div>
  <div class="kv"><span>Transaction ID</span><b>${(7310000+tx.indexOf(t)*7919).toString(36).toUpperCase()}${String(48213+tx.indexOf(t)*137).padStart(6,"0")}</b></div></div>
  <button class="pill g" style="margin-top:14px">Get help</button>`);
}
function bellSheet(){
  document.querySelectorAll(".bell em").forEach(e=>e.remove());
  openSheet(`<div class="grab"></div><h3 style="margin-bottom:14px">Notifications</h3><div class="lst" style="box-shadow:none">
  <div class="lrow" style="cursor:default"><div class="sq" style="background:var(--text);color:var(--bg)">${ic("trophy")}</div><div class="m"><b>Your points are ready</b><span>Redeem 1,284 points for ${money(12.84)}</span></div></div>
  <div class="lrow" style="cursor:default"><div class="sq" style="background:#1f5eff">${ic("cal")}</div><div class="m"><b>Payment coming up</b><span>${money(143.2)} due ${dstr(-16)}</span></div></div></div>`);
}
function qrSvg(seed){const n=25,r=rng(seed);let s="";
  const fz=(x,y)=>(x<8&&y<8)||(x>n-9&&y<8)||(x<8&&y>n-9);
  for(let y=0;y<n;y++)for(let x=0;x<n;x++) if(!fz(x,y)&&r()>.5) s+=`M${x} ${y}h1v1h-1z`;
  const f=(x,y)=>`<rect x="${x+.5}" y="${y+.5}" width="6" height="6" fill="none" stroke="#000"/><rect x="${x+2}" y="${y+2}" width="3" height="3"/>`;
  return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><path d="${s}"/>${f(0,0)}${f(n-7,0)}${f(0,n-7)}</svg>`;}
function qrSheet(){
  openSheet(`<div class="grab"></div><h3>Your code</h3><div class="sm" style="text-align:center;margin-top:4px">Show it to get paid in person</div>
  <div class="qrbox">${qrSvg(17)}</div><div style="text-align:center;font-weight:700;margin-bottom:18px">@${PF.user}</div>
  <div class="btns"><button class="pill g" id="qrScan">Scan code</button><button class="pill" id="qrShare">Share</button></div>`);
  $("qrScan").onclick=()=>toast("Camera access is off"); $("qrShare").onclick=()=>toast("Link copied");
}
$("navQr").onclick=qrSheet; $("sQr").onclick=qrSheet;

/* add money / transfer */
let addAmt=0;
function addSheet(){ addAmt=0;
  openSheet(`<div class="grab"></div><h3>Add money</h3><div class="sm" style="text-align:center;margin-top:4px">${BRAND} balance ${money(balance)}</div>
  <div class="qa" id="qa">${[10,25,50,100,200,500].map(v=>`<button data-v="${v}">${money(v,0)}</button>`).join("")}</div>
  <div class="opt on"><div class="sq" style="background:#e5384f;width:40px;height:40px">${ic("bank")}</div><div class="m">Northwind Bank<span>Checking ••1567</span></div><span class="radio"></span></div>
  <button class="pill off" id="addGo" style="margin-top:6px">Add</button>`);
  $("qa").onclick=e=>{const b=e.target.closest("button[data-v]");if(!b)return;addAmt=+b.dataset.v;$("qa").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));$("addGo").classList.remove("off");$("addGo").textContent="Add "+money(addAmt,0)+" "+CUR.c+" Now"};
  $("addGo").onclick=()=>{balance+=addAmt;tx.unshift({n:"Northwind Bank",v:addAmt,e:ic("bank"),d:0,k:"Transfer from bank"});closeSheet();render();toast("Added "+money(addAmt,0))};
}
const wd={amt:100,instant:false};
function wdSheet(){
  openSheet(`<div class="grab"></div><h3>Transfer to bank</h3><div class="sm" style="text-align:center;margin-top:4px">Available ${money(balance)}</div>
  <div class="qa" id="wqa">${[50,100,250,500].map(v=>`<button data-v="${v}" class="${wd.amt===v?"on":""}">${money(v,0)}</button>`).join("")}<button data-v="${Math.floor(balance)}" class="${wd.amt===Math.floor(balance)?"on":""}" style="grid-column:span 2">All · ${money(Math.floor(balance),0)}</button></div>
  <div class="opt ${wd.instant?"":"on"}" id="wdStd"><div class="m">Standard<span>1–3 business days · Free</span></div><span class="radio"></span></div>
  <div class="opt ${wd.instant?"on":""}" id="wdIns"><div class="m">Instant ${ic("spark","vertical-align:-6px;color:var(--acc)")}<span>Within minutes · 1.75% fee</span></div><span class="radio"></span></div>
  <button class="pill" style="margin-top:8px" id="wdGo">Transfer ${money(wd.amt)}</button>`);
  $("wqa").onclick=e=>{const b=e.target.closest("button[data-v]");if(!b)return;wd.amt=+b.dataset.v;wdSheet()};
  $("wdStd").onclick=()=>{wd.instant=false;wdSheet()}; $("wdIns").onclick=()=>{wd.instant=true;wdSheet()};
  $("wdGo").onclick=()=>{const fee=wd.instant?Math.min(Math.max(wd.amt*.0175,.25),25):0;
    if(wd.amt+fee>balance){toast("Insufficient balance");return;}
    balance-=wd.amt+fee; tx.unshift({n:"Northwind Bank",v:-wd.amt,e:ic("bank"),d:0,k:"Transfer to bank"}); closeSheet(); render(); toast("Transferred "+money(wd.amt,0)); };
}
const wdOpen=()=>{wd.amt=Math.min(100,Math.floor(balance));wd.instant=false;wdSheet()};
$("addBtn").onclick=addSheet; $("addBtn2").onclick=addSheet; $("wdBtn").onclick=wdOpen; $("wdBtn2").onclick=wdOpen;

/* ---------- send / request: сума → контакт → review ---------- */
const pay={v:"0"}, buyA={v:"0"};
let to=null, pickFor=null;
const amtHtml=v=>`<sup>${CUR.s}</sup>${v}`;
function setCur(k){
  if(!CURS[k]) return;
  curK=k; CUR=CURS[k];
  try{const u=new URL(location.href);u.searchParams.set("currency",k);history.replaceState(null,"",u);localStorage.setItem("pp-q",u.search);localStorage.setItem(CUR_KEY,k)}catch(_){}
  $("payAmt").innerHTML=amtHtml(pay.v); $("buyAmt").innerHTML=amtHtml(buyA.v);
  render();
}
/* перемикач офера всередині апки (як валюта): міняє назву/лого/суми надходжень без перезавантаження */
function setOffer(id){
  const all=window.OFFERS_ALL||{}; if(!all[id]) return;
  OF={id,...all[id]};
  try{const u=new URL(location.href);u.searchParams.set("offer",id);history.replaceState(null,"",u);localStorage.setItem("pp-q",u.search);localStorage.setItem("pp-offer",id)}catch(_){}
  tx.forEach(t=>{if(t.o==null)return;t.n=OF.n;t.l=OF.l;t.v=J(OF.amounts&&OF.amounts[t.o]!=null?OF.amounts[t.o]:t.b)});
  render();
}
/* попап «Currency + Offer»: скролиться при будь-якій кількості пунктів */
$("curChip").onclick=()=>{
  const offs=Object.entries(window.OFFERS_ALL||{});
  openSheet(`<div class="grab"></div><h3 style="margin-bottom:14px">Currency</h3>${Object.entries(CURS).map(([k,c])=>`<div class="opt ${curK===k?"on":""}" data-cur="${k}"><svg class="flag" style="width:32px;height:32px;flex-shrink:0"><use href="#flag-${c.f}"/></svg><div class="m">${c.c}<span>${c.n}</span></div><span class="radio"></span></div>`).join("")}
  ${offs.length?`<h3 class="shd">Offer</h3>${offs.map(([k,o])=>`<div class="opt ${OF.id===k?"on":""}" data-off="${k}"><span class="olg"><img src="${o.l}" alt=""></span><div class="m">${o.n}<span>?offer=${k}</span></div><span class="radio"></span></div>`).join("")}`:""}`);
  sheet.querySelectorAll("[data-cur]").forEach(el=>el.onclick=()=>{setCur(el.dataset.cur);closeSheet()});
  sheet.querySelectorAll("[data-off]").forEach(el=>el.onclick=()=>{setOffer(el.dataset.off);closeSheet();toast("Offer: "+OF.n)});
};
function setWho(){
  $("who").innerHTML=to?`<div class="whochip">${avSq(to,28)}<span>${to[0]}</span><button id="whoX" aria-label="Remove">${ic("x")}</button></div>`:"";
  if(to) $("whoX").onclick=()=>{to=null;setWho()};
}
function openPick(kind,title){
  pickFor=kind; $("pickTtl").textContent=title; $("pq").value=""; render(); go("pick",true);
}
function startSend(kind){
  if(!parseFloat(pay.v)){toast("Enter an amount");return;}
  if(to){review(kind);return;}
  openPick(kind,kind==="Send"?"Send to":"Request from");
}
function pickRecipient(r){
  to=r; const k=pickFor; pickFor=null; back(); setWho();
  if(k) review(k);
}
$("sAgain").onclick=()=>openPick(null,"Send again");
$("sPool").onclick=()=>toast("Pools: collect money together with friends");
$("sMore").onclick=()=>{
  openSheet(`<div class="grab"></div><h3 style="margin-bottom:14px">More</h3>${[["link","Send or request with a link","Share it over text or any app"],["gift","Send a gift card","Delivered by email"],["qr","Scan or show code","Pay in person"]].map((r,i)=>`<div class="opt" data-mo="${i}"><div class="sq d" style="width:40px;height:40px">${ic(r[0])}</div><div class="m">${r[1]}<span>${r[2]}</span></div>${ic("chev").replace('class="i"','class="i cv"')}</div>`).join("")}`);
  sheet.querySelectorAll("[data-mo]").forEach(el=>el.onclick=()=>{const i=+el.dataset.mo; if(i===2){qrSheet();return;} closeSheet(); toast(i?"Gift cards coming soon":"Payment link copied")});
};
const amtTxt=()=>money(parseFloat(pay.v));
const pf={src:"bal",note:""};
const srcs=[
  {id:"bal",n:BRAND+" balance",s:()=>money(balance)+" available",i:'<div class="sq" style="width:40px;height:40px;background:#fff;display:grid;place-items:center"><img src="img/logo.png" width="26" height="26" alt="" style="object-fit:contain"></div>'},
  {id:"bank",n:"Northwind Bank",s:()=>"Checking ••1567",i:'<div class="sq" style="background:#e5384f;width:40px;height:40px">'+ic("bank")+'</div>'},
  {id:"cc",n:"Visa Credit ••0392",s:()=>"2.9% + "+money(.3)+" fee",i:'<img class="thumb" src="img/card-thumb.svg" alt="">'},
];
function review(kind){
  const isSend=kind==="Send";
  openSheet(`<div class="grab"></div><h3>${isSend?"Review and send":"Review request"}</h3>
  <div class="who" style="margin:16px 0 4px">${avSq(to,56)}<b>${to[0]}</b><span class="sm">${to[3]}</span></div>
  <div style="text-align:center;font-size:44px;font-weight:700;letter-spacing:-.02em;margin:6px 0 14px">${amtTxt()}</div>
  <input class="note" id="note" placeholder="Add a note" value="${pf.note}" autocomplete="off">
  ${isSend?`<div class="sm" style="font-weight:700;margin:4px 2px 8px;color:var(--text)">Pay with</div>${srcs.map(s=>`<div class="opt ${pf.src===s.id?"on":""}" data-s="${s.id}">${s.i}<div class="m">${s.n}<span>${s.s()}</span></div><span class="radio"></span></div>`).join("")}
  <div class="kv" style="font-size:14px"><span>Sending to a friend</span><b>No fee</b></div>`:""}
  <button class="pill" style="margin-top:10px" id="sendGo">${isSend?"Send Payment Now":"Request Now"}</button>`,true);
  $("note").oninput=e=>pf.note=e.target.value;
  sheet.querySelectorAll("[data-s]").forEach(el=>el.onclick=()=>{pf.src=el.dataset.s;review(kind)});
  $("sendGo").onclick=()=>doSend(kind);
}
function doSend(kind){
  const v=parseFloat(pay.v), first=to[0].split(" ")[0];
  if(kind==="Send"){ if(pf.src==="bal"&&v>balance){toast("Insufficient balance");return;}
    if(pf.src==="bal") balance-=v;
    tx.unshift({n:to[0],v:-v,e:`<span style="color:${to[1]};font-size:15px;font-weight:700">${to[2]}</span>`,d:0,k:"Sent"});
    $("dTitle").textContent="You sent "+money(v)+" to "+first;
    $("dSub").textContent="We'll let "+first+" know right away.";
  } else { $("dTitle").textContent="You requested "+money(v)+" from "+first; $("dSub").textContent="We'll notify you when they pay."; }
  pf.note=""; pay.v="0"; $("payAmt").innerHTML=amtHtml("0"); to=null; setWho();
  closeSheet(); render(); stack.length=0; show("done");
}
$("payBtn").onclick=()=>startSend("Send"); $("reqBtn").onclick=()=>startSend("Request");
$("pq").oninput=render;

/* ---------- accounts ---------- */
const linkSheet=()=>openSheet(`<div class="grab"></div><h3 style="margin-bottom:14px">Add banks and cards</h3>${[["card","Debit or credit card","Add instantly"],["bank","Bank account","Use your bank login or account number"]].map(r=>`<div class="opt"><div class="sq d" style="width:40px;height:40px">${ic(r[0])}</div><div class="m">${r[1]}<span>${r[2]}</span></div>${ic("chev").replace('class="i"','class="i cv"')}</div>`).join("")}`);
$("linkNew").onclick=linkSheet; $("banksTile").onclick=linkSheet;
$("hideBal").onclick=e=>{e.stopPropagation();hidden=!hidden;$("hideBal").innerHTML=`<i class="i"><svg><use href="#i-eye${hidden?"":"off"}"/></svg></i>`;render()};
$("planTg").onclick=()=>{$("planTg").classList.toggle("on");$("planBody").classList.toggle("on")};
$("plApply").onclick=()=>toast("You're prequalified — check your offer");
let shown=false,locked=false;
$("eye").onclick=()=>{shown=!shown;$("cnum").style.visibility=shown?"visible":"hidden"};
$("lockBtn").onclick=()=>{locked=!locked;$("vcard").classList.toggle("locked",locked);$("lockBtn").textContent=locked?"Unlock card":"Lock card";$("cstat").textContent=locked?"Card locked":"Debit •••• 4821";toast(locked?"Card locked":"Card unlocked")};
$("copyBtn").onclick=()=>{try{navigator.clipboard.writeText("5412 7700 1934 4821")}catch(e){}toast("Card number copied")};
$("rout").onclick=()=>toast("Routing number copied"); $("acct").onclick=()=>toast("Account number copied");
$("logout").onclick=()=>toast("Logged out (demo)");

/* ---------- themes ---------- */
/* вибір теми зберігається в localStorage ("pp-theme": light | dark | system); стартове застосування — в <head> index.html */
const THEME_KEY="pp-theme", THEMES=[["light","Light","Always light"],["dark","Dark","Always dark"],["system","System","Match your phone's setting"]];
const darkMq=matchMedia("(prefers-color-scheme: dark)");
/* за замовчуванням — як у телефоні (світла, якщо телефон не в темному режимі); ручний вибір зберігається і має пріоритет */
let themePref="system"; try{themePref=localStorage.getItem(THEME_KEY)||"system"}catch(_){}
if(!THEMES.some(x=>x[0]===themePref)) themePref="system";
const openThemes=()=>{
  openSheet(`<div class="grab"></div><h3 style="margin-bottom:18px">Appearance</h3>${THEMES.map(t=>`<div class="opt ${themePref===t[0]?"on":""}" data-th="${t[0]}"><div class="m">${t[1]}<span>${t[2]}</span></div><span class="radio"></span></div>`).join("")}`);
  sheet.querySelectorAll("[data-th]").forEach(el=>el.onclick=()=>{setTheme(el.dataset.th);closeSheet()});
};
$("themesRow").onclick=openThemes; $("themesRow2").onclick=openThemes;
function applyTheme(){
  const t=themePref==="system"?(darkMq.matches?"dark":"light"):themePref;
  document.documentElement.dataset.theme=t;
  document.querySelector("meta[name=theme-color]").content=t==="dark"?"#000000":"#f0f1f7";
  const lbl=THEMES.find(x=>x[0]===themePref)[1];
  $("themeLbl").textContent=lbl; $("themeLbl2").textContent=lbl;
}
function setTheme(p){ if(!THEMES.some(x=>x[0]===p)) return; themePref=p; try{localStorage.setItem(THEME_KEY,p)}catch(_){} applyTheme(); render(); }
darkMq.addEventListener("change",()=>{ if(themePref==="system"){applyTheme();render();} });
applyTheme();

/* ---------- keypads ---------- */
function keypad(el,o,out){
  ["1","2","3","4","5","6","7","8","9",".","0","‹"].forEach(k=>{
    const b=document.createElement("button");
    if(k==="‹"){b.innerHTML=ic("del");b.setAttribute("aria-label","Delete");} else b.textContent=k;
    b.onclick=()=>{ if(k==="‹") o.v=o.v.length>1?o.v.slice(0,-1):"0";
      else if(k==="."){ if(!o.v.includes(".")) o.v+="."; }
      else if(!(o.v.includes(".")&&o.v.split(".")[1].length>=2)) o.v=o.v==="0"?k:o.v+k;
      if(o.v.replace(".","").length>7) o.v=o.v.slice(0,-1);
      $(out).innerHTML=amtHtml(o.v); };
    $(el).appendChild(b);});
}
keypad("pad",pay,"payAmt"); keypad("bpad",buyA,"buyAmt");

/* ---------- crypto buy ---------- */
let order={};
$("bBuy").onclick=()=>{ buyA.v="0"; $("buyAmt").innerHTML=amtHtml("0"); go("buy",true); };
$("buyNext").onclick=()=>{
  const a=parseFloat(buyA.v); if(!a){toast("Enter an amount");return;} if(a>balance){toast("Insufficient balance");return;}
  const fee=Math.max(a*0.018,0.49), net=a-fee, btc=net/BTC_RATE; order={a,fee,net,btc};
  $("cTitle").textContent="Buy "+money(a)+" of Bitcoin";
  $("cKv").innerHTML=[["Pay with",BRAND+" balance"],["Bitcoin price",money(BTC_RATE)],["You get",btc.toFixed(8)+" BTC"],["Purchase amount",money(net)],["Fee",money(fee)],["Total",money(a)]]
    .map(r=>`<div class="kv"><span>${r[0]}</span><b>${r[1]}</b></div>`).join("");
  stack.push("buy"); show("confirm");
};
$("cGo").onclick=()=>{
  balance-=order.a; btcUsd+=order.net;
  tx.unshift({n:"Bitcoin",v:-order.a,e:ic("btc"),d:0,k:"Crypto purchase"});
  $("dTitle").textContent="You bought "+order.btc.toFixed(8)+" BTC"; $("dSub").textContent="It's in your crypto holdings now.";
  render(); stack.length=0; show("done");
};

/* ---------- savings / rewards ---------- */
$("tin").onclick=()=>{ if(balance<100){toast("Insufficient balance");return;} balance-=100; savings+=100; render(); toast("Moved "+money(100,0)+" to Savings"); };
$("tout").onclick=()=>{ if(savings<100){toast("Not enough in Savings");return;} savings-=100; balance+=100; render(); toast("Moved "+money(100,0)+" to balance"); };
$("redeem").onclick=()=>toast("Points redeemed");

/* ---------- misc ---------- */
$("q").oninput=render;
let tt;function toast(m){const t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),1800)}
hydrate(); render();
$("payAmt").innerHTML=amtHtml(pay.v); $("buyAmt").innerHTML=amtHtml(buyA.v);
if(location.hash){const h=location.hash.slice(1),p=h.split("/");
  if($(p[0])&&$(p[0]).classList.contains("screen")){show(p[0]); if(p[0]==="me"&&p[1]) mePanel(p[1]);}}
