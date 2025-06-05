import { showMessage } from "./message.js";

// Source: Inspiration from JS1 project - Square Eyes

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!name || !email || !message) {
    showMessage("Please fill out all fields before sending.");
    return;
  }
  showMessage(`Thank you for the message, ${name}!`);
  form.reset();
});
