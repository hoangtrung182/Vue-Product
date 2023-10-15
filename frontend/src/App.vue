<script setup>

import vNavbar from './components/Navbar.vue';
import { useAuthStore } from './store/auth';


// const authStore = useAuthStore();
// const user = authStore.login.currentUser;
</script>

<template>
  <div class="">
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
