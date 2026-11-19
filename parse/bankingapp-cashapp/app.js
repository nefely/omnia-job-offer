const $=id=>document.getElementById(id);
const J=window.jit||(v=>v);
/* суми унікалізуються на $1–2 при кожному заході (profile.js) */
let balance=J(2486.32), savings=J(20522.55), btcUsd=J(899.38), goal=100000, hidden=false;
const BTC_RATE=70761.15;
/* ---------- валюта: перемикач у Pay або ?currency=usd|cad|gbp у URL ---------- */
const CURS={
  usd:{c:"USD",s:"$",f:"us",n:"US Dollar"},
  cad:{c:"CAD",s:"$",f:"ca",n:"Canadian Dollar"},
  gbp:{c:"GBP",s:"£",f:"gb",n:"British Pound"},
};
/* валюта кешується: при повторному заході без ?currency= береться остання */
const CUR_KEY="ca-cur";
let curK=(new URLSearchParams(location.search).get("currency")||"").toLowerCase();
if(!CURS[curK]){try{curK=localStorage.getItem(CUR_KEY)||""}catch(_){}}
if(!CURS[curK]) curK="usd";
try{localStorage.setItem(CUR_KEY,curK)}catch(_){}
let CUR=CURS[curK];
const curTxt=s=>s.replace("$",CUR.s);
const money=(v,d=2)=>CUR.s+v.toLocaleString("en-US",{minimumFractionDigits:d,maximumFractionDigits:d});
const fmt=v=>(v<0?"−":"+")+money(Math.abs(v));
const ic=(n,st="")=>`<i class="i" ${st?`style="${st}"`:""}><svg><use href="#i-${n}"/></svg></i>`;
const hydrate=(root=document)=>root.querySelectorAll("[data-i]").forEach(e=>{e.innerHTML=`<svg><use href="#i-${e.dataset.i}"/></svg>`;e.removeAttribute("data-i")});

/* ---------- заборона зуму ---------- */
["gesturestart","gesturechange","gestureend"].forEach(t=>document.addEventListener(t,e=>e.preventDefault(),{passive:false}));
document.addEventListener("touchmove",e=>{if(e.touches.length>1)e.preventDefault()},{passive:false});
document.addEventListener("wheel",e=>{if(e.ctrlKey)e.preventDefault()},{passive:false});
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&["+","-","=","0"].includes(e.key))e.preventDefault()});

/* ---------- data ---------- */
/* надходження: від активного оффера (offers.js), $50–150, не більше 2 на день; витрати: реальні бренди з лого, суми з центами */
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
const stocks=[
  {n:"Roblox",pct:20.05,val:2.04,ret:1.11,l:"R",bg:"#e0262d"},
  {n:"Crocs",pct:-0.91,val:1.88,ret:-0.20,l:"C",bg:"#3aa141"},
  {n:"Apple",pct:-1.35,val:2.40,ret:0.35,l:"●",bg:"#fff",dark:true},
  {n:"SPDR S&P 500",pct:-1.56,val:10.18,ret:0.18,l:"ETF",bg:"#00C244"},
  {n:"Vanguard S&P 500 ETF",pct:-1.56,val:10.18,ret:0.31,l:"ETF",bg:"#00C244"},
  {n:"Invesco QQQ Trust, Series 1",pct:-2.12,val:11.16,ret:1.09,l:"ETF",bg:"#00C244"},
];
const people=[["Vincent","#3b5bff"],["Jaylen","#34e0b0"],["TA","#ffb400"],["Jasmynn","#ff6bb5"],["Mibral","#7c5cff"]];
const offers=[["Northwind Outlet","15% off","#ff7a00","N"],["Step & Co","10% off","#fff","S"],["Brew House","5% off","#0a7a4b","B"],["ShopMart","4% off","#3b5bff","S"]];
const stories=[{n:"New",e:"+",bg:"#00C244",go:"pay"},{n:OF.n,l:OF.l},{n:"Starbucks",l:B("starbucks.png")},{n:"McDonald's",l:B("mcdonalds.svg")},{n:"Uber",l:B("uber.png")},{n:"Walmart",l:B("walmart.png")}];
const goals=[{n:"Savings",img:"img/bag.svg",pct:null},{n:"Gifts",img:"img/gift.svg",pct:66,amt:1000},{n:"Rainy day",img:"img/umbrella.svg",pct:25,amt:500}];
const recips=[["Jamie Lee","#12AFF8","J"],["Family group","#00C244",""],["Sam Rivera","#ff6bb5","S"],["Taylor Kim","#7c5cff","T"],["Jordan Blake","#3b5bff","J"]];

