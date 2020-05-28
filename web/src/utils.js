/* eslint-disable */
export function getCookie (name) {
  var cookieName = encodeURIComponent(name) + '='
  var cookieStart = document.cookie.indexOf(cookieName)
  var cookieValue = null
  if (cookieStart > -1) {
    var cookieEnd = document.cookie.indexOf(';', cookieStart)
    if (cookieEnd === -1) {
      cookieEnd = document.cookie.length
    }
    cookieValue = decodeURIComponent(
      document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
    )
  }
  return cookieValue
}

export function setCookie (name, value, exdays) {
  if (!exdays) {
    document.cookie = name + '=' + value
    return
  }
  var d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  var expires = 'expires=' + d.toUTCString()
  document.cookie = name + '=' + value + '; ' + expires
}

export function delCookie (name, path) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = 'null'
  if (!path) {
    path = '/'
  }
  if (cval != null)
    document.cookie = name + "=" + cval + "; expires="+exp.toGMTString()+ "; path=" + path
}
