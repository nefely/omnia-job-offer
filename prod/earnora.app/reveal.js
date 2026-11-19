(function(){
 'use strict';
 const q=s=>document.querySelector(s);
 let selected=[];
 document.querySelectorAll('.quiz-panel').forEach((panel,index)=>{if(!panel.querySelector(".opt-btn"))return;panel.querySelectorAll('.opt-btn').forEach(button=>button.addEventListener('click',()=>{selected[index]=button.querySelector('.opt-title').textContent;}));});
 window.renderEarnoraResults=function(){
  const dailyByDevice={'iPhone / iOS':54,'Android':47,'Both':51};
  const dailyAmount=q('#result-daily-amount');
  if(dailyAmount)dailyAmount.textContent='$'+(dailyByDevice[selected[0]]||51);

  const profile=q('#result-profile');profile.replaceChildren(...selected.map(text=>{const span=document.createElement('span');const short={'iPhone / iOS':'iOS','Every day':'Daily','A few times a week':'Weekly','Puzzle & casual':'Puzzle','Strategy & adventure':'Strategy','Action & racing':'Action','A bit of everything':'Mixed','Bills or savings':'Bills / savings','Something for myself':'For myself','Honestly, I just want to see if this is real':'Exploring'};span.textContent=short[text]||text.replace(/\$(\d+)–\$(\d+) a day/,'$$$1–$2/day').replace(' a day','/day');span.title=text;span.setAttribute('aria-label',text);return span;}));
  const renderCard=(o,i)=>{
   const url=new URL(o.trackingUrl);let cid='';try{if(typeof window.getSessionClickID==='function')cid=window.getSessionClickID()||'';}catch(_){}if(!cid)cid=new URLSearchParams(location.search).get('rtkcid')||'';if(cid)url.searchParams.set('clickid',String(cid));
   return `<article class="reward-card${i===0?' is-winner':''}" data-product="${o.id}"><div class="reward-ribbon">${i===0?'♛ YOUR WINNING PICK':'✦ BONUS PICK 0'+(i+1)}</div>${i===0?'<div class="winner-spotlight"><span class="winner-crown" aria-hidden="true">♛</span><span>YOUR TOP REWARD<span class="winner-title">Meet your winner.</span></span><span class="winner-stars" aria-hidden="true">✦</span></div>':''}<div class="reward-head">${o.logo?`<img class="reward-icon reward-logo ${o.className}" src="${o.logo}" alt="${o.name} logo" width="47" height="47">`:`<span class="reward-icon reward-monogram ${o.className}" aria-hidden="true">R</span>`}${o.id==='recosocial'?'':`<div><h3>${o.name}</h3><small>${o.tag}</small></div>`}</div>${o.description ? `<p class="reward-description">${o.description}</p>` : ''}<ul class="reward-benefits">${o.benefits.map(t=>`<li>${t}</li>`).join('')}</ul>${o.start ? `<div class="reward-start"><b>Your starting benefit:</b> ${o.start}</div>` : ''}<a class="btn btn-primary offer-link" href="${url.href}" target="_blank" rel="sponsored noopener">SECURE YOUR BONUS CASE & START EARNING →</a>${o.hideTerms ? '' : '<small class="reward-terms">Current offers and bonuses depend on your eligibility. Partner terms apply.</small>'}</article>`;
  };
  q('#result-offers').innerHTML=window.EARNORA_OFFERS.map(renderCard).join('') + '<details class="more-apps"><summary><span class="more-apps-icon" aria-hidden="true">＋</span><span><b>Want even more apps?</b><small>Discover two more platforms to try.</small></span><span class="more-apps-chevron" aria-hidden="true">⌄</span></summary><div class="extra-offers"></div></details>';
  const more=q('.more-apps');
  let extraTimer=null, extraProgress=0;
  more.addEventListener('toggle',()=>{
   if(!more.open){
    if(extraTimer){clearInterval(extraTimer);extraTimer=null;}
    if(more.dataset.loaded!=='true'){more.dataset.loading='';more.querySelector('.extra-offers').replaceChildren();}
    return;
   }
   if(more.dataset.loaded==='true'||more.dataset.loading==='true')return;
   more.dataset.loading='true';extraProgress=0;
   const host=more.querySelector('.extra-offers');
   host.setAttribute('aria-busy','true');
   host.innerHTML='<div class="extra-scan" role="status"><div class="extra-scan-radar" aria-hidden="true"><i></i><span>⌕</span></div><b>Looking for more reward opportunities…</b><span class="extra-scan-status">Checking additional platforms</span><div class="extra-scan-track" role="progressbar" aria-label="Additional offers search" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div><span class="extra-scan-percent">0%</span></div>';
   const track=host.querySelector('.extra-scan-track'),fill=track.querySelector('i'),percent=host.querySelector('.extra-scan-percent'),status=host.querySelector('.extra-scan-status');
   extraTimer=setInterval(()=>{
    if(!more.isConnected){clearInterval(extraTimer);extraTimer=null;return;}
    extraProgress=Math.min(100,extraProgress+5);
    fill.style.width=extraProgress+'%';track.setAttribute('aria-valuenow',String(extraProgress));percent.textContent=extraProgress+'%';
    if(extraProgress>=45)status.textContent='Preparing your additional options';
    if(extraProgress<100)return;
    clearInterval(extraTimer);extraTimer=null;
    host.innerHTML='<p class="extra-found" role="status">✓ 2 more opportunities unlocked</p>'+window.EARNORA_EXTRA_OFFERS.map((o,i)=>renderCard(o,i+3)).join('');
    host.setAttribute('aria-busy','false');more.dataset.loaded='true';more.dataset.loading='';
    if(window.EarnoraCurrency)window.EarnoraCurrency.apply(more);
   },100);
  });
  if (window.EarnoraCurrency) window.EarnoraCurrency.apply(q('#final-screen'));

 };
})();
