import Zero, { ZeroUtils } from "/lib/Zero.js";
import globalStore from "/globalStore.js";

const { jsh: h } = ZeroUtils;

Zero.define(
    "z-comment",
    class ZComment extends Zero {
        store = globalStore;

        fetch(route, method, payload = {}) {
            const body = method === "GET" ? null : JSON.stringify(payload);

            return fetch(`${this.props.api}${route}`, {
                headers: {
                    Origin: this.props.api,
                    Referrer: this.props.api,
                },
                method,
                body,
            });
        }

        mount() {
            // create page to comment
            this.fetch("/createPage", "POST", { page: location.href });
            this.fetch("/getCredentials", "GET")
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                });

            //     globalStore.setState({ authenticated: success })
            // );
        }

        style = `
            .commentWrapper {
                background-color: var(--c-secondary-bg);
                border-radius: 0.75rem;
                padding: 2rem;
            }

            .commentLogin h1 {
                margin: 0;
            }

            .commentLogin p {
                margin: 0.5rem 0 0 0;
            }

            .commentLogin a {
                color: var(--c-primary);
                text-decoration: none;
            }
            
            .commentLogin a:hover {
                text-decoration: underline;
            }

            @media (max-width: 70rem) {
                .commentWrapper {
                    padding: 1rem !important;
                }
            }
        `;

        render() {
            return h.div(
                { class: "commentWrapper" },
                globalStore.getState().authenticated
                    ? h.div({}, "logged in")
                    : h.div(
                          { class: "commentLogin" },
                          h.h1({}, "Comments"),
                          h.p(
                              {},
                              h.a(
                                  {
                                      href: `${this.props.api}/login`,
                                      target: "_blank",
                                      referrer: "noreferrer",
                                  },
                                  "Log in"
                              ),
                              " to join the discussion"
                          )
                      )
            );
        }
    }
);
