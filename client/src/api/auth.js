import { message } from 'antd';
import axios from 'axios';
import { BACKEND_URL, FETCH_API } from './../config';
import { login, register, buy, boughtItems } from './endpoints';

export const submitLogin = (email, password) => {
    return axios.post( BACKEND_URL + login, {email, password })
            .catch(errorHandler);
}

export const registerApi = (email, password) => {
    return axios.post( BACKEND_URL + register, { email, password})
            .catch(errorHandler);
}

export const getItems = () => {
    return axios.get(FETCH_API)
            .then(result => result.data)
            .catch(errorHandler);
}

export const buyCourse = (courseId) => {
    return axios.post(BACKEND_URL + buy, {courseId})
        .catch(errorHandler);
}

export const getBoughtItems = () => {
    return axios.get(BACKEND_URL + boughtItems)
                .then(result => result.data)
                .catch(errorHandler);
}
const errorHandler = (errors) => {
    console.log(errors.response.data);
    errors?.response?.data?.errors?.forEach((error) => {
        message.error(error.msg);
    })
    throw errors;
}
