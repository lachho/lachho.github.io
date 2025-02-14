document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const particlesContainer = document.getElementById('particles-js');
  const particlesCount = 150;

  let particleIndex = 0
  const createParticle = () => {
    if (particleIndex < particlesCount) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 50 + 8}vh`;
      particle.style.animationDelay = `${Math.random() * 5}s, ${Math.random() * 2}s`;
      particlesContainer.appendChild(particle);

      particleIndex++;
      requestAnimationFrame(createParticle);
    }
  };

  requestAnimationFrame(createParticle);
});

document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".reveal-on-scroll");

  function revealSections() {
      sections.forEach(section => {
          const sectionPos = section.getBoundingClientRect().top;
          const screenHeight = window.innerHeight;

          if (sectionPos < screenHeight * 0.85) {
              section.classList.add("reveal");
          } else {
              section.classList.remove("reveal");
          }
      });
  }

  window.addEventListener("scroll", revealSections);
  revealSections();
});


