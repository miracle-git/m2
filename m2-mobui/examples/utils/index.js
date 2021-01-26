export function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

export function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

export function stripTemplate(content) {
  content = content.trim()
  if (!content) {
    return content
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
}

const escapeRegExp = function(strToEscape) {
  // Escape special characters for use in a regular expression
  return strToEscape.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')// eslint-disable-line
}

export function trimChar(origString, charToTrim) {
  charToTrim = escapeRegExp(charToTrim)
  const regEx = new RegExp('^[' + charToTrim + ']+|[' + charToTrim + ']+$', 'g')
  return origString.replace(regEx, '')
}
