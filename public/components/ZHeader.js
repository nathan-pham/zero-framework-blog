import Zero, { ZeroUtils } from "/lib/Zero.js";
const h = ZeroUtils.jsh;

// header a {
//     cursor: pointer;
//     text-decoration: none;
//     color: var(--c-head);
// }

Zero.define(
    "z-header",
    class ZHeader extends Zero {
        render() {
            return h.header(
                {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "var(--c-bg)",
                        padding: "1rem var(--px)",
                        maxWidth: "var(--max-w-lg)",
                        margin: "0 auto",
                    },
                },
                h.a(
                    {},
                    h.zLink(
                        { href: "/" },
                        h.h1(
                            {
                                style: {
                                    fontSize: "1.75rem",
                                    margin: 0,
                                },
                            },
                            "📦 Zero Blog"
                        )
                    )
                )
            );
        }
    }
);
