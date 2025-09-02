(function(){
  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Confetti on CTA click
  const cta = document.getElementById('cta');
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function createParticle(x, y) {
    return {
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * -10 - 5,
      size: Math.random() * 4 + 2,
      color: ['#7C3AED', '#A78BFA', '#F3E8FF', '#10B981', '#FBBF24'][Math.floor(Math.random() * 5)],
      life: 100
    };
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles = particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3;
      p.life--;
      
      if (p.life > 0) {
        ctx.globalAlpha = p.life / 100;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        return true;
      }
      return false;
    });
    
    if (particles.length > 0) {
      requestAnimationFrame(animate);
    }
  }
  
  cta.addEventListener('click', e => {
    // Trigger confetti if motion is allowed
    if (!prefersReducedMotion) {
      const rect = cta.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      for (let i = 0; i < 40; i++) {
        particles.push(createParticle(x, y));
      }
      
      animate();
    }
  });
  
  // Setup canvas
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
})();