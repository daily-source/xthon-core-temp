<template>
  <li v-if="comment" class="comment">
    <div class="by">
      <router-link :to="'/user/' + comment.name">{{ comment.name }}</router-link>
      {{ comment.timestamp | timeAgo }}
    </div>
    <div class="text" v-html="comment.fullname"></div>
    <div class="text" v-html="comment.comment"></div>
    <img :src="comment.avatar">
  </li>
</template>

<script>
export default {
  name: "comment",
  props: ["id", "comment"],
  data () {
    return {
      open: true
    }
  }
}
</script>

<style lang="stylus">

</style>
