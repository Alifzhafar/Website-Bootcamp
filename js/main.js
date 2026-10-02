document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-toggle').forEach(function (button) {
    var header = button.closest('.nav-wrap');
    var nav = document.getElementById(button.getAttribute('aria-controls'));

    function closeMenu() {
      header.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Buka menu navigasi');
    }

    button.addEventListener('click', function () {
      var isOpen = button.getAttribute('aria-expanded') === 'true';
      header.classList.toggle('is-open', !isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
      button.setAttribute('aria-label', isOpen ? 'Buka menu navigasi' : 'Tutup menu navigasi');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  });

  var revealTargets = document.querySelectorAll(
    'body > section:not(.hero) > .container, body > section.container:not(.hero) > *, .hero .row > div, main > .text-center, main > .row > div, .box, .form-card, footer > .container'
  );

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function (element, index) {
      element.classList.add('scroll-reveal');
      element.style.setProperty('--reveal-delay', Math.min(index % 4, 3) * 90 + 'ms');
      revealObserver.observe(element);
    });
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || (link.target && link.target !== '_self') || link.hasAttribute('download') || document.body.classList.contains('page-leaving')) {
      return;
    }

    var destination = new URL(link.href, window.location.href);
    if (destination.protocol !== window.location.protocol || destination.host !== window.location.host || destination.pathname === window.location.pathname || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    event.preventDefault();
    document.body.classList.add('page-leaving');
    window.setTimeout(function () {
      window.location.assign(destination.href);
    }, 160);
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-q').forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        b.querySelector('.tgl').textContent = '▼';
        b.parentElement.querySelector('.faq-a').classList.add('hidden-a');
      });
      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('.tgl').textContent = '▲';
        btn.parentElement.querySelector('.faq-a').classList.remove('hidden-a');
      }
    });
  });

  // Testimoni klien
  var who = document.querySelectorAll('.who');
  who.forEach(function (w) {
    w.addEventListener('click', function () {
      who.forEach(function (x) { x.classList.remove('active'); });
      w.classList.add('active');
    });
  });

  // Form kontak
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('formMsg').classList.remove('d-none');
      form.reset();
    });
  }
});
