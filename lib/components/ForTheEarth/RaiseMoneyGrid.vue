<template>
  <div class="columns is-multiline is-mobile logo-grid">
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/volunteerathon.png" alt="Volunteerathon">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/quitathon.png" alt="In Sight in Mind">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/give-it-for-the-earth.png" alt="Give it Up For The Earth" class='stands-for-freedom-img' >
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/run-for-good.png" alt="Balanced Giving">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/ride-for-good.png" alt="World Wealth Calculator">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/calendar-for-good.png" alt="Maps for the Poor">
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
  name: 'RaiseMoneyGrid',
}
</script>
