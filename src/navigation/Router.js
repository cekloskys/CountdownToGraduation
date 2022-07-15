import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import TabNavigator from './TabNavigator';
import NewCourseScreen from '../screens/NewCourse';
import CoreScreen from '../screens/Core';
import ExistingCourseScreen from '../screens/ExistingCourse';
import SearchResultsScreen from "../screens/SearchResults";
import SearchScreen from "../screens/Search";
import onBoardingScreen from "../screens/onBoardingScreen";

const Stack = createStackNavigator();

const Router = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name={'onBoardingScreen'} component={onBoardingScreen} />
        <Stack.Screen name={'Home'} component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name={'Get started!'} component={TabNavigator} />
        <Stack.Screen name={'New Course'} component={NewCourseScreen} />
        <Stack.Screen name={'Core'} component={CoreScreen} />
        <Stack.Screen name={'Existing Course'} component={ExistingCourseScreen} />
          <Stack.Screen name={'Search Results'} component={SearchResultsScreen} />
        <Stack.Screen name={'Search'} component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
      );
};

export default Router;
