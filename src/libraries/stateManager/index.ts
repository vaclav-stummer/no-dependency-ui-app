export enum StateKeys {
  Folders = 'folders',
  Filters = 'filters',
}

type ItemBase = {
  id: string
  name: string
}

export type Project = ItemBase & {
  selected: boolean
}

export type Folder = ItemBase & {
  projects: Project[]
  sortedProjectsIds: ItemBase['id'][]
}

const initialProjects: Project[] = [
  { id: 'project-1', name: '1', selected: false },
  { id: 'project-2', name: '2', selected: false },
  { id: 'project-3', name: '3', selected: false },
  { id: 'project-4', name: '4', selected: false },
  { id: 'project-5', name: '5', selected: false },
  { id: 'project-6', name: '6', selected: false },
  { id: 'project-7', name: '7', selected: false },
  { id: 'project-8', name: '8', selected: false },
  { id: 'project-9', name: '9', selected: false },
]

const initialSortedProjectsIds = initialProjects.map(({ id }) => id)

interface State {
  folders: Folder[]
  // TODO: [Nice to have] rename to "selectedFilter"
  filters: string
}

const initialState: State = {
  [StateKeys.Folders]: [
    {
      id: 'left-side-menu-item-1',
      name: 'Folder 1',
      projects: initialProjects,
      sortedProjectsIds: initialSortedProjectsIds,
    },
    {
      id: 'left-side-menu-item-2',
      name: 'Folder 2',
      projects: [{ id: 'project-10', name: '10', selected: false }],
      sortedProjectsIds: ['project-10'],
    },
    {
      id: 'left-side-menu-item-3',
      name: 'Folder 3',
      projects: [],
      sortedProjectsIds: [],
    },
  ],
  [StateKeys.Filters]: 'left-side-menu-item-all',
}

export const setState = <T>(key: string, payload: T): void => {
  localStorage.setItem(key, JSON.stringify(payload))
}

const getFolderFromTemplate = (index: number) => ({
  id: `left-side-menu-item-${index + 1}`,
  name: `Folder ${index + 1}`,
  projects: [],
  sortedProjectsIds: [],
})

const getProjectFromTemplate = (index: number) => ({
  id: `project-${index + 1}`,
  name: `${index + 1}`,
  selected: false,
})

interface InitializeStateParams {
  foldersAmount: number
  projectsAmount: number
}

export const initializeState = ({
  foldersAmount,
  projectsAmount,
}: InitializeStateParams): void => {
  const folders: Folder[] = []

  for (let i = 0; i < foldersAmount; i++) {
    const folder = getFolderFromTemplate(i)
    folders.push(folder)
  }

  const projects: Project[] = []

  for (let i = 0; i < projectsAmount; i++) {
    const project = getProjectFromTemplate(i)
    projects.push(project)
  }

  const firstFolder = folders.shift() as unknown as Folder
  folders.unshift({ ...firstFolder, projects })

  setState(StateKeys.Filters, initialState.filters)
  setState(StateKeys.Folders, folders ?? initialState.filters)
}

const exportFolders = (): void => {
  const folders: Folder[] = JSON.parse(localStorage.folders)
  const normalizedFolders = folders.map(({ id, name, projects }) => ({
    id,
    name,
    projects: projects.map(({ id, name }) => ({ id, name })),
  }))

  console.info(JSON.stringify(normalizedFolders))
}

export const initializeExportFolders = (): void => {
  const exportButton = document?.querySelector('.export-data-button')

  exportButton?.addEventListener('click', function () {
    exportFolders()
  })
}
