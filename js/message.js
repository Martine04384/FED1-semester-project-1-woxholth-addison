// Source: Inspiration from JS1 project - Square Eyes

export function showMessage(message) {
  const dialog = document.getElementById("dialog");
  const messageElement = document.getElementById("dialog-message");

  messageElement.textContent = message;

  dialog.showModal();

  const closeButton = document.getElementById("close-dialog");
  closeButton.addEventListener("click", () => dialog.close(), { once: true });
}
