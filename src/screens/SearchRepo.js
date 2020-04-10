import React, { Component } from 'react'
import { StyleSheet, View, Keyboard, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { fetchCommits } from '../redux/commits/commits.actions'
import Icon from 'react-native-vector-icons/AntDesign'

import ErrorMessage from '../components/ErrorMessage'

class SearchRepo extends Component {
    state = {
        searchTerm:'mithleshfreak/react_native_task',
        error:null
    }

    onSearch = () => {
        const { searchTerm } = this.state
        Keyboard.dismiss()
        if(!searchTerm.trim()) {
           return this.setState(()=>({
                error:'Please enter the repo. name followed by username.'
            }))
        }
        this.props.dispatch(fetchCommits(searchTerm))
    }

    componentDidUpdate(prevProps,prevState) {
        const { error, searchTerm } = this.state
        const { errors, data, navigation } = this.props
        if(error) {
            if(searchTerm !== prevState.searchTerm) {
                if(searchTerm.trim()) {
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

        if(prevProps.data !== data) {
            if(data) {
                navigation.navigate('Commits')
            }
        }
    }

    render() {
        const { searchTerm, error } = this.state
        const { isLoading } = this.props
        return (
            <View style={styles.conatainer}>
            <View>
                {error && <ErrorMessage error={error} margin />}
                <View style={[{flexDirection:'row',margin:20},error ? {marginTop: 0} : {marginTop:20}]}>
                <TextInput
                         style={styles.input}
                         autoCapitalize="none"
                         autoCorrect={false}
                         autoFocus={true}
                         value={searchTerm}
                         onChangeText={
                             text => this.setState(()=>({searchTerm:text}))} />
                    
                    
                    <TouchableOpacity disabled={isLoading} style={styles.btn} onPress={this.onSearch}>
                        {isLoading
                            ? <ActivityIndicator size={25} color="#fff"/>
                            :<Icon name="search1" size={25} color="#fff" />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conatainer: {
        flex:1,
        backgroundColor:'#fff'
    },
    input: {
        borderColor:'#111',
        borderWidth:1,
        flex:1,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        paddingRight:10,
        paddingLeft:10,
        color:'#111',  
    },
    btn: {
        backgroundColor:'#111',
        padding:10,
        borderTopRightRadius:5,
        borderBottomRightRadius:5
    }

})

function mapStateToProps({commits}) {
    return {
        isLoading: commits.isLoading,
        errors: commits.errors,
        data: commits.data
    }
}


export default connect(mapStateToProps)(SearchRepo)