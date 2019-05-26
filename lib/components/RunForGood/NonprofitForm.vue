<template>
  <div class="page-wrapper">
    <div class="container">
      <slot name="heading"></slot>
      <div class="columns combo-wrapper is-multiline bubbles-wrapper" v-if="bubbles">
        <ComboBox :iconsrc="require('Public/img/check.png')" duplicate="false" :large="true">
        </ComboBox>
        <ComboBox :iconsrc="require('Public/img/invite.png')" duplicate="false" :large="true">
        </ComboBox>
        <ComboBox :iconsrc="require('Public/img/act.png')" duplicate="false" :large="true">
        </ComboBox>
      </div>
      <div class="form-wrapper">
        <form v-on:keyup.enter="">
          <div class="columns form-column__wrapper  is-multiline">
            <div class="column is-5 form-column__label-column">
              <label :for="`input-email_${_uid}`" class="label"> Number of miles of the run:</label>
            </div>
            <div class="column is-6 form-column__input-column">
              <div class="control input-wrapper">
                <Icons icon="chart" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
                <input class="input" type="number" name="action" placeholder=""
                  :required="true"
                  v-model="form.howManyMiles"
                >
              </div>
            </div>
          </div>

          <div class="columns form-column__wrapper  is-multiline">
            <div class="column is-5 form-column__label-column">
              <label :for="`input-email_${_uid}`" class="label">Start location:</label>
            </div>
            <div class="column is-6 form-column__input-column">
              <div class="control input-wrapper">
                <Icons icon="location" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
                <input class="input" type="text" name="action" placeholder=""
                  :required="true"
                  v-model="form.startLocation"
                >
              </div>
            </div>
          </div>

          <div class="columns form-column__wrapper  is-multiline">
            <div class="column is-5 form-column__label-column">
              <label :for="`input-email_${_uid}`" class="label">End location:</label>
            </div>
            <div class="column is-6 form-column__input-column">
              <div class="control input-wrapper">
                <Icons icon="location" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
                <input class="input" type="text" name="action" placeholder=""
                  :required="true"
                  v-model="form.endLocation"
                >
              </div>
            </div>
          </div>

          <div class="columns form-column__wrapper  is-multiline">
            <div class="column is-5 form-column__label-column">
              <label :for="`input-email_${_uid}`" class="label">Date of the event:</label>
            </div>
            <div class="column is-6 form-column__input-column">
              <div class="control input-wrapper">
                <Icons icon="calendar" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
                <datetime v-model="form.date"></datetime>
              </div>
            </div>
          </div>

          <div class="columns form-column__wrapper  is-multiline" v-if="enableNonprofitSearch">
            <div class="column is-5 form-column__label-column"><label class="label">Pick a nonprofit to help:</label></div>
            <NonprofitAjaxSearch
              v-if="canRender"
              v-on:selected="setNonprofit($event)"
              :standalone="false"
            ></NonprofitAjaxSearch>
          </div>

          <div class="columns form-column__wrapper is-multiline">
            <div class="column is-5 form-column__label-column"><label class="label">Is this:</label></div>
            <div class="column form-column__label-column">
              <label class="radio">
                <input type="radio" name="non-profit-is" v-model="form.runType" value="own">
                A new run you're creating (group or individual)
              </label>
              <label class="radio">
                <input type="radio" name="non-profit-is" v-model="form.runType" value="event">
                Part of a public event (E.g. Boston Marathon)
              </label>
              <small> Example: you or a group are raising money by running in a 10k</small>
            </div>
          </div>

          <transition name="slide-fade">
            <div class="columns form-column__wrapper  is-multiline" v-if="form.runType === 'own'">
              <div class="column is-5 form-column__label-column">
                <label :for="`input-email_${_uid}`" class="label">Choose one:</label>
              </div>
              <div class="column form-column__label-column">
                <label class="radio">
                  <input type="radio" name="non-profit-type" v-model="form.ownRunType" value="individual">
                  Individual run 
                </label>
                <label class="radio">
                  <input type="radio" name="non-profit-type" v-model="form.ownRunType" value="group">
                  Group run
                </label>
              </div>
            </div>
          </transition>

          <transition name="slide-fade">
            <div class="columns form-column__wrapper  is-multiline" v-if="form.ownRunType === 'group'">
              <div class="column is-5 form-column__label-column">
                <label :for="`input-email_${_uid}`" class="label">Is this group:</label>
              </div>
              <div class="column form-column__label-column">
                <label class="radio">
                  <input type="radio" name="own-run-type" v-model="form.ownGroupRunType" value="individual">
                  Open to the public (anyone can join)  
                </label>
                <label class="radio">
                  <input type="radio" name="own-run-type" v-model="form.ownGroupRunType" value="group">
                  Private (by invitation only)
                </label>
              </div>
            </div>
          </transition>

          <transition name="slide-fade">
            <div class="columns form-column__wrapper  is-multiline" v-if="form.ownGroupRunType">
              <div class="column is-5 form-column__label-column">
                <label :for="`input-email_${_uid}`" class="label">Choose a name for the run:</label>
              </div>
              <div class="column is-6 form-column__label-column">
                <input type='text' class='input' v-model='form.runName'>
                <small>Examples: The Run Against Racism; or Run For Their Lives;</small>
              </div>
            </div>
          </transition>

          <transition name='slide-fade'>
            <div class="columns form-column__wrapper  is-multiline" v-if="form.runType === 'event'">
              <div class="column is-5 form-column__label-column">
                <label :for="`input-email_${_uid}`" class="label">Are you running:</label>
              </div>
              <div class="column form-column__label-column">
                <label class="radio is-block">
                  <input type="radio" name="event-non-profit-is" v-model="form.eventRunType" value="individual">
                  Individually
                </label>
                <label class="radio is-block">
                  <input type="radio" name="event-non-profit-is" v-model="form.eventRunType" value="team">
                  As part of a fundraising team
                </label>
                <small>To search for existing RunForGood groups, click <a href='#'>here</a>.</small>
              </div>
            </div>
          </transition>

          <transition name="slide-fade">
            <div class='event-ride-type-fields' v-if="form.eventRunType === 'individual'">
              <div class="columns form-column__wrapper  is-multiline" >
                <div class="column is-5 form-column__label-column">
                  <label :for="`input-email_${_uid}`" class="label">Name of the event:</label>
                </div>
                <div class="column is-6 form-column__label-column">
                  <input type='text' class='input' v-model='form.runName'>
                  <small>Click <a href='#'>here</a> see if the event is already at RunForGood</small>
                </div>
              </div>
              <div class="columns form-column__wrapper  is-multiline">
                <div class="column is-5 form-column__label-column">
                  <label :for="`input-email_${_uid}`" class="label">Link to the event:</label>
                </div>
                <div class="column is-6 form-column__label-column">
                  <input type='text' class='input' v-model='form.runLink'>
                </div>
              </div>
            </div>
          </transition>

          <transition name='slide-fade'>
            <div class="columns form-column__wrapper  is-multiline" v-if="form.eventRunType === 'team'">
              <div class="column is-5 form-column__label-column">
                <label :for="`input-email_${_uid}`" class="label">Is this team:</label>
              </div>
              <div class="column form-column__label-column">
                <label class="radio is-block">
                  <input type="radio" name="event-team-non-profit-is" v-model="form.eventRunTeamType" value="public">
                  Open to the public (anyone can join)   
                </label>
                <label class="radio is-block">
                  <input type="radio" name="event-team-non-profit-is" v-model="form.eventRunTeamType" value="private">
                  Private (by invitation only)
                </label>
                <small>To search for existing RunForGood groups, click here. <a href='#'>here</a>.</small>
              </div>
            </div>
          </transition>

          <transition name="slide-fade">
            <div class='event-ride-type-fields'  v-if="form.eventRunTeamType">
              <div class="columns form-column__wrapper  is-multiline">
                <div class="column is-5 form-column__label-column">
                  <label :for="`input-email_${_uid}`" class="label">Name of the event:</label>
                </div>
                <div class="column is-6 form-column__label-column">
                  <input type='text' class='input' v-model='form.runName'>
                  <small>Click <a href='#'>here</a> see if the event is already at RunForGood</small>
                </div>
              </div>
              <div class="columns form-column__wrapper  is-multiline">
                <div class="column is-5 form-column__label-column">
                  <label :for="`input-email_${_uid}`" class="label">Link to the event:</label>
                </div>
                <div class="column is-6 form-column__label-column">
                  <input type='text' class='input' v-model='form.runLink'>
                </div>
              </div>
              <div class="columns form-column__wrapper  is-multiline">
                <div class="column is-5 form-column__label-column">
                  <label :for="`input-email_${_uid}`" class="label">Choose a team name::</label>
                </div>
                <div class="column is-6 form-column__label-column">
                  <input type='text' class='input' v-model='form.rideLink'>
                  <br />
                  <small class='is-block'>Example: The Fun Running Bunch.</small>
                  <small class='is-block'>If you're joining a team that is already at RunForGood, click <a href='#'>here</a> to find it. </small>
                </div>
              </div>
            </div>
          </transition>

          <transition name="slide-fade">
            <div class="columns form-column__wrapper  is-multiline" v-if="form.runType">
              <div class="column is-5 form-column__label-column">
              </div>
              <div class="column form-column__label-column">
                <small>You can change your selection later.</small>
              </div>
            </div>
          </transition>

          <button
            class="button is-success is-large"
            type="submit"
            @click.prevent="validateSubmit()"
          >Continue</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"

