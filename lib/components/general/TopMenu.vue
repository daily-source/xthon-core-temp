<template>
  <div class="nav-container">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-menu" v-bind:class="{'is-active': showMobileMenu}">
        <div class="container is-fluid">
          <router-link to="/">Home</router-link>
          <router-link to="/">Volunteering</router-link>
          <router-link to="/">Nonprofits</router-link>
          <router-link to="/">Tips</router-link>
          <router-link to="/">News</router-link>
          <router-link to="/">Discussions</router-link>
          <router-link to="/">About Us</router-link>
        </div>
      </div>
      <button class="button navbar-burger" @click="toggleMenu()" v-bind:class="{'is-active': showMobileMenu}">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  </div>
</template>

<style scoped lang="scss">

.nav-container {
  position: absolute;
  top: 0;
  left: 0;

  @include tablet {
    position: static;
  }
}

.button {
  border: none;
}
.navbar-burger {
  z-index: 200;
  @include tablet {
    display: none !important;
  }
}

.navbar {
  @include tablet {
    background: $color-emphasis-alt;
    padding-bottom: 3px;
    min-height: 35px;
    justify-content: center;
    align-items: center;
    display: flex !important;
    z-index: 0;
  }
}
.navbar-container {
  height: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: 0;
}

.navbar-start {
  height: 20px;
  min-height: 0;

  a {
    text-transform: uppercase;
    margin-right: 20px;
    color: white;

    &:hover {
      text-decoration: underline;
    }
  } 
}

.navbar-menu {
  position: absolute;
  width: 100%;

  @include tablet {
    display: flex;
    background: transparent !important;
    box-shadow: none !important;

    .container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    a {
      color: $white;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  &.is-active {
    width: 100vw;
    background: $white;
    padding-top: 40px;
    padding-bottom: 40px;
    text-align: center;
    z-index: 100;

    .container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    a {
      display: block;
      font-size: 20px;
      line-height: 1.3;
      margin: 10px 0;
    }
  }
}
.container {
  padding: 0 10px;
}
</style>

<script>
export default {
  data () {
    return {
      showMobileMenu: false
    }
  },
  methods: {
    toggleMenu () {
      this.showMobileMenu = !this.showMobileMenu
    }
  }
}
</script>