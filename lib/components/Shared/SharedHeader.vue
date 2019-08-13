<template>
  <header class="site-header" id="site-header">
    <div class="container">
      <div class="header-top">
        <router-link to="/" class="logo-link">
          <img :src="logo" alt="Site Logo">
        </router-link>
        <div class="header-top__nav-section">
          <ul class="nav is-flex">
            <li class="nav-item">
              <navbar-item 
								to="/register" 
								item-class="nav-link header-top__link" v-if='showLoginAndRegisterLinks'
								:exact='true'
							>
								Register
							</navbar-item>
            </li>
            <li class="nav-item">
              <navbar-item 
								to="/login" 
								item-class="nav-link header-top__link px-1"
								v-if='showLoginAndRegisterLinks'
							>
								Login
							</navbar-item>
            </li>
						<li 
							class='nav-item'
							v-for='(navObj, index) in validTopNavigationLinks'
							:key='index'
						>
							<navbar-item
								:to='navObj.to'
								:item-class='`nav-link header-top__link ${navObj.itemClass}`'
							>
								{{navObj.label}}
							</navbar-item>
						</li>
          </ul>
          <ul class="nav social-nav is-flex">
            <li class="nav-item">
              <a :href="fbLink" class="nav-link">
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
              <a :href="twLink" class="nav-link">
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
              <a :href="igLink" class="nav-link">
                <icon
                  :iconwidth='18'
                  :iconheight='18'
                  color='#233e84'
                  icon='instagram'
                />
                <span class="is-sr-only">Instagram</span>
              </a>
            </li>
						<li 
							class='nav-item'
							v-for='(socialLink, index) in socialLinks'
							:key='index'
						>
							<navbar-item
								:to='socialLink.to'
								:external='true'
								target='_blank'
							>
								<icon
                  :iconwidth='18'
                  :iconheight='18'
                  color='#233e84'
                  :icon='socialLink.icon'
                />
                <span class="is-sr-only">{{ socialLink.label }}</span>
							</navbar-item>
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
							<img :src="logo" alt="CalendarForGood">
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
						<navbar-item
							v-for='(mainNavLink, index) in mainNavLinks'
							:key='index'
							:to='mainNavLink.to'
							:item-class='mainNavLink.itemClass'
							:external='mainNavLink.external'
							:target='mainNavLink.target'
						>
							{{ mainNavLink.label }}
						</navbar-item>
						<div class='push-left is-flex'>
							<navbar-item
								v-for='(mainNavRightLink, index) in mainNavRightLinks'
								:key='index + mainNavLinks.length'
								:to='mainNavRightLink.to'
								:item-class='`navbar-item--special ${mainNavRightLink.itemClass}`'
								:external='mainNavRightLink.external'
								:target='mainNavRightLink.target'
							>
								{{ mainNavRightLink.label }}
							</navbar-item>
						</div>
          <ul class="nav social-nav">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <icon
                  :iconwidth='18'
                  :iconheight='18'
                  color='#fff'
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
                  color='#fff'
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
                  color='#fff'
                  icon='instagram'
                />
                <span class="is-sr-only">Instagram</span>
              </a>
            </li>
          </ul>
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
import NavbarItem from 'Components/Shared/Navbar/NavbarItem'

