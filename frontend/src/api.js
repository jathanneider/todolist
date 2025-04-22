import axios from 'axios';

const API = axios.create({
    // let CRA’s dev server proxy handle routing to Spring Boot
    baseURL: '/',
});

// optional: log every request & response
API.interceptors.request.use(req => {
    console.debug('→', req.method.toUpperCase(), req.url, req.data);
    return req;
});
API.interceptors.response.use(res => {
    console.debug('←', res.status, res.config.url, res.data);
    return res;
});

export default {
    // health check
    health:        ()             => API.get('/actuator/health'),
    // user endpoints
    getUsers:      ()             => API.get('/api/users'),
    createUser:    data           => API.post('/api/users', data),
    // task endpoints
    getTasks:      userId         => API.get(`/api/users/${userId}/tasks`),
    createTask:    (userId, data) => API.post(`/api/users/${userId}/tasks`, data),
    deleteTask:    taskId         => API.delete(`/api/tasks/${taskId}`)
};