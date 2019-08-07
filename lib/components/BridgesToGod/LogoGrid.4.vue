<template>
  <div :class='`logo-grid logo-grid--${slug}`'>
    <h2 class="logo-grid__title has-text-centered has-text-weight-bold">{{ title }}</h2>
    <div class="container">
      <div class="logo-grid__columns columns is-multiline">
        <div 
          class="logo-grid__column column is-4"
          v-for="logo in visibleLogos"
          :key='logo.slug'
        >
          <img 
            :src="logo.url" 
            :alt="logo.name" 
            :class="`logo-grid__logo logo-grid__logo--${logo.slug} is-block`">
        </div>
      </div>
      <div class="logo-grid__see-more-link-container has-text-right">
        <a 
          @click.prevent='showMoreLogos = !showMoreLogos'
          class="logo-grid__see-more-link has-text-weight-bold is-text is-paddingless">
          See {{ showMoreLogos ? 'less' : 'more' }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoGrid',

  props: {
    logos: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },

    title: {
      type: String,
      required: false,
      default: ''
    },

    slug: {
      type: String,
      required: false,
      default: 'default',
    }
  },

  data () {
    return {
      showMoreLogos: false,
    }
  },

  computed: {
    visibleLogos () {
      const { logos, showMoreLogos } = this

      if (logos.length <= 6) {
        return logos
      }

      if (!showMoreLogos) {
        return logos.slice(0, 6)
      }

      return logos
    },
  },
}
</script>

<style lang="scss" scoped>
.logo-grid {
  $self: &;
  padding-top: 3rem;
  padding-bottom: 3rem;

  &--practical-tools-for-spiritual-living,
  &--opportunities-and-resources-for-groups {
    background-color: #eaf7ff;
  }

  &--practical-tools-for-spiritual-living {
    #{ $self }__column {
      min-height: 140px;
    }
  }

  &--connecting-with-god {
    #{ $self }__title {
      margin-bottom: .5rem;
    }

    #{ $self }__column {
      min-height: 130px;
    }
  }

  &--grow-in-god-and-raise-money-for-good {
    #{ $self }__title {
      margin-bottom: -1rem;
    }
  }

  &__title {
    margin-bottom: 0;
    padding-bottom: 2rem;
    color: $primary;
    font-size: 2.5rem;
  }

  &__column {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 150px;
  }

  &__logo {
    &--righteous-resolutions {
      width: 345px;
    }

    &--christian-evaluation {
      width: 400px;
    }

    &--the-lent-site {
      width: 270px;
    }

    &--christian-song {
      transform: translateY(12px);
    }

    &--divine-music {
      width: 370px;
      transform: translateY(-15px)
    }

    &--christian-mythics {
      width: 365px;
    }

    &--adoration-guide {
      max-width: 95% !important; 
      margin-top: 18px; 
    }

    &--schools-for-good {
      width: 270px;
      margin-top: -20px;
    }

    &--businesses-for-good {
      width: 340px;
    }

    &--churches-for-good {
      width: 340px;
    }

    &--leagues-for-good {
      width: 310px;
    }

    &--franciscans-for-good {
      transform: translateY(15px);
    }

    &--christmas-compassion {
      width: 300px;
    }

    &--helpful-hannakuh {
      width: 355px;
      max-width: 100% !important;
      margin-top: 10px;
    }

    &--torathon {
      max-width: 280px !important;
    }

    &--walks-with-god {
      width: 368px;
    }

    &--prayer-approaches {
      width: 360px;
    }

    &--families-for-good {
      width: 380px;
      max-width: 100% !important;
    }

    &--businesses-for-good {
      width: 350px;
      max-width: 100% !important;
      margin-top: -10px;
    }

    &--thanksathon {
      max-width: 100% !important;
    }

    &--christmas-compassion {
      max-width: 100% !important;
      width: 290px;
    }

    &--easter-giving {
      width: 240px;
      margin-top: 10px;
    }

    &--lent-for-love {
      width: 250px;
    }
  }

  &--connecting-with-god,
  &--opportunities-and-resources-for-groups {
    #{ $self }__logo {
      max-width: 90%;
      margin-left: auto;
      margin-right: auto;
    }
  }

  &--grow-in-god-and-raise-money-for-good {
    #{ $self }__logo {
      max-width: 80%;
      margin-left: auto;
      margin-right: auto;
    }
  }

  &__see-more-link {
    color: $primary; 
    text-decoration: underline;

    &:hover {
      background-color: transparent;
      color: $primary;
    }
  }
}
</style>
