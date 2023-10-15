import { createRouter, createWebHistory } from 'vue-router'

const routes = [

    {
        path: '',
        component: () => import("../layouts/BaseLayout.vue"),
        children: [
            {
                path: 'home',
                component: () => import("../views/HomePage.vue"),
            },
            {
                path: 'login',
                component: () => import("../components/Login.vue")
            },
            {
                path: 'register',
                component: () => import("../components/Register.vue")
            },
            {
                path: 'contact',
                component: () => import("../views/Contact.vue")
            }
        ]
    },
    {
        path:'',
        redirect: '/home',
    }
];


export const router = createRouter({
    history: createWebHistory(),
    routes
});

// router.beforeEach((to, from, next) => {
//     const authStore = useAuthStore();
//     if(to.name !== 'Login' && authStore.login.currentUser) {
//         next('/login')
//     } else {
//         next();
//     }
// })

// export default router;

