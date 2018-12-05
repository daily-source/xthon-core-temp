<template>
  <Modal
    class="donate-error-modal"
    :prevent-body-scroll="false"
    :state="state"
    v-on:modal:close="dismiss()"
  >
    <div slot="header">The donation didn't go through</div>
    <div slot="content">
      <p>Your donation couldn't be processed. Please try again with a different payment method or introduce your payment method data again.</p>
      <div class="is-centered dismiss-cta" @click="dismiss()">
        <div class="button is-centered is-large is-warning">Dismiss</div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "Components/general/Modal.vue"

export default {
  props: ["state"],
  components: {
    Modal
  },
  methods: {
    dismiss () {
      this.$emit("modal:close")
    }
  }
}
</script>

<style scoped lang="scss">
  .dismiss-cta {
    margin: 20px auto;
    text-align: center;
  }
</style>