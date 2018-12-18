<style lang="scss">
  .logo-link {
    img {
      max-width: 200px;
    }
  }
  .navbar {
    background-color: transparent !important;
    @include mobile {
      display: none;
    }
  }
  .navbar-nav {
    .nav-item{
      .nav-link {
        color: #fff;
        padding: 1rem !important;
      }
      &:last-child {
        .nav-link {
          padding: 1rem 1.5rem !important;
          font-weight: 700;
          letter-spacing: .4px;
          text-transform: uppercase;
        }
      }
    }
  }
  .container {
    margin: 0 auto;
  }
</style>

<template>
  <header class="site-header" id="site-header">
    <div class="container">
      <div class="header-top d-flex justify-content-between align-items-center py-1">
        <router-link to="/" class="logo-link">
          <img src="@/assets/img/logo-giveitup-1286x321.png" alt="CalendarForGood">
        </router-link>
        <div class="header-top__nav-section">
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <router-link to="/register" class="nav-link px-1">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link px-1 pr-0">Login</router-link>
            </li>
          </ul>
          <ul class="nav social-nav justify-content-end">
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
export default {
  name: 'AppHeader',
};
</script>
