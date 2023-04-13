import Category from "./category.js"

export default class Product{
  
  constructor(product){
    this.id = product._id
    this.title = product.title
    this.price = product.price
    this.thumbnail = product.thumbnail
    this.isOffered = product.isOffered
    this.discountPercentage = product.discountPercentage
    this.category = new Category(product.category)
  }

  displayPrice(){
    return this.isOffered ? this.price - this.price * this.discountPercentage / 100 : this.price
  }
  
}