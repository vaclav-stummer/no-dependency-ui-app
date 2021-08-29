import { dnd } from '../../libraries/dragAndDrop'
import {
  setState,
  Project,
  Folder,
  StateKeys,
} from '../../libraries/stateManager'

import  ProjectItem  from '../Projects/components/ProjectItem/index.html'

interface PopulateProjectParams {
  folders: Folder[]
  shouldCleanup?: boolean
}

export const populateProjects = ({
  folders,
  shouldCleanup,
}: PopulateProjectParams): void => {
  if (shouldCleanup) {
    unPopulateProjects()
  }

  const allStackedProjects = folders.reduce((stackedFiles, folder) => {
    return [...stackedFiles, ...folder.projects]
  }, [] as Project[])

  for (let i = 0; i < allStackedProjects.length; i++) {
    const projectsElement = document?.querySelector('.projects-inner-wrapper')

    const ProjectItemWithContent = ProjectItem
      // TODO: [Nice to have] Abstraction candidate => make util function
      .replace('{{id}}', `project-${i + 1}`)
      .replace('{{name}}', `${i + 1}`)
      .replaceAll(
        '{{selected}}',
        `${allStackedProjects[i].selected ? 'selected' : ''}`,
      )

    projectsElement?.insertAdjacentHTML('beforeend', ProjectItemWithContent)
  }

  dnd()
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
