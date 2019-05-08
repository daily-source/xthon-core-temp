<template>
  <div :id="event.slug" class="event-card card is-shadowless">
    <router-link :to="`event/${category}/${event.slug}`">
      <div class="card-body event-card__body has-text-centered">
        <span class="is-sr-only">{{event.name}}</span>
        <div class="is-flex flex-column event-card__content-container">
          <img :src="require(`@/assets/img/event_images/${event.imagePath}`)" alt="" class="event-card__event-image">
          <div class="event-card__description">
            <p class="has-text-centered">
              {{ event.description }}&nbsp;
              <span class="d-inline-block event-card-view__link">View</span>
            </p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'EventCard',

  props: {
    event: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },

  methods: {
  },
}
</script>

<style lang="scss" scoped>
// Compute the width of images
@function enlarge($width, $multiplier: .25) {
  @return $width + ($width * $multiplier);
}
.card {
  border: 0;
  box-shadow: transparent;
  background-color: transparent;
  border-radius: 10px;
  height: 100%;

  > a,
  .event-card__body {
    height: 100%;
    display: flex; 
    flex-direction: column;
    align-items: center;
  }

  .home-v2 & {
    min-height: unset;
    max-height: unset;
    padding-left: 1.5em;
    padding-bottom: 1.5em;
  }

  .card-body {
    padding: .875rem;
  }

  &:hover {
    // top: 2px;
    a { 
      text-decoration: none;
    }
  }
}

.event-card__content-container {
  color: #333;
  margin-bottom: 0.625em;
  flex-direction: column;

  .event-card__event-image {
    max-width: enlarge(160px);
    flex-grow: 1;
    flex-shrink: 0;
    object-fit: contain;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0.625em;
    min-height: 100px;

    @include desktop {
      max-width: enlarge(180px);
    }

    .home-v2 & {
      max-width: 150px;
      min-height: 70px;
      flex-basis: 1px;
      margin-bottom: 1em;
    }
  }

  p {
    font-size: 1.125em;

    .home-v2 & {
      text-align: center;
    }
  }
}

.event-card-view__link {
  color: $primary;
  text-decoration: underline;
  margin-top: auto;
  font-weight: 700;
}

#lent-for-love {
  .event-card__event-image {
    max-width: 175px;
  }
}

#memorial-day-donating {
  .event-card__event-image {
    max-width: enlarge(160px);
  }
}

#polar-plunge-for-good,
#fourth-for-good,
#christmas-for-good,
#benevolent-birthdays,
#vacation-for-good,
#labor-for-good,
#anniversaries-for-good {
  .event-card__event-image {
    max-width: enlarge(160px);
  }
}

#benevolent-birthdays {
  .event-card__event-image {
    margin-top: -5px;
  }
}

#big-hearted-halloween,
#mlk-day-for-good,
#virtuous-valentines {
  .event-card__event-image {
    max-width: enlarge(190px);
  }
}

#bake-for-good {
  .event-card__event-image {
    max-width: enlarge(130px);
  }
}

#easter-giving {
  .event-card__event-image {
    max-width: enlarge(140px);
  }
}

#altruistic-anniversaries,
#feel-good-fourth,
#virtuous-vacations,
#labor-day-love,
#virtous-veterans-day {
  .event-card__event-image {
    max-width: enlarge(200px);
  }
}

#giving-at-thanksgiving,
#charitable-columbus-day,
#righteous-resolutions,
#st-patricks-sharing {
  .event-card__event-image {
    max-width: enlarge(220px);
  }
}

#purposeful-presidents-day {
  .event-card__event-image {
    max-width: enlarge(240px);
  }
}

#mothers-for-good {
  .event-card__event-image {
    max-width: enlarge(148px);
  }
}

#fools-for-good {
  .event-card__event-image {
    max-width: enlarge(200px);
  }
}

#fathers-for-good {
  .event-card__event-image {
    max-width: enlarge(180px);
  }
}

#run-for-good {
  .event-card__event-image {
    max-width: enlarge(150px);
  }
}
</style>
