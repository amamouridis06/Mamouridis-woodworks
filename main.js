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
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = encodeURIComponent("Προσφορά από site (M Woodworks)");
  const body = encodeURIComponent(
    `Ονοματεπώνυμο: ${name}\n` +
    `Τηλέφωνο: ${phone}\n` +
    `Email: ${email}\n\n` +
    `Μήνυμα:\n${message}\n`
  );

  // άλλαξε το email σου εδώ:
  window.location.href = `mailto:info@mwoodworks.gr?subject=${subject}&body=${body}`;
  return false;
}

window.handleSubmit = handleSubmit;
