import { defineStore } from 'pinia';
import api from '../api.js'; 
import { Notyf } from 'notyf';

const notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' }
});

export const useMovieStore = defineStore('movie', {
    state: () => ({
        movies: [],
        currentMovie: null,
        loading: false,
        // Pull token from localStorage on startup so user stays logged in
        token: localStorage.getItem('token') || null,
        isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async register(userData) {
            this.loading = true;
            try {
                const response = await api.post('/users/register', userData);
                console.log("Registration Response:", response.data);
                notyf.success('Registration successful! Please login.');
                return true;
            } catch (error) {
                console.error("Registration Error:", error.response?.data);
                const msg = error.response?.data?.message || 'Registration failed';
                notyf.error(msg);
                return false;
            } finally {
                this.loading = false;
            }
        },

async login(credentials) {
    this.loading = true;
    try {
        const response = await api.post('/users/login', credentials);
        this.token = response.data.access; 
        localStorage.setItem('token', this.token);

        const base64Url = this.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        this.isAdmin = payload.isAdmin; 
        localStorage.setItem('isAdmin', JSON.stringify(this.isAdmin));

        notyf.success('Welcome back!');
        return true;
    } catch (error) {
        notyf.error(error.response?.data?.message || 'Login failed');
        return false;
    } finally {
        this.loading = false;
    }
},

        logout() {
            this.token = null;
            this.isAdmin = false;
            this.movies = [];
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            notyf.success('Logged out successfully');
        },

        async fetchAllMovies() {
            this.loading = true;
            try {
                const response = await api.get('/movies/getAllMovies');
                this.movies = response.data.movies || [];
            } catch (error) {
                notyf.error("Failed to load movies");
            } finally {
                this.loading = false;
            }
        },

        async getMovieById(movieId) {
            try {
                // If backend expects movieId in the body of a GET (rare, but happens in some APIs)
                const response = await api.get('/movies/getSelectedMovie', { data: { movieId } });
                this.currentMovie = response.data;
                return response.data;
            } catch (error) {
                notyf.error("Movie not found");
            }
        },

        async addMovie(movieData) {
            try {
                const response = await api.post('/movies/createMovie', movieData);
                this.movies.push(response.data.result);
                notyf.success(response.data.message || "Movie added!");
                return true;
            } catch (error) {
                const msg = error.response?.data?.message || "Error adding movie";
                notyf.error(msg);
                return false;
            }
        },

        async updateMovie(movieId, updateData) {
            try {
                const response = await api.put('/movies/updateMovie', { movieId, ...updateData });
                
                const index = this.movies.findIndex(m => m._id === movieId);
                if (index !== -1) this.movies[index] = response.data.updatedMovie;
                
                notyf.success("Movie updated successfully!");
                return true;
            } catch (error) {
                notyf.error("Failed to update movie");
                return false;
            }
        },

        async deleteMovie(movieId) {
            try {
                await api.delete('/movies/deleteMovie', { data: { movieId } });
                this.movies = this.movies.filter(m => m._id !== movieId);
                notyf.success("Movie deleted");
                return true;
            } catch (error) {
                notyf.error("Error deleting movie");
                return false;
            }
        }
    }
});