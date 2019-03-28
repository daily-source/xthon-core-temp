<template>
  <div class="nonprofit-form-step-three">
    <div class="nonprofit-form__container">
      <h2 class="nonprofit-form__title">
        The Results
      </h2>
      <p>Now, you’re no longer ruler of the whole world, but you are ruler of yourself. Here are the percentages of your donations you decided should go to each group:</p>
      <table class='nonprofit-form-step-three__table table is-striped'>
        <thead>
          <tr>
            <th></th>
            <th><span class="has-text-primary">Percentage of donations to <br/><u>each group:</u></span></th>
            <th><span class="has-text-primary">Amount each group now lives on <br/><u>on each year:</u></span></th>
            <th><span class="has-text-primary">Percentage of people who are <br/><u>in each group:</u></span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th><span class="has-text-primary">Very Poor:</span></th>
            <td>{{ formData.veryPoor.donationAmount}}</td>
            <td>{{ getPercenitleValue(formData.veryPoor.percentage)}}</td>
            <td>{{ formData.veryPoor.percentage}}%</td>           
          </tr>
          <tr>
            <th><span class="has-text-primary">Poor:</span></th>
            <td>{{ formData.poor.donationAmount}}</td>         
            <td>{{ getPercenitleValue(formData.poor.percentage)}}</td>
            <td>{{ formData.poor.percentage}}%</td>                     
          </tr>
          <tr>
            <th><span class="has-text-primary">Middle Class:</span></th>
            <td>{{ formData.middleClass.donationAmount}}</td>
            <td>{{ getPercenitleValue(formData.middleClass.percentage)}}</td>
            <td>{{ formData.middleClass.percentage}}%</td>            
          </tr>
          <tr>
            <th><span class="has-text-primary">Rich:</span></th>
            <td>{{ formData.rich.donationAmount}}</td>
            <td>{{ getPercenitleValue(formData.rich.percentage)}}</td>
            <td>{{ formData.rich.percentage}}%</td>        
          </tr>
          <tr>
            <th><span class="has-text-primary">Very Rich:</span></th>
            <td>{{ formData.veryRich.donationAmount}}</td>
            <td>{{ getPercenitleValue(formData.veryRich.percentage)}}</td>
            <td>{{ formData.veryRich.percentage}}%</td>            
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

      <button 
        class="back-button is-rounded has-text-weight-bold is-uppercase button is-primary"
        @click.prevent='backToStepOneClicked'
      > 
        Back To Step One 
      </button>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

let offset

export default {
  name: 'NonprofitFormStepThree',

  data () {
    return {
      offset: 100,
    }
  },

  methods: {
    getPercenitleValue (percent) {
      let currentOffset = offset;

      const fromValue = this.percentiles[currentOffset]


      const toValue = this.percentiles[currentOffset - parseInt(percent)]

      offset = currentOffset - percent;

      if (currentOffset == 100) {
        return '$0 to $' + toValue 
      } else if ( offset == 0 && toValue == null ) {
        return 'Over $' + fromValue
      } else {
        return '$' + fromValue + ' to $' + toValue
      }
    },

    backToStepOneClicked () {
      offset = 0

      this.$emit('backButtonClicked')
    }
  },

  created() {
    offset = 100;
  },

  computed: {
    ...mapState({
      formData: state => state.form.data,
      percentiles: state => state.percentiles.data,
    }),
  },
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
