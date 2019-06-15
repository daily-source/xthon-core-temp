<template>
  <div class="media-editor__wrapper">
    <slot name="heading"><h2>Gallery</h2></slot>
    <slot name="tagline"></slot>
    <p class="unselectable"><a @click="addImage()">Add a photo</a> or <a @click="addVideo()">video</a> to engage your audience.</p>
    <div class="media-item"
      v-for="(item, index) in newMedia.images"
    >
      <InlineImageEditor
        :open-id="newImageOpenId"
        :location="location"
        :item="item"
        :open-default="true"
        :key="item"
        :edition-is-enabled="true"
        :quality="2"
        filename="media_image"
        v-if="!item"
        v-on:edition:open="newImageOpenId = $event"
        v-on:edition:close="newImageOpenId = null; removeNewImage()"
        v-on:image:remove="removeNewImage()"
      ></InlineImageEditor>
    </div>
    <div class="media-item"
      v-for="(item, index) in newMedia.videos"
    >
      <InlineVideoEditor
        :open-id="newImageOpenId"
        :location="location"
        :item="item"
        :open-default="true"
        :key="item"
        v-on:edition:open="newImageOpenId = $event"
        v-on:edition:close="newImageOpenId = null; removeNewVideo()"
        v-on:image:remove="removeNewVideo()"
      ></InlineVideoEditor>
    </div>
    <div class="media-item"
      v-for="(item, index) in mediaSource.videos"
    >
      <InlineVideoEditor
        :open-id="existingImageOpenId"
        :location="location"
        :item="item"
        :key="item"
        :open-default="false"
        v-on:edition:open="existingImageOpenId = $event"
        v-on:edition:close="existingImageOpenId = null"
      ></InlineVideoEditor>
    </div>
    <div class="media-item"
      v-for="(item, index) in mediaSource.images"
    >
      <InlineImageEditor
        :item="item"
        :open-id="existingImageOpenId"
        :location="location"
        :edition-is-enabled="true"
        :key="item"
        :disable-image-edition="true"
        v-on:edition:open="existingImageOpenId = $event"
        v-on:edition:close="existingImageOpenId = null"
      ></InlineImageEditor>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "mediaSource", "location" ],
  data () {
    return {
      existingImageOpenId: null,
      newImageOpenId: null,
      newMedia: {
        images: [],
        videos: []
      }
    }
  },
  components: {
    InlineImageEditor: () => import("Components/input/InlineImageEditor.vue"),
    InlineVideoEditor: () => import("Components/input/InlineVideoEditor.vue")
  },
  methods: {
    addImage () {
      if (!this.newImageOpenId) {
        this.newMedia.images.push("")
      }
    },
    addVideo () {
      if (!this.newImageOpenId) {
        this.newMedia.videos.push("")
      }
    },
    removeNewImage () {
      this.newMedia.images.pop()
    },
    removeNewVideo () {
      this.newMedia.videos.pop()
    }
  }
}
</script>

<style scoped lang="scss">
.media-editor__wrapper {
  width: 100%;
  display: inline-block;
  margin: 20px 0;
  position: relative;
  z-index: 0;
}

</style>