import React from 'react'
import { Text, View, StyleSheet } from 'react-native'


export default function ImageBox({children,heading}) {
    return (
    <View style={styles.imageBox}>
        {children}
        {heading && <Text style={styles.heading}>{heading}</Text>}
    </View>
)}
const styles = StyleSheet.create({  
    heading: {
        fontSize:20,
        margin: 10
    },
    imageBox: {
        justifyContent:'center',
        alignItems:'center',
        marginBottom: 15 
    },
})