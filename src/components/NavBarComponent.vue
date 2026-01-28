<script setup>
    import { useMovieStore } from "../stores/global";
    import { useRouter } from "vue-router";
    import { computed } from "vue";

    const store = useMovieStore();
    const router = useRouter();

    const isLoggedIn = computed(() => !!store.token);
    const isAdmin = computed(() => store.isAdmin);

    const handleLogout = () => {
        store.logout();
        router.push('/login');
    };
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div class="container">
            <router-link class="navbar-brand fw-bold" to="/">
                <i class="bi bi-film"></i> CineViewer
            </router-link>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Catalog</router-link>
                    </li>

                    <template v-if="isLoggedIn">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/movies">My Movies</router-link>
                        </li>

                        <li v-if="isAdmin" class="nav-item">
                            <router-link class="nav-link text-warning fw-bold" to="/movies">
                                <i class="bi bi-speedometer2"></i> Admin Panel
                            </router-link>
                        </li>

                        <li class="nav-item ms-lg-3">
                            <span :class="['badge rounded-pill', isAdmin ? 'bg-danger' : 'bg-info text-dark']">
                                {{ isAdmin ? 'Admin' : 'User' }}
                            </span>
                        </li>
                        
                        <li class="nav-item">
                            <button @click="handleLogout" class="btn btn-outline-light btn-sm ms-lg-3">Logout</button>
                        </li>
                    </template>

                    <template v-else>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/login">Login</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link text-white bg-primary rounded px-3 ms-lg-2" to="/register">Register</router-link>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>