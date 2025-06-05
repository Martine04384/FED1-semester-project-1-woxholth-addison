import { showMessage } from "./message.js";

// Source: Inspiration from JS1 project - Square Eyes

export let cart = [];

export function loadCart() {
  try {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      cart = JSON.parse(storedCart);
    }
  } catch (error) {
    console.error("Failed to get cart from localStorage:", error);
    showMessage(error.message);
    cart = [];
  }
}

export function saveCart() {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart:", error);
    showMessage(error.message);
  }
}
