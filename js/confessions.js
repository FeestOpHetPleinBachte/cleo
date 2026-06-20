// confessions.js — twee dingen: het "herken ik"-vinkje en het toevoegen
// van een nieuw moment. Zonder JS post het formulier naar confession.php.

export function initConfessions() {
  initRecogniseButtons();
  initConfessionForm();
}

function initRecogniseButtons() {
  const buttons = document.querySelectorAll(".confession__recognise");
  buttons.forEach((button) => {
    button.addEventListener("click", () => toggleRecognise(button));
  });
}

function toggleRecognise(button) {
  const counter = button.querySelector("[data-recognise-count]");
  if (!counter) return;
  const active = button.classList.toggle("is-active");
  const current = Number.parseInt(counter.textContent, 10) || 0;
  counter.textContent = String(active ? current + 1 : current - 1);
}

function initConfessionForm() {
  const form = document.querySelector(".confession-form");
  const list = document.querySelector("[data-feed]");
  if (!form || !list) return;
  form.addEventListener("submit", (event) => handleConfessionSubmit(event, form, list));
}

function handleConfessionSubmit(event, form, list) {
  const input = form.querySelector(".confession-form__input");
  const text = input.value.trim();
  if (text === "") return; // native required handelt dit verder af
  event.preventDefault();
  list.prepend(buildConfession(text));
  form.reset();
  input.focus();
}

function buildConfession(text) {
  const item = document.createElement("li");
  item.className = "confession";
  item.innerHTML =
    `<span class="confession__meta">${formatNow()} &middot; Jij</span>` +
    `<p class="confession__text"></p>` +
    `<button class="confession__recognise" type="button">` +
    `<span aria-hidden="true">&check;</span> <span data-recognise-count>0</span></button>`;
  item.querySelector(".confession__text").textContent = text;
  item.querySelector(".confession__recognise")
    .addEventListener("click", (event) => toggleRecognise(event.currentTarget));
  return item;
}

function formatNow() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}u${minutes}`;
}
