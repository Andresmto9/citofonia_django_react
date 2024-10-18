import axios from 'axios';

export const getEventos = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/eventos/api/v1/',
        timeout: 1000,
        headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.get('/eventos/')
        .then(response => {
            return response;
        }).catch(function (error) {
            return error;
        });

    return resp;
}

export const deleteEvento = (id) => {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/eventos/api/v1/',
        timeout: 1000,
        headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.delete(`/eventos/${id}/`)
        .then(response => {
            return response;
        }).catch(function (error) {
            return error;
        });

    return resp;
}

export const registerEvento = (arrEvento) => {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/eventos/api/v1/',
        timeout: 1000,
        headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.post(`/eventos/`, arrEvento)
        .then(response => {
            return response;
        }).catch(function (error) {
            return error;
        });

    return resp;
}