import {
  initializeState,
  StateKeys,
  Folder,
} from '../../libraries/stateManager'

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

export const onClickChangeFilter = (menuItemList: NodeListOf<Element>): void => {
  menuItemList.forEach(function (menuItem) {
    menuItem.addEventListener('click', function () {
      initializeState(StateKeys.Filters, this.id)
      pickFilter(menuItemList, this.id)
    })
  })
}
