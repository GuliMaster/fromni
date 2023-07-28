import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001'
});

export const getChannels = () => {
    return instance
        .get(`/getChannels`);
}

export const getChannelParams = (id) => {
    return instance
        .get(`/getChannelParams?id=${id}`);
}

export const addButton = (button) => {
    return instance
        .post(`/addButton`, {button});
}

export const deleteButton = (id) => {
    return instance
        .delete(`/deleteButton?id=${id}`);
}

export const getButtons = (id) => {
    return instance
        .get(`/getButtons?id=${id}`);
}

export const saveChannels = (channels) => {
    return instance
        .post(`/saveChannels`, {channels});
}