// Function used to scroll to conteiner by the provided id.
export function scrollToConteiner(id: string) {
  const element = document.getElementById(id)

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    console.warn(`Id not found: "${id}"`)
  }
}
