import React, { Component } from 'react'
import { StyleSheet, View, Image,  KeyboardAvoidingView, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { checkUsername } from '../redux/user/user.actions'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import LoginBox from '../components/LoginBox'
import ImageBox from '../components/ImageBox'
import ErrorMessage from '../components/ErrorMessage'

class Login extends Component {
    state = {
        username:'',
        error:null
    }

    onNext = () => {
        const { username } = this.state
        Keyboard.dismiss()
        if(!username.trim()) {
           return this.setState(()=>({
                error:'Please enter your username.'
            }))
        }
        this.props.dispatch(checkUsername(username))
    }

    componentDidUpdate(prevProps,prevState) {
        const { error, username } = this.state
        const { errors, user, navigation } = this.props
        if(error) {
            if(username !== prevState.username) {
                if(username.trim()) {
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

        if(prevProps.user !== user) {
            if(user) {
                navigation.navigate('Password')
            }
        }
    }

    render() {
        const { username, error } = this.state
        const { isChecking } = this.props
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.conatainer}>
            <View>
                <ImageBox heading="Sign in to Github">
                        <Image source={require('../assets/images.png')} style={styles.image}  />
                </ImageBox>
                {error && <ErrorMessage error={error} />}
                <LoginBox>
            
                    <FormInput
                         label="Username"
                         value={username} 
                         onChangeText={
                             text => this.setState(()=>({username:text}))} />
                    
                    
                    <Button disabled={isChecking} bgColor="#28a745" textColor="#fff" onPress={this.onNext}>
                        {isChecking ? 'Please Wait...' : 'Next'}
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
        alignItems:'center',
        justifyContent:'center',
    },
    image: {
        backgroundColor:'#fff',
        borderRadius:40,
        width:70,
        height:70
    },
})

function mapStateToProps({user}) {
    return {
        isChecking: user.isCheckingUsername,
        errors: user.usernameErrors,
        user: user.userData
    }
}


export default connect(mapStateToProps)(Login)