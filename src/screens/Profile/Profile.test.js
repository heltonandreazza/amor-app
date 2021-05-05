import React from 'react'
import { render } from '@testing-library/react-native'

import Profile from './Profile'

describe('Profile', () => {
  it('should be rendered', () => {
    const { baseElement } = render(<Profile />)
    expect(baseElement).toMatchSnapshot()
  })
})
