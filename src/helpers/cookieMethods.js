/* eslint-disable no-useless-escape */
export default {
  set (name, value, expirationDate = 365) {
    if (!expirationDate && !this.get(name)) return
    const date = new Date(Date.now() + 86400e3 * expirationDate).toUTCString()

    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
      value
    )}; expires=${date}`
  },
  delete (name) {
    this.set(name, '', 0)
  },
  get (name) {
    let matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    )

    return matches ? decodeURIComponent(matches[1]) : undefined
  }
}
