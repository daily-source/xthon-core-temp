<template>
<div class='banner'>
  <img src='@/assets/img/loseathon-banner.jpg' alt=''>
  <div class="banner__contents">
    <h2>Lose Weight and Change the World.</h2>
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
  
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: right;
  }

  &__contents {
    position: absolute;
    top: 40%;
    left: 5%;

    h2 {
      color: $primary;
      font-family: 'Poppins';
    }
  }
}
</style>

