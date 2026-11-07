const dialog = document.getElementById('figure-dialog');
let figureTrigger = null;

if (dialog && typeof dialog.showModal === 'function') {
  const image = document.getElementById('figure-image');
  const title = document.getElementById('figure-title');
  const caption = document.getElementById('figure-caption');
  const original = document.getElementById('figure-original');
  document.querySelectorAll('[data-figure]').forEach(link => {
    link.addEventListener('click', event => {
      // Keep new-tab and download shortcuts working as ordinary links.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      figureTrigger = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      title.textContent = link.dataset.title;
      caption.textContent = link.dataset.caption || "";
      caption.hidden = !link.dataset.caption;
      const isPhoto = link.classList.contains("travel-photo");
      dialog.classList.toggle("photo-dialog", isPhoto);
      original.textContent = isPhoto ? "Open photo ↗" : "Open full-size image ↗";
      original.href = link.href;
      dialog.showModal();
    });
  });
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => figureTrigger?.focus({ preventScroll: true }));
}

const navLinks = Array.from(document.querySelectorAll('nav a'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('#home, #research, #publications, #education, #beyond-research').forEach(section => observer.observe(section));
}
