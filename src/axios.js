import axios from 'axios';

// CREATE INSTANCE
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// REQUEST for Specific container
// instance.interceptors.request.use(request => {
//   console.log(request);
//   return request;
// }, error => {
//   console.log(error);
//   return Promise.reject(error);
// });

// RESPONSE for Specific container
// instance.interceptors.response.use(response => {
//   console.log(response);
//   return response;
// }, error => {
//   console.log(error);
//   return Promise.reject(error);
// });

export default instance;