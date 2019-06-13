<template>
  <section v-if="fundraisers.length">
    <div class="container">
      <slot name="heading"></slot>
      <div class="volunteerathon__fundraiser-wrapper columns is-multiline">
        <div class="volunteerathon__fundraiser-item column is-one-fifth" v-for="(fundraiser, index) in fundraisers">
          <div class="volunteerathon__fundraiser-content" v-show="!(limit && index >= limit)">
            <router-link :to="`/fundraiser/${fundraiser.id}`">
              <LazyLoadedImage class="volunteerathon__fundraiser-image"
                :src="fundraiser.media.images[0]"
                :is-background="true"
                v-if="fundraiser.media.images.length">
              </LazyLoadedImage>
              <div class="volunteerathon__fundraiser-image default-fundraiser-wrapper"
                v-else
              >
                <div class="fundraiser-name">
                  {{fundraiser.name}}
                </div>
              </div>
              <h4 v-html="fundraiser.name"></h4>
            </router-link>
            <p>
              By <span>{{fundraiser.User.firstName}} {{fundraiser.User.lastName}}</span><br>
            </p>
            <ProgressBar :details="fundraiser.fundraiserDetails" size="small"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProgressBar from "Components/general/ProgressBar.vue"
import LazyLoadedImage from "Components/plugins/LazyLoadedImage.js"

export default {
  props: ["fundraisers", "limit"],
  components: {
    LazyLoadedImage,
    ProgressBar
  }
}
</script>

<style scoped lang="scss">
.volunteerathon {
  &__fundraiser-wrapper {
    margin-top: 20px;
  }
  &__fundraiser-image {
    width: 100%;
    height: 0;
    margin-bottom: 10px;
    padding-bottom: 75%;
    background-size: cover;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.02);
    }
  }
  &__fundraiser-content {
    h4 {
      font-size: 18px;
      transition: color 0.2s ease-in-out;

      @include desktop {
        line-height: 18px;
        min-height: 38px;
        max-height: 38px;
        margin-bottom: 0;
        font-size: 18px;
        overflow: hidden;
      }
      &:hover {
        color: $color-emphasis-alt;
      }
    }
    p {
      font-size: 15px;
      line-height: 20px;
      max-height: 20px;
      overflow: hidden;
    }
    .progress-bar {
      margin-bottom: 10px;
    }
  }
}

.default-fundraiser-wrapper {
  background-color: white;
  border: 15px solid $color-light-gray;
  padding-bottom: calc(75% - 2 * 15px);
  position: relative;

  .fundraiser-name {
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    line-height: 1.1;
    text-align: center;
    text-transform: uppercase;
    overflow: hidden;
  }
}
</style>
