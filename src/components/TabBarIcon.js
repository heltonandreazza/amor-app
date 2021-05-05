import React from 'react';
import PropTypes from 'prop-types'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { COLORS } from 'services/style'

const TabBarIcon = ({ name, focused }) => {
  return (
    <MaterialCommunityIcons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? COLORS.PRIMARY : COLORS.GRAY}
    />
  );
}

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
}

export default TabBarIcon

