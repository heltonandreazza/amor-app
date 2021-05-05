import React from 'react'
import { Text } from 'react-native'
import { render, fireEvent } from '@testing-library/react-native'

import Autocomplete from '.'

const props = {
  isLoading: false,
  inputProps: {
    value: 'input value',
    label: 'input label',
    onChangeText: jest.fn(),
    accessibilityLabel: 'input-address',
  },
  flatListProps: {
    accessibilityLabel: 'list-address-card',
    data: [{ value: 'item data value 1' }, { value: 'item data value 2' }],
    // eslint-disable-next-line react/prop-types
    renderItem: ({ item }) => {
      return <Text>{item.value}</Text>
    },
    keyExtractor: (_, index) => index.toString(),
    ListEmptyComponent: <Text>list empty component</Text>,
    ListHeaderComponent: <Text>list header component</Text>,
  },
}

describe('Autocomplete', () => {
  it('should render properly', () => {
    const { baseElement } = render(<Autocomplete {...props} />)
    expect(baseElement).toMatchSnapshot()
  })
  it('should render loading', () => {
    const { getByLabelText } = render(<Autocomplete {...props} isLoading />)
    expect(getByLabelText('full-screen-loader')).toBeTruthy()
  })
  describe('Input', () => {
    it('should render value and label', () => {
      const { getByLabelText, getByText } = render(<Autocomplete {...props} />)
      expect(getByText(props.inputProps.label)).toBeTruthy()
      expect(getByLabelText('input-address').props.value).toBe(props.inputProps.value)
    })
    it('should render errorMessage', () => {
      const { getByText } = render(<Autocomplete {...props} inputProps={{ errorMessage: 'error message' }} />)
      expect(getByText('error message')).toBeTruthy()
    })
    it('should run onChangeText', () => {
      const { getByLabelText } = render(<Autocomplete {...props} />)
      fireEvent.changeText(getByLabelText('input-address'), 'new text')
      expect(props.inputProps.onChangeText).toBeCalledTimes(1)
    })
  })
  describe('FlatList', () => {
    it('should render list header component', () => {
      const { getByText } = render(<Autocomplete {...props} />)
      expect(getByText('list header component')).toBeTruthy()
    })
    it('should render list items', () => {
      const { getByText } = render(<Autocomplete {...props} />)
      expect(getByText(props.flatListProps.data[0].value)).toBeTruthy()
      expect(getByText(props.flatListProps.data[1].value)).toBeTruthy()
    })
    it('should render list empty component when data prop is empty', () => {
      const flatListCustomProps = { ...props.flatListProps, data: [] }
      const { getByText } = render(<Autocomplete {...props} flatListProps={flatListCustomProps} />)
      expect(getByText('list empty component')).toBeTruthy()
    })
  })
})
