<template>
  <section class='banner'>
    <div class='container'>
      <h2 class='has-text-weight-bold'>See how people live and what they have at each level of annual income.</h2>
      <p>Numbers are adjusted for cost of living purchasing power parity, meaning each $1,000 below buys the same amount everywhere in the world.</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TheBanner'
}
</script>

<style scoped lang="scss">
.banner {
  background-color: $primary;
  color: #fff;
  padding-top: 1.375em;
  padding-bottom: 1.375em;
  text-align: center;

  @include tablet {
    padding-top: 3em;
    padding-bottom: 3em;
  }

  h2 {
    max-width: 270px;
    margin-right: auto;
    margin-bottom: .875em;
    margin-left: auto;
    font-size: 1.125em;
    color: #fff;

    @include tablet {
      max-width: 735px;
      font-size: 2.25em;
      margin-bottom: 1rem;
    }
  }

  p {
    margin-bottom: 0;
    color: #fff;
    max-width: 375px;
    margin-left: auto;
    margin-right: auto;
    font-size: .75em;

    @include tablet {
      max-width: 750px;
      font-size: 1.125em;
    }
  }
}
</style>
