<template>
  <div class='featured-image-chooser__wrapper'>
    <!-- TODO: On mobile, set the component to the ThemeChooserSlider instead of the column chooser -->
    <component 
      :is='component'
			:selected='selected'
      :themes='themes'
      @change='handleThemeChange'
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ThemeChooser',

  props: {
    /**
     * Type of the Theme Chooser.
     */
    type: {
      type: String,
      default: 'columns',
      validator: (value) => {
        return ['slider', 'columns'].indexOf(value) !== -1
      },
    },
		/**
		 * The selected image by default
		 */
		selected: {
			type: Number,
			required: false,
			default: 1,
		},
  },

  data () {
    return {
      component: null,
    }
  },

  mounted () {
    this.loader()
  },

  methods: {
    loader () {
      try {
        this.component = () => import(`./${this.componentName}`)
      } catch (err) {
        console.log(err)
        return
      }
    },

    handleThemeChange (index, theme) {
      this.$emit('change', index, theme)
    },
  },

  computed: {
		/**
		 * Gets the Child Component Name to be rendered into the view.
		 */
    componentName () {
      let componentName 
      switch (this.type) {
        case 'slider':
          componentName = 'ThemeChooserSlider'
          break
        default:
          componentName = 'ThemeChooserColumns'
      }

      return componentName
    },

    ...mapState({
      /**
       * The themes from the app's state
       */
      themes (state) {
        return state.counterwidgets.themes
      },
    })
  },
}
</script>
