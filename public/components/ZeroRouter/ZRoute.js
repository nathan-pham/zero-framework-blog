import Zero, { ZeroUtils } from "/lib/Zero.js";
import globalStore from "/globalStore.js";

Zero.define(
    "z-route",
    class ZRoute extends Zero {
        store = globalStore;

        render() {
            console.log("render");
            return globalStore.state.page.path === this.props.path
                ? ZeroUtils.jsh.slot()
                : null;
        }
    }
);
