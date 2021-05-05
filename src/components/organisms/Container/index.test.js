import React from 'react'
import { Text } from 'react-native'
import { wait, render } from '@testing-library/react-native'

import Container from '.'

describe('Container', () => {
  it('renders correctly', async () => {
    jest.useFakeTimers()
    const { baseElement } = render(
      <Container>
        <Text />
      </Container>
    )

    jest.runAllTimers()
    await wait()

    expect(baseElement).toMatchSnapshot()
  })
})
