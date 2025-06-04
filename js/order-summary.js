import { showMessage } from "./message.js";

// Source: Code implemented from JS1 Square Eyes

document.addEventListener("DOMContentLoaded", () => {
  const orderContainer = document.querySelector(".order-summary");

  try {
    const orderSummary = JSON.parse(localStorage.getItem("cart"));

    if (!orderSummary || orderSummary.length === 0) {
      const emptyMessage = document.createElement("h2");
      emptyMessage.textContent = "Your cart is empty.";
      orderContainer.appendChild(emptyMessage);
      return;
    }

    let total = 0;

    orderSummary.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-row");

      const itemTitle = document.createElement("h3");
      itemTitle.textContent = item.title;
      itemTitle.textContent = `${item.title} (x${item.quantity})`;

      const itemPrice = document.createElement("h4");

      const itemTotal = (item.price * item.quantity).toFixed(2);
      itemPrice.textContent = `$${itemTotal}`;

      itemDiv.appendChild(itemTitle);
      itemDiv.appendChild(itemPrice);
      orderContainer.appendChild(itemDiv);

      total = total + item.price * item.quantity;
    });

    const totalContainer = document.createElement("h3");
    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
    orderContainer.appendChild(totalContainer);
  } catch (error) {
    console.error("Error loading movie:", error);
    showMessage(error.message);
  }
});

const backToExhibitionsBtn = document.querySelector(".cta-button");
backToExhibitionsBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");
});
