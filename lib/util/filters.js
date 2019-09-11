import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"

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

export function numberToDays (amount) {
  if (!isNaN(amount)) {
    if (amount === 1) {
      return amount + " day"
    }
    else {
      return amount + " days"
    }
  }
}

export function numberToHours (amount) {
  if (!isNaN(amount)) {
    if (amount === 1) {
      return amount + " hour"
    }
    else {
      return amount + " hours"
    }
  }
}

export function numberToUsd (amount) {
  if (!isNaN(amount)) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    return formatter.format(amount);
  }
}

export function usd (amount) {
  if (!isNaN(amount)) {
    var newValue = amount.toLocaleString("en-US")
    return `$${newValue}`
  }
}

export function centsToUsd (amount) {
  return numberToUsd(amount / 100)
}

export function people (number) {
  if (!isNaN(number)) {
    if (number === 1) {
      return `${number} person`
    }
    return `${number} people`
  }
}

export function formatDate (timestamp) {
  var date = new Date(timestamp)
  var dd = date.getDate()
  var mm = date.getMonth()+1 
  var yyyy = date.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  if (dd && mm && yyyy) return mm + '/' + dd + '/' + yyyy
  return null
}