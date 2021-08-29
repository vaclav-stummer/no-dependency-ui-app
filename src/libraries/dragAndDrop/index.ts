import { handleDragAndToFolder } from '../../components/Projects/utils'

export const dnd = (): void => {
  // TODO: [Nice to have]: Enhance types
  let dragSrcEl: HTMLElement | null = null

  function handleDragStart(event: any) {
    dragSrcEl = this

    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/html', this.innerHTML)
  }

  function handleDragEnd() {
    items.forEach(function (item) {
      item.classList.remove()
    })
  }

  function handleDragOver(event: any) {
    if (event.preventDefault) {
      event.preventDefault()
    }

    return false
  }

  function handleDragEnter() {
    this.classList.add()
  }

  function handleDragLeave() {
    this.classList.remove()
  }

  function handleDrop(event: any) {
    event.stopPropagation()

    const targetElementId = this.id
    const isDroppingOnMenu = targetElementId.includes('left-side-menu-item')

    if (isDroppingOnMenu) {
      handleDragAndToFolder(targetElementId)

      return false
    }

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

  const allDraggableElements = document.querySelectorAll('.dnd-box')

  /* Customer dragged element */

  /* Create */
  allDraggableElements.forEach(function (item) {
    item?.addEventListener(
      'dragstart',
      function (event: any) {
        const ghostElement = document?.createElement('div')
        ghostElement.classList.add('drag-ghost')
        ghostElement.style.position = 'absolute'
        ghostElement.style.top = '-1000px'

        // TODO: [Nice to have] Add mirror elements dynamically up to 5
        const mirrorElement = document.createElement('div')
        mirrorElement.classList.add('drag-ghost-mirror')
        ghostElement.appendChild(mirrorElement)

        const counter = document.createElement('div')
        counter.classList.add('drag-ghost-counter')
        const selectedElementsCount =
          // TODO: Fix doubled ".selected" class
          document.querySelectorAll('.selected').length / 2
        counter.innerHTML = `${selectedElementsCount}`
        ghostElement.append(counter)

        document.body.appendChild(ghostElement)

        event.dataTransfer.setDragImage(ghostElement, 0, 0)
      },
      false,
    )
  })

  /* Remove */
  document.addEventListener(
    'dragend',
    function () {
      const ghost = document.querySelector('.drag-ghost')

      if (ghost?.parentNode) {
        ghost.parentNode.removeChild(ghost)
      }
    },
    false,
  )
}
