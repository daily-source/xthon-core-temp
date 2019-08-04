<template>
  <div class="nonprofit-form">
    <div class="field nonprofit-form__action-field">
      <span class='label'>I would like to:</span>
      <label class="radio">
        <input 
          type="radio" 
          name="question" 
          value='do'
          v-model='form.action'
        >
        Do a challenge
      </label>
      <label class="radio">
        <input 
          type="radio" 
          name="question" 
          value='register'
          v-model='form.action'
        >
        Register a challenge
      </label>
    </div>

    <slide-fade>
      <div 
        class="nonprofit-form__fields nonprofit-form__fields--do"
        v-if='form.action === "do"'
      >
        <div class="field">
          <label  class='label' for="name">Search for challenges</label>
          <div class="control">
            <input 
              type="text"
              name='name'
              class='input'
              v-model='form.name'
              placeholder='Enter keyword/s of a challenge'
            >
          </div>
        </div>
        <div class="field">
          <button type='submit' class='button is-primary'>Submit</button>
        </div>
      </div>
    </slide-fade>

    <slide-fade>
      <div 
        class="nonprofit-form__fields nonprofit-form__fields--register" v-if='form.action === "register"'
      >
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
            />
          </div>
        </div>
      </div>
    </slide-fade>
  </div>
</template>

<script>
export default {
  name: 'NonprofitForm',

  components: {
    SlideFade: () => import('Components/transitions/SlideFade'),
    RecentChallenges: () => import('Components/CharitableChallenges/RecentChallenges'),
    NonprofitAjaxSearch: () => import('Components/general/NonprofitAjaxSearch')
  },

  data () {
    return {
      form: {
        action: 'do'
      },
      challengeImage: null,
    }
  },
}
</script>

<style lang='scss' scoped>
.nonprofit-form {
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
.nonprofit-form {
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
