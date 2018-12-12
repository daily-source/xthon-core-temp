<template>
  <div class="" ref="nonpToolbar">
    <div class="share-toolbar__outer-wrapper" :class="{'toolbar-visible': isVisible}">
      <h5>Share</h5>
      <div class="share-toolbar__share-wrapper">
        <div class="share-toolbar__share-item share-toolbar__share-share" @click="fb()">
          <Icons iconwidth="24px" iconheight="24px" icon="facebook" color="#666" class="icon" />
        </div>
        <div class="share-toolbar__share-item share-toolbar__share-comment" @click="tweet()">
          <Icons iconwidth="24px" iconheight="24px" icon="twitter" color="#666" class="icon" />
        </div>
        <div class="share-toolbar__share-item share-toolbar__share-donate" @click="linkedIn()">
          <Icons iconwidth="24px" iconheight="24px" icon="linkedin" color="#666" class="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.share-toolbar {
  &__outer-wrapper {
    padding: 5px;
    background: yellow;
    display: inline-block;
    text-align: center;
    z-index: 10;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    @include breakpoint($widescreen) {
      right: auto;
      bottom: auto;
      top: 20px;
      left: calc((100vw - 960px)/2 - 110px);
    }

    @include breakpoint($fullhd) {
      left: calc((100vw - 1152px)/2 - 100px);
    }
    h5 {
      display: none;
      color: $color-text;
      @include breakpoint($widescreen) {
        display: block;
        font-size: 14px;
      }
    }
  }
  &__share-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;

    @include breakpoint($widescreen) {
      flex-direction: column;
    }
  }
  &__share-item {
    margin: 0 10px;
    &:hover {
      cursor: pointer;
    }
  }
  &__share-share,
  &__share-donate {
    .icon {
      margin-right: 4px;
    }
  }
}

.toolbar-visible {
  position: fixed;
  opacity: 1;
}

</style>

<script>
import Icons from "Components/general/Icons.vue"
import * as sharer from "../../util/sharer.js"

export default {
  props: [ "urlParams", "text", "via", "title" ],
  components: {
    Icons
  },
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    handleScroll () {
      var nonpScrolltop = this.$refs.nonpToolbar.getBoundingClientRect()
      var top = window.pageYOffset || document.documentElement.scrollTop
      var docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight
      if (nonpScrolltop.top < 93 && top < docHeight - 1000) {
        this.isVisible = true
      } else {
        this.isVisible = false
      }
    },
    fb () {
      if (this.isVisible) {
        sharer.shareOnFacebook(this.urlParams, this.text, this.via, this.title)
      }
    },
    tweet () {
      if (this.isVisible) {
        sharer.shareOnTwitter(this.urlParams, this.text, this.via, this.title)
      }
    },
    linkedIn () {
      if (this.isVisible) {
        sharer.shareOnLinkedIn(this.urlParams, this.text, this.via, this.title)
      }
    },
    email () {
      if (this.isVisible) {
        sharer.shareByEmail(this.urlParams, this.text, this.via, this.title)
      }
    }
  },
  mounted () {
    window.addEventListener("scroll", this.handleScroll)
  },
  destroyed () {
    window.removeEventListener("scroll", this.handleScroll)
  }
}
</script>
