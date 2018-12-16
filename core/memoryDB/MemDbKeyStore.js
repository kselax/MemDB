class MemDbKeyStore {
  constructor(name, store, initFn) {
    this.name = name
    this.store = store
    this.store[name] = {}

    if (typeof initFn === 'function') {
      initFn.call(this)
    }
  }

  setItem(key, value) {
    this.checkKeyAndCreate(key)
    const val = this.serializeValue(value)
    if (Array.isArray(val)) {
      this.store[this.name][key] = val
    } else {
      this.store[this.name][key] = [val]
    }
  }

  addItem(key, value) {
    this.checkKeyAndCreate(key)
    const val = this.serializeValue(value)
    if (this.store[this.name][key].indexOf(val) === -1) {
      this.store[this.name][key].push(val)
    }
  }

  findItem(key) {
    if (this.store[this.name][key]) {
      return this.store[this.name][key]
    }
    return []
  }

  listAll() {
    const result = []
    Object.keys(this.store[this.name]).forEach(key => {
      result.push(...this.store[this.name][key])
    })
    return result
  }

  listAllKey() {
    return Object.keys(this.store[this.name])
  }

  getStore() {
    return this.store[this.name]
  }

  deleteItem(key, value) {
    this.checkKeyAndCreate(key)
    const val = this.serializeValue(value)
    const newStore = this.store[this.name][key].filter(item => {
      if (val.indexOf(item) === -1) {
        return true
      }
      return false
    })
    this.store[this.name][key] = newStore
  }

  deleteKey(key) {
    delete this.store[this.name][key]
  }

  withoutSome(key) {
    const output = []
    Object.keys(this.store[this.name]).forEach(itemKey => {
      if (key.indexOf(itemKey) === -1) {
        output.push(...this.store[this.name][itemKey])
      }
    })
    return output
  }

  serializeValue(value) {
    return value
  }

  checkKey(key) {
    if (Object.prototype.hasOwnProperty.call(this.store[this.name], key)) {
      return true
    }
    return false
  }

  checkKeyAndCreate(key) {
    if (!this.checkKey(key)) {
      this.store[this.name][key] = []
    }
  }
}

module.exports = MemDbKeyStore