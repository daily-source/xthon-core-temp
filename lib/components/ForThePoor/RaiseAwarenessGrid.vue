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

  computed: {
    sites () {
      let sites = [
        {
          name: 'In Sight In Mind',
          image: 'insight-in-mind.png',
          link: 'http://insightinmind.org/',
        },
        {
          name: 'Rule Your World',
          image: 'rule-your-world.png',
          link: 'http://ruleyourworld.org/',
        },
        {
          name: 'Counters for the Poor',
          image: 'counters-for-the-poor.png',
          link: 'http://countersforthepoor.org/',
        },
        {
          name: 'Balance Giving',
          image: 'balanced-giving.png',
          link: '#',
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
          name: 'DailySource',
          image: 'dailysource.png',
          link: 'http://www.dailysource.org/',
        },
        {
          name: 'Crowdsourcing for the Poor',
          image: 'crowdsourcing-for-the-poor.png',
          link: '#',
        },
        {
          name: 'Maps for the Poor',
          image: 'maps-for-the-poor.png',
          link: '#',
        },
        {
          name: 'Equal Opportunity Giving',
          image: 'equal-opportunity-giving.png',
          link: '#',
        },
        {
          name: 'The Biggest Problem',
          image: 'the-biggest-problem.png',
          link: '#',
        },
        {
          name: 'Give It Up for The Poor',
          image: 'give-it-up-for-the-poor.png',
          link: '#',
        },
        {
          name: 'No Double Standards',
          image: 'no-double-standards.png',
          link: '#',
        },
        {
          name: 'Religionly',
          image: 'religionly.png',
          link: '#',
        },
        {
          name: 'True Mission',
          image: 'true-mission.png',
          link: '#',
        },
        {
          name: 'Our Free Will',
          image: 'our-free-will.png',
          link: '#',
        },
      ]

      return sites
    },
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
