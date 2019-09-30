<template>
  <div class="container is-fluid white-bg fundraiser-header__wrapper" v-if="fundraiser.User">
    <div class="fundraiser-header">
      <h1 class="fundraiser-header__title">
        <InlineFieldEditor
          type="text"
          :remove-returns="true"
          ref="fundraiserAbout"
          :allow-empty="false"
          error-text="This field can't be empty"
          :value="fundraiser.name"
          :edition-is-enabled="editing"
          :disableAutoComplete="true"
          layout="title"
          placeholder="Add a description."
          location="fundraiser.name"
        ></InlineFieldEditor>
      </h1>
      <div class="fundraiser-nonprofit" v-if="!editing">
        <h2 class="fundraiser-nonprofit__subtitle">A fundraiser supporting the nonprofit:
          <figure class="fundraiser-nonprofit__logo" v-if="fundraiser.Nonprofit">
            <img class="fundraiser-nonprofit__img" :src="fundraiser.Nonprofit.logo_square" alt="">
          </figure>
          <router-link :to="`/nonprofit/${fundraiser.Nonprofit.EIN}`" v-html="fundraiser.Nonprofit.name || fundraiser.Nonprofit.NAME"></router-link>
        </h2>
      </div>
      <div v-if="editing" class="is-centered">
        <a class="button is-light is-rounded is-medium" @click="closeEdition()">Stop editing</a>
        <div style="text-align: center;">
          <span>Status: </span>
          <span :class="{ 'draftColor': fundraiser.status === 'draft', 'pendingColor': fundraiser.status === 'pending', 'publishedColor': fundraiser.status === 'published', 'blockedColor': fundraiser.status === 'blocked' }">{{fundraiser.status}}</span>
        </div>
        <a class="button is-danger is-rounded is-medium" @click="shouldPublish" v-if="userCan('edit:fundraiser-status') && fundraiser.status === 'draft'">Publish my Fundraiser</a>
        <em v-if="fundraiser.status === 'pending'">And admin will check your fundraiser before being published.</em>
        <em v-if="fundraiser.status === 'blocked'">If you think this is an error, contact an admin please.</em>
      </div>
    </div>
  </div>
</template>

<script>
import * as userUtils from "Core/util/userUtils.js"
export default {
  props: [ "fundraiser", "editing" ],
  components: {
    InlineFieldEditor: () => import("Components/input/InlineFieldEditor.vue")
  },
  methods: {
    userCan(per) {
      return userUtils.userCan(per, this.$store.state.user)
    },
    closeEdition () {
      this.$emit("edit:close")
    },
    shouldPublish () {
      if (confirm("Are you sure you want to publish? There's no going back.")) {
        this.emitStatus ('pending')
      }
    },
    emitStatus (status) {
      this.$emit("status:selected", status)
    }
  },
}
</script>

<style scoped lang="scss">
.white-bg.is-fluid {
  padding-bottom: 0 !important;
}

.fundraiser-header {
  &__title {
    color: $color-text;
    text-align: center;
    margin-bottom: 10px;
    padding-top: 10px;
    font-size: 1.425em;

    @include tablet {
      margin-bottom: 5px;
      font-size: 1.9em;
    }
    &.is-editing {
      margin-top: 60px;
    }
  }

  .container {
    padding-top: 40px;

    @include tablet {
      background: $white;
      border-right: 1px solid $color-light-gray;
      border-left: 1px solid $color-light-gray;
    }
  }
}

.fundraiser-nonprofit {
  display: flex;
  text-align: center;

  @include tablet {
    flex-direction: row;
    justify-content: center;
  }

  &__subtitle {
    color: $color-medium-gray;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;

    @include mobile {
      display: none;
    }

    @include tablet {
      margin-bottom: 0;
    }

    a {
      color: $color-emphasis;
      text-decoration: underline;
    }
  }
  &__logo {
    padding-left: 10px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: sub;
  }
  &__img {
    max-height: 70px;
    @include mobile {
      display: none;
    }
    @include tablet {
      max-height: 20px;
    }
  }
}

.edition-header {
  margin-top: 30px;
}
.is-centered {
  text-align: center;
}
.pendingColor {
  color: $color-text-yellow;
}
.draftColor {
  color: $color-text-blue;
}
.publishedColor {
  color: $color-text-green;
}
.blockedColor {
  color: $color-text-red;
}
em {
  font-size: 0.8rem;
}
</style>