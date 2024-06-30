import "./search.ts";

const searchInputElementSelector: string = 'input[data-garden-id="dropdowns.combobox.input"][aria-expanded="true"]';

(async () => {
    let preventHomeEndHijack = await getPreventHomeEndHijackStorageValue();
    if (preventHomeEndHijack) {
        document.addEventListener("keydown", handleHomeEndPress, true);
    }
})();

async function handleHomeEndPress(event: KeyboardEvent) {
    if (event.key === "Home" || event.key === "End") {
        const target = event.target as HTMLInputElement;
        if (target.matches(searchInputElementSelector)) {
            event.stopPropagation();
            event.preventDefault();
            event.key === "Home" ? target.setSelectionRange(0, 0) : target.setSelectionRange(-1, -1);
        }
    }
}

async function getPreventHomeEndHijackStorageValue(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("preventHomeEndHijack", (result) => {
            if (chrome.runtime.lastError) {
                console.error("Error reading preventHomeEndHijack from storage: ", chrome.runtime.lastError);
                return reject(chrome.runtime.lastError);
            }
            resolve(result?.preventHomeEndHijack || false);
        });
    });
}