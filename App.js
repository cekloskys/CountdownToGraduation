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

const App = () => {
  try {
    database.createTable();
  } catch (error) {
    console.log('Failed to create table')
    console.log(error);
  }

  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  React.useEffect(async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if(appData == null){
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false')
    }else{
      setIsAppFirstLaunched(false);
    }
  }, []);
  return (
      isAppFirstLaunched != null && (
          <NavigationContainer>
            <Stack.Navigator  >
              {isAppFirstLaunched &&
                  (<Stack.Screen options={{ headerShown: false }} name={'onBoardingScreen'} component={onBoardingScreen} />)}
              <Stack.Screen options={{ headerShown: false }} name={'Home'} component={HomeScreen}   />
              <Stack.Screen name={'Get started!'} component={TabNavigator} />
              <Stack.Screen name={'New Course'} component={NewCourseScreen} />
              <Stack.Screen name={'Core'} component={CoreScreen} />
              <Stack.Screen name={'Existing Course'} component={ExistingCourseScreen} />
            </Stack.Navigator>
          </NavigationContainer>
      )
);
};

export default App;
