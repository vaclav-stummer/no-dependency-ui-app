import { formData } from './forms'

console.info('App started.')

const form = document.querySelector('form') as HTMLFormElement

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const data = formData(form)

  console.log(data)
})
