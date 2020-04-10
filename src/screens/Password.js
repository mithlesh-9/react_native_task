import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { Login } from '../redux/user/user.actions'
import Icon from 'react-native-vector-icons/AntDesign'

import FormInput from '../components/FormInput'
import Button from '../components/Button'
import LoginBox from '../components/LoginBox'
import ImageBox from '../components/ImageBox'
import ErrorMessage from '../components/ErrorMessage'


class Password extends Component {
    state = {
        password:'',
        error:null
    }

    onSubmit = () => {
        Keyboard.dismiss()
        const { username } = this.props
        const { password } = this.state
        if(!password.trim()) {
           return this.setState(()=>({
                error:'Please enter your password.'
            }))
        }
        this.props.dispatch(Login({username,password}))
    }


    componentDidUpdate(prevProps,prevState) {
        const { error, password } = this.state
        const {errors} = this.props
        if(error) {
            if(password !== prevState.password) {
                if(password.trim()) {
                    this.setState(()=>({
                        error:null
                    }))
                }
            }
        }

        if(errors !== prevProps.errors) {
            if(errors) {
                this.setState(()=>({
                    error:errors
                }))
            }
        }
    }

    render() {
        const { password, error } = this.state
        const { user, navigation, isLoggingIn } = this.props
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.conatainer}>
                <TouchableOpacity style={styles.backBtn} onPress={()=>navigation.navigate('Login')}>
                    <Icon name="left" size={35} />
                </TouchableOpacity>
                
            <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <ImageBox heading={`Welcome ${user.name ? user.name : user.login}!`}>
                        <Image source={{uri:user.avatar_url}} style={styles.image}  />
                </ImageBox>

                {error && <ErrorMessage error={error} />}


                <LoginBox>

                    <FormInput 
                        label="Password" 
                        secureTextEntry 
                        value={password} 
                        onChangeText={text => this.setState(()=>({
                            password:text
                        }))} />
                    
                    
                    <Button disabled={isLoggingIn} bgColor="#28a745" textColor="#fff" onPress={this.onSubmit}>
                        {isLoggingIn ? 'Logging In...' : 'Login'}
                    </Button>
                </LoginBox>
            </View>
            </KeyboardAvoidingView>
            
        )
    }
}

const styles = StyleSheet.create({
    conatainer: {
        flex:1,
    },
    image: {
        backgroundColor:'#fff',
        borderRadius:40,
        width:70,
        height:70
    },
    backBtn: {
        height:35,
        width:35,
        borderRadius:35/2,
        marginTop:20,
        marginLeft:20
    }   
})

function mapStateToProps({user}) {
    return {
        user: user.userData,
        username: user.username,
        errors: user.loginErros,
        isLoggingIn:user.isLoggingIn
    }
}


export default connect(mapStateToProps)(Password)