<template>
  <div class="user-management-links__wrapper">
    <div v-if="layout === 'header'">
      <router-link
        class="button is-warning"
        to="/account/settings"
        @click.native="$emit('goto:account')">Manage your Account</router-link>
    </div>
    <ul class="user-management-links__list-wrapper" v-else>
      <li><router-link to="/account/settings">Settings »</router-link></li>
      <li><router-link to="/account/donations">Donation history »</router-link></li>
      <li><router-link to="/account/fundraisers">My Fundraisers »</router-link></li>
      <li><router-link to="/account/nonprofits">My Nonprofits »</router-link></li>
    </ul>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"

export default {
  props: ["layout"],
  components: {
    Icons
  }
}
</script>

<style scoped lang="scss">
.user-management-links {
  &__wrapper {
    .button {
      margin: 10px 0 20px;
    }
  }
  &__list-wrapper {
    margin-left: 0;
    @include breakpoint($tablet) {
      margin-left: 30px;
    }
    li {
      font-size: 20px;
    }
    a.router-link-active {
      color: $color-medium-gray;
    }
  }
}

</style>