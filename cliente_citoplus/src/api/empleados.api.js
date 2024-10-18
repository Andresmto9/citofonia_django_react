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

export const updateEvento = (id) => {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/eventos/api/v1/',
        timeout: 1000,
        headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.put(`/eventos/${id}/`)
        .then(response => {
            return response;
        }).catch(function (error) {
            return error;
        });

    return resp;
}