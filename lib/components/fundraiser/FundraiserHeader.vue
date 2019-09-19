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
      <p v-if="editing" class="is-centered">
        <a class="button is-light is-rounded is-medium" @click="closeEdition()">Stop editing</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "fundraiser", "editing" ],
  components: {
    InlineFieldEditor: () => import("Components/input/InlineFieldEditor.vue")
  },
  methods: {
    closeEdition () {
      this.$emit("edit:close")
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
</style>
