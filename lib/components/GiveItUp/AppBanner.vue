<template>
  <div>
    <div id="banner" :style="{'background-image': `url('${getBgImage()}')`}" v-if="!disableHero">
      <div class="container banner-content-container">
        <div class="banner-content w-100">
          <h3>By giving up a little, you can support nonprofits that really need help. <br />
          It's as easy as 1, 2, 3. &nbsp;Just choose:</h3>
          <ol class="m-0 p-0">
            <li>
              What to give up.
            </li>
            <li>
              How much to give up and for how long.
            </li>
            <li>
              Where to donate the money.
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="!version" id="bannerx" :class="`container version_${version}`" >
        <h3>Giving up a little helps us a lot. Just choose:</h3>
        <div class="banner-context">
          <ul class="">
            <li>
              <Icons iconwidth="30px" iconheight="30px" icon="check" color="#fff" class="icon" />
              <span>What to give up or use less of</span>
            </li>
            <li>
              <Icons iconwidth="24px" iconheight="24px" icon="hash" color="#fff" class="icon" />
              <span>How much to give up and for how long</span>
            </li>
          </ul>
        </div>
        <p><strong>The money you raise will support our nonprofit. Please start now with Step 1:</strong></p>
      </div>
      <div v-if="version == 1" id="bannerx" :class="`container version_${version}`" >
        <h3>Give up a little and help us a lot. Just choose:</h3>
        <div class="banner-context">
          <ul class="">
            <li>
              <Icons iconwidth="30px" iconheight="30px" icon="check" color="#fff" class="icon" />
              <span>What to give up</span>
            </li>
            <li>
              <Icons iconwidth="24px" iconheight="24px" icon="hash" color="#fff" class="icon" />
              <span>For how long</span>
            </li>
            <li>
              <Icons iconwidth="24px" iconheight="24px" icon="heart" color="#fff" class="icon" />
              <span>What nonprofit to help</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="version == 2" id="bannerx" :class="`container version_${version}`" >
        <h3>Give up a little and help us a lot. Just choose:</h3>
        <div class="banner-context">
          <ul class="">
            <li>
              <Icons iconwidth="30px" iconheight="30px" icon="check" color="#fff" class="icon" />
              <span>What to give up or use less of</span>
            </li>
            <li>
              <Icons iconwidth="24px" iconheight="24px" icon="hash" color="#fff" class="icon" />
              <span>How much to give up and for how long</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="version == 3" id="bannerx" :class="`container version_${version}`" >
        <h3>By giving up a little, you help our cause. Just choose:</h3>
        <div class="banner-context">
          <ul class="">
            <li>
              <Icons iconwidth="20px" iconheight="20px" icon="check" color="#fff" class="icon" />
              <span>What to give up.</span>
            </li>
            <li>
              <Icons iconwidth="18px" iconheight="18px" icon="hash" color="#fff" class="icon" />
              <span>How much to give up and for how long.</span>
            </li>
            <li>
              <Icons iconwidth="18px" iconheight="18px" icon="heart" color="#fff" class="icon" />
              <span>Where to donate the money.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"
import { mapState } from "vuex"

export default {
  name: "AppBanner",

  components: {
    Icons
  },

  props: ["disableHero"],

  computed: {
    ...mapState({
      currentBg: state => (state.bannerSwitcher ? state.bannerSwitcher.current : "")
    }),
    version () {
      return this.$route.query.version
    }
  },

  methods: {
    imagePath (imgName) {
      return require(`@/assets/img/images/${imgName}`)
    },

    getBgImage () {
      if (this.disableHero) {
        return
      }
      if (this.currentBg) {
        if (this.currentBg.type === "local") {
          return this.imagePath(this.currentBg.imgName)
        }
        return this.currentBg.imgUrl
      }
      return this.imagePath("banner-img-0.jpg")
    }
  }
}
</script>

