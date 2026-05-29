/* Minimalist Theme Controller */
(function () {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButtonText(newTheme);
}

function updateThemeButtonText(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.textContent = theme === 'dark' ? '[ Light Theme ]' : '[ Dark Theme ]';
  }
}

// Bind event listener after content is loaded
window.addEventListener('DOMContentLoaded', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateThemeButtonText(currentTheme);
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.addEventListener('click', toggleTheme);
  }
});

function validateForm(form) {
  const name = form.name ? form.name.value.trim() : '';
  const email = form.email ? form.email.value.trim() : '';
  const phone = form.phone ? form.phone.value.trim() : '';
  const reflection = form.reflection ? form.reflection.value.trim() : '';
  
  if (!name && !email && !phone && !reflection) {
    alert("Please share at least one detail so we can understand your interest.");
    return false;
  }
  return true;
}
