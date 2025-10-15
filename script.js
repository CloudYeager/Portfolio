// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a nav link or outside the menu
document.addEventListener('click', (e) => {
  const isClickInside = navMenu.contains(e.target) || hamburger.contains(e.target);
  if (!isClickInside && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Smooth scroll effect for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    // Only prevent default for non-hash links
    if (this.getAttribute('href') !== '#') {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});
// Animate skill bars when they come into view
const animateSkills = () => {
  const skills = document.querySelectorAll('.skill-level');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.parentElement.getAttribute('data-level') || '0%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skills.forEach(skill => {
    const level = skill.style.width;
    skill.style.width = '0';
    skill.parentElement.setAttribute('data-level', level);
    observer.observe(skill);
  });
};

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', animateSkills);