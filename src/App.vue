<script setup>
  import { onBeforeMount, watch } from 'vue';
  import { useMovieStore } from "./stores/global";
  import Navbar from './components/NavBarComponent.vue';

const movieStore = useMovieStore();

  onBeforeMount(() => {
    const savedToken = localStorage.getItem("token");
    const savedAdmin = localStorage.getItem("isAdmin") === 'true';
    
    if (savedToken) {
      // Fix: Use movieStore instead of fitnessStore
      movieStore.token = savedToken;
      movieStore.isAdmin = savedAdmin;
    }
  });


  watch(() => movieStore.token, async (newToken) => {
    if (newToken) {
      await movieStore.fetchAllMovies();
    } else {
      movieStore.movies = [];
    }
  }, { immediate: true });
</script>

<template>
  <div class="site-wrapper d-flex flex-column min-vh-100">
    <Navbar />
    
    <main class="container main-content py-4 flex-grow-1">
      <router-view />
    </main>

    <footer class="py-3 bg-light text-center">
      <small>&copy; 2026 Movie Catalog App</small>
    </footer>
  </div>
</template>

<style scoped>
.site-wrapper {
  background-color: #f8f9fa; 
}
</style>