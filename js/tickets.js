import { showMessage } from "./message.js";
import { loadCart, saveCart } from "./save-and-load-cart.js";
import { addToCart } from "./add-to-cart.js";

// Source: Inspiration from JS1 project - Square Eyes

loadCart();

// Quantity buttons
document.querySelectorAll(".qty-container").forEach((container) => {
  const minus = container.querySelector(".qty-count-minus");
  const plus = container.querySelector(".qty-count-plus");
  const input = container.querySelector(".qty-count");

  if (minus && plus && input) {
    minus.addEventListener("click", () => {
      input.stepDown();
    });

    plus.addEventListener("click", () => {
      input.stepUp();
    });
  }
});

// Add to cart button event
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const container = button.closest("section, article");

    container.querySelectorAll(".qty-count").forEach((input) => {
      const quantity = parseInt(input.value);
      if (quantity > 0) {
        const id = input.dataset.id;
        const title = input.dataset.title;
        const price = parseFloat(input.dataset.price);

        addToCart(id, title, quantity, price);
      }

      input.value = 0;
    });

    saveCart();
  });
});
