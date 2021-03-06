/* Libraries */
import { dnd } from './libraries/dragAndDrop'

/* Components */
// TODO: [Nice to have] find out how to click trough to the exact .html file
import Header from './components/Header/index.html'
import LeftSideMenu from './components/LeftSideMenu/index.html'
import Projects from './components/Projects/index.html'

/* Utils */
import {
  initializeState,
  initializeExportFolders,
  Folder,
} from './libraries/stateManager'
import {
  populateLeftSideMenu,
  pickFilter,
  onClickChangeFilter,
} from './components/LeftSideMenu/utils'
import {
  populateProjects,
  onClickProjectToggle,
} from './components/Projects/utils'

import data from './preffiledData.json'

import './styles/style.scss'

window.onload = function () {
  const root = document?.getElementById('root')

  if (!root) return

  initializeState({
    foldersAmount: data.foldersCount,
    projectsAmount: data.projectsCount,
  })

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
    options: { shouldCleanup: true, shouldReinitialize: false },
  })

  /* Libraries initialization */
  // Libraries needs to initialized after elements population

  /* Event listeners initialization */
  initializeExportFolders()
  onClickChangeFilter()
  onClickProjectToggle()

  dnd()
}

console.info('App started.')
