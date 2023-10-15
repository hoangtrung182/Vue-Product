import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
    state: () => ({
        users: {
            allUsers: null,
            isFetching: false,
            error: false
        },
        msg: ""
    }),
    getters: {
        getAllUsers: (state) => state.users.allUsers,
        getIsFetching: (state) => state.users.isFetching,
        getMessage: (state) => state.msg
    },
    actions: {
        getUsersStart() {
            this.users.isFetching = true;
        },
        getUsersSuccess(data) {
            this.users.allUsers = data;
            this.users.isFetching = false;
            this.users.error = false;
        },
        getUsersFailed() {
            this.users.isFetching = false;
            this.users.error = true;
        },
        deleteUserStart() {
            this.users.isFetching = true;
        },
        deleteUserSuccess(message) {
            this.users.isFetching = false;
            this.msg = message;
        },
        deleteUserFailed(data) {
            this.users.isFetching = false;
            this.users.error = true;
            this.msg = data;
        }
    }
})