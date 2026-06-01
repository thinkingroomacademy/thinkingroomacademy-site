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

// Centralized Web App Script URL (Set this to your deployed Apps Script URL)
const GOOGLE_APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzR9ofFNftImKd1pI-1-SS4YlGH9S5sL_canPLmn_zVRaxb9Eq6eTS4ICGe6Vk5fQn3lw/exec";

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

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton ? submitButton.textContent : "Submit";

  if (!validateForm(form)) {
    return;
  }

  // Honeypot validation
  if (form.website_confirm && form.website_confirm.value) {
    console.warn("Spam submission blocked.");
    return;
  }

  if (GOOGLE_APP_SCRIPT_URL === "YOUR_DEPLOYED_WEB_APP_URL_HERE") {
    console.warn("GOOGLE_APP_SCRIPT_URL is not configured. Simulating successful local submission.");
    showFormSuccess(form);
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
  }

  const formData = new FormData(form);

  fetch(GOOGLE_APP_SCRIPT_URL, {
    method: "POST",
    body: formData,
    mode: "no-cors"
  })
  .then(response => {
    // Under mode: "no-cors", the response is opaque. 
    // If the network request was successfully dispatched, we treat it as a success.
    showFormSuccess(form);
  })
  .catch(error => {
    console.error("Form submission failed:", error);
    alert("There was a technical issue submitting your interest. Please try again later.");
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

function showFormSuccess(form) {
  form.innerHTML = `
    <div class="form-success-message" style="padding: 1.5rem; text-align: center; border: 1px solid var(--border-color); border-radius: 4px; background-color: var(--bg-secondary); margin-top: var(--spacing-md);">
      <h4 style="margin: 0 0 0.5rem 0; color: var(--accent-color); font-family: var(--font-sans); font-size: 1.1rem; font-weight: 600;">Interest Recorded</h4>
      <p style="margin: 0; font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">Thank you. Your reflections have been received. We will connect soon.</p>
    </div>
  `;
}

// Attach listeners on load
window.addEventListener('DOMContentLoaded', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateThemeButtonText(currentTheme);
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.addEventListener('click', toggleTheme);
  }

  const forms = document.querySelectorAll('.intent-form');
  forms.forEach(form => {
    form.removeAttribute('onsubmit'); // Remove static onsubmit handler
    form.addEventListener('submit', handleFormSubmit);
  });
});
