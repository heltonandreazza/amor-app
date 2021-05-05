import React from 'react'
import { render } from '@testing-library/react-native'

import ProfilePerson from './ProfilePerson'

describe('ProfilePerson', () => {
  it('should be rendered', () => {
    const { baseElement } = render(<ProfilePerson />)
    expect(baseElement).toMatchSnapshot()
  })
})