/* ---------- charts ---------- */
function rng(seed){let s=seed;return()=>{s=(s*9301+49297)%233280;return s/233280}}
const sstep=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
function series(kind,seed,n=90){const r=rng(seed);let w=0;const a=[];
  for(let i=0;i<n;i++){const t=i/n;
    w=w*.88+(r()-.5)*.09;
    const base=kind==="btc"?.72-.46*sstep((t-.6)/.2)-.04*t:.95-.22*sstep(t/.14)-.34*t;
    a.push(base+w);}
  for(let k=0;k<2;k++) for(let i=1;i<n-1;i++) a[i]=(a[i-1]+a[i]*2+a[i+1])/4;
  return a;}
function path(a,w,h){const mn=Math.min(...a),mx=Math.max(...a);
  const p=a.map((v,i)=>[i/(a.length-1)*w,h-(v-mn)/(mx-mn||1)*h*.88-h*.06]);
  let d=`M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for(let i=0;i<p.length-1;i++){
    const p0=p[i-1]||p[i],p1=p[i],p2=p[i+1],p3=p[i+2]||p2;
    d+=` C${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)} ${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)} ${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;}
  return d;}
function draw(el,kind,seed,w=300,h=100){
  $(el).innerHTML=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="${path(series(kind,seed),w,h)}" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;}
function ring(size,sw,frac){const r=(size-sw)/2,c=2*Math.PI*r;
  return `<svg viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="${sw}"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#00D64F" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${c*frac} ${c}" transform="rotate(-90 ${size/2} ${size/2})"/></svg>`;}

/* ---------- rows ---------- */
const card='<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M3 10h18"/></svg>';
const dstr=d=>{const t=new Date();t.setDate(t.getDate()-d);return t.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})};
const row=(t,i)=>`<div class="tx" data-i="${i}"><div class="ic${t.l?" logo":""}">${txIc(t)}</div><div class="m"><b>${t.n}</b><span>${card}${t.v>0?"Money received":"Payment sent"}</span><span class="dt">${dstr(t.d)}</span></div><div class="v ${t.v>0?"p":"n"}">${fmt(t.v)}</div></div>`;
const stIc=(s,sz=48)=>`<div class="sq" style="background:${s.bg};color:${s.dark?"#000":"#fff"};width:${sz}px;height:${sz}px;font-size:${s.l.length>1?12:18}px">${s.l}</div>`;
const mask=s=>hidden?CUR.s+"••••":s;

