let storage = window.localStorage;
function set(key, item) {
  storage.setItem(key, item);
  return true;
}
function remove(key) {
  storage.removeItem(key);
  return true;
}
function get(key) {
  return storage.getItem(key);
//   return true;
}
export const localStore = {
  set,
  remove,
  get,
};
