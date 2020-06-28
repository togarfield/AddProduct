import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button, ActivityIndicator } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import listProduct from './src/listProduct';
import detailPage from './src/detailPage';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="listProduct">
            <Stack.Screen name="List Product" component={listProduct} />
            <Stack.Screen name="detailPage" component={detailPage} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    } 
}

export default App;