import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Button, TextInput } from 'react-native';
import { connect } from "react-redux";
import { signin } from "../store/action/action";

class Signin extends Component {
    static navigationOptions = {
        title: 'Login',
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
        headerTitleStyle: { textAlign: "center", flex: 1, marginLeft: -30, },
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            psw: '',
        }
    }
    goto() {
        this.props.navigation.navigate('Signup')
    }
    Signin() {
        this.props.Login(this.state.email, this.state.psw, this.props.navigation)
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput value={this.state.email} onChangeText={(email) => this.setState({ email })} placeholder='Email Address' style={styles.inputfield} />
                <TextInput value={this.state.psw} onChangeText={(psw) => this.setState({ psw })} placeholder='Enter Password' style={styles.inputfield} />
                {(this.props.loader) ? (<Image source={require('../img/load.gif')} style={styles.loading} />) : null}
                <View style={styles.but}>
                    <Button title='Signin' onPress={this.Signin.bind(this)} color='#f4511e' />
                </View>
                <TouchableOpacity onPress={this.goto.bind(this)}><Text style={styles.goto}>Don`t have an Account ? create Here</Text></TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bloodimg: {
        width: 350,
        height: 150,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    inputfield: {
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 50,
        width: 300,
        margin: 10,
        paddingLeft: 20,
    },
    but: {
        width: 300,
        padding: 20,
    },
    goto: {
        color: 'red',
        fontSize: 16,
    },
    loading: {
        width: 100,
        height: 100,
        zIndex: 5,
        position: 'absolute',    }
});

function mapStateToProps(state) {
    return ({
        loader: state.basicInfo.loader,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        Login: (email, psw, navigation) => {
            dispatch(signin(email, psw, navigation))
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Signin)
