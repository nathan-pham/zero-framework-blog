import Zero, { ZeroUtils, ZeroStore } from "/lib/Zero.js";

const h = ZeroUtils.jsh;
const styles = {
    inputWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
    },
    input: {
        height: "100%",
        width: "100%",
        fontSize: "100%",
        padding: 0,
        outline: "none",
        border: "none",
    },
};

Zero.define(
    "z-search",
    class ZSearch extends Zero {
        store = new ZeroStore({
            open: false,
            results: [],
        });

        ref = {
            timeout: null,
        };

        style() {
            return `
                .searchWrapper {    
                    padding: 0.5rem 0.75rem;
                    position: absolute;
                    right: var(--px);
                    top: 15px;
                    background-color: var(--c-bg);
                    z-index: 20;

                    ${
                        this.store.state.results.length > 0
                            ? "border-radius: 0.75rem;"
                            : "border-radius: 10rem;"
                    }

                    ${
                        this.store.state.open
                            ? `
                                box-shadow: 0 0.5rem 1rem var(--c-shadow);
                                width: 15rem;
                            `
                            : ""
                    }
                }

                .searchResults a {
                    margin: 0.75rem 0 0 0;
                    padding: 0;
                    display: block;
                    cursor: pointer;
                }

                .searchResults a:last-child {
                    margin-bottom: 0.25rem;
                }

                .input::placeholder {
                    color: var(--c-gray);
                }
            `;
        }

        emptyResults() {
            this.store.setState(() => ({
                open: false,
                results: [],
            }));
        }

        mount() {
            document.body.addEventListener("click", (e) => {
                if (e.target.tagName.toLowerCase() !== "z-header") {
                    this.emptyResults();
                }
            });
        }

        render() {
            return h.div(
                { class: "searchWrapper" },
                h.div(
                    { style: styles.inputWrapper },
                    h.zRadixIcon({
                        onClick: () => {
                            this.store.setState((state) => ({
                                open: !state.open,
                            }));
                        },
                        type: "magnifyingGlass",
                        size: "var(--svg-width)",
                    }),
                    this.store.state.open
                        ? h.input({
                              style: styles.input,
                              class: "input",
                              placeholder: "Search by title or tags",
                              onInput: (e) => {
                                  const input = e.target.value.trim();

                                  // throttle search cause it is very very slow
                                  clearTimeout(this.ref.timeout);
                                  this.ref.timeout = setTimeout(() => {
                                      if (!input) {
                                          this.store.setState(() => ({
                                              results: [],
                                          }));

                                          return;
                                      }

                                      const results = APP_POSTS.filter(
                                          ({
                                              markdown: {
                                                  metadata: {
                                                      title = "",
                                                      tags = "",
                                                  },
                                              },
                                          }) =>
                                              title
                                                  .toLowerCase()
                                                  .includes(input) ||
                                              tags.toLowerCase().includes(input)
                                      ).slice(0, 4);

                                      this.store.setState(() => ({
                                          results,
                                      }));
                                  }, 500);
                              },
                          })
                        : null
                ),
                h.div(
                    {
                        class: "searchResults",
                    },
                    this.store.state.results.map((result) =>
                        h.a(
                            {
                                onClick: () => {
                                    this.emptyResults();
                                },
                            },
                            h.zLink(
                                {
                                    href: `/${result.url}`,
                                },
                                result.markdown.metadata.title
                            )
                        )
                    )
                )
            );
        }
    }
);
