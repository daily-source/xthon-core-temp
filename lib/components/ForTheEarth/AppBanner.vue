<template>
  <section 
    id="banner"
    :style='{backgroundImage: `url(${require("@/assets/img/banner-img-1.png")})`}'
  >
    <div class="banner-content has-text-centered">
      <div class="container">
        <h2> Scroll down to see many ways to fight climate change and help the earth</h2>
      </div>
    </div>
    <a class='btn-down' @click='smoothScroll("content")'>
      <icons
        icon='chevron-down'
        :iconheight='36'
        :iconwidth='36'
        color='#019cdf'
      />
    </a>
  </section>
</template>

<script>
import Icons from 'Components/general/Icons'

export default {
  name: 'AppBanner',

  components: {
    Icons,
  },
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
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
      text-shadow: 0 2px 8px rgba(#000,.25);
    }
  }

  .btn-down {
    color: darken($secondary, 5%) !important;
    font-size: 1.5em;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all .2s ease;
    display: inline-block;
    transition: all .2s ease;
    z-index: 10;
    max-width: 20px;
    margin-left: auto;
    margin-right: auto;

    &:hover {
      transform: translateY(4px);
    }
  }
</style>
