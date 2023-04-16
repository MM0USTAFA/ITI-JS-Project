import Row from './layouts/row.js'
import Utilities from './utils/utilities.js'
import CategoryItem from './components/categoryItem.js'
import ProductItem from './components/productItem.js'
import Pagination from './components/pagination.js'
import PlaceHolders from './utils/placeholders.js'
import Modal from './components/mdoal.js'
import ProductModalBody from './components/productModalBody.js'
import Header from './utils/header.js'

const container = document.querySelector('main.container')

const addToCartHandler = function (evt) {
  const btn = evt.target
  const cart = (window.localStorage.getItem('cart') &&
    JSON.parse(window.localStorage.getItem('cart'))) || {
    products: {}
  }
  cart.size = function () {
    return Object.keys(this.products).length
  }
  cart.products[this.id] = +cart.products[this.id] + 1 || 1
  Header.updateCartCounter(cart.size())
  window.localStorage.setItem('cart', JSON.stringify(cart))
}

const showDetailsHandler = function () {
  const { product } = this
  const pmb = new ProductModalBody(
    product,
    addToCartHandler,
    0
  )
  const modal = new Modal(product.id, '', pmb.getItem())
  modal.show()
}

const pageClickedHandler = function (ev) {
  const btn = ev.target
  if (btn.classList.contains('active')) {
    return
  }

  this.disactiveItem()
  this.activeItem(btn.dataset.bsPage)
  const productSection = container.querySelector('#products-section')
  const activeCategory = container.querySelector('[data-bs-category-id].active')
  productSection.innerHTML = PlaceHolders.generateProductsPH(8)
  const apiPath = `/products?${
    activeCategory.dataset.bsCategoryId === 'ALL'
      ? ''
      : `category=${activeCategory.dataset.bsCategoryId}&`
  }page=${btn.textContent}`

  Utilities.dealWithAPIs(apiPath).then((products) => {
    productSection.remove()
    initProducts(products, false)
  })
}

const categoryClickedHandler = function (e) {
  if (e.target.classList.contains('active')) {
    return
  }

  this.disactiveItem()
  this.activeItem(this.category.id)
  const productSection = container.querySelector('#products-section')
  const paginationSection = container.querySelector('#pagination-section')
  productSection.innerHTML = PlaceHolders.generateProductsPH(8)
  paginationSection.remove()
  const apiPath = `/products${
    this.category.id === 'ALL' ? '' : `?category=${this.category.id}`
  }`
  Utilities.dealWithAPIs(apiPath).then((products) => {
    productSection.remove()
    initProducts(products)
  })
}

const initHeader = () => {
  const user = window.sessionStorage.getItem('user')
  Header.toggleProfile(user && JSON.parse(user))
  const cart = (window.localStorage.getItem('cart') &&
    JSON.parse(window.localStorage.getItem('cart'))) || {
    products: {}
  }
  cart.size = function () {
    return Object.keys(this.products).length
  }
  Header.updateCartCounter(cart.size())
}

const initPlaceHolders = () => {
  container.innerHTML = PlaceHolders.generateCategoriesPH()
  container.innerHTML += PlaceHolders.generateProductsPH(8)
}

const initCategories = (categories, id = 'ALL') => {
  const categoriesGroup = new Row('categories-section')
  const rowCol = categoriesGroup.appendCol(
    { other: 12 },
    'd-flex flex-wrap gap-1 mb-3'
  )
  const allCategories = new CategoryItem(null, categoryClickedHandler)
  rowCol.appendChild(allCategories.getItem())
  allCategories.activeItem(id)
  for (const category of categories) {
    const categoryItem = new CategoryItem(
      category,
      categoryClickedHandler
    ).getItem()
    rowCol.appendChild(categoryItem)
  }
  container.appendChild(categoriesGroup.getRow())
}

const initProducts = (
  { products, page: currentPage, pages },
  renderPagination = true
) => {
  const productsGroup = new Row('products-section')
  for (const product of products) {
    const col = productsGroup.appendCol({ xl: 3, md: 4 }, 'mb-3')
    const pItem = new ProductItem(
      product,
      addToCartHandler,
      showDetailsHandler
    ).getItem()
    col.appendChild(pItem)
    productsGroup.getRow().appendChild(col)
  }
  container
    .querySelector('#categories-section')
    .insertAdjacentElement('afterend', productsGroup.getRow())
  if (renderPagination) {
    initPagination(pages, currentPage)
  }
}

const initPagination = (pages, currentPage) => {
  const paginationGroup = new Row('pagination-section')
  const rowCol = paginationGroup.appendCol(
    { other: 12 },
    'd-flex justify-content-center'
  )
  const pagination = new Pagination(
    pageClickedHandler,
    pages,
    currentPage
  ).getItem()
  rowCol.appendChild(pagination)
  container.appendChild(paginationGroup.getRow())
}

initHeader()
initPlaceHolders()
Utilities.dealWithAPIs('/categories').then((categories) => {
  Utilities.dealWithAPIs('/products').then((products) => {
    container.innerHTML = ''
    initCategories(categories)
    initProducts(products)
  })
})
