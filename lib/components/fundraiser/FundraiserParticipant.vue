<template>
  <div class="container is-fluid white-bg fundraiser-participant__wrapper" v-if="fundraiser.User">
    <div class="fundraiser-body">
      <p v-if="canEdit" class="">
        <a class="button is-light is-rounded is-medium" v-if="editing" @click="closeEditor()">Stop editing</a>
        <a class="button is-light is-rounded is-medium" v-if="!editing" @click="openEditor()">Edit this section</a>
      </p>
      <p v-if="editing">To update personal details like you avatar and location, <router-link to="/account/settings">go to your profile page.</router-link></p>
      <div class="fundraiser-participant" :class="{'columns is-editing': editing}">
        <figure class="fundraiser-participant__avatar" :class="{'is-editing column is-6': editing}">
          <LazyLoadedImage
            class="inline-image-item v-lazy-image is-background fundraiser-participant__avatar"
            :is-background="true"
            :src="fundraiser.User.avatar ? fundraiser.User.avatar.src : ''"
          ></LazyLoadedImage>
        </figure>
        <div class="fundraiser-participant__details" :class="{'column is-5': editing}">
          <h3 class="fundraiser-participant__name">by 
            <div class="emphasis" v-html="`${fundraiser.User.firstName} ${fundraiser.User.lastName}`">
            </div class="emphasis">
          </h3>
          <div class="fundraiser-participant__detail-item-wrapper" :class="{'is-editing': editing}">
            <div class="fundraiser-participant__detail-item" v-if="fundraiser.User.location || editing">
              <Icons iconwidth="24px" iconheight="24px" icon="location" color="#f0f0f0" class="fundraiser-participant__icon icon-location"/>
              <div class="fundraiser-participant__location">
                <span v-html="fundraiser.User.location"></span>
              </div>
            </div>
            <div class="fundraiser-participant__detail-item" v-if="fundraiser.email || editing">
              <Icons iconwidth="24px" iconheight="24px" icon="email" color="#f0f0f0" class="fundraiser-participant__icon"/>
              <div class="fundraiser-participant__contact">
                <InlineFieldEditor
                  type="email"
                  :remove-returns="true"
                  ref="fundraiserEmail"
                  :allow-empty="false"
                  error-text="Please set up an email address for notifications"
                  :value="fundraiser.email"
                  :edition-is-enabled="editing"
                  layout="inline"
                  placeholder="Email address"
                  location="fundraiser.email"
                  v-on:next:field="openEdition('fundraiserDescription')"
                  v-on:previous:field="openEdition('fundraiserCity')"
                  v-if="editing"
                ></InlineFieldEditor>
                <a
                  :href="`mailto:${fundraiser.email}`"
                  v-if="!editing && fundraiser.email"
                >Contact</a>
              </div>
            </div>
            <div class="fundraiser-participant__subscribe" v-if="!editing">
              <div class="button is-warning">+Subscribe to receive updates</div>
            </div>
          </div>
        </div>
      </div>
      <div class="fundraiser-participant__description" :class="{'is-editing': editing}">
        <p>
          <InlineFieldEditor
            type="textarea"
            :remove-returns="false"
            ref="fundraiserDescription"
            :allow-empty="false"
            error-text="Add a compelling intro for your fundraiser."
            :value="fundraiser.description"
            :edition-is-enabled="editing"
            layout="block"
            placeholder="Email address"
            location="fundraiser.description"
            v-on:next:field="openEdition('fundraiserParticipant')"
            v-on:previous:field="openEdition('fundraiserEmail')"
          ></InlineFieldEditor>
        </p>
        <SharingIconsRow
          :key="$route.fullPath"
          :route-path="$route.fullPath"
          :fundraiser-id="fundraiser.fundraiser_id"
          trigger="fundraiser/participant/shareIconsRow" />
      </div>
    </div>
  </div>
</template>

<script>
import Icons from "Components/general/Icons.vue"
import SharingIconsRow from "Components/general/SharingIconsRow.vue"
import LazyLoadedImage from "Components/plugins/LazyLoadedImage.js"

export default {
  props: [ "fundraiser", "editing", "canEdit" ],
  components: {
    Icons,
    LazyLoadedImage,
    SharingIconsRow,
    InlineFieldEditor: () => import("Components/input/InlineFieldEditor.vue"),
    InlineImageEditor: () => import("Components/input/InlineImageEditor.vue")
  },
  methods: {
    closeEditor () {
      this.$emit("edit:close")
    },
    openEditor () {
      this.$emit("edit:open")
    },
    openEdition (ref) {
      this.$refs[ref].openEdition()
    }
  }
}
</script>

<style scoped lang="scss">
.fundraiser-body {
}

.fundraiser-participant {
  display: flex;

  &.is-editing {
    @include mobile {
      display: block;
    }    
  }

  &__wrapper {
    padding-top: 20px;    
  }

  &__name {
    font-size: 20px;
    color: $color-medium-gray;
    margin-bottom: 10px;
    display: flex;

    @include tablet {
      margin-top: 10px;
      font-size: 24px;
    }

    .emphasis {
      font-weight: bold;
      margin-left: 5px;
    }
  }

  &__subscribe {
    @include mobile {
      margin-top: 20px;
      .button {
        white-space: normal;
        line-height: 20px;
        height: 50px;
      }
    }
  }

  &__detail-item-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }

  &__details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  &__detail-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 20px;
    font-size: 18px;
  }

  &__icon {
    display: inline-block;
    width: 24px;
    margin-top: 6px;
    margin-right: 10px;
  }

  &__location {
  }

  &__avatar {
    width: 160px;
    height: 160px;
    margin-right: 20px;
    display: inline-block;
    background-size: cover;
    background-position: center center;

    @include tablet {
      width: 120px;
      height: 120px;
    }
    &.is-editing {
      width: 600px;
      @include mobile {
        width: 100%;
      }      
    }
  }

  &__description {
    padding-bottom: 20px;
    padding-top: 10px;

    figure {
      img {
        width: 100%;
      }
    }
    &.is-editing {
      margin-top: 50px;
    }
  }
}
.fundraiser-participant__detail-item-wrapper.is-editing {
  flex-direction: column;
  align-items: flex-start;
}

</style>
