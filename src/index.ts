/* Libraries */
import { dnd } from './libraries/dragAndDrop'

/* Components */
// TODO: Nice to have find out how to click trough to the exact .html file
import Header from './components/Header/index.html'
import LeftSideMenu from './components/LeftSideMenu/index.html'
import MenuItem from './components/LeftSideMenu/components/MenuItem.html'
import Projects from './components/Projects/index.html'
import ProjectItem from './components/Projects/components/ProjectItem.html'

/* Utils */
import {
  initialState,
  initializeState,
  StateKeys,
} from './libraries/stateManager'
import { populateLeftSideMenu } from './components/LeftSideMenu/utils'
import { populateProjects } from './components/Projects/utils'

import './styles/style.scss'

const root = document?.getElementById('root')

window.onload = function () {
  initializeState(StateKeys.Folders, initialState)

  if (!root) return

  /* Load components to DOM */
  const content = document?.querySelector('.content-section')

  root?.insertAdjacentHTML('afterbegin', Header)

  content?.insertAdjacentHTML('beforeend', LeftSideMenu)
  populateLeftSideMenu(initialState.folders, MenuItem)

  content?.insertAdjacentHTML('beforeend', Projects)
  populateProjects(initialState.folders[0].files, ProjectItem)

  /* Libraries initialization */
  // Libraries needs to initialized after elements population
  dnd()
}

console.info('App started.')
