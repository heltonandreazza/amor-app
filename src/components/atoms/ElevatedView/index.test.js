import React from 'react'
import { render } from '@testing-library/react-native'

import ElevatedView from '.'

describe('ElevatedView', () => {
  it('renders correctly with no elevation', () => {
    const { baseElement } = render(<ElevatedView />)
    expect(baseElement).toMatchSnapshot()
  })

  it('renders correctly with elevation equals 1', () => {
    const { baseElement } = render(<ElevatedView elevation={1} />)
    expect(baseElement).toMatchSnapshot()
  })
})
