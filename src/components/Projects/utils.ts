import { dnd } from '../../libraries/dragAndDrop'
import {
  setState,
  Project,
  Folder,
  StateKeys,
} from '../../libraries/stateManager'

import ProjectItem from '../Projects/components/ProjectItem/index.html'

interface GetProjectsParams {
  isAll: boolean
  folders: Folder[]
  filter: string
}

const getProjects = ({ isAll, folders, filter }: GetProjectsParams) => {
  if (isAll) {
    return [
      ...folders.reduce((stackedFiles, folder) => {
        return [...stackedFiles, ...folder.projects]
      }, [] as Project[]),
    ]
  } else {
    const folders: Folder[] = JSON.parse(localStorage.folders)
    const relatedFolder = folders.find((folder) => folder.id === filter)

    return relatedFolder ? relatedFolder.projects : []
  }
}

interface PopulateProjectParams {
  folders: Folder[]
  options: {
    shouldCleanup?: boolean
    shouldReinitialize?: boolean
  }
}

export const populateProjects = ({
  folders,
  options: { shouldCleanup = true, shouldReinitialize = true },
}: PopulateProjectParams): void => {
  if (shouldCleanup) {
    unPopulateProjects()
  }

  const filter = JSON.parse(localStorage.filters)
  const isAllSelected = filter === 'left-side-menu-item-all'
  const projects = getProjects({ isAll: isAllSelected, folders, filter })

  for (let i = 0; i < projects.length; i++) {
    const projectsElement = document?.querySelector('.projects-inner-wrapper')

    const ProjectItemWithContent = ProjectItem
      // TODO: [Nice to have] Abstraction candidate => make util function
      .replaceAll('{{id}}', `${projects[i].id}`)
      .replace('{{name}}', `${projects[i].name}`)
      .replaceAll('{{selected}}', `${projects[i].selected ? 'selected' : ''}`)

    projectsElement?.insertAdjacentHTML('beforeend', ProjectItemWithContent)
  }

  if (shouldReinitialize) {
    dnd()
  }
}

export const unPopulateProjects = (): void => {
  const projectsElement = document?.querySelector('.projects-inner-wrapper')

  if (!projectsElement) return

  projectsElement.innerHTML = ''
}

export const onClickProjectToggle = (): void => {
  const projectList = document?.querySelectorAll('.project-item-wrapper')

  projectList.forEach(function (project) {
    project.addEventListener('click', function () {
      const oldFoldersState: Folder[] = JSON.parse(localStorage.folders)

      const updatedFoldersState = oldFoldersState.map((folder) => {
        const isInProjects = folder.projects.some(
          (project) => project.id === this.id,
        )

        if (isInProjects) {
          const updatedProjects = {
            ...folder,
            projects: folder.projects.map((project) => {
              return {
                ...project,
                selected:
                  project.id === this.id ? !project.selected : project.selected,
              }
            }),
          }

          return updatedProjects
        }

        return folder
      })

      setState(StateKeys.Folders, updatedFoldersState)

      let isToggled = false

      updatedFoldersState.forEach((folder) => {
        folder.projects.forEach((project) => {
          if (project.id === this.id) {
            isToggled = project.selected
          }
        })
      })

      const toggledProjectElement = document?.getElementById(this.id)
      const toggledCheckBoxWrapper =
        toggledProjectElement?.getElementsByClassName(
          'project-item-checkbox',
        )[0]

      if (isToggled) {
        toggledProjectElement?.classList.add('selected')
        toggledCheckBoxWrapper?.classList.add('selected')
      } else {
        toggledProjectElement?.classList.remove('selected')
        toggledCheckBoxWrapper?.classList.remove('selected')
      }
    })
  })
}

interface UpdateFoldersParams {
  folders: Folder[]
  currentFolderId: string
  targetedFolderId: string
  selectedProjects: Project[]
}

const updateFolders = ({
  folders,
  currentFolderId,
  targetedFolderId,
  selectedProjects,
}: UpdateFoldersParams) => {
  const selectedProjectsIds = selectedProjects.map(
    (selectedProject) => selectedProject?.id,
  )

  return folders.map((folder: Folder) => {
    /* If projects are moved to the same folder */
    if (currentFolderId === targetedFolderId) {
      return folder
    }

    const projectIds = folder.projects.map((project) => project.id)
    const hasSomeIdToRemove = selectedProjectsIds.some((id) =>
      projectIds.includes(id),
    )

    /* If projects needs to be removed from current folder */
    if (hasSomeIdToRemove) {
      const isAllFilter = currentFolderId === 'left-side-menu-item-all'

      return {
        ...folder,
        projects: folder.projects.filter((project) => {
          const isSameFolder = folder.id === targetedFolderId

          if (isAllFilter && isSameFolder) {
            return true
          } else {
            return !selectedProjectsIds.includes(project.id)
          }
        }),
      }
    }

    /* If projects needs to be added to new folder */
    if (folder.id === targetedFolderId) {
      const resetProjects = selectedProjects.map((project) => ({
        ...project,
        selected: false,
      }))

      return {
        ...folder,
        projects: [...folder.projects, ...resetProjects],
      }
    }

    return folder
  })
}

export const handleDragAndToFolder = (targetedFolderId: string): void => {
  const selectedElement = document?.querySelectorAll(
    '.project-item-wrapper .selected',
  )
  const selectedIds = Array.from(selectedElement).map((item) =>
    item.id.replace('checkbox-', ''),
  )

  const folders: Folder[] = JSON.parse(localStorage.folders) || []

  const selectedProjects = selectedIds.map((selectedId) => {
    let relatedProject: Project | null = null

    folders.forEach((folder) => {
      folder.projects.forEach((project) => {
        if (project.id === selectedId) {
          relatedProject = project
        }
      })
    })

    return relatedProject as unknown as Project
  })

  const currentFolderId = JSON.parse(localStorage.filters)

  const updatedFolders = updateFolders({
    folders,
    currentFolderId,
    targetedFolderId,
    selectedProjects,
  })

  setState(StateKeys.Folders, updatedFolders)
  populateProjects({
    folders: updatedFolders,
    options: {
      shouldCleanup: true,
      shouldReinitialize: true,
    },
  })
}

export const unselectProjects = (): void => {
  const folders: Folder[] = JSON.parse(localStorage.folders)

  const unselectedProjects = folders.map((folder) => ({
    ...folder,
    projects: folder.projects.map((project) => ({
      ...project,
      selected: false,
    })),
  }))

  setState(StateKeys.Folders, unselectedProjects)
}
