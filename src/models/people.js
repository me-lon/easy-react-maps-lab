import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { queryPeople } from '../services/people';

NProgress.configure({ showSpinner: false });

export default {
    namespace: 'people',

    state: {
        name: '',
        avatar: '',
        userid: '',
        notifyCount: '',
        position: '',
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            NProgress.start();
            const response = yield call(queryPeople, payload);
            yield put({
                type: 'save',
                payload: response,
            });
            NProgress.done();
        },

        *clear(_, { put }) {
            NProgress.start();
            yield put({
                type: 'delete',
            });
            NProgress.done();
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
        delete() {
            return {
                name: '',
                avatar: '',
                userid: '',
                notifyCount: '',
                position: '',
            };
        },
    },
};
