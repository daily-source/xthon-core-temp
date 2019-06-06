<template>
  <div class="fundraiser__img-wrap">
    <img 
      :src="img" 
      v-if="img"
      :alt="imgAlt" 
      class="img-fluid fundraiser__img"
      :id="imgId"
    >
  </div>
</template>

<script>
export default {
  name: "FundraiserImage",

  props: {
    imgName: {
      type: String,
      required: true,
    },

    imgAlt: {
      type: String,
      required: true,
    },

    imgId: {
      type: String,
      required: false,
    },
  },

  data () {
    return {
      img: null
    }
  },

  methods: {
    getImg () {
      this.img = require(`@/assets/img/logos/${this.imgName}`)
    }
  },

  watch: {
    img: {
      immediate: true,
      handler: 'getImg'
    }
  },
}
</script>

<style lang="scss">
.fundraiser__img-wrap {
  text-align: center;

  a {
      display: block;
  }

  img {
    max-width: enlarge(240px);
    min-height: 90px;
    object-fit: contain;
  }
}

#quitathon-img,
#volunteerathon-img,
#homes-for-the-earth-img,
#colleges-for-good-img,
#donateathon-img {
  max-width: enlarge(260px);
}

#environmental-debt-img, 
#daily-indulgence-drop-img {
  max-width: enlarge(280px);
}

#insight-in-mind-img,
#world-wealth-calculator-img {
  max-width: enlarge(320px);
}

#loseathon-img {
  max-width: enlarge(165px);
}

#bake-for-good-img,
#charitable-contests-img {
  max-width: enlarge(180px);
}

#run-for-good-img,
#ride-for-good-img,
#stands-for-freedom-img,
#conscience-or-cotton-img,
#resolutions-for-good-img {
  max-width: enlarge(200px);
}

#christmas-for-good-img,
#bowling-for-bucks-img,
#polar-plunge-img,
#crowdsourcing-for-the-poor-img,
#counters-for-the-poor-img,
#balanced-giving-img ,
#records-for-good-img {
  max-width: enlarge(220px);
}

#charitable-contests-img {
  position: relative;
  top: 10px;
}
</style>
