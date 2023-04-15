import Utilities from '../utils/utilities.js'

export default class Button {
  constructor(id, content, options = {}) {
    this.id = id
    this.content = content
    this.attrs = options.attrs || {}
    this.color = options.color || 'primary'
    this.style = options.style || ''
    this.type = options.type || 'button'
    this._btn = this._generateButton()
  }

  _initAttributes(btn){
    const attributes = Utilities.convertObjToHTMLAttr(this.attrs).trim()
    if(attributes.length === 0){
      return
    }

    for (const attr of attributes) {
      const [attribute, value] = attr.split('=')
      btn.setAttribute(attribute, value)
    }
  }

  _generateButton() {
    const btn = document.createElement('button')
    btn.id = this.id || null
    btn.type = this.type
    btn.className = `btn btn-${this.color} ${this.style}`.trim();
    this._initAttributes(btn)
    btn.innerHTML = this.content
    return btn
  }

  getBtn() {
    return this._btn
  }
}
