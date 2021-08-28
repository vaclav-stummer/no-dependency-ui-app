import { Folder } from '../../libraries/stateManager'

// TODO: Consider generalization and reusability
export const populateLeftSideMenu = (
  items: Folder[],
  templateElementString: string,
): void => {
  for (let i = 0; i < items.length; i++) {
    const menuElement = document?.querySelector('.left-side-menu-inner-wrapper')
    const MenuItemWithContent = templateElementString.replace(
      '{{label}}',
      `Folder ${i + 1}`,
    )

    menuElement?.insertAdjacentHTML('beforeend', MenuItemWithContent)
  }
}
