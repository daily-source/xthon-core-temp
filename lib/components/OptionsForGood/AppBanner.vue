<template>
  <section 
    id="banner"
    :style='{backgroundImage: `url(${require("@/assets/img/banner-image.jpg")})`}'  
  >
    <div class="banner__content">
      <div class="container has-text-centered">
        <h2>A Host of Options to Do Good</h2>
        <button class="button is-large is-primary">Donate</button>
      </div>
    </div>
    <div class="banner__scroll-down-container">
      <button 
        @click="smoothScroll('content', 800, -70)"
        class="scroll-down-btn button is-primary is-outlined" 
      >
        <icons 
          icon='chevron-down'
          :iconheight='36'
          :iconwidth='36'
          color='#ef4836'
        />
      </button>
    </div>
  </section>
</template>

<script>
import Icons from 'Components/general/Icons'

export default {
  name: 'AppBanner',

  components: {
    Icons,
  }
}
</script>

<style scoped lang="scss">
#banner {
  min-height: calc(95vh - 128px);
    // background-attachment: fixed;
    background-size: cover;
    background-position: center;
    position: relative;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255,255,255,.02)
    }
  }

  .banner__content {
    position: absolute;
    bottom: 20%;
    left: 0;
    right: 0;
    color: #fff;

    h2 {
      font-size: 2.75rem;
      color: #fff;
      // text-shadow: 0 2px 2px rgba(0,0,0,.7);
      margin-bottom: .375em; 
      font-weight: 900;
    }

    .button {
      font-weight: 700;
      text-transform: uppercase;
      background-color: #ef4836;
      font-size: 1.25rem;
      padding-top: .625rem;
      padding-bottom: .625rem;
      padding-left: 2rem;
      padding-right: 2rem;
      height: auto;
    }
  }

  .banner__scroll-down-container {
    position: absolute;
    bottom: 5%;
    left: 0;
    right: 0;
    text-align: center;
  }

  .button.scroll-down-btn {
    border-radius: 100%;
    border-width: 2px;
    border-color: #EF4836;
    color: #EF4836;
    font-size: 1.5em;
    padding: 0;
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;


    &:hover {
      margin-top: .125em;
    }
}
</style>

<style lang="scss">
#banner {
  .icon-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>

