import Button from './button.js'

export default class ProductModalBody {
  constructor(
    product,
    addToCartHandler,
    qty = 0
  ) {
    this.product = product
    this.qty = qty
    this.addToCartHandler = addToCartHandler
    this._item = this._generateItem()
    this._initAction()
  }

  _generateItem() {
    const item = document.createElement('div')
    item.className = `d-flex flex-column align-items-center`

    item.innerHTML = `
      <img
        src="${this.product.getThumbnail()}"
        class="img-fluid w-50 rounded-3 mb-3"
        alt=""
      />

      <div class="d-flex justify-content-between w-50 container mb-3">
        <h2 class="text-black">${this.product.title}</h2>
        <h2 class="text-muted">${this.product.category.title}</h2>
      </div>

      <div class="d-flex justify-content-between flex-row w-50 container">
        <h3 class="text-muted">$${this.product.displayPrice()}</h3>
        <div id="actions" class="d-flex col-3">
        </div>
      </div>
    `

    return item
  }

  _initAction() {
    const actionsSection = this._item.querySelector(`#actions`)
    const addToCartBtn = new Button(null, 'Add to cart', {
      color: 'danger',
      style: 'btn-sm'
    }).getBtn()
    addToCartBtn.onclick = this.addToCartHandler.bind(this.product)
    actionsSection.appendChild(addToCartBtn)
  }

  getItem() {
    return this._item
  }
}
