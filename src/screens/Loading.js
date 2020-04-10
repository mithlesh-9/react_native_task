/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Logout } from '../redux/user/user.actions'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './Login'
import Password from './Password'
import SearchRepo from './SearchRepo'
import Commits from './Commits'



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
        options={{
          headerShown:false
        }} 
      />
      
      
  </>
)

const MainScreens = () => (
  <>
  <Stack.Screen 
        name="Home"
        component={SearchRepo} 
  />
  <Stack.Screen
        name="Commits"
        component={Commits}
  />
  
  
  </>
)






class Loading extends Component  {

  logout = () => {
    this.props.dispatch(Logout())
  }

  render() {
    const { isAuthenticated } = this.props
    return (
        <View style={{flex:1}}>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#24292e',
                },
                headerTintColor: '#fff',

   
                headerRight: () => (
                  <TouchableOpacity
                    onPress={this.logout}
                    style={styles.logoutBtn}
                  >
                    <Text style={{color:'#fff',fontWeight:'bold'}}>Logout</Text>
                  </TouchableOpacity>
                ),
              }}
            >
              { true 
                ? MainScreens()
                : AuthScreens()
              }
            </Stack.Navigator>
        </View>
  )}
}

const styles = StyleSheet.create({
  logoutBtn: {
    borderRadius:4,
    borderWidth:2,
    borderColor: '#fff',
    padding:8,
    paddingTop:5,
    paddingBottom:5,
    marginRight:20
  }
})

function mapStateToProps({user}) {
  return {
      isAuthenticated:user.isAuthenticated
  }
}


export default connect(mapStateToProps)(Loading)
