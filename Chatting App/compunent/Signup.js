import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Button, TextInput } from 'react-native';
import { connect } from "react-redux";
import { signup } from "../store/action/action";

class Signup extends Component {
    static navigationOptions = {
        title: 'Register',
        headerStyle: { backgroundColor: '#f4511e' },
        headerTintColor: '#fff',
        headerTitleStyle: { textAlign: "center", flex: 1 },
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            psw: '',
        }
    }
    goto() {
        this.props.navigation.navigate('Signin')
    }
    Signup() {
        this.props.Register(this.state.name, this.state.email, this.state.psw, this.props.navigation)
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput value={this.state.name} onChangeText={(name) => this.setState({ name })} placeholder='Type Your Name' style={styles.inputfield} />
                <TextInput value={this.state.email} onChangeText={(email) => this.setState({ email })} placeholder='Email Address' style={styles.inputfield} />
                <TextInput value={this.state.psw} onChangeText={(psw) => this.setState({ psw })} placeholder='Enter Password' style={styles.inputfield} />
                {(this.props.loader) ? (<Image source={require('../img/load.gif')} style={styles.loading} />) : null}
                <View style={styles.but}>
                    <Button title='Signup' onPress={this.Signup.bind(this)} color='#f4511e' />
                </View>
                <TouchableOpacity onPress={this.goto.bind(this)}><Text style={styles.goto}>Already have an Account ? Login Here</Text></TouchableOpacity>
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
        Register: (name, email, psw, navigation) => {
            dispatch(signup(name, email, psw, navigation))
        }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)
