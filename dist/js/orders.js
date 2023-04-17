import Utilities from './utils/utilities.js'
import Header from './utils/header.js'

const ordersTable = document.getElementById('orders-table').content.cloneNode(true).firstElementChild
const paginationLayout = document.getElementById('pagination-layout').content.cloneNode(true).firstElementChild
const orderItemTemp = document.getElementById('order-item')

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

const initOrders = (orders) => {

}

const getOrders = () => {
  const { token } = Utilities.getCookiesObject()
  Utilities.dealWithAPIs('/orders', 'GET', null, { Authorization: token }).then(
    (orders) => {
      initOrders(orders)
    }
  )
}

initHeader()
getOrders()
