<template>
  <div class="level__wrapper">
    <div class="level__amount">{{level.amount | usd}}</div>
    <div class="level__tagline">{{level.tagline}}</div>
    <div class="level__description">{{level.description}}</div>
    <div class="button level__this-cta is-success is-small">
      <DonateAction
        :fundraiser-id="fundraiser.fundraiser_id"
        :giving-level="level"
        trigger="fundraiser/lower/right/levels">
        Donate now
      </DonateAction>
    </div>
  </div>

</template>

<script>
import DonateAction from "Components/general/DonateAction.vue"

export default {
  props: [ "level", "fundraiser" ],
  components: {
    DonateAction
  }
}
</script>

<style scoped lang="scss">
.level {
  &__wrapper {
    padding: 15px 10px;
    border: 1px solid $color-light-gray;
    background: rgba($color-light-gray, 0.3);
    margin-bottom: 15px;
    text-align: center;
  }
  &__tagline {
    font-weight: bold;
    font-size: 13px;
    margin-bottom: 5px;
  }
  &__description {
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 1.2;
    font-style: italic;
    color: $color-medium-gray;
  }
  &__amount {
    font-weight: bold;
    font-size: 26px;
  }
}


</style>
