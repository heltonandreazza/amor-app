import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { COLORS } from 'services/style'

import TabBarIcon from 'components/TabBarIcon';

import Home from 'screens/Home/Home';
import Profile from 'screens/Profile/Profile';
import ProfilePerson from 'screens/ProfilePerson/ProfilePerson';
import ProfileOng from 'screens/ProfileOng/ProfileOng';
import Payment from 'screens/Payment/Payment';
import PaymentSucceed from 'screens/PaymentSucceed/PaymentSucceed';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: Home,
    ProfilePerson: ProfilePerson,
    ProfileOng: ProfileOng,
    Payment: Payment,
    PaymentSucceed: PaymentSucceed,
  },
  config
);

const tabBarOptions = {
  activeTintColor: COLORS.PRIMARY,
  inactiveTintColor: COLORS.GRAY,
}

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'home'} />,
  tabBarOptions,
};

HomeStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: Profile,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'account'} />,
  tabBarOptions,
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ProfileStack,
});

tabNavigator.path = '';


export default tabNavigator;
