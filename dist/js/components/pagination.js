export default class CategoryItem {
  constructor(pageClickedHandler, pages, currentPage = 1) {
    this.pages = pages
    this.currentPage = currentPage
    this.pageClickedHandler = pageClickedHandler
    this._item = this._generateItem()
  }

  _generateItem() {
    const item = document.createElement('nav')
    const list = this._generateList()
    item.appendChild(list)
    return item
  }

  _generateList() {
    const list = document.createElement('ul')
    list.className = `pagination`
    for (let page = 1; page <= this.pages; page++) {
      const li = document.createElement('li')
      li.classList.add('page-item')
      const link = document.createElement('button')
      link.className = `page-link ${this.currentPage == page ? 'active' : ''}`.trim()
      link.dataset.bsPage = page
      link.textContent = page
      link.onclick = this.pageClickedHandler.bind(link, page)
      li.appendChild(link)
      list.appendChild(li)
    }
    return list
  }

  activeItem(page) {
    this._disactiveAll()
    const pageItem = this._item.querySelector(`a[data-bs-page="${page}"]`)
    pageItem.classList.add('active')
  }

  _disactiveAll() {
    this._item.querySelectorAll('li a').forEach((link) => {
      if (link.classList.contains('active')) {
        link.classList.remove('active')
      }
    })
  }

  getItem() {
    return this._item
  }
}
