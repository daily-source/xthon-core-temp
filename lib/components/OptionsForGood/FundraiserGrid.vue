<template>
  <section :id="$vnode.key" class="fundraiser-grid">
    <div class="container">
      <h2 class="has-text-centered fundraiser-grid__title">{{ fundraiser.label }}</h2>
      <div class="columns is-multiline justify-content-center">
        <div 
          v-for="(site, index) in fundraiser.sites"
          :key="site.id"
          :class="['column is-4', 'has-text-centered', {'is-hidden': index >= itemsToShow}]"
        >
          <a :href='site.url || "#"' target='_blank'>
            <fundraiser-single 
              :img-base-dir="$vnode.key"
              :fundraiser="site"
              :key="site.id"
            />
          </a>
        </div>
      </div>
      <div class="extra-content" v-if="expanded">
        <slot></slot>
      </div>
      <div class="see-more-container has-text-right">
        <a 
          href="#" 
          @click.prevent.stop="expanded = !expanded"
          class="font-weight-bold see-more-link text-secondary"
        >
          {{ expanded ? 'See less' : 'See more' }}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import FundraiserSingle from "./FundraiserSingle.vue"

export default {
  name: 'FundraiserGrid',

  components: {
    FundraiserSingle,
  },

  props: {
    fundraiser: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },

  data () {
    return {
      expanded: false
    }
  },

  computed: {
    itemsToShow () {
      if (this.expanded) {
        return this.fundraiser.sites.length
      }

      return 6
    }
  }
}
</script>

<style scoped lang="scss">
.fundraiser-grid {
  &__title {
    font-size: 2.5rem;
    margin-bottom: 0;
    padding-top: 3rem;
    color: #000;
    font-weight: 700;
  }

  &__image {
    max-width: 220px;
    min-height: 90px;
    object-fit: contain;
  }

  .see-more-link,
  .extra-content a { 
    text-decoration: underline; 
  }

  .see-more-container {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}
</style>
