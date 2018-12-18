<template>
  <div class="page-wrapper">
    <UserDialog
      spinner="true"
      :state="userDialogModal"
      :diseable-close= "userDialogDisableClose"
      v-on:modal:close="closeUserDialog()"
    >
      <div slot="header">{{userDialogHeading}}</div> 
      <div slot="content"><p>{{userDialogMessage}}</p></div> 
    </UserDialog>

    <DonatePasswordModal
      :modal-active="accountNeededModal"
      parent="nonprofit"
      nonprofit="nonprofit"
      email="donation.email"
      donation="donation"
      v-on:close:modal="accountNeededModal = false"
      v-on:success="authorize(); submitDonate()"
      v-on:error="unauthorize()"
    ></DonatePasswordModal>

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
        <form v-on:keyup.enter="validateSubmit()">
          <div class="columns form-column__wrapper form-column__extra-padded is-multiline">
            <div class="column is-5 form-column__label-column"><label class="label">Donations will go to this nonprofit:</label></div>
            <NonprofitAjaxSearch
              v-if="canRender"
              v-on:selected="setNonprofit($event)"
              :default-value="getDefaultNonprofit()"
              :standalone="false"
            ></NonprofitAjaxSearch>
            <transition name="slide-fade">
              <div class="column is-5 is-offset-5 is-pulled-left" v-if="nonprofitErrorMessage">
                <span class="editable-error-message">{{nonprofitErrorMessage}}</span>
              </div>
            </transition>
          </div>
          <div class="columns form-column__wrapper">
            <div class="column form-column__label-column">
              <label class="label">I will volunteer
                <div class="control inline-field">
                  <input class="input" type="number" min="0" max="9999" name="number-of-hours" placeholder="100" v-model="form.hours">
                </div>
                hours for:
              </label>
              <transition name="slide-fade">
                <div class="editable-error-message form-column__label-column" v-if="hoursErrorMessage">
                  {{hoursErrorMessage}}
                </div>
              </transition>
            </div>
          </div>
          <div class="columns form-column__wrapper">
            <div class="column is-12 form-column__label-column form-column__left-padded">
              <label class="radio">
                <input type="radio" name="non-profit-is" v-model="form.nonprofitIs" value="same">
                same nonprofit as above
              </label>
            </div>
          </div>
          <div class="columns form-column__wrapper is-multiline">
            <div class="column is-5 form-column__label-column form-column__left-padded">
              <label class="radio">
                <input type="radio" name="non-profit-is" v-model="form.nonprofitIs" value="different">
                a different nonprofit:
              </label>
            </div>
            <transition name="fade">
              <div class="column is-7 form-column__input-column" v-if="form.nonprofitIs === 'different'">
                <div class="control">
                  <input class="input" type="text" name="project_action" placeholder="Enter name of a nonprofit" v-model="form.differentNonprofit">
                </div>
              </div>
            </transition>
            <transition name="slide-fade">
              <div class="column is-7 is-offset-5 editable-error-message is-padded-top form-column__label-column"
                v-if="form.nonprofitIs === 'different' && targetNonprofitErrorMessage"
              >{{targetNonprofitErrorMessage}}</div>
            </transition>

          </div>
          <div class="columns form-column__wrapper is-multiline">
            <div class="column is-5 form-column__label-column form-column__left-padded">
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
              <div class="column is-7 is-offset-5 editable-error-message is-padded-top form-column__label-column"
                v-if="form.nonprofitIs === 'independent' && targetNonprofitErrorMessage"
              >{{targetNonprofitErrorMessage}}</div>
            </transition>
          </div>
          <div class="editable-error-message form-column__label-column form-column__left-padded ">{{nonprofitIsErrorMessage}}</div>
          <p class="help pad-more">To find volunteer opportunities, <a rel="noopener" href="http://aqua.dailysource.org/donation/helpcreatethis" target="_blank">click here</a></p>
          <button
            class="button is-success is-large"
            type="submit"
            @click.prevent="validateSubmit()"
            >{{submitButtonLabel}}</button>
        </form>
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
    NonprofitAjaxSearch: () => import("Components/general/NonprofitAjaxSearch.vue"),
    UserDialog: () => import("Components/general/UserDialog.vue"),
    DonatePasswordModal: () => import("Components/donate/DonatePasswordModal.vue")
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
      nonprofitErrorMessage: "",
      nonprofitIsErrorMessage: "",
      hoursErrorMessage: "",
      targetNonprofitErrorMessage: "",
      userDialogModal: false,
      userDialogHeading: "Processing...",
      userDialogMessage: "",
      userDialogSpinner: false,
      userDialogDisableClose: false,
      accountNeededModal: false
    }
  },
  /**
   * TODO: validate form, submit data to api, display thank you or error dialog.
   */
  methods: {
    validateNonprofit () {
      const nonprofit = this.form.nonprofit
      if (!nonprofit) {
        this.nonprofitErrorMessage = "Please select a nonprofit to donate to"
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
      if (this.validateNonprofit() && this.validateHours() && this.validateNonprofitIs() && this.validateTargetNonprofit()) {
        return true
      } else {
        return false
      }
    },
    validateSubmit () {
      if (this.validateAllFields()) {
        this.userDialogModal = true
        this.submitData()
      }
    },
    submitData () {
      const form = this.form
      this.$store.dispatch("SUBMIT_NONPROFIT_FORM", { form: form })
        .then(data => {
          this.userDialogModal = false
          this.clearFormLocalStorage()
          console.log("success: ", data)
        })
        .catch(err => {
          this.userDialogModal = false
          console.log("error: ", err)
        })
    },
    setNonprofit (event) {
      this.form.nonprofit = event
      this.validateNonprofit()
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
    }
  },
  watch: {
    "form.hours": function (newVal) {
      this.validateHours()
      this.syncFormWithLocalStorage()
    },
    "form.nonprofitIs": function (newVal) {
      this.validateTargetNonprofit()
      this.validateNonprofitIs()
      this.syncFormWithLocalStorage()
    },
    "form.nonprofit": function (newObj) {
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

</style>
