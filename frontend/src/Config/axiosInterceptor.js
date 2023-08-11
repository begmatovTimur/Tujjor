import axios from "axios";

axios.interceptors.response.use(
    (response) => response,
    (error) => {
            if (error.response) {
            } else if (error.request) {
            } else {
            }
            return Promise.reject(error);
    }
);

export default axios;