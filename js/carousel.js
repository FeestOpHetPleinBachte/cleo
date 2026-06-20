// carousel.js — maakt van elke [data-carousel] een echte carousel:
// vorige/volgende-knoppen die per kaart doorschuiven en uitgrijzen aan de
// randen. Zonder JS blijft de track gewoon horizontaal scrollbaar
// (progressive enhancement).

export function initCarousels() {
  const carousels = document.querySelectorAll("[data-carousel]");
  carousels.forEach(setupCarousel);
}

function setupCarousel(carousel) {
  const track = carousel.querySelector("[data-carousel-track]");
  const controls = carousel.querySelector("[data-carousel-controls]");
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  if (!track || !controls || !prev || !next) return;

  prev.addEventListener("click", () => moveCarousel(track, -1));
  next.addEventListener("click", () => moveCarousel(track, 1));
  track.addEventListener("scroll", () => updateControls(track, controls, prev, next));
  window.addEventListener("resize", () => updateControls(track, controls, prev, next));
  updateControls(track, controls, prev, next);
}

function moveCarousel(track, direction) {
  track.scrollBy({ left: stepSize(track) * direction, behavior: "smooth" });
}

function stepSize(track) {
  const first = track.firstElementChild;
  if (!first) return track.clientWidth;
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
  return first.getBoundingClientRect().width + gap;
}

function updateControls(track, controls, prev, next) {
  const overflow = track.scrollWidth - track.clientWidth;
  controls.hidden = overflow <= 1;
  setDisabled(prev, track.scrollLeft <= 0);
  setDisabled(next, track.scrollLeft >= overflow - 1);
}

function setDisabled(button, disabled) {
  button.disabled = disabled;
  button.setAttribute("aria-disabled", String(disabled));
}
