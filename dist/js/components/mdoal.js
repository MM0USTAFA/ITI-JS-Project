export default class Modal {
  constructor(id, title, bodyComponent, ...footerComponents) {
    this.id = id
    this.title = title
    this.modal = new bootstrap.Modal(this._generateModal())
    this.getBody().appendChild(bodyComponent)
    this.setFooter(footerComponents)
  }

  getModalInstance() {
    return this.modal
  }

  show(){
    this.modal.show()
  }

  hide(){
    this.modal.hide()
  }

  _generateModal() {
    const modal = document.createElement('div')
    modal.id = this.id || null
    modal.className = `modal modal-lg fade`
    modal.setAttribute('data-bs-backdrop', 'static')
    modal.setAttribute('data-bs-keyboard', 'false')
    modal.setAttribute('tabindex', '-1')

    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">${this.title}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          </div>
        </div>
      </div>`

    return modal
  }

  getBody(){
    return this.modal._dialog.querySelector('.modal-body')
  }

  getContent(){
    return this.modal._dialog.querySelector('.modal-content')
  }

  setFooter(components){
    if(components.length === 0){
      return ''
    }

    const footer = document.createElement('div')
    footer.className = `modal-footer`
    footer.append(...components)
    this.getContent().appendChild(footer)
  }

  getFooter(){
    return this.getContent().querySelector('.modal-footer')
  }

}
