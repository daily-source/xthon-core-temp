<template functional>
	<router-link 
		:to='props.to' 
		:class='`navbar-item ${props.itemClass}`' 
		:active-class='`is-active ${props.activeClass}`'
		:exact='props.exact'
		:exact-active-class='`navbar-item--exact ${props.exactActiveClass}`'
	>
		<slot></slot>
	</router-link>
</template>

<script>
export default {
	name: 'NavbarItem',

	props: {
		/** 
		 * The target route for the link
		 */
		to: {
			type: [String, Object],
			required: true,
			default: '/',
		},
		
		/**
		 * Classes to be added when current URL is active.
		 */
		activeClass: {
			type: String,
			required: false,
			default: '',
		},

		/**
		 * The default active class matching behavior is added only 
		 * when current URL is exactly matched with the target route
		 */
		exact: {
			type: Boolean,
			required: false,
			default: false,
		},

		/**
		 * Classes to be applied when path is an exact match
		 */
		exactActiveClass: {
			type: String,
			required: false,
			default: '',
		},

		/**
		 * General nav item class
		 */
		itemClass: {
			type: String,
			required: false,
			default: '',
		},
	},
}
</script>

<style lang='scss' scoped>
.navbar-item {
	&--push-left {
		margin-left: auto;
	}

	&--last {
		background-color: $secondary;
		padding-left: 1.25em;	
		padding-right: 1.25em;	

		@include mobile {
			color: #fff !important;
			padding-left: .75em;
			padding-right: .75em;
		}
	}
}
</style>

