<template>
  <div>
    <section class="hero">
      <div class="hero-img" v-bind:style="{ backgroundImage: `url(${imgsrc})` }"></div>
      <div class="hero-body">
        <div class="container content-container">
          <h1 class="title" v-html="headline"></h1>
          <h3 class="cta" v-html="cta"></h3>
        </div>
      </div>
    </section>
    <div class="container">
      <h3 class="tagline" v-html="tagline"></h3>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "headline", "imgsrc", "tagline", "cta" ]
}
</script>

<style scoped lang="scss">
.hero {
  text-align: center;
  width: 100vw;
  min-height: 41vh;
  position: relative;

  @include mobile {
    min-height: 42vh;
  }

  @include tablet {
    min-height: 41vh;
  }

  @include widescreen {
    min-height: 33vw;
  }

  @include fullhd {
    min-height: 34vw;
  }

  .hero-img {
    width: 100vw;
    height: 38vh;
    position: absolute;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    @include mobile {
      background-size: cover;
      background-repeat: no-repeat;
      height: 40vh;
    }

    @include tablet {
      background-size: contain;
      background-position: center;
      height: 38vh;
    }

    @include desktop {
      height: 42vh;
    }

    @include widescreen {
      background-size: contain;
      min-height: 34vw;
      background-position: center;
    }
  }

  .hero-body {
    padding: 0;

    h1 {
      position: absolute;
      text-align: left;
      top: 17px;
      font-size: 26px;

      @include mobile {
        top: 0;
      }

      @include widescreen {
        font-size: 34px;
      }
    }
  }
}

.tagline {
  z-index: 1;
  position: static;
  width: 100%;
  text-align: center;
  line-height: 1.1;
  font-size: 36px;
  margin-bottom: 45px;
}

.cta {
  font-size: 20px;
  color: $color-emphasis;
  bottom: 13vw;
  position: absolute;

  @include mobile {
    bottom: 3vw;
  }

  @include tablet {
    bottom: 10vw;
    margin-bottom: 2px;
  }

  @include desktop {
    font-size: 28px;
    bottom: 5vw;
  }

  @include fullhd {
    bottom: 7vw;
  }
}

.content-container {
  @include desktop {
    max-width: 70%;
  }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}

</style>
