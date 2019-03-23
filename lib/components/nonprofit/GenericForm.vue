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
              <label :for="`input-email_${_uid}`" class="label">Dropdown Menu:</label>
            </div>
            <div class="column is-5">
              <div class="field">
                <div class="control">
                  <div class="select is-primary">
                    <select>
                      <option value='' selected disabled>Please select</option>
                      <option value="Value 1">Value 1</option>
                      <option value="Value 2">Value 2</option>
                      <option value="Value 3">Value 3</option>
                      <option value="Value 4">Value 4 with a very large text</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="columns form-column__wrapper  is-multiline">
            <div class="column is-5 form-column__label-column">
              <label :for="`input-email_${_uid}`" class="label">How many miles will you ride:</label>
            </div>
            <div class="column is-5 form-column__input-column">
              <div class="control input-wrapper">
                <Icons icon="chart" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
                <input class="input" type="number" name="action" placeholder=""
                  :required="true"
                  v-model="form.howManyMiles"
                >
              </div>
            </div>
          </div> -->


          <div class="columns form-column__wrapper  is-multiline">
            <div class="column is-5 form-column__label-column">
              <label :for="`input-email_${_uid}`" class="label">Text Input:</label>
            </div>
            <div class="column is-5 form-column__input-column">
              <input class="input" type="text" name="action" placeholder="">
            </div>
          </div>

          <div class="columns form-column__wrapper  is-multiline">
            <div class="column is-5 form-column__label-column">
              <label :for="`input-email_${_uid}`" class="label">Text Input with placeholder:</label>
            </div>
            <div class="column is-5 form-column__input-column">
              <input class="input" type="text" name="action" placeholder="DEVELOPER: edit this text">
            </div>
          </div>
          
          <div class="columns form-column__wrapper  is-multiline">
            <div class="column is-5 form-column__label-column">
              <label :for="`input-email_${_uid}`" class="label">Text Input with icon:</label>
            </div>
            <div class="column is-5 form-column__input-column">
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
              <label :for="`input-email_${_uid}`" class="label">Text Input with icon and placeholder:</label>
            </div>
            <div class="column is-5 form-column__input-column">
              <div class="control input-wrapper">
                <Icons icon="location" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
                <input class="input" type="text" name="action" 
                  placeholder="Developer: edit this text"
                  :required="true"
                  v-model="form.endLocation"
                >
              </div>
            </div>
          </div>

          <div class="columns form-column__wrapper  is-multiline">
            <div class="column is-5 form-column__label-column">
              <label :for="`input-email_${_uid}`" class="label"># only entry with up/down arrows:</label>
            </div>
            <div class="column is-5 form-column__input-column">
              <input-pure-number
                v-model='form.sampleNumberInput'
              />
            </div>
          </div>

          <div class="columns form-column__wrapper  is-multiline">
            <div class="column is-5 form-column__label-column">
              <label :for="`input-email_${_uid}`" class="label">Same but with placeholder:</label>
            </div>
            <div class="column is-5 form-column__input-column">
              <input class="input" type="number" placeholder="Type number or use arrows">
            </div>
          </div>

          <div class="columns form-column__wrapper  is-multiline">
            <div class="column is-5 form-column__label-column">
              <label :for="`input-email_${_uid}`" class="label">Same but with placeholder + icon:</label>
            </div>
            <div class="column is-5 form-column__input-column">
              <div class="control input-wrapper">
                <Icons icon="chart" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
                <input class="input" type="Number" name="action" 
                  placeholder="Type number or use arrows"
                  :required="true"
                >
              </div>
            </div>
          </div>

          <div class="columns form-column__wrapper  is-multiline">
            <div class="column is-5 form-column__label-column">
              <label :for="`input-email_${_uid}`" class="label">Datepicker Input:</label>
            </div>
            <div class="column is-5 form-column__input-column">
              <div class="control input-wrapper">
                <Icons icon="calendar" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
                <datetime v-model="form.date1"></datetime>
              </div>
            </div>
          </div>

          <div class="columns form-column__wrapper  is-multiline">
            <div class="column is-5 form-column__label-column">
              <label :for="`input-email_${_uid}`" class="label">Datepicker Input with placeholder:</label>
            </div>
            <div class="column is-5 form-column__input-column">
              <div class="control input-wrapper">
                <Icons icon="calendar" class="input-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
                <datetime 
                  v-model="form.date2"
                  placeholder='Click to pick date'
                />
              </div>
            </div>
          </div>

          <div class="columns form-column__wrapper  is-multiline" v-if="enableNonprofitSearch">
            <div class="column is-5 form-column__label-column"><label class="label">Nonprofit Search:</label></div>
            <NonprofitAjaxSearch
              v-if="canRender"
              v-on:selected="setNonprofit($event)"
              :standalone="false"
              placeholder='Type to search for a nonprofit'
            ></NonprofitAjaxSearch>
          </div>

          <div class="columns form-column__wrapper  is-multiline" v-if="enableNonprofitSearch">
            <div class="column is-5 form-column__label-column"><label class="label">Checkboxes:</label></div>
            <div class="column is-5 form-column__label-column">
              <label class="checkbox">
                <input type="checkbox">
                Checkbox 1
              </label>
              <label class="checkbox">
                <input type="checkbox">
                Checkbox 2
              </label>
            </div>
          </div>

          <div class="columns form-column__wrapper  is-multiline" v-if="enableNonprofitSearch">
            <div class="column is-5 form-column__label-column"><label class="label">Radio in same row:</label></div>
            <div class="column is-5 form-column__label-column">
              <label class="radio">
                <input 
                  type="radio"
                  name='radio-same-row'
                  v-model='form.inlineRadio'
                  value='1'
                >
                Radio 1
              </label>
              <label class="radio">
                <input 
                  type="radio"
                  name='radio-same-row'
                  v-model='form.inlineRadio'
                  value='2'
                >
                Radio 2
              </label>
              <label class="radio">
                <input 
                  type="radio"
                  v-model='form.inlineRadio'
                  value='3'
                >
                Radio 3
              </label>
            </div>
          </div>

          <div class="columns form-column__wrapper is-multiline">
            <div class="column is-5 form-column__label-column"><label class="label">Sample radio inputs:</label></div>
            <div class="column is-5 form-column__label-column radio-blocks">
              <label class="radio">
                <input type="radio" name="sample-radio" v-model="form.sampleRadio" value="1">
                Radio 1
              </label>
              <label class="radio">
                <input type="radio" name="sample-radio" v-model="form.sampleRadio" value="2">
                Radio 2 - adds a field below it
              </label>
            </div>
          </div>


          <transition name="slide-fade">
            <div class="columns form-column__wrapper  is-multiline" v-if="form.sampleRadio === '2'">
              <div class="column is-5 form-column__label-column">
                <label :for="`input-email_${_uid}`" class="label">Name of the event</label>
              </div>
              <div class="column is-5 form-column__input-column">
                  <input class="input" type="text" name="action" placeholder=""
                    :required="true"
                    v-model="form.eventName"
                  >
              </div>
            </div>
          </transition>

          <div class="columns form-column__wrapper">
            <div class="column form-column__label-column">
              <label class="label">
                Radio groups:
                <!-- <div class="control inline-field">
                  <input class="input" type="number" min="0" max="9999" name="number-of-hours" placeholder="100" v-model="form.hours">
                </div>
                hours for: -->
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
                <input type="radio" name="non-profit-is" v-model="form.radioGroup" value="1">
                Radio 1
              </label>
            </div>
          </div>
          <div class="columns form-column__wrapper is-multiline">
            <div class="column is-5 form-column__label-column form-column__left-padded">
              <label class="radio">
                <input type="radio" name="non-profit-is" v-model="form.radioGroup" value="2">
                Radio 2 - adds inline field:
              </label>
            </div>
            <transition name="slide-fade">
              <div class="column is-7 form-column__input-column" v-if="form.radioGroup === '2'">
                <div class="control">
                  <input class="input" type="text" name="project_action" placeholder="DEVELOPER - edit this placeholder text" v-model="form.radioGroupSampleInput">
                </div>
              </div>
            </transition>
            <transition name="slide-fade">
              <div class="column is-7 is-offset-5 editable-error-message is-padded-top form-column__label-column"
                v-if="form.radioGroup === '2' && targetNonprofitErrorMessage"
              >{{targetNonprofitErrorMessage}}</div>
            </transition>

          </div>
          <div class="columns form-column__wrapper is-multiline">
            <div class="column is-5 form-column__label-column form-column__left-padded">
              <label class="radio">
                <input type="radio" name="non-profit-is" v-model="form.radioGroup" value="3">
                Radio 3 - adds inline field:
              </label>
            </div>
            <transition name="slide-fade">
              <div class="column is-7 form-column__input-column" v-if="form.radioGroup === '3'">
                <div class="control">
                  <input class="input" type="text" name="project_action" placeholder="DEVELOPER - edit this placeholder text" v-model="form.radioGroupSampleInput2">
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
import InputPureNumber from "Components/input/InputPureNumber"

export default {
  props: ["submitButtonLabel", "enableNonprofitSearch", "bubbles"],
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    Icons,
    InputPureNumber,
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
  max-width: 950px;
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

.radio-blocks {
  .radio + .radio {
    margin-left: 0;
  }
}

  .radio + .radio {
    margin-left: 1em;
  }

.checkbox + .checkbox {
  margin-left: 1em;
}

.radio,
.checkbox {
  line-height: 1.25;
  display: inline-flex;
  align-items: center;
  input {
    margin-right: .25em;
  }
}
</style>

<style lang="scss">
.explore__wrapper {
  .box-wrapper{
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
