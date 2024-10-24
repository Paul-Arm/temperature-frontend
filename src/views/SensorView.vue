<template>
  <div class="about">
    <h1>Sensordaten</h1>
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
const herstellerMap = ref({}); // Maps herstellerID to hersteller name

// Column definitions including the new "Hersteller Name" column
const columnDefs = ref([
  { headerName: 'Sensor Number', field: 'sensorNr', sortable: true, filter: true },
  { headerName: 'Address', field: 'adresse', sortable: true, filter: true },
  { headerName: 'Max Temp (°C)', field: 'maxTemperature', editable: true },
  { headerName: 'Hersteller ID', field: 'herstellerID', sortable: true, filter: true },
  { headerName: 'Hersteller Name', field: 'herstellerName', sortable: true, filter: true },
  { headerName: 'Server Cabinet ID', field: 'serverschrankID', sortable: true, filter: true },
]);

const defaultColDef = ref({
  flex: 1,
  minWidth: 100,
  editable: true,
  resizable: true,
});

onMounted(async () => {
  const [sensorData, herstellerData] = await Promise.all([
    apiConnector.getSensors(),
    apiConnector.getHersteller()
  ]);

  // Create a map for herstellerID -> hersteller name
  if (herstellerData) {
    herstellerData.forEach(hersteller => {
      herstellerMap.value[hersteller.herstellerID] = hersteller.name;
    });
  }

  // Add the "herstellerName" field to each sensor based on its herstellerID
  if (sensorData) {
    sensor.value = sensorData.map(sensor => ({
      ...sensor,
      herstellerName: herstellerMap.value[sensor.herstellerID] || 'Unknown'
    }));
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
  
  // remove herstellerName
  delete updatedSensor.herstellerName;
  
  await apiConnector.updateSensor(sensorId, updatedSensor);
};
</script>
