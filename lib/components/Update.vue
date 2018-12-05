<template>
  <li v-if="update" class="update">
    <div class="by">
      <router-link :to="'/user/' + update.User.nickname">{{ update.name }}</router-link>
      {{ update.createdAt | timeAgo }}
    </div>
    <div class="text" v-html="update.content"></div>
  </li>
</template>

<script>
export default {
  name: "update",
  props: ["id", "update"],
  data () {
    return {
      open: true
    }
  }
}
</script>

<style lang="stylus">

</style>
