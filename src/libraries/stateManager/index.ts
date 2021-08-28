type File = {
  name: string
}

export type Folder = {
  id: string
  name: string
  files: File[]
}

interface State {
  folders: Folder[]
}

export const initialState: State = {
  folders: [
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
}

export enum StateKeys {
  Folders = 'folders',
}

export const initializeState = <T>(key: string, payload: T): void => {
  localStorage.setItem(key, JSON.stringify(payload))
}
