import { addressNumberFromText } from '.'

describe('utils', () => {
  describe('addressNumberFromText', () => {
    it('should not match without number', () => {
      const number = addressNumberFromText('Rua Gomes de ')

      expect(number).toBe('')
    })

    it('should match only the number', () => {
      const number = addressNumberFromText('Rua Gomes de Carvalho, 90000, São Paulo')

      expect(number).toBe('90000')
    })

    it('should match numbers with letters', () => {
      const number = addressNumberFromText('Rua Olga Artacho, 5p')

      expect(number).toBe('5p')
    })

    it('should match "without number"', () => {
      const sn = addressNumberFromText('Rua São Francisco Xavier, s/n')

      expect(sn).toBe('s/n')
    })
  })
})
