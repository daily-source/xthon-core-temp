<template>
  <main id="site-content">
    <section class='section slider'>
      <div class="container">
        <div class="slider__wrapper">
          <flickity
            ref='sliderMain'
            :options='sliderMainOpts'
            class='slider__main'
          >
            <div class="slide__wrapper">
              <div class="slide counters-for-the-poor-slide">
                <div class="logo-img__container">
                  <img src="@/assets/img/images/counters-for-the-poor.png" class='logo-img' alt="Counters for the Poor Logo">
                </div>
                <img src="@/assets/img/images/counters-for-the-poor-slide.png" class='slide-img ' alt="Counters for the Poor widget">
              </div>
            </div>
            <div class="slide__wrapper">
              <div class="slide virtual-railroad-slide">
                <div class="logo-img__container">
                  <img src="@/assets/img/images/virtual-railroad.png" class='logo-img' alt="Virtual Railroad Logo ">
                </div>
                <img src="@/assets/img/images/virtual-railroad-slide.jpg" class='slide-img slide-img--full-height' alt="Virtual Railroad Map">
              </div>
            </div>
            <div class="slide__wrapper">
              <div class="slide">
                <img src="@/assets/img/images/daily-source-slide.jpg" class='slide-img--full' alt="Daily Source Slide">
              </div>
            </div>
            <div class="slide__wrapper">
              <div class="slide world-wealth-calculator-slide">
                <div class="logo-img__container">
                  <img src="@/assets/img/images/world-wealth-calculator.png" class='logo-img' alt="Maps for the Poor slide">
                </div>
                <img src="@/assets/img/images/world-wealth-calculator-slide.jpg" class='slide-img' alt="Maps for the Poor map">     
              </div>
            </div>
            <div class="slide__wrapper">
              <div class="slide">
                <div class="logo-img__container">
                  <img src="@/assets/img/images/maps-for-the-poor.png" class='logo-img' alt="Maps for the Poor slide">
                </div>
                <img src="@/assets/img/images/maps-for-the-poor-slide.jpg" class='slide-img slide-img--full-height' alt="Maps for the Poor map">     
              </div>
            </div>
          </flickity>
          <flickity 
            ref='sliderNav'
            :options='sliderNavOpts'
            class='slider__nav'
          >
            <div class="slide__wrapper">
              <div class="slide">
                <img src="@/assets/img/images/counters-for-the-poor.png" alt="Counters for the Poor" id='counters-for-the-poor-img'>
              </div>
            </div>
            <div class="slide__wrapper">
              <div class="slide">
                <img src="@/assets/img/images/virtual-railroad.png" alt="Virtual Railroad" id='virtual-railroad-img'>
              </div>
            </div>
            <div class="slide__wrapper">
              <div class="slide">
                <img src="@/assets/img/images/dailysource.png" alt="Daily Source" img='daily-source-img'>
              </div>
            </div>
            <div class="slide__wrapper">
              <div class="slide">
                <img src="@/assets/img/images/world-wealth-calculator.png" alt="World Wealth Calculator" img='world-wealth-calculator-img'>
              </div>
            </div>
            <div class="slide__wrapper">
              <div class="slide">
                <img src="@/assets/img/images/maps-for-the-poor.png" alt="Maps for the Poor" id='maps-for-the-poor-img'>
              </div>
            </div>
          </flickity>
        </div>
      </div>
    </section>
    <section class="section heading-section">
      <h4 class='has-text-centered has-text-weight-bold'>We are creating a variety of websites to teach people about a range of important topics. The first site below is operational and is updated throughout the day with fresh content. The other sites are in mockup form:</h4>
    </section>
    <section class="section websites">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-full has-text-centered">
            <router-link to='#'>
              <div class="website__wrapper website__wrapper--half">
                <div class="website__logo-container">
                  <img src="@/assets/img/images/dailysource.png" alt="Daily Source Logo" class='logo-img dailysource-logo logo-img--full'>
                </div>
                <p>
                DailySource gives you high quality news and information from leading sources across the Internet to help you better utilize your time, money and power to benefit our world.
                </p>
              </div>
            </router-link>
          </div>
          <div class="column is-half has-text-centered">
            <router-link to='#'>
              <div class="website__wrapper">
                <div class="website__logo-container">
                  <img src="@/assets/img/images/counters-for-the-poor.png" alt="Counters for the Poor Logo" class='logo-img counters-for-the-poor-logo'>
                </div>
                <p>
                See how many lives are stolen each second and see the impact you can make.
                </p>
              </div>
            </router-link>
          </div>
          <div class="column is-half has-text-centered">
            <router-link to='#'>
              <div class="website__wrapper">
                <div class="website__logo-container">
                  <img src="@/assets/img/images/maps-for-the-poor.png" alt="Maps for the Poor Logo" class='logo-img maps-for-the-poor-logo logo-img--wide'>
                </div>
                <p>
                These amazing maps will show you where the world really needs to put its attention.
                </p>
              </div>
            </router-link>
          </div>
           <div class="column is-half has-text-centered">
            <router-link to='#'>
              <div class="website__wrapper">
                <div class="website__logo-container">
                  <img src="@/assets/img/images/world-wealth-calculator.png" alt="World Wealth Calculator Logo" class='logo-img world-wealth-calculator-logo logo-img--wider'>
                </div>
                <p>
                Do you know how much money you make compared to the rest of the world's people?
                </p>
              </div>
            </router-link>
          </div>
          <div class="column is-half has-text-centered">
            <router-link to='#'>
              <div class="website__wrapper">
                <div class="website__logo-container">
                <img src="@/assets/img/images/see-our-slaves.png" alt="See Our Slaves Logo" class='logo-img see-our-slaves-logo'>
                </div>
                <p>
                See footage of the slaves who make the clothing, food, and electronics we use.
                </p>
              </div>
            </router-link>
          </div>
          <div class="column is-whole website__actions has-text-right">
            <a href="#">See more</a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// Requires flickity-as-nav-for
