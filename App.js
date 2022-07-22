/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import Router from './src/navigation/Router';
import {AsyncStorage, LogBox} from 'react-native';
import 'localstorage-polyfill';
LogBox.ignoreLogs(['Reanimated 2']);
import { StatusBar } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
StatusBar.setBarStyle('dark-content', true);

import HomeScreen from './src/screens/Home';
import TabNavigator from './src/navigation/TabNavigator';
import NewCourseScreen from './src/screens/NewCourse';
import CoreScreen from './src/screens/Core';
import ExistingCourseScreen from './src/screens/ExistingCourse';
import onBoardingScreen from './src/screens/onBoardingScreen';
import {NavigationContainer} from "@react-navigation/native";
const database = require('./src/components/Handlers/database.js')

const Stack = createStackNavigator();
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo';
import SearchResultsScreen from "./src/screens/SearchResults";
import SearchScreen from "./src/screens/Search";

const App = () => {
  try {
    database.createTable();
  } catch (error) {
    console.log('Failed to create table');
    console.log(error);
  }

  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  React.useEffect(async () => {
   // const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    const appData = localStorage.getItem('isAppFirstLaunched');
    if(appData == null){
      setIsAppFirstLaunched(true);
      //AsyncStorage.setItem('isAppFirstLaunched', 'false')
      localStorage.setItem('isAppFirstLaunched', 'false')
    }else{
      setIsAppFirstLaunched(false);
    }
  }, []);
  return (
      isAppFirstLaunched != null && (
          <ApolloProvider client={client}>
          <NavigationContainer>
            <Stack.Navigator  >
              {isAppFirstLaunched &&
                  (<Stack.Screen options={{ headerShown: false }} name={'onBoardingScreen'} component={onBoardingScreen} />)}
              <Stack.Screen options={{ headerShown: false }} name={'Home'} component={HomeScreen}   />
              <Stack.Screen name={'Get started!'} component={TabNavigator} />
              <Stack.Screen name={'New Course'} component={NewCourseScreen} />
              <Stack.Screen name={'Core'} component={CoreScreen} />
              <Stack.Screen name={'Existing Course'} component={ExistingCourseScreen} />
              <Stack.Screen name={'Search Results'} component={SearchResultsScreen} />
              <Stack.Screen name={'Search'} component={SearchScreen} />
            </Stack.Navigator>
          </NavigationContainer>
          </ApolloProvider>
      )
);
};

export default App;
