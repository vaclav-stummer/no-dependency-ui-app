export default class PageLayout extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <div>
        <slot />
      </div>
    `
  }
}

window.customElements.define('page-layout', PageLayout)
