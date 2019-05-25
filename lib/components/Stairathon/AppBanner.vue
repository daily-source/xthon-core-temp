<template>
  <section 
    id='banner'
    class="banner"
    :style='{backgroundImage: `url(${require("@/assets/img/images/banner-photo-5.jpg")})`}'
  >
    <div class="banner__content">
      <h1>Raise money for a cause you support</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppBanner',
}
</script>

<style lang="scss" scoped>
  #banner {
    min-height: 600px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: stretch;
    // justify-content: center;
    padding-bottom: 1em;
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
  }

  .banner__content {
    color: #fff;
    align-self: center;
    max-width: 400px;
    text-align: left;
    margin-left: 10%;
    position: relative;
    z-index: 10;

    h1 {
      text-align: left;
      color: $primary;
    }

    h2 {
      font-weight: 700;
      font-size: 2em;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
      text-shadow: 0 2px 8px rgba(#000,.25);
    }
  }

  .btn-down {
    color: darken($primary, 5%) !important;
    font-size: 1.25em;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 2px solid $primary;
    position: absolute;
    bottom: 1em;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    margin-left: auto;
    margin-right: auto;

    i {
      transition: all .2s ease;
      position: relative;
      top: 0;
    }

    &:hover i {
      transform: translateY(2px);
    }
  }
</style>