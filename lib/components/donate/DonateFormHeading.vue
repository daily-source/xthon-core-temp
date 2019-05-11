<template>
  <div>
    <transition name="slide-fade">
      <div class="columns is-centered">
        <p class="login-highlight" v-if="loggedIn"><strong>{{userName}}</strong>, you're logged in, so we'll use your email and name on file.</p>
      </div>
    </transition>
    <h2 class="page-title" v-if="parent === 'nonprofit'">
      <span class="page-title__first">Donate to</span> <span class="page-title__second">{{nonprofit.NAME}}</span>
    </h2>
    <h2 class="page-title" v-if="parent === 'fundraiser' && fundraiser.User">
      <span class="page-title__first">Support {{fundraiser.User.firstName}}'s Volunteerathon</span> <span class="page-title__
      ">{{fundraiser.name}}</span>
    </h2>
  </div>
</template>

<script>
export default {
  props: ["parent", "nonprofit", "fundraiser"],
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    userName () {
      return this.$store.state.user.data.nickname || this.$store.state.user.data.firstName
    }
  }
}
</script>

<style scoped lang="scss">
.login-highlight {
  padding: 7px 10px;
  margin-bottom: 0;
  animation: fadeHighlight 7s ease-in-out;  
}

</style>