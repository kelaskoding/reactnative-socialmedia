import React, {Component} from 'react';
import {StyleSheet, Image, Alert} from 'react-native';
import {
    Content, 
    Button,
    Input,
    Text,
    Container,
    View
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from '../conf/Config'

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            onLogin: false,
            token: ''
        }
    }

    storeToken = async() => {
        try {
            await AsyncStorage.setItem('APP_TOKEN', this.state.token);
        } catch (error) {
            console.log(error);
        }
    }

    processLogin = () => {
        this.setState({onLogin: true});
        fetch(BASE_URL + '/account/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({email: this.state.email, password: this.state.password})
            })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({onLogin: false});
                status = responseJson['status'];
                if(status) {
                    this.setState({token: responseJson['payload']['token']});
                    this.storeToken();
                    Actions.timeline();
                } else {
                    Alert.alert('Failed', 'Email or Password not valid!', [
                        {
                            text: 'OK'
                        }
                    ], {cancelable: false})
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    processRegister = () =>{
        Actions.register();
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content padder>
                    <View style={styles.container}>
                        <Image
                            source={require('../images/icon.png')}
                            style={{
                            width: 70,
                            height: 70
                        }}/>
                        <Text style={styles.logoText}>Photo Comments</Text>
                    </View>
                    <View style={styles.content}>
                        <Input placeholder="Email" style={styles.inputBox} 
                            onChangeText={(text) => this.setState({email: text})}/>
                        <Input placeholder="Password" secureTextEntry={true} style={styles.inputBox} 
                            onChangeText={(text) => this.setState({password: text})}/>
                        <Button full style={styles.button} onPress= {this.processLogin}>
                            
                            {
                                this.state.onLogin
                                ? <Text style={styles.buttonText}>Login</Text>
                                : <Text style={styles.buttonText}>Login</Text>
                            }
                        </Button>
                        <Button full transparent onPress= {this.processRegister}>
                            <Text style={styles.buttonText}>Register</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#900C3F',
        alignItems: 'center'
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginVertical: 5,
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 16,
        color: '#ffffff'
    },
    button: {
        marginVertical: 10,
        paddingVertical: 12,
        width: 300,
        borderRadius: 24,
        backgroundColor: '#581845'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    logoText: {
        marginVertical: 15,
        fontSize: 18,
        color: 'rgba(255,255,255,0.7)'
    }
});
