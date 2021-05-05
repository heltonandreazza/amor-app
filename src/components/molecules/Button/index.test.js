import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Text } from 'react-native'

import Button from '.'
import { BUTTON_SCHEMES, STYLE_SCHEMES, getStyles } from './styles'

const props = {
  title: 'button title',
  onPress: jest.fn(),
}

describe('Button', () => {
  it('should render properly', () => {
    const { baseElement } = render(<Button {...props} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render title button properly', () => {
    const { getByText } = render(<Button {...props} />)
    expect(getByText(props.title)).toBeTruthy()
  })

  it('should render default button proper style', () => {
    const { getByText } = render(<Button {...props} />)
    const touchableOpacity = getByText(props.title).parentNode
    expect(touchableOpacity.props.style).toContainEqual(STYLE_SCHEMES.primary)
  })

  it('should render button with custom button style', () => {
    const newProps = { ...props, style: { backgroundColor: 'red' } }
    const { getByText } = render(<Button {...newProps} />)
    const touchableOpacity = getByText(props.title).parentNode
    expect(touchableOpacity.props.style).toEqual([
      getStyles({ ...newProps }).button,
      STYLE_SCHEMES.primary,
      newProps.style,
    ])
  })

  it('should render button with custom text style', () => {
    const newProps = { ...props, textStyle: { color: 'red' } }
    const { getByText } = render(<Button {...newProps} />)
    expect(getByText(props.title).props.style).toContainEqual([getStyles({ ...newProps }).text, newProps.textStyle])
  })

  it('should render button with custom container style', () => {
    const newProps = { ...props, containerStyle: { color: 'red' } }
    const { getByTestId } = render(<Button {...newProps} />)
    expect(getByTestId('button-container').props.style).toEqual([
      getStyles({ ...newProps }).container,
      newProps.containerStyle,
    ])
  })

  it('should render primary button with proper style', () => {
    const { getByText } = render(<Button {...props} scheme={BUTTON_SCHEMES.PRIMARY} />)
    const touchableOpacity = getByText(props.title).parentNode
    expect(touchableOpacity.props.style).toContainEqual(getStyles(props).button, STYLE_SCHEMES.primary)
  })

  it('should render secondary button with proper style', () => {
    const { getByText } = render(<Button {...props} scheme={BUTTON_SCHEMES.SECONDARY} />)
    const touchableOpacity = getByText(props.title).parentNode
    expect(touchableOpacity.props.style).toContainEqual(getStyles(props).button, STYLE_SCHEMES.secondary)
  })

  it('should render inactive button with proper style', () => {
    const { getByText } = render(<Button {...props} scheme={BUTTON_SCHEMES.INACTIVE} />)
    const touchableOpacity = getByText(props.title).parentNode
    expect(touchableOpacity.props.style).toContainEqual(getStyles(props).button, STYLE_SCHEMES.inactive)
  })

  it('should render primaryLink button with proper style', () => {
    const { getByText } = render(<Button {...props} scheme={BUTTON_SCHEMES.PRIMARY_LINK} />)
    const touchableOpacity = getByText(props.title).parentNode
    expect(touchableOpacity.props.style).toContainEqual(getStyles(props).button, STYLE_SCHEMES.primaryLink)
  })

  it('should render secondaryLink button with proper style', () => {
    const { getByText } = render(<Button {...props} scheme={BUTTON_SCHEMES.SECONDARY_LINK} />)
    const touchableOpacity = getByText(props.title).parentNode
    expect(touchableOpacity.props.style).toContainEqual(getStyles(props).button, STYLE_SCHEMES.secondaryLink)
  })

  it('should render primaryOutline button with proper style', () => {
    const { getByText } = render(<Button {...props} scheme={BUTTON_SCHEMES.PRIMARY_OUTLINE} />)
    const touchableOpacity = getByText(props.title).parentNode
    expect(touchableOpacity.props.style).toContainEqual(getStyles(props).button, STYLE_SCHEMES.primaryOutline)
  })

  it('should run onPress button properly', () => {
    const { getByText } = render(<Button {...props} />)
    const touchableOpacity = getByText(props.title).parentNode
    fireEvent.press(touchableOpacity)
    expect(props.onPress).toHaveBeenCalledTimes(1)
  })

  it('should render children react element properly', () => {
    const { getByText } = render(
      <Button onPress={props.onPress}>
        <Text>text</Text>
      </Button>
    )
    expect(getByText('text')).toBeTruthy()
  })

  it('should render loading and disable button properly when loading is passed as true', () => {
    const { getByTestId } = render(
      <Button onPress={props.onPress} title="title" loading>
        text
      </Button>
    )
    const activityIndicator = getByTestId('activity-indicator')
    const touchableOpacity = activityIndicator.parentNode

    expect(activityIndicator).toBeTruthy()
    expect(touchableOpacity.props.disabled).toBeTruthy()
  })
})
