import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function catalog() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc');
}

export async function category() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category');
}

export async function getDetails(id) {
    return await api.get(host + `/data/wiki/${id}`);
}


export async function deleteCategory(id) {
    return await api.del(host + `/data/wiki/${id}`);
}

export async function editCategory(id,newCategory) {
    return await api.put(host + `/data/wiki/${id}`,newCategory);
}

export async function createCategory(newCategory) {
    return await api.post(host + '/data/wiki/',newCategory);
}