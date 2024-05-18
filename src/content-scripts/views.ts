import React from "react";

const expandedAccordionButtonSelector: string = 'button[data-garden-id="accordions.button"][aria-expanded="true"]';

const observer = new MutationObserver(() => {
    const buttons: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll(expandedAccordionButtonSelector);
    if (buttons.length > 0) {
        buttons.forEach((button) => {
            if (button.textContent?.trim() === "Shared") {
                button.click();
                observer.disconnect();
            }
        });
    }
});

observer.observe(document, {attributes: true, subtree: true});