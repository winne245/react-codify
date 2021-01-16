// api/axiosClient.js
import axios from 'axios';
import firebase from 'firebase';
import queryString from 'query-string';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
    baseURL: "https://js-post-api.herokuapp.com/api",
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
 // Handle token here ...
    // const currentUser = firebase.auth().currentUser;
    // if (currentUser) {
    //     const token = await currentUser.getIdToken();
    if (localStorage.getItem("accessToken")) {
        const token = await localStorage.getItem("accessToken");
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
    // console.log(response);
    // console.log(response.data);
    return response.data;
    }
    return response;
}, (error) => {
 // Handle errors
    throw error;
});
export default axiosClient;