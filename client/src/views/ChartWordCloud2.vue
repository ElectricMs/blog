<template>
    <div class="bestsellers-container">
      <chart-word-cloud :options="state.chartOptions"></chart-word-cloud>
    </div>
  </template>
   
  <script setup lang="ts">
    import ChartWordCloud from './ChartWordCloud.vue'
   
    import { onMounted, reactive } from 'vue'
   
    const state = reactive({
      chartOptions: {
        series: [
          {
            gridSize: 20,
            data: [
              {
                name: '娜娜米',
                value: 30,
                // textStyle: {
                //   color: 'rgba(0, 0, 0, .4)',
                // },
              },
              {name: '五条悟',value: 30},
              { name: '狗卷', value: 28 },
              { name: 'Shoto', value: 28 },
              { name: 'Vox', value: 25 },
              { name: "Aza", value: 23 },
              { name: 'Mysta', value: 20 },
              { name: 'Uki', value: 18 },
              { name: 'Luca', value: 15 },
              { name: 'Shu', value: 10 },
              { name: 'Ike', value: 10 },
              { name: "Fulgun", value: 10 }
            ],
          },
        ],
      },
    })
   
    onMounted(() => {})
  </script>
   
  <style scoped lang="less">
    .bestsellers-container {
      height: 18.56rem;
      background: #f0f0f0;
   
      #charts-content {
        /* 需要设置宽高后才会显示 */
        width: 100%;
        height: 100%;
      }
    }
  </style>