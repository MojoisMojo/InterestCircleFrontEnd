// import * as axios from 'axios';
// const client = axios.default;

const clientBase = 'http://127.0.0.1:7002';
const userApi = `${clientBase}/users`;
const circleApi = `${clientBase}/circles`;
const circleMemberApi = `${clientBase}/circlemembers`;
const postsApi = `${clientBase}/posts`;
export {
    clientBase, circleApi, userApi, circleMemberApi,
    postsApi
};