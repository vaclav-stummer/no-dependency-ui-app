const prompts = require('prompts')
const fs = require('fs')

const questions = [
  {
    type: 'confirm',
    name: 'isPreffiled',
    message: 'Do you wanna prefill data?',
    validate: true,
  },
  {
    type: (prev) => (prev ? 'number' : null),
    name: 'foldersCount',
    message: 'How many folders?',
    validate: (foldersCount) =>
      foldersCount < 1 ? 'There must be at least one folder' : true,
  },
  {
    type: (prev) => (prev ? 'number' : null),
    name: 'projectsCount',
    message: 'How many projects?',
    validate: (projectsCount) =>
      projectsCount < 1 ? 'There must be at least one project' : true,
  },
]

;(async () => {
  const response = await prompts(questions)

  await fs.writeFile(
    './src/preffiledData.json',
    JSON.stringify(response),
    function (error) {
      if (error) throw error
    },
  )
})()
