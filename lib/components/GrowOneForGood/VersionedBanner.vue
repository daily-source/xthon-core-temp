<template>
  <div class="app-banner">
    <app-banner 
      v-if='$version == 1'
    />
    <dynamic-banner 
      v-else-if='$version == 2'
    />
  </div>
</template>

<script>
import AppBanner from 'Components/GrowOneForGood/AppBanner'

export default {
  name: 'VersionedBanner',

  components: {
    AppBanner,
  },
}
</script>
