/**
 * Share utilities. Includes a pop-up window and sharer utilities
 * coded specifically for each service.
 * The functions can be invoked with urlParams to be added on top of the current URL to be shared.
 */
export function shareOnTwitter (urlParams = "", text, via, title) {
  var shareUrl = `${window.location.origin}${window.location.pathname}`
  var newText = stripTags(text)
  if (urlParams) {
    shareUrl += "?" + urlParams
  }
  if (newText.length > 111) {
    newText = newText.substring(0, 111) + "..."
  }
  const shareServiceUrl = "https://twitter.com/intent/tweet/"
  popUpWindow(`${shareServiceUrl}?url=${encodeURIComponent(shareUrl)}&text=${encodeURI(newText)}&via=${encodeURI(via)}`, `${encodeURI(title)}`, 450, 320)
}

export function shareOnLinkedIn (urlParams, text, via, title) {
  const shareServiceUrl = "http://www.linkedin.com/shareArticle/"
  var newText = stripTags(text)
  var shareUrl = `${window.location.origin}${window.location.pathname}`
  if (urlParams) {
    shareUrl += "?" + urlParams
  }
  if (newText.length > 211) {
    newText = newText.substring(0, 211) + "..."
  }
  popUpWindow(`${shareServiceUrl}?mini=true&url=${encodeURIComponent(shareUrl)}&text=${encodeURI(newText)}`, `${encodeURI(title)}`, 650, 420)
}

export function shareByEmail (urlParams, text, via, title) {
  document.querySelector(".at-share-btn").click()
}

export function shareOnFacebook (urlParams, text, via, title) {
  var shareUrl = `${window.location.origin}${window.location.pathname}`
  if (urlParams) {
    shareUrl += "?" + urlParams
  }
  var newText = stripTags(text)
  if (newText.length > 140) {
    newText = newText.substring(0, 140) + "..."
  }
  if (window) {
    window.FB.ui({
      method: "share",
      href: shareUrl,
      quote: newText,
      hashtag: `#${via}`
    }, function (response) {
      return response
    })
  }
}

export function popUpWindow (url, title, w, h) {
  // Credit goes to https://stackoverflow.com/a/16861050/1176464
  // Fixes dual-screen position                         Most browsers      Firefox
  var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
  var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

  var left = ((width / 2) - (w / 2)) + dualScreenLeft
  var top = ((height / 2) - (h / 2)) + dualScreenTop
  var newWindow = window.open(url, title, "scrollbars=yes, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left)

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
}

function stripTags (text) {
  return text.replace(/(<([^>]+)>)/ig, "")
}
