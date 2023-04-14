import Modal from './components/mdoal.js'
import Button from './components/button.js'
import ProductItem from './components/productItem.js'
import Utilities from './utils/utilities.js'
import Row from './layouts/row.js'
import Product from './models/product.js'
import CategoryItem from './components/categoryItem.js'
import Pagination from './components/pagination.js'

const dismissBtn = new Button(null, 'close', {
  attrs: { 'data-bs-dismiss': 'modal' },
  color: 'secondary'
})
const saveBtn = new Button('save', 'save', { color: 'primary' })
const h1 = document.createElement('h1')
h1.textContent = 'Hello World'
const modal = new Modal(
  'test',
  "Alaa's Title",
  h1,
  dismissBtn.getBtn(),
  saveBtn.getBtn()
)
// modal.show()

// const product = new Product({
//   _id: '643602fd7754131ac504b0cd',
//   title: 'product 22',
//   price: 500,
//   thumbnail: 'https://iti-js-api.onrender.com/file/643749b46f5aaa9fc59096e2',
//   isOffered: true,
//   discountPercentage: 2.5,
//   category: {
//     _id: '6435f519898aa1717833d0b1',
//     title: 'category 3',
//     thumbnail: 'https://via.placeholder.com/300'
//   },
//   createdAt: '2023-04-12T01:01:49.492Z',
//   updatedAt: '2023-04-12T01:01:49.492Z',
//   __v: 0
// })
// const pItem = new ProductItem(product)
// document.body.appendChild(pItem.getItem())
// console.log();

// const pi = new ProductItem({_id: 'test', category: {_id: 'test'}})
// const row = new Row()

// const col = row.appendCol({xxl: 12}, "d-flex justify-content-between p-5")
// const col2 = row.appendCol({xxl: 12})
// document.body.appendChild(row.getRow())
// col.appendChild(new Button(null, 'test').getDOMObject())
// col.appendChild(new Button(null, 'test').getDOMObject())
// col.appendChild(new Button(null, 'test').getDOMObject())
// col2.appendChild(new Button(null, 'test').getDOMObject())
// col2.appendChild(new Button(null, 'test').getDOMObject())
// col2.appendChild(new Button(null, 'test').getDOMObject())
// setTimeout(()=> {
//   col2.remove()
// }, 3000)
// console.log(col2)

// document.body.appendChild(pi.getDOMObject())

// pi.addToCartBtn.addEventListener('click', ()=> console.log('clicked'))

// const row = new Row()
// const menuGroup = row.appendCol({other: 12}, 'container d-flex flex-wrap gap-1')
// const citem = new CategoryItem()
// const citem2 = new CategoryItem({_id: 'test2', title: "category title 2"})
// const citem3 = new CategoryItem({_id: 'test3', title: "category title 3"})
// const citem4 = new CategoryItem({_id: 'test4', title: "category title 4"})
// const citem5 = new CategoryItem({_id: 'test5', title: "category title 5"})
// const citem6 = new CategoryItem({_id: 'test6', title: "category title 6"})
// const citem7 = new CategoryItem({_id: 'test7', title: "category title 7"})
// const citem8 = new CategoryItem({_id: 'test8', title: "category title 8"})
// const citem9 = new CategoryItem({_id: 'test9', title: "category title 9"})
// const citem10 = new CategoryItem({_id: 'test10', title: "category title 10"})
// const citem11 = new CategoryItem({_id: 'test11', title: "category title 11"})
// const citem12 = new CategoryItem({_id: 'test12', title: "category title 12"})
// const citem13 = new CategoryItem({_id: 'test13', title: "category title 13"})
// const citem14 = new CategoryItem({_id: 'test14', title: "category title 14"})
// menuGroup.appendChild(citem.getItem())
// menuGroup.appendChild(citem2.getItem())
// menuGroup.appendChild(citem3.getItem())
// menuGroup.appendChild(citem4.getItem())
// menuGroup.appendChild(citem5.getItem())
// menuGroup.appendChild(citem6.getItem())
// menuGroup.appendChild(citem7.getItem())
// menuGroup.appendChild(citem8.getItem())
// menuGroup.appendChild(citem9.getItem())
// menuGroup.appendChild(citem10.getItem())
// menuGroup.appendChild(citem11.getItem())
// menuGroup.appendChild(citem12.getItem())
// menuGroup.appendChild(citem13.getItem())
// menuGroup.appendChild(citem14.getItem())
// document.body.appendChild(menuGroup)
// citem.activeItem()

// const pagination = new Pagination(10, location.hash.replace('#', ''))

// document.body.appendChild(pagination.getItem())
