<script setup>
import { onMounted, ref } from 'vue';
import { useMovieStore } from '../stores/global';

const props = defineProps({
  movieId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['back']);
const movieStore = useMovieStore();
const movie = ref(null);

onMounted(async () => {
  const data = await movieStore.getMovieById(props.movieId);
  movie.value = data;
});
</script>

<template>
  <div v-if="movie" class="container mt-4 pb-5">
    <button @click="$emit('back')" class="btn btn-outline-secondary mb-4">
      <i class="bi bi-arrow-left"></i> Back to Catalog
    </button>

    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="bg-dark text-white rounded d-flex align-items-center justify-content-center shadow" style="height: 450px;">
          <div class="text-center">
            <h1 class="display-1 opacity-25">🎬</h1>
            <p class="fw-bold">{{ movie.title }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h1 class="display-5 fw-bold text-dark">{{ movie.title }}</h1>
          <span class="badge bg-primary fs-5">{{ movie.year }}</span>
        </div>

        <h4 class="text-danger mb-3">{{ movie.director }}</h4>

        <div class="mb-4">
          <span class="badge rounded-pill bg-light text-dark border me-2 p-2 px-3">
             Genre: <strong>{{ movie.genre || 'General' }}</strong>
          </span>
        </div>

        <hr />

        <div class="mb-4">
          <h5 class="fw-bold">Synopsis</h5>
          <p class="lead text-secondary">{{ movie.description }}</p>
        </div>

        <div class="card bg-light border-0 shadow-sm">
          <div class="card-body">
            <h5 class="card-title fw-bold mb-3">User Comments</h5>
            
            <div v-if="movie.comments && movie.comments.length" class="comment-box">
              <div class="p-3 bg-white rounded border mb-2 italic">
                "{{ movie.comments }}"
              </div>
              </div>
            
            <p v-else class="text-muted small">No comments yet for this movie.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="mt-2 text-muted">Fetching movie details...</p>
  </div>
</template>