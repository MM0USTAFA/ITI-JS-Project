import Utilities from './utils/utilities.js'
const form = document.querySelector('form')

const submitEventHandler = (ev) => {
  ev.preventDefault()
  const fd = new FormData(ev.target)
  const smbtBtn = form.querySelector('button[type="submit"]')
  smbtBtn.disabled = true
  Utilities.dealWithAPIs('/signup', 'POST', fd)
    .then((data) => {
      document.body.innerHTML += `
        <div class="toast text-bg-success align-items-center fade show position-fixed mb-3 me-3 bottom-0 end-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex justify-content-center">
            <div class="toast-body">
              Account created successfully
            </div>
          </div>
        </div>`
      setTimeout(() => {
        location.replace('login.html')
      }, 500)
    })
    .catch((err) => {
      if (err instanceof Array) {
        console.log(err)
        for (const { param, msg } of err) {
          const element = form.querySelector(`input[name="${param}"]`)
          if(element.nextElementSibling){
            return
          }
          element.insertAdjacentHTML(
            'afterend',
            `<div class="invalid-feedback d-block">${msg}</div>`
          )
          element.classList.add('is-invalid')
        }
      }
    })
    .finally(() => {
      smbtBtn.disabled = false
    })
}

form.addEventListener('submit', submitEventHandler)
