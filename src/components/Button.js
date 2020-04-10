import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'


export default function Button({children,bgColor,textColor,...props}) {
    return (
    <View>
    <TouchableOpacity style={{backgroundColor:bgColor,padding:10,borderRadius:4}} {...props}>
        <Text style={{color:textColor,textAlign:'center',fontWeight:'bold',letterSpacing:.5}}>{children}</Text>
    </TouchableOpacity>
    </View>
)}
