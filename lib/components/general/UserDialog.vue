<template>
  <Modal
    class="user-dialog-component-wrapper"
    :prevent-body-scroll="false"
    :state="state"
    :disableClose="disableClose"
    :size="size"
    v-on:modal:close="$emit('modal:close')"
  >
    <div slot="header">
      <slot name="header">Processing</slot>
    </div>
    <div slot="content">
      <div
        :clas="{'columns is-centered': !notCentered}"
      >
        <slot name="content"><p>Hang tight, processing...</p></slot>
      </div>
      <div class="spinner" v-if="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "Components/general/Modal.vue"

export default {
  props: ["state", "spinner", "disableClose", "size", "notCentered"],
  components: {
    Modal
  }
}
</script>

<style scoped lang="scss">
.spinner {
  margin: 10px auto;
  width: 100px;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: rgba($color-medium-gray, 0.4);

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
} 
</style>