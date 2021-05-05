import React from 'react'
import { render } from '@testing-library/react-native'

import Welcome from './Welcome'

describe('Welcome', () => {
  it('should render properly', () => {
    const { baseElement } = render(<Welcome />)
    expect(baseElement).toMatchSnapshot()
  })
})
