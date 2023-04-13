import Product from '../models/product.js'
import Button from './button.js'
export default class ProductItem {
  constructor(product) {
    this.product = new Product(product)
    this._item = this._generateItem()
    this._initItemActions()
  }

  _generateItem() {
    const item = document.createElement('div')
    item.id = this.product.id
    item.className = `card shadow-lg`
    item.innerHTML = `
      <img
        src="${this.product.thumbnail}"
        class="card-img-top"
        alt="${this.product.title}"
      />
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <p class="small"><a href="${
            this.product.category.id
          }" class="text-muted">${this.product.category.title}</a></p>
          <p class="small text-danger">${
            this.product.isOffered ? `<s>${this.product.price}</s> ` : ''
          }</p>
        </div>

        <div class="d-flex justify-content-between mb-3">
          <h5 class="mb-0">${this.product.title}</h5>
          <h5 class="text-dark mb-0">$${this.product.displayPrice()}</h5>
        </div>

        <div id="actions" class="d-flex justify-content-center gap-2 mb-3">
        </div>
      </div>`

    return item
  }

  _initItemActions() {
    const addToCartBtn = new Button(null, 'Add to cart', {
      color: 'danger'
    }).getBtn()
    const showDetailsBtn = new Button(null, 'Show Details', {
      color: 'warning'
    }).getBtn()

    this.getCardBody().querySelector('#actions').append(addToCartBtn, showDetailsBtn)
  }

  getCardBody() {
    return this._item.querySelector('.card-body')
  }

  getProduct() {
    return this.product
  }

  getItem() {
    return this._item
  }
}
