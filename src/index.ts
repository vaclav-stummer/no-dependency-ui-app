/* Libraries */
import './libraries/dragAndDrop'

/* Components */
import PageLayout from './components/PageLayout'
import PageHeader from './components/PageHeader'
import PageContent from './components/PageContent'
import LeftSideMenu from './components/LeftSideMenu'
// TODO: Nice to have find out how to click trough to the exact .html file
import Header from './components/Header/index.html'

import './styles/style.scss'

const root = document?.getElementById('root')

window.onload = function () {
  if (!root) return

  root?.insertAdjacentHTML('afterbegin', Header)
}

// TODO:Find out how to properly initialize components
PageLayout
PageHeader
PageContent
LeftSideMenu

console.info('App started.')
