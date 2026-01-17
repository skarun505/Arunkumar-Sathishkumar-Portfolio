/**
 * Main JavaScript functionality
 * Mobile menu, navigation, and general interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isActive = navLinks.classList.contains('active');
      mobileMenu.querySelector('span').textContent = isActive ? '✕' : '☰';

      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          mobileMenu.querySelector('span').textContent = '☰';
          document.body.style.overflow = '';
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenu.querySelector('span').textContent = '☰';
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // ACTIVE NAVIGATION LINK HIGHLIGHTING
  // ============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksAll = document.querySelectorAll('.nav-links a');

  navLinksAll.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ============================================
  // KEYBOARD NAVIGATION SUPPORT
  // ============================================
  document.addEventListener('keydown', (e) => {
    // Tab navigation for cards
    if (e.key === 'Tab') {
      const focusedElement = document.activeElement;
      if (focusedElement.classList.contains('glass-card')) {
        focusedElement.style.outline = '2px solid var(--primary-blue)';
      }
    }

    // Escape key to close mobile menu
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (mobileMenu) {
        mobileMenu.querySelector('span').textContent = '☰';
      }
      document.body.style.overflow = '';
    }
  });

  // ============================================
  // HEADER BACKGROUND ON SCROLL
  // ============================================
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
      }
    });
  }

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ============================================
  // ACCESSIBILITY: SKIP TO CONTENT
  // ============================================
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'sr-only';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-blue);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;
  skipLink.addEventListener('focus', function () {
    this.style.top = '0';
  });
  skipLink.addEventListener('blur', function () {
    this.style.top = '-40px';
  });
  document.body.insertBefore(skipLink, document.body.firstChild);

  console.log('✅ Main JavaScript initialized successfully');
});
