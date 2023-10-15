import { defineStore } from 'pinia';


export const useAuthStore = defineStore('auth', {
    state: () => ({
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        }
    }),
    getters: {
      getUser: (state) => state.login.currentUser
    },
    actions: {
        loginStart() {
            this.login.isFetching = true;
        },
        loginSuccess(data) {
            this.login.isFetching = false;
            this.login.currentUser = data;
            this.login.error = false;
        },
        loginFailed() {
            this.login.isFetching = false;
            this.login.error = true;
        },
        registerStart() {
            this.register.isFetching = true;
        },
        registerSuccess() {
            this.register.isFetching = false;
            this.register.error = false;
            this.register.success = true;
        },
        registerFailed() {
            this.register.isFetching = false;
            this.register.error = true;
            this.register.success = false;
        }
    }
})