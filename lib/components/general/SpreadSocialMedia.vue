<template>
  <div>
    <p class="centered">Share with your friends:</p>
    <div class="share-box__wrapper">
      <div class="icon-wrapper" @click="fb()">
        <Icons
          iconwidth="64px"
          iconheight="64px"
          icon="facebook"
          class="share-facebook" />
      </div>
      <div class="icon-wrapper" @click="tweet()">
        <Icons
          iconwidth="64px"
          iconheight="64px"
          icon="twitter"
          class="share-twitter" />
      </div>
      <div class="icon-wrapper" @click="linkedIn()">
        <Icons
          iconwidth="64px"
          iconheight="64px"
          icon="linkedin"
          class="share-linkedin" />
      </div>
      <div class="icon-wrapper" @click="email()">
        <Icons
          iconwidth="64px"
          iconheight="64px"
          icon="email"
          class="share-email" />
      </div>
    </div>
    <p class="centered">Or visit our profiles to follow us and stay in touch:</p>
    <div class="share-box__wrapper">
      <div class="icon-wrapper" @click="goToFacebok()">
        <Icons
          iconwidth="64px"
          iconheight="64px"
          icon="facebook"
          class="share-facebook" />
      </div>
      <div class="icon-wrapper" @click="goToInstagram()">
        <Icons
          iconwidth="64px"
          iconheight="64px"
          icon="instagram"
          class="share-instagram" />
      </div>
      <div class="icon-wrapper" @click="goToTwitter()">
        <Icons
          iconwidth="64px"
          iconheight="64px"
          icon="twitter"
          class="share-twitter" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h4 {
  text-align: center;
  color: $color-text;
  font-weight: bold;
  font-size: 22px;
}
.share-box {
  &__wrapper {
    background: $white;
    padding: 10px 15px 5px;
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
.centered {
  text-align: center;
  margin-top: 40px;
}
</style>

<script>
import Icons from "Components/general/Icons.vue"
import * as sharer from "../../util/sharer.js"

export default {
  components: {
    Icons
  },
  props: [ "urlParams", "text", "via", "title" ],
  methods: {
    fb () {
      sharer.shareOnFacebook(this.urlParams, this.text, this.via, this.title)
    },
    tweet () {
      sharer.shareOnTwitter(this.urlParams, this.text, this.via, this.title)
    },
    linkedIn () {
      sharer.shareOnLinkedIn(this.urlParams, this.text, this.via, this.title)
    },
    email () {
      sharer.shareByEmail(this.urlParams, this.text, this.via, this.title)
    },
    goToFacebok () {
      window.location = "https://facebook.com/volunteerathon"
    },
    goToTwitter () {
      window.location = "https://twitter.com/volunteerathon"
    },
    goToInstagram () {
      window.location = "https://instagram.com/volunteerathon"
    }
  }
}
</script>
