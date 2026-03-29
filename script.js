// Smooth scrolling helper used by buttons
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

// Highlight nav links while scrolling
const navLinks = document.querySelectorAll('nav a');
const sections = Array.from(document.querySelectorAll('.section'));

function setActiveLink() {
  const scrollPos = window.pageYOffset + 120;
  let current = sections[0];
  for (const sec of sections) {
    if (sec.offsetTop <= scrollPos) current = sec;
  }
  navLinks.forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#' + current.id)
  );
}
window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Attach click behavior for nav links (offsets fixed header)
navLinks.forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const href = a.getAttribute('href').replace('#', '');
    scrollToSection(href);
  });
});

// Add .reveal to sections first, THEN set up IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.section').forEach(s => s.classList.add('reveal'));

  // Reveal on scroll using IntersectionObserver (runs AFTER .reveal is added)
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => io.observe(r));

  // Contact form
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const message = form.querySelector('textarea').value.trim();

      if (!name || !email) {
        alert('Please fill name and email.');
        return;
      }

      // Fallback: open mail client with prefilled content
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;

      form.reset();
    });
  }
});