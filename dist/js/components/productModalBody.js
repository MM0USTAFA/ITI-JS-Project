import Button from './button.js'

export default class ProductModalBody {
  constructor(product, qty = 0) {
    this.product = product
    this.qty = qty
    this._item = this._generateItem()
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
    /**
     * <div class="d-flex flex-column align-items-center">
        <div class="d-flex justify-content-between flex-row w-50 container">
          <h3 class="text-muted">$200</h3>
          <div id="actions" class="d-flex col-3">
            <button
              class="btn btn-link px-2"
              onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
            >
              <i class="fas fa-minus"></i>
            </button>
  
            <input
              id="form1"
              min="0"
              name="quantity"
              value="1"
              type="number"
              class="text-center form-control form-control-sm"
            />
  
            <button
              class="btn btn-link px-2"
              onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
            >
              <i class="fas fa-plus"></i>
            </button>
        </div>
        </div>
      </div>
     */
  }

  _initActions() {
    const actionsSection = this._item.querySelector(`#actions`)
    
    if (this.qty === 0) {
      const addToCartBtn = new Button(null, 'Add to cart', { color: 'danger' })
      actionsSection.appendChild(addToCartBtn)
      return
    }

    const 
  }
}
