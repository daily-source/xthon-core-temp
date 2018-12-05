<template>
  <div class="card column card-loop">
    <div class="transition-wrapper" v-for="(image, index) in imgarr" :key="image.imgsrc">
      <keep-alive>
        <LazyLoadedImage
          class="card-content card-taller rotating-image" 
          :src="imgarr[index].imgsrc"
          :is-background="true"
          :class="{'is-active': index === currentImg % imgarr.length}"
        ></LazyLoadedImage>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import LazyLoadedImage from "Components/plugins/LazyLoadedImage.js"

export default {
  props: [ "imgarr", "delay", "interval" ],
  components: {
    LazyLoadedImage
  },
  data () {
    return {
      currentImg: 0,
      timer: null
    }
  },
  mounted () {
    this.startRotation()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    startRotation () {
      setTimeout(() => {
        this.timer = setInterval(this.next, this.interval)
      }, this.delay)
    },
    next: function () {
      this.currentImg++
    },
    prev: function () {
      this.currentImg--
    }
  }
}
</script>

<style scoped lang="scss">
.rotating-image {
  transition: opacity 0.42s ease-in-out;
  opacity: 0;
}
.is-active {
  opacity: 1;
}
</style>

