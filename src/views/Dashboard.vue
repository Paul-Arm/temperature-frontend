<template>
<div class="container">
    <div v-if="loading" class="loading-screen">
        <div class="spinner-border text-primary" role="status"></div>
    </div>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">Statistik</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">Diagramm</button>
        </li>
    </ul>

    <div class="tab-content mt-4" id="myTabContent">
        <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title" style="margin-bottom: 2rem;"><i class="fa fa-database" aria-hidden="true"></i> - Aktuelle Statistik von allen Sensoren</h5>
                    <StatisticChart :chartData="getStatisticChart" />
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-10">
                            <h5 class="card-title" style="margin-bottom: 2rem;"><i class="fa fa-area-chart" aria-hidden="true"></i> - Aktuelle Diagramme jeweiliger Sensoren</h5>
                        </div>
                        <div class="col-2" style="text-align: end;">
                            <select class="form-select" v-model="selectedSensor" @change="getSelectedTemperature()">
                                <option selected disabled style="text-align: center;">Bitte Sensor auswählen</option>
                                <option v-for="(sensor, index) in sensors" :key="sensor.sensorNr">
                                    {{ sensor.sensorNr }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <TempChart :chartData="tempChartData" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import StatisticChart from '@/components/statisticChart.vue';
import TempChart from '@/components/tempChart.vue';
import axios from 'axios';

export default {
    name: 'App',
    components: {
        StatisticChart,
        TempChart
    },
    data() {
        return {
            loading: false,

            sensors: [],

            temperatures: [],

            selectedSensor: null,

            selectedTemperature: null,

            tempChartData: {},
        };
    },

    computed: {
        getStatisticChart() {
            let data = {};
            let sensors = JSON.parse(JSON.stringify(this.sensors));
            let temperatures = JSON.parse(JSON.stringify(this.temperatures));

            data['statistic'] = {}

            data['statistic']['data'] = {
                labels: (function () {
                    if (sensors) {
                        let labelSensors = [];
                        sensors.forEach(sensor => {
                            labelSensors.push('Sensor ' + sensor.sensorNr);
                        });
                        return labelSensors;
                    }
                    return null;
                }).call(data['statistic'], data['statistic']),
                datasets: [{
                        label: 'Maximal Temperatur',
                        data: (function () {
                            if (sensors) {
                                let maxTemperature = [];
                                sensors.forEach(sensor => {
                                    maxTemperature.push(sensor.maxTemperature);
                                });
                                return maxTemperature;
                            }
                            return null;
                        }).call(data['statistic'], data['statistic']),
                        fill: false,
                        backgroundColor: ['rgba(230, 0, 5, 0.75)'],
                        tension: 0.1,
                    },
                    {
                        label: 'Durchschnitt Temperatur',
                        data: (function () {
                            if (sensors) {
                                const sensorGroups = {};

                                temperatures.forEach(entry => {
                                    const sensorId = entry.sensorNr;
                                    const temperature = entry.temperatur;

                                    if (!sensorGroups[sensorId]) {
                                        sensorGroups[sensorId] = [];
                                    }
                                    sensorGroups[sensorId].push(temperature);
                                });

                                const averageTemperatures = [];
                                for (const sensorId in sensorGroups) {
                                    const temperatures = sensorGroups[sensorId];
                                    const sum = temperatures.reduce((acc, temp) => acc + temp, 0);
                                    const average = sum / temperatures.length;

                                    averageTemperatures.push(Number(average.toFixed(2)));
                                }

                                return averageTemperatures;
                            }
                        }).call(data['statistic'], data['statistic']),
                        fill: false,
                        backgroundColor: ['rgba(143, 143, 143, 0.75)'],
                        tension: 0.1,
                    },
                ],
            };

            return data['statistic']['data'];
        }
    },

    methods: {
        async getSensors() {
            try {
                const url = 'https://easy-temp-backend.vercel.app/data/sensor';

                const {
                    data
                } = await axios.get(url, {}, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })

                return data;

            } catch (error) {
                console.log(error);
            }
        },

        async getTemperatures() {
            try {
                const url = 'https://easy-temp-backend.vercel.app/data/temperature';

                const {
                    data
                } = await axios.get(url, {}, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })

                return data;

            } catch (error) {
                console.log(error);
            }
        },

        async getSelectedTemperature() {
            try {
                const url = 'https://easy-temp-backend.vercel.app/data/temperature';
                
                this.loading = true;

                const response = await axios.get(url, {
                    params: {
                        sensorNr: this.selectedSensor
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                this.loading = false;

                var selectedTemperatures = response.data;

            } catch (error) {
                return console.log(error);
            }

            let data = {};

            data['temperature'] = {}

            data['temperature']['data'] = {
                labels: (function () {
                    if (selectedTemperatures) {
                        let labels = [];
                        selectedTemperatures.forEach(selectedTemperature => {
                            labels.push(selectedTemperature.messzeitpunkt);
                        });
                        return labels;
                    }
                    return null;
                }).call(data['temperature'], data['temperature']),
                datasets: (function () {
                    if (selectedTemperatures) {
                        let data = [];
                        selectedTemperatures.forEach(selectedTemperature => {
                            data.push(selectedTemperature.temperatur);
                        });
                        return data;
                    }
                    return null;
                }).call(data['temperature'], data['temperature']),
            };

            this.tempChartData = data['temperature']['data'];
        },
    },

    async beforeMount() {
        this.loading = true;

        this.sensors = await this.getSensors();

        this.temperatures = await this.getTemperatures();

        this.loading = false;
    }
};
</script>

<style>
.container {
    margin-top: 2rem;
}

.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    /* Semi-transparent background */
    z-index: 9999;
}
</style>