import Flickity from 'LocalComponents/plugins/Flickity.vue'

export default {
  name: 'SiteContent',

  components: {
    Flickity,
  },

  data () {
    return {
      sliderMainOpts: {
        pageDots: false,
        autoPlay: 3000
      },
      sliderNavOpts: {
        wrapAround: true,
        cellAlign: 'left',
        asNavFor: '.slider__main'
      },
    }
  },
}
</script>

<style lang='scss'>
  .intro__heading {
    margin-left: auto;
    margin-right: auto;
    font-size: 1.25em;
    font-weight: 700 !important;
    color: $color-gray !important;

    @include desktop {
      max-width: 85%;
    }
  }

  .slider {
    background-color: darken($secondary, 2%);
  }

  .slider__wrapper {
    .slide__wrapper {
      background-color: #fff;
      width: 100%;
      border-radius: 5px;

      .slide {
        display: flex;
        padding: 15px;
        box-sizing: border-box;
        align-items: center;
        flex-direction: row;
        height: 400px;

        @include mobile {
          height: 350px;
          flex-direction: column;
          justify-content: center;
        }
      }

    }

    .flickity-page-dots {
      bottom: unset;
    }

    .logo-img__container {
      max-width: 47%;
      position: relative;
      z-index: 10;
      margin-bottom: 1em;
      display: flex;
      justify-content: center;
      align-items: center;

      @include mobile {
        max-width: 100%;
      }

      .logo-img {
        object-fit: contain;
        object-position: center;
        max-width: 85%;
        margin-left: auto;
        margin-right: auto;
      }
    }

    .slide-img {
      object-fit: cover;
      position: absolute;
      width: 50%;
      max-width: 50%;
      right: 15px;
      top: 15px;


      @include mobile {
        position: static;
        width: 100%;
        max-width: 100%;
      }

      &--full-height {
        height: calc(100% - 30px);
      }

      &--full {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: top;
      } 
    }
  }

  .slider__nav {
    display: none;

    @include desktop {
      margin-top: 1em;
      display: block;
    }

    .slide__wrapper {
      width: 22%;
      margin-left: 15px;

      .slide {
        text-align: center;
        height: 120px;
        justify-content: center;
      }
    }
  }

  .counters-for-the-poor-slide,
  .world-wealth-calculator-slide {
    .slide-img {
      top: 20%;
    }
  }

  .heading-section {
    font-weight: 700;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.125em;
    padding-bottom: 0;

    @include mobile {
      max-width: 100%;
    }

    h4 {
      color: $color-gray;
      margin-bottom: 0;

      @include mobile {
        font-size: 1em !important;
      }
    }
  }

  .websites {
    p {
      font-size: 1em;
      max-width: 70%;
      margin-left: auto;
      margin-right: auto;
      margin-top: 1em;
      color: $color-gray;

      @include mobile {
        max-width: 100%;
      }
    }
    .website__wrapper {
      padding: 15px;
      border: 1px solid rgba($color-gray, .2);
      transition: all .2s ease;
      box-shadow: none;
      border-radius: 5px;

      &:hover {
        box-shadow: 0 4px 18px 2px rgba($color-gray, .3);
        border-color: rgba($color-gray, .5);
        transform: translateY(-2px);
      }

      &--half {
        max-width: 50%;
        margin-left: auto;
        margin-right: auto;
        @include mobile {
          max-width: 100%;
          margin-left: auto;
          margin-right: auto;
        }
      }
      
    }

    .website__actions {
      a {
        text-decoration: underline;
      }
    }
  }
</style>