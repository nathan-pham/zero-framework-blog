import { $, $$ } from "./utils/query.js";
import tweet from "./utils/tweet.js"

// make anchor direct to tweet
tweet($(".post__tweet a"))

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

// scroll to clicked item
postSummaryItems.forEach((item, i) => {
    item.addEventListener("click", () => {
        location.hash = item.textContent;
        setActive(i);
    });
});

// change active item in table of contents on scroll
const onScroll = () => {
    for (let i = 0; i < markdownItems.length; i++) {
        const item = markdownItems[i];

        if (Math.abs(item.getBoundingClientRect().top) < item.offsetHeight) {
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
};

window.addEventListener("scroll", onScroll);
setActive(0);