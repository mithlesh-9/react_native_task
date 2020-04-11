import React, { Component } from 'react'
import { StyleSheet, View, Image, FlatList, TouchableOpacity, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux'
import { fetchCommits, clearCommits } from '../redux/commits/commits.actions'

import moment from 'moment'

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/Contants'
import ErrorMessage from '../components/ErrorMessage'

class Commits extends Component {
    state = {
        page:1
    }

    componentDidUpdate(prevProps,prevState) {
        const { page } = this.state
        const { errors, dispatch, usernameRepo } = this.props

        if(errors !== prevProps.errors) {
            if(errors) {
                this.setState(()=>({
                    error:errors
                }))
            }
        }

        if(page !== prevState.page) {
            dispatch(fetchCommits(usernameRepo,page))
        }
    }

    oldData = () => this.setState(state => ({
                        page: state.page + 1
                    }))

    newData = () => this.setState(state => ({
                        page: state.page - 1 > 0 ? state.page - 1 : state.page
                    }))


    componentWillUnmount() {
        this.props.dispatch(clearCommits())
    }

    renderCommitCard = ({ item }) => (
        <View style={styles.commitCard}>
                    <Text style={styles.dateHeader}>Commit on {moment(item.commit.author.date).format('MMM DD, YYYY')}</Text>
                    <View style={styles.commitInfo}>
                        <View>
                            <Text style={styles.message}>{item.commit.message}</Text>
                            {item.author                             
                                ? item.author.login === item.committer.login 
                                    ?  (<View style={{flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                        <Image style={styles.avatar} source={{uri:item.committer.avatar_url}}/>
                                        <View style={styles.author}>
                                            <Text style={[styles.authorText,{fontWeight:'bold'}]}>{item.committer.login}</Text><Text style={[styles.authorText,{color:'grey',marginLeft:5}]}>committed {moment(item.commit.author.date).fromNow()}</Text>
                                        </View>
                                        </View>)

                                    :   (<View style={{flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                            <Image style={[styles.avatar,{marginRight:0}]} source={{uri:item.author.avatar_url}}/>
                                            <Image style={[styles.avatar,{marginLeft:0,borderRadius:15}]} source={{uri:item.committer.avatar_url}}/>
                                        
                                            <Text>
                                            <Text style={[styles.authorText,{fontWeight:'bold'}]}>{item.author.login}</Text>
                                            <Text style={[styles.authorText,{color:'grey'}]} > authored and </Text>
                                            <Text style={[styles.authorText,{fontWeight:'bold'}]}>{item.committer.login}</Text>
                                            <Text style={[styles.authorText,{color:'grey',marginLeft:5}]}> committed {moment(item.commit.author.date).fromNow()}</Text>
                                            </Text>
    
                                        </View>)

                                    :  item.committer
                                       ? (<View style={{flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                            <Image style={styles.avatar} source={{uri:item.committer.avatar_url}}/>
                                            <View style={styles.author}>
                                                <Text style={[styles.authorText,{fontWeight:'bold'}]}>{item.committer.login}</Text><Text style={[styles.authorText,{color:'grey',marginLeft:5}]}>committed {moment(item.commit.committer.date).fromNow()}</Text>
                                            </View>
                                          </View>)
                                       : (<View style={{flexDirection:'row',alignItems:'center',flexWrap:'wrap'}}>
                                            <View style={styles.author}>
                                                <Text style={[styles.authorText,{fontWeight:'bold'}]}>{item.commit.committer.name}</Text><Text style={[styles.authorText,{color:'grey',marginLeft:5}]}>committed {moment(item.commit.committer.date).fromNow()}</Text>
                                            </View>
                                          </View>)
                            }
                        </View>
                    </View>
                </View>
    )

    renderFlatList = (data) => (
        <FlatList
                style={styles.flatList}
                data={data}
                renderItem={this.renderCommitCard}
                keyExtractor={item => item.sha}
        /> 
    )

    renderEmptyList = () => (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../assets/empty.png')} style={{width:350,height:300}} />
            <Text style={{color:'rgba(0,0,0,0.3)',fontSize:15}}>No more data available.</Text>
        </View>
    )

    render() {
        const { page } = this.state
        const { isLoading, errors, data } = this.props
        if(isLoading) {
            return (
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size={40} color="#111" />
            </View>
        )}
        return (
            <View style={styles.conatainer}>
                <View style={{height: SCREEN_HEIGHT() - 155}}>
                {errors && <ErrorMessage error={errors} margin/>}
                {(data && data.length !== 0)
                    ? this.renderFlatList(data)
                    : this.renderEmptyList()
                }
                </View>           
                <View style={{flexDirection:'row',justifyContent:'center',paddingBottom:30,padding:20,height:95}}>
                <TouchableOpacity 
                    style={[styles.btn,
                            {borderRightWidth:0,borderTopRightRadius:0,borderBottomRightRadius:0},
                            (page === 1 || isLoading || !data ) && styles.disabledBtn
                           ]}
                    disabled={page === 1 || isLoading || !data}
                    onPress={this.newData}
                >
                    <Text style={[styles.btnText,(page === 1 || isLoading ) && styles.disabledBtnText]}>Newer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn,
                                        {borderTopLeftRadius:0,borderBottomLeftRadius:0},
                                        (isLoading || !data || (data && (data.length === 0 || data.length < 30 )) ) && styles.disabledBtn
                                    ]}
                                    disabled={isLoading || !data || (data && (data.length === 0 || data.length < 30 ))}
                                    onPress={this.oldData}
                >
                    <Text style={[styles.btnText,
                                (isLoading || !data || (data && (data.length === 0 || data.length < 30 )) ) && styles.disabledBtnText]}>
                                    Older
                    </Text>
                </TouchableOpacity>
                </View>

                

                
            </View>

           
        )
    }
}

const styles = StyleSheet.create({
    conatainer: {
        flex:1,
        backgroundColor:'#fff',
    },
    flatList: {
        paddingTop:20,
    },
    commitCard: {
        borderLeftWidth:2,
        borderColor:'#889',
        marginTop:0,
        margin:10,
        padding:10,
        paddingTop:0
    },
    dateHeader: {
        paddingBottom:10,
        fontSize:15,
        color:'grey'
    },
    commitInfo: {
        borderWidth:1,
        borderColor:'#d8dee2',
        padding:10,
        borderRadius:4
    },
    message: {
        fontWeight:'bold',
        paddingBottom:10,
        fontSize:16
    },
    avatar: {
        height:30,
        width:30,
        borderRadius:4,
        marginRight:10,
    },
    author: {
        flexDirection:'row',
        marginRight:10
    },
    authorText: {
        fontSize:14
    },
    btn: {
        padding:10,
        borderRadius:4,
        borderWidth:1,
        width:70
    },
    btnText: {
        fontWeight:'bold',
        textAlign:'center'
    },
    disabledBtn: {
        borderColor:'#999'
    },
    disabledBtnText: {
        color: '#999'
    },

})

function mapStateToProps({commits}) {
    return {
        isLoading: commits.isLoading,
        errors: commits.errors,
        data: commits.data,
        usernameRepo:commits.usernameRepo
    }
}


export default connect(mapStateToProps)(Commits)