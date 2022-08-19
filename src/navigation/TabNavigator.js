import React from 'react';
import AllScreen from '../screens/All';
import MajorScreen from '../screens/Major';
import CoreScreen from '../screens/Core';
import ElectiveScreen from '../screens/Elective'
import MinorScreen from '../screens/Minor'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const TabNavigator = props => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#f15454',
        indicatorStyle: {
          backgroundColor: '#f15454',
        },
          labelStyle: {
              flex: 1,
              fontSize: 15,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
          },
      }}>
      <Tab.Screen name={'All'} component={AllScreen} />
      <Tab.Screen name={'Major'} component={MajorScreen} />
      <Tab.Screen name={'Core'} component={CoreScreen} />
      <Tab.Screen name={'Minor'} component={MinorScreen} />
      <Tab.Screen name={'Elect.'} component={ElectiveScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
