<template>
  <div class="raise-awareness-grid">
    <logo-grid 
      :sites='sites'
    />
  </div>
</template>

<script>
import sites from './sites'

export default {
  name: 'RaiseAwarenessGrid',

  components: {
    LogoGrid: () => import('Components/ForThePoor/LogoGrid')
  },

  data () {
    return {
      sites
    }
  },
}
</script>
