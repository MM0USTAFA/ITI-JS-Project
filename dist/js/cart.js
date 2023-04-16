import Header from './utils/header.js'
import Utilities from './utils/utilities.js'
import Product from './models/product.js'

const container = document.querySelector('main.container')
const layoutTemp = document
  .getElementById('layout-template')
  .content.cloneNode(true).firstElementChild
const itemsContainerTemp = document
  .getElementById('items-container')
const cartItemTemp = document.getElementById('cart-item')
const summaryTemp = document.getElementById('summary')

const incrementHandler = function(product, ev) {
  const cart = Utilities.getCart()
  const itemsBadge = document.querySelector('span.item-count-badge')
  const totalItemPrice = document.querySelector('div.total-items-price')
  const totalAmount = document.querySelector('div.total-amount')
  const priceEl = this.querySelector('h6.price-text')
  const qtyInput = this.querySelector('input[name="quantity"]')
  const qty = ++cart.products[product.id]
  qtyInput.value = qty
  priceEl.textContent = `${+qty * product.displayPrice()}$`
  itemsBadge.textContent = +itemsBadge.textContent + 1
  totalItemPrice.textContent = `${parseFloat(totalItemPrice.textContent) + product.displayPrice()}$`
  totalAmount.textContent = `${parseFloat(totalItemPrice.textContent) + 10}$`
  window.localStorage.setItem('cart', JSON.stringify(cart))
}

const decrementHandler = function(product, ev) {
  const cart = Utilities.getCart()
  const itemsBadge = document.querySelector('span.item-count-badge')
  const totalItemPrice = document.querySelector('div.total-items-price')
  const totalAmount = document.querySelector('div.total-amount')
  const priceEl = this.querySelector('h6.price-text')
  const qtyInput = this.querySelector('input[name="quantity"]')
  const qty = --cart.products[product.id]
  qtyInput.value = qty
  priceEl.textContent = `${+qty * product.displayPrice()}$`
  itemsBadge.textContent = +itemsBadge.textContent - 1
  totalItemPrice.textContent = `${parseFloat(totalItemPrice.textContent) - product.displayPrice()}$`
  totalAmount.textContent = `${parseFloat(totalItemPrice.textContent) + 10}$`
  if(qty === 0){
    this.remove()
    delete cart.products[product.id]
    Header.updateCartCounter(cart.size())
  }
  window.localStorage.setItem('cart', JSON.stringify(cart))
  if(cart.size() === 0){
    container.innerHTML = `<h1>Empty cart :(</h1>`
  }
}

const deleteHandler = function(product, ev){
  const cart = Utilities.getCart()
  const itemsBadge = document.querySelector('span.item-count-badge')
  const totalItemPrice = document.querySelector('div.total-items-price')
  const totalAmount = document.querySelector('div.total-amount')
  const qty = cart.products[product.id]
  itemsBadge.textContent = +itemsBadge.textContent - qty
  totalItemPrice.textContent = parseFloat(totalItemPrice.textContent) - (product.displayPrice() * qty)
  totalAmount.textContent = `${parseFloat(totalItemPrice.textContent) + 10}$`
  delete cart.products[product.id]
  Header.updateCartCounter(cart.size())
  this.remove()
  window.localStorage.setItem('cart', JSON.stringify(cart))
  if(cart.size() === 0){
    container.innerHTML = `<h1>Empty cart :(</h1>`
  }
}

const initHeader = () => {
  const user = window.sessionStorage.getItem('user')
  Header.toggleProfile(user && JSON.parse(user))
  const cart = Utilities.getCart()
  Header.updateCartCounter(cart.size())
}

const initLayout = (products) => {
  initItemsContainer(products)
  initSummaryContainer(products)
  container.appendChild(layoutTemp)
}

const initItemsContainer = (products) => {
  if (products.length === 0) {
    layoutTemp.innerHTML = `<h1>Empty cart :(</h1>`
    return
  }

  const cart = Utilities.getCart()
  const itemsContainer = itemsContainerTemp.content.cloneNode(true).firstElementChild
  for (const _product of products) {
    const product = new Product(_product)
    const cartItem = cartItemTemp.content.cloneNode(true).firstElementChild
    const pImg = cartItem.querySelector('img.product-img')
    pImg.src = product.getThumbnail()

    const pTitle = cartItem.querySelector('h6.product-title')
    pTitle.textContent = product.title

    const pCategory = cartItem.querySelector('h6.category-title')
    pCategory.textContent = product.category.title

    const incrementBtn = cartItem.querySelector('button.increment-btn')
    const decrementBtn = cartItem.querySelector('button.decrement-btn')
    const deleteBtn = cartItem.querySelector('a.delete-item')

    incrementBtn.onclick = incrementHandler.bind(cartItem, product)
    decrementBtn.onclick = decrementHandler.bind(cartItem, product)
    deleteBtn.onclick = deleteHandler.bind(cartItem, product)


    const qtyInput = cartItem.querySelector('input[name="quantity"]')
    qtyInput.value = cart.products[product.id]

    const priceLabel = cartItem.querySelector('h6.price-text')
    priceLabel.textContent = `${product.displayPrice() * cart.products[product.id]}$`

    itemsContainer.appendChild(cartItem)
  }

  layoutTemp.appendChild(itemsContainer)
}

const initSummaryContainer = (products) => {
  if (products.length === 0) {
    return
  }
  const cart = Utilities.getCart()

  const {itemsCount, total} = products.reduce(
    (sumObj, _product) => {
      const product = new Product(_product)
      sumObj.total += product.displayPrice() * cart.products[product.id]
      sumObj.itemsCount += cart.products[product.id]
      return sumObj
    },
    { itemsCount: 0, total: 0 }
  )

  const summaryContainer = summaryTemp.content.cloneNode(true).firstElementChild
  
  const itemsCountBadge = summaryContainer.querySelector('span.item-count-badge')
  itemsCountBadge.textContent = itemsCount

  const totalItemsPrice = summaryContainer.querySelector('div.total-items-price')
  totalItemsPrice.textContent = `${total}$`

  const shippingPrice = summaryContainer.querySelector('div.shipping-price')
  shippingPrice.textContent = `10$`

  const totalAmount = summaryContainer.querySelector('div.total-amount')
  totalAmount.textContent = `${10 + total}$`

  layoutTemp.appendChild(summaryContainer)
}

const getCartProductsIds = () => {
  const cart = Utilities.getCart()
  return Object.keys(cart.products)
}

initHeader()
Utilities.dealWithAPIs(
  '/validate-cart',
  'POST',
  JSON.stringify({ pIds: getCartProductsIds() }),
  { 'Content-Type': 'application/json' }
).then((products) => {
  initLayout(products)
}).catch(err => {
  console.log(err);
})
