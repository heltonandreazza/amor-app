import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import IconCard from '.'

const props = {
  iconName: 'plus',
  onPress: jest.fn(),
  description: 'description',
}

describe('IconCard', () => {
  it('should render properly', () => {
    const { baseElement } = render(<IconCard {...props} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should run onPress button properly', () => {
    const { getByTestId } = render(<IconCard {...props} />)

    fireEvent.press(getByTestId('icon-card-button'))
    expect(props.onPress).toHaveBeenCalledTimes(1)
  })
})
