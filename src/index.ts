/* Libraries */
import './libraries/dragAndDrop'

/* Components */
import PageLayout from './components/PageLayout'
// TODO: Nice to have find out how to click trough to the exact .html file
import Header from './components/Header/index.html'
import LeftSideMenu from './components/LeftSideMenu/index.html'

import './styles/style.scss'

const root = document?.getElementById('root')

window.onload = function () {
  if (!root) return

  const content = document?.querySelector('.content-section')

  root?.insertAdjacentHTML('afterbegin', Header)

  content?.insertAdjacentHTML('afterbegin', LeftSideMenu)
}

// TODO:Find out how to properly initialize components
PageLayout

console.info('App started.')
