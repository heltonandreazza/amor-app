import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import AddressCard from '.'

const props = {
  title: 'title',
  onPress: jest.fn(),
}

describe('AddressCard', () => {
  it('renders correctly', () => {
    const { baseElement } = render(<AddressCard {...props} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should run onPress button properly', () => {
    const { getByLabelText } = render(<AddressCard {...props} />)
    const touchableOpacity = getByLabelText('address-card-title')
    fireEvent.press(touchableOpacity)
    expect(props.onPress).toHaveBeenCalledTimes(1)
  })
})
