import { showMessage } from "./utilities/message.js";
import { cart, loadCart, saveCart } from "./utilities/save-and-load-cart.js";

// Source: Inspiration from JS1 project - Square Eyes

function displayCart() {
  const cartContainer = document.querySelector(".order-summary");
  cartContainer.innerHTML = "";
  let total = 0;

  const headerDiv = document.createElement("div");
  headerDiv.classList.add("cart-header");

  const titleHeader = document.createElement("h3");
  titleHeader.textContent = "Event";

  const ticketHeader = document.createElement("h3");
  ticketHeader.textContent = "Tickets";

  const priceHeader = document.createElement("h3");
  priceHeader.textContent = "Price";

  const actionsHeader = document.createElement("h3");
  actionsHeader.textContent = "Remove";

  headerDiv.appendChild(titleHeader);
  headerDiv.appendChild(ticketHeader);
  headerDiv.appendChild(priceHeader);
  headerDiv.appendChild(actionsHeader);

  cartContainer.appendChild(headerDiv);

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-row");

    const title = document.createElement("p");
    title.textContent = item.title;

    const quantityButtons = document.createElement("div");
    quantityButtons.classList.add("quantity-buttons");

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", () => decreaseQuantity(index));

    const quantity = document.createElement("p");
    quantity.textContent = item.quantity;

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () => increaseQuantity(index));

    quantityButtons.appendChild(decreaseButton);
    quantityButtons.appendChild(quantity);
    quantityButtons.appendChild(increaseButton);

    const price = document.createElement("p");
    const itemTotal = (item.price * item.quantity).toFixed(2);
    price.textContent = `$${itemTotal}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-from-cart");
    removeButton.setAttribute("data-index", index);
    removeButton.addEventListener("click", () => removeFromCart(index));

    itemDiv.appendChild(title);
    itemDiv.appendChild(quantityButtons);
    itemDiv.appendChild(price);
    itemDiv.appendChild(removeButton);

    cartContainer.appendChild(itemDiv);

    total = total + item.price * item.quantity;
  });

  const totalDiv = document.createElement("div");
  const totalLabel = document.createElement("p");
  totalLabel.textContent = "Total";
  const totalPrice = document.createElement("p");
  totalPrice.textContent = `$${total.toFixed(2)}`;

  totalDiv.appendChild(totalLabel);
  totalDiv.appendChild(totalPrice);
  cartContainer.appendChild(totalDiv);
}

function increaseQuantity(index) {
  let currentQuantity = cart[index].quantity;
  let newQuantity = currentQuantity + 1;
  cart[index].quantity = newQuantity;
  saveCart();
  displayCart();
}

function decreaseQuantity(index) {
  let currentQuantity = cart[index].quantity;
  if (currentQuantity > 1) {
    let newQuantity = currentQuantity - 1;
    cart[index].quantity = newQuantity;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
  displayCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const streetNumber = document.getElementById("streetnumber").value.trim();
  const postalCode = document.getElementById("postalcode").value.trim();
  const city = document.getElementById("city").value.trim();
  const country = document.getElementById("country").value.trim();
  const cardNumber = document.getElementById("cardnumber").value.trim();
  const expiry = document.getElementById("expiry").value.trim();
  const cvc = document.getElementById("cvc").value.trim();

  if (name.length < 2) {
    showMessage("Please enter your full name.");
    return;
  }

  if (!email.includes("@") || !email.includes(".com")) {
    showMessage("Please enter a valid email.");
    return;
  }

  if (address.length < 3) {
    showMessage("Please enter a valid street name.");
    return;
  }

  if (streetNumber === "" || isNaN(streetNumber)) {
    showMessage("Please enter a valid street number.");
    return;
  }

  if (postalCode === "" || isNaN(postalCode)) {
    showMessage("Please enter a valid postal code.");
    return;
  }

  if (city.length < 2) {
    showMessage("Please enter a valid city.");
    return;
  }

  if (country.length < 2) {
    showMessage("Please enter a valid country.");
    return;
  }

  if (cardNumber.length < 12 || cardNumber.length > 19) {
    showMessage("Card number must be between 12 and 19 digits.");
    return;
  }

  if (cvc.length !== 3 || isNaN(cvc)) {
    showMessage("CVC must be exactly 3 digits.");
    return;
  }

  if (expiry.length < 4 || isNaN(expiry)) {
    showMessage("Please enter a valid expiry date.");
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "./check-out-success.html";
});

loadCart();
displayCart();
