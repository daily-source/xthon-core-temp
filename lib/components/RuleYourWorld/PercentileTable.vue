<template>
  <div class="percentiles card">
    <div class="card-header">
      <h4 class="header-title has-text-weight-bold">World Income Breakdown</h4>
    </div>
    <div class="card-content">
      <div class="columns">
        <div class="column">
          <p> <span class="has-text-weight-bold">Top 10%: </span> Over ${{ percentiles[10] }} </p>
          <p> <span class="has-text-weight-bold">Top 20%: </span> Over ${{ percentiles[20] }} </p>
          <p> <span class="has-text-weight-bold">Top 30%: </span> Over ${{ percentiles[30] }} </p>
          <p> <span class="has-text-weight-bold">Top 40%: </span> Over ${{ percentiles[40] }} </p>
          <p> <span class="has-text-weight-bold">Top 50%: </span> Over ${{ percentiles[50] }} </p>
        </div>
        <div class="column">
          <p> <span class="has-text-weight-bold">Top 60%: </span> Over ${{ percentiles[60] }} </p>
          <p> <span class="has-text-weight-bold">Top 70%: </span> Over ${{ percentiles[70] }} </p>
          <p> <span class="has-text-weight-bold">Top 80%: </span> Over ${{ percentiles[80] }} </p>
          <p> <span class="has-text-weight-bold">Top 90%: </span> Over ${{ percentiles[90] }} </p>
          <p> <span class="has-text-weight-bold">Bottom 10%: </span> Under ${{ percentiles[100] }} </p>
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
    box-shadow: none;
    border: 1px solid rgba(0,0,0,.125);
    background-clip: border-box;
    background-color: #fff;

    .card-header {
      padding: .75rem 1.25rem;
      border-bottom: 1px solid rgba(0,0,0,.125);
      background-color: $primary;
    }

    .card-content {
      height: auto;
    }

    .header-title {
      color: #fff;
      padding-bottom: 0;
      margin-bottom: 0;
      text-transform: uppercase;
      font-size: 1.25rem;
    }

    p:last-of-type {
      margin-bottom: 0;
    }
  }
</style>