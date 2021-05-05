import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react-native'

import PasswordInput, { rightIconContainerStyle } from '.'

describe('PasswordInput', () => {
  it('renders correctly', () => {
    const { baseElement } = render(<PasswordInput />)
    expect(baseElement).toMatchSnapshot()
  })

  describe('Right icon behave tests', () => {
    xit('should change shouldInputBeSecure value', async () => {
      const { getByTestId } = render(<PasswordInput />)
      expect(getByTestId('eye-with-line')).toBeTruthy()

      fireEvent.press(getByTestId('eye-with-line'))
      await wait()

      expect(getByTestId('eye').props).toBeTruthy()
    })

    it('should set isFocused to true for focused field', async () => {
      const { getByTestId } = render(<PasswordInput />)

      fireEvent.focus(getByTestId('input-password'))
      await wait()

      expect(getByTestId('input-password').props.rightIconContainerStyle).toMatchObject(rightIconContainerStyle)
    })

    it('should set isFocused to false for "blured" field', async () => {
      const { getByTestId } = render(<PasswordInput />)

      fireEvent.focus(getByTestId('input-password'))
      await wait()

      expect(getByTestId('input-password').props.rightIconContainerStyle).toMatchObject(rightIconContainerStyle)

      fireEvent.blur(getByTestId('input-password'))
      await wait()

      expect(getByTestId('input-password').props.rightIconContainerStyle).toMatchObject({ marginRight: 8 })
    })

    it('should not set isFocused to false for "blured" with value', async () => {
      const { getByTestId } = render(<PasswordInput value="1q2w3e4r" />)

      fireEvent.focus(getByTestId('input-password'))
      await wait()

      expect(getByTestId('input-password').props.rightIconContainerStyle).toMatchObject(rightIconContainerStyle)

      fireEvent.blur(getByTestId('input-password'))
      await wait()

      expect(getByTestId('input-password').props.rightIconContainerStyle).toMatchObject(rightIconContainerStyle)
    })
  })
})
