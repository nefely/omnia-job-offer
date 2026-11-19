/* =====================================================================
   УНІКАЛІЗАЦІЯ ПРИ КОЖНОМУ ЗАХОДІ В АПКУ
   - випадкове ім'я + прізвище (50 чоловічих + 50 жіночих імен)
   - jit(v): зсув суми на випадкові $1–2 вгору або вниз (центи теж міняються)
   Підключати ПЕРЕД app.js. Елементи з data-pf="full|first|last|ini|user|tag"
   отримують відповідне значення профілю.
   ===================================================================== */
(function(){
  const MALE=["James","John","Robert","Michael","William","David","Richard","Joseph","Thomas","Charles","Christopher","Daniel","Matthew","Anthony","Mark","Steven","Paul","Andrew","Joshua","Kevin","Brian","George","Timothy","Ryan","Jacob","Gary","Nicholas","Eric","Jonathan","Justin","Brandon","Samuel","Benjamin","Gregory","Frank","Patrick","Raymond","Jack","Dennis","Tyler","Aaron","Adam","Nathan","Henry","Zachary","Kyle","Ethan","Logan","Dylan","Austin"];
  const FEMALE=["Mary","Patricia","Jennifer","Linda","Elizabeth","Barbara","Susan","Jessica","Sarah","Karen","Lisa","Nancy","Betty","Sandra","Ashley","Emily","Michelle","Amanda","Melissa","Stephanie","Rebecca","Laura","Sharon","Cynthia","Amy","Angela","Anna","Brenda","Emma","Nicole","Olivia","Samantha","Katherine","Christine","Rachel","Hannah","Megan","Lauren","Victoria","Natalie","Grace","Chloe","Sophia","Madison","Abigail","Kayla","Brittany","Haley","Julia","Alyssa"];
  const LAST=["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Wilson","Anderson","Taylor","Thomas","Moore","Martin","Jackson","Thompson","White","Harris","Clark","Lewis","Robinson","Walker","Young","Allen","King","Wright","Scott","Hill","Green","Adams","Baker","Nelson","Carter","Mitchell","Roberts","Turner","Phillips","Campbell","Parker","Evans","Edwards","Collins","Stewart","Morris","Murphy","Cook","Rogers","Morgan","Cooper","Peterson","Reed","Bailey","Bell","Kelly","Howard","Ward","Cox","Richardson","Wood","Watson","Brooks","Bennett","Gray","Hughes","Price","Sanders","Myers","Long","Ross","Foster","Powell"];
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  const first=pick(Math.random()<.5?MALE:FEMALE), last=pick(LAST);
  window.PROFILE={first,last,full:first+" "+last,ini:first[0]+last[0],user:(first+last).toLowerCase(),tag:(first+last[0]).toLowerCase()};

  /* зсув суми на $1–2: знак суми зберігається, мала сума не стане від'ємною */
  window.jit=v=>{
    const a=Math.abs(v), d=1+Math.random();
    const up=a-d<1||Math.random()<.5;
    return Math.sign(v||1)*Math.round((up?a+d:a-d)*100)/100;
  };

  document.querySelectorAll("[data-pf]").forEach(e=>e.textContent=window.PROFILE[e.dataset.pf]);
})();
