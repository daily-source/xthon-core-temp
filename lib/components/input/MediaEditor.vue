<template>
  <div class="media-editor__wrapper">
    <slot name="heading"><h2>Gallery</h2></slot>
    <slot name="tagline"></slot>
    <p class="unselectable"><a @click="addImage()">Add a photo</a> or <a @click="addVideo()">video</a> to engage your audience.</p>
    <div class="media-item"
      v-for="(item, index) in newMedia"
    >
      <InlineImageEditor
        v-if="item.type === 'image'"
        :open-id="newImageOpenId"
        :location="location"
        :item="item"
        :open-default="true"
        :edition-is-enabled="true"
        v-on:edition:open="newImageOpenId = $event"
        v-on:edition:close="newImageOpenId = null"
        v-on:image:remove="removeNewImage()"
      ></InlineImageEditor>
      <InlineVideoEditor
        v-if="item.type === 'video'"
        :open-id="newImageOpenId"
        :location="location"
        :item="item"
        :open-default="true"
        :key="item.src"
        v-on:edition:open="newImageOpenId = $event"
        v-on:edition:close="newImageOpenId = null; removeNewVideo()"
        v-on:image:remove="removeNewVideo()"
      ></InlineVideoEditor>
    </div>
    <div class="media-item"
      v-for="(item, index) in mediaSource.media"
    >
      <InlineVideoEditor
        v-if="item.type === 'video'"
        :open-id="existingImageOpenId"
        :location="location"
        :item="item"
        :open-default="false"
        v-on:edition:open="existingImageOpenId = $event"
        v-on:edition:close="existingImageOpenId = null"
      ></InlineVideoEditor>
      <InlineImageEditor
        v-if="item.type === 'image'"
        :item="item"
        :open-id="existingImageOpenId"
        :location="location"
        :edition-is-enabled="true"
        :key="item.src"
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
      newMedia: []
    }
  },
  components: {
    InlineImageEditor: () => import("Components/input/InlineImageEditor.vue"),
    InlineVideoEditor: () => import("Components/input/InlineVideoEditor.vue")
  },
  methods: {
    addImage () {
      if (!this.newImageOpenId) {
        this.newMedia.push({ src: "", type: "image" })
      }
    },
    addVideo () {
      if (!this.newImageOpenId) {
        this.newMedia.push({ src: "", type: "video" })
      }
    },
    removeNewImage () {
      this.newMedia.pop()
    },
    removeNewVideo () {
      this.newMedia.pop()
    }
  }
}
</script>

<style scoped lang="scss">
.media-editor__wrapper {
  width: 100%;
  display: inline-block;
  margin: 20px 0;
}

</style>