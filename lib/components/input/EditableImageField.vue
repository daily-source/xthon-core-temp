<template>
    <div class="columns is-multiline is-mobile">
      <div class="column is-4-tablet is-11-mobile">
        <label :for="`input-editable_${_uid}`">{{label}}</label>
      </div>
      <div class="column is-5-tablet is-7-mobile">
        <div class="edition-trigger" v-if="!fieldIsOpen" @click="openEdition()">
          <img
            :src="avatar"
            v-if="avatar"
            width="200"
          />
          <avatar 
            :username="$store.state.user.firstname + ' ' + $store.state.user.lastname" 
            v-if="!avatar"
            :rounded="false"
          ></avatar>
        </div>
        <div class="edition-box" v-if="fieldIsOpen">
          <croppa
            v-model="myCroppa"
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
          <div class="control">
            <button class="button is-warning" @click="myCroppa.remove()">Remove</button>
            <button class="button is-success" @click="saveField()">Generate</button>
          </div>
          <div class="instructions" v-if="fieldIsOpen">
            <p>Move the picture around the frame to crop it. You can also scroll or pinch with two fingers to zoom.</p>
            <p>Click generate once ready to save the image.</p>
          </div>
        </div>
      </div>
      <div class="column is-3-tablet is-5-mobile is-pulled-right">
        <div class="action-icon-wrapper" @click="openEdition()" :class="{'hide-icon': fieldIsOpen}">
          <Icons icon="pencil" class="action-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
        </div>
        <div class="action-icon-wrapper" @click="saveField()" :class="{'hide-icon': !fieldIsOpen}">
          <Icons icon="check" class="action-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
        </div>
        <div class="action-icon-wrapper" @click="cancelEdition()" :class="{'hide-icon': !fieldIsOpen}" v-on:keyup.esc="cancelEdition()">
          <Icons icon="close-circle" class="action-icon" iconwidth="20px" iconheight="20px" color="#999"></Icons>
        </div>
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
  props: [ "label", "type", "avatar", "errorText"],
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
            this.errorMessage = this.errorText
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
</style>