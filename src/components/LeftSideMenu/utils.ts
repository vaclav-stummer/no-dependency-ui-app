import {
  initializeState,
  StateKeys,
  Folder,
  File,
} from '../../libraries/stateManager'
import { populateProjects } from '../Projects/utils'

export const populateLeftSideMenu = (
  items: Folder[],
  templateElementString: string,
): void => {
  for (let i = 0; i < items.length; i++) {
    const menuElement = document?.querySelector('.left-side-menu-inner-wrapper')
    const MenuItemWithContent = templateElementString
      .replace('{{id}}', `left-side-menu-item-${i + 1}`)
      .replace('{{label}}', `Folder ${i + 1}`)

    menuElement?.insertAdjacentHTML('beforeend', MenuItemWithContent)
  }
}

export const pickFilter = (
  menuItemList: NodeListOf<Element>,
  filters: string,
): void => {
  Array.from(menuItemList || []).forEach((element) => {
    if (filters === element?.id) {
      element.classList.add('active')
    } else {
      element.classList.remove('active')
    }
  })
}

export const onClickChangeFilter = (
  menuItemList: NodeListOf<Element>,
  projectItemElementString: string,
): void => {
  menuItemList.forEach(function (menuItem) {
    menuItem.addEventListener('click', function () {
      initializeState(StateKeys.Filters, this.id)
      pickFilter(menuItemList, this.id)

      const folders: Folder[] = JSON.parse(localStorage.folders)

      if (this.id === 'left-side-menu-item-0') {
        const allStackedFiles = folders.reduce((stackedFiles, folder) => {
          return [...stackedFiles, ...folder.files]
        }, [] as File[])

        populateProjects({
          items: allStackedFiles,
          templateElementString: projectItemElementString,
          shouldCleanup: true,
        })
      } else {
        const folder = folders.find((folder) => this.id === folder.id)

        populateProjects({
          items: folder?.files || [],
          templateElementString: projectItemElementString,
          shouldCleanup: true,
        })
      }
    })
  })
}
