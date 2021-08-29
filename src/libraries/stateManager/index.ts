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
    },
    {
      id: 'left-side-menu-item-2',
      name: 'Folder 2',
      projects: [{ id: 'project-10', name: '10', selected: false }],
    },
    {
      id: 'left-side-menu-item-3',
      name: 'Folder 3',
      projects: [],
    },
  ],
  [StateKeys.Filters]: 'left-side-menu-item-all',
}

export const setState = <T>(key: string, payload: T): void => {
  localStorage.setItem(key, JSON.stringify(payload))
}

export const initializeState = (): void => {
  if (!localStorage.filters) setState(StateKeys.Filters, initialState.filters)

  if (!localStorage.folders) setState(StateKeys.Folders, initialState.folders)
}
