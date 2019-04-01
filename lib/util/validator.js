// Source: https://stackoverflow.com/a/1373724
export function validateEmail (email) {
  var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/ // eslint-disable-line max-len
  return re.test(String(email).toLowerCase())
}

export function validateName (name) {
  if (name && name.length >= 2 && name-length < 140) {
    return true
  }
  return false
}

export function validatePassword (password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W|_])[A-Za-z\d\W|_]{8,}/
  return re.test(String(password))
}

export function validatePasswordLength (password) {
  return password.length >= 8
}

export function validatePasswordNumber (password) {
  var re = /^(?=.*\d)/
  return re.test(String(password))
}

export function validatePasswordCapital (password) {
  var re = /^(?=.*[A-Z])/
  return re.test(String(password))
}

export function validatePasswordLower (password) {
  var re = /^(?=.*[a-z])/
  return re.test(String(password))
}

export function validatePasswordSpecial (password) {
  var re = /\W|_/g
  return re.test(String(password))
}

export function validateCreditCardNumber (number) {
  if (number) {
    return number.toString().length === 16
  } else {
    return false
  }
}

export function validateExpirationDate (month, year) {
  var d = new Date()
  var currentYear = d.getFullYear() - 2000
  if (year > currentYear) {
    return true
  } else {
    if (month >= d.getMonth() && year === currentYear) {
      return true
    }
    return false
  }
}

export function validateZipCode (code) {
  if (code) {
    return code.toString().length === 5
  } else {
    return false
  }
}

export function validateTextNoHtml (text, allowEmpty) {
  var re = /<[a-z/][\s\S]*>/i
  if (!re.test(text)) {
    if (!text || text.replace(/[\n\r]/g, "").length === 0) {
      if (allowEmpty) {
        return true
      } else {
        return false
      }
    }
    return true
  } else {
    return false
  }
}

export function validateURL (url) {
  var re = /^((http|https):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/
  if (re.test(url)) {
    return true
  } else {
    return false
  }
}

export function getYouTubeID (url) {
  if (!url) {
    return null
  }
  var re = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/ // eslint-disable-line no-useless-escape
  var match = url.match(re)
  if (match && match[2].length === 11) {
    return match[2]
  } else {
    return null
  }
}

export function formatNumber (newVal, oldVal, max) {
  const notANumber = newVal && isNaN(newVal.charAt(newVal.length - 1))
  const tooLarge = newVal && newVal.length > max
  if (notANumber || tooLarge) {
    return oldVal
  } else {
    return newVal
  }
}