function render(){
  document.querySelectorAll("[data-m]").forEach(e=>e.textContent=money(+e.dataset.m,e.dataset.d?+e.dataset.d:2));
  document.querySelectorAll(".curCode").forEach(e=>e.textContent=CUR.c);
  document.querySelectorAll(".curSym").forEach(e=>e.textContent=CUR.s);
  $("curChip").querySelector("use").setAttribute("href","#flag-"+CUR.f);
  $("mBal").textContent=mask(money(balance)); $("navBal").textContent=CUR.s+Math.floor(balance); $("cBal").textContent=money(balance);
  $("mSav").textContent=money(savings); $("mBtc").textContent=money(btcUsd);
  draw("spB","btc",3,120,56); draw("spS","down",7,120,56);
  $("stories").innerHTML=stories.map(x=>`<div class="st" ${x.go?`data-go="${x.go}"`:""}><i style="background:${x.l?"#fff":x.bg};overflow:hidden">${x.l?`<img src="${x.l}" alt="" style="width:100%;height:100%;object-fit:contain">`:x.e}</i>${x.n}</div>`).join("");
  $("all").innerHTML=tx.map(row).join("");
  $("people").innerHTML=people.map(p=>`<div class="st"><i style="background:${p[1]}">${p[0][0]}</i>${p[0]}</div>`).join("");
  $("offers").innerHTML=offers.map(o=>`<div class="lrow"><div class="sq" style="width:54px;height:54px;background:${o[2]};color:${o[2]==="#fff"?"#000":"#fff"}">${o[3]}</div><div class="m"><b>${o[0]}</b><span>${o[1]}</span></div></div>`).join("");
  $("spend").textContent=money(tx.filter(t=>t.v<0).reduce((a,t)=>a-t.v,0),0)+" this month";
  $("sOwned").innerHTML=stocks.map((s,i)=>`<div class="lrow" data-st="${i}" style="padding:12px 0">${stIc(s)}<div class="m"><b style="font-size:16px">${s.n}</b></div><span class="pillv">${s.ret>=0?"+":"−"} ${money(Math.abs(s.ret))}</span></div>`).join("");
  $("sAmt").textContent=money(savings);
  const rest=goals.slice(1).reduce((a,g)=>a+g.amt,0);
  $("goals").innerHTML=goals.map((g,i)=>{const amt=i?g.amt:savings-rest, frac=i?g.pct/100:savings/goal;
    return `<div class="lrow"><div class="ring">${ring(56,5,frac)}<span><img src="${g.img}" width="26" height="26" alt=""></span></div><div class="m"><b>${g.n}</b>${i?`<span>${g.pct}% complete</span>`:""}</div><b style="font-size:17px;font-weight:600">${money(amt)}</b></div>`}).join("");
  $("sAct").innerHTML=[["Nov 1","Estimated interest","+ "+money(77.12)],["Oct 18","Cash balance",money(720,0)]].map(r=>`<div class="lrow" style="cursor:default"><div class="sq" style="background:#00C244;width:40px;height:40px">${CUR.s}</div><div class="m"><b style="font-size:16px">${r[0]}</b><span>${r[1]}</span></div><b style="color:var(--muted);font-weight:500">${r[2]}</b></div>`).join("");
  $("bSats").textContent="₿"+Math.round(btcUsd/BTC_RATE*1e8).toLocaleString("en-US");
  $("bUsd").innerHTML=money(btcUsd)+" "+CUR.c+" "+ic("swap","vertical-align:-5px");
  const q=$("q").value.toLowerCase();
  $("disc").style.display=q?"none":"block";
  const m=tx.map((t,i)=>[t,i]).filter(([t])=>t.n.toLowerCase().includes(q));
  $("sres").innerHTML=q?(m.length?m.map(([t,i])=>row(t,i)).join(""):'<p class="sm" style="text-align:center;margin-top:30px">No results</p>'):"";
  draw("chB","btc",3); draw("chS","down",7);
}

/* ---------- navigation ---------- */
const noNav=["buy","confirm","done","profile","search","green","banks","pin"];
const tabOf={money:"money",cash:"money",savings:"money",btc:"money",stocks:"money",stock:"money",card:"money",pay:"pay",activity:"activity"};
const stack=[]; let curId="money";
function show(id){
  curId=id;
  document.querySelectorAll(".screen").forEach(s=>s.classList.toggle("on",s.id===id));
  if(tabOf[id]) document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.go===tabOf[id]));
  $("nav").style.display=noNav.includes(id)?"none":"flex";
  document.documentElement.classList.toggle("paytab",id==="pay");
  document.querySelector("main").scrollTop=0;
}
function go(id,push){ if(push) stack.push(curId); else stack.length=0; show(id); }
function back(){ show(stack.pop()||"money"); }

