import Zero, { ZeroUtils } from "/lib/Zero.js";
import ZRouter from "./ZRouter.js";

Zero.define(
    "z-link",
    class ZLink extends Zero {
        render() {
            return ZeroUtils.jsh.span(
                {
                    href: this.props.href,
                    onClick: (e) => {
                        if (
                            !(
                                this.props.href.startsWith("#") ||
                                this.props.href.startsWith("http")
                            )
                        ) {
                            e.preventDefault();
                            e.stopPropagation();

                            ZRouter.navigateTo(this.props.href);

                            return false;
                        }
                    },
                },
                this.props.children
            );
        }
    }
);
