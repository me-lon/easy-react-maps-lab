import mockjs from 'mockjs';
import { getLogin } from './mock/login';
import { getUserList } from './mock/users';
import { getEpisodes } from './mock/episodes';
import { getRegister } from './mock/register';
import { getPeople, getPeopleNew } from './mock/people';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getNotices } from './mock/notices';
import { getStops } from './mock/stops';
import { getGTFS } from './mock/uploadgtfs';
import { format, delay } from 'roadhog-api-doc';

// If disable the proxy
const noProxy = process.env.NO_PROXY === 'true';

// The code will be compatible with the local service mock and the static data of the deployment site
const proxy = {
    // Supported values are Object and Array
    'POST /api/login/account': getLogin,
    'POST /api/register': getRegister,
    'GET /api/people/:id': getPeople,
    'GET /api/episodes': getEpisodes,
    'GET /api/stops': getStops,
    //'POST /api/uploadGTFS': getGTFS,

    // GET POST can be omitted
    'GET /api/users': getUserList,

    'GET /api/tags': mockjs.mock({
        'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
    }),
    'GET /api/fake_list': getFakeList,

    'GET /api/notices': getNotices,
    'GET /api/500': (req, res) => {
        res.status(500).send({
            timestamp: 1513932555104,
            status: 500,
            error: 'error',
            message: 'error',
            path: '/base/category/list',
        });
    },
    'GET /api/404': (req, res) => {
        res.status(404).send({
            timestamp: 1513932643431,
            status: 404,
            error: 'Not Found',
            message: 'No message available',
            path: '/base/category/list/2121212',
        });
    },
    'GET /api/403': (req, res) => {
        res.status(403).send({
            timestamp: 1513932555104,
            status: 403,
            error: 'Unauthorized',
            message: 'Unauthorized',
            path: '/base/category/list',
        });
    },
    'GET /api/401': (req, res) => {
        res.status(401).send({
            timestamp: 1513932555104,
            status: 401,
            error: 'Unauthorized',
            message: 'Unauthorized',
            path: '/base/category/list',
        });
    },
};

export default (noProxy ? {} : delay(proxy, 1000));
