<script setup>
import { computed } from 'vue';
import { useMovieStore } from '../stores/global';

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const store = useMovieStore();

const isLoggedIn = computed(() => !!store.token);

const truncate = (text, length) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};
</script>

<template>
  <div class="card h-100 shadow-sm border-0 bg-white movie-card">
    <div class="card-img-top bg-dark d-flex align-items-center justify-content-center text-white" style="height: 180px;">
      <i class="bi bi-film fs-1"></i>
      <span class="fw-bold text-uppercase opacity-25">CineViewer</span>
    </div>

    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title mb-0 fw-bold">{{ movie.title }}</h5>
        <span class="badge bg-secondary">{{ movie.year }}</span>
      </div>

      <p class="card-text text-muted small mb-3">
        Directed by: <strong>{{ movie.director }}</strong>
      </p>

      <p class="card-text text-secondary small flex-grow-1">
        {{ truncate(movie.description, 80) }}
      </p>

      <div class="mt-3 border-top pt-3">
        <div v-if="isLoggedIn">
          <router-link 
            :to="{ name: 'Movies', query: { view: 'detail', id: movie._id } }" 
            class="btn btn-primary w-100 fw-bold"
          >
            View Movie
          </router-link>
        </div>

        <div v-else class="text-center">
          <p class="text-muted small mb-0">View Movie</p>
          <router-link to="/login" class="text-primary x-small text-decoration-none">
            Login to see details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>