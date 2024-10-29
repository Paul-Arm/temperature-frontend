<template>
  <div class="about">
    <h1>Übersicht Temperatur Daten</h1>
    <!-- Ag-Grid table -->
    <ag-grid-vue
      class="ag-theme-alpine"
      style="width: 100%; height: 900px;"
      :rowData="rowData"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
    ></ag-grid-vue>
    <!-- Message when no data is available -->
    <p v-if="!rowData.length">No data available</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.ag-theme-alpine {
  width: 100%;
  height: 400px;
}
</style>

<script setup lang="js">
import { ref, onMounted } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import { ApiConnector } from '@/api/apiConnector';

// Initializing the API connector
const apiConnector = new ApiConnector();

// Define the sensor data
const rowData = ref([]); // Holds the sensor data for the table

// Define the column structure for ag-Grid
const columnDefs = ref([
  { headerName: 'ID', field: 'temperaturmessungsID', hide: true },
  { headerName: 'Timestamp', field: 'messzeitpunkt', sortable: true, filter: true },
  { headerName: 'Temperature', field: 'temperatur', sortable: true, filter: true },
  { headerName: 'Sensor ID', field: 'sensorNr', sortable: true, filter: true }
]);

// Default column settings
const defaultColDef = ref({
  resizable: true,
  sortable: true,
  filter: true,
  flex: 1,
  minWidth: 100,
});

// Fetch data when the component mounts
onMounted(async () => {
  const data = await apiConnector.getTemperature();
  if (data) {
    // Map the fetched data into a format suitable for ag-Grid
    rowData.value = data.map(item => ({
      temperaturmessungsID: item.temperaturmessungsID,
      messzeitpunkt: item.messzeitpunkt,
      temperatur: item.temperatur,
      sensorNr: item.sensorNr !== null ? item.sensorNr : 'N/A' // Handle null values
    }));
  }
});
</script>
