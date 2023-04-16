import User from '../models/user.js'

export default class Header {
  static toggleProfile(_user) {
    const user = _user && new User(_user)
    const profilleSection = document.getElementById('profile-section')

    if (!user) {
      const loginBtn = document.createElement('a')
      loginBtn.className = `btn btn-outline-primary me-2`
      loginBtn.href = 'login.html'
      loginBtn.textContent = 'Login'
      profilleSection.innerHTML = loginBtn.outerHTML
      return
    }
    const profileEl = document.createElement('a')
    profileEl.className =
      'd-block link-dark text-decoration-none dropdown-toggle show'
    profileEl.dataset.bsToggle = 'dropdown'
    profileEl.className =
      'd-block link-dark text-decoration-none dropdown-toggle show'
    profileEl.dataset.bsToggle = 'dropdown'

    const profileImg = document.createElement('img')
    profileImg.src = user.getAvatar()
    profileImg.width = 32
    profileImg.height = 32
    profileImg.className = 'rounded-circle'
    profileEl.appendChild(profileImg)

    profilleSection.innerHTML = profileEl.outerHTML
    profilleSection.innerHTML += `
      <ul class="dropdown-menu text-small hide" data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 34px);">
        <li><a class="dropdown-item" href="profile.html">Profile</a></li>
        <li><a class="dropdown-item" href="orders.html">Orders</a></li>
      </ul>
    `
  }

  static updateCartCounter(counter){
    const badge = document.querySelector('header a[href*="cart"] .badge')
    badge.textContent = counter
  }

  // _initNavProfile(navProfile){
  //   if(!this.user){
  //     const loginBtn = document.createElement('a')
  //     loginBtn.className = `btn btn-outline-primary me-2`
  //     loginBtn.href = 'login.html'
  //     loginBtn.textContent = 'Login'
  //     navProfile.innerHTML = loginBtn.outerHTML
  //   }else{
  //     const profileEl = document.createElement('a')
  //     profileEl.className = "d-block link-dark text-decoration-none dropdown-toggle show"
  //     profileEl.dataset.bsToggle = "dropdown"

  //     const profileImg = document.createElement('img')
  //     profileImg.src = this.user.getAvatar()
  //     profileImg.width = 32
  //     profileImg.height = 32
  //     profileImg.className = 'rounded-circle'
  //     profileEl.appendChild(profileImg)

  //     navProfile.innerHTML = profileEl.outerHTML
  //     /**
  //      * <div class="dropdown text-end">
  //         <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
  //           <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
  //         </a>
  //         <ul class="dropdown-menu text-small show" data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 34px);">
  //           <li><a class="dropdown-item" href="#">New project...</a></li>
  //           <li><a class="dropdown-item" href="#">Settings</a></li>
  //           <li><a class="dropdown-item" href="#">Profile</a></li>
  //           <li><hr class="dropdown-divider"></li>
  //           <li><a class="dropdown-item" href="#">Sign out</a></li>
  //         </ul>
  //       </div>
  //      */
  //   }
  // }

  // _generateItem(){
  //   const header = document.createElement('header')
  //   header.className = `p-3 mb-3 border-bottom container`

  //   const row = document.createElement('div')
  //   row.className = 'row'

  //   const navList = document.createElement('ul')
  //   navList.id = 'navigation-section'
  //   navList.className = 'nav nav-pills col-9 col-sm-10'

  //   const navProfile = document.createElement('div')
  //   navProfile.id = 'profile-section'
  //   navProfile.className = 'col-3 col-sm-2 text-end'
  //   this._initNavLinks(navList)
  //   this._initNavProfile(navProfile)
  //   header.appendChild(navList)
  //   header.appendChild(navProfile)
  //   return header
  // }
}
