import { ZeroStore } from "/lib/Zero.js";

const globalStore = new ZeroStore(
    {
        routes: [],
        page: {
            view: [],
            params: {},
        },
    },
    (state, action) => {
        switch (action.type) {
            case types.routerNavigateTo:
                return {
                    page: action.payload,
                };

            default:
                return state;
        }
    }
);

const types = {
    routerNavigateTo: "router/navigateTo",
};

export default globalStore;
export { types };
