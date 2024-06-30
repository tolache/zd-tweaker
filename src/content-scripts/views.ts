import "./views.ts";

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

(async () => {
    const collapsed = await isSharedViewsCollapsed();
    if (collapsed) {
        observer.observe(document, {attributes: true, subtree: true});
    }
})();

async function isSharedViewsCollapsed(): Promise<boolean> {
    let collapseSharedViewsStorageValue = false;
    await new Promise((resolve, reject) => {
        chrome.storage.local.get(["collapseSharedViews"], (result) => {
            if(chrome.runtime.lastError) {
                console.error("Error reading collapseSharedViews from storage: ", chrome.runtime.lastError);
                return reject(chrome.runtime.lastError);
            }
            if (result?.collapseSharedViews === undefined) {
                collapseSharedViewsStorageValue = true;
            } else {
                collapseSharedViewsStorageValue = result?.collapseSharedViews;
            }
            resolve(collapseSharedViewsStorageValue);
        });
    });
    return collapseSharedViewsStorageValue;
}