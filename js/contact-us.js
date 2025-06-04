import { showMessage } from "./message.js";

// Source: Code from JS - Square Eyes

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.elements.name.value;
  showMessage(`Thank you for the message, ${name}!`);
  form.reset();
});
