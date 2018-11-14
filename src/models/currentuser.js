import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { setCurrentUser, getCurrentUser } from '../utils/localStorage';

NProgress.configure({ showSpinner: false });

export default {
    namespace: 'currentuser',

    state: {
        userid: '',
        username: '',
        avatar: '',
        notifycount: '',
    },

    effects: {
        // ***handle with login model before 10.06.2018***
        *fetchCurrent(_, { put }) {
            NProgress.start();
            yield put({
                type: 'loadCurrentUser',
            });
            NProgress.done();
        },
    },

    reducers: {
        saveCurrentUser(state, { payload }) {
            setCurrentUser(payload);
            return {
                ...state,
                userid: payload.userid,
                username: payload.username,
                avatar: payload.avatar,
                notifycount: payload.notifycount,
            };
        },
        loadCurrentUser(state) {
            return {
                ...state,
                userid: getCurrentUser().userid,
                username: getCurrentUser().username,
                avatar: getCurrentUser().avatar,
                notifycount: getCurrentUser().notifycount,
            };
        },
        changeNotifyCount(state, action) {
            return {
                ...state,
                notifycount: action.payload,
            };
        },
    },
};
