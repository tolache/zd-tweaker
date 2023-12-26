const sharedViewsButtonSelector: string = 'button[data-garden-id="accordions.button"][id=":r0:--trigger:0"]';

const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    if (document.querySelector(sharedViewsButtonSelector)) {
      observer.disconnect();
      updateElement();
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true });

async function updateElement() {
  const button = document.querySelector(sharedViewsButtonSelector);
  if (button == null || button.textContent == null) {
    return;
  }
  if (button.textContent.includes("Shared")) {
    button.textContent = "Shared (hi from the extension)";
  }
}