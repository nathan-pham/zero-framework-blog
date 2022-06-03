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

        render() {
            return h.footer(
                { style: globalStyles.bgWrapper },
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
