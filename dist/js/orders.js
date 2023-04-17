import Utilities from './utils/utilities.js'
import Header from './utils/header.js'

const ordersTable = document
  .getElementById('orders-table')
  .content.cloneNode(true).firstElementChild
const orderItemTemp = document.getElementById('order-item')


const orderDetailsHandler = function(ev) {
  const modal = document.getElementById('order-details-modal')
  modal.querySelector('#order-date').textContent = new Date(this.createdAt).toDateString()
  modal.querySelector('#order-number').textContent = this._id
  let totalPrice = 10
  const items = this.items.map(item => {
    const productItem = document.getElementById('product-item').content.cloneNode(true).firstElementChild
    const price = item.qty * item.price
    totalPrice += price
    productItem.querySelector('#product-title').textContent = item.title
    productItem.querySelector('#product-price').textContent = `${price.toFixed(2)}$`
    return productItem
  })

  const productItem = document.getElementById('product-item').content.cloneNode(true).firstElementChild
  productItem.querySelector('#product-title').textContent = `Shipping`
  productItem.querySelector('#product-price').textContent = `10.00$`
  items.push(productItem)
  
  modal.querySelector('#total-price').textContent = `${totalPrice.toFixed(2)}$`
  modal.querySelector('#items-container').innerHTML = ``
  modal.querySelector('#items-container').append(...items)
  new bootstrap.Modal(modal).show()
}

const initHeader = () => {
  const user = window.sessionStorage.getItem('user')
  Header.toggleProfile(user && JSON.parse(user))
  const { token } = Utilities.getCookiesObject()
  if (!user && token) {
    Utilities.dealWithAPIs('/auth', 'GET', null, {
      Authorization: `Bearer ${token}`
    }).then(({ user }) => {
      if (!user) {
        return
      }
      window.sessionStorage.setItem('user', JSON.stringify(user))
      Header.toggleProfile(user)
    })
  }
  const cart = Utilities.getCart()
  Header.updateCartCounter(cart.size())
}

const initOrders = ({ orders, total }) => {
  if(orders.length === 0){
    document.querySelector('h1').insertAdjacentHTML('afterend', '<h2>No orders found</h2>')
    return
  }
  const tblBody = ordersTable.querySelector('tbody')
  for (const order of orders) {
    const orderItem = orderItemTemp.content.cloneNode(true).firstElementChild
    const orderCells = orderItem.children
    orderCells[0].textContent = order._id
    orderCells[1].textContent = order.items.length
    orderCells[2].innerHTML = `<span class="badge bg-${
      order.status === 'PENDING' ? 'secondary' : 'success'
    }">${order.status}</span>`
    orderCells[3].textContent = `${order.items.reduce((acc, item) => {
      return (acc += item.qty * item.price)
    }, 10)}$`
    const orderDetailsBtn = orderCells[4].querySelector('button')
    console.log(orderDetailsBtn);
    orderDetailsBtn.onclick = orderDetailsHandler.bind(order)
    tblBody.appendChild(orderItem)
  }
  document.querySelector('h1').insertAdjacentElement('afterend', ordersTable)
}

const getOrders = () => {
  const { token } = Utilities.getCookiesObject()
  const spinner = document.createElement('div')
  spinner.className = `spinner-border text-primary`
  spinner.innerHTML = `<span class="visually-hidden">Loading...</span>`
  document.querySelector('h1').insertAdjacentElement('beforeend', spinner)
  if(!token){
    location.replace('shop.html')
  }
  Utilities.dealWithAPIs('/orders', 'GET', null, { Authorization: token }).then(
    (orders) => {
      initOrders(orders)
    }
  ).catch(err => {
    location.replace('shop.html')
  }).finally(() => {
    spinner.remove()
  })
}

initHeader()
getOrders()
