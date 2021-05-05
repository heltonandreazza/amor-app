import React from 'react'
import { render } from '@testing-library/react-native'

import Text from '.'

describe('TextComponent', () => {
  it('renders correctly', () => {
    const { baseElement } = render(<Text>Test</Text>)
    expect(baseElement).toMatchSnapshot()
  })

  it('renders correctly with bold font', () => {
    const propsWithBold = {
      bold: true,
    }
    const { baseElement } = render(<Text {...propsWithBold} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('renders correctly with medium font', () => {
    const propsWithMedium = {
      medium: true,
    }
    const { baseElement } = render(<Text {...propsWithMedium} />)
    expect(baseElement).toMatchSnapshot()
  })
})
