document.addEventListener('DOMContentLoaded', () => {

  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1
  });

  reveals.forEach((el) => observer.observe(el));

  const cards = document.querySelectorAll('.glass-card');

  cards.forEach((card) => {
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Mild slow-mo tilt angle (-5deg to +5deg)
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      // 0.3s Ease Transition lagane se fast movement slow-mo glide mein convert ho jayegi
      card.style.transition = 'transform 0.3s ease-out';
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    // Reset smoothly on Mouse Leave
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });

  });

});
