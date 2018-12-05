<template>
  <div class="box-wrapper" v-bind:class="{ 'vertical': layout !== 'row' && layout !== 'extended'}">
    <div v-if="layout !== 'row' && layout !== 'extended'">
      <div class="icon-wrapper" v-bind:class="{ 'large': large }" @click="imageClicked()">
        <LazyLoadedImage
          class="icon-img"
          alt=""
          v-bind:class="{ 'large': large }"
          :src="iconsrc"
        ></LazyLoadedImage>
        <LazyLoadedImage
          class="icon-img"
          alt=""
          :src="iconsrc"
          v-if="duplicate === true"
          
        ></LazyLoadedImage>
      </div>
      <div>
        <slot>
        </slot>
      </div>
    </div>
    <div class="columns horizontal" v-if="layout === 'row'" v-bind:class="{ 'reverse': reverse }">
      <div class="icon-wrapper column is-2"  v-bind:class="{ 'large': large }" @click="imageClicked()">
        <LazyLoadedImage
          class="icon-img"
          alt=""
          :src="iconsrc"
        ></LazyLoadedImage>
      </div>
      <div class="column content">
        <slot>
        </slot>
      </div>
    </div>
    <div class="columns horizontal" v-if="layout === 'extended'" v-bind:class="{ 'reverse': reverse }">
      <div class="icon-wrapper column is-5"  v-bind:class="{ 'large': large }" @click="imageClicked()">
        <LazyLoadedImage
          class="icon-img"
          alt=""
          :src="iconsrc"
        ></LazyLoadedImage>
      </div>
      <div class="column is-7 content">
        <slot>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import LazyLoadedImage from "Components/plugins/LazyLoadedImage.js"

export default {
  props: [ "iconsrc", "duplicate", "layout", "reverse", "large" ],
  components: {
    LazyLoadedImage
  },
  methods: {
    imageClicked () {
      this.$emit("image:clicked")
    }
  }
}
</script>

<style scoped lang="scss">
.box-wrapper {
  text-align: center;

  .icon-wrapper {
    text-align: center;

    &.large {
      min-height: 200px;
    }

    .icon-img {
      width: 50px;

      &.large {
        width: auto;
        max-width: 140px;

        @include breakpoint($tablet) {
          max-width: 180px;
        }
      }
    }
  }

  &.vertical {
    @include breakpoint($tablet) {
      min-width: 27%;
      max-width: 33%;
      margin-bottom: 10px;
    }
  }

  h2 {
    font-size: 17px;
    color: $color-text;
    font-weight: bold;
    line-height: 1.1;
    margin-bottom: 15px;
  }

  p {
    font-size: 15px;
  }

  .horizontal {
    text-align: center;
    margin: 10px 0;
    align-items: center;
    @include breakpoint($tablet) {
      padding: 0 3%;
    }

    @include breakpoint($widescreen) {
      padding: 0 4%;
    }

    .icon-img {
      width: auto;
      max-width: 140px;

      @include breakpoint($desktop) {
        max-width: 120px;
      }

      @include breakpoint($widescreen) {
        max-width: 140px;
      }
    }

    @include breakpoint($desktop) {
      display: flex;
      flex-direction: row;
      margin: 10px 0;
    }

    &.reverse {
      flex-direction: row-reverse;

      .icon-wrapper {
        @include breakpoint($desktop) {
          text-align: right;
        }
      }
    }

    .icon-wrapper {
      @include breakpoint($desktop) {
        text-align: left;
      }
    }

    p {
      font-size: 16px !important;

      @include breakpoint($desktop) {
        font-size: 20px !important;
        text-align: left;
      }

      @include breakpoint($fullhd) {
        font-size: 22px !important;
      }
    }

  }
}

</style>
