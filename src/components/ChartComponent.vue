<template>
  <loader-component v-if="isLoading" />
  <div v-else>
    <div class="info">
      <div class="stats">
        <div>
          Change:
          <span class="stat">{{ change }}%</span>
        </div>
        <div>
          Current Price:
          <span class="stat">${{ currentPrice }}</span>
        </div>
      </div>
      <div class="time-span-select" @mouseleave="showOptions = false">
        Time span:
        <span class="select__active-item" @mouseenter="showOptions = true">
          {{ activeTimeSpan }}
        </span>
        <div v-if="showOptions" class="select__items">
          <span
            @click.left="selectOption(timeSpan)"
            class="select__item"
            :class="{ 'item__active': activeTimeSpan === timeSpan }"
            v-for="(timeSpan, index) in timeSpans"
            :key="index"
          >
            {{ timeSpan }}
          </span>
        </div>
      </div>
    </div>
    <line-chart :chartData="chartData" />
  </div>
</template>

<script>
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
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
      showOptions: false,
      activeTimeSpan: null,
      change: null,
      currentPrice: null,
      timeSpans: ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"],
      isLoading: true,
      chartData: null,
    };
  },

  async created() {
    this.activeTimeSpan = this.timeSpans[0];
    await this.getDataForChart();
    this.isLoading = false;
  },

  methods: {
    async getDataForChart() {
      // there are cases where API don't gives color value
      // for these case set default value
      let color = { value: this.chartColor};
      if (color.value === null)
        color.value = "#777777";

      let { labels, data } = await this.choosePointsForChart();

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
    },
    async choosePointsForChart() {
      let answer = await getCoinHistory(this.coinUUID, this.activeTimeSpan);
      this.change = answer.data.change;
      this.currentPrice = millify(answer.data.history[0].price);

      // the data from API comes in descending order from most newest
      // so we reverse the array for chronological order ->
      // at the left part of chart will be most older data
      // at the right part - most newest
      let history = Array.from(answer.data.history).reverse();

      let labels = [], data = [];
      let pointsCount = 50;
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

      if (this.activeTimeSpan.includes("h") || this.activeTimeSpan.includes("d")) {
        let minutes = getInRightFormat(date.getUTCMinutes());
        resultDate += `${date.getUTCHours()}:${minutes}`;
      }

      return resultDate;
    },
    async selectOption(time) {
      this.activeTimeSpan = time;
      this.showOptions = false;
      await this.getDataForChart();
    }
  },
}
</script>

<style scoped>
.info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}

.stat {
  font-weight: 700;
}

.time-span-select {
  position: relative;
  user-select: none;
  z-index: 10;
  transition: var(--primary-transition);
}

.time-span-select:hover .select__active-item {
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 0 2px #76ecb770;
}

.select__active-item {
  padding: 5px 15px;
  color: var(--text-color);
  font-size: 1em;
  border: none;
  outline: none;
  border: 1px solid #ddd;
  cursor: pointer;
  background: #fff;
  transition: var(--primary-transition);
}

.select__items {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 10px;
  transform: translateY(1em);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.09);
  padding: 5px 0;
  background: #fff;
  width: 80px;
}

.select__item {
  padding: 7px 15px;
  cursor: pointer;

  transition: var(--primary-transition);
}

.select__item:hover {
  background: #c4c4c431;
}

.item__active {
  background: #42b98331;
}

.item__active:hover {
  background: #42b98338;
}
</style>
