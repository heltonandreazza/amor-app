import React from 'react'
import { render } from '@testing-library/react-native'

import Loading from '.'
import styles from './styles'

describe('Loading', () => {
  it('renders correctly', () => {
    const { baseElement } = render(<Loading />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should be rendered as fullscreen', () => {
    const { getByTestId } = render(<Loading fullScreen />)
    expect(getByTestId('full-screen-loader').props.style).toMatchObject(styles.fullScreenContainer)
  })
})
