import './style.css'

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // Navigation Active State on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navigationLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navigationLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // Event Gallery Modal Functionality
  const eventItems = document.querySelectorAll('.event-item');
  const eventModal = document.getElementById('event-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const closeModal = document.getElementById('close-modal');

  // Open modal when event item is clicked
  eventItems.forEach(item => {
    item.addEventListener('click', function() {
      const title = this.getAttribute('data-title');
      const description = this.getAttribute('data-desc');
      const image = this.getAttribute('data-image');
      
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalImage.src = image;
      modalImage.alt = title;
      
      eventModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // Close modal functionality
  function closeEventModal() {
    eventModal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  if (closeModal) {
    closeModal.addEventListener('click', closeEventModal);
  }

  // Close modal when clicking outside the modal content
  eventModal.addEventListener('click', function(e) {
    if (e.target === eventModal) {
      closeEventModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !eventModal.classList.contains('hidden')) {
      closeEventModal();
    }
  });

  // Highlights Carousel Functionality
  const carouselTrack = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  
  let currentSlide = 0;
  const totalSlides = 4;

  function updateCarousel() {
    const translateX = -(currentSlide * 100);
    carouselTrack.style.transform = `translateX(${translateX}%)`;
    
    // Update active dot
    carouselDots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Next/Previous button functionality
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  // Dot navigation
  carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      currentSlide = index;
      updateCarousel();
    });
  });

  // Auto-play carousel
  let autoPlayInterval = setInterval(nextSlide, 5000);

  // Pause auto-play on hover
  const carousel = document.getElementById('carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', function() {
      clearInterval(autoPlayInterval);
    });

    carousel.addEventListener('mouseleave', function() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    });
  }

  // Initialize carousel
  updateCarousel();

  // Image Lazy Loading Effect
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.setAttribute('data-loaded', 'false');
    
    img.addEventListener('load', function() {
      this.setAttribute('data-loaded', 'true');
    });

    // If image is already loaded
    if (img.complete) {
      img.setAttribute('data-loaded', 'true');
    }
  });

  // Add hover effects to member cards and event items
  const memberCards = document.querySelectorAll('#members .bg-gray-50');
  const eventCards = document.querySelectorAll('.event-item');
  
  [...memberCards, ...eventCards].forEach(card => {
    card.classList.add('hover-lift');
  });

  // Animate elements on scroll (Intersection Observer)
  const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });

  // Initialize first navigation item as active
  if (navigationLinks.length > 0) {
    navigationLinks[0].classList.add('active');
  }

  // Console welcome message
  console.log('%cWelcome to Club Spectrum! 🚀', 'color: #3B82F6; font-size: 16px; font-weight: bold;');
  console.log('%cEmpowering Future AI & ML Engineers', 'color: #9333EA; font-size: 14px;');

});