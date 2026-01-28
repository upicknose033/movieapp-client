<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '../stores/global';

import MovieCatalogComponent from '../components/MovieCatalogComponent.vue';
import MovieDetailComponent from '../components/MovieDetailComponent.vue';
import AdminDashboardComponent from '../components/AdminDashboardComponent.vue';

const store = useMovieStore();
const route = useRoute();
const router = useRouter();

const isAdminView = ref(false);
const view = ref('catalog'); 
const selectedId = ref(null);

const openDetails = (id) => {
  selectedId.value = id;
  view.value = 'detail';
  router.push({ query: { id } });
};

const closeDetails = () => {
  view.value = 'catalog';
  selectedId.value = null;
  router.push({ query: {} });
};

const switchToAdmin = () => {
  isAdminView.value = true;
  view.value = 'catalog';
};

const switchToUser = () => {
  isAdminView.value = false;
};

onMounted(() => {
  if (route.query.id) {
    selectedId.value = route.query.id;
    view.value = 'detail';
  }
});
</script>

<template>
  <div class="movie-page pb-5">
    <div class="header-section bg-white border-bottom mb-4 py-3 sticky-top shadow-sm">
      <div class="container d-flex justify-content-between align-items-center">
        <h3 class="mb-0 fw-bold">
          {{ isAdminView ? 'Admin Dashboard' : (view === 'detail' ? 'Movie Details' : 'Movie Catalog') }}
        </h3>

        <div v-if="store.isAdmin" class="view-toggle">
          <div class="btn-group shadow-sm">
            <button 
              @click="switchToUser" 
              :class="['btn btn-sm', !isAdminView ? 'btn-primary' : 'btn-outline-primary']"
            >
              <i class="bi bi-eye"></i> User View
            </button>
            <button 
              @click="switchToAdmin" 
              :class="['btn btn-sm', isAdminView ? 'btn-danger' : 'btn-outline-danger']"
            >
              <i class="bi bi-shield-lock"></i> Admin View
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <transition name="fade" mode="out-in">
        <div v-if="isAdminView && store.isAdmin">
          <AdminDashboardComponent />
        </div>

        <div v-else>
          <div v-if="view === 'detail' && selectedId">
            <MovieDetailComponent 
              :movieId="selectedId" 
              @back="closeDetails" 
            />
          </div>

          <div v-else>
            <MovieCatalogComponent @view-detail="openDetails" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>