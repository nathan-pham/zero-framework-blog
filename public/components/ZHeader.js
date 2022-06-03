import Zero, { ZeroUtils } from "/lib/Zero.js";
const h = ZeroUtils.jsh;

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
                                    cursor: "pointer",
                                    margin: 0,
                                    color: "var(--c-head)",
                                },
                            },
                            "📦 Zero Blog"
                        )
                    )
                ),
                h.zRadixIcon({
                    type: "magnifyingGlass",
                    size: "calc(var(--svg-width) * 1.25)",
                })
            );
        }
    }
);
