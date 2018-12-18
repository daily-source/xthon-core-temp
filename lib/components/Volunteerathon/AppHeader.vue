<template>
  <div class="header__wrapper white-bg" :class="{ 'page-layout': layout === 'page' }">
    <div class="container is-fluid">
      <div class="header__inner">
        <div class="random-words">
          <router-link to="/explore">ExploreX</router-link>
        </div>
        <div class="random-words">
          Volunteer
        </div>
        <div class="user-space__search">
          <div class="user-space__search-wrapper">
            <div class="user-space__search-trigger" @click="showSearchBar = !showSearchBar">
              <Icons iconwidth="24px" iconheight="24px" icon="search" color="#999999" class=""/>
            </div>
          </div>
        </div>
        <div class="logo__wrapper">
          <router-link to="/" exact>
            <img class="logo" src="~public/logo-300x53.png" alt="logo" width="300" height="53">
          </router-link>
        </div>
        <div class="logo__wrapper centered">
          <router-link to="/" exact>
            <img class="logo" src="~public/logo-300x53.png" alt="logo" width="300" height="53">
          </router-link>
        </div>
        <div class="user-space__logged--in modal-trigger" :class="{'login-highlight': loggedIn}">
          <LogInModal
            layout="app-header"
            :register="false"
          ></LogInModal>
        </div>
        <div class="max-good" @click="toggleOtherMaxGoodSites()" :class="{ 'active': showingMaxGoodSites }">
          <span class="small">Powered by </span>
          <div class="max-good__submenu-wrapper">
            <img src="~public/max-good-logo-150x18.png" width="150" height="18" alt="">
            <ul class="other-max-good-sites">
              <li>
                <span class="other-sites-arrow" :class="{ 'turn': showingMaxGoodSites }">
                  <Icons iconwidth="24px" iconheight="24px" icon="chevron-down" color="#999999" />
                </span>
                <ul class="sub" :class="{ 'active': showingMaxGoodSites }">
                  <li v-for="site in maxGoodSites"><a :href="site.href" target="_blank">{{ site.name }}</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.other-max-good-sites {
  padding-left: 10px;
  margin-top: -5px;

  li {
    position: relative;

    .other-sites-arrow {
      font-size: 36px;
      line-height: 18px;
      color: $color-medium-gray;
      svg {
        transition: transform 0.2s ease-in-out;
        transform: rotate(0deg);
      }

      &.turn {
        svg {
          @include mobile {
            transition: transform 0.2s ease-in-out;
            transform: rotate(180deg);
          }
        }
      }
    }

    ul.sub {
      opacity: 0;
      z-index: -1;
      transition: opacity 0.2s ease-in-out;
      position: absolute;
      top: 35px;
      right: 0;
      margin-top: -10px;
      background: rgba($white, 0.9);
      text-align: right;
      border: 1px solid $color-light-gray;

      @include widescreen {
        top: 30px;
      }

      &.active {
        opacity: 1;
        z-index: 24;

        @include widescreen {
          opacity: 0;
          z-index: -1;
        }
      }

      li {
        border-bottom: 1px solid $color-light-gray;
        min-width: 65vw;
        transition: background-color 0.2s ease-in-out;

        @include desktop {
          min-width: 40vw;
        }

        @include widescreen {
          min-width: 300px;
        }

        a {
          display: block;
          padding: 10px 30px;
          transform: translateX(20px);
        }

        &:hover {
          background: rgba($color-light-gray, 0.8);
        }
      }
    }
  }
}

.max-good {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  width: 100%;
  max-height: 50px;
  overflow: hidden;
  z-index: 30;

  &.active {
    max-height: auto;
    overflow: visible;    
  }

  @include tablet {
    width: auto;
  }
  .small {
    padding-right: 10px;
    font-size: 13px;
    align-self: flex-end;
  }

  &__submenu-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  @include desktop {
    flex-direction: column;
    &:hover {
      max-height: auto;
      overflow: visible;

      .other-sites-arrow {
        color: $color-light-gray;
        svg {
          transition: transform 0.2s ease-in-out;
          transform: rotate(180deg);
        }
      }

      ul.sub {
        opacity: 1;
        z-index: 24;

        &.active {
          opacity: 1;
          z-index: 24;
        }
      }
    }
  }
}

.header__wrapper {
  border-bottom: 2px solid $color-emphasis-alt;
}

.header__inner {
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5px 0;
  align-items: center;
  position: relative;
  font-size: 16px;

  @include desktop {
    flex-direction: row;
  }

  div {
    z-index: 10;    
    &.modal-trigger {
      z-index: 11;
    }
  }

  .user-space__search {
    order: -3;
  }

  .logo__wrapper {
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
    order: -100;
    opacity: 1;
    z-index: 1;

    @include mobile {
      padding-left: 9px;
    }

    @include desktop {
      width: auto;
      order: unset;
      opacity: 0;

      img {
        max-width: 272px;
        max-height: 49px;        
      }
    }

    &.centered {
      position: absolute;
      margin: 0 auto;
      opacity: 0;

      @include desktop {
        width: 100%;
        order: unset;
        padding-top: 5px;
        opacity: 1;
      }
    }
  }
}

.random-words {
  padding: 0 5px;
}

.page-layout {
  .header__inner {
    .user-space__search {
      order: 2;
    }
    .max-good {
      order: 3;
    }

    .logo__wrapper {
      opacity: 1;
      order: -2;

      img {
        max-width: 272px;
        max-height: 49px;        
      }

      @include tablet {
        img {
          max-width: 300px;
          max-height: 53px;        
        }        
      }

      &.centered {
        opacity: 0;
        display: none;
      }
    }
  }
}

.login-highlight {
  .trigger {
    padding: 5px;
    animation: fadeHighlight 7s ease-in-out;
  }
}

</style>

<script>
import Icons from "Components/general/Icons.vue"
import LogInModal from "Components/general/LogInModal.vue"

export default {
  name: "AppHeader",
  components: {
    Icons,
    LogInModal
  },
  props: ["layout"],
  data () {
    return {
      showSearchBar: false,
      showingMaxGoodSites: false,
      maxGoodSites: [
        { name: "Volunteerathon", href: "#" },
        { name: "Quitathon", href: "#" },
        { name: "Loseathon", href: "#" },
        { name: "Give it up for Good", href: "#" },
        { name: "Vacation for Good", href: "#" },
        { name: "Waterathon", href: "#" },
        { name: "Christmas for Good", href: "#" },
        { name: "MLK Day for Good", href: "#" },
        { name: "The Lent Site", href: "#" },
        { name: "Valentines for Good", href: "#" },
        { name: "Fools for Good", href: "#" },
        { name: "Resolutions for Good", href: "#" },
        { name: "Run for good", href: "#" },
        { name: "Bike for Good", href: "#" },
        { name: "Walk for Good", href: "#" },
        { name: "Birthdays for Good", href: "#" },
        { name: "Polar Plunge for Good", href: "#" },
        { name: "Bake for Good", href: "#" }
      ]
    }
  },
  methods: {
    toggleOtherMaxGoodSites () {
      this.showingMaxGoodSites = !this.showingMaxGoodSites
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.user.loggedIn
    }
  }
}
</script>
