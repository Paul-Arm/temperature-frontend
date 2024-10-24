<template>
    <div>
      <canvas ref="myChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    name: 'tempChart',
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      chartOptions: {
        type: Object,
        required: false,
        default: () => ({}),
      },
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        new Chart(this.$refs.myChart, {
          type: 'line', // Change to desired chart type
          data: this.chartData,
          options: this.chartOptions,
        });
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  