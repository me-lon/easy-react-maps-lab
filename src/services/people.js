import request from '../utils/request';
import { getCurrentUser } from '../utils/localStorage';

export async function queryPeople(id) {
    return request(`/api/people/${id}`);
}

export async function queryCurrentUser() {
    return getCurrentUser();
}
