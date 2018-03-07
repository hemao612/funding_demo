import React from 'react';
import {Image} from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from "../screens/ProfileScreen";

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({
                       tintColor,
                       focused
                     }) => (
          <Image source={require('../assets/images/ic_pages.png')}/>
        ),
      }
    },
    Profile : {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({
                       tintColor,
                       focused
                     }) => (
          <Image source={require('../assets/images/ic_contacts.png')} />
        ),
      }
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
      style: {
        backgroundColor: '#FFFFFF',
      },
    },
  });
