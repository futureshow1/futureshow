// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks = document.querySelector('.nav__links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // Transparent nav on homepage hero
  const hero = document.querySelector('.hero');
  const nav = document.querySelector('.nav');

  if (hero && nav) {
    nav.classList.add('nav--transparent');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          nav.classList.add('nav--transparent');
        } else {
          nav.classList.remove('nav--transparent');
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
  }

  // Sound toggle for hero video
  const soundToggle = document.getElementById('soundToggle');
  const heroVideo = document.getElementById('heroVideo');

  if (soundToggle && heroVideo) {
    soundToggle.addEventListener('click', () => {
      if (heroVideo.muted) {
        heroVideo.muted = false;
        soundToggle.classList.add('is-unmuted');
        soundToggle.setAttribute('aria-label', 'Mute sound');
      } else {
        heroVideo.muted = true;
        soundToggle.classList.remove('is-unmuted');
        soundToggle.setAttribute('aria-label', 'Unmute sound');
      }
    });
  }

  // Set active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
});
