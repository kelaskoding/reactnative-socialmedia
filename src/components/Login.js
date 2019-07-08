import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import {
    Content,
    Button,
    Input,
    Text,
    View,
    Container
} from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Login extends Component {
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
                        <Input placeholder="Email" style={styles.inputBox}/>
                        <Input placeholder="Password" style={styles.inputBox}/>
                        <Button full style={styles.button} onPress={()=>Actions.timeline()}>
                            <Text style={styles.buttonText}>Login</Text>
                        </Button>
                        <Button full transparent>
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