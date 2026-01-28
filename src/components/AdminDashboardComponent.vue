<script setup>
import { ref, onMounted } from 'vue';
import { useMovieStore } from '../stores/global';
import MovieFormComponent from './MovieFormComponent.vue';
import { Notyf } from 'notyf';

const movieStore = useMovieStore();
const notyf = new Notyf();

const showForm = ref(false);
const selectedMovie = ref(null);

onMounted(() => {
  movieStore.fetchAllMovies();
});

const openAddModal = () => {
  selectedMovie.value = null;
  showForm.value = true;
};

const openEditModal = (movie) => {
  selectedMovie.value = movie;
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  selectedMovie.value = null;
};

const handleFormSuccess = () => {
  closeForm();
  movieStore.fetchAllMovies(); // 
};

const confirmDelete = async (movie) => {
  if (confirm(`Are you sure you want to delete "${movie.title}"?`)) {
    const success = await movieStore.deleteMovie(movie._id);
    if (success) {
      notyf.success("Movie removed from database");
    }
  }
};
</script>

<template>
  <div class="admin-dashboard">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold text-dark">Database Management</h2>
        <p class="text-muted mb-0">Manage your movie entries, updates, and removals.</p>
      </div>
      <button @click="openAddModal" class="btn btn-success d-flex align-items-center gap-2 shadow-sm">
        <i class="bi bi-plus-circle-fill"></i> Add New Movie
      </button>
    </div>

    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card border-0 shadow-sm bg-primary text-white p-3">
          <small class="opacity-75">Total Movies</small>
          <h3 class="mb-0 fw-bold">{{ movieStore.movies.length }}</h3>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th class="ps-4">Title</th>
              <th>Director</th>
              <th>Year</th>
              <th>Genre</th>
              <th class="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movie in movieStore.movies" :key="movie._id">
              <td class="ps-4 fw-bold text-primary">{{ movie.title }}</td>
              <td>{{ movie.director }}</td>
              <td>{{ movie.year }}</td>
              <td><span class="badge bg-light text-dark border">{{ movie.genre || 'N/A' }}</span></td>
              <td class="text-end pe-4">
                <div class="btn-group">
                  <button @click="openEditModal(movie)" class="btn btn-outline-warning btn-sm me-2">
                    <i class="bi bi-pencil-square"></i> Edit
                  </button>
                  <button @click="confirmDelete(movie)" class="btn btn-outline-danger btn-sm">
                    <i class="bi bi-trash"></i> Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showForm" class="form-overlay d-flex align-items-center justify-content-center">
      <div class="form-container col-md-8 col-lg-6 px-3">
        <MovieFormComponent 
          :movieToEdit="selectedMovie" 
          @success="handleFormSuccess" 
          @cancel="closeForm"
        />
      </div>
    </div>
  </div>
</template>