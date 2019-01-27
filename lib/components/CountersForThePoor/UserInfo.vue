<template>
  <section class="user-info section">
    <div class="container">
      <div class='user-info__wrapper'>
        <p class='user-info__heading has-text-centered'>Donations made through this page will go to <span class='has-text-weight-bold'>{{ page.nonprofit.NAME }}</span></p>
        <div class="user-info__columns is-flex">
          <div class="user-info__column user-info__dropzone-column">
            <vue2-dropzone
              ref='profile-upload'
              id='dropzone'
              :options='dropzoneOptions'
              :useCustomSlot='true'
            >
              <div class="dropzone-custom-content has-text-centered">
                <icon 
                  icon="profile"
                  :iconheight='63'
                  :iconwidth='64'
                  color='#E2AB40'
                />
                <p class='dropzone-custom-content__text'>
                  Drag and drop to upload your profile picture. <br />
                  Or click to select a file from your computer
                </p>
              </div>
            </vue2-dropzone>
          </div>
          <div class="user-info__column">
            <p class='user-info__details'>
              <icon
                icon='user'
                :iconwidth='24'
                :iconheight='25'
                color='#E2AB40'
              />
              <span class="user-info__details-text">{{ `${user.firstName} ${user.lastName}` }}</span>
            </p>
            <p class='user-info__details'>
              <icon
                icon='map-marker'
                :iconwidth='24'
                :iconheight='24'
                color='#E2AB40'
              />
              <span class="user-info__details-text">{{ `${user.street} ${user.city}, ${user.state} ${user.zip}, ${user.country}` }}</span>
            </p>
            <p class='user-info__details'>
              <icon
                icon='email'
                :iconwidth='24'
                :iconheight='24'
                color='#E2AB40'
              />
              <span class="user-info__details-text">{{ user.email }}</span>
            </p>
            <p class='user-info__details'>
              <icon
                icon='phone'
                :iconwidth='24'
                :iconheight='24'
                color='#E2AB40'
              />
              <span class="user-info__details-text">{{ user.phone }}</span>
            </p>
          </div>  
        </div>
      </div>
    </div>
  </section>  
</template>

<script>
import { mapState } from 'vuex'
import Icon from '@/components/general/Icons'
import vue2Dropzone from 'vue2-dropzone'

export default {
  name: 'UserInfo',

  components: {
    Icon,
    vue2Dropzone,
  },

  data () {
    return {
      dropzoneOptions: {
        autoProcessQueue: false,
        maxFiles: 1,
        url: '#',
        createImageThumbnails: false,
      },
    }
  },

  computed: {
    pageId () {
      return this.$route.params.id
    },

    ...mapState({
      page (state) {
        return state.counterwidgets.pages.find(page => page.id == this.pageId)
      },

      user (state) {
        return state.users.data.find(user => this.page.userId == user.id)
      },
    }),
  },
}
</script>

<style lang="scss" scoped>
  .user-info {
    color: #000;
  }

  .user-info__details {
    display: flex;
    align-items: center;

    .icon-wrapper {
      margin-right: .5em;
    }
  }

  .user-info__columns {
    margin-top: 1.5em;
  }

  .user-info__dropzone-column {
    flex-basis: 250px;
    height: 250px;
    margin-right: 2em;
  }

  .user-info__heading {
    font-size: 1.5em;
  }

  .vue-dropzone {
    height: 100%;
    font-family: inherit;
    background-color: transparent;
    border: 2px dashed rgba(#777, .9);
    border-radius: $border-radius;
  }

  .dropzone-custom-content__text {
    font-size: .75rem;
    margin-top: 1em;
    color: #000;
  }

  .user-info__wrapper {
    max-width: 800px !important;
    border-radius: $border-radius;
    margin-top: 1em;
    box-shadow: 0px 18px 18px 6px rgba(0,0,0,.3);
    padding: 2em;
    margin-left: auto;
    margin-right: auto;
  }
</style>
