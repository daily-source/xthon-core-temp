import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import numeral from 'numeral'
import _ from 'lodash'

TimeAgo.locale(en)

export function host (url) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
  const parts = host.split(".").slice(-3)
  if (parts[0] === "www") parts.shift()
  return parts.join(".")
}

export function timeAgo (timestamp) {
  var a = new Date(timestamp)
  const timeAgo = new TimeAgo("en-US")
  var formedString = timeAgo.format(a.getTime())
  return formedString
}

export function booleanToBinary (bool) {
  if (bool) {
    return "Yes"
  }
  return "No"
}

export function formattedDate (timestamp) {
  var date = new Date(timestamp)
  var options = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleString("en-US", options)
}

export function usd (amount) {
  if (!isNaN(amount)) {
    var newValue = amount.toLocaleString("en-US")
    return `$${newValue}`
  }
}

export function centsToUsd (amount) {
  return usd(amount / 100)
}

export function people (number) {
  if (!isNaN(number)) {
    if (number === 1) {
      return `${number} person`
    }
    return `${number} people`
  }
}

// Filter for formatting numbers
export const numberFormat = (value) => {
  return numeral(value).format('0,0')
}


export const slugify = (string) => {
  return _.kebabCase(string)
}
