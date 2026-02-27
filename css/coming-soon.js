// Ρύθμισε εδώ την ημερομηνία λήξης (ώρα Ελλάδας / Europe-Athens)
const TARGET = new Date("2026-04-01T12:00:00+03:00"); // άλλαξέ το!

const dd = document.getElementById("dd");
const hh = document.getElementById("hh");
const mm = document.getElementById("mm");
const ss = document.getElementById("ss");

function pad(n) {
  return String(n).padStart(2, "0");
}

function tick() {
  const now = new Date();
  let diff = TARGET.getTime() - now.getTime();

  if (diff <= 0) {
    dd.textContent = "00";
    hh.textContent = "00";
    mm.textContent = "00";
    ss.textContent = "00";
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  dd.textContent = pad(days);
  hh.textContent = pad(hours);
  mm.textContent = pad(mins);
  ss.textContent = pad(secs);
}

tick();
setInterval(tick, 1000);
