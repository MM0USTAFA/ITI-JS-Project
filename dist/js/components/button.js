import Utilities from '../utils/utilities.js'


//const primaryButton = new Button( id="button1", content="Click me", {color: "primary", attrs: { "data-action": "do-something", tabindex: "1" }})




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
    for (const property in this.attrs) {
      btn.setAttribute(property, this.attrs[property])
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
