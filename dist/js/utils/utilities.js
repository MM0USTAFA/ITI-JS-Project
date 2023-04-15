export default class Utilities {
  static BASE_URL = 'https://iti-js-api.onrender.com'

  static replacingObjToHTMLCriteria(matched) {
    return matched === ':' ? '=' : matched === ',' ? ' ' : ''
  }

  static convertObjToHTMLAttr(HTMLAttrObj) {
    const HTMLAttrObjStr = JSON.stringify(HTMLAttrObj) // test=test
    const convertedObject = HTMLAttrObjStr.replace(
      /([ :{},"])/g,
      Utilities.replacingObjToHTMLCriteria
    )
    return convertedObject
  }

  static convertObjToCSSClasses(prefix, cssObject) {
    const classes = []
    for (const key in cssObject) {
      classes.push(
        `${prefix}${key !== 'other' ? `-${key}` : ''}-${cssObject[key]}`
      )
    }
    return classes
  }

  static async dealWithAPIs(path, method = 'GET', body = null) {
    const fetchOptions = {
      method: method,
      body: body,
      headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch(`${Utilities.BASE_URL}${path}`, fetchOptions)
    const data = await response.json()
    return data
  }
}
