export default class Utilities {
  static BASE_URL = 'https://iti-js-api.onrender.com'

  static replacingObjToHTMLCriteria(matched){
    return matched === ':' ? '=' : ''
  }

  // "key"="value"

  static convertObjToHTMLAttr(HTMLAttrObj){
    const HTMLAttrObjStr = JSON.stringify(HTMLAttrObj) // test=test
    const convertedObject = HTMLAttrObjStr.replace(/([ :{}"])/g, Utilities.replacingObjToHTMLCriteria)
    return convertedObject
  }

  // {xxl: 6, xl: 6, lg: 12, other: 12}
  // prefix = col
  static convertObjToCSSClasses(prefix, cssObject){
    const classes = []
    for (const key in cssObject) {
      classes.push(`${prefix}${key !== 'other' ? `-${key}`: ''}-${cssObject[key]}`)
      // col-xxl-6
      // col-12
    }
    return classes
  }

  static async dealWithAPIs(path, method="GET", body=null){
    const fetchOptions = {
      method: method,
      body: body,
      headers: {'Content-Type': 'application/json'}
    }
    const response = await fetch(`${Utilities.BASE_URL}${path}`, fetchOptions)
    const data = await response.json()
    return data
  }
}
