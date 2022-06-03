import Zero, { ZeroUtils } from "/lib/Zero.js";
import globalStyles from "/globalStyles.js";
import globalStore from "/globalStore.js";

const h = ZeroUtils.jsh;
const styles = {
    postWrapper: {
        ...globalStyles.layoutWidthLarge,
        marginBottom: "3rem",
        marginTop: "3rem",
        position: "relative",
    },

    postEmoji: {
        width: "100%",
        textAlign: "center",
    },
    postEmojiImage: {
        fontSize: "5rem",
        margin: "2rem 0 0 0",
    },
    postEmojiTitle: {
        fontSize: "3rem",
        fontWeight: "800",
        margin: "1rem 0 0 0",
        color: "var(--c-head)",
    },

    markdownContentWrapper: {
        display: "flex",
        gap: "2rem",
        marginTop: "2rem",
    },
    markdownContent: {
        padding: "2rem",
        flex: "1 1 100%",
    },

    postMetadata: {
        width: "100%",
        flex: "0 0 17.5rem",
    },
    postDivider: {
        margin: "2rem 0 0 0",
        border: "1px solid var(--c-secondary-bg)",
    },
};

Zero.define(
    "z-dynamic-post",
    class ZDynamicPost extends Zero {
        store = globalStore;

        style = `
            .markdownTag {
                padding: 0.5rem 0.75rem;
                border: 1px solid var(--c-secondary-bg);
                border-radius: 10rem;
                font-size: 0.9rem;
                cursor: pointer;
                margin-right: 0.75rem;
                text-decoration: none;
            }

            .markdownTag:hover {
                background-color: var(--c-secondary-bg);
            }

            .markdownHtml {
                line-height: 1.5;
            }

            .markdownHtml img {
                max-width: 100%;
                border-radius: 0.75rem;
            }
            
            .markdownHtml code[data-type="inline"] {
                border-radius: 0.25rem;
                background-color: var(--c-article-bg);
                padding: 0 0.25rem;
                color: var(--c-primary-hover);
                font-size: 1rem;
            }

            .markdownHtml a {
                color: var(--c-primary);
                text-decoration: none;
            }

            .markdownHtml a:hover {
                text-decoration: underline;
            }

            .markdownHtml pre {
                border-radius: 0.75rem;
                padding: 1rem;
                background-color: var(--c-replit-editor);
                color: #fff;
            }

            .markdownHtml blockquote {
                border-left: 0.25rem solid var(--c-article-bg);
                padding-left: 1rem;
            }
        `;

        render() {
            const postId = globalStore.state.page.params.id;
            const postPath = `posts/${postId}`;

            const post = APP_POSTS.find((post) => post.url === postPath);

            if (!(postId && post)) {
                return null;
            }

            const {
                content,
                markdown: { metadata, tokens },
            } = post;

            return h.main(
                { style: styles.postWrapper },
                h.div(
                    { style: styles.postEmoji },
                    h.h1({ style: styles.postEmojiImage }, metadata.emoji),
                    h.h2({ style: styles.postEmojiTitle }, metadata.title)
                ),
                h.div(
                    { style: styles.markdownContentWrapper },
                    h.div(
                        {
                            style: {
                                ...styles.markdownContent,
                                ...globalStyles.postContainer,
                            },
                        },
                        metadata.tags.length > 0
                            ? metadata.tags
                                  .split(",")
                                  .map((tag) =>
                                      h.span({ class: "markdownTag" }, tag)
                                  )
                            : [],
                        h.div({
                            class: "markdownHtml",
                            __innerHTML: content,
                        }),
                        h.hr({ style: styles.postDivider }),
                        h.zProfile(
                            {
                                ...APP_AUTHOR,
                                variant: "post",
                            },
                            h.zProfileSocials({
                                ...APP_AUTHOR.links,
                            })
                        )
                    ),
                    h.div(
                        { style: styles.postMetadata },
                        h.zDynamicMetadata({
                            name: APP_AUTHOR.name,
                            date: metadata.date,
                            words:
                                Math.ceil(content.split(" ").length / 10) * 10,
                        }),
                        h.zDynamicSummary({
                            headings: JSON.stringify(
                                tokens.filter(({ type }) =>
                                    ["h1", "h2"].includes(type)
                                )
                            ),
                            // .map(({ type, content }))
                        })
                    )
                )
            );
        }
    }
);
