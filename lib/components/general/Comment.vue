<template>
  <div class="comment-item__comment-wrapper"
      :class="{'is-reply': isReply, 'current': comment.id === currentId || comment.id === latestCommentId}"
      :id="`comment_${comment.id}`">
    <div class="comment-item__avatar">
      <avatar 
        :username="nickname" 
        :rounded="false" :src="avatar"></avatar>
    </div>
    <div class="comment-item__content">
      <div class="comment-item__comment-header">
        {{nickname}} commented {{comment.createdAt | timeAgo}}.
      </div>
      <div class="comment-item__comment-content" v-html="comment.comment"></div>
    </div>
    <ShareDonateToolbar
      :fundraiser-id="fundraiserId"
      :comment-id="comment.id"
      :text="comment.comment"
      :url-params="`comment_id=${comment.id}`"
      :allow-comment="!isReply"
      title="Share this comment"
      trigger="fundraiser/lower/comments"
      v-on:replyTo="openReplyBox($event)"
      v-on:share="openShareBox = true"
      v-on:donate="openDonateBox()"
      via="Volunteerathon" />
    <transition name="slide-fade">
      <CommentReply
        :in-reply-to="inReplyTo"
        class="comment-reply__wrapper"
        v-if="showReplyBox"
        v-on:comment:added="closeReplyBox()"
      ></CommentReply>
    </transition>
  </div>
</template>

<script>
import ShareDonateToolbar from "Components/general/ShareDonateToolbar.vue"
import CommentReply from "Components/general/CommentReply.vue"
import Avatar from "vue-avatar"
import Icons from "Components/general/Icons.vue"

export default {
  props: [ "comment", "is-reply", "fundraiserId" ],
  components: {
    Avatar,
    CommentReply,
    Icons,
    ShareDonateToolbar
  },
  data () {
    return {
      showReplyBox: false,
      inReplyTo: null,
      openShareBox: false
    }
  },
  computed: {
    currentId () {
      return parseInt(this.$route.query.comment_id, 10)
    },
    latestCommentId () {
      return this.$store.state.comments.latest
    },
    nickname () {
      if (this.comment.User) {
        if (this.comment.User.nickname) {
          return this.comment.User.nickname
        } else {
          return this.comment.User.firstName
        }
      } else {
        return this.comment.nickname
      }
    },
    avatar () {
      if (this.comment.User && this.comment.User.avatar) {
        return this.comment.User.avatar
      } else {
        return ""
      }
    }
  },
  methods: {
    openReplyBox (payload) {
      this.showReplyBox = true
      this.inReplyTo = payload.commentId
    },
    closeReplyBox () {
      this.showReplyBox = false
    },
    openShareBoxx () {
      alert(`${window.location.origin}${window.location.pathname}?comment_id=${this.comment.id}`)
    }
  }
}
</script>


<style scoped lang="scss">
.comment-item {
  &__comment-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 30px;

    &.is-reply {
      margin-left: 30px;
    }

    &.current,
    &.latest {
      padding: 10px;
      margin-left: -10px;
      animation: fadeBackground 3s ease-in-out;
      animation-delay: 3s;

      &.is-reply {
        margin-left: 20px;
      }
    }
  }
  &__comment-header {
    color: $color-silver;
    font-style: italic;
  }
  &__avatar {
    margin-right: 10px;
  }
  &__content {
    width: calc(90% - 60px);
  }
}

.share-toolbar {
  &__share-wrapper {
    @include tablet {
      margin-left: 80px !important;
    }
  }
}

.comment-reply__wrapper {
  margin-left: 60px;
}

</style>

<style lang="scss">
.vue-avatar--wrapper {
  background-size: cover !important;
  background-position: center center !important;
}
</style>
