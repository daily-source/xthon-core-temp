<template>
  <div class="share-toolbar__share-wrapper">
    <transition name="slide-fade">
      <ShareBox
        v-if="openShareBox"
        class="share-box__wrapper"
        :url-params="urlParams"
        :text="text"
        :via="via"
        :title="title" />
    </transition>
    <div class="share-toolbar__share-item share-toolbar__share-share"
        @click="share()">
      <Icons iconwidth="19px" iconheight="19px" icon="share" color="#666" class="icon" />
      <a>Share</a>
    </div>
    <div class="share-toolbar__share-item share-toolbar__share-comment"
        v-if="allowComment !== false"
        @click="replyTo(commentId)">
      <Icons iconwidth="21px" iconheight="21px" icon="bubble" color="#666" class="icon" />
      <a>Comment</a>
    </div>
    <div class="share-toolbar__share-item share-toolbar__share-donate">
      <Icons iconwidth="22px" iconheight="22px" icon="money" color="#666" class="icon" />
      <a>
        <DonateAction
          :fundraiser-id="fundraiserId"
          :commentId="commentId"
          :trigger="trigger"
          :updateId="updateId">
          Donate
        </DonateAction>
      </a>
    </div>
    <div class="share-toolbar__share-item share-toolbar__share-comment"
        v-if="allowReporting"
        @click="reportComment(commentId)">
      <Icons iconwidth="21px" iconheight="21px" icon="close-circle" color="#666" class="icon" />
      <a>Report</a>
    </div>
  </div>
</template>

<script>
import DonateAction from "Components/general/DonateAction.vue"
import Icons from "Components/general/Icons.vue"
import ShareBox from "Components/general/ShareBox.vue"

export default {
  props: [ "allowComment", "allowReporting", "commentId", "urlParams", "text", "via", "title", "trigger", "fundraiserId", "updateId" ],
  components: {
    DonateAction,
    Icons,
    ShareBox
  },
  data () {
    return {
      openShareBox: false
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.user.loggedIn
    }
  },
  watch: {
    openShareBox (value) {
      if (value) {
        document.body.addEventListener("click", this.listenToBodyClick)
      } else {
        document.body.removeEventListener("click", this.listenToBodyClick)
      }
    }
  },
  methods: {
    listenToBodyClick (event) {
      if (!event.target.closest(".share-toolbar__share-wrapper")) {
        this.openShareBox = false
      }
    },
    replyTo (commentId) {
      this.$emit("reply:to", { commentId: commentId })
    },
    reportComment (commentId) {
      this.$emit("report:comment", { commentId: commentId })
    },
    share (commentId) {
      this.openShareBox = !this.openShareBox
    }
  }
}
</script>

<style scoped lang="scss">
.share-toolbar {
  &__share-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin: 10px 0;
    position: relative;
    user-select: none;
    flex-wrap: wrap;
  }
  &__share-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 20px;
  }
  &__share-share,
  &__share-comment {
    .icon {
      margin-right: 4px;
    }
  }
}

.share-box__wrapper {
  position: absolute;
}
</style>
