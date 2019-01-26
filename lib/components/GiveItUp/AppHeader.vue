<template>
  <header class="site-header" id="site-header">
    <div class="container">
      <div class="header-top">
        <router-link to="/" class="logo-link">
          <img src="@/assets/img/logo-giveitup-1286x321.png" alt="CalendarForGood">
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
                <icon
                  :iconwidth='18'
                  :iconheight='18'
                  color='#233e84'
                  icon='facebook'
                />
                <span class="is-sr-only">Facebook</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <icon
                  :iconwidth='18'
                  :iconheight='18'
                  color='#233e84'
                  icon='twitter'
                />
                <span class="is-sr-only">Twitter</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <icon
                  :iconwidth='18'
                  :iconheight='18'
                  color='#233e84'
                  icon='instagram'
                />
                <span class="is-sr-only">Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header-nav">
			<nav class="navbar" role='navigation' aria-label='main-navigation'>
				<div class='container header-nav__container'>
					<div class='navbar-brand is-flex-mobile'>
						<router-link to="/" class="logo-link">
							<img src="@/assets/img/logo-giveitup-1286x321.png" alt="CalendarForGood">
						</router-link>
						<a 
							class='navbar-burger burger' 
							href='#' 
							role='button' 
							aria-label='menu' 
							aria-expanded='false'
							@click='toggleShowNavMobile'
						>
							<span class='navbar-burger__line' aria-hidden="true"></span>
							<span class='navbar-burger__line' aria-hidden="true"></span>
							<span class='navbar-burger__line' aria-hidden="true"></span>
						</a>
					</div>
					<div 
						:class='["navbar-menu", {"is-active": showNavMobile}]'
					>
						<navbar-item to='/'>Home</navbar-item>
						<navbar-item to='/about'>About Us</navbar-item>
						<navbar-item to='/volunteer'>Volunteer</navbar-item>
						<navbar-item to='/nonprofits'>Nonprofits</navbar-item>
						<navbar-item to='/contact'>Conact Us</navbar-item>
						<navbar-item to='/donate' item-class='navbar-item--push-left navbar-item--last has-text-weight-bold is-uppercase'>Donate</navbar-item>
						<button 
							class='navbar-menu__close-button is-text button'
							@click='toggleShowNavMobile'
						>
							<icon 
								icon='times'
								:iconwidth='14'
								:iconheight='14'
								color='#fff'
							/>
						</button>
					</div>
				</div>
			</nav>
    </div>
  </header>
</template>

<script>
import Icon from 'Components/general/Icons'
import NavbarItem from 'Components/general/Navbar/NavbarItem'

export default {
  name: 'AppHeader',

  components: {
    Icon,
		NavbarItem,
  },

	data () {
		return {
			showNavMobile: false,
			navBreakpoint: 769,
		}
	},

	methods: {
		/**
		 * Toggles showNavMobile
		 */
		toggleShowNavMobile() {
			this.showNavMobile = !this.showNavMobile
		},

		/**
		 * Checks if window width is lesser then navbreakpoint.
		 */
		checkIfLessThanBreakpoint () {
			return this.windowWidth < this.navBreakpoint
		}
	},

	computed: {
		/**
		 * Main class whether to display the navbar.
		 */
		showNav () {
			const windowWidth = window.innerWidth

			if (this.checkIfLessThanBreakpoint()) {
				return this.showNavMobile
			}

			return true
		},
	},
};
</script>

<style lang="scss">
#site-header {
	background-color: white;
}

.header-top {
	display: none;
	justify-content: space-between;
	align-items: center;
	padding-top: .25em;
	padding-bottom: 0.25em;

	@include tablet {
		display: flex;
	}

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

.header-nav {
	.navbar {
		background-color: transparent !important;
		box-shadow: 0 2px 8px 2px rgba(0,0,0,.6);

		@include tablet {
			background-color: $primary !important;
			padding-top: 0;
			padding-bottom: 0;
			box-shadow: none;
		}

		&-brand {
			display: none;
			justify-content: space-between;
			align-items: center;
			padding: .5em;
		}

		&-burger {
			display: inline-block;

			&__line {
				height: 3px;
				width: 22px;
			}
		}

		&-item {
			@include mobile {
				color: #fff !important;
			}
		}

		&-menu {
			@include mobile {
				position: fixed;
				top: 0;
				right: -100%;
				width: 500px;
				max-width: 80%;
				height: 100%;
				display: block !important;
				padding-top: 1em;
				padding-bottom: 1em;
				background-color: $primary;
				transition: right .35s ease;

				&.is-active {
					right: 0;
				}
			}

			&__close-button {
				position: absolute;
				top: 0;
				right: 0;

				&:hover,
				&:focus {
					color: #000;
					background-color: transparent;
				}
			}
		}
	}

	&__container {
		padding: 0;
	}
}
</style>

