import type { File } from '../../libraries/stateManager'

export const populateProjects = (
  items: File[],
  templateElementString: string,
): void => {
  for (let i = 0; i < items.length; i++) {
    const projectsElement = document?.querySelector('.projects-inner-wrapper')

    const ProjectItemWithContent = templateElementString.replace(
      '{{name}}',
      `${i + 1}`,
    )

    projectsElement?.insertAdjacentHTML('beforeend', ProjectItemWithContent)
  }
}
