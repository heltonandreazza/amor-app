import * as index from '.'

describe('utils', () => {
  describe('parseJwt', () => {
    it('should parse jwt', () => {
      const jwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' // eslint-disable-line
      const parsedJwt = index.parseJwt(jwt)
      expect(parsedJwt).toBeTruthy()
      expect(parsedJwt.name).toBe('John Doe')
    })

    it('should log exception when parsing jwt', () => {
      const jwt = null
      const parsedJwt = index.parseJwt(jwt)
      expect(parsedJwt).toBeFalsy()
      expect(parsedJwt.name).toBeFalsy()
    })
  })
})
