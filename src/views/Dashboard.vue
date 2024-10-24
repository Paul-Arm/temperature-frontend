<template>
<div class="container">
    {{ console.log(getStatisticChart) }}
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
                    <StatisticChart :chartData="statisticChartData" :chartOptions="statisticChartOptions" />
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-8">
                            <h5 class="card-title" style="margin-bottom: 2rem;"><i class="fa fa-area-chart" aria-hidden="true"></i> - Aktuelle Diagramme jeweiliger Sensoren</h5>
                        </div>
                        <div class="col-4" style="text-align: end;">
                            <div class="dropdown">
                                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sensoren
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Sensor 1</a></li>
                                    <li><a class="dropdown-item" href="#">Sensor 2</a></li>
                                    <li><a class="dropdown-item" href="#">Sensor 3</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <TempChart :chartData="tempChartData" :chartOptions="tempChartOptions" />
                </div>
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

            statisticChartData: {
                labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5'],
                datasets: [{
                        label: 'Maximal Temperatur',
                        data: [10, 53, 10, 83, 59],
                        fill: false,
                        backgroundColor: ['rgba(230, 0, 5, 0.75)'],
                        tension: 0.1,
                    },
                    {
                        label: 'Durchschnitt Temperatur',
                        data: [65, 59, 80, 81, 56],
                        fill: false,
                        backgroundColor: ['rgba(143, 143, 143, 0.75)'],
                        tension: 0.1,
                    },
                ],
            },
            statisticChartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function (value, index, ticks) {
                                return value + '°C';
                            }
                        }
                    }
                }
            },

            tempDate: [],

            tempChartData: {
                labels: ['10:01', '10:02', '10:03', '10:04', '10:05'],
                datasets: [{
                    label: 'Temperatur',
                    data: [10, 53, 10, 83, 59],
                    fill: false,
                    tension: 0.1,
                }],
            },
            tempChartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function (value, index, ticks) {
                                return value + '°C';
                            }
                        }
                    }
                }
            },
        };
    },

    computed: {
    //TODO: get sensors from api to the diagramm
        getStatisticChart() {
            let data = {};
            
            data['statistic'] = {}

            data['statistic']['data'] = {
                labels: (function() {
                    if(this.sensors) {
                        let labelSensors = [];
                        this.sensors.forEach(sensor => {
                            labelSensors.push('Sensor ' + sensor.SensorNr);
                        });
                        return labelSensors; 
                    }
                    return null;
                }).call(data['statistic'], data['statistic']),
                datasets: [{
                        label: 'Maximal Temperatur',
                        data: [10, 53, 10, 83, 59],
                        fill: false,
                        tension: 0.1,
                    },
                    {
                        label: 'Durchschnitt Temperatur',
                        data: [65, 59, 80, 81, 56],
                        fill: false,
                        tension: 0.1,
                    },
                ],
            },

            data['statistic']['options'] = {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function (value, index, ticks) {
                                return value + '°C';
                            }
                        }
                    }
                }
            };
            
            return data;
        }
    },

    methods: {
        async getSensors() {
            try {
                const url = 'https://easy-temp-backend.vercel.app/data/sensor';

                const {data} = await axios.get(url, {}, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })

                this.sensors = data;

            } catch (error) {
                console.log(error);
            }
        }
    },

    async beforeMount() {
        this.loading = true;

        await this.getSensors();

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
    background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
    z-index: 9999;
}
</style>
