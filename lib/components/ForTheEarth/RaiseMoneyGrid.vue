<template>
<div class="raise-money-grid">
  <logo-grid 
    :sites='sites'
  />
</div>
</template>

<script>
import LogoGrid from 'Components/ForThePoor/LogoGrid'

export default {
  name: 'RaiseMoneyGrid',

  components: {
    LogoGrid,
  },

  data () {
    return {
      sites: [
        {
          name: 'Volunteerathon',
          image: 'volunteerathon.png',
          link: 'https://vthon-vue-ssr.herokuapp.com/',
        },
        {
          name: 'Quitathon',
          image: 'quitathon.png',
          link: 'http://quitathon2.surge.sh/',
        },
        {
          name: 'Give It For The Earth',
          image: 'give-it-for-the-earth.png',
          link: 'http://giveitup.net/',
        },
        {
          name: 'Run For Good',
          image: 'run-for-good.png',
          link: 'http://runforgood.net/',
        },
        {
          name: 'Ride For Good',
          image: 'ride-for-good.png',
          link: 'http://rideforgood.org/',
        },
        {
          name: 'Calendar For Good',
          image: 'calendar-for-good.png',
          link: 'http://calendarforgood.org/',
        },
        {
          name: 'Charitable Contests',
          image: 'charitable-contests.png',
          link: '#',
        },
        {
          name: 'Loseathon',
          image: 'loseathon.png',
          link: '#',
        },
        {
          name: 'Records for Good',
          image: 'records-for-good.png',
          link: '#',
        },
        {
          name: 'Bake for Good',
          image: 'bake-for-good.png',
          link: '#',
        },
        {
          name: 'Benevolent Birthdays',
          image: 'benevolent-birthdays.png',
          link: '#',
        },
        {
          name: 'Walk for Good',
          image: 'walk-for-good.png',
          link: '#',
        },
      ],
    }
  },
}
</script>

<style lang='scss'>
.logo-grid {
  &__img {
    .charitable-contests {
      max-width: 250px;
    }

    .loseathon {
      max-width: 200px;
    }

    .records-for-good {
      max-width: 270px;
    }

    .bake-for-good {
      max-width: 200px;
    }

    .benevolent-birthdays {
      max-width: 230px;
    }
  }
}
</style>
