import React from 'react'
import { render } from '@testing-library/react-native'

import Row from '.'

describe('Row', () => {
  it('renders correctly', () => {
    const { baseElement } = render(<Row />)
    expect(baseElement).toMatchSnapshot()
  })
})
