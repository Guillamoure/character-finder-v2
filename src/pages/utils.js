export const get = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

export const set = (key, value) => {
  let stringifiedValue = JSON.stringify(value)
  return localStorage.setItem(key, stringifiedValue)
}

export const remove = (key) => {
  localStorage.removeItem(key)
}

export const updateModulesLocalStorage = (character, modules) => {
  let localStorageModules = get(character)
  localStorageModules = modules
  set(character, localStorageModules)
}

