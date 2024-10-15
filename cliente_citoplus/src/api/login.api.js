import axios from 'axios';

export const getTokenUsua = (usuario) => {
    const token = axios.post('http://localhost:8000/eventos/login/', usuario)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });

    return token;
}