<template>
  <div class="centered is-gift-wrapper">
    <div v-if="fundraiser">
      <label class="checkbox" :for="`anonymous-donation_${_uid}`">
        <input type="checkbox" v-model="donation.isAnonymous" :id="`anonymous-donation_${_uid}`">
          Make donation anonymously
      </label>
    </div>
    <transition name="slide-fade" v-if="!donation.isAnonymous">
      <div class="columns form-column__wrapper form-column__extra-padded input-line comment-input-wrapper" v-if="fundraiser && fundraiser.User">
        <div class="column is-6 form-column__label-column input-label comment-input-label input-label">
          <label :for="`comment-textarea_${_uid}`" class="label">Add a comment to appear next to your donation on {{fundraiser.User.firstName}}'s page:</label>
        </div>
        <div class="column is-6 form-column__input-column">
          <div class="control input-wrapper customMargin">
            <textarea class="comment-input"
              :id="`comment-textarea_${_uid}`"
              name="comment"
              style="resize: none;"
              resize="none"
              rows="4"
              height="auto"
              placeholder=""
              v-model="donation.comment"
            ></textarea>
            <div class="small-text" v-if="userName">Commenting as {{userName}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["fundraiser"],
  data () {
    return {
      donation: {
        comment: "",
        isAnonymous: false
      }
    }
  },
  computed: {
    userName () {
      return this.$store.state.user.userName
    }
  },
  watch: {
    "donation.isAnonymous": function (newVal) {
      this.$emit("input:anonymous", newVal)
    },
    "donation.comment": function (newVal) {
      this.$emit("input:comment", newVal)
    }
  }
}
</script>

<style scoped lang="scss">
.is-gift-wrapper {
  margin-top: 10px;
  margin-bottom: 30px;
}

.comment-input-wrapper {
  margin: 10px 0;
}
.comment-input-label {
  //align-self: flex-start;
  .label {
    max-width: 250px;
    line-height: 1.2;
    text-align: center;
    @include tablet {
      text-align: right;
    }
  }
}
.comment-input {
  width: 100%;
  font-size: inherit;
  font-weight: 100;
  line-height: 1.4;
  border: none;
  box-shadow: none;
  background: none;
  border: 1px solid rgba(60,60,60,.26);
  border-radius: 4px;
  margin: 4px 0 0;
  padding: 0 7px;
  &:hover {
    cursor: pointer;
  }
}
.centered {
  text-align: center;
}
.input-wrapper {
  max-width: 200px;
}
.customMargin {
  margin: auto;
  @include tablet {
    margin-left: 0;
  }
}
</style>