document.addEventListener("click",e=>{
  const g=e.target.closest("[data-go]"); if(g){ go(g.dataset.go,g.hasAttribute("data-push")); return; }
  if(e.target.closest("[data-back]")){ back(); return; }
  const st=e.target.closest("[data-st]"); if(st){ openStock(+st.dataset.st); return; }
  const r=e.target.closest(".tx"); if(r){ openTx(tx[r.dataset.i]); }
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
  openSheet(`<div class="grab"></div><div class="ic${t.l?" logo":""}" style="width:64px;height:64px;font-size:30px;border-radius:20px;margin:0 auto 12px">${txIc(t)}</div><h3>${t.n}</h3>
  <div style="text-align:center;font-size:40px;font-weight:600;margin:6px 0 18px;color:${t.v>0?"var(--pos)":"var(--text)"}">${fmt(t.v)}</div>
  <div class="kv"><span>Status</span><b>Completed</b></div>
  <div class="kv"><span>Type</span><b>${t.v>0?"Money received":"Payment sent"}</b></div>
  <div class="kv"><span>Date</span><b>${dstr(t.d)}</b></div>
  <div class="kv"><span>Account</span><b>Cash App Cash</b></div>
  <div class="kv"><span>Reference</span><b>CASHAPP-${String(1000+tx.indexOf(t)*137).padStart(6,"0")}</b></div>`);
}

/* add money */
let addAmt=0;
$("addBtn").onclick=()=>{ addAmt=0;
  openSheet(`<div class="grab"></div><h3>Add money</h3><div class="sm" style="text-align:center;margin-top:4px">Cash balance ${money(balance)}</div>
  <div class="qa" id="qa">${[10,25,50,100,200].map(v=>`<button data-v="${v}">${money(v,0)}</button>`).join("")}<button>•••</button></div>
  <div class="flex" style="margin:6px 0 16px"><span style="display:flex;align-items:center;gap:10px"><span class="sm" style="color:var(--text)">From</span><span style="width:46px;height:30px;border-radius:6px;background:linear-gradient(135deg,#e9edf0,#b9c2c9)"></span><span style="font-weight:500;font-size:14px">Cash App Bank debit ••4821</span></span>${ic("chev").replace('class="i"','class="i cv"')}</div>
  <button class="pill w off" id="addGo">Add</button>`);
  $("qa").onclick=e=>{const b=e.target.closest("button[data-v]");if(!b)return;addAmt=+b.dataset.v;$("qa").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));$("addGo").classList.remove("off");$("addGo").textContent="Add "+money(addAmt,0)};
  $("addGo").onclick=()=>{balance+=addAmt;tx.unshift({n:"Added money",v:addAmt,e:"🏦",d:0});closeSheet();render();toast("Added "+money(addAmt,0))};
};

/* withdraw */
const wd={amt:100,instant:false,keys:{v:"0"}};
function wdSheet(){
  const fee=wd.instant?0.25:0;
  openSheet(`<div class="grab"></div><h3>Withdraw</h3><div class="sm" style="text-align:center;margin-top:4px">Cash balance ${money(balance,0)}</div>
  <div style="text-align:center;font-size:64px;font-weight:600;letter-spacing:-.03em;margin:30px 0 14px">${money(wd.amt)}</div>
  <div style="text-align:center;margin-bottom:26px"><span class="chip" id="wdChange">Change amount</span></div>
  <div class="flex" style="margin-bottom:18px"><span style="display:flex;align-items:center;gap:10px"><span class="sm" style="color:var(--text)">To</span><span style="width:46px;height:30px;border-radius:6px;background:linear-gradient(135deg,#e9edf0,#b9c2c9)"></span><span style="font-weight:500;font-size:14px">Cash App Bank debit ••4821</span></span>${ic("chev").replace('class="i"','class="i cv"')}</div>
  <div class="opt ${wd.instant?"":"on"}" id="wdStd">Standard (Wednesday)<span class="radio"></span></div>
  <div class="opt ${wd.instant?"on":""}" id="wdIns"><span>Instant ${ic("bolt","vertical-align:-5px")}</span><span style="display:flex;align-items:center;gap:12px"><span class="sm" style="color:var(--muted)">${money(.25)} Fee</span><span class="radio"></span></span></div>
  <button class="pill w" style="margin-top:14px;padding:18px" id="wdGo">Withdraw</button>`);
  $("wdStd").onclick=()=>{wd.instant=false;wdSheet()}; $("wdIns").onclick=()=>{wd.instant=true;wdSheet()};
  $("wdChange").onclick=wdKeys;
  $("wdGo").onclick=()=>{ if(wd.amt+fee>balance){toast("Insufficient balance");return;} balance-=wd.amt+fee; tx.unshift({n:"Withdrawal",v:-wd.amt,e:"🏦",d:0}); closeSheet(); render(); toast("Withdrew "+money(wd.amt,0)); };
}
function wdKeys(){
  wd.keys.v=String(wd.amt);
  openSheet(`<div class="grab"></div><div class="flex"><button class="cb" id="wdBack" style="background:none">${ic("back")}</button><h3 style="flex:1">Withdraw</h3><span style="width:44px"></span></div>
  <div class="sm" style="text-align:center;margin-top:2px">Cash balance ${money(balance,0)}</div>
  <div style="text-align:center;font-size:64px;font-weight:600;letter-spacing:-.03em;margin:26px 0" id="wdAmtBig">${CUR.s}${wd.keys.v}</div>
  <button class="pill w" style="padding:18px;margin-bottom:10px" id="wdSave">Save</button><div class="pad" id="wdpad"></div>`);
  keypad("wdpad",wd.keys,"wdAmtBig");
  $("wdBack").onclick=wdSheet;
  $("wdSave").onclick=()=>{const v=parseFloat(wd.keys.v);if(v>0)wd.amt=v;wdSheet()};
}
$("wdBtn").onclick=()=>{wd.amt=Math.min(100,Math.floor(balance));wd.instant=false;wdSheet()};
$("wdRow").onclick=$("wdBtn").onclick;

