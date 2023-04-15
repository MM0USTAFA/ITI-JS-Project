import Button from "./button.js"

export default class QtyComponent{
  constructor(qty){
    this.qty = qty
    this._item = this._generateItem()
  }

  _generateItem(){
    const incrementBtn = new Button(null, `<i class="fa fa-plus></i>`, {style: 'btn btn-link px-2'})
    const decrementBtn = new Button(null, `<i class="fa fa-plus></i>`, {style: 'btn btn-link px-2'})
  }
}