<template>
  <div class="about">
    <h1>This is a Sensor page</h1>
    <p v-if="!sensor.length">No data available</p>
    
    <ag-grid-vue
      class="ag-theme-alpine"
      style="width: 100%; height: 500px;"
      :rowData="sensor"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
      @cellValueChanged="onCellValueChanged"
    ></ag-grid-vue>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import { ApiConnector } from '@/api/apiConnector';
import { AgGridVue } from 'ag-grid-vue3'; // Import ag-Grid component

const apiConnector = new ApiConnector();
const sensor = ref([]); // Holds sensor data

const columnDefs = ref([
  { headerName: 'Sensor Number', field: 'sensorNr', sortable: true, filter: true },
  { headerName: 'Address', field: 'adresse', sortable: true, filter: true },
  { headerName: 'Max Temp', field: 'maxTemperature', editable: true },
  { headerName: 'Hersteller ID', field: 'herstellerID', sortable: true, filter: true },
  { headerName: 'Server Cabinet ID', field: 'serverschrankID', sortable: true, filter: true },
]);

const defaultColDef = ref({
  flex: 1,
  minWidth: 100,
  editable: true,
  resizable: true,
});

onMounted(async () => {
  const data = await apiConnector.getSensors();
  if (data) {
    sensor.value = data;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    this.$router.push('/login');
  }
});

const onCellValueChanged = async (event) => {
  const updatedSensor = event.data;
  console.log('Updated sensor:', updatedSensor);
  const sensorId = updatedSensor.sensorNr;
  
  const updateData = {
    maxTemperature: updatedSensor.maxTemperature,
    // If there are other fields that need to be updated, add them here
  };
  
  await apiConnector.updateSensor(sensorId, updatedSensor);
};
</script>
