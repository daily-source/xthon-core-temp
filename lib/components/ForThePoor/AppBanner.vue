<template>
  <section 
    id="banner"
    :style='{backgroundImage: `url(${require("@/assets/img/banner-img-1.jpg")})`}'
  >
    <div class="banner-content has-text-centered">
      <div class="container">
        <h2> Scroll down to see many ways to help the poorest half of people </h2>
      </div>
    </div>
    <a class='btn-down' @click='smoothScroll("content")'><i class="fas fa-chevron-down"></i></a>
  </section>
</template>

<script>
export default {
  name: 'AppBanner',
}
</script>

<style lang="scss">
  #banner {
    min-height: 500px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: center;
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
      background-color: rgba(0,0,0,.45);
    }
  }

  .banner-content {
    color: #fff;
    align-self: center;

    h2 {
      color: #fff;
      font-weight: 700;
      font-size: 2em;
      max-width: 650px;
      margin-left: auto;
      margin-right: auto;
      text-shadow: 0 2px 8px rgba(#000,.25);
      margin-top: 5em;
    }
  }

  .btn-down {
    color: darken($secondary, 5%) !important;
    font-size: 1.5em;
    position: absolute;
    bottom: 1em;
    left: 0;
    right: 0;
    transition: all .2s ease;
    z-index: 10;
    margin-left: auto;
    margin-right: auto;
    width: 3rem;
    height: 3rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $secondary;
    border-radius: 100%;

    &:hover {
      transform: translateY(4px);
    }
  }
</style>
