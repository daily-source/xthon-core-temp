<template>
  <div class="how-much__input-wrap">
    <h4 class="how-much__label">{{input.label}}:</h4>
    <div class="columns is-mobile is-multiline">
      <div class="column is-7-tablet is-full-mobile">
        <div class="input-data">
          <div class="is-flex input-data__container align-items-center">
            I normally spend
            <div class="how-much__input">
              <input-group 
                v-model='amount'
                prependText='$'
              />
            </div>
            per
            <div class="how-much__input select">
              <select
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
      </div>
      <div class="column is-5-tablet is-full-mobile">
        <div class="control">
          <radio
            v-model='giveUpOption'
            :value='"all"'
            :checked='giveUpOption=="all"'
            :id="`${input.name}-all`"
            label='Give it up completely'
          />
        </div>
        <div class="reduce-by__row is-flex">
          <div class="control">
            <radio
              v-model='giveUpOption'
              :checked='giveUpOption=="percent"'
              :value='"percent"'
              :id="`${input.name}-percent`"
              label='Reduce by:'
            />
          </div>
          <div class="form-group percent-input mb-0">
            <label :for="input.name+'custom-percent'" class="is-sr-only">Reduce by custom %</label>
            <input-group
              v-model="giveUpPercent"
              :disabled="giveUpOption === 'all'"
              :type="giveUpOption === 'all' ? 'text' : 'number'"
              placeholder="Enter"
              appendText='%'
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import InputGroup from 'Components/input/InputGroup'
import Radio from 'Components/input/Radio'

export default {
  name: 'HowMuchInput',

  components: {
    InputGroup,
    Radio,
  },

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
      max-width: 100% !important;
      width: 100%;
      display: block;
      margin-left: 0;
      margin-right: 0;
      margin-top: .5em;
      margin-bottom: .5em;
      
			@include tablet {
        max-width: 20% !important;
        margin-left: 10px;
        margin-right: 10px;
			}

			&.select {
        @include tablet {
          width: 20% !important;
        }
			}
    }

    .locked {
      font-size: 14px;
    }

		.input-data__container {
			flex-wrap: wrap;
		}
  }

  .percent-input {
    .input-group {
      max-width: 130px !important;
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  .input-data__container,
  .reduce-by__row {
    align-items: center;
  }

  .how-much__label {
    margin-bottom: 1em;
  }

	.total-select-input {
		width: 20%;
	}
</style>
