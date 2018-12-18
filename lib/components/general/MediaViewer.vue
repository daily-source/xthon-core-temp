<template>
  <Modal
    class="modal-viewer__outer-wrapper"
    size="medium"
    theme="dark"
    :prevent-body-scroll="false"
    :state="modalState"
    :enable-esc="true"
    v-on:modal:close="closeModals()"
    v-on:modal:open="openModal()"
  >
    <div slot="trigger" class="unselectable"><slot name="trigger"></slot></div>
    <div slot="content" class="modal-viewer__wrapper">
      <flickity ref="flickity" class="nonprofit-extended__media-wrapper"
        :options="flickityOptions"
      >
        <img
          :src="item.src"
          v-for="item in media"
          v-if="item.type === 'image'"
        />
        <div class="plyr-wrapper" v-if="item.type === 'video'" v-for="(item, index) in media">
          <VuePlyrWrapper v-if="canRender">
            <vue-plyr :ref="`plyr_${index}`">
              <div data-plyr-provider="youtube" :data-plyr-embed-id="item.src"></div>
            </vue-plyr>
          </VuePlyrWrapper>
        </div>
      </flickity>
    </div>
  </Modal>
</template>

<script>
import Icons from "Components/general/Icons.vue"
import Modal from "Components/general/Modal.vue"
import Flickity from "Components/plugins/Flickity.vue"
import Vue from "vue"

export default {
  props: [ "media" ],
  components: {
    Icons,
    Flickity,
    Modal,
    VuePlyrWrapper: () => import("Components/general/VuePlyrWrapper.vue")
  },
  data () {
    return {
      modalState: false,
      currentCell: null,
      canRender: false,
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: true,
        pageDots: false,
        wrapAround: true,
        adaptiveHeight: true,
        lazyLoad: true
      }
    }
  },
  methods: {
    openModal () {
      this.modalState = true
      this.$emit("modal:open")
    },
    closeModals () {
      this.modalState = false
      this.$emit("modal:close")

      // On close, pause the current slide if it's a video.
      const flick = this.$refs.flickity
      if (flick.$flickity.cells[this.currentCell].element.className.indexOf("plyr") > -1) {
        this.$refs[`plyr_${this.currentCell}`][0].player.pause()
      }
    }
  },
  watch: {
    modalState (value) {
      if (value) {
        Vue.nextTick(() => {
          this.$refs.flickity.resize()
        })
      }
    }
  },
  mounted () {
    const flick = this.$refs.flickity
    this.currentCell = 0
    this.canRender = true

    /** Listen to a flickity event:
     * if there's a slide change and the previous one had a video, pause it.
     */
    flick.on("change", () => {
      // Auto play if there's video in the selected cell.
      if (flick.$flickity.cells[flick.selectedIndex()].element.className.indexOf("plyr") > -1) {
        this.$refs[`plyr_${flick.selectedIndex()}`][0].player.play()
      }
      // Auto pause if there's video in the previously selected cell.
      if (flick.$flickity.cells[this.currentCell].element.className.indexOf("plyr") > -1) {
        setTimeout(() => {
          this.$refs[`plyr_${this.currentCell}`][0].player.pause()
        }, 50)
      }
      this.$emit("slideChange", flick)

      setTimeout(() => {
        this.currentCell = flick.selectedIndex()
      }, 50)
    })
  }
}
</script>

<style lang="scss">
.modal-viewer__outer-wrapper {
  @include mobile {
    .modal-content {
      margin: 0;
    }
    .medium-modal {
      width: 100%;
    }
    .flickity-button {
      display: none;
    }
  }
  .modal-content {
    padding: 0;
    border-radius: 0;
  }
  .flickity-button {
    opacity: 0.3;
    transition: opacity 0.2s ease-in-out;
    &:hover {
      opacity: 0.8;
    }
  }
}
.modal-viewer__wrapper {
  .flickity-viewport {
    transition: height 0.2s;
  }
  .flickity-slider {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.plyr-wrapper {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}
</style>
