import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react-native'

import Input from '.'
import styles from './styles'

describe('Input', () => {
  it('renders correctly', () => {
    const { baseElement } = render(<Input />)
    expect(baseElement).toMatchSnapshot()
  })

  describe('Error behavior', () => {
    it('should be rendered with error style', () => {
      const { getByTestId } = render(<Input hasError />)
      expect(getByTestId('input-view').props.style).toMatchObject([styles.errorContainerStyle, {}])
    })

    it('render a error message', () => {
      const { getByText } = render(<Input errorMessage="Error" />)
      expect(getByText('Error').props.children).toBe('Error')
    })
  })

  describe('Label behavior', () => {
    xit('should change the label props on label press', async () => {
      const { getByText } = render(<Input label="Teste" />)
      fireEvent.press(getByText('Teste'))
      await wait()

      expect(getByText('Teste').props.style.top).toBe(6)
    })

    xit('should change the label props on input focus and blur', async () => {
      const { getByTestId, getByText } = render(<Input label="Teste" />)

      fireEvent.focus(getByTestId('text-input'))
      await wait()

      expect(getByText('Teste').props.style.top).toBe(6)

      fireEvent.blur(getByTestId('text-input'))
      await wait()

      expect(getByText('Teste').props.style.top).toBe(18)
    })
  })
})
