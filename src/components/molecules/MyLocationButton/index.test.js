import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import MyLocationButton from '.'

const props = {
  onPress: jest.fn(),
}

describe('MyLocationButton', () => {
  it('renders correctly', () => {
    const { baseElement } = render(<MyLocationButton {...props} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should run onPress button properly', () => {
    const { getByLabelText } = render(<MyLocationButton {...props} />)
    const touchableOpacity = getByLabelText('my-location-button')
    fireEvent.press(touchableOpacity)
    expect(props.onPress).toHaveBeenCalledTimes(1)
  })
})
