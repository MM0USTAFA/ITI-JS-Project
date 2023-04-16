export default class Utilities {
  static BASE_URL = 'https://iti-js-api.onrender.com'
  // static BASE_URL = 'http://localhost:3000'

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

  static async dealWithAPIs(path, method='GET', body=null, headers=null) {
    const fetchOptions = {
      method: method,
      body: body,
      mode: 'cors',
    }

    if(headers){
      fetchOptions.headers = headers
    }
    const response = await fetch(`${Utilities.BASE_URL}${path}`, fetchOptions)
    const data = await response.json()
    if(response.status < 400){
      return data
    }
    return Promise.reject(data)
  }
}
