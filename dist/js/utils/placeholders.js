export default class PlaceHolders{

  static generateProductsPH(count){
    const products = [`<div class="row row-cols-3 row-cols-md-4">`]

    for (let counter = 0; counter < count; counter++) {
      const placeholder = `
        <div class="col mb-3">
          <div class="card shadow-lg" aria-hidden="true" style="height: 300px;">
            <div class="card-img-top placeholder" alt="..." style="height: 50%;"></div>
            <div class="card-body">
              <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
              </h5>
              <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a class="btn btn-primary disabled placeholder col-6"></a>
            </div>
          </div>
        </div>
      `
      products.push(placeholder)
    }

    products.push(`</div>`)
    return products.join('')
  }

  static generateCategoriesPH(count=5){
    const categories = [`<div class="row flex-wrap mb-3 gap-2">`]
    for (let counter = 0; counter < count; counter++) {
      categories.push(`<p class="btn btn-outline-primary rounded-pill placeholder" style="width: 150px;"></p>`)
    }
    categories.push(`</div>`)
    return categories.join('')
  }
}