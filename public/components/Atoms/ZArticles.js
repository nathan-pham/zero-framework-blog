import Zero, { ZeroUtils } from "/lib/Zero.js";
import globalStyles from "/globalStyles.js";

const h = ZeroUtils.jsh;
const styles = {
    articleWrapper: {
        ...globalStyles.layoutWidthSmall,
        marginTop: "3rem",
        marginBottom: "3rem",
    },
    articleHeading: {
        margin: 0,
        fontSize: "1.75rem",
        fontWeight: 700,
    },
    articleGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.5rem",
        marginTop: "1.5rem",
    },

    invisible: {
        pointerEvents: "none",
        visibility: "hidden",
        opacity: 0,
        display: "block",
    },
};

Zero.define(
    "z-articles",
    class ZArticles extends Zero {
        render() {
            return h.div(
                { style: styles.articleWrapper },
                h.h2({ style: styles.articleHeading }, "Articles"),
                h.div({ style: styles.articleGrid }, h.slot())
            );
        }
    }
);
