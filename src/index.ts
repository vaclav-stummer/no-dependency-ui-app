/* Libraries */
import { dnd } from './libraries/dragAndDrop'

/* Components */
// TODO: [Nice to have] find out how to click trough to the exact .html file
import Header from './components/Header/index.html'
import LeftSideMenu from './components/LeftSideMenu/index.html'
import Projects from './components/Projects/index.html'

/* Utils */
import { initializeState, Folder } from './libraries/stateManager'
import {
  populateLeftSideMenu,
  pickFilter,
  onClickChangeFilter,
} from './components/LeftSideMenu/utils'
import {
  populateProjects,
  onClickProjectToggle,
} from './components/Projects/utils'

import './styles/style.scss'

const root = document?.getElementById('root')

window.onload = function () {
  if (!root) return

  initializeState()

  /* Load components to DOM */
  // Don't addEventListeners here
  const content = document?.querySelector('.content-section')

  root?.insertAdjacentHTML('afterbegin', Header)

  const filtersData: string = JSON.parse(localStorage.filters)
  const foldersData: Folder[] = JSON.parse(localStorage.folders)

  content?.insertAdjacentHTML('beforeend', LeftSideMenu)
  populateLeftSideMenu()

  content?.insertAdjacentHTML('beforeend', Projects)

  pickFilter(filtersData)

  populateProjects({
    folders: foldersData,
    shouldCleanup: true,
  })

  /* Libraries initialization */
  // Libraries needs to initialized after elements population
  dnd()

  /* Event listeners initialization */
  onClickChangeFilter()
  onClickProjectToggle()
}

console.log('getState', localStorage.filters)

console.info('App started.')
