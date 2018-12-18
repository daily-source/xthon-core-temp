<template>
  <div :class="`progress-bar__wrapper ${size}`">
    <p v-if="size === 'large'" :class="`${size}`">
      {{details.donated | centsToUsd}} raised of {{details.goal | centsToUsd}}
    </p>
    <div :class="`progress-bar fundraiser-pledge__progress-wrapper ${size}`">
      <div :class="`fundraiser-pledge__progress-bar ${size}`"
        :style="{width: 100*details.donated / details.goal + '%'}"></div>
    </div>
    <p v-if="size !== 'large'">
      {{details.donated | centsToUsd}} raised of {{details.goal | centsToUsd}}
    </p>
  </div>
</template>

<style scoped lang="scss">
.fundraiser-pledge {
  &__progress-wrapper {
    display: block;
    background: $color-light-gray;
    height: 20px;
    border-radius: 20px;
    overflow: hidden;

    @include tablet {
      display: block;
    }

    &.large {
      height: 30px;
    }
  }
  &__progress-bar {
    display: flex;
    background: $color-emphasis-alt;
    height: 20px;

    &.large {
      height: 30px;
    }
  }
}

p {
  margin-top: 10px;
  font-size: 15px;
  line-height: 18px;
  overflow: hidden;

  &.large {
    text-align: center;
    font-size: 18px;
    margin-bottom: 20px;
  }
}

</style>

<script>
export default {
  props: [ "details", "size" ]
}
</script>
