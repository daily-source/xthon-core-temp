<template>
  <div 
    :class="['counter-widget', {'counter-widget--edit': edit}, `counter-widget--${size.className}`]"
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
    
    size () {
      if (this.widgetData && this.widgetData.size) {
        return this.widgetData.size
      } else if (this.widget.size) {
        return this.widget.size
      } else {
				return {
					name: 'large',
					width: 800,
					className: 'large',
					label: 'Large',
				}
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
}

.counter-widget__title {
  color: inherit;
  font-size: 1.375rem;
  font-weight: 800;
}

.counter-widget__title-container {
  font-family: $headings-font-family;
  font-size: 1.375rem;
  font-weight: 800;
  text-align: center;

  .counter-widget--edit & {
    text-transform: capitalize;
  }
}

.counter-widget__title-container {
  text-align: left;
}

.counter-widget__counters, 
.counter-widget__message-container,
.counter-widget__additional-details {
  padding-left: .5rem;
}


.counter-widget__counter {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }

  .counter-widget:not(.counter-widget--edit) & {
    font-size: 1.25rem;

    @include fullhd {
      font-size: 1.5rem;
    }
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

.counter-widget__details-right {
  flex-wrap: wrap;
  flex-direction: column;
  flex-grow: 1;

  @media (min-width: 600px) {
    flex-direction: row;
  }
}

.counter-widget-details__image {
  margin-bottom: 1rem;
  > img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}

.counter-widget--edit {
  .counter-widget__details-right {
    justify-content: center;
  }

  .counter-widget__title {
    text-transform: capitalize;
    max-width: 80%;

		@include fullhd {
			max-width: 95%;
		}
  }
}

.counter-widget__editable-field {
  position: relative;

  .button.counter-widget__edit-button {
    position: absolute;
    top: -10px;
    right: -1rem;
    border-radius: 100%;
    box-shadow: 0 2px 16px 2px rgba(0,0,0,.2) !important
  }
}

.counter-widget__title-container {
  .counter-widget__edit-button {
    right: 0;
    top: 0;
  }
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

<style lang='scss'>
  .counter-widget__message {
    color: inherit;
  }

  .counter-widget--large {
    .counter-widget__details {
      flex-direction: row;
    }

    .counter-widget__counters {
      margin-bottom: 0;
			max-width: 100%;
			flex-basis: 100%;

			.counter-widget__counter {
				flex-basis: 45%;
				flex-shrink: 0;
				flex-grow: 1;
				max-width: 45%;

				@include fullhd {
					flex-basis: 45%;
					max-width: 45%;
				}
			}

			.counter-widget__date-wrap {
				max-width: 100%;
			}
    }

    .counter-widget__title {
      font-size: 1.875rem;

      @include fullhd {
        font-size: 2.125rem;
      }
    }
  }

  .counter-widget__details {
    flex-direction: column;

    .counter-widget__counters {
      margin-bottom: 1.5rem;
    }

    .counter-widget__title {
      font-size: 1.125rem;
    }
  }

  .counter-widget__button-container {
		max-width: 50%;
		flex-basis: 50%;
		text-align: center;
  }
</style>