/* pay flow */
const pf={kind:"Pay",name:"",note:"",src:"debit"};
const sources=[
  {id:"cash",n:"Cash balance",sub:()=>money(balance)+" available",ic:'<div class="sq" style="background:#00C244">$</div>',chip:"$ Cash balance"},
  {id:"debit",n:"Cash App debit ••4821",sub:()=>"No fee",ic:'<img class="thumb" src="img/card-thumb.svg" alt="">',chip:'<img src="img/card-thumb.svg" width="20" height="13" alt="">Cash App debit'},
  {id:"wallet",n:"Wallet Pay",sub:()=>"Use a debit card",ic:'<div class="sq d" style="font-size:12px">Pay</div>',chip:"Wallet Pay"},
  {id:"link",n:"Link credit card",sub:()=>"3% fee",ic:'<div class="sq d">'+ic("plus")+'</div>',chip:""},
];
const amtTxt=()=>{const v=parseFloat(pay.v);return money(v,v%1?2:0)};
const avSq=(r,sz)=>`<div class="sq" style="background:${r[1]};width:${sz}px;height:${sz}px;color:#fff;font-size:${sz>40?16:12}px">${r[2]||ic("family")}</div>`;
const cvI=()=>ic("chev").replace('class="i"','class="i cv"');
function payTo(kind){
  if(!parseFloat(pay.v)){toast("Enter an amount");return;}
  pf.kind=kind;pf.note="";pf.name="";
  if(kind==="Pay") pickRecip(); else noteStep();
}
function pickRecip(){
  openSheet(`<div class="grab"></div><div class="flex" style="margin-bottom:12px"><button class="cb" id="ptX" style="background:none;margin-left:-8px">${ic("x")}</button></div>
  <h1 style="font-size:32px;font-weight:600;margin-bottom:18px">${pf.kind} ${amtTxt()} <span style="color:var(--muted)">${pf.kind==="Pay"?"to":"from"}</span></h1>
  <div class="flex" style="margin-bottom:12px"><div class="search" style="display:flex;align-items:center;gap:10px;color:var(--muted)">${ic("search")}<span>Name, $cashtag, email, phone, USDC</span></div>${ic("qr")}</div>
  ${recips.map((r,i)=>`<div class="lrow" data-r="${i}" style="padding:12px 0">${avSq(r,52)}<div class="m"><b style="font-size:16px">${r[0]}</b></div></div>`).join("")}`,true);
  $("ptX").onclick=closeSheet;
  sheet.querySelectorAll("[data-r]").forEach(el=>el.onclick=()=>{pf.name=recips[+el.dataset.r][0]; if(pf.kind==="Pay") noteStep(); else {closeSheet();doSend("Request",pf.name);}});
}
function noteStep(){
  const isPay=pf.kind==="Pay", r=recips.find(x=>x[0]===pf.name), src=sources.find(s=>s.id===pf.src);
  openSheet(`<div class="grab"></div><div class="flex" style="margin-bottom:10px"><button class="cb" id="nBack" style="background:none;margin-left:-8px">${ic("back")}</button></div>
  <h1 style="font-size:32px;font-weight:600;line-height:1.3">${pf.kind} ${amtTxt()} ${isPay&&r?`<span style="color:var(--muted)">to</span><br><span style="display:inline-flex;align-items:center;gap:8px;vertical-align:middle">${avSq(r,34)}${pf.name}</span> `:""}<span style="color:var(--muted)">for</span></h1>
  <input class="note" id="note" placeholder="Note (required)" value="${pf.note}" autocomplete="off">
  ${isPay?`<p class="sm" style="font-size:11px;margin-bottom:12px">Payments can't be canceled once they're sent.</p><div style="display:flex;gap:10px;margin-bottom:12px"><span class="chip" id="srcChip" style="gap:8px">${curTxt(src.chip)}</span><span class="chip" style="gap:6px">${ic("spark")}Style it</span></div>`:""}
  <button class="pill w ${pf.note?"":"off"}" style="padding:18px" id="noteGo">${isPay?"Pay":"Continue"}</button>`,true);
  $("nBack").onclick=()=>isPay?pickRecip():closeSheet();
  $("note").oninput=e=>{pf.note=e.target.value.trim();$("noteGo").classList.toggle("off",!pf.note)};
  if($("srcChip")) $("srcChip").onclick=srcSheet;
  $("noteGo").onclick=()=>isPay?pinStart():pickRecip();
}
function srcSheet(){
  openSheet(`<div class="grab"></div><div class="flex" style="margin-bottom:6px"><button class="cb" id="sX" style="background:none;margin-left:-8px">${ic("x")}</button></div>
  <h1 style="font-size:30px;font-weight:600;margin-bottom:14px">Pay ${amtTxt()} from</h1>
  ${sources.map(s=>`<div class="lrow" data-s="${s.id}" style="padding:12px 0">${curTxt(s.ic)}<div class="m"><b style="font-size:15px">${s.n}</b><span>${s.sub()}</span></div>${s.id==="link"?"":`<span class="radio" style="${pf.src===s.id?"border:8px solid var(--text)":""}"></span>`}</div>`).join("")}
  <button class="pill w" style="padding:18px;margin-top:24px" id="sDone">Done</button>`,true);
  sheet.querySelectorAll("[data-s]").forEach(el=>el.onclick=()=>{if(el.dataset.s!=="link"){pf.src=el.dataset.s;srcSheet()}});
  $("sX").onclick=noteStep; $("sDone").onclick=noteStep;
}
$("payBtn").onclick=()=>payTo("Pay"); $("reqBtn").onclick=()=>payTo("Request");

