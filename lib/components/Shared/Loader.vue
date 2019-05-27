<template>
  <div class='custom-loader loader--rolling'>
    <svg :style="{width: `${width}`, height: `${height}`}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;">
      <circle cx="50" cy="50" fill="none" :stroke="color" :stroke-width="strokeWidth" :r="radius" :stroke-dasharray="dasharray" transform="rotate(11.9275 50 50)">
        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
      </circle>
    </svg>
    <p class='loader__message' v-if='message'>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Loader',

  props: {
    color: {
      type: String,
      required: false,
      default: '#1d0e0b',
    },

    strokeWidth: {
      type: Number,
      required: false,
      default: 10,
    },

    radius: {
      type: Number,
      required: false,
      default: 35,
    },

    dasharray: {
      type: Number,
      required: false,
      default: 85,
    },

    width: {
      type: Number,
      required: false,
      default: 23,
    },

    height: {
      type: Number,
      required: false,
      default: 23,
    },

    message: {
      type: String,
      required: false,
    },
  },
}
</script>

<style lang="scss">
.custom-loader  {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loader__message {
  margin-top: 1em;
  color: inherit;
}
</style>

