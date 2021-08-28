export enum StateKeys {
  Folders = 'folders',
  Filters = 'filters',
}

export type File = {
  name: string
}

export type Folder = {
  id: string
  name: string
  files: File[]
}

interface State {
  folders: Folder[]
  filters: string
}

export const initialState: State = {
  [StateKeys.Folders]: [
    {
      id: '0',
      name: 'Folder 1',
      files: [
        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '4' },
        { name: '5' },
        { name: '6' },
        { name: '7' },
        { name: '8' },
        { name: '9' },
      ],
    },
    {
      id: '1',
      name: 'Folder 2',
      files: [],
    },
    {
      id: '2',
      name: 'Folder 3',
      files: [],
    },
  ],
  [StateKeys.Filters]: 'left-side-menu-item-0',
}

export const initializeState = <T>(key: string, payload: T): void => {
  localStorage.setItem(key, JSON.stringify(payload))
}
