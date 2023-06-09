import Utilities from './utils/utilities.js'
const form = document.querySelector('form')

const submitEventHandler = (ev) => {
  ev.preventDefault()
  const email = form.querySelector('[name="email"]').value
  const password = form.querySelector('[name="password"]').value
  const smbtBtn = form.querySelector('button[type="submit"]')
  smbtBtn.disabled = true
  Utilities.dealWithAPIs('/login', 'POST', JSON.stringify({email, password}), {'Content-Type': 'application/json'})
    .then(({token, user}) => {
      Utilities.saveCookie('token', token, {'max-age': 60*60*24*365})
      window.sessionStorage.setItem('user', JSON.stringify(user))
      location.replace('shop.html')
    })
    .catch((err) => {
      console.log(err);
      form.querySelectorAll('input').forEach(inputEl => {
        inputEl.classList.add('is-invalid')
        if(inputEl.nextElementSibling){
          return
        }
        inputEl.insertAdjacentHTML('afterend', `<div class="invalid-feedback">Invalid email or password</div>`)
      })
    })
    .finally(() => {
      smbtBtn.disabled = false
    })
}

form.addEventListener('submit', submitEventHandler)
