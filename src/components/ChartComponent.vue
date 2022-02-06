<template>
  <loader-component v-if="isLoading" />
  <div v-else>
    <div>
      Change:
      <span class="stat">{{ change }}%</span>
    </div>
    <div>
      Current Price:
      <span class="stat">${{ currentPrice }}</span>
    </div>
   <line-chart :chartData="chartData" />
  </div>
</template>

<script>
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
// import { reactive } from '@vue/reactivity';
import { getCoinHistory } from "@/data/cryptocurrencies.js";
import LoaderComponent from "@/components/Loader.vue";
import millify from 'millify';

Chart.register(...registerables);

export default {
  name: "ChartComponent",

  components: {
    LineChart,
    LoaderComponent,
  },

  props: {
    chartColor: {
      type: String,
      required: false,
    },
    coinUUID: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      change: null,
      currentPrice: null,
      timeSpan: "3h", // possible values: [3h, 24h, 7d, 30d, 3m, 1y, 3y, 5y]
      isLoading: true,
      chartData: null,
    };
  },

  async created() {
    // there are cases where API don't gives color value
    // for these case set default value
    let color = { value: this.chartColor};
    if (color.value === null)
      color.value = "#777777";

    let { labels, data } = await this.getDataForChart();

    this.chartData = {
      labels: labels,
      datasets: [{
        label: 'Price in USD',
        data: data,
        fill: true,
        borderColor: color.value,
        backgroundColor: color.value + "25", // add opacity to hex fill color
        tension: 0.1
      }],
    };

    this.isLoading = false;
  },

  methods: {
    async getDataForChart() {
      let answer = await getCoinHistory(this.coinUUID, this.timeSpan);
      this.change = answer.data.change;
      this.currentPrice = millify(answer.data.history[0].price);

      // the data from API comes in descending order from most newest
      // so we reverse the array for chronological order ->
      // at the left part of chart will be most older data
      // at the right part - most newest
      let history = Array.from(answer.data.history).reverse();

      let labels = [], data = [];
      let pointsCount = 30;
      let increment = ~~(history.length / pointsCount);
      for (let i = 0; i < history.length; i += increment) {
        // the timeStamp comes in seconds but
        // new Date() gets parameter in milliseconds,
        // so we multiply it by 1000
        let date = this.getHumanReadableData(history[i].timestamp * 1000);
        labels.push(date);
        data.push(+history[i].price);
      }

      return { labels, data };
    },
    getHumanReadableData(time) {
      // if we have time span in hours or days
      // => show day/month/year + time
      // otherwise only day/month/year
      let date = new Date(time);
      let resultDate = "";

      const getInRightFormat = (number) => number = number < 10 ? "0" + number : number;
      let day = getInRightFormat(date.getUTCDay() + 1);
      let month = getInRightFormat(date.getUTCMonth() + 1);
      resultDate += `${day}/${month}/${date.getUTCFullYear()} `;

      if (this.timeSpan.includes("h") || this.timeSpan.includes("d")) {
        let minutes = getInRightFormat(date.getUTCMinutes());
        resultDate += `${date.getUTCHours()}:${minutes}`;
      }

      return resultDate;
    }
  },
}
</script>

<style scoped>
.stat {
  font-weight: 700;
}
</style>
