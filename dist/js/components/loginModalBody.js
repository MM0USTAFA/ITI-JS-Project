import Button from './button.js'

export default class LoginModalBody {
  constructor(submitHandler) {
    
    this.submitHandler = submitHandler
    this._item = this._generateItem()
    this._initAction()
  }

  _generateItem() {
    const item = document.createElement('div')
    item.className = `d-flex flex-column align-items-center`

    item.innerHTML = `
      <form class="w-100">
        <div class="mb-3">
            <label class="form-label">Email address</label>
            <input type="email" class="form-control"  aria-describedby="emailHelp" name="email">
          </div>
        <div class="mb-3">
          <label  class="form-label">Password</label>
          <input type="password" class="form-control" name="password">
        </div>
        <p>you have on an account? <a href="register.html">Register</a></p>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    `

    return item
  }

  _initAction() {
    this._item.querySelector('form').onsubmit = this.submitHandler
  }

  getItem() {
    return this._item
  }
}