export default {
  props: ["submitButtonLabel", "enableNonprofitSearch", "bubbles"],
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    Icons,
    ComboBox: () => import("Components/general/ComboBox.vue"),
    NonprofitAjaxSearch: () => import("Components/general/NonprofitAjaxSearch.vue")
  },
  mounted () {
    this.canRender = true
    let storedForm = window.localStorage.getItem("nonprofitForm")
    if (storedForm) {
      this.form = JSON.parse(storedForm)
    }
  },
  data () {
    return {
      canRender: false,
      form: {},
      errorMessage: "",
      nonprofitErrorMessage: "",
      nonprofitIsErrorMessage: "",
      hoursErrorMessage: "",
      targetNonprofitErrorMessage: ""
    }
  },
  /**
   * TODO: validate form, submit data to api, display thank you or error dialog.
   */
  methods: {
    setNonprofit($event) {
      console.log($event)
    },

    onFormValuesChange () {
      if (this.form.runType && this.form.runType !== 'own') {
        this.form.ownRunType = null
        this.form.ownGroupRunType = null
      }
    }
  },

  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    }
  },

  watch: {
    form: {
      deep: true,
      handler: 'onFormValuesChange',
    },
  },
}
</script>

<style scoped lang="scss">
.form-column {
  &__wrapper {
    margin-top: 0;
    @include tablet {
      line-height: 42px;
    }

    small {
      line-height: 1em;
    }

    .column {
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 5px;
      @include tablet {
        margin-bottom: 0;
      }
    }
  }
  &__label-column {
    text-align: left;
    .label {
    }
    .radio {
      display: block;
      margin-bottom: .875em;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    small {
      line-height: 1.5em;
      margin-top: 1em;
    }
  }
  &__input-column {

  }
  &__button-column {
    .button {
      display: block;
      width: 100%;
      border-radius: 20px !important;
    }
  }
  &__extra-padded {
    margin-bottom: 35px;
  }
  &__left-padded {
    padding-left: 80px;
    padding-right: 0;
    margin-right: 0;
    margin-left: 0;
  }
}

.inline-field {
  display: inline-block;
  margin: 0 5px 10px;
  width: 65px;
}

.radio-fields {
  display: block;
}

.page-wrapper {
  background-color: $white;
  color: #363636;
  text-align: center;
}

h1 {
  color: $color-emphasis;
  margin-bottom: 40px;
}

.combo-wrapper {
  justify-content: center;
  max-width: $max-combo-wrapper-width;
  margin: 0 auto;

  @include tablet {
    display: flex;
    padding: 0 7%;
  }
}

.form-wrapper {
  max-width: 900px;
  margin: 20px auto 0;

  button[type=submit] {
    margin: 30px 0 30px;
  }

  label {
    font-size: 20px;
  }

  input,
  button,
  .button {
    font-size: 18px;
  }
}

.help {
  color: $color-medium-gray;
  font-style: italic;
  font-size: 17px;

  @include tablet {
    text-align: left;
  }
}

.pad-more {
  margin-top: 20px;
}

.label {
  justify-content: flex-start;
  align-items: flex-start;
}
.is-padded-top {
  margin-top: 1em;
}
.is-pulled-left {
  text-align: left;
}

.bubbles-wrapper {
  @include tablet {
    padding: 0 2%;
  }
}


.input-wrapper .input-icon {
  @include mobile {
    top: 11px;
  }
  top: 5px;
}

.radio + .radio {
  margin-left: 0;
}
</style>
