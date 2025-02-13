
import { getParam, onStart, setParamWithoutReload } from "@needle-tools/engine";


const quotesAboutHealth = [
    "The greatest wealth is health.",
    "It is health that is real wealth and not pieces of gold and silver.",
    "Health is the crown on the well person’s head that only the ill person can see.",
    "To keep the body in good health is a duty… otherwise we shall not be able to keep our mind strong and clear.",
    "The first wealth is health.",
    "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship."
]

onStart(() => {
    const calendarElement = document.querySelector(".calendar");
    calendarElement?.classList.remove("hidden")
    const quoteElement = document.querySelector("#quote");
    if (quoteElement) {
        let quote = getParam("quote");
        if (typeof quote != "string") quote = quotesAboutHealth[Math.floor(Math.random() * quotesAboutHealth.length)];
        quoteElement.textContent = quote;
        setParamWithoutReload("quote", quote);
    }

    const shareButton = document.querySelector<HTMLButtonElement>("button#share");
    if (shareButton) {
        shareButton.addEventListener("click", () => {
            if (navigator.share) {
                navigator.share({
                    title: "Share Link",
                    url: window.location.href
                }).catch(() => {
                    // ignore cancel
                });
            } else {
                console.error("Web Share API not supported");
            }
        })
    }
})