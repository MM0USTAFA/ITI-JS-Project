import Utilities from './utils/utilities.js'
import Header from './utils/header.js'
import User from './models/user.js'

const profileImg = document.getElementById('profile-image')
const usernameLbl = document.getElementById('username')
const userEmailLbl = document.getElementById('useremail')
const userEditForm = document.getElementById('user-edit')
const toggleEditingBtn = document.getElementById('toggle-edit-btn')

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

const disableUserEditForm = (user) => {
  userEditForm.querySelectorAll('input').forEach((input) => {
    input.value = user[input.getAttribute('name')]
    input.disabled = true
  })
  userEditForm.querySelector('button[type="submit"]').classList.add('d-none')
}

const activeUserEditForm = () => {
  userEditForm.querySelectorAll('input').forEach((input) => {
    input.disabled = false
  })
  userEditForm.querySelector('button[type="submit"]').classList.remove('d-none')
}

const initUserProfile = () => {
  const user =
    sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user'))
  if (!user) {
    location.replace('shop.html')
    return
  }
  disableUserEditForm(user)
  const userObj = new User(user)
  profileImg.src = userObj.getAvatar()
  usernameLbl.textContent = userObj.getFullName()
  userEmailLbl.textContent = userObj.email
}

toggleEditingBtn.addEventListener('click', (evt) => {
  if (toggleEditingBtn.classList.contains('btn-primary')) {
    toggleEditingBtn.classList.remove('btn-primary')
    toggleEditingBtn.classList.add('btn-danger')
    toggleEditingBtn.textContent = `Cancel`
    activeUserEditForm()
  } else {
    toggleEditingBtn.classList.remove('btn-danger')
    toggleEditingBtn.classList.add('btn-primary')
    toggleEditingBtn.textContent = `Edit Profile`
    initUserProfile()
  }
})

userEditForm.addEventListener('submit', (ev) => {
  ev.preventDefault()
  const { token } = Utilities.getCookiesObject()
  const fd = new FormData(ev.target)
  const data = {
    firstName: fd.get('firstName'),
    lastName: fd.get('lastName'),
    phoneNumber: fd.get('phoneNumber'),
    address: fd.get('address')
  }
  const submitBtn = ev.target.querySelector('button[type="submit"]')
  submitBtn.disabled = true
  Utilities.dealWithAPIs('/user', 'PATCH', JSON.stringify(data), {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  })
    .then(({ user }) => {
      sessionStorage.setItem('user', JSON.stringify(user))
      location.reload()
    })
    .catch((error) => {
      if (err instanceof Array) {
        for (const { param, msg } of err) {
          const element = userEditForm.querySelector(`input[name="${param}"]`)
          if (element.nextElementSibling) {
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
      submitBtn.disabled = false
    })
})

initHeader()
initUserProfile()
