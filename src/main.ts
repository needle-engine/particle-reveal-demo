
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
    const quoteElement = document.querySelector("#quote");
    if (quoteElement) {
        let quote = getParam("quote");
        if (typeof quote != "string") quote = quotesAboutHealth[Math.floor(Math.random() * quotesAboutHealth.length)];
        quoteElement.textContent = quote;
        setParamWithoutReload("quote", quote);
        fetch("https://api.quotable.io/quotes/random")
            .then(res => {
                console.log(res.status)
            })
            .catch(err => {
                console.debug(err)
            })

    }
})