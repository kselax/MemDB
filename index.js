const MemDB = require('./core/memoryDB/MemDB')

MemDB.addStoreItem([
  'store1',
  'store2',
  'store3'
])
console.log(MemDB);

MemDB.store1.setItem('key1', 'val1')
MemDB.store1.setItem('key2', ['val1', 'val2'])
console.log(MemDB.store1);

MemDB.store1.addItem('key3', 'val3')
MemDB.store1.addItem('key3', 'val4')
console.log(MemDB.store1);

console.log('key3 = ', MemDB.store1.findItem('key3'));
console.log('listAll = ', MemDB.store1.listAll());
console.log('listAllKey = ', MemDB.store1.listAllKey());
console.log('getStore = ', MemDB.store1.getStore());

MemDB.store1.deleteItem('key3', 'val4')
console.log('getStore = ', MemDB.store1.getStore());

MemDB.store1.deleteKey('key3')
console.log('getStore = ', MemDB.store1.getStore());

console.log(MemDB.store1.withoutSome(['key1']));