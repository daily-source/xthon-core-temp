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
          <img src="@/assets/img/giveitupforgood.png" alt="Counters for the Poor" class='stands-for-freedom-img' >
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
  </div>
</template>

<script>
export default {
  name: 'RaiseMoneyGrid',
}
</script>
