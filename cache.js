const cache = new Map();
// 

const get = (key) => {
  return cache.get(key);
}

const set = (key, value) => {
  cache.set(key, value);
}

const clear = () => {
  cache.clear();
}

module.exports = {
  get,
  set,
  clear,
}