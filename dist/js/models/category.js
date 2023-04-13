export default class Category{
  
  constructor(category){
    this.id = category._id
    this.title = category.title
    this.thumbnail = category.thumbnail
  }

}