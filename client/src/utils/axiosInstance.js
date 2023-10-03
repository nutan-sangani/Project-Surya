import axios from "axios";

const axiosInstance = axios.create({
    baseURL:process.env.REACT_APP_BACKEND_IP,
});

const token = localStorage.getItem('token');
axiosInstance.defaults.headers.common["Authorization"] = token;

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response.data.success===undefined) //if this is undefined, than server sent an error
        {
            return Promise.reject(error);
        }
        //else the server sent not an error,not response message (ie if has a message)
        return Promise.resolve(error.response); //since we have done exceptional error handling, we display every message.
    }
    );
export default axiosInstance;