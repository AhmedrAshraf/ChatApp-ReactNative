import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { AsyncStorage } from 'react-native';
import fire from "./fire";
import 'firebase/firestore';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myUid: '',
            allUsers: [],
            load: false,
            ChatBox: false,
            opUsername: '',
            message: '',
        }
    }

    componentDidMount() {
        this.getMyDetail()
        this.getUsers()

    }

    getMyDetail = async () => {
        try {
            let uid = await AsyncStorage.getItem('uid');
            this.setState({ myUid: uid })
        }
        catch (error) {
            alert(error)
        }
    }

    getUsers() {
        this.setState({
            load: true,
        })
        fire.firestore().collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let currentArr = this.state.allUsers;
                currentArr.push(doc.data())
                this.setState({ allUsers: currentArr })
                this.setState({ load: false })
            });
        });
    }

    openChat(data) {
        this.setState({ ChatBox: true })
        this.setState({
            opUsername: data.name,
        })

    }
    hometo() {
        this.setState({ ChatBox: false })
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.headDiv}>
                    <TouchableOpacity onPress={this.hometo.bind(this)}>
                        <Text style={styles.headText}>Chats</Text>
                    </TouchableOpacity>
                </View>

                {(this.state.ChatBox) ? (
                    <View style={styles.container}>

                        <View style={styles.setingName} >
                            <Image source={require('../img/dp.png')} style={styles.dpuser} />
                            <Text style={styles.userName}>{this.state.opUsername}</Text>
                        </View >

                        <View style={styles.typeDiv}>
                            <TextInput style={styles.type} placeholder="Type any message..."
                                value={this.state.message} onChangeText={(message) => this.setState({ message })} />
                        </View>



                    </View>


                ) : (
                        <ScrollView>
                            <View style={styles.container}>
                                {(this.state.load) ? (<Image source={require('../img/load.gif')} style={styles.load} />) : null}
                                {this.state.allUsers.map((item, index) => {
                                    return (
                                        <View style={styles.seting} >
                                            <Image source={require('../img/dp.png')} style={styles.dp} />
                                            <TouchableOpacity onPress={this.openChat.bind(this, item)}>
                                                <Text style={styles.name} key={index}>{item.name}</Text>
                                            </TouchableOpacity>
                                        </View >
                                    )
                                })}
                            </View ></ScrollView>
                    )}



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headDiv: {
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: '#2E7BFF',
    },
    headText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    name: {
        fontSize: 22,
        paddingLeft: 10,
    },
    load: {
        width: 150,
        height: 150,
        marginTop: 100,
        marginLeft: 100,
    },
    dp: {
        width: 30,
        height: 30,
    },
    seting: {
        flexDirection: 'row',
        borderBottomColor: 'gainsboro',
        borderBottomWidth: 1,
        marginTop: 5,
        padding: 10,
    },
    userName: {
        fontSize: 22,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: '#2E7BFF',
        textShadowColor: 'white',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    setingName: {
        flexDirection: 'row',
        backgroundColor: 'gainsboro',
        padding: 10,
    },
    dpuser: {
        width: 30,
        height: 30,
        borderColor: '#2E7BFF',
        borderWidth: 1,
        borderRadius: 1000,

    },
    typeDiv: {
        flex: 4,
        justifyContent: 'flex-end'
    },
    type: {
        borderColor: 'gainsboro',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        marginBottom: 1,
        margin: 5,
        width: '160',
        alignItems: 'flex-start',
        fontSize: 22,
    }
});