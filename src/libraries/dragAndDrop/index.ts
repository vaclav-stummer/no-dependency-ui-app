export const dnd = (): void => {
  // TODO: [Nice to have]: Enhance types
  let dragSrcEl: HTMLElement | null = null

  function handleDragStart(event: any) {
    this.style.opacity = '0.4'

    dragSrcEl = this

    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/html', this.innerHTML)
  }

  function handleDragEnd() {
    this.style.opacity = '1'

    items.forEach(function (item) {
      item.classList.remove('dnd-over')
    })
  }

  function handleDragOver(event: any) {
    if (event.preventDefault) {
      event.preventDefault()
    }

    return false
  }

  function handleDragEnter() {
    this.classList.add('dnd-over')
  }

  function handleDragLeave() {
    this.classList.remove('dnd-over')
  }

  function handleDrop(event: any) {
    event.stopPropagation() // stops the browser from redirecting.

    if (dragSrcEl && dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML
      this.innerHTML = event.dataTransfer.getData('text/html')
    }

    return false
  }

  const items = document.querySelectorAll('.dnd-container .dnd-box')

  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart, false)
    item.addEventListener('dragend', handleDragEnd, false)
    item.addEventListener('dragover', handleDragOver, false)
    item.addEventListener('dragenter', handleDragEnter, false)
    item.addEventListener('dragleave', handleDragLeave, false)
    item.addEventListener('drop', handleDrop, false)
  })
}
