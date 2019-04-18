<style lang="scss" scoped>
  #banner-switcher {
    position: fixed;
    bottom: 3%;
    right: 5%;
    z-index: 9999;

    .btn-trigger  {
      border-radius: 100%;
      font-size: 1.5em;
      width: 50px;
      height: 50px;
      position: relative;
      z-index: 9999;
    }
  }

  #banner-overlay {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(255,255,255,.95);

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      cursor: pointer;
    }
  }
</style>

<template>
  <div id="banner-switcher">
    <button class="btn-trigger btn btn-primary" @click="toggleSwitcher()" v-if="!open">
      <i class="fas fa-cog"></i>
    </button>
    <button class="btn-trigger btn btn-primary" @click="toggleSwitcher()" v-if="open">
      <i class="fas fa-times"></i>
    </button>
    <div id="banner-overlay" :class="['fade', {'d-none': overlayHideTrigger, 'show': overlayShowTrigger }]">
      <div class="container">
        <div class="row mb-3">
          <div class="col-md-4 mb-3" v-for="(img,index) in bgImages" :key="index">
            <img
              class="img-fluid"
              :src="require(`@/assets/${img.imgName}`)"
              :alt="`Background Image Placeholder ${index}`"
              @click="handleImageSelected(index)"
            >
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6">
            <h2 class="font-weight-bold text-center "> OR </h2>
            <input type="text" class="form-control" placeholder="Enter an image url here...." v-model="url">
            <div class="btn-container text-center py-3 ">
              <button class="btn btn-primary btn-lg" @click="handleImageUrlSelected()">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  name: "BannerSwitcher",

  data () {
    return {
      open: false,
      overlayHideTrigger: true,
      overlayShowTrigger: false,
      url: ""
    }
  },

  computed: {
    ...mapState({
      bgImages: state => state.bannerSwitcher.bannerImages
    })
  },

  methods: {
    toggleSwitcher () {
      this.open = !this.open
      if (this.open) {
        this.overlayHideTrigger = false,
        setTimeout(() => {
          this.overlayShowTrigger = true
        }, 100)
      } else {
        this.overlayShowTrigger = false,
        setTimeout(() => {
          this.overlayHideTrigger = true
        }, 150)
      }
    },

    handleImageSelected (index) {
      this.switchBannerImage(index)
      this.toggleSwitcher()
    },

    handleImageUrlSelected () {
      if (this.url) {
        this.switchBannerImageUrl(this.url)
      }

      this.toggleSwitcher()
    },

    ...mapActions({
      switchBannerImage: "bannerSwitcher/switchBannerImage",
      switchBannerImageUrl: "bannerSwitcher/switchBannerImageUrl"
    })
  }
}
</script>
