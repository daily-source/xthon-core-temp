<template>
  <div 
    :class="fundraiserClass" 
    :id="$vnode.key"
  >
    <fundraiser-image 
      :img-name="`${imgBaseDir}/${fundraiser.imgName}`"
      :img-alt="$vnode.key"
      :img-id="`${$vnode.key}-img`"
    />
  </div>
</template>

<script>
import FundraiserImage from "./FundraiserImage.vue"

export default {
  name: "Fundraiser",

  components: {
    FundraiserImage,
  },

  props: {
    fundraiser: {
      type: Object,
      required: true,
    },
    classProp: {
      type: String,
      default: "",
    },
    imgBaseDir: {
      type: String,
    }
  },

  computed: {
    fundraiserClass () {
      return `fundraiser__single ${this.classProp}`
    }
  }
}
</script>

<style lang="scss">
  .fundraiser__single {
    padding-top: 3rem;
    
    img {
      transition: transform .2s ease;
    }
    &:hover {
      img {
        transform: scale(1.02);
      }
    }
  }
</style>
