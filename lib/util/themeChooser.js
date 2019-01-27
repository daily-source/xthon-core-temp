import { mapState } from 'vuex'
import imageSrc from 'Core/util/imageSrc'

/**
 * Mixins for components who wants to implement theme choosing for widgets.
 */
const themeChooser = {
  mixins: [imageSrc],

  props: {
    /**
     * The themes to choose from
     */
    themes: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    
    /**
     * Index of the selected theme by default.
     */
    selected: {
      type: [Number, String],
      required: false,
      default: 1,
    },
  },

  data () {
    return {
      selectedIndex: this.selected,
      imgFolderName: 'widget-imgs/thumbnails/'
    }
  },

  methods: {
    /**
     * Set selectedIndex.
     * @param {(string, number)} index The index to set
     */
     setSelectedIndex(index) {
      this.selectedIndex = index
    },
  },
  
  computed: {
    /**
     * Options where images are set.
     * Returns a new set of themes including the 
     * path of the backgroundImage
     */
    imageOpts () {
      const themes = this.themes.filter(theme => theme.backgroundImageId !== null)
      
      return themes.map(theme => {
        const imageSrc = this.getImageSrc(this.backgrounds[theme.backgroundImageId])
        return {
          ...theme,
          imageSrc,
        }
      })
    },

    /**
     * Options where no images are set or is equal 
     * to null.
     */
    noImageOpts () {
      return this.themes.filter(theme => theme.backgroundImageId === null)
    },

    /**
     * The current selected theme
     */
    selectedTheme () {
      return this.themes.find(theme => theme.id == this.selectedIndex)
    },

    ...mapState({
      /**
       * The backgroundImages from the app's state.
       * @param {Object} state The app's state
       */
      backgrounds (state) {
        return state.counterwidgets.backgroundImages
      },
    }),
  },

  watch: {
    /**
     * Emits an event `change` when selected index 
     * is changed,
     */
    selectedIndex: {
      handler (val) {
        this.$emit('change', this.selectedIndex, this.selectedTheme)
      },

      immediate: true,
    },
  },
}

export default themeChooser
