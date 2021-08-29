import { dnd } from '../../libraries/dragAndDrop'

import {
  initializeState,
  Project,
  Folder,
  StateKeys,
} from '../../libraries/stateManager'

interface PopulateProjectParams {
  items: Project[]
  templateElementString: string
  shouldCleanup?: boolean
}

export const populateProjects = ({
  items,
  templateElementString,
  shouldCleanup,
}: PopulateProjectParams): void => {
  if (shouldCleanup) {
    unPopulateProjects()
  }

  for (let i = 0; i < items.length; i++) {
    const projectsElement = document?.querySelector('.projects-inner-wrapper')

    const ProjectItemWithContent = templateElementString
      .replace('{{id}}', `project-${i + 1}`)
      .replace('{{name}}', `${i + 1}`)

    projectsElement?.insertAdjacentHTML('beforeend', ProjectItemWithContent)
  }

  dnd()
  onClickProjectToggle()
}

export const unPopulateProjects = (): // templateElementString: string,
void => {
  const projectsElement = document?.querySelector('.projects-inner-wrapper')

  if (!projectsElement) return

  projectsElement.innerHTML = ''

  dnd()
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

      initializeState(StateKeys.Folders, updatedFoldersState)

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
