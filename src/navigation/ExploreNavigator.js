import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import TabNavigator from './TabNavigator';
import NewCourseScreen from '../screens/NewCourse';
import ExistingCourseScreen from '../screens/ExistingCourse';
import SearchResultsScreen from "../screens/SearchResults";
import SearchScreen from "../screens/Search";

const Stack = createStackNavigator();

const Router = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'Get started!'} component={TabNavigator} />
      <Stack.Screen name={'New Course'} component={NewCourseScreen} />
      <Stack.Screen name={'Existing Course'} component={ExistingCourseScreen} />
        <Stack.Screen name={'Search Results'} component={SearchResultsScreen} />
        <Stack.Screen name={'Search'} component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default Router;
