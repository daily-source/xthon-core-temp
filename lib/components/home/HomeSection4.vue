<template>
  <div class="page-wrapper">
    <div class="container">
      <h1 v-html="headline"></h1>
      <div class="combo-wrapper">
        <ComboBox
          layout="row"
          :iconsrc="box.imgsrc"
          :duplicate="box.duplicate"
          :reverse="box.reverse"
          :key="box.imgsrc"
          v-for="box in boxes"
        >
          <p v-html="box.tagline"></p>
        </ComboBox>
      </div>
    </div>
  </div>
</template>

<script>
import ComboBox from "Components/general/ComboBox.vue"

export default {
  components: {
    ComboBox
  },
  props: ["boxes", "headline"]
}
</script>

<style scoped lang="scss">

.page-wrapper {
  background-color: $color-light-bg;
  text-align: center;
  padding-bottom: 10px;

  h1 {
    color: $color-text;
  }
}

.combo-wrapper {
  padding: 10px 0;
}

</style>
