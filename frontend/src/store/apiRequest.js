import axios from 'axios';
import { useAuthStore } from './auth';
import { useUserStore } from './user';

export const loginUser = async (user, navigate) => {
    const store = useAuthStore();
    store.loginStart();
    try {
        const res = await axios.post("http://localhost:8000/v1/auth/login", user);
        console.log(res.data.refreshToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        store.loginSuccess(res.data);
        navigate('/home');
    } catch (error) {
        store.loginFailed();
    }
}

export const registerUser = async (user, navigate) => {
    const store = useAuthStore();
    store.registerStart();
    try {
        const res = await axios.post("http://localhost:8000/v1/auth/register", user);
        store.registerSuccess();
        navigate('/login');
    } catch (error) {
        store.registerFailed();
    }
}

export const getAllUsers = async (accessToken, axiosJWT ) => {
    const store = useUserStore();
    store.getUsersStart();
    try {
        const res = await axiosJWT.get('http://localhost:8000/v1/users/',
         { headers: { token: `Bearer ${accessToken}`}});
        store.getUsersSuccess(res.data.data);
    } catch (error) {
        store.getUsersFailed(error);
    }
}

export const deleteUser = async (accessToken, id, axiosJWT) => {
    const store = useUserStore();
    store.deleteUserStart();
    try {
        const res = await axiosJWT.delete(`http://localhost:8000/v1/users/${id}`, {
            headers: { token: `Bearer ${accessToken}`}
        });
        store.deleteUserSuccess(res.data.message);
    } catch (error) {
        store.deleteUserFailed(error);
    }
}
