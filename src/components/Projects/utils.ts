import { dnd } from '../../libraries/dragAndDrop'

import type { File } from '../../libraries/stateManager'

interface PopulateProjectParams {
  items: File[]
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

    const ProjectItemWithContent = templateElementString.replace(
      '{{name}}',
      `${i + 1}`,
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
