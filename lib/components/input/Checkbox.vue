<template>
  <div class="custom-control custom-control--checkbox">
    <input 
      type="checkbox"
      class="custom-control__input"
      v-bind="$attrs"
      v-on='listeners'
    >
    <label 
      :for="`${$attrs.id}`"
      class='custom-control__label'
    >
      {{ label }}
      <span>
        <icon
          icon='check'
          :iconwidth='16'
          :iconheight='16'
          color='#fff'
        />
      </span>
    </label>
  </div>
</template>

<script>
import Icon from "Components/general/Icons"

export default {
  name: "Checkbox",

  components: {
    Icon
  },

  props: {
    label: {
      type: String,
      required: true
    }
  },

  inheritAttrs: false,

  computed: {
    listeners () {
      return {
        ...this.$listeners,
        change: event => {
          this.$emit("change", event.target.value)
        }
      }
    }
  }
}
</script>
