<template>
    <div class="about">
      <h1>This is a Sensor Data page</h1>
      <!-- Ag-Grid table -->
      <ag-grid-vue
        class="ag-theme-alpine"
        style="width: 100%; height: 500px;"
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
    { headerName: 'Timestamp', field: 'timestamp', sortable: true, filter: true },
    { headerName: 'Temperature', field: 'temperature', sortable: true, filter: true },
    { headerName: 'Humidity', field: 'humidity', sortable: true, filter: true },
    { headerName: 'Sensor ID', field: 'sensorId', sortable: true, filter: true }
  ]);
  
  // Default column settings
  const defaultColDef = ref({
    resizable: true,
    sortable: true,
    filter: true
  });
  
  // Fetch data when the component mounts
  onMounted(async () => {
    const data = await apiConnector.getTemperature();
    if (data) {
      // Map the fetched data into a format suitable for ag-Grid
      rowData.value = data.map(item => ({
        timestamp: item[0],
        temperature: item[1],
        humidity: item[2],
        sensorId: item[3] !== null ? item[3] : 'N/A' // Handle null values
      }));
    }
  });
  </script>
  