import React from 'react'
import { StyleSheet, View } from 'react-native'


export default function LoginBox({children,text,bgColor,textColor,...props}) {
    return (
    <View style={styles.box}>
        {children}
    </View>
)}
const styles = StyleSheet.create({
    box: {
        borderColor:'#d8dee2',
        borderWidth:1,
        backgroundColor:'#fff',
        padding:20,
        borderRadius:5,
        marginLeft:35,
        marginRight:35,
        alignSelf:'stretch',
    }
})