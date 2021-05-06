import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import styles from './styles'
import UserFeedbackMessage from '.'

const props = {
  iconName: 'close-circle',
  title: 'title',
  paragraph: 'paragraph',
  submitTitle: 'submitTitle',
  onSubmit: jest.fn(),
}

describe('UserFeedbackMessage', () => {
  it('should be rendered', () => {
    const { baseElement } = render(<UserFeedbackMessage {...props} />)

    expect(baseElement).toMatchSnapshot()
  })

  it('should run onSubmit button properly', () => {
    const { getByText } = render(<UserFeedbackMessage {...props} />)
    const submitButton = getByText(props.submitTitle).parentNode
    fireEvent.press(submitButton)

    expect(props.onSubmit).toHaveBeenCalledTimes(1)
  })

  it('should render with custom title style', () => {
    const styleTitle = { color: 'red' }
    const { getByText } = render(<UserFeedbackMessage {...props} styleTitle={styleTitle} />)

    expect(getByText('title').props.style).toContainEqual([styles.text, styles.title, styleTitle])
  })

  it('should render with custom subtitle style', () => {
    const styleSubtitle = { color: 'blue' }
    const { getByText } = render(<UserFeedbackMessage {...props} subtitle="subtitle" styleSubtitle={styleSubtitle} />)

    expect(getByText('subtitle').props.style).toContainEqual([styles.text, styles.subtitle, styleSubtitle])
  })

  it('should render with custom paragraph style', () => {
    const styleParagraph = { color: 'yellow' }
    const { getByText } = render(<UserFeedbackMessage {...props} styleParagraph={styleParagraph} />)

    expect(getByText('paragraph').props.style).toContainEqual([styles.text, styleParagraph])
  })

  it('should render with image on top', () => {
    const { getByLabelText } = render(<UserFeedbackMessage {...props} imageOnTop />)

    expect(getByLabelText('user-feedback-message-image-on-top')).toBeTruthy()
  })

  it('should render with image on bottom - default', () => {
    const { getByLabelText } = render(<UserFeedbackMessage {...props} />)

    expect(getByLabelText('user-feedback-message-image-on-bottom')).toBeTruthy()
  })
})