/* confirm PIN */
const pin={v:""};
function drawPin(){document.querySelectorAll("#pdots i").forEach((d,i)=>d.classList.toggle("f",i<pin.v.length));$("pinNext").classList.toggle("off",pin.v.length<4)}
["1","2","3","4","5","6","7","8","9","","0","‹"].forEach(k=>{
  const b=document.createElement(k?"button":"span");b.textContent=k;
  if(k) b.onclick=()=>{ if(k==="‹") pin.v=pin.v.slice(0,-1); else if(pin.v.length<4) pin.v+=k; drawPin(); };
  $("ppad").appendChild(b);
});
function pinStart(){closeSheet();pin.v="";drawPin();show("pin")}
$("pinNext").onclick=()=>{ if(pin.v.length===4) doSend(pf.kind,pf.name); };

/* linked banks */
$("linkNew").onclick=()=>openSheet(`<div class="grab"></div><h1 style="font-size:28px;font-weight:600;margin:22px 0 14px;line-height:1.25">Link a new card or<br>bank account</h1>${[["card","Link new debit card","Transfer instantly, send payments"],["bank","Replace a linked bank account","Withdraw at a standard speed"],["card","Link new credit card","Send payments for a 3% fee"]].map(r=>`<div class="lrow" style="padding:14px 0"><div class="sq d" style="border-radius:12px">${ic(r[0])}</div><div class="m"><b style="font-size:15px">${r[1]}</b><span>${r[2]}</span></div>${cvI()}</div>`).join("")}`);

/* themes */
$("themesRow").onclick=()=>{
  const cur=document.documentElement.dataset.theme||"dark";
  openSheet(`<div class="grab"></div><h3 style="margin-bottom:20px">Themes</h3>${[["dark","Dark"],["light","Light"],["green","Green"]].map(t=>`<div class="opt ${cur===t[0]?"on":""}" data-t="${t[0]}">${t[1]}<span class="radio"></span></div>`).join("")}`);
  sheet.querySelectorAll("[data-t]").forEach(el=>el.onclick=()=>{setTheme(el.dataset.t);closeSheet()});
};
function setTheme(t){document.documentElement.dataset.theme=t;document.querySelector("meta[name=theme-color]").content={dark:"#000000",light:"#ffffff",green:"#00C93F"}[t];render()}

