const storage = window.localStorage

export default {
  clear() {
    storage.clear()
  },
  set(key, item) {
    storage.setItem(key, item)
  },
  get(key, parse = true ) {
    const item = storage.getItem(key)
    return parse ? JSON.parse(item) : item
  }
}
