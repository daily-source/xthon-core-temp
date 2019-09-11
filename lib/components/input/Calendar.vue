<template>
  <div class="column is-centered calendar-wrapper">
    <div class="custom-control--datepicker">
      <button ref='datepicker' type='button'>Change</button>
    </div>
  </div>
</template>

<script>
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';

export default {
  data() {
    return {
      calendar: {}
    }
  },
  components: {
  },
  props: [ "type", "showHeader", "showFooter", "isRange", "labelFrom", "labelTo", "minDate", "startDate", "endDate", "dateFormat", "closeOnSelect" ],
  mounted() {
    this.calendar = bulmaCalendar.attach(this.$refs.datepicker, {
      type: this.type,
      showHeader: this.showHeader,
      showFooter: this.showFooter,
      startDate: this.date,
      isRange: this.isRange,
      labelFrom: this.labelFrom,
      labelTo: this.labelTo,
      minDate: this.minDate,
      startDate: this.startDate,
      endDate: this.endDate,
      dateFormat: this.dateFormat,
      closeOnSelect: this.closeOnSelect
    })[0]
    this.calendar.on('select', e => (this.dateSelected(this.calendar.datePicker._date)))
    this.calendar.on('clear', e => {
      this.calendar.show()
      this.dateSelected(this.calendar.datePicker._date)
    })
  },
  methods: {
    dateSelected (date) {
      this.$emit("updateDates", date)
      if (date && date.start && date.end) {
          setTimeout(() => {
          this.calendar.hide()
        }, 1000)
      }
    }
  }
}
</script>
<style lang="scss">
  .calendar-wrapper {
    height: 58px;
  }
  .datetimepicker-dummy {
    .datetimepicker-dummy-wrapper {
      border: 1px solid rgba(60, 60, 60, 0.26) !important;
      border-radius: 4px !important;
      padding: 0 7px !important;
      height: 34px;
    }
    .datetimepicker-dummy-input {
      font-weight: 100;
    }
  }
  .datetimepicker-container:before,
  .datetimepicker-container:after {
    border: none !important;
  }
  .button:focus,
  .button.is-focused {
    border-color: transparent !important;
  }
  .datetimepicker-dummy:before,
  .datetimepicker-dummy::before {
    background-color: rgba(60, 60, 60, 0.26) !important;
    top: .45rem !important;
  }
  .datepicker-nav-previous,
  .datepicker-nav-previous:hover,
  .datepicker-nav-previous:active,
  .datepicker-nav-next,
  .datepicker-nav-next:hover,
  .datepicker-nav-next:active {
    background-color: transparent !important;
  }
  .datepicker-nav {
    background-color: $color-emphasis !important;
  }
  .datetimepicker-clear-button {
    color: rgba(60, 60, 60, 0.26) !important;
    height: 0.75rem !important;
    right: -10px !important;
  }
  .datepicker-date.datepicker-range {
    background-color: $color-emphasis-alt !important;
    .date-item {
      color: white !important;
      border: none !important;
      box-shadow: none !important;
      background-color: $color-emphasis-alt !important;
    }
  }
  .date-item:hover {
    border-color: $color-emphasis-alt !important;
  }
  .date-item.is-active {
    background: $color-emphasis-alt !important;
  }
  .datepicker-date .date-item.is-today {
    color: $color-emphasis-alt !important;
    border-color: $color-emphasis-alt !important;
  }
  .datepicker-year.is-active, .datepicker-month.is-active {
    border-color: $color-emphasis-alt !important; 
    background: $color-emphasis-alt !important;
  }
  .datepicker-year:hover, .datepicker-month:hover {
    background: transparent !important;
  }
  .datepicker-year:hover, .datepicker-month:hover {
    border: .1rem solid $color-emphasis-alt !important;
  }
  .custom-control--datepicker {
    height: 38px;
  }
</style>