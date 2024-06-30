import "./ticket.ts";

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

(async () => {
    const hidden = await isTicketInfoBarsHidden();
    if (hidden) {
        observer.observe(document, {attributes: true, subtree: true});
    }
})();

async function isTicketInfoBarsHidden(): Promise<boolean> {
    let hideTicketInfoBarsStorageValue = false;
    await new Promise((resolve, reject) => {
        chrome.storage.local.get(["hideTicketInfoBars"], (result) => {
            if(chrome.runtime.lastError) {
                console.error("Error reading hideTicketInfoBars from storage: ", chrome.runtime.lastError);
                return reject(chrome.runtime.lastError);
            }
            hideTicketInfoBarsStorageValue = result?.hideTicketInfoBars;
            resolve(hideTicketInfoBarsStorageValue);
        });
    });
    return hideTicketInfoBarsStorageValue;
}