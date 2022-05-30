import { $, $$ } from "./utils/query.js";

const postSummaryList = $(".post__summary__list");
const postSummaryItems = $$(postSummaryList, "li");

// prettier-ignore
const markdownItems = $$(".markdown__content__html > h1").concat($$(".markdown__content__html > h2"))
// const firstOffset = markdownItems[0].getBoundingClientRect().top;

// give all main sections their ids (to enable jumping)
markdownItems.forEach((item) => {
    item.id = item.textContent;
});

// set active post
const setActive = (i) => {
    if (i >= 0) {
        for (const item of postSummaryItems) {
            item.classList.remove("active");
        }

        postSummaryItems[i].classList.add("active");
    }
};

postSummaryItems.forEach((item, i) => {
    item.addEventListener("click", () => {
        location.hash = item.textContent;
        setActive(i);
    });
});

const onScroll = () => {
    for (let i = 0; i < markdownItems.length; i++) {
        const item = markdownItems[i]

        if (
            Math.abs(item.getBoundingClientRect().top) <
            item.offsetHeight
        ) {
            setActive(
                postSummaryItems.indexOf(
                    postSummaryItems.find(
                        (summaryItem) =>
                            summaryItem.textContent === item.textContent
                    )
                )
            );

            return;
        }
    }
}

window.addEventListener("scroll", onScroll);
onScroll();