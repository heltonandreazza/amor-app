import React from 'react'
import { render } from '@testing-library/react-native'

import ConfirmationModal from '.'

const props = {
  accessibilityLabel: 'accessibility-label',
  isVisible: true,
  title: 'title',
  onCloseButtonPress: jest.fn(),
  onBackdropPress: jest.fn(),
  primaryButtonTitle: 'primary button title',
  onPrimaryButtonPress: jest.fn(),
  secondaryButtonTitle: 'secondary button title',
  onSecondaryButtonPress: jest.fn(),
  contentText: 'contentText',
}

describe('ConfirmationModal', () => {
  it('should render properly', () => {
    const { baseElement } = render(<ConfirmationModal {...props} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render contenText', () => {
    const { getByTestId } = render(<ConfirmationModal {...props} />)

    expect(getByTestId('content-text').props.children).toBe('contentText')
  })
})
