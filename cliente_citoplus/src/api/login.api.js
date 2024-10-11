import axios from 'axios';

export const getInfoUsua = () => {
    const rest = axios.get('http://localhost:8000/eventos/api/v1/usuarios/')
    return rest;
}

export const getTokenUsua = (usuario) => {
    const token = axios.post('http://localhost:8000/eventos/api/login/', usuario)
    .then(function (response) {
        return response;
    })
    .catch(function (error) {
        console.log(error);
    });

    return token;
}