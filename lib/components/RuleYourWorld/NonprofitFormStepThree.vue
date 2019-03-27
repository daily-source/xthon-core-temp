<template>
  <div class="nonprofit-form-step-three">
    <div class="container">
      <p>Now, you’re no longer ruler of the whole world, but you are ruler of yourself. Here are the percentages of your donations you decided should go to each group:</p>
      <table class='nonprofit-form-step-three__table table is-striped'>
        <thead>
          <tr>
            <th></th>
            <th>Percentage of donations to <br/><u>each group:</u></th>
            <th>Amount each group now lives on <br/><u>on each year:</u></th>
            <th>Percentage of people who are <br/><u>in each group:</u></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Very Poor:</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th>Poor:</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th>Middle Class:</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th>Rich:</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th>Very Rich:</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tbody>
      </table>
      <div id="content" class='has-text-centered'>
        <p class="has-text-weight-bold has-text-centered">
        We encourage you to commit to doing what you decided is right. We know it can be a bit hard to switch if you’ve recently donated to nonprofits that help people who are already in the top third.  But soon you’ll feel connected to nonprofits that help the bottom half, plus you’ll be having a bigger impact and helping people who are in far greater need.
      </p>
      <p class="has-text-weight-bold has-text-centered">
        We know it makes it harder when the nonprofits that help the rich have large budgets to persuade you to help them via sleek mailings, articulate fundraising professionals and expensive fundraising events. However, 95% of donations by Americans currently go to the top 1/3rd, while only 4% go to the bottom half. The bottom half should receive at least half of the giving, yet are not even receiving 5%. Things are so incredibly out of balance that you might want to increase the percentage you give to the poor to help bring things close to balance.
      </p>

      <p class="has-text-centered has-text-weight-bold mb-3 mt-4"> 
        <img class="has-text-centered world-img is-block mb-3" src="@/assets/img/logo.png" alt="RuleYourWorld"> 
        <span class="has-text-primary">Rule</span> your <span class="has-text--primary"> World </span>
      </p>

      <router-link to="/" class="back-button is-rounded has-text-weight-bold is-uppercase button is-primary"> Back To Step One </router-link>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NonprofitFormStepThree',
}
</script>

<style lang="scss" scoped>
.nonprofit-form-step-three {
  &__table {
    width: 100%;
  }

  .world-img {
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }

  #content {
    margin-top: 1.5rem;
  }

  .back-button {
    margin-top: 1rem;
  }
}
</style>
