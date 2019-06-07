<template>
    <div class="columns is-multiline is-mobile row-wrapper">
      <div class="column is-3-tablet is-11-mobile">
        <label :for="`input-editable_${_uid}`">{{label}}</label>
      </div>
      <div class="column is-5-tablet is-7-mobile">
        <div class="edition-trigger" v-if="!fieldIsOpen" @click="openEdition()">
          <img 
            :src="avatar"
            v-if="avatar"
            :width="imageSize"
          />
          <avatar 
            class="inline-image-item"
            :username="$store.state.user.data.firstName + ' ' + $store.state.user.data.lastName" 
            v-if="!avatar"
            :rounded="false"
            :size=imageSize
          ></avatar>
        </div>
        <div class="edition-box" v-if="fieldIsOpen">
          <croppa
            v-model="myCroppa"
            class="croppa-box"
            :initial-image="avatar || ''"
            :placeholder="'Select file'"
            :placeholder-font-size="20"
            :show-remove-button="false"
            canvas-color="#FFFFFF"
            v-on:keyup.enter="saveField()"
            v-on:new-image="errorMessage = ''"
          >
            <div slot="initial">Click here to upload a file</div>
          </croppa>
          <div class="instructions" v-if="fieldIsOpen">
            <p>Move the picture around the frame to crop it. You can also scroll or pinch with two fingers to zoom.</p>
            <p>Click save once ready to save the image.</p>
          </div>
        </div>
      </div>
      <div class="column is-4 editable-field-wrapper">
        <transition-group name="slide-fade">
          <button
            class="button is-primary button-edition"
            @click="openEdition()"
            v-if="!fieldIsOpen"
            key="edit"
          >Edit</button>
          <button
            class="button is-warning button-edition"
            @click="cancelEdition()"
            v-if="fieldIsOpen"
            key="cancel"
          >Cancel</button>
          <button
            class="button is-primary button-edition"
            @click="myCroppa.remove()"
            v-if="fieldIsOpen"
            key="clear"
          >Clear</button>
          <button
            class="button is-danger button-edition"
            @click="myCroppa.remove(); saveField()"
            v-if="fieldIsOpen"
            key="remove"
          >Remove</button>
          <button
            class="button is-success button-edition"
            @click="saveField()"
            v-if="fieldIsOpen"
            key="save"
          >Save</button>
        </transition-group>
      </div>
      <transition name="slide-fade">
        <div class="column is-11-mobile is-6-tablet is-offset-4-tablet editable-error-message-wrapper" v-if="errorMessage">
          <span class="editable-error-message">{{errorMessage}}</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"

export default {
  props: [ "label", "type", "avatar", "errorText", "imageSize" ],
  data () {
    return {
      fieldIsOpen: false,
      errorMessage: "",
      myCroppa: {}
    }
  },
  components: {
    Icons,
    Avatar: () => import("vue-avatar")
  },
  methods: {
    cancelEdition () {
      this.fieldIsOpen = false
      this.errorMessage = ""
    },
    openEdition () {
      this.fieldIsOpen = true
      this.errorMessage = ""
    },
    saveField () {
      this.myCroppa.generateBlob(
        blob => {
          if (!blob) {
            this.$emit("input:save", "")
            this.fieldIsOpen = false
            // this.errorMessage = this.errorText
          } else {
            this.$emit("input:save", this.myCroppa.generateDataUrl("image/jpeg", 0.8))
            this.fieldIsOpen = false
          }
        },
        "image/jpeg",
        0.8
      ) // 80% compressed jpeg file
    }
  }
}
</script>

<style lang="scss">
.croppa-container {
  border: 1px solid $color-light-gray;
  height: 200px;
  position: relative;
  display: inline-block;
  .icon {
    position: absolute !important;
  }
}
</style>

<style scoped lang="scss">
.edition-trigger {
  &:hover {
    cursor:pointer;
  }
}
.edition-box {
  .button {
    margin: 5px;
  }
}
.action-icon-wrapper {
  display: inline-block;
  padding: 0 3px;
  transition: opacity 0.1s ease-in-out;
}
.hide-icon {
  opacity: 0.4;
  &:hover {
    cursor: disabled;
  }
}
.is-pulled-right {
  text-align: right;
}
.button-edition {
  padding-top: 0.1em;
  padding-bottom: 0.1em;
  margin-right: 0.5em;
}
.row-wrapper {
  align-items: center;
}
.button-edition {
  padding-top: 0.1em;
  padding-bottom: 0.1em;
  margin-right: 0.5em;
  margin-bottom: 5px;
}
.row-wrapper {
  align-items: flex-start;
}
.inline-image-item {
  transition: filter 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    filter: brightness(70%);
  }
}
.croppa-box {
  background: $color-light-gray;
}
</style>