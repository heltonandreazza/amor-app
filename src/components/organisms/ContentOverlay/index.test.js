import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import ContentOverlay from '.'

const setup = props => {
  const utils = render(<ContentOverlay {...props} />)

  return {
    closeButton: utils.getByTestId('close-modal-button'),
    ...utils,
  }
}

describe('ContentOverlay', () => {
  const props = {
    isVisible: true,
    title: 'Title',
    children: 'Text',
    onButtonPress: jest.fn(),
    onLinkPress: jest.fn(),
    onBackdropPress: jest.fn(),
    onCloseButtonPress: jest.fn(),
  }

  it('renders correctly', () => {
    const { baseElement } = setup(props)
    expect(baseElement).toMatchSnapshot()
  })

  it('should be rendered with a subtitle', () => {
    const text = 'Subtitle test'
    const newProps = {
      subtitle: text,
      ...props,
    }
    const { getByText } = setup(newProps)
    expect(getByText(text).props.children).toBe(text)
  })

  describe('Button', () => {
    it('should be rendered', () => {
      const newProps = {
        buttonTitle: 'Press me',
        ...props,
      }
      const { getByText } = setup(newProps)
      expect(getByText(newProps.buttonTitle)).toBeTruthy()
    })

    it('should not be rendered without a buttonTitle prop', () => {
      const { queryByTestId } = setup(props)
      expect(queryByTestId('primary-modal-button')).toBeNull()
    })

    it('could be rendered as a inactive button', () => {
      const newProps = {
        buttonTitle: 'Press me',
        isButtonDisabled: true,
        ...props,
      }
      const { getByTestId } = setup(newProps)
      expect(getByTestId('primary-modal-button').props.disabled).toBeTruthy()
    })
  })

  describe('handleEventFunction', () => {
    it('should execute callback functions in handle events', () => {
      const newProps = {
        buttonTitle: 'Button',
        linkText: 'Link',
        ...props,
      }
      const { getByTestId, closeButton } = setup(newProps)

      fireEvent.press(getByTestId('primary-modal-button'))
      fireEvent.press(getByTestId('secondary-modal-button'))
      fireEvent.press(closeButton)

      expect(props.onButtonPress).toHaveBeenCalledTimes(1)
      expect(props.onLinkPress).toHaveBeenCalledTimes(1)
      expect(props.onCloseButtonPress).toHaveBeenCalledTimes(1)
    })
  })
})
