<template>
  <div class="fundraiser-grid">
    <div class="fundraiser__container">
      <h2 class="has-text-centered fundraiser-grid__title ">{{ fundraiser.label }}</h2>
      <div class="fundraiser-grid__initial-content">
        <div class="fundraiser-grid__row is-flex">
          <div 
            v-for="site in itemsToShow"
            :key="`fundraiser-${site.id}`"
            class="fundraiser-grid__col has-text-centered"
          >
            <a 
              :href="site.url || '#'"
              target='_blank'
            >
              <img 
                :src="require(`@/assets/img/site-logos/${site.imgName}`)"
                :id="`${site.id}-img`"
              />
            </a>
          </div>
        </div>
      </div>
      <transition
        appear
        @after-appear='onExtraContentAppear'
        @enter='onExtraContentEnter'
        @leave='onExtraContentLeave'
      >
        <div 
          class="extra-content fundraiser-grid__extra-content"
          v-show='expanded'
        >
          <div class="fundraiser-grid__row is-flex">
            <div
              v-for="site in itemsToExpand"
              :key="`fundraiser-${site.id}`"
              class="fundraiser-grid__col has-text-centered"
            >
              <a 
                :href="site.url || '#'"
                target='_blank'
              >
                <img 
                  :src="require(`@/assets/img/site-logos/${site.imgName}`)"
                  :id="`${site.id}-img`"
                />
              </a>
            </div>
          </div>
          <slot></slot>
        </div>
      </transition>
      <div class="see-more-container has-text-right">
        <a 
          href="#" 
          @click.prevent.stop="expanded = !expanded"
          class="has-text-weight-bold fundraiser-grid__see-more-link text-secondary"
        >
          {{ expanded ? 'See less' : 'See more' }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import TweenMax from 'gsap'

export default {
  name: 'FundraiserGrid',

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
      expanded: false,
      expandedHeight: 0,
      targetHeight: 0,
    }
  },

  methods: {
    onExtraContentAppear (el) {
    },

    onExtraContentEnter (el) {
      if (!this.targetHeight) {
        this.targetHeight = el.clientHeight
      }

      el.style.height = 0

      TweenMax.to(el, .3, { opacity: 1, height: this.targetHeight })
    },

    onExtraContentLeave (el, done) {
      this.targetHeight = el.clientHeight
      el.style.display = 'block'
      TweenMax.to(el, .3, { opacity: 0, height: 0, onComplete: done })
    }
  },

  computed: {
    itemsToShow () {
      return this.fundraiser.sites.slice(0, 6)
    },

    itemsToExpand () {
      return this.fundraiser.sites.slice(6)
    },
  }
}
</script>

<style lang="scss" scoped>
.fundraiser-grid {
  &__title {
    font-size: 2.625rem;
    margin-bottom: 0;
    margin-bottom: 1em;
    font-weight: 700;
    color: #333;
  }

  &__row {
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
  }

  &__col {
    max-width: 100%;
    flex-basis: 100%;
    padding-left: 25px;
    padding-right: 25px;
    margin-bottom: 3em;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    @include desktop {
      max-width: 33%;
      flex-basis: 33%;
    }
  }

  &__image {
    max-width: 220px;
    min-height: 90px;
    object-fit: contain;
  }

  &__see-more-link {
    text-decoration: underline; 
  }

  &__extra-content {
    overflow: hidden;
    opacity: 0;
    a {
      text-decoration: underline; 
    }
  }
}

.see-more-container {
  position: relative;
  z-index: 10;
}
</style>
