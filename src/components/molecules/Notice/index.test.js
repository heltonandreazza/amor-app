import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import { getViewContainer } from 'services/tests/helper'

import Notice from '.'
import styles from './styles'

const props = {
  description: 'Description',
  onPressRetry: jest.fn(),
}

describe('Notice', () => {
  it('should render properly', () => {
    const { baseElement } = render(<Notice {...props} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render default mode', () => {
    const { container, getByLabelText } = render(<Notice {...props} />)
    expect(getViewContainer(container).props.style).toEqual(styles.container)
    expect(getByLabelText('notice-image').props.style).toEqual(styles.image)
  })

  it('should run onPress button properly', () => {
    const { getByLabelText } = render(<Notice {...props} />)

    fireEvent.press(getByLabelText('notice-button'))
    expect(props.onPressRetry).toHaveBeenCalledTimes(1)
  })
})
