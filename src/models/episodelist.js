import { queryEpisodes } from '../services/episode';

export default {
    namespace: 'episodelist',

    state: {
        episodelist: [],
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(queryEpisodes);
            yield put({
                type: 'queryEpisodeList',
                payload: Array.isArray(response) ? response : [],
            });
        },
    },

    reducers: {
        queryEpisodeList(state, action) {
            return {
                ...state,
                episodelist: action.payload,
            };
        },
    },
};
