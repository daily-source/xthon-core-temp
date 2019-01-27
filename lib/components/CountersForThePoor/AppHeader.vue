<template>
  <header class='site-header masthead'>
    <div class="container">
      <div class="header__contents has-text-centered">
        <router-link to="/">
          <img src="@/assets/img/counters-for-the-poor-gold.png" class='logo' alt="Counters for the Poor Logo">
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>

<style scoped lang='scss'>
  .site-header {
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
		z-index: 10;

    .logo {
      max-width: 300px;
    }
  }
</style>
