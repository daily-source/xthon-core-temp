<template>
  <div>
    <h1 class="modal-title">User created!</h1>
    <p>Success! Your user was created.</p>
    <span @click="$emit('success')">close</span>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped lang="scss">

</style>