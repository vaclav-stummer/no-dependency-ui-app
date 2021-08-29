import MenuItem from '../LeftSideMenu/components/MenuItem/index.html'

import { setState, StateKeys, Folder } from '../../libraries/stateManager'
import { populateProjects, onClickProjectToggle } from '../Projects/utils'

export const populateLeftSideMenu = (): void => {
  const folders: Folder[] = JSON.parse(localStorage.folders)

  for (let i = 0; i < folders.length; i++) {
    const menuElement = document?.querySelector('.left-side-menu-inner-wrapper')
    const MenuItemWithContent = MenuItem.replace(
      '{{id}}',
      `left-side-menu-item-${i + 1}`,
    ).replace('{{label}}', `Folder ${i + 1}`)

    menuElement?.insertAdjacentHTML('beforeend', MenuItemWithContent)
  }
}

export const pickFilter = (filters: string): void => {
  const menuItemList = document?.querySelectorAll('.left-side-menu-item') || []

  Array.from(menuItemList || []).forEach((element) => {
    if (filters === element?.id) {
      element.classList.add('active')
    } else {
      element.classList.remove('active')
    }
  })
}

export const onClickChangeFilter = (): void => {
  const menuItemList = document?.querySelectorAll('.left-side-menu-item')

  menuItemList.forEach(function (menuItem) {
    menuItem.addEventListener('click', function () {
      setState(StateKeys.Filters, this.id)
      pickFilter(this.id)

      const folders: Folder[] = JSON.parse(localStorage.folders)

      if (this.id === 'left-side-menu-item-all') {
        populateProjects({
          folders,
          options: {
            shouldCleanup: true,
          },
        })
        onClickProjectToggle()
      } else {
        const folder = folders.find((folder) => this.id === folder.id)

        populateProjects({
          folders: folder ? [folder] : [],
          options: { shouldCleanup: true },
        })
        onClickProjectToggle()
      }
    })
  })
}
