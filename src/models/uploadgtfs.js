import { queryStops } from '../services/stops';

export default {
    namespace: 'stopslist',

    state: {
        stopslist: [],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryStops, payload);
            yield put({
                type: 'queryStops',
                payload: Array.isArray(response) ? response : [],
            });
        },
    },

    reducers: {
        queryStops(state, action) {
            return {
                ...state,
                stopslist: action.payload,
            };
        },
    },
};
