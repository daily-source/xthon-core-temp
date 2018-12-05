<template>
  <div>
    <div class="modal" :class="{'is-active': state, 'dark': theme === 'dark'}">
      <div class="modal-background" @click="closeModal()" @keyup.esc="closeModal()"></div>
      <div class="modal-content donate-view donate-view__wrapper inner-close small-modal"
        :class="`${size}-modal`"
      >
        <h1 class="modal-title">
          <slot name="header"></slot>
        </h1>
        <slot name="content"></slot>
        <transition name="fade">
          <button
            class="modal-close is-large"
            aria-label="close"
            @click.prevent="closeModal()"
            v-if="!disableClose"
          ></button>
        </transition>
      </div>
    </div>
    <div @click="openModal()">
      <slot name="trigger"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "disableClose", "preventBodyScroll", "state", "size", "enableEsc", "theme" ],
  data () {
    return {
      modalActive: false
    }
  },
  methods: {
    openModal () {
      this.$emit("modal:open")
    },
    closeModal () {
      this.$emit("modal:close")
    }
  },
  mounted () {
    /*
     * Create an event listener so that the modal can be closed on esc key press.
     */
    if (this.enableEsc) {
      document.body.addEventListener("keyup", e => {
        if (e.keyCode === 27) {
          this.closeModal()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.modal-title {
  font-size: 28px;
}

.modal.dark {
  .modal-background {
    background-color: rgba(0,0,0, 0.9);
  }
  .modal-content {
    background-color: transparent;
  }
}
</style>