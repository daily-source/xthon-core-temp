<template>
  <div class="raise-awareness-grid">
    <logo-grid 
      :sites='sites'
    />
  </div>
</template>

<script>
export default {
  name: 'RaiseAwarenessGrid',

  components: {
    LogoGrid: () => import('Components/ForThePoor/LogoGrid')
  },

  data () {
    let sites = [
      {
        name: 'Waste Less Food',
        image: 'waste-less-food.png',
        link: '#',
      },
      {
        name: 'Environmental Debt',
        image: 'environmental-debt.png',
        link: '#',
      },
      {
        name: 'Environmental Cliff',
        image: 'environmental-cliff.png',
        link: '#',
      },
      {
        name: 'Future Safegiving',
        image: 'future-safe-giving.png',
        link: '#',
      },
      {
        name: 'Homes for the Earth',
        image: 'homes-for-the-earth.png',
        link: '#',
      },
      {
        name: 'Creating your History',
        image: 'creating-your-history.png',
        link: '#',
      },
      {
        name: 'Green Crowdsourcing',
        image: 'green-crowd-sourcing.png',
        link: '#',
      },
    ]

    return {
      sites
    }
  },
}
</script>
