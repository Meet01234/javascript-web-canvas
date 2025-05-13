
document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.querySelector('.header');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
      backToTop.classList.add('active');
    } else {
      header.classList.remove('scrolled');
      backToTop.classList.remove('active');
    }

    // Activate nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile navigation
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileNavToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      mobileNavToggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // Portfolio filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to current button
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Stats counter
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  function countStats() {
    if (counted) return;
    
    const statsSection = document.querySelector('.stats-container');
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;
    
    if (sectionPos < screenHeight && !counted) {
      counted = true;
      
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let count = 0;
        const duration = 2000; // 2 seconds duration
        const increment = Math.ceil(target / (duration / 30)); // Update every 30ms
        
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            stat.textContent = target;
            clearInterval(timer);
          } else {
            stat.textContent = count;
          }
        }, 30);
      });
    }
  }

  window.addEventListener('scroll', countStats);

  // Form submission
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (name && email && message) {
        // Simulate form submission
        contactForm.reset();
        formMessage.textContent = "Thank you for your message! We'll get back to you soon.";
        formMessage.classList.add('success');
        
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.classList.remove('success');
        }, 5000);
      } else {
        formMessage.textContent = "Please fill in all required fields.";
        formMessage.classList.add('error');
        
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.classList.remove('error');
        }, 3000);
      }
    });
  }

  // Add smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Reveal animations on scroll
  function revealElements() {
    const elements = document.querySelectorAll('.reveal-text, .reveal-slide, .reveal-fade');
    
    elements.forEach(element => {
      const elementPos = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPos < windowHeight - 100) {
        element.style.visibility = 'visible';
      }
    });
  }

  window.addEventListener('scroll', revealElements);
  window.addEventListener('load', revealElements);
});
