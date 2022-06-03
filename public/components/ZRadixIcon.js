import Zero, { ZeroUtils } from "/lib/Zero.js";
const h = ZeroUtils.jsh;

const icons = {
    circleBackslash:
        "M7.49991 0.877075C3.84222 0.877075 0.877075 3.84222 0.877075 7.49991C0.877075 11.1576 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1576 14.1227 7.49991C14.1227 3.84222 11.1576 0.877075 7.49991 0.877075ZM3.85768 3.15057C4.84311 2.32448 6.11342 1.82708 7.49991 1.82708C10.6329 1.82708 13.1727 4.36689 13.1727 7.49991C13.1727 8.88638 12.6753 10.1567 11.8492 11.1421L3.85768 3.15057ZM3.15057 3.85768C2.32448 4.84311 1.82708 6.11342 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C8.88638 13.1727 10.1567 12.6753 11.1421 11.8492L3.15057 3.85768Z",
    magnifyingGlass:
        "M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z",
};

const radixIcon = ({ d, size = "1rem", ...props } = {}) =>
    h.svg(
        {
            _viewBox: "0 0 15 15",
            fill: "none",
            ...props,
            style: {
                width: size,
                height: size,
            },
        },
        h.path({
            d,
            fill: "currentColor",
            fillRule: "evenodd",
            clipRule: "evenodd",
        })
    );

Zero.define(
    "z-radix-icon",
    class ZIcon extends Zero {
        style = `
            svg {
                display: grid;
                place-items: center;
            }

            .hoverable {
                color: var(--c-gray);
                cursor: pointer;
            }

            .hoverable:hover {
                color: var(--c-body);
            }
        `;

        render() {
            const iconType = icons.hasOwnProperty(this.props.type)
                ? this.props.type
                : "circleBackslash";

            return radixIcon({
                d: icons[iconType],
                class: "hoverable",
                ...this.props,
            });
        }
    }
);
