import { Folder, Project, setState, StateKeys } from '../stateManager'

import { populateProjects } from '../../components/Projects/utils'

export const dnd = (): void => {
  // TODO: [Nice to have]: Enhance types
  let dragSrcEl: HTMLElement | null = null

  function handleDragStart(event: any) {
    this.style.opacity = '0.1'

    dragSrcEl = this

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
    event.stopPropagation()

    const targetElementId = this.id
    const isDroppingOnMenu = targetElementId.includes('left-side-menu-item')

    if (isDroppingOnMenu) {
      const selectedElement = document?.querySelectorAll(
        '.project-item-wrapper .selected',
      )
      const selectedIds = Array.from(selectedElement).map((item) =>
        item.id.replace('checkbox-', ''),
      )
      const foldersData: Folder[] = JSON.parse(localStorage.folders) || []

      const selectedProjects = selectedIds.map((selectedId) => {
        let relatedProject: Project | null = null

        foldersData.forEach((folder) => {
          folder.projects.forEach((project) => {
            if (project.id === selectedId) {
              relatedProject = project
            }
          })
        })

        return relatedProject as unknown as Project
      })

      const selectedProjectsIds = selectedProjects.map(
        (selectedProject) => selectedProject?.id,
      )

      const currentFolderId = JSON.parse(localStorage.filters)

      const updatedFolders = foldersData.map((folder: Folder) => {
        if (currentFolderId === targetElementId) {
          return folder
        }

        const projectIds = folder.projects.map((project) => project.id)
        const hasSomeIdToRemove = selectedProjectsIds.some((id) =>
          projectIds.includes(id),
        )

        if (hasSomeIdToRemove) {
          return {
            ...folder,
            projects: folder.projects.filter(
              (project) => !selectedProjectsIds.includes(project.id),
            ),
          }
        }

        if (folder.id === this.id) {
          return {
            ...folder,
            projects: [...folder.projects, ...selectedProjects],
          }
        }

        return folder
      })

      setState(StateKeys.Folders, updatedFolders)
      populateProjects({
        folders: updatedFolders,
        options: {
          shouldCleanup: true,
          shouldReinitialize: true,
        },
      })

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
}
