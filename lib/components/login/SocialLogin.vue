<template>
  <div>
    <slot name="header"></slot>
    <div class="trigger social-signup">
      <a class="button is-medium social-button__facebook" @click="openLoginBox()"
        v-if="showOnly === 'facebook' || !showOnly">
        <span class="icon is-medium">
          <Icons icon="facebook" iconwidth="28px" iconheight="28px" color="#fff"></Icons>
        </span>
        <span>Facebook</span>
      </a>
      <a class="button is-medium social-button__gmail" @click="openLoginBox()"
        v-if="showOnly === 'gmail' || !showOnly">
        <span class="icon is-medium">
          <Icons icon="gmail" iconwidth="28px" iconheight="28px" color="#fff"></Icons>
        </span>
        <span>Gmail</span>
      </a>
      <a class="button is-medium social-button__twitter" @click="openLoginBox()"
        v-if="showOnly === 'twitter' || !showOnly">
        <span class="icon is-medium">
          <Icons icon="twitter" iconwidth="28px" iconheight="28px" color="#fff"></Icons>
        </span>
        <span>Twitter</span>
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.social-signup {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
  max-width: 600px;
  flex-wrap: wrap;

  .button.is-medium {
    margin: 5px 10px;
    line-height: 1;
    color: $white;
    transition: background-color 0.2s ease-in-out;

    &.social-button__facebook {
      background: $color-share-facebook;
    }
    &.social-button__twitter {
      background: $color-share-twitter;
    }
    &.social-button__gmail {
      background: $color-share-gmail;
    }
  }
}

</style>

<script>
import Icons from "Components/general/Icons.vue"

export default {
  props: [ "showOnly" ],
  components: {
    Icons
  },
  methods: {
    openLoginBox () {
      console.log("open social login")
    }
  }
}
</script>
