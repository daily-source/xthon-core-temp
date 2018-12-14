<style lang="scss">
  .how-much__input-wrap {
    border-top: 1px solid #ddd;
    padding-top: 1.5em;
    padding-bottom: 1.5em;
    border-collapse: collapse;

    &:first-of-type {
      border-top: 0;
    }

    &:last-of-type {
      border-bottom: 1px solid #ddd;
    }

    .how-much__input {
      max-width: 20% !important;
      margin-left: 10px;
      margin-right: 10px;
    }

    .how-much__input-custom-percent {
      max-width: 130px;
    }

    .locked {
      font-size: 14px;
    }
  }
</style>

<template>
  <div class="how-much__input-wrap">
    <h4 class="mb-3">{{input.label}}:</h4>
    <div class="row">
      <div class="col-md-7 col-12">
        <div class="input-data">
          <div class="d-flex align-items-center">
            I normally spend
            <div class="input-group how-much__input">
              <div class="input-group-prepend">
                <span class="font-weight-bold input-group-text">$</span>
              </div>
              <input type="number" step=".001" class="form-control" v-model="amount">
            </div>
            per
            <select
              class="custom-select how-much__input form-control"
              :id="input.name+'__rate-select'"
              v-model="rate"
            >
              <option value="day">day</option>
              <option value="week">week</option>
              <option value="month">month</option>
              <option value="year">year</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-md-5 col-12">
        <div class="custom-control mb-2 custom-radio">
          <input
            v-model="giveUpOption"
            value="all"
            class="custom-control-input"
            type="radio"
            :id="input.name+'-all'"
          >
          <label class="custom-control-label" :for="input.name+'-all'">Give it up completely</label>
        </div>
        <div class="reduce-by__row d-flex align-items-center">
          <div class="custom-control mb-2 custom-radio mr-2">
            <input
              v-model="giveUpOption"
              value="percent"
              class="custom-control-input"
              type="radio"
              :id="input.name+'-percent'"
            >
            <label class="custom-control-label" :for="input.name+'-percent'">Reduce by:</label>
          </div>
          <div class="form-group percent-input mb-0">
            <label :for="input.name+'custom-percent'" class="sr-only">Reduce by custom %</label>
            <div class="input-group how-much__input-custom-percent">
              <input
                v-model="giveUpPercent"
                :disabled="giveUpOption === 'all'"
                class="form-control"
                :type="giveUpOption === 'all' ? 'text' : 'number'"
                step=".001"
                placeholder="Enter"
              >
              <div class="input-group-prepend">
                <span class="font-weight-bold input-group-text">%</span>
              </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'HowMuchInput',

  props: ['input'],

  data() {
    return {
      amount: '',
      rate: 'week',
      giveUpOption: 'all',
      giveUpPercent: '',
    };
  },

  computed: {
    // We work with the perMonthValue since numbers are smaller
    perMonthValue() {
      let value;

      switch (this.rate) {
        case 'week':
          value = this.amount * 4;
          break;
        case 'day':
          value = this.amount * 30;
          break;
        case 'year':
          value = this.amount / 365;
          break;

        default:
          value = this.amount;
      }

      // If reduce by % is selected, we compute the perMonthValue using the formula:
      // value - ( value * (giveUpPecent / 100 ) )
      return this.giveUpOption === 'all' ? value : parseFloat(value) - (parseFloat(value) * (parseFloat(this.giveUpPercent) / 100));
    },
  },

  methods: {
    inputHandler() {
      if (this.perMonthValue) {
        this.setPercentValue({ choice: this.input, perMonthValue: this.perMonthValue });
        this.$emit('inputChanged');
      }
    },

    ...mapActions({
      setPercentValue: 'selections/setSelectedPercentValue',
    }),
  },

  watch: {
    perMonthValue() {
      this.inputHandler();
    },
  },
};
</script>
