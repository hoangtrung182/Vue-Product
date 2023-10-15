<template>
  <div class="container">
    <h2>Login Form</h2>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label for="" class="form-label">Email</label>
            <input type="text" v-model="user.email" required="">
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Password</label>
            <input type="password" v-model="user.password" required="">
        </div>
        <p>Do you have an account? <router-link to="/register">Sign Up</router-link></p>
        <input type="submit" value="Login">
    </form> 
  </div>
</template>

<script setup>
import { reactive} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { loginUser } from '../store/apiRequest';

const router = useRouter();

const user = reactive({ 
    email: 'hoangtrung@gmail.com',
    password: '123456'
})

async function handleSubmit() {
    loginUser(user, router.push);
}

</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
  }

  .container {
    width: 50%;
    margin: auto;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    margin-top: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  input[type="text"],
  input[type="password"],
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  input[type="submit"] {
    background: #4CAF50;
    color: #fff;
    border: 0;
    padding: 12px 20px;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background: #45a049;
  }

</style>