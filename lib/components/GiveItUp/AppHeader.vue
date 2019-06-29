<template>
  <shared-header 
    
  />
</template>

<script>
import SharedHeader from "Components/shared/SharedHeader"

export default {
  name: "AppHeader",

  components: {
    SharedHeader,
  }
}
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

