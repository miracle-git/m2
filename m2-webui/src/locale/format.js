/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
import { hasOwn } from '../utils/main'
const regex = /(%|)\{([0-9a-zA-Z_]+)\}/g

export default () => {
  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */
  function template(string, ...args) {
    if (args.length === 1 && typeof args[0] === 'object') {
      args = args[0]
    }

    if (!args || !args.hasOwnProperty) {
      args = {}
    }

    return string.replace(regex, (match, prefix, i, index) => {
      let result

      if (string[index - 1] === '{' &&
        string[index + match.length] === '}') {
        return i
      } else {
        result = hasOwn(args, i) ? args[i] : null
        if (result === null || result === undefined) {
          return ''
        }

        return result
      }
    })
  }

  return template
}
