<template>
  <header class="site-header" id="site-header">
    <div class="container">
      <div class="header-top">
        <router-link to="/" class="logo-link">
          <img src="@/assets/img/logo-rideforgood-400x139.png" alt="CalendarForGood">
        </router-link>
        <div class="header-top__nav-section">
          <ul class="nav is-flex">
            <li class="nav-item">
              <router-link to="/register" class="nav-link px-1">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link px-1 pr-0">Login</router-link>
            </li>
          </ul>
          <ul class="nav social-nav is-flex">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <Icons iconwidth="16px" iconheight="16px" icon="facebook" color="#FFFFFF" class=""/>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <Icons iconwidth="16px" iconheight="16px" icon="twitter" color="#FFFFFF" class=""/>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <Icons iconwidth="16px" iconheight="16px" icon="instagram" color="#FFFFFF" class=""/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header-nav bg-primary">
      <nav class="navbar navbar-expand-lg py-0">
        <div class="container">
          <div class="collapse navbar-collapse" id="navbar-content">
            <ul class="navbar-nav w-100">
              <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">About Us</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">Volunteer</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">Nonprofits</router-link></li>
              <li class="nav-item"><router-link to="/" class="nav-link">Contact Us</router-link></li>
              <li class="nav-item ml-auto"><router-link to="/" class="nav-link bg-secondary">Donate</router-link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import Icons from "Components/general/Icons.vue"

export default {
  name: "AppHeader",

  components: {
    Icons
  }
}
</script>

<style lang="scss">
  #site-header {
    background-color: white;
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: .25em;
    padding-bottom: 0.25em;

    .nav {
      justify-content: flex-end;
      margin-left: -0.25em;

      .nav-item {
        padding-left: .25em;
        padding-right: .25em;
      }
    }
  }

  .logo-link {
    img {
      max-width: 200px;
    }
  }

  .navbar {
    min-height: auto;
    background-color: $primary !important;

    > .container {
      min-height: auto;
    }

    #navbar-content {
      flex-grow: 1;
    }

    .navbar-nav {
      display: flex;

      .nav-link {
        display: inline-block;
        color: #fff;
        padding: 1rem !important;
      }

      .nav-item:last-child {
        margin-left: auto;
        background-color: $secondary;

        .nav-link {
          padding: 1rem 1.5rem !important;
          font-weight: 700;
          letter-spacing: .4px;
          text-transform: uppercase;
        }
      }
      
    }
  }

  .header-nav {
    @include mobile {
      display: none;
    }
  }

  .social-nav {
    .icon-wrapper {
      background: $color-emphasis-alt;
      border-radius: 30px;
      height: 24px;
      width: 24px;
      display: flex;
      text-align: center;
      align-items: center;
      align-content: center;
      svg {
        flex: 1 !important;
      }
    }
  }

</style>