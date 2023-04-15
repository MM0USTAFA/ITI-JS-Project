import Category from '../models/category.js'

export default class CategoryItem {
  constructor(category) {
    this.category = category ?  new Category(category) : {id: 'ALL', title: "All"}
    this._item = this._generateItem()
  }

  _generateItem() {
    const item = document.createElement('button')
    item.id = this.category.id
    item.className = `btn btn-outline-primary rounded-pill`
    item.textContent = this.category.title
    return item
  }

  activeItem() {
    if (!this._item.classList.contains('active')) {
      this._item.classList.add('active')
    }
  }

  disactiveItem() {
    if (this._item.classList.contains('active')) {
      this._item.classList.remove('active')
    }
  }

  getItem() {
    return this._item
  }
}
