import React from "react";

const infoBarSelector: string = '.conversation-polaris > div > div';

const observer = new MutationObserver(() => {
    const infoBars: NodeListOf<HTMLDivElement> | null = document.querySelectorAll(infoBarSelector);
    if (infoBars.length > 0) {
        infoBars.forEach((infoBar) => {
            if (infoBar.textContent?.trim().startsWith("Shared with")) {
                let infoBarParent = infoBar.parentNode;
                if (infoBarParent !== null) {
                    const infoDiv: HTMLDivElement = infoBarParent as HTMLDivElement;
                    infoDiv.style.display = "none";
                }
                observer.disconnect();
            }
        });
    }
});

observer.observe(document, {attributes: true, subtree: true});
