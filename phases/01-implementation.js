class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // check if new entry changes load factor
    const loadFactor = this.count / this.capacity;
    if (loadFactor > 0.7) this.resize();

    let newPair = new KeyValuePair(key, value);
    let hashKey = this.hashMod(key);
    let current = this.data[hashKey];

    // start iterating thru linked list, checking if key already exists
    // if bucket is empty, loop will be skipped and if only one entry it will check if keys are the same
    while (current) {
      // if key exists, update value
      if (current.key === newPair.key) {
        current.value = newPair.value;
        return;
      }
      current = current.next;
    }

    // if bucket is not empty, set correct next pointer for linked list
    if (this.data[hashKey]) newPair.next = this.data[hashKey];

    // finally insert new key value pair
    this.data[hashKey] = newPair;
    this.count++;
  }



  read(key) {
    const hashKey = this.hashMod(key);
    let current = this.data[hashKey];

    // loop thru linked list until key is found
    while (current){
      if (current.key === key) return current.value;
      current = current.next;
    }

  }


  resize() {
    this.capacity = this.capacity * 2;
    let newTable = new Array(this.capacity).fill(null);
    let oldTable = this.data;
    this.data = newTable;
    this.count = 0;

    for (const bucket of oldTable){
      let current = bucket;

      while (current) {
        this.insert(current.key, current.value);
        current = current.next;
      }

    }
    return 'resize complete';
  }


  delete(key) {
    let hashKey = this.hashMod(key);

    // check if bucket with entry exists, if not return
    if (!this.data[hashKey]) return 'Key not found';

    // delete key value pair when single entry or head of list
    if (this.data[hashKey].key === key) {
      this.data[hashKey] = this.data[hashKey].next;
      this.count--;
      return;
    }

    let current = this.data[hashKey];
    let prev = current;
    // start iterating using while loop
    while (current) {
      // check if current entry matches key
      if (current.key === key) {
        // if match, set previous entries pointer to currents next
        prev.next = current.next;
        this.count--;
        return;
      }
      prev = current;
      current = current.next;
    }
    // if key not found in list return with message
    return 'Key not found';
  }
}


module.exports = HashTable;
