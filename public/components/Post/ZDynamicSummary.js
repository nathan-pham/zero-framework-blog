import Zero, { ZeroUtils } from "/lib/Zero.js";
import globalStyles from "/globalStyles.js";

const { jsh: h, $ } = ZeroUtils;
const styles = {
    postSummary: {
        ...globalStyles.postContainer,
        padding: "1rem",
        marginTop: "2rem",
        position: "sticky",
        top: "2rem",
    },
    postSummaryHeading: {
        margin: 0,
        fontSize: "1rem",
        fontWeight: 600,
    },
};

Zero.define(
    "z-dynamic-summary",
    class ZDynamicSummary extends Zero {
        ref = {
            width: 0,
        };

        style = `
            .sticky-active {
                position: fixed;
                top: 0;
            }

            .summaryList {
                --bullet-size: 0.75rem;
                --padding-left: 2rem;

                list-style: none;
                padding: 0 0 0 var(--padding-left);
                margin: 1rem 0 0 0;
                position: relative;
                max-height: calc(100vh - 4rem);
            }

            .summaryList::before {
                content: "";
                display: block;
                position: absolute;
                z-index: 0;
                height: calc(100% - (var(--bullet-size) * 3));
                width: 2px;
                top: var(--bullet-size);
                transform: translateX(calc(-1 * var(--padding-left) / 2 - 50%));
                background-color: var(--c-article-bg);
            }

            .summaryList li {
                position: relative;
                cursor: pointer;
                color: var(--c-gray);
            }
        
            .summaryList h1,
            .summaryList h2 {
                font-size: 1rem;
                font-weight: 600;
                margin: 0.75rem 0 0 0;
            }
        
            .summaryList h2 {
                font-weight: 400;
            }
        
            .summaryList h2::before {
                --bullet-size: 0.5rem;
            }
        
            .summaryList h1::before,
            .summaryList h2::before {
                content: "";
                display: block;
                height: var(--bullet-size);
                width: var(--bullet-size);
                background-color: var(--c-article-bg);
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%)
                    translateX(calc(-1 * var(--padding-left) / 2 - 50%));
                z-index: 1;
                border-radius: 100%;
                border: 1px solid var(--c-bg);
            }
        
            .summaryList li.active {
                color: var(--c-body);
            }
        
            .summaryList li.active h1::before,
            .summaryList li.active h2::before {
                background-color: var(--c-primary);
            }
        `;

        onScroll() {
            const sticky = $(this.shadowRoot, ".sticky");

            // sticky.style.width = "";
            // sticky.classList.remove("sticky-active");

            // if (window.scrollY >= sticky.offsetTop) {
            //     sticky.style.width = `calc(${this.ref.width} - 2rem)`;
            //     sticky.classList.add("sticky-active");
            // }
        }

        mount() {
            // this.ref.width = $(this.shadowRoot, ".sticky").offsetWidth + "px";
            // window.addEventListener("scroll", this.onScroll.bind(this));
        }

        unmount() {
            // window.removeEventListener("scroll", this.onScroll.bind(this));
        }

        render() {
            const headings = JSON.parse(this.props.headings);

            return h.div(
                {
                    class: "sticky",
                    style: styles.postSummary,
                },
                h.h1(
                    { style: styles.postSummaryHeading },
                    "Table of Contents",
                    h.ul(
                        { class: "summaryList" },
                        headings.map(({ type, content }, i) =>
                            h.li(
                                { class: i === 0 ? "active" : "" },
                                h[type]({}, content)
                            )
                        )
                    )
                )
            );
        }
    }
);
