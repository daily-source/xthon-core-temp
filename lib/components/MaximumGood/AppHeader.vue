<template>
  <header class="masthead">
    <div class="header__top">
      <div class="container">
        <div class="header__row">
          <div class="header__level-column">
            <div class="search__input">
              <input-group 
                placeholder='Search the Internet'
              />
            </div>
            <button class="button is-primary">
              Share
            </button>
          </div>
          <div class="header__level-item header__logo-container">
            <img :src='logo' alt="Maximum Good" :class="['logo', {'logo--big': logoImg }]">
          </div>
          <div class="header__level-column has-text-right-desktop">
            <router-link to='login'> Login </router-link> &nbsp; | &nbsp;
            <router-link to='register'> Register </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="header__nav-container">
      <nav class="header-nav ">
        <ul class="main-nav nav is-flex">
          <li class="nav-item"><router-link to='/'>About Us</router-link></li>
          <li class="nav-item"><router-link to='/'>Raise Awareness</router-link></li>
          <li class="nav-item"><router-link to='/'>Raise Money</router-link></li>
          <li class="nav-item"><router-link to='/'>Websites</router-link></li>
          <li class="nav-item"><router-link to='/'>Nonprofit Partners</router-link></li>
          <li class="nav-item"><router-link to='/'>News</router-link></li>
          <li class="nav-item"><router-link to='/'>Discussions</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import InputGroup from "Components/input/InputGroup"

export default {
  name: 'AppHeader',

  props: ['logoImg'],

  components: {
    InputGroup,
  },

  computed: {
    logo() {
      if (this.logoImg) {
        return require(`@/assets/${this.logoImg}`)
      }

      return require(`@/assets/maximum-for-good-logo.png`)
    }
  }
}
</script>

<style lang="scss">
.header__top {
  padding-top: 1em;
  padding-bottom: 1em;
  position: relative;
}

.header__row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .header__level-column {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 33%;
    max-width: 240px;
  }

  .search__input {
    margin-bottom: 0.5em;
  }

  .header__logo-container {
    .logo {
      max-width: 200px;
    }

    .logo--big {
      max-width: 400px;
      margin-top: .75em;
    }
  }
}

.nav-item {
  a {
    color: #fff !important;
  }
}
</style>

