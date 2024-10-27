<template>
    <div>
        <h1>Logs</h1>
        <div>
            <Datepicker v-model="date" range />
            
            <button @click="fetchLogs">Logs abfragen</button>
        </div>
        
        <ag-grid-vue class="ag-theme-alpine" :columnDefs="columnDefs" :rowData="rowData" :gridOptions="gridOptions"
            style="width: 100%; height: 500px;">
        </ag-grid-vue>
    </div>
</template>

<script setup lang="js">
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { h, ref } from 'vue';
import { ApiConnector } from '@/api/apiConnector';

const apiConnector = new ApiConnector();

const date = ref([new Date().setDate(new Date().getDate() - 7), new Date()]);


const columnDefs = [
    { headerName: 'Eintragsnummer', field: 'eintragsnummer' , hide: true},
    { headerName: 'Zeitstempel', field: 'zeitstempel' },
    { headerName: 'Anmeldename', field: 'anmeldename' },
    { headerName: 'Sensor Nr', field: 'sensorNr' },
    { headerName: 'Alte Max Temperatur', field: 'alteMaxTemperatur' },
    { headerName: 'Neue Max Temperatur', field: 'neueMaxTemperatur' },
];
const rowData = ref([]);
const gridOptions = {
    defaultColDef: {
        sortable: true,
        filter: true,
    },
};

function fetchLogs() {
    try {
        console.log("Fetching logs: ", new Date(date.value[0]).toISOString(), new Date(date.value[1]).toISOString());
        const resp = apiConnector.getLogs(new Date(date.value[0]).toISOString(), new Date(date.value[1]).toISOString());
        resp.then((data) => {
            rowData.value = data;
        });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("Admin role needed or token expired");
        } else {
            console.error("fetching all logs");
        const resp = apiConnector.getLogs();
        resp.then((data) => {
            rowData.value = data;
        });
        }
    }


}

</script>

<style scoped>
/* Add your styles here */
</style>