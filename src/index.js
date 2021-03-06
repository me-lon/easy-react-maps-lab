import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';

// user BrowserHistory
import createHistory from 'history/createBrowserHistory';
// user HashHistory
// import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';

import './index.less';
// 1. Initialize
const app = dva({
    history: createHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line
