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
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);
import {StatusBar} from 'react-native';
import {ApolloProvider} from '@apollo/client';
StatusBar.setBarStyle('dark-content', true);
const database = require('./src/components/Handlers/database.js');
import {client} from './apollo';

const App = () => {
  try {
    database.createTable();
  } catch (error) {
    console.log('Failed to create table');
    console.log(error);
  }

  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
};

export default App;
