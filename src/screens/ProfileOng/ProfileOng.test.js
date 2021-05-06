import React from 'react'
import { render } from '@testing-library/react-native'

import ProfileOng from './ProfileOng'

describe('ProfileOng', () => {
  it('should be rendered', () => {
    const { baseElement } = render(<ProfileOng />)
    expect(baseElement).toMatchSnapshot()
  })
})
