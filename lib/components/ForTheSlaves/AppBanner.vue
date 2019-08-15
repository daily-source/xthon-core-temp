<template>
  <section 
    id="banner"
    :style='{backgroundImage: `url(${require("@/assets/img/banner-img-4.png")})`}'
  >
    <div class="banner-content">
      <div class="container has-text-centered">
        <a class='btn-down' @click='smoothScroll("content")'><i class="fas fa-chevron-down"></i></a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppBanner',
}
</script>

<style lang="scss">
  #banner {
    height: 500px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 1em;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.1);
    }
  }

  .banner-content {
    color: #fff;

    h2 {
      font-weight: 700;
      font-size: 1.75em;
      max-width: 980px;
      margin-left: auto;
      margin-right: auto;
      text-shadow: 0 2px 8px rgba(#000,.25);
    }
  }

  .btn-down {
    color: darken($primary, 5%) !important;
    font-size: 1.5em;
    transition: all .2s ease;
    position: relative;
    transition: all .2s ease;
    width: 3rem;
    height: 3rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $primary;
    border-radius: 100%;

    &:hover {
      transform: translateY(4px);
    }
  }
</style>
