const sharedViewsButtonSelector: string = 'button[data-garden-id="accordions.button"][id=":r0:--trigger:0"][aria-expanded="true"]';

const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    const button: HTMLButtonElement | null = document.querySelector(sharedViewsButtonSelector);
    if (button == null) {
      console.error("Zendesk Shared Views Collapser extension failed to find the shared views button.");
      return;
    }
    if (document.querySelector(sharedViewsButtonSelector)) {
      observer.disconnect();
      button.click();
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true });