<template>
  <div class="editable__field">
    <div class="editable__field-value-container" v-if='!editOn'>
      <p class='editable__field-value'>
        {{ modelValue }}
      </p>
    </div>
    <div class="editable__field-input-container" v-if='editOn'>
      <textarea 
        ref='editableInput'
        class='editable__field-input'
        v-model='modelValue'
      ></textarea>
    </div>
    <button  
      class='button is-clear is-paddingless is-text edit-button'
      @click='toggleEdit()'
    >
      <Icons 
        :icon='editOn ? "check-circle" : "edit"' 
        :iconwidth='34'
        :iconheight='34'
        :color='"#E2AB40"'
      />
    </button>
  </div>
</template>

<script>
import Icons from 'Components/general/Icons'

export default {
  name: 'InlineEditableField',

  props: {
    value: {
      type: String,
      required: false,
    }
  },

  components: {
    Icons,
  },

  data () {
    return {
      editOn: false,
    }
  },

  methods: {
    toggleEdit () {
      this.editOn = !this.editOn
      if(this.editOn) {
        this.$nextTick(() => {
          this.$refs.editableInput.focus()
        })
      }
    },
  },

  computed: {
    modelValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang='scss'>
  .editable__field {
    position: relative;
  }

  .button.edit-button {
    position: absolute;
    top: -10px;
    right: -1rem;
    border-radius: 100%;

    svg {
      box-shadow: 0 0 16px 2px rgba(0,0,0,.4) !important; 
      border-radius: 100%;
    }
  }

  .editable__field-value-container {
    min-height: $editable-field-container-min-height;
    margin-bottom: .875rem;

    .editable__field-value {
      margin-bottom: 0;
    }
  }

  .editable__field-input-container {
    min-height: $editable-field-container-min-height;
    margin-bottom: .875rem;
  }

  .editable__field-input {
    display: block;
    width: 100%;
    border: 0;
    border-bottom: 1px solid rgba($color-gray, .2);
    min-height: 30px;
    font-size: 1em;
    font-family: inherit !important;
    padding-top: .5em;
    padding-bottom: .5em;
  }
</style>
