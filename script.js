/**
 * BlockyBoo: Block Drop Puzzle - Interactive Scripts
 * Handles responsive navigation, FAQ accordion, game board simulation, and TOC scroll-spy
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── Mobile Navigation Toggle ────────────────────────────────────────────────
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
  const header = document.querySelector('.site-header');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      mobileToggle.classList.toggle('is-active');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-open')) {
          mainNav.classList.remove('is-open');
          mobileToggle.classList.remove('is-active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('is-open') &&
          !mainNav.contains(e.target) &&
          !mobileToggle.contains(e.target)) {
        mainNav.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Header Scroll State ───────────────────────────────────────────────────
  if (header) {
    const checkScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // ── FAQ Accordion ──────────────────────────────────────────────────────────
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(faqHeader => {
    faqHeader.addEventListener('click', () => {
      const parent = faqHeader.closest('.faq-item');
      if (!parent) return;

      const isOpen = parent.classList.contains('is-open');

      // Close other open items
      document.querySelectorAll('.faq-item.is-open').forEach(item => {
        if (item !== parent) {
          item.classList.remove('is-open');
          const btn = item.querySelector('.faq-header');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isOpen) {
        parent.classList.remove('is-open');
        faqHeader.setAttribute('aria-expanded', 'false');
      } else {
        parent.classList.add('is-open');
        faqHeader.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ── Interactive Hero Puzzle Board Simulation ──────────────────────────────
  const puzzleCells = document.querySelectorAll('.puzzle-grid-10 .p-cell');
  if (puzzleCells.length > 0) {
    const colors = ['c-indigo', 'c-pink', 'c-teal', 'c-amber', 'c-purple', 'c-cyan', 'c-green'];

    // Random cell hover sparkle
    puzzleCells.forEach(cell => {
      cell.addEventListener('mouseenter', () => {
        if (!cell.classList.contains('filled')) {
          const randColor = colors[Math.floor(Math.random() * colors.length)];
          cell.classList.add('filled', randColor);
          setTimeout(() => {
            cell.classList.remove('filled', randColor);
          }, 1200);
        }
      });
    });

    // Score ticker animation in hero preview
    const scoreElement = document.querySelector('.preview-score-num');
    if (scoreElement) {
      let currentScore = 14850;
      setInterval(() => {
        const bonus = Math.floor(Math.random() * 4 + 1) * 120;
        currentScore += bonus;
        scoreElement.textContent = currentScore.toLocaleString();
      }, 3500);
    }
  }

  // ── Table of Contents Scroll-Spy for Legal Pages ─────────────────────────
  const tocLinks = document.querySelectorAll('.legal-toc .toc-link');
  const sections = document.querySelectorAll('.legal-body h2[id]');

  if (tocLinks.length > 0 && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-80px 0px -70% 0px',
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }

  // ── Dynamic Copyright Year ────────────────────────────────────────────────
  const yearSpans = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });
});

