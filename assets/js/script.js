// Placeholder — small enhancements could be added here later
document.addEventListener('DOMContentLoaded', () => {
  // simple fade-in on load
  document.body.style.opacity = 0;
  setTimeout(() => document.body.style.transition = 'opacity 400ms', 10);
  setTimeout(() => document.body.style.opacity = 1, 20);
});
