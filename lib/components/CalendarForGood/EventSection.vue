<template>
  <section class="event-section" :id="id">
    <div class="container">
      <h2 class="has-text-centered is-primary pb-2 is-uppercase">{{ seasonName }}</h2>
      <div class="columns is-multiline event-section__columns" v-if="events.length > 0">
        <div class="column is-4" v-for="event in events" :key="event.slug">
          <event-card 
            :event="event"
            :category="event.slug"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import EventCard from "Components/CalendarForGood/EventCard"

export default {
  name: 'EventSection',

  components: {
    EventCard,
  },

  props: {
    id: {
      required: true,
      type: String,
    },
    events: {
      type: Array,
      default: () => {
        return []
      },
    },
    seasonName: {
      type: String,
      default: ""
    }
  },
}
</script>

<style lang="scss" scoped>
  .event-section {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;

    .home-v2 & h2{
      margin-bottom: 0 !important;
    }

    h2 {
      padding-bottom: .5rem;
      margin-bottom: .5rem;
      color: $primary;
      font-weight: 700;
      font-size: 40px;
    }

    &__columns {
      justify-content: center;
    }
  }
</style>
