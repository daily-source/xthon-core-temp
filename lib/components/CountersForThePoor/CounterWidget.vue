<template>
  <div 
    :class="['counter-widget']"
		:style='{width: "`${size.width}px`"}'
  >
    <div class="counter-widget__title-container">
      <h2 class="counter-widget__title">
        {{ counter.title }}
      </h2>
    </div>
    <div class="counter-widget__details is-flex ">
      <div class="counter-widget__counters">
        <div class="counter-widget__counter is-flex">
          <span class='counter-widget-counter__label'>Today: </span>
          <span class='counter-widget-counter__value has-text-weight-bold'>{{ getDeaths('day') | numberFormat}} </span>
        </div>
        <div class="counter-widget__counter is-flex">
          <span class='counter-widget-counter__label'>This year: </span>
          <span class='counter-widget-counter__value has-text-weight-bold'>{{ getDeaths('year') | numberFormat }}  </span>
        </div>
        <div class="counter-widget__counter counter-widget__date-wrap">
					<span class='counter-widget-counter__date'>{{ date }} &nbsp; {{time}}</span>
        </div>
      </div>
    </div>
    <div 
      class='counter-widget__message-container'
      v-if='message'
     >
      <p class='counter-widget__message'>
        {{ message }}
      </p>
    </div>
    <div class='counter-widget__additional-details'>
      <div class='counter-widget__nonprofit-details' v-if='edit || nonprofit.NAME'>
        <p v-if='size.className === "large"'>Donations from this screen go to the nonprofit: <span class='counter-widget__nonprofit-name is-block has-text-weight-bold'>{{ nonprofit.NAME || "CHOOSE A NONPROFIT BELOW" }}</span></p>
        <p v-if='size.className === "medium"'>Donations from this go to the nonprofit: <span class='counter-widget__nonprofit-name is-block has-text-weight-bold'>{{ nonprofit.NAME || "CHOOSE A NONPROFIT BELOW" }}</span></p>
      </div>
      <div class='counter-widget__button-container'>
        <router-link to='/' class='button counter-widget__button'>
          Help Now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as moment from 'moment'

import imageSrc from 'Core/util/imageSrc'
import Icons from 'Components/general/Icons' 

export default {
  name: 'CounterWidget',

  components: {
    Icons,
  },

  props: {
    edit: {
      type: Boolean,
      default: false,
    },

    id: {
      type: [String, Number],
      required: false,
    },

    widgetData: {
      type: Object,
      required: false,
			default: () => {
				return {}
			}
    },

    noImage: {
      type: Boolean,
      required: false,
    },

    showNonprofitAdditionalDetails: {
      type: Boolean,
      required: false,
      default: false,
    },

    size: {
      type: Object,
      required: true,
    },
  },

  mixins: [imageSrc],

  data () {
    return {
      imgFolderName: 'widget-imgs/',
      timeNow: '',
      workingDate: new Date,
    }
  },

  mounted () {
    this.timeNow = this.getTimeNow()

    this.updateTime()
  },

  methods: {
    updateTime () {
      setTimeout(() => {
        this.timeNow = this.getTimeNow()
        this.updateTime()
      }, 1000)
    },

    getTimeNow (format = null) {
			const dtFormat = format ? format : 'MMMM D, YYYY h:mm:ss A'
      return moment().format(dtFormat) 
    },

    getTimeDifference (timeA, timeB, unit='seconds') {
      timeA = moment(new Date(timeA))
      timeB = moment(new Date(timeB))
      return timeA.diff(timeB, unit)
    },

    getDeaths (span) {
      const diff = this.getTimeDifference(this.timeNow, moment(this.timeNow).startOf(span))
			const remainder = diff % this.widget.rate

			let val

			if (remainder === 0) {
				val = diff / this.widget.rate
			} else {
				val = (diff - remainder) / this.widget.rate
			}

			return val
    },
  },

  computed: {
    message () {
      if (this.widgetData && this.widgetData.message) {
        return this.widgetData.message
      }

      return this.widget && this.widget.message
    },

    nonprofit: {
      get () {
        if (this.widgetData && this.widgetData.nonprofit) {
          return this.widgetData.nonprofit
        }

        return this.widget.nonprofit || {}
      },

      set (value) {
        this.widget.nonprofit = value
        return value
      }
    },

    counterId () {
      return (this.widgetData && this.widgetData.counterId) || this.widget.counterId
    },

		date () {
			return moment(this.timeNow).format('MMMM D, YYYY')
		},

		time () {
			return moment(this.timeNow).format('h:mm:ss A')
		},

    ...mapState({
      widget (state) {
        const widget = state.counterwidgets.widgets.find(widget => parseInt(widget.id) === parseInt(this.id))
        return widget
      },

      featuredImg (state) {
        let img = state.counterwidgets.imgs[this.widget.featuredImg]
        if(this.edit && this.widgetData && this.widgetData.img !== null) {
          img = state.counterwidgets.imgs[this.widgetData.img]
        }

        if (this.noImage) {
          img = null
        }
        return img
      },

      counter (state) {
        return state.counterwidgets.counters.find(counter => parseInt(this.counterId) === parseInt(counter.id))
      },

      sizes: state => state.counterwidgets.sizes,
    })
  },
}
</script>

<style lang='scss' scoped>
.counter-widget {
  color: #fff;
  position: relative;
  margin-left: auto;
  margin-right: auto;

	&__nonprofit-name {
		display: block;
  }

  &__title {
    color: inherit;
    font-size: 1.25rem;
    font-weight: 800;
    font-family: $headings-font-family;
    text-transform: capitalize;

    @include tablet {
      font-size: 1.375rem;
    }

    @include desktop {
      font-size: 1.875rem;
    }

    @include fullhd {
      font-size: 2.125rem;
    }
  }

  &__counters, 
  &__message-container,
  &__additional-details {
    padding-left: .5rem;
  }

  &__counter {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 1.125rem;

    @include desktop {
      font-size: 1.5rem;
      flex-basis: 45%;
      max-width: 45%;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__button-container {
    max-width: 50%;
    flex-basis: 50%;
    text-align: center;
  }

  &__message {
    color: inherit;
  }

  &__date-wrap {
    max-width: 100%;
  }

  &__counters {
    margin-bottom: 1.5em;
    max-width: 100%;
    flex-basis: 100%;
  }
}

.counter-widget-counter {
  &__label {
		font-weight: 700;
    flex-grow: 1;
    flex-shrink: 1;
  }
}

.counter-widget__button {
  padding: .5rem 1.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  align-self: flex-end;
}

.button {
  background-color: $primary;
  color: #fff;
  border-color: transparent;
}

.counter-widget--secondary {
  .button {
    background-color: $secondary;
  }
}
</style>
