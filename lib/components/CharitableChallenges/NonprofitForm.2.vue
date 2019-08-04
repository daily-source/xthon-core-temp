<template>
  <div class="nonprofit-form-2">
    <div 
      class="nonprofit-form-2__fields nonprofit-form__fields--register"
    >
        <h2 class='has-text-weight-bold'>Create A Challenge</h2>
        <div class="field">
        <label class='label' for="name">Name your challenge <span class="has-text-danger">*</span></label>
        <div class="control">
          <input 
            id='name'
            type="text" 
            class="input"
            v-model='form.name'
          >
        </div>
      </div>
      <div class="field">
        <label class='label' for="description">Tell us about your challenge <span class="has-text-danger">*</span></label>
        <div class="control">
          <textarea name="description" id="description" class='textarea' rows="10"></textarea>
        </div>
      </div>
      <div class="field">
        <span class="label">Select a nonprofit/cause to support <span class="has-text-danger">*</span></span>
        <div class="control">
          <div class="columns">
            <nonprofit-ajax-search />
          </div>
        </div>
      </div>
      <div class="nonprofit-form__image-field field">
        <span class="label">Challenge Image:</span>
        <div class="control">
          <croppa 
            v-model='challengeImage'
            :width='300'
            :height='300'
            :placeholder-font-size='17'
          />
        </div>
      </div>
      <div class="field">
        <button type='submit' class='button is-primary'>Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NonprofitForm2',

  components: {
    SlideFade: () => import('Components/transitions/SlideFade'),
    RecentChallenges: () => import('Components/CharitableChallenges/RecentChallenges'),
    NonprofitAjaxSearch: () => import('Components/general/NonprofitAjaxSearch')
  },


  data () {
    return {
      form: {},
      challengeImage: null,
    }
  },

}
</script>

<style lang='scss' scoped>
.nonprofit-form-2 {
  padding-top: 3em;
  padding-bottom: 3em;

  &__action-field {
    padding-bottom: 2em;
  }

  .label {
    font-weight: 700 !important;
    justify-content: flex-start;
  }
}
</style>

<style lang='scss'>
.nonprofit-form-2 {
  &__image-field {
    canvas {
      cursor: pointer;
      border: 2px dashed #a4aeb1;
    }
  }

  .dropdown-toggle {
    border-color: #dbdbdb !important;
  }
}
</style>

