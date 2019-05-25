<template>
  <div class="columns is-multiline is-mobile logo-grid">
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/virtual-railroad.png" alt="Virtual Railroad">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/freeathon.png" alt="Freeathon">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/stands-for-freedom.png" alt="Stands For Freedom" class='stands-for-freedom-img' >
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/conscience-or-cotton.png" alt="Conscience or Cotton">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/the-modern-emancipation-proclamation.png" alt="The Modern Emancipation Proclamation">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/see-our-slaves.png" alt="See our Slaves">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/freedom-lifts-all.png" alt="Freedom Lifts All">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/share-your-freedom.png" alt="Freedom Lifts All">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/tip-your-slaves.png" alt="Tip Your Slaves">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/crowdsourcing-freedom.png" alt="Crowdsourcing Freedom">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/free-a-slave.png" alt="Crowdsourcing Freedom">
        </div>
      </router-link>
    </div>
    <div class="column is-one-third">
      <router-link to="/">
        <div class="grid__img-wrap">
          <img src="@/assets/img/todays-slavery.jpg" alt="Todays Slavery as it Is">
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  .logo-grid {
    justify-content: center;

    .column {
      margin-bottom: 1em;
      display: flex;
      align-items: stretch;

      a {
        width: 100%;

        &:hover {
          .grid__img-wrap {
            box-shadow: 0 9px 18px 0 rgba(#000, .15);
            transform: translateY(-2px);
          }
        }
      }

      .grid__img-wrap {
        border-radius: 4px;
        border: 1px solid #ddd;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 1em;
        padding-bottom: 1em;
        width: 100%;
        transition: all .2s ease;
        min-height: 147px;
      } 
    }
  }

  .logo-grid img {
    display: block;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
