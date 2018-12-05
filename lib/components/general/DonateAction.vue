<template>
  <div class="donate" @click="donate()">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.donate {
  display: inline;
}

</style>

<script>

export default {
  props: [ "fundraiserId", "trigger", "givingLevel", "commentId", "updateId", "nonprofitEin" ],
  methods: {
    donate () {
      var args = {
        fundraiserId: this.fundraiserId,
        commentId: this.commentId,
        fullPath: `${window.location.origin}${window.location.pathname}`,
        givingLevel: this.givingLevel,
        nonprofitEin: this.nonprofitEin,
        referrer: window.location.href,
        timestamp: Math.floor(Date.now() / 1000),
        trigger: this.trigger,
        updateId: this.updateId
      }

      // save donation info in store
      this.$store.dispatch("START_DONATION", { initiator: args })

      // open donation funnel
      if (this.nonprofitEin) {
        this.$router.push(`/nonprofit/${this.nonprofitEin}/donate`)
      } else {
        this.$router.push({ name: `${this.$route.name}/donate`, params: this.$route.params })
      }
    }
  }
}
</script>
