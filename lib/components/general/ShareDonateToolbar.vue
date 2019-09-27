<template>
  <div class="share-toolbar__share-wrapper">
    <ShareByEmail
      :state="shareByEmailIsOpen"
      v-on:dismiss="shareByEmailIsOpen = false"
    ></ShareByEmail>
    <transition name="slide-fade">
      <ShareBox
        v-if="shareBoxIsOpen"
        class="share-box__wrapper"
        v-on:email:open="shareByEmailIsOpen = true"
        v-on:close="toggleShareBox(false)"
        :url-params="urlParams"
        :text="text"
        :via="via"
        :title="title" />
    </transition>
    <div class="share-toolbar__share-item share-toolbar__share-share"
        @click="toggleShareBox()">
      <Icons iconwidth="19px" iconheight="19px" icon="share" color="#666" class="icon" />
      <a>Share</a>
    </div>
    <div class="share-toolbar__share-item share-toolbar__share-comment"
        v-if="allowComment !== false && userCan('comment')"
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
import * as userUtils from "Core/util/userUtils.js"

export default {
  props: [ "allowComment", "allowReporting", "commentId", "urlParams", "text", "via", "title", "trigger", "fundraiserId", "updateId" ],
  components: {
    DonateAction,
    Icons,
    ShareBox,
    ShareByEmail: () => import("Components/general/ShareByEmail.vue")
  },
  data () {
    return {
      shareBoxIsOpen: false,
      shareByEmailIsOpen: false
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
    userCan(per) {
      return userUtils.userCan(per, this.$store.state.user)
    },
    openShareBox () {
      this.toggleShareBox(true)
    },
    toggleShareBox () {
      this.shareBoxIsOpen = !this.shareBoxIsOpen
    },
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
  },
  destroyed () {
    document.body.removeEventListener("click", this.listenToBodyClick)
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
