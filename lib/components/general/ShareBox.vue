<template>
  <div class="share-box__wrapper">
    <div class="icon-wrapper" @click="fb()">
      <Icons
        iconwidth="32px"
        iconheight="32px"
        icon="facebook"
        class="share-facebook" />
    </div>
    <div class="icon-wrapper" @click="tweet()">
      <Icons
        iconwidth="32px"
        iconheight="32px"
        icon="twitter"
        class="share-twitter" />
    </div>
    <div class="icon-wrapper" @click="linkedIn()">
      <Icons
        iconwidth="32px"
        iconheight="32px"
        icon="linkedin"
        class="share-linkedin" />
    </div>
    <div class="icon-wrapper" @click="shareEmail()">
      <Icons
        iconwidth="32px"
        iconheight="32px"
        icon="email"
        class="share-email" />
    </div>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"
import * as sharer from "../../util/sharer.js"

export default {
  components: {
    Icons
  },
  props: [ "urlParams", "text", "via", "title" ],
  methods:  {
    fb () {
      sharer.shareOnFacebook(this.urlParams, this.text, this.via, this.title)
    },
    tweet () {
      sharer.shareOnTwitter(this.urlParams, this.text, this.via, this.title)
    },
    linkedIn () {
      sharer.shareOnLinkedIn(this.urlParams, this.text, this.via, this.title)
    },
    shareEmail () {
      this.$emit('email:open')
    },
  }
}
</script>

<style scoped lang="scss">
.share-box {
  &__wrapper {
    background: $white;
    padding: 10px 15px 5px;
    transform: translateY(-45px);
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
    border-radius: 50px;
    border: 1px solid #999;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}

.icon-wrapper {
  margin-right: 15px;

  &:last-child {
    margin-right: 0;
  }
}
.out-of-the-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
