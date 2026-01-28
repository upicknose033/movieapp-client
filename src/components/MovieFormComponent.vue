<script setup>
import { ref, onMounted, computed } from 'vue';
import { useMovieStore } from '../stores/global';

const props = defineProps({
  movieToEdit: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['success', 'cancel']);
const movieStore = useMovieStore();
const loading = ref(false);

const isEditing = computed(() => !!props.movieToEdit);

const formData = ref({
  title: '',
  director: '',
  year: '',
  description: '',
  genre: '',
  comments: ''
});

onMounted(() => {
  if (props.movieToEdit) {
    formData.value = { ...props.movieToEdit };
  }
});

async function handleSubmit() {
  loading.value = true;
  let success = false;

  if (isEditing.value) {
    success = await movieStore.updateMovie(props.movieToEdit._id, formData.value);
  } else {
    success = await movieStore.addMovie(formData.value);
  }

  loading.value = false;
  
  if (success) {
    emit('success');
    if (!isEditing.value) {
      formData.value = { title: '', director: '', year: '', description: '', genre: '', comments: '' };
    }
  }
}
</script>

<template>
  <div class="card shadow-sm border-0">
    <div class="card-header bg-dark text-white p-3">
      <h5 class="mb-0">{{ isEditing ? ' Edit Movie' : 'Add New Movie' }}</h5>
    </div>
    <div class="card-body p-4">
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-8 mb-3">
            <label class="form-label fw-bold">Title</label>
            <input v-model="formData.title" type="text" class="form-control" placeholder="Inception" required />
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label fw-bold">Year</label>
            <input v-model="formData.year" type="number" class="form-control" placeholder="2010" required />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label fw-bold">Director</label>
            <input v-model="formData.director" type="text" class="form-control" placeholder="Christopher Nolan" required />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label fw-bold">Genre</label>
            <input v-model="formData.genre" type="text" class="form-control" placeholder="Sci-Fi / Action" required />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold">Description</label>
          <textarea v-model="formData.description" class="form-control" rows="3" placeholder="Enter movie summary..." required></textarea>
        </div>

        <div class="mb-4">
          <label class="form-label fw-bold">Initial Comment</label>
          <input v-model="formData.comments" type="text" class="form-control" placeholder="What did you think of it?" />
        </div>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-success flex-grow-1" :disabled="loading">
            {{ loading ? 'Saving...' : (isEditing ? 'Update Movie' : 'Create Movie') }}
          </button>
          <button type="button" class="btn btn-outline-secondary" @click="$emit('cancel')">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>