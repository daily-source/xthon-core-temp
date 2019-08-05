<template>
  <header class="site-header" id="site-header">
     <button class='navbar__hamburger' @click='toggleMenu()'>
      <Icons 
        icon='hamburger'
        color='#343532' 
        iconwidth='1.25em'
        iconheight='1.25em'
      />
    </button>
    <div class="container">
      <div class="header-top py-1">
        <router-link to="/" class="logo-link">
          <img src="@/assets/img/logo-forlearning.png" alt="CalendarForGood">
        </router-link>
        <div class="header-top__nav-section">
          <ul class="header-top__nav">
            <li class="nav-item header-top__nav-item">
              <router-link to="/register" class="nav-link">Register</router-link>
            </li>
            <li class="nav-item header-top__nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
          </ul>
          <ul class="header-top__social-nav nav social__nav justify-content-end">
            <li class="header-top__social-nav-item nav-item">
              <a href="#" class="header-top__social-nav-link bg-facebook">
                <icons
                  iconwidth='1rem'
                  iconheight='1rem'
                  icon='facebook'
                  color='#fff'
                />
                <span class="sr-only">Facebook</span>
              </a>
            </li>
            <li class="header-top__social-nav-item">
              <a href="#" class="header-top__social-nav-link nav-link bg-twitter">
                <icons
                  iconwidth='1rem'
                  iconheight='1rem'
                  icon='twitter'
                  color='#fff'
                />
                <span class="sr-only">Twitter</span>
              </a>
            </li>
            <li class="header-top__social-nav-item nav-item">
              <a href="#" class="header-top__social-nav-link nav-link bg-instagram">
                <icons
                  iconwidth='1rem'
                  iconheight='1rem'
                  icon='instagram'
                  color='#fff'
                />
                <span class="sr-only">Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="['header-nav', {'expanded': menuExpanded}]">
      <button class='header-nav__close-btn' @click='toggleMenu()'>
        <i class="fas fa-times"></i>
      </button>
      <nav class="navbar py-0">
        <div class="container">
          <div class="navbar__content" id="navbar-content">
            <ul class="navbar__nav w-100">
              <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">About Us</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">Volunteer</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">Nonprofits</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">Contact Us</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">Donate</router-link></li>
            </ul>
          </div>
          <ul class="nav social__nav justify-content-end">
            <li class="nav-item">
              <a href="#" class="nav-link bg-facebook">
                <i class="fab fa-facebook-f"></i>
                <span class="sr-only">Facebook</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link bg-twitter">
                <i class="fab fa-twitter"></i>
                <span class="sr-only">Twitter</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link bg-instagram">
                <i class="fab fa-instagram"></i>
                <span class="sr-only">Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import Icons from '../general/Icons'

export default {

  data() {
    return {
      menuExpanded: false
    }
  },

  components: {
    Icons,
  },

  name: 'AppHeader',

  methods: {
    toggleMenu() {
      this.menuExpanded = !this.menuExpanded
    },
  }
};
</script>

<style lang="scss">
  .site-header {
    @include mobile {
      padding-top: .5em;
      padding-bottom: .5em;
      box-shadow: 0 2px 4px 2px rgba(0, 0, 0, .2)
    }
  }

  .navbar__hamburger {
    display: none;
    position: absolute;
    top: .625rem;
    left: 1rem;
    border: 0;
    background-color: transparent;
    padding: 0;
    font-size: 1.5em;
    color: $color-dark-gray;
    z-index: 10;

    @include mobile {
      display: inline-block;
    }

    &:focus {
      outline: 0;
    }
  }

  .logo-link {
    img {
      max-width: 300px;

      @include mobile {
        max-width: 200px;
      }
    }
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: .25rem;
    padding-bottom: .25rem;

    @include mobile {
      justify-content: center;
    }

    &__nav-section {
      @include mobile {
        display: none;
      }

      .nav-link {
        font-size: .875em;
      }
    }

    &__nav {
      display: flex;
      flex-wrap: wrap;
    }

    &__nav-item {
      padding-top: .5rem;
      padding-right: .25rem;
      padding-bottom: .5rem;
      padding-left: .25rem;
    }

    &__social-nav {
      justify-content: flex-end;
    }

    &__social-nav-item {
      padding-left: .25em;
      padding-right: .25em;
    }

    &__social-nav-link {
      width: 25px;
      height: 25px;
      background-color: $secondary;
      border-radius: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .header-nav { 
    background-color: $primary;
    @include mobile {
      position: fixed;
      left: -100%;
      top: 0;
      height: 100vh;
      width: 80%;
      max-width: 250px;
      z-index: 999;
      transition: all .2s ease;

      &.expanded {
        left: 0;
      }
    }

    .social__nav {
      display: none;

      @include mobile {
        display: flex;
      }
    }
  }

  .header-nav__close-btn {
    background-color: transparent;
    position: absolute;
    top: 1em;
    left: 100%;
    background-color: $color-light-gray;
    padding: .25rem .5rem;
    border: 1px solid $color-gray;
    font-size: 1.25em;
    display: none;

    @include mobile {
      display: inline-block;
    }
  }
 
  .navbar {
    background-color: transparent !important;
    display: flex !important;
    min-height: auto;

    @include mobile {
      padding: 0;
    }
  }

  .navbar__content {
    width: 100%;
  }

  .navbar__nav {
    display: flex;
    margin-bottom: 0;
    width: 100%;

    @include mobile {
      padding: .875em 0;
      flex-direction: column;
    }

    .nav-item{
      .nav-link {
        font-size: .875em;
        color: #fff;
        padding: 1rem !important;
        display: inline-block;

        &:hover {
          color: $secondary;
        }
        @include mobile {
          padding: .875em 0 !important;
        }
      }

      &:last-child {
        margin-left: auto;
        background-color: $secondary;

        @include mobile {
          margin-top: 0.875em;
          margin-bottom: 0.875em;
          margin-left: -15px;
          margin-right: -15px;
        }

        .nav-link {
          font-size: 1em;
          padding: 1rem 1.5rem !important;
          font-weight: 700;
          letter-spacing: .4px;
          color: #fff !important;
          text-transform: uppercase;
        }
      }
    }
  }

  .social__nav {
    display: flex;
  }
</style>
