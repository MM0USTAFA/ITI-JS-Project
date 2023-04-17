export default class User{
  
  constructor(user){
    this.id = user._id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.address = user.address
    this.avatar = user.avatar
    this.phoneNumber = user.phoneNumber
  }

  getFullName(){
    return this.firstName + ' ' + this.lastName
  }

  getAvatar(){
    return `https://iti-js-api.onrender.com/file/${this.avatar}`
  }
  
}