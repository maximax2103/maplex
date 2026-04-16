const modal = document.querySelector("#lead-modal");
const openButtons = document.querySelectorAll("[data-open-modal]");
const closeButtons = document.querySelectorAll("[data-close-modal]");
const form = document.querySelector("#lead-form");
const result = document.querySelector("#form-result");
const revealItems = document.querySelectorAll(".reveal");
const typedItems = document.querySelectorAll(".typed-text");

function openModal() {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const firstInput = modal.querySelector("input");
  if (firstInput) {
    window.setTimeout(() => firstInput.focus(), 80);
  }
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

openButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const business = String(data.get("business") || "").trim();
  const contact = String(data.get("contact") || "").trim();

  if (!name || !business || !contact) {
    result.textContent = "Пожалуйста, заполните обязательные поля.";
    result.className = "form-result error";
    return;
  }

  result.textContent = "Спасибо! Заявка принята. Здесь можно подключить отправку в CRM, Telegram или email.";
  result.className = "form-result success";
  form.reset();

  window.setTimeout(() => {
    closeModal();
    result.textContent = "";
    result.className = "form-result";
  }, 2200);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function runTypingEffect() {
  typedItems.forEach((item) => {
    const fullText = item.dataset.typedText || item.textContent || "";

    if (!fullText) {
      return;
    }

    if (prefersReducedMotion) {
      item.textContent = fullText;
      return;
    }

    item.textContent = "";

    let index = 0;

    const typeNext = () => {
      item.textContent = fullText.slice(0, index + 1);
      index += 1;

      if (index < fullText.length) {
        const currentChar = fullText[index];
        const delay = currentChar === " " ? 120 : 82;
        window.setTimeout(typeNext, delay);
      }
    };

    window.setTimeout(typeNext, 520);
  });
}

window.addEventListener("load", runTypingEffect);
