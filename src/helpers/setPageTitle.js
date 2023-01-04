export default function (_title) {
  let title = 'Morphzing'

  if (_title) {
    title = `${_title} - Morphzing`
  }

  document.title = title
}
