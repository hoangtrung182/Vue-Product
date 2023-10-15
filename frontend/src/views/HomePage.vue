<template>
    <div class="">
        <span>Your role: {{ user?.isAdmin ? 'Admin' : 'User' }}</span>        
        <div class="">
            <ul>
                <li v-for="user of allUsers" :key="user._id">
                    {{ user.username }}
                    <button @click="$event => handleDelete(user._id)">Delete</button>
                </li>
            </ul>

            <span>{{ message.msg || message }}</span>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import {onMounted, computed } from 'vue';
import { useAuthStore } from '../store/auth';
import { useUserStore } from '../store/user';
import { getAllUsers, deleteUser } from '../store/apiRequest';
import { useRouter } from 'vue-router';
import jwt__decode from 'jwt-decode';

const router = useRouter();
const store = useAuthStore();
const userStore = useUserStore();

const axiosJWT = axios.create();
const user = store.login?.currentUser;

const allUsers = computed(() => userStore.getAllUsers);
const message = computed(() => userStore.getMessage);

function handleDelete(id) {
    deleteUser(user?.accessToken, id, axiosJWT);
}


onMounted(() => {
    if(!user) {
        router.push('/login');
    }
    if(user?.accessToken) {
        getAllUsers(user?.accessToken, axiosJWT);
    }
})

const url_8000 = 'http://localhost:8000/v1/auth/refresh';

const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log(refreshToken);
    try {
        const res = await axios.post(url_8000, {
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjU2NGYzNjQzNjg3NTQ1YzI3MTZlMiIsImFkbWluIjp0cnVlLCJpYXQiOjE2OTczNTExNTksImV4cCI6MTcyODg4NzE1OX0.RAz7guKgFwNHeZcX0FVGl8_EWpvU9qcsCOkf1cPEw38'
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
 
axiosJWT.interceptors.request.use(
    async (config) => {
        const date = Date.now() / 1000;
        const decodedToken = jwt__decode(user?.accessToken);
        console.log(decodedToken);
        if(decodedToken.exp < date) {
            try {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data?.accessToken
                };

                console.log(data);
                store.loginSuccess(refreshUser);
                config.headers['token'] = "Bearer" + data.accessToken
            } catch (error) {
                console.error('Token refresh failed:', error);
            }
        }
        console.log(config);
        return config;
    },
    (err) => Promise.reject(err)
)




</script>

<style>

</style>