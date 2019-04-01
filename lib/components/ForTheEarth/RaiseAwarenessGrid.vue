<template>
  <div class="columns is-multiline is-mobile logo-grid">
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/waste-less-food.png" alt="Waste Less Food">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/environmental-debt.png" alt="Environmental Debt">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/environmental-cliff.png" alt="Counters for the Poor" class='Environmental Cliff' >
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/green-crowd-sourcing.png" alt="Green Crowdsourcing">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/homes-for-the-earth.png" alt="Homes for the Earth">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/creating-your-history.png" alt="Creating Your History">
        </div>
      </router-link>
    </div>
    <div class="column is-full has-text-right">
      <a class='see-more-link' href="#" @click.stop.prevent="false">See More</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RaiseAwarenessGrid',
}
</script>
