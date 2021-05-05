import * as index from '.'

let storage = {
  getItem: jest.fn(
    (item, value) =>
      new Promise(resolve => {
        resolve(value)
      })
  ),
  setItem: jest.fn(
    (item, value) =>
      new Promise(resolve => {
        resolve(value)
      })
  ),
}

const resetStorage = () => {
  storage = Object.assign({}, storage)
}

describe('storage', () => {
  beforeEach(() => {
    resetStorage()
  })

  it('should get value based on key from storage ', async () => {
    const testKey = 'test'
    await index.getStorageItem(storage, testKey)
    expect(storage.getItem).toBeCalledWith(testKey)
  })

  it('should return default value when and error occurs ', async () => {
    const testKey = 'test'
    const brokenStorage = {}
    const res = await index.getStorageItem(brokenStorage, testKey)
    expect(res).toEqual(null)
  })

  it('should set key/val on storage', async () => {
    await index.setStorageItem(storage, 'test', 10)
    expect(storage.setItem).toBeCalledWith('test', '10')
  })
})
