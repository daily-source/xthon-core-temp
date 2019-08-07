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
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;

  &--connecting-with-god,
  &--grow-in-god-and-raise-money-for-good {
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
    padding-bottom: 1.5rem;
    color: $primary;
    font-size: 1.75rem;

    @include tablet {
      font-size: 2.5rem;      
    }
  }

  &__column {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 150px;
  }

  &__logo {
    &--forgiveness-class {
      width: 355px;
    }

    &--christian-evaluation {
      width: 310px;
    }

    &--handling-losses {
      width: 290px;
    }
    
    &--righteous-resolutions {
      width: 290px;
    }

    &--the-lent-site {
      width: 220px;
    }

    &--christian-song {
      width: 395px;
    }

    &--walks-with-god {
      width: 270px;
    }

    &--prayer-approaches {
      width: 268px;
    }

    &--divine-music {
      width: 250px;
      transform: translateY(-15px)
    }

    &--christian-mythics {
      width: 275px;
    }

    &--adoration-guide {
      width: 320px;
    }

    &--families-for-good {
      width: 275px;
    }

    &--businesses-for-good {
      width: 265px;
    }

    &--schools-for-good {
      width: 230px;
    }

    &--colleges-for-good {
      width: 350px;
      margin-top: -12px;
    }

    &--temples-for-good {
      width: 280px;
    }

    &--churches-for-good {
      width: 280px;
    }

    &--thanksathon {
      width: 300px;
      max-width: 100% !important;
    }

    &--christmas-compassion {
      max-width: 100% !important;
      width: 235px;
    }

    &--easter-giving {
      width: 210px;
      max-width: 100% !important;
    }

    &--lent-for-love {
      width: 210px;
    }

    &--leagues-for-good {
      width: 245px;
    }

    &--franciscans-for-good {
      width: 310px;
      transform: translateY(15px);
    }

    &--bibleathon {
      max-width: 80% !important;
    }

    &--helpful-hannakuh {
      width: 265px;
      max-width: 100% !important;
      margin-top: 10px;
    }

    &--torathon {
      max-width: 280px !important;
    }

    &--praciticing-gratitude {
      width: 310px;
    }

    &--learning-discrement {
      width: 290px;
    }

    &--practice-of-letting-go {
      width: 300px;
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
