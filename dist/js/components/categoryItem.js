import Category from '../models/category.js'

export default class CategoryItem {
  constructor(category, categoryClickedHandler) {
    this.category = category ?  new Category(category) : {id: 'ALL', title: "All"}
    this.categoryClickedHandler = categoryClickedHandler
    this._item = this._generateItem()
  }

  _generateItem() {
    const item = document.createElement('button')
    item.dataset.bsCategoryId = this.category.id
    item.className = `btn btn-outline-primary rounded-pill`
    item.textContent = this.category.title
    item.onclick = this.categoryClickedHandler.bind(this)
    return item
  }

  activeItem(id) {
    const category = this.getItem().parentNode.querySelector(`button[data-bs-category-id="${id}"]`)
    if(category){
      category.classList.add('active')
    }
  }

  disactiveItem() {
    const acitiveItem = this.getItem().parentNode.querySelector('.active')
    if (acitiveItem) {
      acitiveItem.classList.remove('active')
    }
  }

  getItem() {
    return this._item
  }
}
