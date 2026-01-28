<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '../stores/global';
import { Notyf } from 'notyf';

const router = useRouter();
const store = useMovieStore();
const notyf = new Notyf();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPass = ref("");
const isEnabled = ref(false);

// Validation Logic
watch([username, email, password, confirmPass], () => {
    const hasValues = username.value.trim() !== "" && email.value.trim() !== "" && password.value.trim() !== "";
    const passwordsMatch = password.value === confirmPass.value;
    const isLongEnough = password.value.length >= 8;
    const isEmailValid = email.value.includes('@');

    isEnabled.value = hasValues && passwordsMatch && isLongEnough && isEmailValid;
});

async function handleSubmit() {
const success = await store.register({
    username: username.value.trim(),
    email: email.value.trim(),
    password: password.value.trim()
});

    if (success) {
        notyf.success("Registration successful!");
        router.push('/login');
    } else {
        notyf.error("Registration failed. Try again.");
    }
}
</script>

<template>
    <div class="container-fluid py-5">
        <h1 class="mb-5 text-danger text-center">Register Page</h1> 
        <div class="row d-flex justify-content-center">
            <div class="col-md-5 border rounded-3 bg-white shadow-sm p-5">
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="usernameInput" class="form-label">Username</label>
                        <input type="text" class="form-control" id="usernameInput" v-model="username" required />
                    </div>
                    
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="emailInput" v-model="email" required />
                    </div>
                    
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Password</label>
                        <input type="password" class="form-control" id="passwordInput" v-model="password" required />
                    </div>
                    
                    <div class="mb-3">
                        <label for="cpasswordInput" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="cpasswordInput" v-model="confirmPass" required />
                    </div>
                    
                    <div class="d-grid mt-4">
                        <button 
                            type="submit" 
                            class="btn" 
                            :class="isEnabled ? 'btn-success' : 'btn-danger'" 
                            :disabled="!isEnabled"
                        >
                            {{ isEnabled ? 'Submit' : 'Please fill all fields' }}
                        </button>
                    </div>

                    <div class="mt-3 text-center">
                        Have an account? <router-link to="/login"><strong>Login now</strong></router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>