import React from 'react'
import { render } from '@testing-library/react-native'

import Login from './Login'

describe('Login', () => {
  it('should be rendered', () => {
    const { baseElement } = render(<Login />)
    expect(baseElement).toMatchSnapshot()
  })
})
