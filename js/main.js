// Mobile menu toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu on link click (mobile)
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// To-top button
const toTop = document.querySelector(".to-top");
window.addEventListener("scroll", () => {
  if (!toTop) return;
  if (window.scrollY > 600) toTop.classList.add("show");
  else toTop.classList.remove("show");
});

// Contact form -> opens mail client with prefilled message
// Contact form -> sends via Formspree (no mailto)
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const original = btn ? btn.textContent : null;

    if (btn) {
      btn.disabled = true;
      btn.textContent = "Αποστολή...";
    }

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        form.reset();
        if (btn) btn.textContent = "Εστάλη ✅";
      } else {
        if (btn) btn.textContent = "Σφάλμα ❌";
      }
    } catch (err) {
      if (btn) btn.textContent = "Σφάλμα ❌";
    } finally {
      setTimeout(() => {
        if (btn && original) {
          btn.disabled = false;
          btn.textContent = original;
        }
      }, 2000);
    }
  });
}

const toTopBtn = document.querySelector(".to-top");

if (toTopBtn) {
  toTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
