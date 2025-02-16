import { getParam, onStart } from "@needle-tools/engine";
import "./scripts/CustomParticleBehaviour.js";

const quotesAboutHealthEN = [
    "The greatest wealth is health.",
    "It is health that is real wealth and not pieces of gold and silver.",
    "Health is the crown on the well person’s head that only the ill person can see.",
    "To keep the body in good health is a duty… otherwise we shall not be able to keep our mind strong and clear.",
    "The first wealth is health.",
    "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship."
]

const quotesAboutHealthDE = [
    "Der größte Reichtum ist die Gesundheit.",
    "Gesundheit ist der wahre Reichtum, nicht Gold und Silber.",
    "Gesundheit ist die Krone auf dem Kopf eines Gesunden, die nur der Kranke sehen kann.",
    "Den Körper gesund zu halten, ist eine Pflicht... andernfalls können wir unseren Geist nicht stark und klar halten.",
    "Der erste Reichtum ist die Gesundheit.",
    "Gesundheit ist das größte Geschenk, Zufriedenheit der größte Reichtum, Treue die beste Beziehung."
];

const quotesAboutHealthAR = [
    "أعظم ثروة هي الصحة.",
    "الصحة هي الثروة الحقيقية وليست الذهب والفضة.",
    "الصحة تاج على رؤوس الأصحاء لا يراه إلا المرضى.",
    "المحافظة على صحة الجسم واجب... وإلا فلن نستطيع الحفاظ على عقلنا قوياً وواضحاً.",
    "الثروة الأولى هي الصحة.",
    "الصحة هي أعظم هدية، والرضا أكبر ثروة، والوفاء أفضل علاقة."
];

const quotesAboutHealthTR = [
    "En büyük zenginlik sağlıktır.",
    "Gerçek zenginlik sağlık, altın ve gümüş değildir.",
    "Sağlık, ancak hasta kişilerin görebildiği sağlıklı kişi başındaki tahttır.",
    "Vücudu sağlıklı tutmak bir görevdir... aksi takdirde zihnimizi güçlü ve berrak tutamayız.",
    "İlk zenginlik sağlıktır.",
    "Sağlık en büyük armağan, huzur en büyük zenginlik, sadakat en iyi ilişkidir."
];

const quotes = {
    "en": quotesAboutHealthEN,
    "de": quotesAboutHealthDE,
    "ar": quotesAboutHealthAR,
    "tr": quotesAboutHealthTR
}

const cms = {
    "en": {
        "share": "Share",
    },
    "de": {
        "share": "Teilen",
    },
    "ar": {
        "share": "مشاركة",
    },
    "tr": {
        "share": "Paylaş",
    }
}

onStart(() => {
    const calendarElement = document.querySelector(".calendar");
    calendarElement?.classList.remove("hidden")
    const quoteElement = document.querySelector("#quote");
    let lang = (getParam("lang") || "de") as "en" | "de" | "ar" | "tr";

    if (!["en", "de", "ar", "tr"].includes(lang)) lang = "de";

    if (quoteElement) {
        let quote = getParam("quote");
        const quotesAboutHealth = quotes[lang];
        if (typeof quote != "string") quote = quotesAboutHealth[Math.floor(Math.random() * quotesAboutHealth.length)];
        quoteElement.textContent = quote;
        // setParamWithoutReload("quote", quote);
        // fetch("https://api.quotable.io/random").then(res => {
        //     console.log(res.status)
        // })
    }

    const shareButton = document.querySelector<HTMLButtonElement>("button#share");
    if (shareButton) {
        const cmsText = cms[lang];
        shareButton.textContent = cmsText["share"];
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