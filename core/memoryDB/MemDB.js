const MemDbKeyStore = require('./MemDbKeyStore')

class MemDB {
  constructor() {
    this.store = {}
  }

  addStoreItem(itemArr) {
    itemArr.forEach(name => {
      this[name] = new MemDbKeyStore(name, this.store)
    })
  }
}

module.exports = new MemDB