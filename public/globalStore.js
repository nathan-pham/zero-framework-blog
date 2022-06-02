import { ZeroStore } from "/lib/Zero.js";

const globalStore = new ZeroStore(
    {
        params: {},
        routes: [],
        page: {
            view: [],
            params: {},
        },
    },
    (state, action) => {
        switch (action.type) {
            case types.viewChange:
                return {
                    ...state,
                    page: action.payload,
                };

            default:
                return state;
        }
    }
);

const types = {
    viewChange: "app/viewChange",
};

export default globalStore;
export { types };
