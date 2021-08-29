/* Libraries */
import { dnd } from './libraries/dragAndDrop'

/* Components */
// TODO: Nice to have find out how to click trough to the exact .html file
import Header from './components/Header/index.html'
import LeftSideMenu from './components/LeftSideMenu/index.html'
import MenuItem from './components/LeftSideMenu/components/MenuItem.html'
import Projects from './components/Projects/index.html'
import ProjectItem from './components/Projects/components/ProjectItem/index.html'

/* Utils */
import {
  initialState,
  initializeState,
  StateKeys,
  Project,
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

import './styles/style.scss'

const root = document?.getElementById('root')

window.onload = function () {
  initializeState(StateKeys.Folders, initialState.folders)
  initializeState(StateKeys.Filters, initialState.filters)

  if (!root) return

  /* Load components to DOM */
  // Don't addEventListeners here
  const content = document?.querySelector('.content-section')

  root?.insertAdjacentHTML('afterbegin', Header)

  content?.insertAdjacentHTML('beforeend', LeftSideMenu)
  populateLeftSideMenu(initialState.folders, MenuItem)

  content?.insertAdjacentHTML('beforeend', Projects)
  const allStackedFiles = initialState.folders.reduce(
    (stackedFiles, folder) => {
      return [...stackedFiles, ...folder.projects]
    },
    [] as Project[],
  )

  populateProjects({
    items: allStackedFiles,
    templateElementString: ProjectItem,
  })

  const menuItemList = document?.querySelectorAll('.left-side-menu-item')

  pickFilter(menuItemList, initialState.filters)

  /* Libraries initialization */
  // Libraries needs to initialized after elements population
  dnd()

  /* Event listeners initialization */
  onClickChangeFilter(menuItemList, ProjectItem)

  // const projectList = document?.querySelectorAll('.project-item-wrapper')

  // TODO: Re-initialize after menu switch
  onClickProjectToggle()
}

console.log('getState', localStorage.filters)

console.info('App started.')
