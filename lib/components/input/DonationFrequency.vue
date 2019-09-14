<template>
  <div class="columns form-column__wrapper form-column__extra-padded input-line">
    <div class="column is-2 form-column__input-column frequency">
      <div class="control">
        <label class="radio" :for="`frequency-once_${_uid}`">
          <input
            type="radio"
            name="freq"
            v-model="donation.frequency"
            :id="`frequency-once_${_uid}`"
            value="once">
          Once
        </label>
        <label class="radio" :for="`frequency-monthly_${_uid}`">
          <input
            type="radio"
            name="freq"
            :id="`frequency-monthly_${_uid}`"
            v-model="donation.frequency"
            value="monthly">
          Monthly
        </label>
        <label class="radio" :for="`frequency-quarterly_${_uid}`">
          <input
            type="radio"
            name="freq"
            :id="`frequency-quarterly_${_uid}`"
            v-model="donation.frequency"
            value="quarterly">
          Quarterly
        </label>
        <label class="radio" :for="`frequency-annually_${_uid}`">
          <input
            type="radio"
            name="freq"
            :id="`frequency-annually_${_uid}`"
            v-model="donation.frequency"
            value="annually">
          Annually
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      donation: {
        frequency: "once"
      }
    }
  },
  watch: {
    "donation.frequency": function (newVal) {
      this.$emit("input:frequency", newVal)
    }
  }
}
</script>

<style scoped lang="scss">
.frequency {
  flex: 1;
  //margin-top: 30px;

  @include tablet {
    padding: 0 100px;
    margin-top: 10px;
  }
  .control {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .radio {
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      margin-right: 5px;
    }
  }
}
</style>