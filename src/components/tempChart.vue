<template>
<div>
    <canvas ref="tempChart"></canvas>
</div>
</template>

<script>
import {
    Chart,
    registerables
} from 'chart.js';

Chart.register(...registerables);

export default {
    name: 'tempChart',

    data() {
        return {
            tempChart: null,
        }
    },

    props: {
        chartData: {
            type: Object,
            required: true,
        },
    },

    mounted() {
        this.renderChart(this.chartData.labels, this.chartData.data);
    },

    methods: {
        renderChart(label, data) {
            this.tempChart = new Chart(this.$refs.tempChart, {
                type: 'line',
                data: {
                    labels: label,
                    datasets: [{
                        label: 'Temperatur',
                        data: data,
                        fill: false,
                        tension: 0.1,
                    }, ],
                },
                options: {
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
            });
        },
    },

    watch: {
        chartData(newValue) {
            this.tempChart.destroy();
            this.renderChart(JSON.parse(JSON.stringify(newValue.labels)), newValue.datasets);
        }
    },
};
</script>

<style scoped>
  </style>
