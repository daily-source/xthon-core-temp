const imageSrc = {
  data () {
    return {
      // The folder name inside assets folder.
      imgBasePath: '/img/images/',
    }
  },

  computed: {
    imgPath () {
      return `${this.imgBasePath}${this.imgFolderName || ''}`
    }
  },

  methods: {
    getImageSrc (imgName) {
      return require(`@/assets${this.imgPath}${imgName}`)
    }
  }
}

export default imageSrc
