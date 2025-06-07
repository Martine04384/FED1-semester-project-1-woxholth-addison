import { cart, saveCart } from "./save-and-load-cart.js";
import { showMessage } from "./message.js";

// Source: Inspiration from JS1 project - Square Eyes

export function addToCart(id, title, quantity = 1, price = 0) {
  try {
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem = { id, title, price, quantity };
      cart.push(newItem);
    }

    saveCart();
    showMessage(`Ticket added to cart!`);
  } catch (error) {
    console.error("Error adding to cart:", error);
    showMessage(
      "Could not add item to cart. On some iPads, you may need to add one ticket type at a time. We're aware of this issue and working on a solution."
      // Problem detected, havent found a solution yet. Added user message for users experiencing this issue.
    );
  }
}
