<template>
  <section v-if="fundraisers.length">
    <div class="container">
      <slot name="heading"></slot>
      <div class="volunteerathon__fundraiser-wrapper columns is-multiline">
        <div class="volunteerathon__fundraiser-item column is-one-fifth" v-for="(fundraiser, index) in fundraisers">
          <div class="volunteerathon__fundraiser-content" v-show="!(limit && index >= limit)">
            <router-link :to="`/fundraiser/${fundraiser.id}`">
              <LazyLoadedImage class="volunteerathon__fundraiser-image"
                :src="fundraiser.data.media[0].src"
                :is-background="true"
                v-if="fundraiser.data.media.length">
              </LazyLoadedImage>
              <h4 v-html="fundraiser.name"></h4>
            </router-link>
            <p>
              By <span v-html="fundraiser.participant.fullname"></span><br>
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

      @include breakpoint($desktop) {
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

</style>
