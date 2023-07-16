import axios from 'axios';

export default () => {
    return axios.create({
        baseURL: 'https://rhymebrain.com/',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
};
