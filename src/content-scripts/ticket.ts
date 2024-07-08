import "./ticket.ts";
import { getChromeStorageValue} from "./_utils";

const infoBarSelector: string = ".conversation-polaris > div > div";

const observer = new MutationObserver(() => {
    const infoBars: NodeListOf<HTMLDivElement> | null = document.querySelectorAll(infoBarSelector);
    if (infoBars.length > 0) {
        infoBars.forEach((infoBar) => {
            if (infoBar.textContent?.trim().startsWith("Shared with") || infoBar.textContent?.trim().startsWith("This is an archived ticket")) {
                let infoBarParent = infoBar.parentNode;
                if (infoBarParent !== null) {
                    const infoDiv: HTMLDivElement = infoBarParent as HTMLDivElement;
                    infoDiv.style.display = "none";
                }
            }

            if (infoBar.textContent?.trim().startsWith("Follow-up") && infoBar.firstChild?.childNodes) {
                const navbarTicketButtonSelector: string = "span.ember-view.btn[data-tracking-id='tabs-section-nav-item-ticket']";
                const followUpsButtonSelector: string = ".zd-tweaker.follow-ups";
                const parentTicketButtonSelector: string = ".zd-tweaker.parent-ticket";
                const navbarTicketButton = document.querySelector(navbarTicketButtonSelector);

                if (navbarTicketButton?.parentNode) {
                    const followUpsButtonAlreadyAdded = navbarTicketButton?.parentNode.querySelector(followUpsButtonSelector);
                    const parentTicketButtonAlreadyAdded = navbarTicketButton?.parentNode.querySelector(parentTicketButtonSelector);

                    const linkedTicketsButton: HTMLSpanElement = document.createElement("span");
                    linkedTicketsButton.classList.add("btn");
                    linkedTicketsButton.classList.add("zd-tweaker");

                    const infoBarIsFollowUps: boolean = infoBar.textContent?.trim().startsWith("Follow-ups");
                    if (infoBarIsFollowUps && !followUpsButtonAlreadyAdded) {
                        linkedTicketsButton.classList.add("follow-ups");

                        const followUpsButtonArrow = document.createElement("small");
                        followUpsButtonArrow.innerText = "❯ ";
                        linkedTicketsButton.appendChild(followUpsButtonArrow);

                        const ticketLinksAndSeparators = (infoBar.firstChild as HTMLElement).querySelector("strong")?.childNodes;
                        if (ticketLinksAndSeparators) {
                            for (const ticketLinkOrSeparator of Array.from(ticketLinksAndSeparators)) {
                                linkedTicketsButton.appendChild(ticketLinkOrSeparator);
                            }
                        }

                        if (!navbarTicketButton?.parentNode.querySelector(".zd-tweaker.follow-ups")) {
                            navbarTicketButton.parentNode.insertBefore(linkedTicketsButton, navbarTicketButton.nextSibling);
                        }
                    }

                    const infoBarIsParentTicket: boolean = infoBar.textContent?.trim().startsWith("Follow-up to ticket");
                    if (infoBarIsParentTicket && !parentTicketButtonAlreadyAdded) {
                        linkedTicketsButton.classList.add("parent-ticket");
                        const ticketLinksAndSeparators = (infoBar.firstChild as HTMLElement).querySelector("strong")?.childNodes;
                        if (ticketLinksAndSeparators) {
                            for (const ticketLinkOrSeparator of Array.from(ticketLinksAndSeparators)) {
                                linkedTicketsButton.appendChild(ticketLinkOrSeparator);
                            }
                        }

                        const parentTicketButtonArrow = document.createElement("small");
                        parentTicketButtonArrow.innerText = " ❮";
                        linkedTicketsButton.appendChild(parentTicketButtonArrow);

                        navbarTicketButton.parentNode.insertBefore(linkedTicketsButton, navbarTicketButton);
                    }

                    let infoBarParent = infoBar.parentNode;
                    if (infoBarParent !== null) {
                        const infoDiv: HTMLDivElement = infoBarParent as HTMLDivElement;
                        infoDiv.style.display = "none";
                    }
                }
            }
        });
    }
});

(async () => {
    const hideTicketInfoBars = await getChromeStorageValue("hideTicketInfoBars");
    if (hideTicketInfoBars) {
        observer.observe(document, {attributes: true, subtree: true});
    }
})();