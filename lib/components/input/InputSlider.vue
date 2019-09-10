<template>
  <div class="slider-wrapper" :class="{'colored': colored}">
    <input
      class="slider is-fullwidth is-danger"
      type="range"
      :step="step || 1"
      :min="min || 1"
      :max="max || 100"
      v-model="value"
      :disabled="disabled"
    >
  </div>
</template>

<script>
import bulmaSlider from 'bulma-slider/dist/js/bulma-slider.min.js';

export default {
  data() {
    return {
      value: this.initValue ? this.initValue : 0
    }
  },
  props: [ "step", "min", "max", "initValue", "disabled", "colored" ],
  methods: {
    valueSelected (val) {
      this.$emit("updateVal", val)
    }
  },
  watch: {
    "value" (newVal) {
      this.valueSelected (newVal)
    }
  }
}
</script>
<style scoped lang="scss">
.custom-control--slider {
  position: relative;
  output {

    min-width: 60px;
  }
}
.suggested-range-color1 {
  //color: #ffa500 !important;
}
.suggested-range-color2 {
  //color: $color-emphasis-alt !important;
}
.suggested-range-color3 {
  //color: #ffa500 !important;
}
.slider-wrapper {
  input[type=range] {
    -webkit-appearance: none;
    margin: 10px 0 !important;
    width: 100% !important;
  }
  input[type=range]:focus {
    outline: none !important;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100% !important;
    height: 12.8px !important;
    cursor: pointer !important;
    animate: 0.2s !important;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d !important;
    background:none !important;
    border-radius: 4px !important;
    border: 1px solid rgba(60, 60, 60, 0.26) !important;
  }
  input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d !important;
    border: 0px solid #000000 !important;
    height: 20px !important;
    width: 39px !important;
    border-radius: 4px !important;
    border: 1px solid $color-emphasis-alt !important;
    background: white !important;
    cursor: pointer !important;
    -webkit-appearance: none !important;
    margin-top: -3.6px !important;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: none !important;
  }
  input[type=range]::-moz-range-track {
    width: 100% !important;
    height: 12.8px !important;
    cursor: pointer !important;
    animate: 0.2s !important;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d !important;
    background: none !important;
    border-radius: 4px !important;
    border: 1px solid rgba(60, 60, 60, 0.26) !important;
  }
  input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d !important;
    border: 0px solid #000000 !important;
    height: 20px !important;
    width: 39px !important;
    border-radius: 4px !important;
    border: 1px solid $color-emphasis-alt !important;
    background: white !important;
    cursor: pointer !important;
  }
  input[type=range]::-ms-track {
    width: 100% !important;
    height: 12.8px !important;
    cursor: pointer !important;
    animate: 0.2s !important;
    background: none !important;
    border-color: rgba(60, 60, 60, 0.26) !important;
    border-width: 39px 0 !important;
    color: transparent !important;
  }
  input[type=range]::-ms-fill-lower {
    background: none !important;
    border: 0px solid #000101 !important;
    border-radius: 50px !important;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d !important;
  }
  input[type=range]::-ms-fill-upper {
    background: none !important;
    border: 0px solid #000101 !important;
    border-radius: 50px !important;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d !important;
  }
  input[type=range]::-ms-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d !important;
    border: 0px solid #000000 !important;
    height: 20px !important;
    width: 39px !important;
    border-radius: 4px !important;
    border: 1px solid $color-emphasis-alt !important;
    background: white !important;
    cursor: pointer !important;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: none !important;
  }
  input[type=range]:focus::-ms-fill-upper {
    background: none !important;
  }
}
.slider-wrapper .colored {
  input[type=range]::-webkit-slider-runnable-track {
    background: -webkit-linear-gradient(left, white 0%, $color-emphasis-alt 66%, #ffa500 99.5%, rgba(60, 60, 60, 0.26) 100%) !important;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: -webkit-linear-gradient(left, white 0%, $color-emphasis-alt 66%, #ffa500 99.5%, rgba(60, 60, 60, 0.26) 100%) !important;
  }
  input[type=range]::-moz-range-track {
    background: -moz-linear-gradient(left, white 0%, $color-emphasis-alt 66%, #ffa500 99.5%, rgba(60, 60, 60, 0.26) 100%) !important;
  }
  input[type=range]::-ms-track {
    background: -ms-linear-gradient(left, white 0%, $color-emphasis-alt 66%, #ffa500 99.5%, rgba(60, 60, 60, 0.26) 100%) !important;
  }
  input[type=range]::-ms-fill-lower {
    background: -ms-linear-gradient(left, white 0%, $color-emphasis-alt 66%, #ffa500 99.5%, rgba(60, 60, 60, 0.26) 100%) !important;
  }
  input[type=range]::-ms-fill-upper {
    background: -ms-linear-gradient(left, white 0%, $color-emphasis-alt 66%, #ffa500 99.5%, rgba(60, 60, 60, 0.26) 100%) !important;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: -ms-linear-gradient(left, white 0%, $color-emphasis-alt 66%, #ffa500 99.5%, rgba(60, 60, 60, 0.26) 100%) !important;
  }
  input[type=range]:focus::-ms-fill-upper {
    background: -ms-linear-gradient(left, white 0%, $color-emphasis-alt 66%, #ffa500 99.5%, rgba(60, 60, 60, 0.26) 100%) !important;
  }
}
</style>