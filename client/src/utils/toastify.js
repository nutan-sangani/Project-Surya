import { toast, ToastContainer } from 'react-toastify';

export const toast_success = (data) => {
    toast.success(data, {
        position: "top-right",
        autoClose: 5500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
};

export const toast_error = (data) => {
    toast.error(data, {
        position: "top-right",
        autoClose: 5500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
};
