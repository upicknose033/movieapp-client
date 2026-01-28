import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "notyf/notyf.min.css";

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

// Route Components
import HomePage from "./pages/HomePage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import MoviePage from "./pages/MoviePage.vue";

// Routers
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "Home",
			component: HomePage,
		}
		,
		{
			path: "/register",
			name: "Register",
			component: RegisterPage,
		}
		,
		{
			path: "/login",
			name: "Login",
			component: LoginPage,
		}
		,
		{
			path: "/movies",
			name: "Movies",
			component: MoviePage,
			meta: { requiresAuth: true }
		}
	]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;
    
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' });
    } 
    else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
        next({ name: 'Movies' });
    } 
    // 4. Otherwise, let them through
    else {
        next();
    }
});

const app = createApp(App);
const pinia = createPinia()
app.use(pinia)
app.use(router)

app.mount('#app')
