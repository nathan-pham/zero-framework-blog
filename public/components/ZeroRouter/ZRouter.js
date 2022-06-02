import Zero, { ZeroUtils } from "/lib/Zero.js";
import globalStore, { types } from "/globalStore.js";

export default class ZRouter extends Zero {
    store = globalStore;

    static pathToRegex(path) {
        return new RegExp(
            "^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$"
        );
    }

    static getParams(match) {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
            (result) => result[1]
        );

        return Object.fromEntries(
            keys.map((key, i) => {
                return [key, values[i]];
            })
        );
    }

    static getMatch(routes) {
        let match = routes
            .map((route) => ({
                route,
                result: location.pathname.match(
                    ZRouter.pathToRegex(route.path)
                ),
            }))
            .filter((route) => route.result)[0];

        if (!match) {
            match = {
                route: routes[0],
                result: [location.pathname],
            };
        }

        return match;
    }

    static navigateTo(url) {
        if (url) {
            history.pushState(null, null, url);
        }

        const match = ZRouter.getMatch(globalStore.state.routes);
        Object.assign(globalStore.state, {
            page: {
                view: match.route.view,
                params: ZRouter.getParams(match),
            },
        });
    }

    mount() {
        globalStore.state.routes = this.props.children
            .filter((child) => child.tagName === "Z-ROUTE")
            .map((child) => ({
                path: child.getAttribute("path"),
                view: [...child.childNodes],
            }));

        ZRouter.navigateTo();

        window.addEventListener("popstate", () => {
            ZRouter.navigateTo();
        });
    }

    render() {
        return ZeroUtils.jsh.fragment({}, globalStore.state.page.view);
    }
}

Zero.define("z-router", ZRouter);
