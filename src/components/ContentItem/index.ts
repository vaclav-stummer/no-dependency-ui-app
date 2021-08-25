export default class ContentItem extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
    <div>
      ${this.getAttribute('index')}
    </div>
      `
  }
}

window.customElements.define('content-item', ContentItem)
