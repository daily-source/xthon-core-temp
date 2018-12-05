<template>
  <div>
    <div class="columns boxes-wrapper is-multiline" id="top">
      <div class="amount-box column is-4 is-6-mobile" v-for="box in boxes" v-if="!givingLevels">
        <div
          class="amount-box__inner"
          :class="{'selected': box === donation.amount && !donation.isCustomAmount}"
          @click="selectAmount(box)">
          {{box | usd}}
        </div>
      </div>
      <div class="amount-box amount-box-giving-levels column is-6 is-6-mobile" v-for="level in givingLevels" v-if="givingLevels">
        <div
          class="amount-box__inner"
          :class="{'selected': level.amount === donation.amount && !donation.isCustomAmount}"
          @click="selectLevel(level)">
          <p>{{level.amount | usd}}</p>
          <p class="small-text">{{level.tagline}}</p>
        </div>
      </div>
    </div>
    <div class="columns form-column__wrapper form-column__extra-padded input-line custom-amount-wrapper">
      <div class="column is-5 form-column__label-column input-label">
        <label class="label" :for="`custom-amount-input_${_uid}`">
          <input class="pad-right" type="checkbox" v-model="donation.isCustomAmount">
          Other amount:
        </label>
      </div>
      <div class="column is-3 form-column__input-column">
        <div class="control input-wrapper">
          <Icons icon="usd" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
          <input :id="`custom-amount-input_${_uid}`" class="input custom-amount-input" type="number" name="amount" :placeholder="donation.customAmount" v-model="donation.customAmount" :disabled="!donation.isCustomAmount">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"

export default {
  components: {
    Icons
  },
  data () {
    return {
      boxes: [ 25, 50, 100, 250, 500, 1000 ],
      donation: {
        amount: 350,
        customAmount: 350,
        isCustomAmount: true
      }
    }
  },
  props: ["givingLevels"],
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    userFirstName () {
      return this.$store.state.user.firstname
    }
  },
  methods: {
    selectAmount (amount) {
      this.donation.isCustomAmount = false
      this.donation.amount = amount
      this.$emit("input:box", amount)
    },
    selectLevel (level) {
      this.donation.isCustomAmount = false
      this.donation.amount = level.amount
      this.$emit("input:box", level.amount)
      this.$emit("input:level", level)
    }
  }
}
</script>

<style scoped lang="scss">
.boxes-wrapper {
  margin: -.25rem;
  margin-bottom: 10px;
  justify-content: center;

  @include breakpoint ($tablet) {
    max-width: 400px;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
  }  
}
.amount-box {
  color: white;
  display: inline-block;
  padding: 0.25rem;

  &__inner {
    background: $color-emphasis;
    padding: 12px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      background-color: rgba($color-emphasis, 0.7);
    }
    &.selected {
      background-color: $color-emphasis-alt;
    }
  }
  &-giving-levels {
    .amount-box__inner {
      display: block;
      text-align: center;
    }
  }
}
.pad-right {
  margin-right: 5px;
}

</style>