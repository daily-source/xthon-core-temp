
const VLazyImageComponent = {
  props: {
    src: {
      type: String,
      required: true
    },
    srcPlaceholder: {
      type: String,
      default: ""
    },
    srcset: {
      type: String
    },
    isBackground: {
      type: Boolean
    },
    isEditable: {
      type: Boolean
    },
    intersectionOptions: {
      type: Object,
      default: () => ({})
    },
    defaultText: {
      type: String
    }
  },
  data: () => ({ observer: null, intersected: false, loaded: false }),
  computed: {
    srcImage () {
      return this.intersected ? this.src : this.srcPlaceholder
    },
    srcsetImage () {
      return this.intersected && this.srcset ? this.srcset : false
    }
  },
  render (h) {
    if (this.isBackground) {
      return h("div", {
        style: { "background-image": `url(${this.srcImage})` },
        class: {
          "v-lazy-image": true,
          "v-lazy-image-loaded": this.loaded
        }
      },
      [
        this.srcImage || !this.isEditable ? "" : this.defaultText
      ]
      )
    } else {
      return h("img", {
        attrs: { src: this.srcImage, srcset: this.srcsetImage },
        class: {
          "v-lazy-image": true,
          "v-lazy-image-loaded": this.loaded
        }
      })
    }
  },
  mounted () {
    this.$el.addEventListener("load", ev => {
      if (this.$el.getAttribute("src") !== this.srcPlaceholder) {
        this.loaded = true
        this.$emit("load")
      }
    })

    /**
     * Add a polyfill for other and older browsers.
     * Needs to run in the client and not in the server.
     */
    if (typeof window !== "undefined") {
      require("intersection-observer")
      this.observer = new IntersectionObserver(entries => {
        const image = entries[0]
        if (image.isIntersecting) {
          this.intersected = true
          this.observer.disconnect()
          this.$emit("intersect")
        }
      }, this.intersectionOptions)

      this.observer.observe(this.$el)
    }
  },
  destroyed () {
    this.observer.disconnect()
  }
}

export default VLazyImageComponent

export const VLazyImagePlugin = {
  install: (Vue, opts) => {
    Vue.component("VLazyImage", VLazyImageComponent)
  }
}