/* ---------- stock detail ---------- */
let cur=0,qa=25;
function openStock(i){
  cur=i; const s=stocks[i];
  const ico=$("dIc"); ico.style.background=s.bg; ico.style.color=s.dark?"#000":"#fff"; ico.textContent=s.l; ico.style.fontSize=s.l.length>1?"15px":"22px";
  $("dName").textContent=s.n; $("dPrice").textContent=money(s.val);
  $("dPct").textContent=(s.pct>0?"↑ ":"↓ ")+Math.abs(s.pct).toFixed(2)+"%";
  $("dVal").textContent=money(s.val); $("dGain").textContent=money(Math.max(s.val-10,0.18));
  draw("chD",s.pct>0?"btc":"down",i*5+2);
  go("stock",true);
}
$("dBuy").onclick=()=>{ qa=25;
  openSheet(`<div class="grab"></div><h3>Buy ${stocks[cur].n}</h3><div class="sm" style="text-align:center;margin:6px 0 12px">One-time order</div>
  <div class="qa" id="qa">${[10,25,50,75,100].map(v=>`<button data-v="${v}" class="${v===25?"on":""}">${money(v,0)}</button>`).join("")}<button>•••</button></div>
  <button class="pill w" style="padding:18px" id="qaNext">Next</button>`);
  $("qa").onclick=e=>{const b=e.target.closest("button[data-v]");if(!b)return;qa=+b.dataset.v;$("qa").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));};
  $("qaNext").onclick=()=>{ if(qa>balance){toast("Insufficient balance");return;} balance-=qa; closeSheet(); render(); toast("Bought "+money(qa,0)+" of "+stocks[cur].n); };
};

/* ---------- keypads ---------- */
function keypad(el,o,out){
  ["1","2","3","4","5","6","7","8","9",".","0","‹"].forEach(k=>{
    const b=document.createElement("button");b.textContent=k;
    b.onclick=()=>{ if(k==="‹") o.v=o.v.length>1?o.v.slice(0,-1):"0";
      else if(k==="."){ if(!o.v.includes(".")) o.v+="."; }
      else if(!(o.v.includes(".")&&o.v.split(".")[1].length>=2)) o.v=o.v==="0"?k:o.v+k;
      if(o.v.replace(".","").length>7) o.v=o.v.slice(0,-1);
      $(out).textContent=CUR.s+o.v; };
    $(el).appendChild(b);});
}
const pay={v:"0"}, buyA={v:"0"};
keypad("pad",pay,"payAmt"); keypad("bpad",buyA,"buyAmt");
function setCur(k){
  if(!CURS[k]) return;
  curK=k; CUR=CURS[k];
  try{const u=new URL(location.href);u.searchParams.set("currency",k);history.replaceState(null,"",u);localStorage.setItem("ca-q",u.search);localStorage.setItem(CUR_KEY,k)}catch(_){}
  $("payAmt").textContent=CUR.s+pay.v; $("buyAmt").textContent=CUR.s+buyA.v;
  render();
}
/* перемикач офера всередині апки (як валюта): міняє назву/лого/суми надходжень без перезавантаження */
function setOffer(id){
  const all=window.OFFERS_ALL||{}; if(!all[id]) return;
  OF={id,...all[id]};
  try{const u=new URL(location.href);u.searchParams.set("offer",id);history.replaceState(null,"",u);localStorage.setItem("ca-q",u.search);localStorage.setItem("ca-offer",id)}catch(_){}
  tx.forEach(t=>{if(t.o==null)return;t.n=OF.n;t.l=OF.l;t.v=J(OF.amounts&&OF.amounts[t.o]!=null?OF.amounts[t.o]:t.b)});
  stories[1].n=OF.n; stories[1].l=OF.l;
  render();
}
/* попап «Currency + Offer»: скролиться при будь-якій кількості пунктів */
$("curChip").onclick=()=>{
  const offs=Object.entries(window.OFFERS_ALL||{});
  const item=(attr,k,on,icon,t,s)=>`<div class="opt ${on?"on":""}" ${attr}="${k}"><span style="display:flex;align-items:center;gap:14px;min-width:0">${icon}<span>${t}<span class="sm" style="display:block;font-weight:400;color:var(--muted)">${s}</span></span></span><span class="radio"></span></div>`;
  openSheet(`<div class="grab"></div><h3 style="margin-bottom:20px">Currency</h3>${Object.entries(CURS).map(([k,c])=>item("data-cur",k,curK===k,`<svg style="width:32px;height:32px;flex-shrink:0"><use href="#flag-${c.f}"/></svg>`,c.c,c.n)).join("")}
  ${offs.length?`<h3 class="shd">Offer</h3>${offs.map(([k,o])=>item("data-off",k,OF.id===k,`<span class="olg"><img src="${o.l}" alt=""></span>`,o.n,"?offer="+k)).join("")}`:""}`);
  sheet.querySelectorAll("[data-cur]").forEach(el=>el.onclick=()=>{setCur(el.dataset.cur);closeSheet()});
  sheet.querySelectorAll("[data-off]").forEach(el=>el.onclick=()=>{setOffer(el.dataset.off);closeSheet();toast("Offer: "+OF.n)});
};
function doSend(kind,name){
  const v=parseFloat(pay.v);
  if(kind==="Pay"){ if(v>balance){toast("Insufficient balance");return;}
    balance-=v; tx.unshift({n:name,v:-v,e:"👤",d:0}); toast("Sent "+money(v)+" to "+name); }
  else toast("Requested "+money(v)+" from "+name);
  pay.v="0"; $("payAmt").textContent=CUR.s+"0"; render(); go("money");
}

