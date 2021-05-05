export const getStorageItem = async (storage, key, defaultValue = null) => {
  try {
    return JSON.parse(await storage.getItem(key)) || defaultValue
  } catch (e) {
    console.log(`[logException] getStorageItem: ${e}`)
    return defaultValue
  }
}

export const setStorageItem = async (storage, key, value = '') => {
  const stringifiedValue = JSON.stringify(value)
  return storage.setItem(key, stringifiedValue)
}

export const removeStorageItem = async (storage, key) => storage.removeItem(key)

export const clearStorage = async storage => storage.clear()
