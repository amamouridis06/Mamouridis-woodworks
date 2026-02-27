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

// --- Kitchen Planner ---
const plannerForm = document.getElementById("plannerForm");
const layoutEl = document.getElementById("layout");
const lenAEl = document.getElementById("lenA");
const lenBEl = document.getElementById("lenB");
const lenCEl = document.getElementById("lenC");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const topFinishEl = document.getElementById("topFinish");
const colorEl = document.getElementById("color");
const notesEl = document.getElementById("notes");

const summaryText = document.getElementById("summaryText");
const sendMailto = document.getElementById("sendMailto");
const sendFormspree = document.getElementById("sendFormspree");
const resetPlanner = document.getElementById("resetPlanner");

const shapeI = document.getElementById("shapeI");
const shapeL = document.getElementById("shapeL");
const shapeU = document.getElementById("shapeU");

function setLayoutUI() {
  const layout = layoutEl?.value || "I";

  // show/hide dimension inputs
  const dimB = document.querySelector(".dimB");
  const dimC = document.querySelector(".dimC");

  if (dimB) dimB.style.display = (layout === "I") ? "none" : "grid";
  if (dimC) dimC.style.display = (layout === "U") ? "grid" : "none";

  // show shapes
  if (shapeI) shapeI.style.display = (layout === "I") ? "block" : "none";
  if (shapeL) shapeL.style.display = (layout === "L") ? "block" : "none";
  if (shapeU) shapeU.style.display = (layout === "U") ? "block" : "none";
}

function buildSummary() {
  const layout = layoutEl.value;
  const lenA = Number(lenAEl.value || 0);
  const lenB = Number(lenBEl.value || 0);
  const lenC = Number(lenCEl.value || 0);

  const upper = upperEl.value;
  const lower = lowerEl.value;
  const topFinish = topFinishEl.value;
  const color = (colorEl.value || "").trim();
  const notes = (notesEl.value || "").trim();

  // Simple “linear length” estimation (for a quick quote)
  let run = lenA;
  if (layout === "L") run = lenA + lenB;
  if (layout === "U") run = lenA + lenB + lenC;

  const lines = [];
  lines.push("ΣΥΝΟΨΗ ΚΟΥΖΙΝΑΣ");
  lines.push("------------------------------");
  lines.push(`Διάταξη: ${layout}`);
  lines.push(`Διαστάσεις: A=${lenA}cm${layout !== "I" ? `, B=${lenB}cm` : ""}${layout === "U" ? `, C=${lenC}cm` : ""}`);
  lines.push(`Συνολικό μήκος (ενδεικτικό): ~${run}cm`);
  lines.push(`Πάνω ντουλάπια: ${upper}`);
  lines.push(`Κάτω ντουλάπια: ${lower}`);
  lines.push(`Πάγκος: ${topFinish}`);
  lines.push(`Χρώμα/Απόχρωση: ${color || "—"}`);
  lines.push(`Σημειώσεις: ${notes || "—"}`);

  return lines.join("\n");
}

function updateMailto(summary) {
  // ΒΑΛΕ ΕΔΩ ΤΟ EMAIL ΣΟΥ:
  const toEmail = "info@mwoodworks.gr";
  const subject = encodeURIComponent("Αίτημα προσφοράς – Σχεδιασμός κουζίνας");
  const body = encodeURIComponent(summary);

  sendMailto.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
}

async function sendViaFormspree(summary) {
  const endpoint = sendFormspree?.dataset?.endpoint;
  if (!endpoint) {
    alert("Βάλε πρώτα Formspree endpoint στο data-endpoint (π.χ. https://formspree.io/f/xxxx).");
    return;
  }

  sendFormspree.disabled = true;
  const oldText = sendFormspree.textContent;
  sendFormspree.textContent = "Αποστολή...";

  try {
    const data = new FormData();
    data.append("summary", summary);
    data.append("_subject", "Αίτημα προσφοράς – Kitchen Planner");

    const res = await fetch(endpoint, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    });

    if (res.ok) {
      sendFormspree.textContent = "Εστάλη ✅";
    } else {
      sendFormspree.textContent = "Σφάλμα ❌";
    }
  } catch (e) {
    sendFormspree.textContent = "Σφάλμα ❌";
  } finally {
    setTimeout(() => {
      sendFormspree.disabled = false;
      sendFormspree.textContent = oldText;
    }, 2000);
  }
}

if (layoutEl) {
  layoutEl.addEventListener("change", setLayoutUI);
  setLayoutUI();
}

if (plannerForm) {
  plannerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    setLayoutUI();
    const summary = buildSummary();
    summaryText.textContent = summary;
    updateMailto(summary);
  });
}

if (sendFormspree) {
  sendFormspree.addEventListener("click", async () => {
    const summary = summaryText.textContent || "";
    if (!summary || summary.includes("Συμπλήρωσε")) {
      alert("Πρώτα πάτα “Δημιουργία σύνοψης”.");
      return;
    }
    await sendViaFormspree(summary);
  });
}

if (resetPlanner) {
  resetPlanner.addEventListener("click", () => {
    plannerForm.reset();
    setLayoutUI();
    summaryText.textContent = "Συμπλήρωσε τα πεδία και πάτα “Δημιουργία σύνοψης”.";
    sendMailto.href = "#";
  });
}
