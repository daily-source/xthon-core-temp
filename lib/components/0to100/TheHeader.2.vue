<template>
  <header class='site-header masthead'>
    <nav class='navbar' role='navigation' aria-label='Main Navigation'>
      <div class='container'>
        <div class='navbar-brand'>
          <router-link to='/' class='navbar-item'>
            <img src='@/assets/img/0to100-logo.png' alt='0 to 100 Logo' class='navbar__logo'>
          </router-link>
          <button 
            class='navbar-burger'
            @click='toggleNavbar'
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14">
              <path id="Menu" d="M-6160,14V12h10v2Zm0-6V6h16V8Zm0-6V0h16V2Z" transform="translate(-6144 14) rotate(180)" fill="#004a85"/>
            </svg>
          </button>
        </div>
        <div 
          :class='["navbar-menu", {"is-active": navbarActive}]'  
        >
          <div class='navbar-start'>
            <router-link to='/' class='navbar-item'>
              Home
            </router-link>
            <router-link to='/about' class='navbar-item'>
              About Us
            </router-link>
            <router-link to='/volunteer' class='navbar-item'>
              Volunteer
            </router-link>
            <router-link to='/nonprofits' class='navbar-item'>
              Nonprofits
            </router-link>
            <router-link to='/donate' class='navbar-item'>
              Donate
            </router-link>
            <router-link to='/contact' class='navbar-item'>
              Contact Us
            </router-link>
          </div>
          <div class='navbar-end'>
            <div class='social-nav'>
              <a href="#" class="navbar-item">
                <icon
                  :iconwidth='16'
                  :iconheight='16'
                  color='#233e84'
                  icon='facebook'
                />
                <span class="is-sr-only">Facebook</span>
              </a>
              <a href="#" class="navbar-item">
                <icon
                  :iconwidth='16'
                  :iconheight='16'
                  color='#233e84'
                  icon='twitter'
                />
                <span class="is-sr-only">Twitter</span>
              </a>
              <a href="#" class="navbar-item">
                <icon
                  :iconwidth='16'
                  :iconheight='16'
                  color='#233e84'
                  icon='instagram'
                />
                <span class="is-sr-only">Instagram</span>
              </a>
            </div>
            <router-link to='/register' class='navbar-item navbar-item--small'>
              Register
            </router-link>
            <router-link to='/login' class='navbar-item navbar-item--small'>
              Login
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import Icon from 'Components/general/Icons'

export default {
  name: 'TheHeader',

  components: {
    Icon,
  },

  data () {
    return {
      navbarActive: false,
    }
  },

  methods: {
    /**
     * Toggles the navbar menu active state.
     */
    toggleNavbar () {
      this.navbarActive = !this.navbarActive
    }
  }
}

</script>

<style lang="scss" scoped>
.navbar {
  height: auto;
	border-bottom: 2px solid $primary;

  &__logo {
    max-height: none;
    max-width: 100px;

    @include tablet {
      max-width: 120px;
    }

    @include widescreen {
      max-width: 170px;
    }
  }

  &-burger {
    background-color: transparent;
    border: 0;
    width: auto;
  }

  &-menu {
    box-shadow: none;
    @include tablet {
      margin-left: 2em
    }
  }

  &-item {
    font-size: .875em;
    font-weight: bold;
    text-transform: uppercase;
    color: $primary;

    @include tablet {
      font-size: .75em;
    }

    @include widescreen {
      font-size: .875em;
    }

    &.router-link-exact-active,
    &:hover {
      color: $secondary;
    }

    &--small {
      text-transform: none;
      font-weight: normal;
    }
  }

  .social-nav {
    display: flex;
  }
}
</style>
