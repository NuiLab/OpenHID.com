import { APIRequest, APIResponse } from './actions';
import { createReducer } from './utils';

const initialState = window['__INITIAL_STATE__'] || {
    users: [],          // Cached User Accounts
    publications: [],   // Cached Publications
    isFetching: false,  // Loading
    error: ''           // API Errors
};

// Keep Portfolio Cache a max of 100 subapps long.
let cachePortfoliosubapps = (subapps: APIResponse[], portfolio: APIResponse[]) => {

    let cache = [...portfolio];

    // check to see if it's in the cache
    // if it is in the cache, replace it if the data field is empty.
    for (var subapp of subapps) {
        var index = cache.findIndex((v) => v.permalink === subapp.permalink);
        if (index > -1) {
            if (subapp['data'] !== undefined)
                cache[index] = subapp;
        } else {
            cache = [...cache, subapp];
        }
    }

    return cache.slice(0, 100);
}

export default createReducer(initialState, {

    FETCHED_SUBAPP: (state, payload: { req: APIRequest, res: APIResponse[] }) => {

        let portfolio = cachePortfoliosubapps(payload.res, state.portfolio);
        
        return {
            ...state,
            portfolio,
            subapp: portfolio.find((subapp) => subapp.permalink === payload.req.permalink),
            isFetching: false
        };
    },

    FETCHING_SUBAPP: (state, payload) =>
        ({
            ...state,
            isFetching: true,
            subapp: null
        }),

    SET_SUBAPP: (state, payload) =>
        ({
            ...state,
            subapp: state.portfolio.find((e) => e.permalink === payload.permalink)
        }),

    ERROR: (state, payload) =>
        ({
            ...state,
            error: payload.error
        }),

    HIDE_MENU: (state, payload) =>
        ({
            ...state,
            hideMenu: !state.hideMenu
        })
});