import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

const getRowStyle = (justifyContent, marginTop, marginBottom, backgroundColor) => ({
  flexDirection: 'row',
  justifyContent,
  flexWrap: 'wrap',
  marginTop,
  marginBottom,
  backgroundColor,
  alignItems: 'center',
})

const Row = ({ children, justifyContent, marginTop, marginBottom, backgroundColor, style }) => (
  <View style={[getRowStyle(justifyContent, marginTop, marginBottom, backgroundColor), style]}>{children}</View>
)

Row.propTypes = {
  children: PropTypes.node,
  justifyContent: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  backgroundColor: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.shape),
}

Row.defaultProps = {
  justifyContent: 'space-between',
  marginTop: 0,
  marginBottom: 0,
  backgroundColor: 'transparent',
  children: <View />,
  style: {},
}

export default Row
