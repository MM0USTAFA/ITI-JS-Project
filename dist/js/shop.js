import Row from './layouts/row.js';
import Utilities from './utils/utilities.js';
import CategoryItem from './components/categoryItem.js';
import ProductItem from './components/productItem.js';
import Pagination from './components/pagination.js';
import PlaceHolders from './utils/placeholders.js';
import Modal from './components/mdoal.js';

const container = document.querySelector('main.container')


const addToCartHandler = function() {
  
}

const showDetailsHandler = function() {
  const {product} = this
  console.log(product);
  const modal = new Modal(product.id, "",document.createElement('h1'))
  modal.show()
}

const pageClickedHandler = function(page) {
  console.log(this);
  console.log(page);
}

const initPlaceHolders = ()=> {
  container.innerHTML = PlaceHolders.generateCategoriesPH()
  container.innerHTML += PlaceHolders.generateProductsPH(8)
}

const initCategories = (categories) => {
  const categoriesGroup = new Row().appendCol({other: 12}, "d-flex flex-wrap gap-1 mb-3")
  const allCategories = new CategoryItem().getItem()
  categoriesGroup.appendChild(allCategories)
  allCategories.classList.add('active')
  for (const category of categories) {
    const categoryItem = new CategoryItem(category).getItem()
    categoriesGroup.appendChild(categoryItem)
  }
  container.appendChild(categoriesGroup)
}

const initProducts = ({products, page: currentPage, pages}) => {
  const productsGroup = new Row()
  for (const product of products) {
    const col = productsGroup.appendCol({xl: 3, md: 4}, 'mb-3')
    const pItem = new ProductItem(product, addToCartHandler, showDetailsHandler).getItem()
    col.appendChild(pItem)
    productsGroup.getRow().appendChild(col)
  }
  container.appendChild(productsGroup.getRow())

  initPagination(pages, currentPage)
}

const initPagination = (pages, currentPage) =>{
  const paginationGroup = new Row().appendCol({other: 12}, "d-flex justify-content-center")
  const pagination = new Pagination(pageClickedHandler, pages, currentPage).getItem()
  paginationGroup.appendChild(pagination)
  container.appendChild(paginationGroup)
}

initPlaceHolders()
Utilities.dealWithAPIs("/categories").then(categories => {
  Utilities.dealWithAPIs('/products').then(products => {
    container.innerHTML  = ''
    initCategories(categories)
    initProducts(products)
  })
})

