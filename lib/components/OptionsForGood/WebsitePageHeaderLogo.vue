<template>
  <div class="website-page-header-logo">
    <div class="website-page-header__loader" v-if='showLoader'>
      <loader />
    </div>
    <img 
      :src="logo.path" 
      :alt="`${logo.name} Logo`" 
      :class='logoClasses'
      v-if='logo'
    >
  </div>
</template>

<script>
import imagesloaded from 'imagesloaded'
import { kebabCase } from 'lodash'

export default {
  name: 'WebsitePageHeaderLogo',

  props: {
    logo: {
      type: Object,
      required: false,
    },
  },

  components: {
    Loader: () => import('Components/Shared/Loader'),
  },

  data() {
    return {
      isImageLoading: true,
    }
  },

  methods: {
    addImageLoadingListener() {
      this.isImageLoading = true

      imagesloaded(this.$el, () => {
        this.isImageLoading = false
      })
    },
  },

  computed: {
    showLoader() {
      return !this.logo || this.isImageLoading
    },

    logoClasses () {
      let baseClass = 'website-page-header-logo__img'

      if (!this.logo) {
        return baseClass
      }

      return `${baseClass} ${this.logo.slug}`
    },
  },

  watch: {
    logo () {
      this.addImageLoadingListener()
    },
  },
}
</script>

<style lang="scss" scoped>
.website-page-header {
  img {
    max-height: 53px;
  }

  &__loader {
    height: 53px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>