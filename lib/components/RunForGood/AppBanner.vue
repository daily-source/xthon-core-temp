<template>
  <section id="banner" class="banner">
    <img 
      :src="require('@/assets/img/images/banner-img-1.jpg')" 
      alt="A running woman's sillhouete"
    >
  </section>
</template>

<script>
export default {
  name: 'AppBanner',
}
</script>

<style lang='scss' scoped>
.banner {
  height: 450px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
