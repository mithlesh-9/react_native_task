/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'

import Login from './Login'
import Password from './Password'



const Stack = createStackNavigator()

const AuthScreens = () => (
  <>
      <Stack.Screen 
        name="Login"
        component={Login}
        options={{
          headerShown:false
        }}  

      />
      <Stack.Screen 
        name="Password"
        component={Password}
        
      />
  </>
)

const MainScreens = () => (
  <Stack.Screen 
        name="Home"
        component={Password} 
  />
)

const isAuthenticated = false

function MainStack() {
  return (
    <Stack.Navigator
    >
      { isAuthenticated 
        ? MainScreens()
        : AuthScreens()
      }
    </Stack.Navigator>
  )
}


const Loading = () => {
  return (
        <View>
            <ActivityIndicator/>
        </View>
  );
};



export default Loading
