const template = document.createElement('template')

template.innerHTML = `
  <div>
    <slot />
  </div>
`

export default class PageHeader extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot?.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('page-header', PageHeader)
