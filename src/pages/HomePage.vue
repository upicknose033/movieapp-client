<script setup>
import { computed } from 'vue';
import { useMovieStore } from '../stores/global';

const store = useMovieStore();
const isLoggedIn = computed(() => !!store.token);
</script>

<template>
  <div class="home-page">
    <header class="hero-section d-flex align-items-center text-white">
      <div class="container text-center text-md-start">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-2 fw-bold mb-3 animate-fade-in text-dark">
              Your Personal <span class="text-danger">Cinema</span> Vault
            </h1>
            <p class="lead mb-4 opacity-75 text-dark">
              Discover, organize, and manage your favorite films in one sleek interface. 
              From cult classics to modern masterpieces, keep your collection at your fingertips.
            </p>
            <div class="d-flex gap-3 justify-content-center justify-content-md-start">
              <router-link to="/movies" class="btn btn-danger btn-lg px-4 py-3 fw-bold shadow">
                Browse Collection
              </router-link>
              <router-link v-if="!isLoggedIn" to="/register" class="btn btn-outline-light btn-lg px-4 py-3">
                Join Now
              </router-link>
            </div>
          </div>
          <div class="col-lg-6 d-none d-lg-block">
             <div class="hero-image-stack">
                <div class="hero-card card-1 shadow-lg"></div>
                <div class="hero-card card-2 shadow-lg"></div>
                <div class="hero-card card-3 shadow-lg"></div>
             </div>
          </div>
        </div>
      </div>
    </header>

    <section class="py-5 bg-white">
      <div class="container">
        <div class="row text-center g-4">
          <div class="col-md-4">
            <div class="p-4">
              <div class="feature-icon bg-danger-subtle text-danger mb-3 mx-auto">
                <i class="bi bi-lightning-charge-fill fs-2"></i>
              </div>
              <h4 class="fw-bold">Lightning Fast</h4>
              <p class="text-muted">Instantly search through thousands of titles with our optimized database.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-4 border-start border-end border-sm-0">
              <div class="feature-icon bg-primary-subtle text-primary mb-3 mx-auto">
                <i class="bi bi-shield-lock-fill fs-2"></i>
              </div>
              <h4 class="fw-bold">Admin Controls</h4>
              <p class="text-muted">Admins can easily add, edit, or remove movies directly from the dashboard.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-4">
              <div class="feature-icon bg-success-subtle text-success mb-3 mx-auto">
                <i class="bi bi-people-fill fs-2"></i>
              </div>
              <h4 class="fw-bold">User Insights</h4>
              <p class="text-muted">Logged-in users get exclusive access to descriptions, genres, and comments.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 bg-dark text-white text-center">
      <div class="container py-4">
        <h2 class="fw-bold mb-3">Ready to start your watchlist?</h2>
        <p class="mb-4 opacity-50">Log in to unlock all details and contribute to the community.</p>
        <router-link to="/login" class="btn btn-outline-danger btn-lg px-5">Get Started</router-link>
      </div>
    </section>
  </div>
</template>