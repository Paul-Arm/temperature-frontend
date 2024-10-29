<template>
<div class="container">
    <div class="login-container">
        <h3 class="login-title">Login <br> EasyTemperature</h3>
        <form @submit.prevent="login">
            <div class="mb-3">
                <label for="username" class="form-label">Benutzername</label>
                <input type="username" class="form-control" id="username" v-model="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Passwort</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-custom">Login</button>
        </form>
        <button class="btn btn-link" @click="guestLogin()" style="color: blue; text-decoration: none;">als Gast anmelden</button>
        <div v-if="error" class="alert alert-danger" style="margin-top: 1rem;" role="alert">{{ error }}</div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
            error: null
        };
    },
    methods: {
        async login() {
            try {
                const url = 'https://easy-temp-backend.vercel.app/token';

                const {data} = await axios.post(url, {
                    username: this.username,
                    password: this.password
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })

                // Store the token
                localStorage.setItem('token', data.access_token);

                // Redirect to protected route
                this.$router.push('/dashboard');
            } catch (error) {
                console.error(error);
                this.error = 'Fehler! (' + error.response.data.detail + ')';
            }
        },
        async guestLogin() {
            localStorage.setItem('token', 'GAST');
            this.$router.push('/dashboard');
        }
    }
};
</script>

<style scoped>
.error {
    color: red;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-container {
    width: 40vh;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.login-title {
    margin-bottom: 20px;
    font-weight: bold;
    text-align: center;
    color: #343a40;
}

.form-control {
    border-radius: 20px;
}

.btn-custom {
    background-color: #007bff;
    border-radius: 20px;
    color: white;
    width: 100%;
    padding: 10px;
}

.btn-custom:hover {
    background-color: #0056b3;
}

.form-text {
    text-align: center;
}
</style>