export default {
  name: 'AppHeader',

  components: {
    Icon,
		NavbarItem,
	},
	
	props: {
		/**
		 * Logo URL
		 */
		logo: {
			type: String,
			required: true,
		},

		/**
		 * The site name
		 * 
		 * The site name is used for logo alts.
		 */
		siteName: {
			type: String,
			required: false,
			default: 'Xthon',
		},

		/**
		 * The navigation links to be displayed on the upper right of the header.
		 */
		topNavigationLinks: {
			type: Array,
			required: false,
			default: () => {
				return []
			},
		},

		 /** 
		  * Whether to show the login and register links by default 
		  */
		showLoginAndRegisterLinks: {
			type: Boolean,
			required: false,
			default: true,
		},

		/**
		 * Specifies whether to use the default main navigation links or do not
		 * display them at all
		 */
		useDefaultMainNavLinks: {
			type: Boolean,
			required: false,
			default: true,
		},

		/**
		 * Additional main navigation links
		 */
		additionalMainNavLinks: {
			type: Array,
			required: false,
			default: () => {
				return []
			},
		},

		/**
		 * Additional main navigation right links
		 */
		additionalMainNavRightLinks: {
			type: Array,
			required: false,
			default: () => {
				return []
			},
		},

		/**
		 * Additional Social Navigation Links
		 */
		socialLinks: {
			type: Array,
			required: false,
			default: () => {
				return []
			},
		},

		/**
		 * TODO: Maybe have a general site config for social config
		 */
		fbLink: {
			type: String,
			required: false,
			default: '#',
		},

		twLink: {
			type: String,
			required: false,
			default: '#',
		},

		igLink: {
			type: String,
			required: false,
			default: '#',
		},
	},

	data () {
		return {
			showNavMobile: false,
			navBreakpoint: 769,
			mainNavDefaultLinks: [
				{
					to: '/',
					label: 'Home',
				},
				{
					to: '/about',
					label: 'About Us',
				},
				{
					to: '/volunteer',
					label: 'Volunteer',
				},
				{
					to: '/nonprofits',
					label: 'Nonprofits',
				},
				{
					to: '/contact',
					label: 'Contact Us',
				},
				{
					to: '/register',
					label: 'Register',
					itemClass: 'navbar-item--mobile',
				},
				{
					to: '/login',
					label: 'Login',
					itemClass: 'navbar-item--mobile',
				},
			],
			mainNavRightDefaultLinks: [
				{
					to: '/donate',
					label: 'Donate',
				},
			],
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
		},

		/**
		 * Check if a given object is a valid navigation pair.
		 * 
		 * @param {Object} navigationObj
		 * 
		 * @return {Boolean} True if it's a valid nonprofit pair.
		 */
		checkIfValidNavigationObj (navigationObj) {
			if (!navigationObj.to && !navigationObj.label) {
				return false
			}	

			return true
		},
	},

	computed: {
		/**
		 * Main class whether to display the navbar.
		 */
		showNav () {
			if (this.checkIfLessThanBreakpoint()) {
				return this.showNavMobile
			}

			return true
		},

		/**
		 * Valid navigation links according from the topNavigationLinks prop.
		 * 
		 * This is to ensure that we display only the links with valid navigation links. 
		 */
		validTopNavigationLinks () {
			return this.topNavigationLinks.filter(navObj => {
				return this.checkIfValidNavigationObj(navObj)
			})
		},

		/**
		 * Valid navigation links according from the mainNavLinks prop.
		 * 
		 * This is to ensure that we display only the links with valid navigation links. 
		 */
		validAddionalMainNavItems () {
			return this.additionalMainNavLinks.filter(navObj => {
				return this.checkIfValidNavigationObj(navObj)
			})
		},

		/**
		 * Valid navigation links according from the `additionalMainNavRightLinks` prop.
		 * 
		 * This is to ensure that we display only the links with valid navigation links. 
		 */
		validAddionalMainNavRightItems () {
			return this.additionalMainNavRightLinks.filter(navObj => {
				return this.checkIfValidNavigationObj(navObj)
			})
		},

		/**
		 * Main navigation links
		 */
		mainNavLinks () {
			let navItems = [
				...this.validAddionalMainNavItems
			]

			if (this.useDefaultMainNavLinks) {
				navItems = [
					...this.mainNavDefaultLinks,
					...navItems,
				]
			}

			return navItems
		},

		/**
		 * Navigation links to be displayed on the right of the navigation
		 */
		mainNavRightLinks () {
			let navItems = [
				...this.validAddionalMainNavRightItems,
			]

			if (this.useDefaultMainNavLinks) {
				navItems = [
					...this.mainNavRightDefaultLinks,
					...navItems,
				]
			}

			return navItems
		},
	},
};
</script>

<style lang="scss" scoped>
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
    padding-top: 1em;
    padding-bottom: 1em;
	}

	.nav {
		justify-content: flex-end;
		margin-left: -0.25em;

		.nav-item {
			padding-left: .25em;
			padding-right: .25em;

			.header-top__link {
				padding: .25em;
				font-size: .875rem;
				color: $primary !important;
			}

			&:last-child {
				.nav-link {
					padding-right: 0;
				}
			}
		}
	}
}

.logo-link {
	img {
		max-width: 300px;
	}
}

.header-nav {
	.navbar {
		background-color: transparent;
		box-shadow: 0 2px 8px 2px rgba(0,0,0,.6);

		@include tablet {
			background-color: $primary;
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
			color: #fff;
			
			&--mobile {
				display: block;

				@include tablet {
					display: none;
				}
			}
		}

		&-menu {
			margin-right: 0 !important;
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


			@include tablet {
				position: static;
				max-width: 100%;
				height: auto;
				width: 100%;
				display: flex !important;
				padding-top: 0;
				padding-bottom: 0;
			}

			&.is-active {
				right: 0;

				@include tablet {
					right: auto;
				}
			}

			&__close-button {
				position: absolute;
				top: 0;
				right: 0;
				display: inline-block;

				@include tablet {
					display: none;
				}

				&:hover,
				&:focus {
					color: #000;
					background-color: transparent;
				}
			}

			.social-nav {
				display: none;
				margin-top: .5em;
				margin-bottom: .5em;
				text-align: center;
				justify-content: center;
				display: flex;

				@include tablet {
					display: none;
				}

				.nav-link {
					color: #fff !important;

					.icon-wrapper {
						padding-right: .5em;
						padding-left: .5em;
					}
				}
			}
		}
	}

	&__container {
		padding: 0;
	}
}
</style>
