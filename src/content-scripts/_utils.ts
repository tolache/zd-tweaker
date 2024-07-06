import "./_utils.ts";

export async function getChromeStorageValue(key: string): Promise<boolean> {
    let chromeStorageValue = false;
    await new Promise((resolve, reject) => {
        chrome.storage.local.get([key], (result) => {
            if(chrome.runtime.lastError) {
                console.error(`Error reading ${key} from storage: `, chrome.runtime.lastError);
                return reject(chrome.runtime.lastError);
            }
            chromeStorageValue = result?.[key];
            resolve(chromeStorageValue);
        });
    });
    return chromeStorageValue;
}