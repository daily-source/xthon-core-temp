<template functional>
	<div class='navbar-item-wrapper'>
		<router-link 
			v-if='!props.external'
			:class='`navbar-item ${props.itemClass}`'
			:target='props.target'
			:to='props.to'
			:exact-active-class='props.exactActiveClass'
			:active-class='props.activeClass'
			:exact='props.exact'
		>
			<slot></slot>
		</router-link>
		<a
			:class='`navbar-item ${props.itemClass}`'
			:target='props.target'
			:href='props.to'
			v-else
		>
		</a>
	</div>
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

		/**
		 * Specifies if the link is external
		 */
		external: {
			type: Boolean,
			required: false,
			default: false,
		},

		/**
		 * Specifies the behavior of the link on click.
		 */
		target: {
			type: String,
			required: false,
			default: null,
		},
	},
}
</script>

<style lang='scss' scoped>
.navbar-item-wrapper {
	display: flex;
	align-items: stretch;
}

.navbar-item {
	&--push-left {
		margin-left: auto;
	}

	&--special {
		color: #fff !important;
		padding-left: .75em;
		padding-right: .75em;	
		text-transform: uppercase;
		font-weight: 700;

		@include tablet {
			background-color: $secondary;
			padding-left: 1.25em;	
			padding-right: 1.25em;
		}

		&:not(:last-of-type) {
			margin-right: .25em;
		}
	}
}
</style>

