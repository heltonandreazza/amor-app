import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Auth from 'screens/Auth/Auth';
import Login from 'screens/Login/Login';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Auth,
    Login: createStackNavigator(
      {
        Login: Login,
      },
      {
        headerMode: 'none',
      }
    ),
    Main: MainTabNavigator,
  })
);
