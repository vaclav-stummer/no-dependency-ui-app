/* Libraries */
import './libraries/dragAndDrop'

/* Components */
// TODO: Nice to have find out how to click trough to the exact .html file
import Header from './components/Header/index.html'
import LeftSideMenu from './components/LeftSideMenu/index.html'
import MenuItem from './components/LeftSideMenu/components/MenuItem.html'

/* Utils */
import {
  initialState,
  initializeState,
  StateKeys,
} from './libraries/stateManager'
import { populateLeftSideMenu } from './components/LeftSideMenu/utils'

import './styles/style.scss'

const root = document?.getElementById('root')

window.onload = function () {
  initializeState(StateKeys.Folders, initialState)

  if (!root) return

  const content = document?.querySelector('.content-section')

  root?.insertAdjacentHTML('afterbegin', Header)

  content?.insertAdjacentHTML('afterbegin', LeftSideMenu)

  populateLeftSideMenu(initialState.folders, MenuItem)
}

console.info('App started.')
