<template>
    <div class="">
        <v-navbar />
        <router-view ></router-view>
    </div>
</template>

<script setup>

import vNavbar from '../components/Navbar.vue';

</script>

<style>
.container {
    width: 1200px;
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
}

</style>