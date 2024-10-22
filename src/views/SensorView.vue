<template>
  <div class="about">
    <h1>This is a Sensor page</h1>
    <p>{{ sensor.length ? sensor : 'No data available' }}</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup lang="js">
import { ApiConnector } from '@/api/apiConnector';
import { ref, onMounted } from 'vue';

const apiConnector = new ApiConnector();
const sensor = ref('No data available'); // Default message when no data is available

onMounted(async () => {
  const data = await apiConnector.getSensors();
  if (data) {
    sensor.value = data;
  }

  

});
</script>