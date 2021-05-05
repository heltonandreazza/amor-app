import React from 'react'
import { render } from '@testing-library/react-native'

import BackArrow from '.'

describe('BackArrow', () => {
  it('renders correctly', () => {
    const { baseElement } = render(<BackArrow />)
    expect(baseElement).toMatchSnapshot()
  })
})
