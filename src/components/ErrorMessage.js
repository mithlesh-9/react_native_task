import React from 'react'
import { StyleSheet, View, Text } from 'react-native'


export default function ErrorMessage({error,margin = false}) {
    return (
    <View style={[styles.errorBox,margin ? {marginLeft:20,marginRight:20} : {marginLeft:35,marginRight:35}]} >
        <Text style={styles.error}>{error}</Text>
    </View>
)}
const styles = StyleSheet.create({
    errorBox: {
        borderColor:'#ffc3ca',
        marginTop:15,
        marginBottom:15,
        fontSize: 12,
        borderWidth: 1,
        borderRadius: 5,
        alignSelf:'stretch'
    },
    error: {
        padding:15,
        color: '#86181d',
        backgroundColor: '#ffdce0'
    },
})