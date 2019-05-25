<template>
  <header class='header'>
    <nav class='navbar' role='navigation' aria-label='main navigation'>
      <div class="container navbar__container">
        <div class="navbar-brand">
          <router-link to='/' class='navbar-item'>
            <img src='@/assets/img/logo.png' class='logo' alt='Rule Your World'>
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang='scss' scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 99;
}

.navbar {
  background-color: transparent;

  .logo {
    max-height: none;
    max-width: 230px;
  }

  &__container {
    justify-content: center;
  }
}
</style>
