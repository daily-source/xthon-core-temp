<template>
  <div class="page-wrapper">
    <NewRegisterOrLoginModal
      layout="comment"
      :state="showLoginModal"
      v-on:logged:in="closeLoginModal()"
      v-on:modal:close="closeLoginModal()"
    >
      <div slot="heading">You're almost there</div>
      <div slot="intro">
        <p class="is-centered">To create your fundraiser, you need to sign up for a free account or log in if you have already one.</p>
      </div>
    </NewRegisterOrLoginModal>
    <slot name="heading"><h1>Change the world in 3 easy steps:</h1></slot>
    <div class="container">
      <div class="columns combo-wrapper is-multiline bubbles-wrapper">
        <ComboBox iconsrc="/public/images/check.png" duplicate="false" :large="true">
        </ComboBox>
        <ComboBox iconsrc="/public/images/invite.png" duplicate="false" :large="true">
        </ComboBox>
        <ComboBox iconsrc="/public/images/act.png" duplicate="false" :large="true">
        </ComboBox>
      </div>
    </div>
    <div class="container">
      <div class="form-wrapper">
        <section class="form-section">
          <div class="columns is-multiline row-wrapper">
            <div class="column is-6-tablet inputLabel"><label>Donations will go to this nonprofit:</label></div>
            <NonprofitAjaxSearch
              v-if="canRender"
              v-on:selected="setNonprofit($event)"
              :default-value="getDefaultNonprofit()"
              :standalone="false"
            ></NonprofitAjaxSearch>
            <transition name="slide-fade">
              <div class="column is-6-tablet is-offset-6-tablet editable-error-message-wrapper" v-if="nonprofitErrorMessage">
                <span class="editable-error-message">{{nonprofitErrorMessage}}</span>
              </div>
            </transition>
          </div>
          <div class="columns is-multiline row-wrapper">
            <div class="column is-6-tablet inputLabel"><label>Donation dates:</label></div>
            <Calendar
              type="date"
              show-header="false"
              show-footer="false"
              is-range="true"
              label-from="Start"
              label-to="End"
              :min-date="today() | formatDate"
              v-on:updateDates="updateDates($event)"
              :start-date="form.dates ? new Date(form.dates.start) : null"
              :end-date="form.dates ? new Date(form.dates.end) : null"
              date-format="MM/DD/YYYY"
              :close-on-select="false"
              ref="datePicker"
            ></Calendar>
            <transition name="slide-fade">
              <div class="column is-6-tablet is-offset-6-tablet editable-error-message-wrapper" v-if="dateErrorMessage">
                <span class="editable-error-message">{{dateErrorMessage}}</span>
              </div>
            </transition>
          </div>
          <div class="columns is-multiline row-wrapper">
            <div class="column is-6-tablet inputLabel"><label>Running for:</label></div>
            <div class="column is-centered nonprofit-total-days-wrapper inputDaysAndGoalAndHours"><span>{{form.totalDays | numberToDays}}</span></div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-6-tablet inputLabel"><label>Goal:</label></div>
            <div class="column is-centered slider-wrapper">
              <div class="custom-control--slider inputDaysAndGoalAndHours">
                <span>{{form.goal | centsToUsd}}</span>
                <Slider
                  class="slider coloredSlider"
                  step="500"
                  min="20000"
                  max="300000"
                  :initValue="form.goal ? form.goal.toString() : null"
                  v-on:updateVal="updateGoal($event)"
                  ref="goal"
                  :colored="true"
                ></Slider>
                <transition name="slide-fade">
                  <div class="editable-error-message-wrapper" v-if="goalErrorMessage">
                    <span class="editable-error-message">{{goalErrorMessage}}</span>
                  </div>
                </transition>
              </div>
            </div>
          </div>
          <div class="columns is-multiline row-wrapper">
            <div class="column is-6-tablet inputLabel"><label>Name of the fundraiser</label></div>
            <div class="column is-centered fundraiser-name-wrapper">
              <input :autocomplete="Math.random()" class="input-editable-value" type="text" name="fundraiser-name" placeholder="Fundraiser's name" v-model="form.name">
            </div>
            <transition name="slide-fade">
              <div class="column is-6-tablet is-offset-6-tablet editable-error-message-wrapper" v-if="nameErrorMessage">
                <span class="editable-error-message">{{nameErrorMessage}}</span>
              </div>
            </transition>
          </div>
          <div class="columns is-multiline">
            <div class="column is-6-tablet inputLabel"><label>I will volunteer:</label></div>
            <div class="column is-centered slider-wrapper">
              <div class="custom-control--slider inputDaysAndGoalAndHours">
                <span class="inputDaysAndGoalAndHours">{{form.hours | numberToHours}}</span>
                <Slider
                  class="slider"
                  step="1"
                  min="10"
                  max="500"
                  :initValue="form.hours ? form.hours.toString() : null"
                  v-on:updateVal="updateHours($event)"
                  ref="hours"
                ></Slider>
                <transition name="slide-fade">
                  <div class="editable-error-message-wrapper" v-if="hoursErrorMessage">
                    <span class="editable-error-message">{{hoursErrorMessage}}</span>
                  </div>
                </transition>
              </div>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-6-tablet inputLabel"><label></label></div>
            <div class="column" style="padding: 0;">
              <div class="column has-text-left">
                <input type="radio" name="non-profit-is" v-model="form.nonprofitIs" value="same">
                same nonprofit as above
              </div>
              <div class="column has-text-left">
                <input type="radio" name="non-profit-is" v-model="form.nonprofitIs" value="different">
                a different nonprofit:
                <transition name="fade">
                  <div class="column has-text-left" style="padding-left: 0; padding-right: 0;" v-if="form.nonprofitIs === 'different'">
                    <input class="input-editable-value" type="text" name="project_action" placeholder="Enter the name of a nonprofit" v-model="form.differentNonprofit">
                  </div>
                </transition>
                <transition name="slide-fade">
                  <div class="column editable-error-message-wrapper" style="padding-left: 0; padding-right: 0; padding-bottom: 0;" 
                    v-if="form.nonprofitIs === 'different' && targetNonprofitErrorMessage"
                  ><span class="editable-error-message">{{targetNonprofitErrorMessage}}</span></div>
                </transition>
              </div>
              <div class="column has-text-left">
                <input type="radio" name="non-profit-is" v-model="form.nonprofitIs" value="independent">
                independent service:
                <transition name="fade">
                  <div class="column has-text-left" style="padding-left: 0; padding-right: 0;" v-if="form.nonprofitIs === 'independent'">
                    <input class="input-editable-value" type="text" name="project_action" placeholder="Enter what you will be doing" v-model="form.independentNonprofit">
                  </div>
                </transition>
                <transition name="slide-fade">
                  <div class="column editable-error-message-wrapper" style="padding-left: 0; padding-right: 0;padding-bottom: 0;"
                    v-if="form.nonprofitIs === 'independent' && targetNonprofitErrorMessage"
                  ><span class="editable-error-message">{{targetNonprofitErrorMessage}}</span></div>
                </transition>
              </div>
              <transition name="slide-fade">
                <div class="column editable-error-message-wrapper" v-if="nonprofitIsErrorMessage">
                  <span class="editable-error-message">{{nonprofitIsErrorMessage}}</span>
                </div>
              </transition>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-6-tablet inputLabel"><label></label></div>
            <p class="column help">To find volunteer opportunities, <a rel="noopener" href="http://aqua.dailysource.org/donation/helpcreatethis" target="_blank">click here</a></p>
          </div>
          <div class="form-submit-wrapper">
            <button
              class="button is-success"
              @click.prevent="validateSubmit()"
              id="form-action"
              :disabled="submitButtonDisabled"
              >{{submitButtonLabel}}</button>
          </div>
          <div
            key="error-block"
            v-if="loggedIn && (createStatus === 'error')"
            class="message"
          >
            <h4 class="has-text-centered">There was an error submitting the form. Please try again.</h4>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: ["submitButtonLabel"],
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    ComboBox: () => import("Components/general/ComboBox.vue"),
    Calendar: () => import("Components/input/Calendar.vue"),
    Slider: () => import("Components/input/InputSlider.vue"),
    NonprofitAjaxSearch: () => import("Components/general/NonprofitAjaxSearch.vue"),
    UserDialog: () => import("Components/general/UserDialog.vue"),
    NewRegisterOrLoginModal: () => import("Components/general/NewRegisterOrLoginModal.vue")
  },
  mounted () {
    this.canRender = true
    let storedForm = window.localStorage.getItem("nonprofitForm")
    if (storedForm) {
      this.form = JSON.parse(storedForm)
    }

    // We scroll to the end of the form if there's a pending action
    var triggerAction = localStorage.getItem("action_to_trigger")
    if (triggerAction === "submit:form") {
      localStorage.removeItem("action_to_trigger")
      setTimeout(() => {
        // action found, scroll to the form end
        const target = "#form-action"
        if (target) {
          this.$scrollTo(target, { offset: -200 })
        }
      }, 2350)
    }
  },
  data () {
    return {
      form: {
        totalDays: 0,
        goal: 0,
        hours: 0,
        nonprofitIs: "same"
      },
      canRender: false,
      nonprofitErrorMessage: "",
      nonprofitIsErrorMessage: "",
      dateErrorMessage: "",
      goalErrorMessage: "",
      nameErrorMessage: "",
      hoursErrorMessage: "",
      targetNonprofitErrorMessage: "",
      showLoginModal: false,
      submitButtonDisabled: true,
      createStatus: ""
    }
  },
  methods: {
    closeLoginModal () {
      this.showLoginModal = false
    },
    today () {
      var today = new Date();
      return today.getTime()
    },
    updateDates (dates) {
      this.form.dates = dates
      this.validateDates()
      this.validateForm()
      this.syncFormWithLocalStorage()
    },
    updateGoal (goal) {
      Vue.set(this.form, 'goal', parseInt(goal))
      this.validateGoal()
      this.validateForm()
      this.syncFormWithLocalStorage()
    },
    updateHours (hours) {
      this.form.hours = parseInt(hours)
      this.validateHours()
      this.validateForm()
      this.syncFormWithLocalStorage()
    },
    validateNonprofit () {
      const nonprofit = this.form.nonprofit
      if (!nonprofit) {
        this.nonprofitErrorMessage = "Please select a nonprofit to donate to."
        return false
      } else {
        this.nonprofitErrorMessage = ""
        return true
      }
    },
    getDefaultNonprofit () {
      if (this.form.nonprofit) {
        return this.form.nonprofit
      } else {
        return null
      }
    },
    validateDates () {
      const dates = this.form.dates
      this.getTotalDays()
      if (!(dates && dates.start && dates.end)) {
        this.dateErrorMessage = "Please enter the dates."
        return false
      } else {
        this.dateErrorMessage = ""
        return true
      }
    },
    validateGoal () {
      const goal = this.form.goal
      if (!(goal && parseInt(goal) > 0)) {
        this.goalErrorMessage = "Please set your fundraising goal."
        return false
      } else {
        this.goalErrorMessage = ""
        return true
      }
    },
    validateName () {
      const name = this.form.name
      if (!name) {
        this.nameErrorMessage = "Please enter a name for this fundraiser."
        return false
      } else {
        this.nameErrorMessage = ""
        return true
      }
    },
    validateHours () {
      const hours = this.form.hours
      if (!(hours && parseInt(hours) > 0)) {
        this.hoursErrorMessage = "The number of hours is required."
        return false
      } else {
        this.hoursErrorMessage = ""
        return true
      }
    },
    getTotalDays () {
      const dates = this.form.dates
      if ( dates && dates.start && dates.end) {
        var endObj = new Date(dates.end)
        var startObj = new Date(dates.start)
        var diff = (endObj.getTime() - startObj.getTime()) / (1000 * 3600 * 24) + 1
        this.form.totalDays = diff
      } else {
        this.form.totalDays = 0
      }
    },
    validateNonprofitIs () {
      const nonprofitIs = this.form.nonprofitIs
      if (!nonprofitIs) {
        this.nonprofitIsErrorMessage = "Please choose one of the options above."
        return false
      } else {
        this.nonprofitIsErrorMessage = ""
        return true
      }
    },
    validateTargetNonprofit () {
      if (this.form.nonprofitIs === "different") {
        if (!this.form.differentNonprofit) {
          this.targetNonprofitErrorMessage = "This field is required."
          return false
        } else {
          this.targetNonprofitErrorMessage = ""
          return true
        }
      } else if (this.form.nonprofitIs === "independent") {
        if (!this.form.independentNonprofit) {
          this.targetNonprofitErrorMessage = "This field is required."
          return false
        } else {
          this.targetNonprofitErrorMessage = ""
          return true
        }
      } else {
        return true
      }
    },
    validateForm () {
      this.syncFormWithLocalStorage()
      if (this.validateNonprofit() && this.validateDates() && this.validateGoal() && this.validateName() && this.validateHours() && this.validateNonprofitIs() && this.validateTargetNonprofit()) {
        this.submitButtonDisabled = false
        return true
      } else {
        this.submitButtonDisabled = true
        return false
      }
    },
    validateSubmit () {
      if (!this.validateForm()) {
        return
      }
      if (this.isLoggedIn) {
        this.submitButtonDisabled = true
        this.$store.dispatch("SUBMIT_FUNDRAISER_FORM", { form: this.form })
          .then(data => {
            this.createStatus = ''
            this.clearFormLocalStorage()
            this.submitButtonDisabled = false
            // remove auto-triggered actions and redirection
            localStorage.removeItem("redirect_to_url")
            localStorage.removeItem("action_to_trigger")
            this.$emit('form:success', { id: data.data.id })
          })
          .catch(err => {
            this.createStatus = 'error'
            this.submitButtonDisabled = false
          })
      } else {
        this.showLoginModal = true
        this.userDialogHeading = "Almost there dude"
        this.userDialogMessage = "To create your fundraiser, you need to sign up for a free account or log in if you have already one."
        // prepare this component to trigger an action upon mounting
        localStorage.setItem("action_to_trigger", "submit:form")
        // remove the localstorage after the form has been submited
      }
    },
    setNonprofit (event) {
      this.form.nonprofit = event
      this.validateForm()
      this.syncFormWithLocalStorage()
    },
    syncFormWithLocalStorage () {
      window.localStorage.setItem("nonprofitForm", JSON.stringify(this.form))
    },
    clearFormLocalStorage () {
      window.localStorage.removeItem("nonprofitForm")
      /*this.form = {
        totalDays: 0,
        goal: 0,
        hours: 0,
        nonprofitIs: "same",
        dates: null
      }*/
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    isLoggedIn () {
      return this.$store.state.user.loggedIn
    }
  },
  watch: {
    "form.nonprofit": function (newObj) {
      this.validateNonprofit()
      this.validateForm()
      this.syncFormWithLocalStorage()
    },
    "form.dates": function (newVal) {
      this.validateDates()
      this.validateForm()
      this.syncFormWithLocalStorage()
    },
    "form.goal": function (newVal) {
      this.validateGoal()
      this.validateForm()
      this.syncFormWithLocalStorage()
    },
    "form.name": function (newVal) {
      this.validateName()
      this.validateForm()
      this.syncFormWithLocalStorage()
    },
    "form.hours": function (newVal) {
      this.validateHours()
      this.validateForm()
      this.syncFormWithLocalStorage()
    },
    "form.nonprofitIs": function (newVal) {
        this.validateTargetNonprofit()
        this.validateForm()
      this.syncFormWithLocalStorage()
    },
    "form.differentNonprofit": function (newObj) {
      this.validateTargetNonprofit()
      this.validateForm()
      this.syncFormWithLocalStorage()
    },
    "form.independentNonprofit": function (newObj) {
      this.validateTargetNonprofit()
      this.validateForm()
      this.syncFormWithLocalStorage()
    }
  }
}
</script>

