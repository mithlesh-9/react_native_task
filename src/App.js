/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
} from 'react-native'
import { Provider } from 'react-redux'
import { store } from './redux/store'

import { NavigationContainer } from '@react-navigation/native'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './constants/Contants'

import Loading from './screens/Loading'


const App = () => {
  useEffect(()=>{
    StatusBar.setBarStyle('light-content')
  },[])
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <NavigationContainer>
          <Loading />
      </NavigationContainer>
    </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH(),
    height: SCREEN_HEIGHT()
  }
})

export default App
