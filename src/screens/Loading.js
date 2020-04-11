/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { getAuthData } from '../redux/user/user.actions'
import Main from './Main'




const Loading = (props) =>  {
  const [ready, setReady] = useState(false)
  useEffect(()=> {
    props.dispatch(getAuthData())
         .then(()=>setReady(true))
  },[])
    return (
        <View style={{flex:1}}>
            {ready 
              ? <Main/>
              : <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size={40} color="#111" /></View>
            }
        </View>
  )
}



export default connect()(Loading)
