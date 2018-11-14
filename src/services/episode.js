import request from '../utils/request';

export async function queryEpisodes() {
    return request(`/api/episodes`);
}
