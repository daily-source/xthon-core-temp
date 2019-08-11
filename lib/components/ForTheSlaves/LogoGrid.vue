<template>
<div class="logo-grid">
  <div class="columns is-multiline is-mobile">
    <div 
      class="column is-one-third"
      v-for='(site, index) in sites'
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
</div>
</template>

<script>
import { kebabCase } from 'lodash'

import sites from './sites'

export default {
  name: 'LogoGrid',

  data () {
    return {
      sites,
    }
  },

  methods: {
    slugify (text) {
      return kebabCase(text)
    },
  },
}
</script>

<style lang="scss">
  .logo-grid {
    justify-content: center;

    .column {
      margin-bottom: 1em;
      display: flex;
      align-items: stretch;

      a {
        width: 100%;

        &:hover {
          .grid__img-wrap {
            box-shadow: 0 9px 18px 0 rgba(#000, .15);
            transform: translateY(-2px);
          }
        }
      }

      .grid__img-wrap {
        border-radius: 4px;
        border: 1px solid #ddd;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 1em;
        padding-bottom: 1em;
        width: 100%;
        transition: all .2s ease;
        min-height: 147px;
      } 
    }
  }

  .logo-grid img {
    display: block;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
