import Button from './button.js'

export default class QtyComponent {
  constructor(product, qty, incrementHandler, decrementHandler) {
    this.product = product
    this.qty = qty
    this.incrementHandler = incrementHandler
    this.decrementHandler = decrementHandler
    this._item = this._generateItem()
  }

  _generateItem() {
    const wrapper = document.createElement('div')
    wrapper.id = 'actions'
    wrapper.className = `d-flex col-6`

    const incrementBtn = new Button(null, `<i class="fa fa-plus"></i>`, {
      style: 'btn btn-link px-2'
    })
    const decrementBtn = new Button(null, `<i class="fa fa-minus"></i>`, {
      color: 'danger',
      style: 'btn btn-link px-2'
    })

    const qtyInput = document.createElement('input')
    qtyInput.className = `text-center form-control form-control-sm`
    qtyInput.type = 'number'
    qtyInput.value = this.qty
    qtyInput.disabled = true

    incrementBtn.getBtn().onclick = this.incrementHandler.bind(wrapper, this.product, this.qty)
    decrementBtn.getBtn().onclick = this.decrementHandler.bind(wrapper, this.product, this.qty)

    wrapper.append(decrementBtn.getBtn(), qtyInput, incrementBtn.getBtn())
    return wrapper
  }

  getItem(){
    return this._item
  }
}
