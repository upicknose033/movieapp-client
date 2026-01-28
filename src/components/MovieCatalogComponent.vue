<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMovieStore } from '../stores/global';
import MovieCardComponent from './MovieCardComponent.vue';

const movieStore = useMovieStore();
const searchQuery = ref("");

onMounted(async () => {
  await movieStore.fetchAllMovies();
});

const filteredMovies = computed(() => {
  if (!searchQuery.value) return movieStore.movies;
  
  const query = searchQuery.value.toLowerCase();
  return movieStore.movies.filter(movie => 
    movie.title.toLowerCase().includes(query) || 
    movie.director.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div class="catalog-wrapper">
    <div class="row mb-4 align-items-center">
      <div class="col-md-6">
        <h2 class="fw-bold">🎬 Movie Catalog</h2>
        <p class="text-muted">Browse our collection of cinema classics.</p>
      </div>
      <div class="col-md-6">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0"><i class="bi bi-search"></i></span>
          <input 
            type="text" 
            v-model="searchQuery" 
            class="form-control border-start-0" 
            placeholder="Search titles or directors..."
          />
        </div>
      </div>
    </div>

    <div v-if="movieStore.loading" class="text-center my-5">
      <div class="spinner-border text-danger" role="status"></div>
      <p class="mt-2 text-secondary">Loading movies...</p>
    </div>

    <div v-else-if="filteredMovies.length === 0" class="text-center my-5 py-5 bg-light rounded shadow-sm">
      <h3 class="text-muted">No movies found</h3>
      <p>Try adjusting your search or check back later!</p>
    </div>

    <div v-else class="row g-4">
      <div 
        v-for="movie in filteredMovies" 
        :key="movie._id" 
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <MovieCardComponent :movie="movie" />
      </div>
    </div>
  </div>
</template>