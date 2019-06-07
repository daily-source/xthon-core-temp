<template>
  <section class="footer hero">
    <div class="hero-body">
      <div class="social-icons">
        <div class="container">
          Share it! 
          <div class="icon-wrapper" @click="shareFB()">
            <Icons iconwidth="32px" iconheight="32px" icon="facebook" class="share-icon-gray" />
          </div>
          <div class="icon-wrapper" @click="shareTweet()">
            <Icons iconwidth="32px" iconheight="32px" icon="twitter" class="share-icon-gray" />
          </div>
          <div class="icon-wrapper" @click="shareLinkedIn()">
            <Icons iconwidth="32px" iconheight="32px" icon="linkedin" class="share-icon-gray" />
          </div>
          <div class="icon-wrapper" @click="shareEmail()">
            <Icons iconwidth="32px" iconheight="32px" icon="email" class="share-icon-gray" />
          </div>
        </div>
      </div>
      <div class="footer-links-wrapper">
        <div class="container">
          <div class="columns">
            <div class="footer-links column" v-for="menu in footerMenuLinks">
              <h3 v-html="menu.heading"></h3>
              <ul>
                <li v-for="item in menu.links"><a :href="item.href">{{item.name}}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="copy">
        <div class="container">
          Copyright 2010-{{currentYear()}} <a rel="noopener" href="//thedailysource.org" target="_blank">The Daily Source</a> All Rights Reserved.  <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.footer {
  padding: 0;
  z-index: 1;

  .hero-body {
    padding: 0;
  }
}

.copy {
  text-align: center;
  display: block;
  padding: 20px 0;
  background-color: $color-dark-gray;
  color: $white;
}

.social-icons {
  background-color: $color-light-gray;
  color: $color-medium-gray;
  border-bottom: 1px solid $color-silver;
  padding: 30px 0;
  font-size: 24px;
  font-style: italic;

  @include desktop {
    border-bottom: none;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    line-height: 20px;
  }

  .icon-wrapper {
    margin: 0 5px;
  }

  svg {
    path {
      fill: $color-silver;
      transition: fill 0.2s ease-in-out;
    }

    &:hover {
      path {
        fill: $color-medium-gray;
      }
    }
  }
}

.footer-links-wrapper {
  padding: 20px 0;
  background-color: rgba($color-dark-gray, 0.95);
}

.footer-links {
  h3 {
    color: $white;
    font-size: 24px;
    margin-bottom: 10px;
  }

  ul {
    font-size: 14px;
    margin: 10px 0 20px;
  }

  a {
    color: $white;

    &:hover {
      text-decoration: underline;
    }
  }
}

.icon-wrapper {
  &:hover {
    cursor: pointer;
  }
}

</style>

<script>
import Icons from "Components/general/Icons.vue"
import * as sharer from "Core/util/sharer.js"

export default {
  components: {
    Icons
  },
  computed: {
    footerMenuLinks () {
      return this.$store.state.common.footerMenuLinks
    }
  },
  data () {
    return {
      shareText: "Check out this website I found!",
      siteName: "Volunteerathon",
      shareWindowTitle: "Sharing"
    }
  },
  methods: {
    loadScripts () {
      if (typeof window !== "undefined" && window.FB) {
        window.FB.XFBML.parse()
      }
      if (window.addthis.layers && typeof window.addthis.layers.refresh === "function") {
        window.addthis.layers.refresh()
      }
    },
    shareFB () {
      sharer.shareOnFacebook(null, this.shareText, this.siteName, this.shareWindowTitle)
    },
    shareTweet () {
      sharer.shareOnTwitter(null, this.shareText, this.siteName, this.shareWindowTitle)
    },
    shareLinkedIn () {
      sharer.shareOnLinkedIn(null, this.shareText, this.siteName, this.shareWindowTitle)
    },
    shareEmail () {
      sharer.shareByEmail(null, this.shareText, this.siteName, this.shareWindowTitle)
    },
    donate () {
      this.$emit("donateFromButton")
    },
    currentYear () {
      return (new Date()).getFullYear()
    }
  }
}
</script>
