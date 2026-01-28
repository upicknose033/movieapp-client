<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '../stores/global'; 
import { Notyf } from 'notyf';

const router = useRouter();
const store = useMovieStore();
const notyf = new Notyf();

const email = ref("");
const password = ref("");
const isEnabled = ref(false);

watch([email, password], ([newEmail, newPwd]) => {
    isEnabled.value = newEmail.trim() !== "" && newPwd.trim() !== "";
});

async function handleSubmit() {
    const success = await store.login({
        email: email.value.trim(),
        password: password.value.trim()
    });

    if (success) {
        router.push('/movies'); 
    }
}
</script> 

<template>
    <div class="container-fluid">
        <h1 class="my-5 pt-3 text-danger text-center">Login Page</h1> 
        
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-5 border rounded-3 mx-auto p-5 bg-white shadow-sm">
                <form @submit.prevent="handleSubmit">
                    
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email Address</label>
                        <input 
                            type="email" 
                            class="form-control" 
                            id="emailInput" 
                            v-model="email" 
                            placeholder="Enter your email"
                            required 
                        />
                    </div>

                    <div class="mb-4">
                        <label for="passwordInput" class="form-label">Password</label>
                        <input 
                            type="password" 
                            class="form-control" 
                            id="passwordInput" 
                            v-model="password" 
                            placeholder="Enter your password"
                            required 
                        />
                    </div>

                    <div class="d-grid mt-5">
                        <button 
                            type="submit" 
                            class="btn btn-success btn-block" 
                            v-if="isEnabled && !store.loading"
                        >
                            Login
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-danger btn-block" 
                            disabled 
                            v-else
                        >
                            {{ store.loading ? 'Processing...' : 'Submit' }}
                        </button>
                    </div>

                    <div class="mt-3 text-center">
                        Don't have an account? 
                        <router-link to="/register"><strong>Register now</strong></router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>