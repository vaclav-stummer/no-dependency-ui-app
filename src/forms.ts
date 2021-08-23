interface Values {
  [prop: string]: string
}

export const formData = (form: HTMLFormElement): Values => {
  const inputs = form.querySelectorAll('input')
  const values: Values = {}

  inputs.forEach((input) => {
    values[input.id] = input.value
  })

  return values
}
