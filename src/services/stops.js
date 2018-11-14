import request from '../utils/request';

export async function queryStops() {
    return request('/api/stops');
}
