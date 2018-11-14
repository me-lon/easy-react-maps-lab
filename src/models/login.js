import { routerRedux } from 'dva/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { setLogin, getLogin } from '../utils/localStorage';

NProgress.configure({ showSpinner: false });

export default {
    namespace: 'login',

    state: {
        status: undefined,
        type: undefined,
        currentAuthority: undefined,
    },

    effects: {
        *login({ payload }, { call, put }) {
            NProgress.start();
            const response = yield call(fakeAccountLogin, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
            // Login successfully
            if (response.status === 'ok') {
                reloadAuthorized();
                yield put(routerRedux.push('/'));
                yield put({
                    type: 'currentuser/saveCurrentUser',
                    payload: response,
                });
            }
            NProgress.done();
        },
        *logout(_, { put, select }) {
            NProgress.start();
            try {
                // get location pathname
                const urlParams = new URL(window.location.href);
                const pathname = yield select(state => state.routing.location.pathname);
                // add the parameters in the url
                urlParams.searchParams.set('redirect', pathname);
                window.history.replaceState(null, 'login', urlParams.href);
            } finally {
                yield put({
                    type: 'changeLoginStatus',
                    payload: {
                        status: false,
                        type: 'account',
                        currentAuthority: 'guest',
                    },
                });
                reloadAuthorized();
                yield put(routerRedux.push('/user/login'));
            }
            NProgress.done();
        },
        *fetchLogin(_, { put, call }) {
            NProgress.start();
            const response = yield call(getLogin);
            yield put({
                type: 'loadCurrentLogin',
                payload: response,
            });
            NProgress.done();
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority);
            setLogin(payload);
            return {
                ...state,
                status: payload.status,
                type: payload.type,
                currentAuthority: payload.currentAuthority,
            };
        },
        loadCurrentLogin(state, { payload }) {
            return {
                ...state,
                status: payload.status,
                type: payload.type,
                currentAuthority: payload.currentAuthority,
            };
        },
    },
};
