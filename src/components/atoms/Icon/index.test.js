import React from 'react'
import { render } from '@testing-library/react-native'

import Icon from '.'

const props = {
  icon: 'simpl_question',
}

describe('Icon', () => {
  it('should render properly', () => {
    const { baseElement } = render(<Icon {...props} />)
    expect(baseElement).toMatchSnapshot()
  })
})
