import Zero, { ZeroUtils } from "/lib/Zero.js";
import globalStyles from "/globalStyles.js";

const h = ZeroUtils.jsh;
const styles = {
    footerDiv: {
        ...globalStyles.layoutWidthLarge,
        paddingTop: "2rem",
        paddingBottom: "2rem",
        color: "var(--c-gray)",
    },
};

Zero.define(
    "z-footer",
    class ZFooter extends Zero {
        style = `
            a {
                color: var(--c-body);
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
            }
        `;

        onResize() {
            const footer = ZeroUtils.$(this.shadowRoot, ".target");

            Object.assign(footer.style, {
                position: "static",
            });

            if (footer.offsetTop + footer.offsetHeight < window.innerHeight) {
                Object.assign(footer.style, {
                    position: "fixed",
                    bottom: "0",
                });
            }
        }

        mount() {
            // keep footer at bottom if not enough content
            window.addEventListener("resize", this.onResize.bind(this));
            this.onResize();
        }

        unmount() {
            window.removeEventListener("resize", this.onResize.bind(this));
        }

        render() {
            return h.footer(
                { class: "target", style: globalStyles.bgWrapper },
                h.div(
                    { style: styles.footerDiv },
                    "Created by ",
                    h.a(
                        {
                            href: "https://nathanpham.me",
                            target: "_blank",
                            rel: "noreferrer",
                        },
                        "Nathan Pham"
                    ),
                    ". Can be used freely without attribution."
                )
            );
        }
    }
);
