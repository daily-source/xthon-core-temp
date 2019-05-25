<template>
  <div class="percentiles card">
    <div class="card-header">
      <h4 class="header-title has-text-weight-bold">World income levels you can use in making your choices</h4>
    </div>
    <div class="card-content">
      <div class="columns percentiles__columns">
        <div class="column percentiles__column">
          <p> <span class="has-text-weight-bold">Top 10%: </span> Over ${{ percentiles[10] }} </p>
          <p> <span class="has-text-weight-bold">Top 20%: </span> Over ${{ percentiles[20] }} </p>
          <p> <span class="has-text-weight-bold">Top 30%: </span> Over ${{ percentiles[30] }} </p>
        </div>
        <div class="column percentiles__column">
          <p> <span class="has-text-weight-bold">Top 40%: </span> Over ${{ percentiles[40] }} </p>
          <p> <span class="has-text-weight-bold">Top 50%: </span> Over ${{ percentiles[50] }} </p>
          <p> <span class="has-text-weight-bold">Top 60%: </span> Over ${{ percentiles[60] }} </p>
         
        </div>
        <div class="column percentiles__column">
          <p> <span class="has-text-weight-bold">Top 70%: </span> Over ${{ percentiles[70] }} </p>
          <p> <span class="has-text-weight-bold">Top 80%: </span> Over ${{ percentiles[80] }} </p>
          <p> <span class="has-text-weight-bold">Top 90%: </span> Over ${{ percentiles[90] }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PercentileTable',

  computed: {
    ...mapState({
      percentiles: state => state.percentiles.data,
    })
  }
}
</script>


<style lang='scss' scoped>
  .percentiles {
    max-width: 730px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: none;
    border: 0;
    background-clip: border-box;
    background-color: #fff;

    .card-header {
      padding: 0 1.25rem;
      border: 0;
      background-color: transparent;
      box-shadow: none;
    }

    .card-content {
      height: auto;
    }

    .header-title {
      color: $primary;
      padding-bottom: 0;
      margin-bottom: 0;
      text-transform: uppercase;
      font-size: 1.25rem;
      text-align: center;
    }

    p:last-of-type {
      margin-bottom: 0;
    }

    &__columns {
      justify-content: flex-start;
    }

    &__column {
      @include desktop {
        flex-grow: 0;
        flex-shrink: 0;
        flex-basis: 30%;
      }
    }
  }
</style>