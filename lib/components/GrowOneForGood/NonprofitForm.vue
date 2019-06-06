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
       <ComboBox :iconsrc="require('Public/img/check.png')" duplicate="false" :large="true">
        </ComboBox>
        <ComboBox :iconsrc="require('Public/img/invite.png')" duplicate="false" :large="true">
        </ComboBox>
        <ComboBox :iconsrc="require('Public/img/act.png')" duplicate="false" :large="true">
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
              :placeholder='nonprofitSearchPlaceholder'
              :default-value="getDefaultNonprofit()"
              :standalone="false"
            ></NonprofitAjaxSearch>
            <transition name="slide-fade">
              <div class="column is-5 is-offset-5 is-pulled-left" v-if="nonprofitErrorMessage">
                <span class="editable-error-message">{{nonprofitErrorMessage}}</span>
              </div>
            </transition>
          </div>
          <div class="nonprofit-form">
            <div class="columns form-column__wrapper form-column__extra-padded is-multiline">
              <div class="column form-column__label-column is-6">
                <label for="beard-type">Type of beard or moustache I will grow:</label>
              </div>
              <div class="column">
                <div class="select nonprofit-form__beard-type is-fullwidth">
                  <select name="beard-type" id="beard-type">
                    <option value="" disabled>Select a beard type</option>
                    <option value="1">Full Beard</option>
                    <option value="2">French Fork</option>
                    <option value="1">Ducktail</option>
                    <option value="1">Verdi</option>
                    <option value="1">Garibaldi</option>
                    <option value="1">Bandholdz</option>
                    <option value="1">Mutton Chops</option>
                    <option value="1">Chin Curtain</option>
                    <option value="1">Extended Goatee</option>
                    <option value="1">Zappa</option>
                    <option value="1">Anchor</option>
                    <option value="1">Walrus</option>
                    <option value="1">Van Dyke</option>
                    <option value="1">Handlebar</option>
                    <option value="1">Hulihee</option>
                    <option value="1">Goatee</option>
                    <option value="1">Circle Beard</option>
                    <option value="1">Balbo</option>
                    <option value="1">Painters Brush</option>
                    <option value="1">Chevron</option>
                    <option value="1">Handlebar</option>
                    <option value="1">Imperial</option>
                    <option value="1">Lampshade</option>
                    <option value="1">Zorro</option>
                    <option value="1">Villain</option>
                    <option value="1">Fu Manchu</option>
                    <option value="1">English</option>
                    <option value="1">Dali</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="columns form-column__wrapper form-column__extra-padded is-multiline">
              <div class="column form-column__label-column is-6">
                <label for="beard-type">Date I will start growing it:</label>
              </div>
              <div class="column">
                <div class="control input-wrapper">
                  <Icons icon="calendar" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
                  <datetime 
                    v-model="form.date2"
                    placeholder='Click to pick date'
                  />
                </div>
              </div>
            </div>
          </div>
                    
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
import Icons from 'Components/general/Icons'

export default {
  props: ["submitButtonLabel", 'showAlsoSection', 'nonprofitSearchPlaceholder'],
  props: {
    submitButtonLabel: {
      type: String,
      required: false,
      default: 'Submit',
    },
    showAlsoSection: {
      type: Boolean,
      required: false,
      default: true,
    },
    nonprofitSearchPlaceholder: {
      type: String,
      required: false,
      default: "Type to search for nonprofits"
    },
  },
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    Icons,
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
    margin-bottom: 14px;
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
  max-width: 850px;
  margin: 20px auto 0;

  .form-column__label-column {
    max-width: 415px;
    flex-basis: 415px;
  }

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

.form-details {
  text-align: left;
}

.nonprofit-form {
  text-align: left;

  > .column {
    align-items: center;
  }

  .input-icon {
    top: 6px;
  }
}
</style>

<style lang="scss">
.explore__wrapper {
  .box-wrapper {
    max-width: 33% !important;
    min-width: 0 !important;
    padding-left: 45px;
    padding-right: 45px;
  }
}
</style>

