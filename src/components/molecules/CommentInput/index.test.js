import React from 'react'
import { render } from '@testing-library/react-native'

import CommentInput from '.'

describe('CommentInput', () => {
  it('renders correctly', () => {
    const { baseElement } = render(<CommentInput />)
    expect(baseElement).toMatchSnapshot()
  })
})
