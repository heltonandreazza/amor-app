
export const navigationMock = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  pop: jest.fn(),
  goBack: jest.fn(),
  state: {},
  isFocused: jest.fn(),
  getParam: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(() => ({ remove: jest.fn() })),
  reset: jest.fn(),
  mockClear() {
    this.navigate.mockClear()
    this.dispatch.mockClear()
    this.pop.mockClear()
    this.goBack.mockClear()
    this.isFocused.mockClear()
    this.state = {}
    this.getParam.mockClear()
    this.setParams.mockClear()
    this.addListener.mockClear()
    this.addListener = jest.fn(() => ({ remove: jest.fn() }))
    this.reset.mockClear()
  },
  getDispatchMock: routeName => ({
    actions: [
      {
        key: undefined,
        params: {},
        preserveFocus: true,
        routeName,
        type: 'Navigation/JUMP_TO',
      },
    ],
    index: 0,
    key: null,
    type: 'Navigation/RESET',
  }),
}

export const fetchMocks = (...responses) => {
  const fetchMock = jest.fn()

  responses.forEach(response => {
    fetchMock.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolve({ json: () => response })
        })
    )
  })

  global.fetch = fetchMock
}

export const fetchMocksRejected = (...responses) => {
  const fetchMock = jest.fn()

  responses.forEach(response => {
    fetchMock.mockImplementationOnce(() => Promise.reject(response))
  })

  global.fetch = fetchMock
}
