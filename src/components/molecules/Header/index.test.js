import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import { COLORS } from 'services/style'

import styles from './styles'
import Header from '.'

describe('Header', () => {
  it('renders correctly', () => {
    const { baseElement } = render(<Header />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should navigate to back route', () => {
    const props = {
      backTo: jest.fn(),
    }
    const { getByTestId } = render(<Header {...props} />)
    fireEvent.press(getByTestId('back-arrow'))
    expect(props.backTo).toBeCalled()
  })

  it('should be rendered with a title', () => {
    const title = 'Header Test'
    const { getByText } = render(<Header title={title} />)
    expect(getByText(title.toUpperCase()).props.children).toBe(title.toUpperCase())
  })

  it('should be rendered with a custom title', () => {
    const title = 'Header Custom styled'
    const titleStyle = { color: COLORS.SUCCESS }
    const { getByText } = render(<Header title={title} titleStyle={titleStyle} />)
    expect(getByText(title.toUpperCase()).props.style).toContainEqual([styles.defaultTitleStyle, titleStyle])
  })
})
