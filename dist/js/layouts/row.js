import Utilities from "../utils/utilities.js"

export default class Row {
  constructor(id=null){
    this._id = id
    this.row = this._generateRow()
  }

  _generateRow(){
    const row = document.createElement('div')
    row.id = this._id
    row.className = `row`
    return row
  }

  _generateColumn(cols=[], styles=""){
    const col = document.createElement('div')
    col.className = `${cols.join(' ')} ${styles}`.trim()
    return col
  }

  appendCol(screenOptions, styles=""){
    const classes = Utilities.convertObjToCSSClasses('col', screenOptions)
    const col = this._generateColumn(classes, styles)
    this.row.appendChild(col)
    return col
  }

  getRow(){
    return this.row
  }
}