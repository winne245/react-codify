import axios from "axios";
import queryString from 'query-string';

const config = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const axiosCodify = axios.create({
  baseURL: "http://localhost:9000",
  config: config,
  // headers: {
  //   'content-type': 'application/json',
  // },
  paramsSerializer: params => queryString.stringify(params),
});

// export const setClientToken = (token) => {
//   axiosCodify.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   });
// };

axiosCodify.interceptors.request.use(async (config) => {
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
axiosCodify.interceptors.response.use((response) => {
  if (response && response.data) {
    // console.log('response: ', response);
    console.log('response.data: ', response.data);
    // response.data.forEach((item) => {
    //   console.log(item.teacher)
    // })
    return response.data;
  }
  return response;
}, (error) => {
  throw error;
});
export default axiosCodify;
