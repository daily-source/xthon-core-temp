<template>
  <div class="fundraiser-grid section">
    <div class="fundraiser__container container">
      <h2 class='fundraiser-grid__title has-text-centered'>{{ category }}</h2>
      <div class="fundraiser-grid__loader" v-if='isLoading'>

      </div>
      <div class="fundraiser-grid__sites">
        <div class="fundraiser__initial-content">
          <div class="fundraiser-grid__row is-flex">
            <div 
              v-for="site in itemsToShow"
              :key="`fundraiser-${site.slug}`"
              class="fundraiser-grid__col has-text-centered"
            >
              <a 
                :href="site.url || '#'"
                target='_blank'
              >
                <img
                  :src="`https://maxgood-logos.s3-us-west-2.amazonaws.com/${site.fileName}`"
                  :id="`${site.slug}-img`"
                />
              </a>
            </div>
          </div>
        </div>
        <div 
          class="extra-content fundraiser-grid__extra-content"
          ref='extraContent'
        >
          <div class="fundraiser-grid__row is-flex">
            <div
              v-for="site in itemsToExpand"
              :key="`fundraiser-${site.slug}`"
              class="fundraiser-grid__col has-text-centered"
            >
              <a 
                :href="site.url || '#'"
                target='_blank'
              >
                <img 
                  :src="`https://maxgood-logos.s3-us-west-2.amazonaws.com/${site.fileName}`"
                  :id="`${site.slug}-img`"
                />
              </a>
            </div>
          </div>
        </div>
        <div class="see-more-container has-text-right">
            <a 
              href="#" 
              @click.prevent.stop="expandContainer"
              class="has-text-weight-bold fundraiser-grid__see-more-link text-secondary"
            >
              {{ expanded ? 'See less' : 'See more' }}
            </a>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import imagesLoaded from 'imagesloaded'
import axios from 'axios'

export default {
  name: 'FundraiserGrid',

  props: {
    category: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      sites: [],
      isLoading: true,
      expanded: false,
      expandedHeight: 0,
      targetHeight: 0,
      maxHeight: null,
    }
  },

  mounted () {
    this.fetchLogos()
  },

  methods: {
    async fetchLogos () {
      const res = await axios.get('http://maxgood-logo-manager.herokuapp.com/api/logos', {
        params: {
          category: _.kebabCase(this.category),
        }
      });

      this.sites = res.data.logos;

      imagesLoaded(this.$el, () => {
        this.setContainerMaxHeight();
      });
    },

    setContainerMaxHeight () {
      this.maxHeight = this.$el.scrollHeight;
    },

    expandContainer () {
      this.expanded = !this.expanded;

      if (this.expanded) {
        this.$refs.extraContent.style.display = 'block';
        setTimeout(() => {
          this.$refs.extraContent.style.maxHeight = `${this.$refs.extraContent.scrollHeight}px`;
        }, 100)
      } else {
        this.$refs.extraContent.style.maxHeight = `0px`;
        setTimeout(() => {
          this.$refs.extraContent.style.display = 'none';
        }, 200)
      }
    }
  },

  computed: {
    itemsToShow () {
      return this.sites.slice(0, 6)
    },

    itemsToExpand () {
      return this.sites.slice(6)
    },
  }
}
</script>

<style lang="scss" scoped>
.fundraiser-grid {
  overflow: hidden;

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
    transition: max-height .2s ease;
    overflow: hidden;
    display: none;
    max-height: 0;

    a {
      text-decoration: underline; 
    }
  }
}
</style>
