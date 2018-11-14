import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { query as queryUsers } from '../services/user';

NProgress.configure({ showSpinner: false });

export default {
    namespace: 'user',

    state: {
        userList: [],
    },

    effects: {
        *fetch(_, { call, put }) {
            NProgress.start();
            const response = yield call(queryUsers);
            yield put({
                type: 'loadlist',
                payload: Array.isArray(response) ? response : [],
            });
            NProgress.done();
        },
    },

    reducers: {
        loadlist(state, action) {
            return {
                ...state,
                userList: action.payload,
            };
        },
    },
};
