import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'


export default function FormInput({label,...props}) {
    return (
    <View style={{marginTop:5,marginBottom:25}}>
        <Text style={styles.label}>{label}</Text>
        <TextInput 
            style={styles.input}
            autoCapitalize="none"
            {...props}
        />
    </View>
)}

const styles = StyleSheet.create({
    label: {
        fontWeight:'bold',
        color:'#111',
        marginTop:10,
        marginBottom:10
    },
    input: {
        borderWidth:1,
        borderColor:'#d8dee9',
        borderRadius:4,
        paddingLeft:10,
        height:40,
        fontSize: 15,
        color:'#111',
        width:300,
        padding:0
    },
})