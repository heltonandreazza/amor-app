import React from 'react'
import { render } from '@testing-library/react-native'

import { getViewContainer } from 'services/tests/helper'
import { COLORS } from 'services/style'
import StatusBarColor from '.'

describe('StatusBarColor', () => {
  it('renders correctly', () => {
    const { baseElement } = render(<StatusBarColor backgroundColor={COLORS.NIGHT_RIDER} />)
    expect(baseElement).toMatchSnapshot()
  })
  it('should render with custom backgroundColor', () => {
    const { container } = render(<StatusBarColor backgroundColor={COLORS.PRIMARY} />)
    expect(getViewContainer(container).props.style).toEqual([
      {
        height: 20,
      },
      {
        backgroundColor: COLORS.PRIMARY,
      },
    ])
  })
})