<style lang="scss">
  #banner {
		height: calc(95vh - 75px);
    position: relative;
    // background-image: url('../assets/banner-img-1.jpg');
    background-size: cover;
    background-position: center;
    // display: flex;
    // align-items: center;
    // justify-content: center;

    @include tablet {
      height: 450px;
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background-color: rgba(#000, .35)
    }

    .banner-content-container {
      position: absolute;
      top: 27%;
      left: 0;
      right: 0;
    }

    .banner-content {
      position: relative;
      z-index: 10;
      color: #fff;

      @include tablet {
        max-width: 55%;
      }

      h3 {
        font-family: 'Poppins';
        font-weight: 700;
        line-height: 1.4;
				font-size: 1.25rem !important;

				@include tablet {
					font-size: 28px !important;
				}
      }

      ol {
        list-style: none;
        counter-reset: counter;

        li {
          font-size: 1ren;
          counter-increment: counter;
          font-weight: 700;
          margin-bottom: .25em;

					@include desktop {
						font-size: 1.25rem;
					}

          &:last-child {
            margin-bottom: 0;
          }

          &:before {
            content: counter(counter) ") ";
            display: inline-block;
            font-weight: 500;
            width: 25px;
          }
        }
      }
    }
  }
  #bannerx {
    text-align: center;
    background-color: #f0f0f0;
    padding: 50px;
    &.version_undefined {
      background-color: #f0f0f0;
      margin: 20px auto;
      h3 {
        font-family: 'Poppins';
        font-weight: 700;
        line-height: 1.4;
        color: $color-emphasis;
        font-size: 2rem;
      }
      li {
        display: flex;
        margin-bottom: 20px;
        @include tablet {
          justify-content: center;
          align-items: end;
          width: 30%;
          min-height: 90px;
          padding: 1.3%;
          line-height: 40px;
        }
        .icon {
          background: $color-emphasis;
          width: 40px;
          height: 40px;
          max-width: 40px;
          min-width: 40px;
          border-radius: 40px;
          margin-right: 10px;
        }
        span {
          line-height: 30px;
          padding-top: 5px;
        }
      }
    }
    &.version_1 {
      background-color: transparent;
      h3 {
        font-family: 'Poppins';
        font-weight: 700;
        line-height: 1.4;
        color: $color-emphasis;
        font-size: 2rem;
      }
      li {
        display: flex;
        margin-bottom: 20px;
        @include tablet {
          justify-content: center;
          align-items: end;
          width: 30%;
          min-height: 90px;
          padding: 1.3%;
          line-height: 40px;
        }
        .icon {
          background: $color-emphasis;
          width: 40px;
          height: 40px;
          max-width: 40px;
          min-width: 40px;
          border-radius: 40px;
          margin-right: 10px;
        }
      }
    }
    &.version_2 {
      background-color: transparent;
      h3 {
        font-family: 'Poppins';
        font-weight: 700;
        line-height: 1.4;
        color: $color-emphasis;
        font-size: 2rem;
      }
      li {
        display: flex;
        margin-bottom: 20px;
        @include tablet {
          justify-content: center;
          align-items: end;
          width: 30%;
          min-height: 90px;
          padding: 1.3%;
          line-height: 40px;
        }
        .icon {
          background: $color-emphasis;
          width: 40px;
          height: 40px;
          max-width: 40px;
          min-width: 40px;
          border-radius: 40px;
          margin-right: 10px;
        }
        span {
          line-height: 30px;
          padding-top: 5px;
        }
      }
    }
    &.version_3 {
      background-color: transparent;
      h3 {
        font-family: 'Poppins';
        font-weight: 700;
        line-height: 1.4;
        color: $color-emphasis;
        font-size: 2rem;
      }
      li {
        display: flex;
        margin-bottom: 20px;
        @include tablet {
          justify-content: center;
          align-items: end;
          width: 30%;
          min-height: 90px;
          padding: 1.3%;
        }
        .icon {
          background: $color-emphasis;
          width: 30px;
          height: 30px;
          max-width: 30px;
          min-width: 30px;
          border-radius: 30px;
          margin-right: 10px;
        }
      }
    }
  }
  .banner-context {
    text-align: left;
    margin: 0 auto;
    font-size: 24px;
    @include tablet {
      font-weight: bold;
      font-size: 28px;
      width: 40%;
    }
  }
  .version_undefined {
    .banner-context {
      font-size: 20px;
      font-weight: 300;
      margin-top: 30px;
      @include tablet {
        width: 100%;
        ul {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .version_1 {
    .banner-context {
      font-size: 20px;
      font-weight: 300;
      margin-top: 30px;
      @include tablet {
        width: 100%;
        ul {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .version_2 {
    .banner-context {
      font-size: 20px;
      font-weight: 300;
      margin-top: 30px;
      @include tablet {
        width: 100%;
        ul {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .version_3 {
    .banner-context {
      font-size: 20px;
      font-weight: 300;
      margin-top: 30px;
      @include tablet {
        width: 100%;
        ul {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
</style>
