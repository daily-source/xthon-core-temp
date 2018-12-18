<template>
  <section class="page-wrapper section2" :fixed="true" v-bind:style="{ backgroundColor: `#f5f1e0` }" breakpoint="(min-width: 968px)">
    <div>
      <div class="container capped">
        <h1 v-html="headline"></h1>
      </div>
      <div class="container capped">
        <div class="logo-badge">
          <h3 v-html="tagline"></h3>
        </div>
        <div class="columns boxes-wrapper" v-if="boxes.length">
          <div class="card column" v-for="box in boxes" :key="box.imgsrc">
            <div class="card-content bg-position-right" :style="`backgroundImage: url(${box.imgsrc})`">
            </div>
            <footer class="card-footer" v-html="box.title"></footer>
          </div>
        </div>
      </div>
      <div class="container capped">
        <div class="logo-badge">
          <h3 class="result">The result is: </h3>
        </div>
        <div class="columns combo-wrapper is-multiline">
          <ComboBox
            :duplicate="false"
            :iconsrc="result.iconsrc"
            :key="result.headline"
            v-for="result in results"
          >
            <h2 v-html="result.headline"></h2>
            <p v-html="result.tagline"></p>
          </ComboBox>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ComboBox from "Components/general/ComboBox.vue"

export default {
  components: {
    ComboBox
  },
  props: ["headline", "tagline", "boxes", "results"],
  data () {
    return {
      currentImg: 0,
      timer: null
    }
  },
  mounted () {
    this.startRotation()
  },
  destroyed () {
    clearTimeout(this.timer)
  },
  /**
   * Create a custom rotation function.
   */
  methods: {
    startRotation: function () {
      this.timer = setInterval(this.next, 3000)
    },
    next: function () {
      this.currentImg++
    },
    prev: function () {
      this.currentImg--
    }
  }
}
</script>

<style scoped lang="scss">

.Masthead {
  min-height: 120vh;
}

h3 {
  text-align: center;
}

h1 {
  color: $color-text;
  margin-bottom: 10px;
}

.result {
  width: 100%;
  margin-top: 20px;
  color: $color-text;
  text-align: left;
}

.columns {
  margin-top: 5px;

  @include tablet {
    justify-content: flex-start;
    display: flex;
  }
}

.card {
  .card-content {
    @include tablet {
      height: calc(252px - 30px);
    }    
    @include fullhd {
      height: calc(302px - 30px);
    }    
  }
}

.card-footer {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  display: block;
  padding: 10px;
  border: none;
}

.box-wrapper.column.vertical {
  padding-top: 0;

  h2 {
    font-size: 19px;
  }
  p {
    font-size: 17px !important;
  }
}
.combo-wrapper {
  p {
    padding: 0 35px;

    @include fullhd {
      padding: 0 45px;
    }
  }
}
</style>
