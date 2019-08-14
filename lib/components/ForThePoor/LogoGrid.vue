<template>
<div class="logo-grid">
  <div class="columns is-multiline is-mobile">
    <div 
      class="column is-one-third-desktop is-half-tablet is-full-mobile"
      v-for='(site, index) in sitesToDisplay'
      :key='index'
    >
      <a :href="site.link" target='_blank'>
        <div class="logo-grid__img grid__img-wrap">
          <img 
            :src="require(`@/assets/img/${site.image}`)" 
            :alt="site.name"
            :class='slugify(site.name)'
          >
        </div>
      </a>
    </div>
  </div>
  <div class="logo-grid__actions has-text-right">
    <a href="#" @click.stop.prevent='showMore = !showMore'>{{ showMore ? 'Show Less' : 'Show More' }}</a>
  </div>
</div>
</template>

<script>
import { kebabCase } from 'lodash'

export default {
  name: 'LogoGrid',

  props: {
    sites: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    }
  },

  data () {
    return {
      showMore: false,
    }
  },

  methods: {
    slugify (text) {
      return kebabCase(text)
    },
  },

  computed: {
    sitesToDisplay () {
      if (!this.showMore) {
        return this.sites.slice(0, 6)
      }

      return this.sites
    }
  },
}
</script>

<style lang="scss" scoped>
.logo-grid {
  &__actions {
    a {
      font-size: 1.125em;
      text-decoration: underline;
    }
  }
}
</style>
