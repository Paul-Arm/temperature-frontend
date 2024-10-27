<template>
<header>
    <nav v-if="typeof(currentRouteName) !== 'undefined' && currentRouteName !== 'Login'" class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">EasyTemperature 🌡️</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" aria-current="page" to="/dashboard">Dashboard</RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Sensor
                        </a>
                        <ul class="dropdown-menu">
                            <li><RouterLink  class="dropdown-item" to="/sensor">Sensoren</RouterLink></li>
                            <li><RouterLink  class="dropdown-item" to="/sensordaten">Sensordaten</RouterLink></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/logs">Logs</RouterLink>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <button class="btn btn-outline-danger" type="submit" @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i> - Logout</button>
                </form>
            </div>
        </div>
    </nav>
</header>
<RouterView />
</template>

<script>
import {
    RouterLink,
    RouterView
} from 'vue-router'

export default {
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  },

    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
    }

}
</script>


<style scoped>
.logo {
    display: block;
    margin: 0 auto 2rem;
}
</style>
