<template>
	<div 
		:class='["alert-bar", { "alert-bar--show": isShown }, alertPositionClass]'
	>
		<p class='alert-bar__text has-text-centered'>
			Here is a preview of your page. To publish it, register for a free account <a href='#' class='alert-bar__link'>here</a>. Your changes will be saved while you register. If you have an account, login <a href='#' class='alert-bar__link'>here</a>. To edit the page, click the pen icons below
		</p>
	</div>
</template>

<script>
export default {
	name: 'AlertBar',

	props: {
		position: {
			type: String,
			default: 'top',
			validator: (value) => {
        return ['top', 'bottom'].indexOf(value) !== -1
			},
		},
		show: {
			type: Boolean,
			default: true,
		},
	},

	data () {
		return {
			isShown: this.show,
		}
	},

	computed: {
		alertPositionClass () {
			if (this.position === 'bottom') {
				return 'alert-bar--bottom'
			}	

			return 'alert-bar--top'
		}
	},

	methods: {
		toggleShow () {
			this.isShown = !this.isShown
		}
	}
}
</script>
	
<style lang='scss' scoped>
	.alert-bar {
		z-index: 100;
		width: 100%;
		padding-top: 1em;
		padding-bottom: 1em;
		padding-left: 1.5em;
		padding-right: 1.5em;
		background-color: $secondary;
		box-shadow: 0 2px 10px 0 rgba(102, 101, 101, 0.7);
		transition: all .4s ease;
	}

	.alert-bar__text {
		color: #fff;
		text-align: center;
		max-width: 80%;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 0;
	}

	.alert-bar__link {
		color: $primary;
		text-decoration: underline;
	}
</style>
