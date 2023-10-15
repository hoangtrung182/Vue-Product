<template>
    <div class="">
        <div class="navbar">
            <div class="left">
                <a href="#" class="navbar-link">Home</a>
                <a href="#" class="navbar-link">About</a>
                <a href="#" class="navbar-link">Contact</a>
            </div>
            <div class="right" v-if="user">
                <ul>
                    <span>Hello, {{ user.username }}</span>
                    <router-link to="" class="navbar-link">Log out</router-link>
                </ul>
            </div>
            <div class="" v-else>
                <router-link to="/login" class="navbar-link">Login</router-link>
                <router-link to="/register" class="navbar-link">Sign Up</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>

import { computed } from 'vue';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.getUser);

</script>

<style scoped>
/* 

a {
    text-decoration: none;
    color: #000;
} */

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1c94b5;
    color: #fff;
    padding: 10px 20px;
    height: 40px;
}

.navbar-brand {
    font-size: 24px;
}

.navbar-links {
    display: flex;
}

.navbar-link {
    color: #fff;
    text-decoration: none;
    margin-left: 20px;
}

.navbar-link:hover {
    text-decoration: underline;
}
</style>