/* ---------- bitcoin buy flow ---------- */
let order={};
$("bBuy").onclick=()=>{ buyA.v="0"; $("buyAmt").textContent=CUR.s+"0"; go("buy",true); };
$("buyNext").onclick=()=>{
  const a=parseFloat(buyA.v); if(!a){toast("Enter an amount");return;} if(a>balance){toast("Insufficient balance");return;}
  const fee=a*0.02, net=a-fee, btc=net/BTC_RATE; order={a,fee,net,btc};
  $("cTitle").textContent="Confirm your Bitcoin purchase of "+money(a,0);
  $("cKv").innerHTML=[["Funding Source","Cash App Cash - "+money(a)],["Amount",btc.toFixed(8)+" BTC"],["Exchange Rate",money(BTC_RATE)],["Symbol","BTC"],null,["Total Bitcoin Purchase",money(net)],["Fees",money(fee)],["Total Cost",money(a)]]
    .map(r=>r?`<div class="kv"><span>${r[0]}</span><b style="font-weight:400;color:var(--muted)">${r[1]}</b></div>`:'<div style="height:14px"></div>').join("");
  stack.push("btc"); show("confirm");
};
$("cGo").onclick=()=>{
  balance-=order.a; btcUsd+=order.net;
  tx.unshift({n:"Bitcoin purchase",v:-order.a,e:"₿",d:0});
  $("dTitle").innerHTML="You purchased<br>"+order.btc.toFixed(8)+" BTC";
  render(); stack.length=0; show("done");
};

/* ---------- savings ---------- */
$("tin").onclick=()=>{ if(balance<100){toast("Insufficient balance");return;} balance-=100; savings+=100; render(); toast("Moved "+money(100,0)+" to Savings"); };
$("tout").onclick=()=>{ if(savings<100){toast("Not enough in Savings");return;} savings-=100; balance+=100; render(); toast("Moved "+money(100,0)+" to Cash"); };

/* ---------- card ---------- */
let shown=false,locked=false;
$("eye").onclick=()=>{shown=!shown;$("cnum").style.display=shown?"block":"none"};
$("lockBtn").onclick=()=>{locked=!locked;$("vcard").classList.toggle("locked",locked);$("lockBtn").textContent=locked?"Unlock card":"Lock card";$("cstat").textContent=locked?"Card locked":"•••• 4821";toast(locked?"Card locked":"Card unlocked")};
$("copyBtn").onclick=()=>{try{navigator.clipboard.writeText("5412 7700 1934 4821")}catch(e){}toast("Number copied")};
$("rout").onclick=()=>toast("Routing number copied"); $("acct").onclick=()=>toast("Account number copied");

/* ---------- misc ---------- */
$("hideBal").onclick=()=>{hidden=!hidden;$("hideBal").innerHTML=ic("eye"+(hidden?"":"off")).replace(/<\/?i[^>]*>/g,"");render()};
$("q").oninput=render;
let tt;function toast(m){const t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),1800)}
hydrate(); render();
$("payAmt").textContent=CUR.s+pay.v; $("buyAmt").textContent=CUR.s+buyA.v;
if(location.hash&&$(location.hash.slice(1))&&$(location.hash.slice(1)).classList.contains("screen")) show(location.hash.slice(1));
