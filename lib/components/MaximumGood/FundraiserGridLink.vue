<template>
  <div class="fundraiser-grid-link">
    <a 
      :href="fundraiser.url"
      target="_blank"
      v-if='fundraiser.url'
    >
      <slot></slot>
    </a>
    <router-link :to="{name: 'website',  params: { slug: fundraiser.slug }}" v-else>
      <slot></slot>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'FundraiserGridLink',

  props: {
    fundraiser: {
      type: Object,
      required: true,
    }
  },
}
</script>