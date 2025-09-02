(function(){
  'use strict';
  const startTime = performance.now();
  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let sessionStartTime = Date.now();

  // Install prompt
  let deferredPrompt=null;const installBtn=document.getElementById('installBtn');
  addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;installBtn&&(installBtn.style.display='inline-block')});
  installBtn&&installBtn.addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();try{await deferredPrompt.userChoice}catch(_){}deferredPrompt=null;installBtn.style.display='none'});

  // Reveal on scroll
  const reveals=[...document.querySelectorAll('.reveal')];
  const rio=new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); rio.unobserve(e.target);} }); },{threshold:.2});
  reveals.forEach(el=>rio.observe(el));

  // Stats counters
  const counters=document.querySelectorAll('[data-target]');
  const format=n=> n>=1_000_000? '$'+(n/1_000_000).toFixed(1)+'M+': n>=1000? (n/1000).toFixed(0)+'K+': n.toLocaleString();
  const animate=el=>{const target=parseInt(el.dataset.target,10)||0; if(prefersReducedMotion){el.textContent=format(target);return} let cur=0; const inc=Math.max(1,Math.floor(target/120)); const t=setInterval(()=>{cur+=inc; if(cur>=target){cur=target; clearInterval(t);} el.textContent=format(cur);},16)};
  const io=new IntersectionObserver(entries=>{entries.forEach(e=>{ if(e.isIntersecting){ animate(e.target); io.unobserve(e.target);} });},{threshold:.5});
  counters.forEach(c=>io.observe(c));

  // Testimonials carousel
  const items=[...document.querySelectorAll('.t-item')];
  const dots=[...document.querySelectorAll('.dot')];
  const prev=document.getElementById('prev');
  const next=document.getElementById('next');
  const sc=document.querySelector('.showcase');
  let idx=0, interval=null, interacting=false;

  function go(i){ idx=(i+items.length)%items.length; items.forEach((it,j)=>{ const active=j===idx; it.classList.toggle('active',active); if(active){ it.classList.add('bump'); setTimeout(()=>it.classList.remove('bump'),220); } }); dots.forEach((d,j)=>{ d.classList.toggle('active', j===idx); d.setAttribute('aria-selected', String(j===idx)); }); }
  function advance(){ go(idx+1); }
  function back(){ go(idx-1); }
  function kick(){ interacting=true; clearTimeout(interval); interval=setTimeout(()=>{interacting=false; auto();},6000); }
  function auto(){ if(prefersReducedMotion) return; clearInterval(interval); interval=setInterval(()=>{ if(!interacting) advance(); },5000); }

  dots.forEach((d,i)=>d.addEventListener('click',()=>{ go(i); kick(); }));
  prev.addEventListener('click',()=>{ back(); kick(); });
  next.addEventListener('click',()=>{ advance(); kick(); });
  document.addEventListener('keydown',e=>{ if(e.key==='ArrowLeft') { back(); kick(); } if(e.key==='ArrowRight'){ advance(); kick(); } });
  let x0=null; sc.addEventListener('touchstart',e=>{ x0=e.touches[0].clientX; },{passive:true});
  sc.addEventListener('touchend',e=>{ if(x0==null) return; const dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>40){ dx<0?advance():back(); kick(); } x0=null; });
  auto();
  go(0);

})();