<style scoped lang="scss">
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
  max-width: 760px;
  margin: 20px auto 0;
  color: #4a4a4a;
  button {
    font-size: 18px;
  }
}
.form-submit-wrapper {
  margin: 20px auto;
  text-align: center;
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
.bubbles-wrapper {
  @include tablet {
    padding: 0 2%;
  }
}
.editable-error-message-wrapper {
  text-align: left;
  margin-bottom: 0 !important;
  margin-top: -8px;
  .editable-error-message {
    font-style: normal !important;
    font-weight: 100;
    font-size: .8rem;
  }
}
.input-editable-value {
  width: 100%;
  font-size: inherit;
  font-weight: 100;
  line-height: 1.4;
  height: 34px;
  border: none;
  box-shadow: none;
  background: none;
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 4px;
  margin: 4px 0 0;
  padding: 0 7px;
}
.inputLabel {
  text-align: center;
  @include tablet {
    text-align: right !important;
  }
}
.inputDaysAndGoalAndHours {
  font-style: italic;
  font-weight: 100;
  text-align: center;
  @include tablet {
    text-align: left !important;
  }
}
.row-wrapper {
  align-items: center;
}
</style>
<style lang="scss">
.slider {
  padding: 0.4rem 0;
  input[type=range].slider {
    margin: 0;
  }
}
.coloredSlider input[type=range]::-webkit-slider-runnable-track {
  background: -webkit-linear-gradient(left, white 0%, $color-emphasis 66%, #ffa500 99.5%, rgba(60, 60, 60, 0.26) 100%) !important;
}
</style>