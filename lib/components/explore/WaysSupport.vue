<template>
  <section class="support__wrapper">
    <div class="container">
      <slot name="heading"></slot>
      <div class="columns combo-wrapper is-multiline" v-if="version === 1">
        <ComboBox
          class="combo-box"
          :iconsrc="box.imgsrc"
          :large="true"
          :key="box.title"
          v-for="box in boxes1"
          layout="standard"
          v-on:image:clicked="openSocialMediaModal(box)"
        >
          <h4 v-if="box.target === 'app'"><router-link :to="box.link">{{box.title}}</router-link></h4>
          <h4 v-if="box.target === 'external'"><a :href="box.link" :target="box.target">{{box.title}}</a></h4>
          <h4 v-if="box.target === 'modal'"><a @click="showSocialMedia = true">{{box.title}}</a></h4>
          <div>
            <p class="combo-box-p">{{box.text}}</p>
            <p class="combo-box-p">
              <a v-if="box.target === 'external'" :href="box.link" :target="box.target">{{box.cta}}</a>
              <router-link v-if="box.target === 'app'" :to="box.link">{{box.cta}}</router-link>
              <a v-if="box.target === 'modal'" @click="showSocialMedia = true">{{box.cta}}</a>
            </p>
          </div>
          <Modal
            :prevent-body-scroll="false"
            :state="showSocialMedia"
            v-if="box.target === 'modal'"
            v-on:modal:close="showSocialMedia = false"
            v-on:modal:open="showSocialMedia = true"
            :enable-esc="true"
          >
            <div slot="header">Social Media</div>
            <div slot="content">
              <SpreadSocialMedia
                :url-params="null"
                :text="box.title"
                via="Volunteerathon"
                title="Spread the word!" />
            </div>
          </Modal>
        </ComboBox>
      </div>
      <div class="columns combo-wrapper is-multiline" v-if="version === 2">
        <ComboBox
          class="combo-box"
          :iconsrc="box.imgsrc"
          :large="true"
          :key="box.title"
          v-for="box in boxes2"
          layout="standard"
        >
          <h4 v-if="box.target === 'app'"><router-link :to="box.link">{{box.title}}</router-link></h4>
          <h4 v-if="box.target === 'external'"><a :href="box.link" :target="box.target">{{box.title}}</a></h4>
          <h4 v-if="box.target === 'modal'"><a @click="showSocialMedia = true">{{box.title}}</a></h4>
          <div>
            {{box.text}}<br>
            <a v-if="box.target === 'external'" :href="box.link" :target="box.target">{{box.cta}}</a>
            <router-link v-if="box.target === 'app'" :to="box.link">{{box.cta}}</router-link>
            <a v-if="box.target === 'modal'" @click="showSocialMedia = true">{{box.cta}}</a>
          </div>
          <Modal
            :prevent-body-scroll="false"
            :state="showSocialMedia"
            v-if="box.target === 'modal'"
            v-on:modal:close="showSocialMedia = false"
            v-on:modal:open="showSocialMedia = true"
          >
            <div slot="header">Social Media</div>
            <div slot="content">
              <SpreadSocialMedia
                :url-params="null"
                :text="box.title"
                via="Volunteerathon"
                title="Spread the word!" />
            </div>
          </Modal>
        </ComboBox>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.combo-box {
  padding: 20px;
  margin-top: 20px;
  .combo-box-p {
    font-size: 19px;
  }
}
</style>

<script>

export default {
  props: [ "headline", "imgsrc", "tagline", "cta", "version" ],
  /**
   * Uses dynamic import to speed up page performance.
   * See https://webpack.js.org/guides/code-splitting/ for reference.
   */
  components: {
    ComboBox: () => import("Components/general/ComboBox.vue"),
    Modal: () => import("Components/general/Modal.vue"),
    SpreadSocialMedia: () => import("Components/general/SpreadSocialMedia.vue")
  },
  methods: {
    openSocialMediaModal (box) {
      if (box.target === "modal") {
        this.showSocialMedia = true
      }
    }
  },
  data () {
    return {
      showSocialMedia: false,
      boxes1: [
        { title: "Volunteer", imgsrc: require('Public/img/support/hands-circle.jpeg'), text: "We have many volunteer opportunities including writing, marketing, research, web development and more.", cta: "See details.", link: "https://www.volunteermatch.org/search/org63665.jsp", target: "external" },
        { title: "Donate", imgsrc: require('Public/img/support/heart-donate.jpeg'), text: "We help nonprofits do great things for the world. We rely on donations from kind people like you to make it possible.", cta: "Please donate now.", link: "/nonprofit/830374559/donate", target: "app" },
        { title: "Spread the word", imgsrc: require('Public/img/support/social-media.png'), text: "Please let people know about our nonprofit on social media by clicking the buttons above to follow or like us.", cta: "For more sharing options, click here.", link: "/share", target: "modal" }
      ],
      boxes2: [
        { title: "Volunteer", imgsrc: require('Public/img/support/hands-circle.jpeg'), text: "We have many volunteer opportunities including writing, marketing, research, web development and more.", cta: "See details.", link: "https://www.volunteermatch.org/search/org63665.jsp", target: "external" },
        { title: "Donate", imgsrc: require('Public/img/support/heart-donate.jpeg'), text: "We help nonprofits do great things for the world. We rely on donations from kind people like you to make it possible.", cta: "Please donate now.", link: "/nonprofit/830374559/donate", target: "app" },
        { title: "Spread the word", imgsrc: require('Public/img/support/social-media.png'), text: "Please spread the word on social media with the buttons above to friend and like us.", cta: "To see all sharing options, click here.", link: "/share", target: "modal" }
      ]
    }
  }
}
</script>
