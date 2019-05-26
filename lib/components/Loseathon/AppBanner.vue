<template>
<div class='banner'>
  <img src='@/assets/img/loseathon-banner.jpg' alt=''>
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
  
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: right;
  }
}
</style>

