import axios from 'axios';

export const getUsuarios = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/eventos/api/v1/',
        timeout: 1000,
        headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.get('/usuarios/')
        .then(response => {
            return response;
        }).catch(function (error) {
            return error;
        });

    return resp;
}

export const getRoles = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/eventos/api/v1/',
        timeout: 1000,
        headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.get('/roles/')
        .then(response => {
            return response;
        }).catch(function (error) {
            return error;
        });

    return resp;
}

export const getDetaUsua = (id) => {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/eventos/api/v1/',
        timeout: 1000,
        headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.get(`/usuarios/${id}/`)
        .then(response => {
            return response;
        }).catch(function (error) {
            return error;
        });

    return resp;
}

export const deleteUsua = (id) => {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/eventos/api/v1/',
        timeout: 1000,
        headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.delete(`/usuarios/${id}/`)
        .then(response => {
            return response;
        }).catch(function (error) {
            return error;
        });

    return resp;
}

export const registerUsua = (arrUsua) => {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/eventos/',
        timeout: 1000,
        headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    

    const resp = instance.post(`/registro/`, arrUsua)
        .then(response => {
            return response;
        }).catch(function (error) {
            return error;
        });

    return resp;
}

export const updateUsua = (arrUsua, id) => {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/eventos/api/v1/',
        timeout: 1000,
        headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.put(`/usuarios/${id}/`, arrUsua)
        .then(response => {
            return response;
        }).catch(function (error) {
            return error;
        });

    return resp;
}