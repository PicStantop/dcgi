// Active nav link
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navbar .nav-link').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// Scroll fade-in
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
if (lb && lbImg) {
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => { lbImg.src = img.src; lb.classList.add('open'); document.body.style.overflow = 'hidden'; });
  });
  document.getElementById('lbClose').addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
  function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
}

// Gallery filter
window.filterGallery = function (cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gallery-col').forEach(col => {
    const item = col.querySelector('.gallery-item');
    col.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
  });
};

// Contact form
const cf = document.getElementById('contactForm');
if (cf) {
  cf.addEventListener('submit', e => {
    e.preventDefault();
    const btn = cf.querySelector('.btn-submit');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#16a34a'; btn.style.color = '#fff';
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; btn.style.color = ''; cf.reset(); }, 3500);
  });
}
