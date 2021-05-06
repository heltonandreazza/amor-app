import React from 'react'
import { render } from '@testing-library/react-native'

import Payment from './Payment'

describe('Payment', () => {
  it('should be rendered', () => {
    const { baseElement } = render(<Payment />)
    expect(baseElement).toMatchSnapshot()
  })
})
