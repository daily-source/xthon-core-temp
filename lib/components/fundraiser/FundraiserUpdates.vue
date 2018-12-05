<template>
  <div class="updates__wrapper">
    <div :class="{'current': update.id === currentId}" 
        :id="`update_${update.id}`"
        class="update__wrapper"
        v-for="(update, index) in updates">
      <div class="update__fullname"><span class="update__fullname-name">Update # {{count - index}}</span></div>
      <div class="update__timestamp">{{update.createdAt | formattedDate}}</div>
      <div class="update__content" v-if="update.content.length > maxchar">
        <transition name="fade">
          <div v-if="!showFullUpdate[index]">
            <span v-html="excerpt(update.content)"></span>
            <span>... <a @click="toggleIndex(index)">Show more</a></span>
          </div>
          <div class="update__content" v-else>
            <div v-html="update.content"></div>
            <span><a @click="toggleIndex(index)">Show less</a></span>
          </div>
        </transition>
      </div>
      <div class="update__content" v-else v-html="update.content"></div>
      <ShareDonateToolbar
        :allowComment="false"
        :url-params="`update_id=${update.id}`"
        :text="update.content"
        :fundraiser-id="fundraiserId"
        :update-id="update.id"
        trigger="fundraiser/lower/updates"
        via="Volunteerathon"
        title="Share this update" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.updates__wrapper {
  font-size: 20px;
}

.update {
  &__wrapper {
    margin-bottom: 20px;

    &.current {
      padding: 10px;
      margin-left: -10px;
      animation: fadeBackground 3s ease-in-out;
      animation-delay: 1s;
    }
  }
  &__title {
    font-weight: bold;
    font-size: 18px;
  }
  &__timestamp {
    font-style: italic;
    color: $color-medium-gray;
    margin-bottom: 6px;
    font-size: 16px;
  }
  &__fullname {
    font-style: normal;
    color: $color-text;
    font-size: 22px;
  }
  &__content {
    font-size: 20px;
    line-height: 1.4;
    font-family: $font-primary;
  }
}

</style>
<style lang="scss">
  html {
    .update__content {
      h1,
      h2 {
        font-size: 20px;
        font-weight: bold;
        color: $color-emphasis-alt;
      }
      h3,
      h4,
      h5,
      h6 {
        font-size: 17px;
        font-weight: normal;
        color: $color-emphasis-alt;
      }
      ul {
        li {
          list-style-type: disc;
          list-style-position: inside;
          margin-left: 20px;
        }
      }
      ol {
        li {
          list-style-position: inside;
        }
      }
    }
  }
  
</style>


<script>
import Vue from "vue"
import ShareDonateToolbar from "Components/general/ShareDonateToolbar.vue"

export default {
  data () {
    return {
      showFullUpdate: {}
    }
  },
  components: {
    ShareDonateToolbar
  },
  computed: {
    currentId () {
      return parseInt(this.$route.query.update_id, 10)
    }
  },
  props: [ "updates", "maxchar", "count", "fundraiserId" ],
  methods: {
    excerpt (content) {
      var stripHtml = content.replace(/<\/?[^>]+(>|$)/g, "")
      return stripHtml.substring(0, this.maxchar)
    },
    toggleIndex (index) {
      if (!this.showFullUpdate[index]) {
        Vue.set(this.showFullUpdate, index, true)
      } else {
        Vue.set(this.showFullUpdate, index, false)
      }
    },
    openShareBox (update) {
      alert(`${window.location.origin}${window.location.pathname}?update_id=${update.id}`)
    }
  }
}
</script>
