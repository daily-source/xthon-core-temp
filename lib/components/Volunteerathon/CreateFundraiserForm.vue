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
          <div class="columns form-column__wrapper is-multiline">
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
          <div class="columns form-column__wrapper is-multiline">
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
              v-on:clear="handleClear($event)"
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
          <div class="columns form-column__wrapper is-multiline">
            <div class="column is-6-tablet inputLabel"><label>Running for:</label></div>
            <div class="column is-centered nonprofit-total-days-wrapper inputDaysAndGoal"><span style="font-style: italic; font-weight: 100;">{{totalDays}}</span></div>
          </div>
          <div class="columns form-column__wrapper is-multiline">
            <div class="column is-6-tablet inputLabel"><label>Goal:</label></div>
            <Slider
              step="50"
              min="200"
              max="3000"
              is-circle="true"
              is-large="true"
              print-output="true"
              :goal="form.goal ? form.goal : null"
              v-on:updateGoal="updateGoal($event)"
              ref="goal"
            ></Slider>
            <transition name="slide-fade">
              <div class="column is-6-tablet is-offset-6-tablet editable-error-message-wrapper" v-if="goalErrorMessage">
                <span class="editable-error-message">{{goalErrorMessage}}</span>
              </div>
            </transition>
          </div>
          <div class="columns form-column__wrapper is-multiline">
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
          <div class="columns form-column__wrapper is-multiline">
            <div class="column is-6-tablet inputLabel"><label>Purpose</label></div>
            <div class="column is-centered fundraiser-name-wrapper">
              <textarea :autocomplete="Math.random()" class="input-editable-value" type="text" name="fundraiser-purpose" placeholder="Fundraiser's purpose" v-model="form.purpose" rows="4" cols="50" style="height: auto; resize:none;"></textarea>
            </div>
            <transition name="slide-fade">
              <div class="column is-6-tablet is-offset-6-tablet editable-error-message-wrapper" v-if="purposeErrorMessage">
                <span class="editable-error-message">{{purposeErrorMessage}}</span>
              </div>
            </transition>
          </div>
          <div class="columns form-column__wrapper is-multiline">
            <div class="column is-6-tablet inputLabel">
              <label class="label">I will volunteer
                <div class="control inline-field">
                  <input class="input" type="number" min="0" max="9999" name="number-of-hours" placeholder="100" v-model="form.hours">
                </div>
                hours for:
              </label>
              <transition name="slide-fade">
                <div class="editable-error-message" v-if="hoursErrorMessage">
                  {{hoursErrorMessage}}
                </div>
              </transition>
            </div>
          </div>
          <div class="columns form-column__wrapper">
            <div class="column is-6-tablet is-offset-3 has-text-left">
              <label class="radio">
                <input type="radio" name="non-profit-is" v-model="form.nonprofitIs" value="same">
                same nonprofit as above
              </label>
            </div>
          </div>
          <div class="columns form-column__wrapper is-multiline">
            <div class="column is-6-tablet is-offset-3 has-text-left">
              <label class="radio">
                <input type="radio" name="non-profit-is" v-model="form.nonprofitIs" value="different">
                a different nonprofit:
              </label>
            <transition name="fade">
              <div class="column is-6-tablet is-offset-3 has-text-left" v-if="form.nonprofitIs === 'different'">
                <div class="control">
                  <input class="input" type="text" name="project_action" placeholder="Enter name of a nonprofit" v-model="form.differentNonprofit">
                </div>
              </div>
            </transition>
            </div>
            <transition name="slide-fade">
              <div class="column is-7 is-offset-5 editable-error-message is-padded-top"
                v-if="form.nonprofitIs === 'different' && targetNonprofitErrorMessage"
              >{{targetNonprofitErrorMessage}}</div>
            </transition>

          </div>
          <div class="columns form-column__wrapper is-multiline">
            <div class="column is-6-tablet is-offset-3 has-text-left">
              <label class="radio">
                <input type="radio" name="non-profit-is" v-model="form.nonprofitIs" value="independent">
                independent service:
              </label>
            </div>
            <transition name="fade">
              <div class="column is-7 form-column__input-column" v-if="form.nonprofitIs === 'independent'">
                <div class="control">
                  <input class="input" type="text" name="project_action" placeholder="Enter what you will be doing" v-model="form.independentNonprofit">
                </div>
              </div>
            </transition>
            <transition name="slide-fade">
              <div class="column is-7 is-offset-5 editable-error-message is-padded-top"
                v-if="form.nonprofitIs === 'independent' && targetNonprofitErrorMessage"
              >{{targetNonprofitErrorMessage}}</div>
            </transition>
          </div>
          <div class="editable-error-message form-column__left-padded ">{{nonprofitIsErrorMessage}}</div>
          <p class="help pad-more">To find volunteer opportunities, <a rel="noopener" href="http://aqua.dailysource.org/donation/helpcreatethis" target="_blank">click here</a></p>
          <button
            class="button is-success is-large"
            type="submit"
            @click.prevent="validateSubmit()"
            id="form-action"
            :disabled="formIsEmpty"
            >{{submitButtonLabel}}</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
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
    this.clearFormLocalStorage() //TEMP, remove it so form properly saves
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
      form: {},
      canRender: false,
      nonprofitErrorMessage: "",
      nonprofitIsErrorMessage: "",
      dateErrorMessage: "",
      goalErrorMessage: "",
      nameErrorMessage: "",
      purposeErrorMessage: "",
      hoursErrorMessage: "",
      targetNonprofitErrorMessage: "",
      showLoginModal: false,
      totalDays: "0 days"
    }
  },
  /**
   * TODO: validate form, submit data to api, display thank you or error dialog.
   */
  methods: {
    validateForm () {

    },
    handleClear (event) {
      console.log('event: ', event)
    },
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
      this.validateAllFields()
      this.syncFormWithLocalStorage()
    },
    updateGoal (goal) {
      this.form.goal = parseInt(goal)
      this.validateGoal()
      this.validateAllFields()
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
        this.goalErrorMessage = "Please enter the goal."
        return false
      } else {
        this.goalErrorMessage = ""
        return true
      }
    },
    validateName () {
      const name = this.form.name
      if (!name) {
        this.nameErrorMessage = "Please enter the name."
        return false
      } else {
        this.nameErrorMessage = ""
        return true
      }
    },
    validatePurpose () {
      const purpose = this.form.purpose
      if (!(purpose && purpose.length >= 1)) {
        this.purposeErrorMessage = "Please enter the purpose."
        return false
      } else {
        this.purposeErrorMessage = ""
        return true
      }
    },
    getTotalDays () {
      const dates = this.form.dates
      if ( dates && dates.start && dates.end) {
        var endObj = new Date(dates.end)
        var startObj = new Date(dates.start)
        var diff = (endObj.getTime() - startObj.getTime()) / (1000 * 3600 * 24) + 1
        this.form.totalDays = diff+" days"
        if (diff === 1) this.form.totalDays = diff+" day"
      } else {
        this.form.totalDays = "0 days"
      }
      this.totalDays = this.form.totalDays
    },
    validateHours () {
      const hours = this.form.hours
      if (!hours) {
        this.hoursErrorMessage = "This field is required"
        return false
      } else {
        this.hoursErrorMessage = ""
        return true
      }
    },
    validateNonprofitIs () {
      const nonprofitIs = this.form.nonprofitIs
      console.log("validating nonrpfit", nonprofitIs)
      if (!nonprofitIs) {
        this.nonprofitIsErrorMessage = "Please choose one of the options above"
        return false
      } else {
        this.nonprofitIsErrorMessage = ""
        return true
      }
    },
    validateTargetNonprofit () {
      if (this.form.nonprofitIs === "different") {
        if (!this.form.differentNonprofit) {
          this.targetNonprofitErrorMessage = "This field is required"
          return false
        } else {
          this.targetNonprofitErrorMessage = ""
          return true
        }
      } else if (this.form.nonprofitIs === "independent") {
        if (!this.form.independentNonprofit) {
          this.targetNonprofitErrorMessage = "This field is required"
          return false
        } else {
          this.targetNonprofitErrorMessage = ""
          return true
        }
      } else {
        return true
      }
    },
    validateAllFields () {
      console.log("validating all fields", this.form)
      this.syncFormWithLocalStorage()
      if (this.validateNonprofit() && this.validateDates() && this.validateGoal() && this.validateName() && this.validatePurpose() && this.validateHours() && this.validateNonprofitIs() && this.validateTargetNonprofit()) {
        return true
      } else {
        return false
      }
    },
    validateSubmit () {
      if (!this.validateAllFields()) {
        return
      }
      if (this.isLoggedIn) {
        console.log("form: ", this.form)
        this.$store.dispatch("SUBMIT_NONPROFIT_FORM", { form: this.form })
          .then(data => {
            this.userDialogModal = false
            this.clearFormLocalStorage()

            // remove auto-triggered actions and redirection
            localStorage.removeItem("redirect_to_url")
            localStorage.removeItem("action_to_trigger")
          })
          .catch(err => {
            this.userDialogModal = false
            console.log("error: ", err)
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
      this.validateAllFields()
      this.syncFormWithLocalStorage()
    },
    syncFormWithLocalStorage () {
      window.localStorage.setItem("nonprofitForm", JSON.stringify(this.form))
    },
    clearFormLocalStorage () {
      window.localStorage.removeItem("nonprofitForm")
      this.form = {}
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    },
    formIsEmpty () {
      return Object.keys(this.form).length === 0
    },
    isLoggedIn () {
      return this.$store.state.user.loggedIn
    }
  },
  watch: {
    "form.nonprofit": function (newObj) {
      if (!this.formIsEmpty) {
        this.validateNonprofit()
        this.validateAllFields()
      }
      this.syncFormWithLocalStorage()
    },
    "form.dates": function (newVal) {
      if (!this.formIsEmpty) {
        this.validateDates()
        this.validateAllFields()
      }
      this.syncFormWithLocalStorage()
    },
    "form.goal": function (newVal) {
      if (!this.formIsEmpty) {
        this.validateGoal()
        this.validateAllFields()
      }
      this.syncFormWithLocalStorage()
    },
    "form.name": function (newVal) {
      if (!this.formIsEmpty) {
        this.validateName()
        this.validateAllFields()
      }
      this.syncFormWithLocalStorage()
    },
    "form.purpose": function (newVal) {
      if (!this.formIsEmpty) {
        this.validatePurpose()
        this.validateAllFields()
      }
      this.syncFormWithLocalStorage()
    },
    "form.hours": function (newVal) {
      if (!this.formIsEmpty) {
        this.validateHours()
        this.validateAllFields()
      }
      this.syncFormWithLocalStorage()
    },
    "form.nonprofitIs": function (newVal) {
      if (!this.formIsEmpty) {
        this.validateTargetNonprofit()
        this.validateAllFields()
      }
      this.syncFormWithLocalStorage()
    },
    "form.differentNonprofit": function (newObj) {
      this.syncFormWithLocalStorage()
    },
    "form.independentNonprofit": function (newObj) {
      this.syncFormWithLocalStorage()
    }
  }
}
</script>

<style scoped lang="scss">
.form-column {
  &__wrapper {
    margin-top: 0;
    @include tablet {
      line-height: 42px;
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
  max-width: 760px;
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
.editable-error-message-wrapper {
  text-align: left;
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
</style>
<style lang="scss">
  .inputDaysAndGoal {
  text-align: center;
  @include tablet {
    text-align: left !important;
  }
}
</style>