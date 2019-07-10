<template>
  <div class="raise-awareness-grid">
    <logo-grid 
      :sites='sites'
    />
  </div>
</template>

<script>
import LogoGrid from 'Components/ForThePoor/LogoGrid'
import { kebabCase } from 'lodash'

export default {
  name: 'RaiseAwarenessGrid',

  components: {
    LogoGrid,
  },

  data () {
    return {
      sites: [
        {
          name: 'DailySource',
          image: 'dailysource.png',
          link: 'http://www.dailysource.org/',
        },
        {
          name: 'In Sight In Mind',
          image: 'insight-in-mind.png',
          link: 'http://insightinmind.org/',
        },
        {
          name: 'Counters for the Poor',
          image: 'counters-for-the-poor.png',
          link: 'http://countersforthepoor.org/',
        },
        {
          name: 'Rule Your World',
          image: 'rule-your-world.png',
          link: 'http://ruleyourworld.org/',
        },
        {
          name: 'World Wealth Calculator',
          image: 'word-wealth-calculator.png',
          link: 'http://www.worldwealthcalculator.org/',
        },
        {
          name: 'Zero to 100',
          image: '0to100.png',
          link: 'http://0to100.org/',
        },
        {
          name: 'Crowdsourcing for the Poor',
          image: 'crowdsourcing-for-the-poor.png',
          link: '#',
        },
        {
          name: 'Balance Giving',
          image: 'balanced-giving.png',
          link: '#',
        },
        {
          name: 'Maps for the Poor',
          image: 'maps-for-the-poor.png',
          link: '#',
        },
      ],
    }
  },
}
</script>

<style lang='scss'>
.grid {
  &__img-wrap {
    .rule-your-world {
      max-width: 250px;
    }

    .zero-to-100 {
      max-width: 230px;
    }

    .in-sight-in-mind {
      max-width: 330px;
    }
  }
}
</style>
