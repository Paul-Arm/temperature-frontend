<template>
<div>
    <canvas ref="myChart" id="statisticChart"></canvas>
</div>
</template>

<script>
import {
    Chart,
    registerables
} from 'chart.js';

Chart.register(...registerables);

export default {
    name: 'statisticChart',

    data() {
        return {
            myChart: null,
        }
    },

    props: {
        chartData: {
            type: Object,
            required: true,
        },
    },

    mounted() {
        this.renderChart(this.chartData);
    },

    methods: {
        renderChart(data) {
            this.myChart = new Chart(this.$refs.myChart, {
                type: 'bar',
                data: data,
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
            this.myChart.destroy();
            this.renderChart(newValue)
        }
    },
};
</script>

<style scoped>
</style>
