<template>
<div class='banner'>
  <img src='@/assets/img/loseathon-banner.jpg' alt=''>
  <div class="banner__contents">
    <h2 class='has-text-weight-bold'>Lose Weight and Change the World</h2>
  </div>
</div>
</template>

<script>
export default {
  name: 'AppBanner',
}
</script>

<style lang="scss" scoped>
.banner {
  height: 550px;
  background-color: #fff;
  position: relative;

  h2 {
    font-size: 2.125em;
    line-height: 1.4;
    color: $primary;
  }
  
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: right;
  }

  &__contents {
    position: absolute;
    top: 45%;
    left: 10%;
    max-width: 400px;
  }
}
</style>
