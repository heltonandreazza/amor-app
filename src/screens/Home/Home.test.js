import React from 'react'
import { render } from '@testing-library/react-native'

import Home from './Home'

describe('<Home />', () => {
  it('should render', () => {
    const { baseElement } = render(<Home />)
    expect(baseElement).toMatchSnapshot()
  })
})
